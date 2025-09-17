import { useState, useEffect, useCallback } from 'react';
import { notificationService, NotificationData, NotificationPreferences } from '@/services/notifications';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences>(
    notificationService.getPreferences()
  );

  useEffect(() => {
    // Subscribe to notification updates
    const unsubscribe = notificationService.subscribe(setNotifications);
    
    // Load initial notifications
    setNotifications(notificationService.getNotifications());
    
    return unsubscribe;
  }, []);

  const markAsRead = useCallback((notificationId: string) => {
    notificationService.markAsRead(notificationId);
  }, []);

  const markAllAsRead = useCallback(() => {
    notificationService.markAllAsRead();
  }, []);

  const deleteNotification = useCallback((notificationId: string) => {
    notificationService.deleteNotification(notificationId);
  }, []);

  const clearAll = useCallback(() => {
    notificationService.clearAllNotifications();
  }, []);

  const updatePreferences = useCallback((newPreferences: Partial<NotificationPreferences>) => {
    const updated = { ...preferences, ...newPreferences };
    notificationService.updatePreferences(newPreferences);
    setPreferences(updated);
  }, [preferences]);

  const requestBrowserPermission = useCallback(async () => {
    return await notificationService.requestNotificationPermission();
  }, []);

  // Computed values
  const unreadCount = notifications.filter(n => !n.read).length;
  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  // Convenience methods for showing notifications
  const showSuccess = useCallback((title: string, description?: string) => {
    notificationService.success(title, description);
  }, []);

  const showError = useCallback((title: string, description?: string) => {
    notificationService.error(title, description);
  }, []);

  const showWarning = useCallback((title: string, description?: string) => {
    notificationService.warning(title, description);
  }, []);

  const showInfo = useCallback((title: string, description?: string) => {
    notificationService.info(title, description);
  }, []);

  return {
    // State
    notifications,
    unreadNotifications,
    readNotifications,
    unreadCount,
    preferences,

    // Actions
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    updatePreferences,
    requestBrowserPermission,

    // Convenience methods
    showSuccess,
    showError,
    showWarning,
    showInfo,

    // Service reference for advanced usage
    service: notificationService
  };
};