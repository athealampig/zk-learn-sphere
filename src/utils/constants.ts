// Application constants
export const APP_NAME = 'ConnectSphere';
export const APP_VERSION = '1.0.0';
export const API_BASE_URL = 'http://localhost:5000/api';

// File upload constants
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'text/plain',
  'application/json'
];

export const UPLOAD_ENDPOINTS = {
  PROOF_FILES: '/proofs/upload',
  AVATARS: '/users/avatar',
  DOCUMENTS: '/files/upload'
};

// Quiz constants
export const QUIZ_CATEGORIES = [
  'ZK',
  'SP1', 
  'Soundness Layer',
  'Blockchain',
  'DeFi',
  'Security'
] as const;

export const QUIZ_DIFFICULTIES = [
  'Beginner',
  'Intermediate', 
  'Advanced',
  'Expert'
] as const;

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
} as const;

// Proof statuses
export const PROOF_STATUSES = {
  PENDING: 'Pending',
  GENERATING: 'Generating',
  VERIFIED: 'Verified',
  FAILED: 'Failed'
} as const;

// User roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator'
} as const;

// WebSocket events
export const WS_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  PROOF_UPDATE: 'proof_update',
  NOTIFICATION: 'notification',
  QUIZ_UPDATE: 'quiz_update'
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_PREFERENCES: 'userPreferences',
  QUIZ_PROGRESS: 'quizProgress',
  THEME: 'theme'
} as const;

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register', 
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout'
  },
  QUIZZES: {
    LIST: '/quizzes',
    DETAIL: '/quizzes/:id',
    ATTEMPT: '/quizzes/:id/attempt',
    HISTORY: '/quizzes/history'
  },
  PROOFS: {
    LIST: '/proofs',
    DETAIL: '/proofs/:id',
    GENERATE: '/proofs/generate',
    STATUS: '/proofs/:id/status'
  },
  PAYMENT: {
    METHODS: '/payment/methods',
    BILLING: '/payment/billing',
    SUBSCRIBE: '/payment/subscribe',
    CHECKOUT: '/payment/checkout'
  },
  ADMIN: {
    USERS: '/admin/users',
    STATS: '/admin/stats',
    QUIZZES: '/admin/quizzes',
    PROOFS: '/admin/proofs'
  }
} as const;