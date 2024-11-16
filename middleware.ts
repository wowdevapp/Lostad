import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import { locales, defaultLocale } from './i18n/routing';
import endpoints from './app/lib/endpoints';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'never',
  // Add cookie configuration
  localeDetection: true,
  localeCookie: {
    name: 'NEXT_LOCALE',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/*',
    sameSite: 'lax'
  }
});

async function validateToken(token: string | undefined) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + endpoints.authProf.me,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.status === 200;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const publicPatterns = ['/login', '/signup'];
  const protectedPatterns = ['/dashboard'];

  // Handle locale paths
  const localePattern = `/(${locales.join('|')})`;

  // Check if current path is a public page (login/signup)
  const isPublicPage = publicPatterns.some(
    (pattern) =>
      request.nextUrl.pathname.match(
        new RegExp(`${localePattern}${pattern}`)
      ) || request.nextUrl.pathname.startsWith(pattern)
  );

  // Check if current path is a protected page (dashboard)
  const isProtectedPage = protectedPatterns.some((pattern) =>
    request.nextUrl.pathname.match(new RegExp(`${localePattern}${pattern}`))
  );

  if (!isPublicPage && !isProtectedPage) {
    return intlMiddleware(request);
  }

  // Case 1: Protected page access without token
  if (isProtectedPage && !token) {
    // Redirect to login page
    const response = NextResponse.redirect(
      new URL(`/${defaultLocale}/login`, request.url)
    );
    return response;
  }

  // Case 2: Public page access with valid token
  if (isPublicPage && token) {
    // Redirect authenticated users to dashboard
    const response = NextResponse.redirect(
      new URL(`/${defaultLocale}/dashboard`, request.url)
    );
    return response;
  }

  // Case 4: Public page normal access
  if (isPublicPage) {
    return intlMiddleware(request);
  }

  // Case 5: Validate token for protected pages
  try {
    const isValid = await validateToken(token);
    if (!isValid) {
      // Invalid token - clear it and redirect to login
      const response = NextResponse.redirect(
        new URL(`/${defaultLocale}/login`, request.url)
      );
      response.cookies.delete('token');
      return response;
    }
  } catch (error) {
    // Handle token validation errors
    console.error('Token validation error:', error);
    const response = NextResponse.redirect(
      new URL(`/${defaultLocale}/login?error=auth_error`, request.url)
    );
    response.cookies.delete('token');
    return response;
  }

  // Case 6: Valid access - proceed with middleware
  return intlMiddleware(request);
}

// Middleware configuration
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
