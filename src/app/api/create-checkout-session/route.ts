import { NextRequest, NextResponse } from 'next/server';
import { stripe, WORKSHOP_PRICE } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import type { ApiResponse, StripeCheckoutSession } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { leadId } = await request.json();

    if (!leadId) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Lead ID is required'
      }, { status: 400 });
    }

    // Get lead information
    const { data: lead, error: leadError } = await supabaseAdmin
      .from('leads_bootcamp_brands')
      .select('*')
      .eq('id', leadId)
      .single();

    if (leadError || !lead) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Lead not found'
      }, { status: 404 });
    }

    // Check if lead already has paid
    if (lead.has_paid) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Payment already completed'
      }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Live Workshop Access',
              description: 'Get exclusive access to our live workshop and transform your skills!',
            },
            unit_amount: WORKSHOP_PRICE,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: baseUrl,
      customer_email: lead.email,
      metadata: {
        leadId: leadId,
        name: lead.name,
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    });

    // Update lead with checkout session info
    const { error: updateError } = await supabaseAdmin
      .from('leads_bootcamp_brands')
      .update({
        has_checkout_session: true,
        stripe_session_id: session.id
      })
      .eq('id', leadId);

    if (updateError) {
      console.error('Failed to update lead:', updateError);
      // Don't fail the request, just log the error
    }

    const checkoutData: StripeCheckoutSession = {
      sessionId: session.id,
      url: session.url!
    };

    return NextResponse.json<ApiResponse<StripeCheckoutSession>>({
      success: true,
      data: checkoutData,
      message: 'Checkout session created successfully'
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to create checkout session'
    }, { status: 500 });
  }
} 