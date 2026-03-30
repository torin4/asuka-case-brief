import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'case_auth';

export async function POST(_req: NextRequest) {
  const res = NextResponse.redirect(new URL('/login', _req.url));
  res.cookies.delete(COOKIE_NAME);
  return res;
}

export async function GET(req: NextRequest) {
  return POST(req);
}

