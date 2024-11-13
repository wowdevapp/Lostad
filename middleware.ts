// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get token from cookies instead of localStorage
  const token = request.cookies.get('token')?.value;

  // Define public routes that don't need authentication
  const isPublicRoute =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/signup');

  // Define protected routes
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard');
  // Redirect to login if accessing protected route without token
  if (!token && isProtectedRoute) {
    const loginUrl = new URL('/login', request.url);
    // Store the attempted URL to redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if accessing public route with token
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  return NextResponse.next();
}

// Update matcher to include all routes you want to protect
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/* (API routes)
     * 2. /_next/* (Next.js internal routes)
     * 3. /fonts/* (static font files)
     * 4. /images/* (static image files)
     * 5. /favicon.ico, /site.webmanifest (static files)
     */
    '/((?!api|_next|fonts|images|favicon.ico|site.webmanifest).*)'
  ]
};
