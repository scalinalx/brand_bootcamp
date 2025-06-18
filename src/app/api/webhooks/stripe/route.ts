import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  console.log('🔔 Webhook received');
  
  const body = await request.text();
  const signature = (await headers()).get('stripe-signature');

  console.log('📝 Webhook signature present:', !!signature);
  console.log('📝 Webhook secret configured:', !!process.env.STRIPE_WEBHOOK_SECRET);

  if (!signature) {
    console.log('❌ No signature provided');
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log('✅ Webhook signature verified');
    console.log('📝 Event type:', event.type);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    console.log('💳 Processing checkout.session.completed');
    const session = event.data.object;
    const leadId = session.metadata?.leadId;

    console.log('📝 Lead ID from metadata:', leadId);
    console.log('📝 Session ID:', session.id);

    if (!leadId) {
      console.error('❌ No leadId found in session metadata');
      return NextResponse.json(
        { error: 'No leadId in metadata' },
        { status: 400 }
      );
    }

    try {
      console.log('🔄 Attempting to update lead in database...');
      
      // Update lead as paid
      const { error, data } = await supabaseAdmin
        .from('leads_bootcamp_brands')
        .update({
          has_paid: true,
          stripe_session_id: session.id,
          payment_completed_at: new Date().toISOString()
        })
        .eq('id', leadId)
        .select();

      if (error) {
        console.error('❌ Failed to update lead payment status:', error);
        return NextResponse.json(
          { error: 'Failed to update lead' },
          { status: 500 }
        );
      }

      console.log('✅ Successfully updated lead:', data);
      console.log(`🎉 Payment completed for lead ${leadId}`);
      
      // Here you could add additional logic like:
      // - Send confirmation email
      // - Add to workshop attendee list
      // - Trigger integrations with other tools
      
    } catch (error) {
      console.error('❌ Error processing webhook:', error);
      return NextResponse.json(
        { error: 'Webhook processing failed' },
        { status: 500 }
      );
    }
  } else {
    console.log('📝 Ignoring event type:', event.type);
  }

  console.log('✅ Webhook processed successfully');
  return NextResponse.json({ received: true });
} 