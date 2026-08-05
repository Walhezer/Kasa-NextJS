import { NextResponse, type NextRequest } from 'next/server';

/**
 * Next.js Edge Proxy for route protection in Kasa.
 * Verifies the authentication cookie to secure private routes and prevent unauthorized access.
 */
export function proxy(request: NextRequest) {
  const token = request.cookies.get('kasa_token')?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/ajouter', '/favorites', '/messages'];
  const isProtectedPage = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

/**
 * Proxy configuration defining the exact route paths to intercept for Kasa.
 */
export const config = {
  matcher: [
    '/ajouter/:path*',
    '/favorites/:path*',
    '/messages/:path*',
  ],
};