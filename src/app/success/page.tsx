'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Calendar, Mail, Users, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const session_id = searchParams.get('session_id');
    if (session_id) {
      setSessionId(session_id);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Success Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-8">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Welcome to the Workshop! 🎉
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Congratulations! Your payment was successful and you&apos;re now registered for our exclusive live workshop. 
            Get ready to transform your skills!
          </p>

          {sessionId && (
            <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-gray-600">
                Order ID: <span className="font-mono text-gray-900">{sessionId.slice(-12)}</span>
              </p>
            </div>
          )}
        </div>

        {/* What's Next Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            What Happens Next?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Check Your Email</h3>
                  <p className="text-gray-600">You&apos;ll receive a confirmation email with all workshop details within the next 5 minutes.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Mark Your Calendar</h3>
                  <p className="text-gray-600">The workshop is scheduled for next week. We&apos;ll send you reminder emails with the exact date and time.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Join me on Substack</h3>
                  <p className="text-gray-600">Get access to our exclusive Substack community where you can network and ask questions.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Workshop Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">90-minute live session</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">Interactive Q&A included</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">Bonus materials & recordings</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">Email support included</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bonus Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-white p-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Exclusive Bonus Materials</h2>
            <p className="text-lg mb-6 text-purple-100">
              As a workshop participant, you&apos;ll also receive these valuable bonuses:
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl mb-2">📚</div>
                <h3 className="font-semibold mb-2">Resource Pack</h3>
                <p className="text-sm text-purple-100">Comprehensive guides and templates</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl mb-2">🎥</div>
                <h3 className="font-semibold mb-2">Recording Access</h3>
                <p className="text-sm text-purple-100">Lifetime access to workshop recording</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl mb-2">💬</div>
                <h3 className="font-semibold mb-2">Private Community</h3>
                <p className="text-sm text-purple-100">Join our exclusive participant network</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Have Questions?
          </h2>
          <p className="text-gray-600 mb-8">
            Our support team is here to help. Don&apos;t hesitate to reach out if you need anything.
          </p>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Button variant="outline" size="lg">
              <Mail className="w-5 h-5 mr-2" />
              Contact Support
            </Button>
            
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => window.open('https://howwegrowtoday.substack.com/', '_blank')}
            >
              Join Community
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Can&apos;t find the confirmation email? Check your spam folder or contact us for help.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
} 