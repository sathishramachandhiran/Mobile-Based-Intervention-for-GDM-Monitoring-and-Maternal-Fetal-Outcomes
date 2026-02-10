import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const authToken = request.cookies.get('auth_token');

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/auth/login', '/auth/signup', '/education'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Redirect to login if trying to access protected route without auth
  if (!isPublicRoute && !authToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Redirect to dashboard if logged in and trying to access auth pages
  if (authToken && pathname.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
