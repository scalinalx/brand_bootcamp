'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LeadForm } from '@/components/forms/LeadForm';
import { ArrowLeft, Shield, Clock, CheckCircle } from 'lucide-react';
import { formatPrice } from '@/utils/validation';
import type { Lead, ApiResponse, StripeCheckoutSession } from '@/types';

const WORKSHOP_PRICE = 9700; // $97.00 in cents

function LeadCollectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const canceled = searchParams.get('canceled');

  const handleLeadSuccess = async (leadData: Lead) => {
    setIsProcessingPayment(true);
    setError(null);

    try {
      // Create Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leadId: leadData.id }),
      });

      const result: ApiResponse<StripeCheckoutSession> = await response.json();

      if (result.success && result.data) {
        // Redirect to Stripe checkout
        window.location.href = result.data.url;
      } else {
        setError(result.error || 'Failed to create checkout session');
        setIsProcessingPayment(false);
      }
    } catch {
      setError('Network error. Please try again.');
      setIsProcessingPayment(false);
    }
  };

  const handleLeadError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Workshop Details
          </button>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Secure Your Workshop Seat
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Just one step away from transforming your skills
          </p>
          
          {/* Price Display */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border max-w-sm mx-auto mb-8">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatPrice(WORKSHOP_PRICE)}
            </div>
            <div className="text-gray-500 line-through text-lg mb-2">$297</div>
            <div className="text-green-600 font-semibold">Limited Time Offer</div>
          </div>
        </div>

        {/* Canceled Message */}
        {canceled && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <p className="text-yellow-800">
              Payment was canceled. No worries! You can try again below.
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
            <Shield className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-sm text-gray-700">Secure Payment</span>
          </div>
          <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
            <Clock className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-sm text-gray-700">Instant Access</span>
          </div>
          <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-sm text-gray-700">LIVE & Recorded</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Your Information
          </h2>
          
          {isProcessingPayment ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Redirecting to Secure Checkout...
              </h3>
              <p className="text-gray-600">
                Please wait while we prepare your payment page
              </p>
            </div>
          ) : (
            <LeadForm onSuccess={handleLeadSuccess} onError={handleLeadError} />
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 space-y-2">
          <p>🔒 Your information is secure and will never be shared</p>
          <p>💳 Powered by Stripe - Industry-leading payment security</p>
          <p>📧 You&apos;ll receive instant access details via email</p>
        </div>
      </div>
    </div>
  );
}

export default function LeadCollectionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    }>
      <LeadCollectionContent />
    </Suspense>
  );
} 