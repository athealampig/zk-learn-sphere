import { toast } from '@/hooks/use-toast';

export interface NotificationData {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  userId?: string;
  read: boolean;
  createdAt: string;
  expiresAt?: string;
  actionUrl?: string;
  actionText?: string;
  metadata?: Record<string, any>;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  browser: boolean;
  types: {
    quiz: boolean;
    proof: boolean;
    achievement: boolean;
    system: boolean;
    marketing: boolean;
  };
}

class NotificationService {
  private notifications: NotificationData[] = [];
  private listeners: Set<(notifications: NotificationData[]) => void> = new Set();
  private preferences: NotificationPreferences = this.getDefaultPreferences();

  // Default notification preferences
  private getDefaultPreferences(): NotificationPreferences {
    return {
      email: true,
      push: true,
      browser: true,
      types: {
        quiz: true,
        proof: true,
        achievement: true,
        system: true,
        marketing: false
      }
    };
  }

  // Show toast notification
  showToast(
    type: 'success' | 'error' | 'warning' | 'info',
    title: string,
    description?: string,
    duration?: number
  ): void {
    toast({
      variant: type === 'error' ? 'destructive' : 'default',
      title,
      description,
      duration: duration || (type === 'error' ? 5000 : 3000)
    });
  }

  // Success notifications
  success(title: string, description?: string, duration?: number): void {
    this.showToast('success', title, description, duration);
  }

  // Error notifications
  error(title: string, description?: string, duration?: number): void {
    this.showToast('error', title, description, duration);
  }

  // Warning notifications
  warning(title: string, description?: string, duration?: number): void {
    this.showToast('warning', title, description, duration);
  }

  // Info notifications
  info(title: string, description?: string, duration?: number): void {
    this.showToast('info', title, description, duration);
  }

  // Quiz related notifications
  quizCompleted(score: number, totalQuestions: number, xpEarned: number): void {
    const percentage = Math.round((score / totalQuestions) * 100);
    this.success(
      'Quiz Completed!',
      `You scored ${score}/${totalQuestions} (${percentage}%) and earned ${xpEarned} XP`
    );
  }

  quizFailed(score: number, totalQuestions: number): void {
    const percentage = Math.round((score / totalQuestions) * 100);
    this.error(
      'Quiz Failed',
      `You scored ${score}/${totalQuestions} (${percentage}%). Try again to improve!`
    );
  }

  // Proof related notifications
  proofGenerationStarted(): void {
    this.info('Proof Generation Started', 'Your proof is being generated. This may take a few minutes.');
  }

  proofGenerated(proofId: string): void {
    this.success('Proof Generated Successfully!', `Your proof ${proofId} is ready for download.`);
  }

  proofFailed(error: string): void {
    this.error('Proof Generation Failed', error);
  }

  proofVerified(proofId: string): void {
    this.success('Proof Verified!', `Proof ${proofId} has been successfully verified on the blockchain.`);
  }

  // Achievement notifications
  achievementUnlocked(title: string, description: string): void {
    this.success(
      '🏆 Achievement Unlocked!',
      `${title}: ${description}`,
      5000
    );
  }

  levelUp(level: number, xp: number): void {
    this.success(
      '🚀 Level Up!',
      `Congratulations! You've reached Level ${level} with ${xp} XP`,
      5000
    );
  }

  streakMilestone(days: number): void {
    this.success(
      '🔥 Streak Milestone!',
      `Amazing! You've maintained a ${days}-day learning streak`,
      5000
    );
  }

  // File upload notifications
  uploadProgress(filename: string, percentage: number): void {
    if (percentage === 100) {
      this.success('Upload Complete', `${filename} has been uploaded successfully`);
    }
  }

  uploadError(filename: string, error: string): void {
    this.error('Upload Failed', `Failed to upload ${filename}: ${error}`);
  }

  // Authentication notifications
  loginSuccess(userName: string): void {
    this.success('Welcome Back!', `Hello ${userName}, ready to continue learning?`);
  }

  loginError(error: string): void {
    this.error('Login Failed', error);
  }

  registrationSuccess(): void {
    this.success('Account Created!', 'Welcome to ConnectSphere! Start your Web3 learning journey.');
  }

