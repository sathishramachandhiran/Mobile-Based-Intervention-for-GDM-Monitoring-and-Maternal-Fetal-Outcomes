import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      // Handle email not confirmed error
      if (authError.code === 'email_not_confirmed') {
        // Try to refresh the session or resend confirmation
        return NextResponse.json(
          { error: 'Please check your email to confirm your account, or contact support.' },
          { status: 403 }
        );
      }
      return NextResponse.json(
        { error: authError?.message || 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (!authData.user || !authData.session) {
      return NextResponse.json(
        { error: 'Login failed - please try again' },
        { status: 401 }
      );
    }

    // Get user role from metadata (since profile table has RLS issues)
    const userRole = (authData.user?.user_metadata?.role as string) || 'patient';

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set('auth_token', authData.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    cookieStore.set('user_role', userRole, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
    });

    return NextResponse.json(
      {
        message: 'Login successful',
        user: {
          id: authData.user.id,
          email: authData.user.email,
          role: userRole,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
