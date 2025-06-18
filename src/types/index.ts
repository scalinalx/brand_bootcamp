export interface Lead {
  id?: string;
  email: string;
  name: string;
  hasCheckoutSession?: boolean;
  stripeSessionId?: string;
  hasPaid?: boolean;
  paymentCompletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LeadFormData {
  email: string;
  name: string;
}

export interface StripeCheckoutSession {
  sessionId: string;
  url: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 