  registrationError(error: string): void {
    this.error('Registration Failed', error);
  }

  // Payment notifications
  paymentSuccess(amount: number, plan: string): void {
    this.success('Payment Successful', `Successfully subscribed to ${plan} plan for $${amount}`);
  }

  paymentError(error: string): void {
    this.error('Payment Failed', error);
  }

  subscriptionCancelled(): void {
    this.warning('Subscription Cancelled', 'Your subscription has been cancelled and will end at the billing period.');
  }

  // System notifications
  systemMaintenance(startTime: string, duration: string): void {
    this.warning(
      'Scheduled Maintenance',
      `System maintenance scheduled at ${startTime} for ${duration}`,
      10000
    );
  }

  systemUpdate(): void {
    this.info('System Updated', 'New features and improvements have been deployed!');
  }

  connectionLost(): void {
    this.warning('Connection Lost', 'Reconnecting to server...');
  }

  connectionRestored(): void {
    this.success('Connection Restored', 'You are back online!');
  }

  // Browser notification support
  async requestNotificationPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission === 'denied') {
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  async showBrowserNotification(
    title: string, 
    options: NotificationOptions = {}
  ): Promise<void> {
    if (!this.preferences.browser) return;

    const hasPermission = await this.requestNotificationPermission();
    if (!hasPermission) return;

    const notification = new Notification(title, {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      ...options
    });

    // Auto close after 5 seconds
    setTimeout(() => {
      notification.close();
    }, 5000);
  }

  // In-app notifications management
  addNotification(notification: NotificationData): void {
    this.notifications.unshift(notification);
    
    // Keep only last 100 notifications
    if (this.notifications.length > 100) {
      this.notifications = this.notifications.slice(0, 100);
    }
    
    this.saveNotificationsToStorage();
    this.notifyListeners();
  }

  markAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.saveNotificationsToStorage();
      this.notifyListeners();
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
    this.saveNotificationsToStorage();
    this.notifyListeners();
  }

  deleteNotification(notificationId: string): void {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    this.saveNotificationsToStorage();
    this.notifyListeners();
  }

  clearAllNotifications(): void {
    this.notifications = [];
    this.saveNotificationsToStorage();
    this.notifyListeners();
  }

  getNotifications(): NotificationData[] {
    return [...this.notifications];
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  // Listeners for notification updates
  subscribe(callback: (notifications: NotificationData[]) => void): () => void {
    this.listeners.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(callback => {
      try {
        callback([...this.notifications]);
      } catch (error) {
        console.error('Error in notification listener:', error);
      }
    });
  }

  // Preferences management
  getPreferences(): NotificationPreferences {
    return { ...this.preferences };
  }

  updatePreferences(preferences: Partial<NotificationPreferences>): void {
    this.preferences = { ...this.preferences, ...preferences };
    this.savePreferencesToStorage();
  }

  // Persistence
  private saveNotificationsToStorage(): void {
    try {
      localStorage.setItem('connectsphere_notifications', JSON.stringify(this.notifications));
    } catch (error) {
      console.error('Failed to save notifications:', error);
    }
  }

  private loadNotificationsFromStorage(): void {
    try {
      const stored = localStorage.getItem('connectsphere_notifications');
      if (stored) {
        this.notifications = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
      this.notifications = [];
    }
  }

  private savePreferencesToStorage(): void {
    try {
      localStorage.setItem('connectsphere_notification_preferences', JSON.stringify(this.preferences));
    } catch (error) {
      console.error('Failed to save notification preferences:', error);
    }
  }

  private loadPreferencesFromStorage(): void {
    try {
      const stored = localStorage.getItem('connectsphere_notification_preferences');
      if (stored) {
        this.preferences = { ...this.getDefaultPreferences(), ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Failed to load notification preferences:', error);
      this.preferences = this.getDefaultPreferences();
    }
  }

  // Initialize service
  init(): void {
    this.loadNotificationsFromStorage();
    this.loadPreferencesFromStorage();
  }
}

// Export singleton instance
export const notificationService = new NotificationService();

// Initialize on module load
notificationService.init();
