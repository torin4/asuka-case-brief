import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'case_auth';

function normalizeNext(next: unknown): string {
  const n = typeof next === 'string' ? next : '/case-dashboard';
  if (!n.startsWith('/')) return '/case-dashboard';
  if (n === '/') return '/case-dashboard';
  return n;
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const password = form.get('password');
  const next = normalizeNext(form.get('next'));

  if (typeof password !== 'string' || password.length === 0) {
    const url = new URL('/login', req.url);
    url.searchParams.set('error', '1');
    url.searchParams.set('next', next);
    return NextResponse.redirect(url);
  }

  const expectedHash = process.env.LOGIN_PASSWORD_HASH;
  if (!expectedHash) {
    return new NextResponse('Server misconfigured: LOGIN_PASSWORD_HASH is missing.', { status: 500 });
  }

  const ok = await bcrypt.compare(password, expectedHash);
  if (!ok) {
    const url = new URL('/login', req.url);
    url.searchParams.set('error', '1');
    url.searchParams.set('next', next);
    return NextResponse.redirect(url);
  }

  const res = NextResponse.redirect(new URL(next, req.url));
  res.cookies.set(COOKIE_NAME, '1', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });
  return res;
}

