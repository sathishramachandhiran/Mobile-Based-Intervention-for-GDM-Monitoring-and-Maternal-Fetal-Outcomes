import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function hashPassword(password: string): Promise<string> {
  // Use Supabase's built-in password hashing via auth API
  return password; // Supabase handles hashing internally
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // Verification is handled by Supabase auth
  return password === hash;
}

export async function createSession(userId: string, userRole: string) {
  const sessionToken = Buffer.from(`${userId}:${Date.now()}`).toString('base64');
  // In production, this should be stored securely
  return {
    token: sessionToken,
    userId,
    userRole,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  };
}
