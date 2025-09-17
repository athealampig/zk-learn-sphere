import { z } from 'zod';
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from './constants';

// Authentication schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms')
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Contact form schema
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  category: z.enum(['general', 'technical', 'billing', 'feedback'])
});

// File upload schema
export const fileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine(file => file.size <= MAX_FILE_SIZE, 'File size must be less than 10MB')
    .refine(
      file => ALLOWED_FILE_TYPES.includes(file.type),
      'File type not supported'
    ),
  description: z.string().optional()
});

// Quiz creation schema
export const quizSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum(['ZK', 'SP1', 'Soundness Layer', 'Blockchain', 'DeFi', 'Security']),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  xpReward: z.number().min(10, 'XP reward must be at least 10'),
  questions: z.array(z.object({
    question: z.string().min(10, 'Question must be at least 10 characters'),
    options: z.array(z.string()).min(2, 'Must have at least 2 options'),
    correctAnswer: z.number().min(0),
    explanation: z.string().min(5, 'Explanation must be at least 5 characters')
  })).min(1, 'Quiz must have at least 1 question')
});

// Question schema
export const questionSchema = z.object({
  question: z.string().min(10, 'Question must be at least 10 characters'),
  options: z.array(z.string().min(1, 'Option cannot be empty')).min(2).max(6),
  correctAnswer: z.number().min(0),
  explanation: z.string().min(5, 'Explanation must be at least 5 characters'),
  category: z.string().min(1, 'Category is required'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert'])
});

// Proof generation schema  
export const proofGenerationSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  circuit: z.string().min(1, 'Circuit is required'),
  publicInputs: z.record(z.any()),
  privateInputs: z.record(z.any()),
  files: z.array(z.instanceof(File)).optional()
});

// User management schema
export const userUpdateSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['user', 'admin', 'moderator']),
  status: z.enum(['active', 'inactive', 'suspended'])
});

// Payment schema
export const paymentMethodSchema = z.object({
  type: z.enum(['card', 'bank']),
  cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
  expiryMonth: z.number().min(1).max(12),
  expiryYear: z.number().min(new Date().getFullYear()),
  cvv: z.string().regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
  name: z.string().min(2, 'Name is required'),
  billingAddress: z.object({
    line1: z.string().min(5, 'Address is required'),
    line2: z.string().optional(),
    city: z.string().min(2, 'City is required'),
    country: z.string().min(2, 'Country is required'),
    postalCode: z.string().min(3, 'Postal code is required')
  })
});

// Search schema
export const searchSchema = z.object({
  query: z.string().min(1, 'Search query cannot be empty'),
  filters: z.object({
    category: z.string().optional(),
    difficulty: z.string().optional(),
    status: z.string().optional(),
    dateFrom: z.string().optional(),
    dateTo: z.string().optional()
  }).optional()
});

// Settings schema
export const systemSettingsSchema = z.object({
  siteName: z.string().min(2, 'Site name is required'),
  siteDescription: z.string().min(10, 'Site description is required'),
  maintenanceMode: z.boolean(),
  registrationEnabled: z.boolean(),
  maxFileSize: z.number().min(1024), // in bytes
  allowedFileTypes: z.array(z.string()),
  emailSettings: z.object({
    smtpHost: z.string().min(1, 'SMTP host is required'),
    smtpPort: z.number().min(1).max(65535),
    smtpUser: z.string().email('Invalid email'),
    smtpPassword: z.string().min(1, 'Password is required'),
    fromEmail: z.string().email('Invalid email'),
    fromName: z.string().min(1, 'From name is required')
  }),
  notifications: z.object({
    emailEnabled: z.boolean(),
    pushEnabled: z.boolean(),
    slackWebhook: z.string().url().optional()
  })
});

// Export types
export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type ContactData = z.infer<typeof contactSchema>;
export type FileUploadData = z.infer<typeof fileUploadSchema>;
export type QuizData = z.infer<typeof quizSchema>;
export type QuestionData = z.infer<typeof questionSchema>;
export type ProofGenerationData = z.infer<typeof proofGenerationSchema>;
export type UserUpdateData = z.infer<typeof userUpdateSchema>;
export type PaymentMethodData = z.infer<typeof paymentMethodSchema>;
export type SearchData = z.infer<typeof searchSchema>;
export type SystemSettingsData = z.infer<typeof systemSettingsSchema>;