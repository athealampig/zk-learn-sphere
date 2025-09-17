import { useState, useEffect, useCallback, useRef } from 'react';
import { webSocketService, NotificationPayload, ProofUpdatePayload } from '@/services/websocket';
import { useAuth } from './useAuth';

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export const useWebSocket = () => {
  const { token } = useAuth();
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [lastMessage, setLastMessage] = useState<any>(null);
  const [notifications, setNotifications] = useState<NotificationPayload[]>([]);
  const [proofUpdates, setProofUpdates] = useState<ProofUpdatePayload[]>([]);
  
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const isConnectingRef = useRef(false);

  // Connection management
  const connect = useCallback(() => {
    if (isConnectingRef.current || connectionStatus === 'connected') {
      return;
    }
    
    isConnectingRef.current = true;
    webSocketService.connect(token || undefined);
  }, [token, connectionStatus]);

  const disconnect = useCallback(() => {
    isConnectingRef.current = false;
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    webSocketService.disconnect();
  }, []);

  // Auto-connect when token is available
  useEffect(() => {
    if (token && connectionStatus === 'disconnected') {
      connect();
    }
  }, [token, connectionStatus, connect]);

  // Subscribe to connection status changes
  useEffect(() => {
    const unsubscribe = webSocketService.subscribeToConnectionStatus((status) => {
      setConnectionStatus(status);
      isConnectingRef.current = status === 'connecting';
      
      // Auto-reconnect on disconnect (if we have a token)
      if (status === 'disconnected' && token && !reconnectTimeoutRef.current) {
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectTimeoutRef.current = undefined;
          if (token) {
            connect();
          }
        }, 3000); // Reconnect after 3 seconds
      }
      
      // Clear reconnect timeout if connected
      if (status === 'connected' && reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = undefined;
      }
    });

    return unsubscribe;
  }, [token, connect]);

  // Subscribe to notifications
  useEffect(() => {
    const unsubscribe = webSocketService.onNotification((notification) => {
      setNotifications(prev => [notification, ...prev.slice(0, 99)]); // Keep last 100
      setLastMessage({ type: 'notification', payload: notification });
    });

    return unsubscribe;
  }, []);

  // Subscribe to proof updates
  useEffect(() => {
    const unsubscribe = webSocketService.onProofUpdate((update) => {
      setProofUpdates(prev => [update, ...prev.slice(0, 99)]); // Keep last 100
      setLastMessage({ type: 'proof_update', payload: update });
    });

    return unsubscribe;
  }, []);

  // Subscribe to quiz updates
  useEffect(() => {
    const unsubscribe = webSocketService.onQuizUpdate((update) => {
      setLastMessage({ type: 'quiz_update', payload: update });
    });

    return unsubscribe;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      webSocketService.disconnect();
    };
  }, []);

  // Send message
  const sendMessage = useCallback((type: string, payload: any) => {
    webSocketService.send(type, payload);
  }, []);

  // Subscribe to custom events
  const subscribe = useCallback((event: string, callback: (data: any) => void) => {
    return webSocketService.subscribe(event, callback);
  }, []);

  // Clear notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Clear proof updates
  const clearProofUpdates = useCallback(() => {
    setProofUpdates([]);
  }, []);

  // Get connection info
  const getConnectionInfo = useCallback(() => {
    return {
      status: connectionStatus,
      isConnected: connectionStatus === 'connected',
      isConnecting: connectionStatus === 'connecting',
      isDisconnected: connectionStatus === 'disconnected',
      hasError: connectionStatus === 'error'
    };
  }, [connectionStatus]);

  return {
    // Connection state
    connectionStatus,
    isConnected: connectionStatus === 'connected',
    isConnecting: connectionStatus === 'connecting',
    isDisconnected: connectionStatus === 'disconnected',
    hasError: connectionStatus === 'error',

    // Connection actions
    connect,
    disconnect,

    // Messages
    lastMessage,
    notifications,
    proofUpdates,

    // Actions
    sendMessage,
    subscribe,
    clearNotifications,
    clearProofUpdates,
    getConnectionInfo,

    // Service reference for advanced usage
    service: webSocketService
  };
};