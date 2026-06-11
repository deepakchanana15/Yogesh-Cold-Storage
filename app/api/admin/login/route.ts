import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'ycs_admin';
const MAX_AGE = 60 * 60 * 8; // 8 hours

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: '' }));

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { success: false, error: 'Admin access is not configured.' },
      { status: 503 }
    );
  }

  if (!password || password !== adminPassword) {
    return NextResponse.json(
      { success: false, error: 'Incorrect password.' },
      { status: 401 }
    );
  }

  // Use the ADMIN_SECRET_TOKEN as the session cookie value
  const token = process.env.ADMIN_SECRET_TOKEN || adminPassword;

  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  });

  return res;
}
