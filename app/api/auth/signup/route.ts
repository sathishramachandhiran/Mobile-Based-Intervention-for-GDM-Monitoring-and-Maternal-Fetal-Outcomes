import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName, role } = await request.json();

    // Validate input
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Email, password, and full name are required' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Create user with Supabase Auth using public signUp method
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role || 'patient',
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
      },
    });

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: authError?.message || 'Signup failed' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: 'Account created successfully. You can now log in.',
        user: {
          id: authData.user.id,
          email: authData.user.email,
          role: role || 'patient',
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
