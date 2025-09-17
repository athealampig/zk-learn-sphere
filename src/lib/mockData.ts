import { Quiz, Question, QuizAttempt } from '@/types/quiz';
import { Proof, ProofStats } from '@/types/proof';
import { PaymentMethod, Transaction, Subscription, Plan } from '@/types/payment';
import { User, SystemStats, AdminQuiz } from '@/types/admin';

export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Zero-Knowledge Fundamentals',
    description: 'Learn the basics of zero-knowledge proofs and their applications',
    category: 'ZK',
    difficulty: 'Beginner',
    totalQuestions: 10,
    duration: 15,
    xpReward: 100,
    completed: true,
    score: 85,
    completedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'SP1 Circuit Design',
    description: 'Advanced concepts in SP1 circuit construction and optimization',
    category: 'SP1',
    difficulty: 'Advanced',
    totalQuestions: 15,
    duration: 30,
    xpReward: 200,
    completed: false
  }
];

export const mockQuestions: Question[] = [
  {
    id: '1',
    question: 'What is the main purpose of zero-knowledge proofs?',
    options: [
      'To encrypt data',
      'To prove knowledge without revealing the knowledge itself',
      'To compress data',
      'To hash data'
    ],
    correctAnswer: 1,
    explanation: 'Zero-knowledge proofs allow one party to prove to another that they know a value x, without conveying any information apart from the fact that they know the value x.',
    category: 'ZK'
  },
  {
    id: '2',
    question: 'What does SP1 stand for in the context of zero-knowledge proofs?',
    options: [
      'Secure Proof 1',
      'Succinct Proof 1',
      'Simple Protocol 1',
      'Smart Proof 1'
    ],
    correctAnswer: 1,
    explanation: 'SP1 stands for Succinct Proof 1, referring to a specific zero-knowledge proof system.',
    category: 'SP1'
  }
];

export const mockProofs: Proof[] = [
  {
    id: '1',
    title: 'Quiz Completion Proof',
    description: 'Proof of completing Zero-Knowledge Fundamentals quiz',
    status: 'Verified',
    createdAt: '2024-01-15T10:30:00Z',
    verifiedAt: '2024-01-15T10:35:00Z',
    blockchainHash: '0x1234567890abcdef',
    proofFile: 'proof_1.json',
    verificationKey: 'vk_1234567890',
    suiTransaction: '0xabcdef1234567890',
    metadata: {
      circuit: 'quiz_completion',
      publicInputs: { quizId: '1', score: 85 },
      constraints: 1024
    }
  },
  {
    id: '2',
    title: 'Achievement Unlock Proof',
    description: 'Proof of unlocking First Quiz Master achievement',
    status: 'Generating',
    createdAt: '2024-01-16T14:20:00Z',
    verificationKey: 'vk_0987654321',
    metadata: {
      circuit: 'achievement_unlock',
      publicInputs: { achievementId: 'first_quiz_master' },
      constraints: 512
    }
  }
];

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: 12,
    expiryYear: 2028,
    isDefault: true,
    billingAddress: {
      country: 'US',
      city: 'San Francisco',
      line1: '123 Main St',
      postalCode: '94102'
    }
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 2999,
    currency: 'USD',
    status: 'succeeded',
    description: 'Pro Plan - Monthly',
    createdAt: '2024-01-01T00:00:00Z',
    paymentMethod: 'Visa ending in 4242',
    invoiceUrl: 'https://example.com/invoice/1'
  }
];

export const mockSubscription: Subscription = {
  id: '1',
  planId: 'pro',
  planName: 'Pro Plan',
  status: 'active',
  currentPeriodStart: '2024-01-01T00:00:00Z',
  currentPeriodEnd: '2024-02-01T00:00:00Z',
  pricePerMonth: 29.99,
  features: ['Unlimited Quizzes', 'Advanced Proofs', 'Priority Support'],
  nextBillingDate: '2024-02-01T00:00:00Z',
  cancelAtPeriodEnd: false
};

export const mockPlans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started',
    price: 0,
    billingPeriod: 'monthly',
    features: ['5 Quizzes per month', 'Basic Proofs', 'Community Support']
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For serious learners',
    price: 29.99,
    billingPeriod: 'monthly',
    features: ['Unlimited Quizzes', 'Advanced Proofs', 'Priority Support', 'Analytics Dashboard'],
    popular: true
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'alice@example.com',
    fullName: 'Alice Johnson',
    status: 'active',
    role: 'user',
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: '2024-01-15T10:30:00Z',
    subscription: {
      planName: 'Pro Plan',
      status: 'active',
      nextBillingDate: '2024-02-01T00:00:00Z'
    },
    stats: {
      quizzesCompleted: 25,
      proofsGenerated: 12,
      totalXP: 2500,
      achievements: 8
    }
  }
];