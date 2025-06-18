import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn('STRIPE_SECRET_KEY is not set. Using placeholder for build.');
}

export const stripe = new Stripe(stripeSecretKey || 'sk_test_placeholder', {
  apiVersion: '2025-05-28.basil',
  typescript: true,
});

export const WORKSHOP_PRICE = parseInt('9700'); // $97.00 in cents 