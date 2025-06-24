import { Clock, ExternalLink } from 'lucide-react';

export default function OfferExpiredPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
            <Clock className="w-12 h-12 text-red-600" />
          </div>
        </div>

        {/* Main Message */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            This Offer is Not Available Anymore!
          </h1>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-100 mb-8">
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              For more info about Ana&apos;s next live bootcamp check out
            </p>
            
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">
              How We Grow
            </div>
            
            <a 
              href="https://howwegrowtoday.substack.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Join How We Grow
              <ExternalLink className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <p className="text-blue-800 font-medium mb-2">
            Don&apos;t miss out next time!
          </p>
          <p className="text-blue-700">
            Subscribe to How We Grow to be the first to know about upcoming workshops and exclusive opportunities.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-12 text-gray-500 text-sm">
          <p>&copy; 2025 How We Grow LIVE Bootcamps. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
} 