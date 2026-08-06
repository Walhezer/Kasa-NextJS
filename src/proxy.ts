import { NextResponse, type NextRequest } from 'next/server';

/**
 * Next.js middleware function used as an Edge Proxy for route protection.
 * Verifies the presence of the authentication cookie to secure private routes 
 * and redirect unauthorized users to the login page.
 * 
 * @param {NextRequest} request - The incoming Next.js request object containing cookies and URL information.
 * @returns {NextResponse} A Next.js response that either redirects to the login page or proceeds to the requested route.
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
 * Middleware configuration object.
 * Defines the exact route paths (and their sub-paths) that the middleware should intercept.
 * 
 * @type {Object}
 * @property {string[]} matcher - Array of route patterns to protect.
 */
export const config = {
  matcher: [
    '/ajouter/:path*',
    '/favorites/:path*',
    '/messages/:path*',
  ],
};