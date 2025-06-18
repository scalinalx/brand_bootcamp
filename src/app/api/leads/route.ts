import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { validateEmail, validateName } from '@/utils/validation';
import type { LeadFormData, ApiResponse, Lead } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: LeadFormData = await request.json();
    const { email, name } = body;

    // Validate required fields
    if (!email || !name) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Invalid email format'
      }, { status: 400 });
    }

    // Validate name
    if (!validateName(name)) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Name must be at least 2 characters long'
      }, { status: 400 });
    }

    // Check if lead already exists
    const { data: existingLead } = await supabaseAdmin
      .from('leads_bootcamp_brands')
      .select('*')
      .eq('email', email)
      .single();

    if (existingLead) {
      const leadData: Lead = {
        id: existingLead.id,
        email: existingLead.email,
        name: existingLead.name,
        hasCheckoutSession: existingLead.has_checkout_session,
        hasPaid: existingLead.has_paid,
        paymentCompletedAt: existingLead.payment_completed_at,
        createdAt: existingLead.created_at,
        updatedAt: existingLead.updated_at
      };

      return NextResponse.json<ApiResponse<Lead>>({
        success: true,
        data: leadData,
        message: 'Lead already exists'
      });
    }

    // Create new lead
    const { data: newLead, error } = await supabaseAdmin
      .from('leads_bootcamp_brands')
      .insert([{
        email,
        name,
        has_checkout_session: false,
        has_paid: false
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Failed to create lead'
      }, { status: 500 });
    }

    // Transform database fields to match our interface
    const leadData: Lead = {
      id: newLead.id,
      email: newLead.email,
      name: newLead.name,
      hasCheckoutSession: newLead.has_checkout_session,
      hasPaid: newLead.has_paid,
      paymentCompletedAt: newLead.payment_completed_at,
      createdAt: newLead.created_at,
      updatedAt: newLead.updated_at
    };

    return NextResponse.json<ApiResponse<Lead>>({
      success: true,
      data: leadData,
      message: 'Lead created successfully'
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
} 