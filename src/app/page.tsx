'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Users, Clock, Star, ArrowRight, Shield } from 'lucide-react';
import { formatPrice } from '@/utils/validation';
import { LeadForm } from '@/components/forms/LeadForm';
import type { Lead, ApiResponse, StripeCheckoutSession } from '@/types';

const WORKSHOP_PRICE = 9700; // $97.00 in cents

export default function LandingPage() {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLeadSuccess = async (leadData: Lead) => {
    setIsProcessingPayment(true);
    setError(null);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leadId: leadData.id }),
      });

      const result: ApiResponse<StripeCheckoutSession> = await response.json();

      if (result.success && result.data) {
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
      {/* Hero Section */}
      <section className="relative px-6 py-8 sm:py-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
              <Star className="w-4 h-4 mr-2" />
              Limited Time - ONCE In A Live Time Workshop
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            The Income Stream You&rsquo;re Ignoring: 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> How Small Creators Make $3K+ Monthly From Brand Partnerships</span>
          </h1>
          
          <div className="mb-8">
            <div className="relative w-[60%] h-150 mx-auto">
            <Image
              src="/imgs/t5.png"
              alt="Brand Partnership Success"
                fill
                className="rounded-lg object-cover"
              style={{
                  objectPosition: 'center 20%'
              }}
              priority
            />
            </div>
          </div>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover the hidden opportunity that most creators overlook. Learn the exact strategies small creators (1K-10K followers) use to land consistent brand partnerships and build a reliable $3K+ monthly income stream.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="#form-section">
              <Button size="lg" className="text-xl px-10 py-5">
                Secure Your Spot Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <div className="text-sm text-gray-500">
              Only {formatPrice(WORKSHOP_PRICE)} 
            </div>
          </div>
          
          {/* Hero Badges */}
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-blue-500" />
              500+ Students
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-blue-500" />
              90 Minutes Live
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
              Instant Access
            </div>
          </div>
        </div>
      </section>

      {/* Creator Revenue Tunnel Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-xl mb-6">
              If you&rsquo;re reading this, you likely know how difficult it can be to make consistent money as a creator.
            </p>
            
            <p className="text-xl mb-6">
              And...
            </p>
            
            <p className="text-xl mb-6">
              If you&rsquo;re like most creators, you use the &ldquo;hope strategy&rdquo; to monetize your content:
            </p>
            
            <div className="bg-white rounded-lg p-6 mb-8 border-l-4 border-blue-500">
              <p className="mb-4">You <strong>HOPE</strong> your next Substack post converts to paid subscribers.</p>
              <p className="mb-4">You <strong>HOPE</strong> your workshop actually sells this time.</p>
              <p className="mb-0">You <strong>HOPE</strong> that affiliate link finally generates some commissions.</p>
            </div>
            
            <p className="text-xl mb-6">
              But...
            </p>
            
            <p className="text-xl mb-6">
              The problem is, these income streams put you at the mercy of your audience&rsquo;s buying decisions. When your creator business is driven by subscriptions and course sales, you&rsquo;re always wondering if this month will be the month everything falls apart.
            </p>
            
            <p className="text-xl mb-6">
              Creators struggle to make any real money because they limit themselves to the same 2-3 monetization methods everyone talks about.
            </p>
            
            <p className="text-xl mb-6">
              That means when revenue DOES come in, you feel like you have to squeeze every penny out of those income streams.
            </p>
            
            <p className="text-xl mb-6">
              And hoo boy...
            </p>
            
            <p className="text-xl mb-6">
              Is THAT exhausting.
            </p>
            
            <p className="text-xl mb-6">
              One failed course launch can completely wreck your mental (and financial) well being.
            </p>
            
            <div className="text-center bg-red-50 rounded-lg p-4 border border-red-200">
              <p className="text-2xl font-bold text-red-700">
                I call this Creator Revenue Tunnel Vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Revenue Tunnel Vision Effects Section */}
      <section className="py-8 bg-pink-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-pink-50 rounded-lg p-8 border-l-4 border-red-400">
            <h3 className="text-3xl font-bold text-gray-800 mb-8">
              Creator Revenue Tunnel Vision means you...
            </h3>
            
            <ul className="space-y-6 text-xl text-gray-700">
              <li className="flex items-start">
                <span className="text-2xl mr-4 text-gray-600">•</span>
                <span>Miss obvious income opportunities sitting right in front of you</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-4 text-gray-600">•</span>
                <span>Burn out from constantly creating new products to sell</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-4 text-gray-600">•</span>
                <span>Stress about subscriber churn and conversion rates</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-4 text-gray-600">•</span>
                <span>Leave thousands of dollars on the table every month</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-4 text-gray-600">•</span>
                <span>Feel like you&rsquo;re one bad month away from financial disaster</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Solution Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-xl mb-6">
              Any one of these can make your creator life hellish.
            </p>
            
            <p className="text-xl mb-6">
              Most creators suffer from two, three, or all of these problems.
            </p>
            
            <p className="text-xl mb-6">
              Why would you limit yourself like this?
            </p>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-8 border-l-4 border-blue-500">
              <p className="text-xl font-semibold text-blue-900 mb-4">
                Answer: Because deep down, you don&rsquo;t think you&rsquo;re &ldquo;big enough&rdquo; for other income streams.
              </p>
            </div>
            
            <p className="text-xl mb-6">
              Heck.
            </p>
            
            <p className="text-xl mb-6">
              At this point, you may be skeptical that brands would even want to work with &ldquo;small&rdquo; creators.
            </p>
            
            <p className="text-xl mb-8 font-semibold text-green-700">
              I&rsquo;m here to tell you they DO.
            </p>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 mb-8 border border-green-200">
              <p className="text-xl mb-6">
                Slowly over the last 18 months, I&rsquo;ve been adding brand partnerships to my income mix. ONLY quality partnerships. The time-wasters get ignored.
              </p>
              
              <p className="text-xl mb-6">
                And you&rsquo;ve seen the numbers.
              </p>
              
              <div className="text-center bg-white rounded-lg p-6 border-2 border-green-300 mb-6">
                <p className="text-3xl font-bold text-green-700 mb-2">
                  $5,250 this month alone from brand partnerships.
                </p>
              </div>
              
              <p className="text-xl font-semibold text-center text-gray-800">
                The money speaks for itself.
              </p>
            </div>
            
            <div className="mt-8">
              <div className="relative w-[100%] h-120 mx-auto">
                <Image
                  src="/imgs/t6.png"
                  alt="Brand Partnership Success Evidence"
                  fill
                  className="rounded-lg object-cover"
                  style={{
                    objectPosition: 'center center'
                  }}
                />
              </div>
            </div>
            
            {/* Mid-Page CTA Section */}
            <div className="mt-12 mb-8 text-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Learn This Exact System?
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  Join the live workshop and discover how to land your first $2K+ brand partnership
                </p>
                <Link href="#form-section">
                  <Button variant="secondary" size="lg" className="text-xl px-8 py-4 bg-white text-blue-600 hover:bg-gray-100">
                    Save Your Seat Now! (Only 48H Left!)
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-xl mb-6 text-gray-700">
                As you can see, this process is working for me.
              </p>
              
              <p className="text-xl mb-6 text-gray-700">
                The question I want to ask you is...
              </p>
              
              <p className="text-xl font-bold text-gray-800">
                What if you had a system that you could use to attract quality brand partnerships on demand?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-green-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-green-50 rounded-lg p-8 border-l-4 border-green-400">
            <h3 className="text-3xl font-bold text-gray-800 mb-8">
              That would mean:
            </h3>
            
            <ul className="space-y-6 text-xl text-gray-700">
              <li className="flex items-start">
                <span className="text-2xl mr-4 text-gray-600">•</span>
                <span>No more relying on just subscriptions and course sales</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-4 text-gray-600">•</span>
                <span>No more panic when subscriber growth slows down</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-4 text-gray-600">•</span>
                <span>No more wondering &ldquo;what product should I create next?&rdquo;</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-4 text-gray-600">•</span>
                <span>No more leaving money on the table</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-4 text-gray-600">•</span>
                <span>No more thinking you&rsquo;re &ldquo;too small&rdquo; for real income</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Brand Deal Reality Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <div className="bg-blue-50 rounded-xl p-8 mb-8 border border-blue-200">
              <p className="text-xl mb-6 text-blue-900 font-medium">
                I&rsquo;m offering you a world where you diversify your creator income. You can build the sustainable creator business you actually want, working with brands that respect your audience, and - frankly - making a lot more money doing it.
              </p>
              
              <p className="text-xl font-semibold text-blue-800">
                You can have multiple income streams AND peace of mind.
              </p>
            </div>
            
            <p className="text-xl mb-6">
              And if you&rsquo;ve spent much time in the creator economy, you&rsquo;re probably wondering...
            </p>
            
            <div className="text-center bg-red-50 rounded-lg p-6 mb-8 border-2 border-red-200">
              <p className="text-2xl font-bold text-red-700 italic">
                &ldquo;Why the heck are you talking about BRAND DEALS?!&rdquo;
              </p>
            </div>
            
            <p className="text-xl mb-6">
              It&rsquo;s a fair question.
            </p>
            
            <p className="text-xl mb-6">
              Especially since, earlier today, you probably saw another newsletter about &ldquo;10 Ways to Monetize Your Newsletter&rdquo; that mentioned the same tired strategies: paid subscriptions, sponsored content, affiliate marketing.
            </p>
            
            <p className="text-xl mb-6">
              If you&rsquo;re not seeing what I&rsquo;m seeing, talking about brand partnerships might seem impossible for your size.
            </p>
            
            <div className="bg-yellow-50 rounded-lg p-6 mb-8 border-l-4 border-yellow-400">
              <p className="text-xl mb-4 text-yellow-900">
                Especially with all these gurus telling you that you need 100K+ followers to work with brands.
              </p>
              
              <p className="text-xl mb-4 text-yellow-900">
                In guru world, small creators can&rsquo;t get brand deals.
              </p>
              
              <p className="text-xl font-semibold text-yellow-800">
                You need massive reach to make real money, they say.
              </p>
            </div>
            
            <p className="text-xl mb-6">
              But if that&rsquo;s true...
            </p>
            
            <p className="text-xl mb-8 font-semibold">
              How do you explain...
            </p>
            
            <div className="text-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-8 border-2 border-green-300">
              <p className="text-4xl font-bold text-green-700 mb-4">
                The $5,250 I&rsquo;ve made this month from brand partnerships?
              </p>
              <div className="w-16 h-1 bg-green-500 mx-auto mb-6"></div>
              
              <div className="mt-6">
                <div className="relative w-[100%] h-96 mx-auto">
                  <Image
                    src="/imgs/t7.png"
                    alt="Brand Partnership Revenue Evidence"
                    fill
                    className="rounded-lg object-cover"
                    style={{
                      objectPosition: 'center center'
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-xl mb-6 text-gray-700">
                Or...
              </p>
              
              <p className="text-xl mb-6 text-gray-700">
                How do you explain...
              </p>
              
              <p className="text-xl font-bold text-gray-800">
                Newsletter creators with 5K subscribers landing $2K deals?
              </p>
              
              <div className="mt-8">
                <div className="relative w-[100%] h-96 mx-auto">
                  <Image
                    src="/imgs/t8.png"
                    alt="Small Creator Brand Partnership Success"
                    fill
                    className="rounded-lg object-cover"
                    style={{
                      objectPosition: 'center center'
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-xl mb-6 text-gray-700">
                Couple more examples...
              </p>
              
              <p className="text-xl font-bold text-gray-800">
                How do you explain LinkedIn accounts with 4.5K followers getting monthly retainers?
              </p>
              
              <div className="mt-8">
                <div className="relative w-[100%] h-96 mx-auto">
                  <Image
                    src="/imgs/t9.png"
                    alt="Instagram Creator Monthly Retainer Success"
                    fill
                    className="rounded-lg object-cover"
                    style={{
                      objectPosition: 'center center'
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-xl mb-6 text-gray-700">
                Or...
              </p>
              
              <p className="text-xl font-bold text-gray-800">
                Creators with 2K TikTok followers making more from one brand partnership than their last course launch?
              </p>
            </div>
            
            {/* Beautiful Divider */}
            <div className="mt-16 mb-16">
              <div className="flex items-center justify-center">
                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <div className="mx-6 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </div>
            </div>
            
            {/* Brand Reality Check Section */}
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl mb-6 text-gray-700">
                Here&rsquo;s a crazy idea I want to float by you.
              </p>
              
              <p className="text-xl mb-6 text-gray-700">
                Could it be...
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200">
                <p className="text-lg italic text-blue-800 mb-4">
                  (Imagine this for a moment...)
                </p>
              </div>
              
              <p className="text-xl mb-6 text-gray-700">
                Could it be that in the world of fake followers, bot engagement, and mega-influencer scandals...
              </p>
              
              <p className="text-2xl font-bold mb-8 text-gray-800">
                Could it be that brands actually want to work with real creators who know their audiences?
              </p>
              
              <div className="bg-green-50 rounded-xl p-8 border-2 border-green-200">
                <p className="text-xl font-semibold text-green-800 mb-4">
                  My bank account says yes.
                </p>
                
                <p className="text-xl font-semibold text-green-700">
                  Also, my brand partners say yes.
                </p>
              </div>
            </div>
            
            {/* Beautiful Title Section */}
            <div className="mt-12 mb-8 text-center">
              <div className="max-w-4xl mx-auto">
                
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                  <span className="block mb-2">The Path to Getting</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                    Quality Brand Partnerships
                  </span>
                  <span className="block mt-2">On Demand Using Social Media</span>
                </h2>
              </div>
            </div>
            
            {/* Workshop Content Section */}
            <div className="max-w-4xl mx-auto px-6 mb-16">
              {/* Part 1 */}
              <div className="bg-gray-100 rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Part 1 -- Building Your &ldquo;Brand Partnership Foundation&rdquo;
                </h3>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Over my years building a newsletter to 50K+ subscribers and working with dozens of brands, I&rsquo;ve developed a system for attracting the right partnerships.
                </p>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  After Part 1 of this workshop, you&rsquo;ll know exactly how to position yourself as someone brands want to work with, regardless of your follower count.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  Even if you get nothing else from this workshop, Part 1 will save you from undercharging, overdelivering, and working with nightmare brands.
                </p>
              </div>
              
              {/* Part 2 */}
              <div className="bg-gray-100 rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Part 2 -- Creating Your &ldquo;Brand Magnet&rdquo; Content Strategy
                </h3>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  The content you create determines which brands notice you...
                </p>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  If you&rsquo;re creating random content without strategy, you&rsquo;ll either get ignored by brands or attract the wrong ones entirely.
                </p>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  In Part 2, we&rsquo;ll build your content strategy that attracts quality brand partners - how to demonstrate your value before they even reach out, how to show brands you understand your audience, and how to create partnership opportunities even if you&rsquo;ve never worked with a brand before.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  The content you create BEFORE brands find you makes all the difference.
                </p>
              </div>
              
              {/* Part 3 */}
              <div className="bg-gray-100 rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Part 3: Scaling Your Partnership Income
                </h3>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  You&rsquo;re now getting brand inquiries and need to make smart decisions:
                </p>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  How do you evaluate which partnerships are worth your time and which ones to avoid?
                </p>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Many creators who start getting brand deals sabotage themselves by saying yes to everything. When you know how to spot quality partnerships - and have the systems to manage them - you can build sustainable partnership income that grows month after month.
                </p>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  You can scale your creator business beyond subscriptions and courses.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  We&rsquo;ll cover all this in an efficient 90 minute workshop with Q&A throughout to remove confusion.
                </p>
              </div>
              
              {/* Hidden Gems Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Other &ldquo;hidden gems&rdquo; in this workshop...
                </h3>
                
                <ul className="space-y-4 text-lg text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span>How to price yourself when you don&rsquo;t have &ldquo;influencer rates&rdquo; to reference - this alone will prevent you from leaving thousands on the table</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span>The media kit template that gets responses (even if you think your numbers are &ldquo;too small&rdquo;)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span>8 &ldquo;Bad Brand Red Flags&rdquo; that nightmare brand partners flash - these aren&rsquo;t obvious, but when you see them, run</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span>8 &ldquo;Quality Brand Green Flags&rdquo; that signal partnerships worth pursuing - also not obvious, but when you spot these, say yes immediately</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span>Platform-specific strategies for Substack, LinkedIn, Twitter, and Instagram creators</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span>The follow-up sequence that turns brand inquiries into signed contracts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span>Why most creators price themselves wrong (and the simple framework that fixes it)</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Pricing Section */}
            <div className="max-w-3xl mx-auto px-6 mb-4">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-10 border-2 border-blue-200 shadow-2xl text-center relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-blue-400/20 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  
                  <h3 className="text-4xl font-bold text-gray-900 mb-8">
                    Pricing For This Workshop
                  </h3>
                  
                  <div className="bg-white/80 backdrop-blur rounded-xl p-6 mb-6 border border-blue-100">
                    <p className="text-2xl font-bold text-blue-700 mb-2">$97</p>
                    <p className="text-lg text-gray-700">
                      No refunds, guarantees, or unrealistic promises.
                    </p>
                  </div>
                  
                  <p className="text-xl text-gray-700 mb-6 leading-relaxed font-semibold">
                    June 24th at 10:00 A.M. EST
                  </p>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    If you buy a ticket but cannot attend, the workshop will be recorded and sent to you.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Final CTA Section - Dark */}
            <div className="max-w-3xl mx-auto px-6 text-center">
              <div className="bg-slate-700 rounded-2xl p-12">
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 leading-tight">
                  Ready to Add $3K+ Monthly to Your Creator Income?
                </h2>
                
                <p className="text-2xl text-white mb-6 font-medium">
                  Live workshop: <span className="font-bold">June 24th, 10 am EST</span>
                </p>
                
                <p className="text-xl text-white mb-6">
                  90 minutes + Q&A
                </p>
                
                <p className="text-xl text-white mb-12">
                  Recorded if you can&rsquo;t attend live
                </p>
                
                <Link href="#form-section">
                  <button className="bg-red-600 hover:bg-red-700 text-white text-2xl font-bold px-12 py-6 rounded-lg mb-6 transition-colors duration-200 inline-block">
                    Get Your Workshop Seat - $97
                  </button>
                </Link>
                
                <p className="text-gray-400 text-lg">
                  Limited spots available for quality Q&A experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Join Hundreds of Successful Students
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg mb-4 italic">
                &ldquo;Ana transformed my murky notions of substack strategy into a nuanced understanding of how to grow. By applying her clear, practical guidance along with her detailed, actionable templates, I`m empowered to succeed. &rdquo;
              </p>
              <p className="font-semibold">- Juliette</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg mb-4 italic">
                &ldquo;Finally have a clear path going forward. Ana provides clear advice and actionable steps on how to grow your Substack. Thank you Ana!&rdquo;
              </p>
              <p className="font-semibold">- Michael W.</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg mb-4 italic">
                &ldquo;I`m a big fan of Ana`s content on growing a business. She really knows what she`s talking about &rdquo;
              </p>
              <p className="font-semibold">- Phillip H.</p>
            </div>
         

          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg mb-4 italic">
                &ldquo;I finally see the possibility of monetizing here! I`m still grinning about how thorough and action oriented this Boot Camp was. &rdquo;
              </p>
              <p className="font-semibold">-  Adora</p>
            </div>
          </div>
          
          <Link href="#form-section">
            <Button variant="secondary" size="lg" className="text-xl px-10 py-5">
              Join Them Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Limited Seats Available
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We&rsquo;re keeping this workshop small to ensure everyone gets personal attention. 
            Once we&rsquo;re full, the next opportunity won&rsquo;t be for months.
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto mb-8">
            <div className="text-4xl font-bold text-red-600 mb-2">{formatPrice(WORKSHOP_PRICE)}</div>
            <div className="text-gray-500 line-through mb-2">$297 Regular Price</div>
            <div className="text-green-600 font-semibold">Save $200 Today Only!</div>
          </div>
          
          <Link href="#form-section">
            <Button size="lg" className="text-xl px-10 py-5 animate-pulse">
              Claim Your Spot Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          
          <p className="text-sm text-gray-500 mt-4">
            LIVE & Recording access • Secure checkout • Instant access
          </p>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="form-section" className="py-16 bg-gray-50 scroll-mt-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Save Your Seat Now! (Only 48H Left!)
            </h2>
            <p className="text-xl text-gray-600">
              Just one step away from transforming your skills
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
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
              <>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  Your Information
                </h3>
                <LeadForm onSuccess={handleLeadSuccess} onError={handleLeadError} />
              </>
            )}
          </div>

          <div className="text-center text-sm text-gray-500 space-y-2">
            <p className="flex items-center justify-center">
              <Shield className="w-4 h-4 mr-2 text-green-600" />
              Your information is secure and will never be shared
            </p>
            <p>💳 Powered by Stripe - Industry-leading payment security</p>
            <p>📧 You&apos;ll receive instant access details via email</p>
          </div>
        </div>
      </section>
    </div>
  );
}
