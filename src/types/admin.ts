import { Quiz } from './quiz';

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'suspended';
  role: 'user' | 'admin' | 'moderator';
  createdAt: string;
  lastLoginAt?: string;
  subscription?: {
    planName: string;
    status: string;
    nextBillingDate: string;
  };
  stats: {
    quizzesCompleted: number;
    proofsGenerated: number;
    totalXP: number;
    achievements: number;
  };
}

export interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalQuizzes: number;
  totalProofs: number;
  revenue: number;
  subscriptions: {
    active: number;
    canceled: number;
    churned: number;
  };
}

export interface AdminQuiz extends Quiz {
  published: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  analytics: {
    totalAttempts: number;
    averageScore: number;
    completionRate: number;
  };
}