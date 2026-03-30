import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'case_auth';

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Let the login flow and Next internals through.
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/api/login') ||
    pathname.startsWith('/api/logout')
  ) {
    return NextResponse.next();
  }

  const authed = req.cookies.get(COOKIE_NAME)?.value === '1';
  if (authed) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = '/login';
  url.searchParams.set('next', pathname + search);
  return NextResponse.redirect(url);
}

export const config = {
  // Avoid intercepting Next's own assets and files.
  matcher: ['/((?!login|api/login|api/logout|_next|favicon.ico|robots.txt).*)']
};

