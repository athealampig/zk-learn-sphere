import { WS_EVENTS } from '@/utils/constants';

export interface WebSocketMessage {
  type: string;
  payload: any;
  timestamp: string;
}

export interface NotificationPayload {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  userId?: string;
}

export interface ProofUpdatePayload {
  proofId: string;
  status: 'Pending' | 'Generating' | 'Verified' | 'Failed';
  progress?: number;
  message?: string;
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 1000;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private connectionStatusListeners: Set<(status: 'connecting' | 'connected' | 'disconnected' | 'error') => void> = new Set();

  connect(token?: string) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    this.setConnectionStatus('connecting');
    
    const wsUrl = `ws://localhost:5000/ws${token ? `?token=${token}` : ''}`;
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.setConnectionStatus('connected');
    };

    this.ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        this.handleMessage(message);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.setConnectionStatus('disconnected');
      this.attemptReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.setConnectionStatus('error');
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1);
      
      console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);
      
      setTimeout(() => {
        this.connect();
      }, delay);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  private handleMessage(message: WebSocketMessage) {
    const listeners = this.listeners.get(message.type);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(message.payload);
        } catch (error) {
          console.error(`Error in WebSocket message handler for ${message.type}:`, error);
        }
      });
    }
  }

  subscribe(event: string, callback: (data: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(event);
      if (listeners) {
        listeners.delete(callback);
        if (listeners.size === 0) {
          this.listeners.delete(event);
        }
      }
    };
  }

  unsubscribe(event: string, callback: (data: any) => void) {
    const listeners = this.listeners.get(event);
    if (listeners) {
      listeners.delete(callback);
      if (listeners.size === 0) {
        this.listeners.delete(event);
      }
    }
  }

  subscribeToConnectionStatus(callback: (status: 'connecting' | 'connected' | 'disconnected' | 'error') => void) {
    this.connectionStatusListeners.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.connectionStatusListeners.delete(callback);
    };
  }

  private setConnectionStatus(status: 'connecting' | 'connected' | 'disconnected' | 'error') {
    this.connectionStatusListeners.forEach(callback => {
      try {
        callback(status);
      } catch (error) {
        console.error('Error in connection status callback:', error);
      }
    });
  }

  send(type: string, payload: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      const message: WebSocketMessage = {
        type,
        payload,
        timestamp: new Date().toISOString()
      };
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected. Cannot send message:', { type, payload });
    }
  }

  getConnectionState(): 'connecting' | 'connected' | 'disconnected' | 'error' {
    if (!this.ws) return 'disconnected';
    
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return 'connecting';
      case WebSocket.OPEN:
        return 'connected';
      case WebSocket.CLOSING:
      case WebSocket.CLOSED:
        return 'disconnected';
      default:
        return 'error';
    }
  }

  // Convenience methods for specific events
  onNotification(callback: (notification: NotificationPayload) => void) {
    return this.subscribe(WS_EVENTS.NOTIFICATION, callback);
  }

  onProofUpdate(callback: (update: ProofUpdatePayload) => void) {
    return this.subscribe(WS_EVENTS.PROOF_UPDATE, callback);
  }

  onQuizUpdate(callback: (update: any) => void) {
    return this.subscribe(WS_EVENTS.QUIZ_UPDATE, callback);
  }
}

// Export singleton instance
export const webSocketService = new WebSocketService();