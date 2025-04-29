import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './shared/config';
import { Route } from './shared/types';

const intlMiddleware = createMiddleware(routing);

const protectedRoutes = ['/share-recipe', '/profile'];
const authRoutes = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const intlResponse = intlMiddleware(request);

  if (intlResponse) {
    const pathWithoutLocale = pathname.replace(/^\/(en|ru|fr)/, '') || '/';

    const isProtectedRoute = protectedRoutes.some((route) => pathWithoutLocale.startsWith(route));
    const isAuthRoute = authRoutes.some((route) => pathWithoutLocale.startsWith(route));

    const isUserLoggedIn = request.cookies.has('isUserLoggedIn');

    if (isProtectedRoute && !isUserLoggedIn) {
      return NextResponse.redirect(new URL(`/${routing.defaultLocale}/${Route.LOGIN}`, request.url));
    }

    if (isAuthRoute && isUserLoggedIn) {
      return NextResponse.redirect(new URL(`/${routing.defaultLocale}/`, request.url));
    }

    return intlResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)', '/share-recipe/:path*', '/login', '/signup'],
};
