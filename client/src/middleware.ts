import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/share-recipe/:path*', '/profile'];
const authRoutes = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => route.startsWith(path));
  const isAuthRoute = authRoutes.some((route) => route.startsWith(path));
  const isUserLoggedIn = request.cookies.has('isUserLoggedIn');

  if (isProtectedRoute && !isUserLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (isAuthRoute && isUserLoggedIn) {
    console.log('user is already logged in');

    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/share-recipe/:path*', '/login', '/signup'],
};
