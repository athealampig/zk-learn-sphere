export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'crypto';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  billingAddress: {
    country: string;
    city: string;
    line1: string;
    line2?: string;
    postalCode: string;
  };
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed' | 'refunded';
  description: string;
  createdAt: string;
  paymentMethod: string;
  invoiceUrl?: string;
}

export interface Subscription {
  id: string;
  planId: string;
  planName: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  pricePerMonth: number;
  features: string[];
  nextBillingDate: string;
  cancelAtPeriodEnd: boolean;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
}