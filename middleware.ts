import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME  = 'ycs_admin';
const LOGIN_PATH   = '/admin/login';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard /admin pages and /api/admin routes
  const isAdminPage = pathname.startsWith('/admin');
  const isAdminApi  = pathname.startsWith('/api/admin');

  if (!isAdminPage && !isAdminApi) return NextResponse.next();

  // Always allow the login page and the login API
  if (pathname === LOGIN_PATH || pathname === '/api/admin/login') {
    return NextResponse.next();
  }

  const sessionToken = req.cookies.get(COOKIE_NAME)?.value;
  const secretToken  = process.env.ADMIN_SECRET_TOKEN;

  // If no token is configured, block access entirely
  if (!secretToken) {
    if (isAdminApi) {
      return NextResponse.json({ error: 'Admin not configured.' }, { status: 503 });
    }
    return NextResponse.redirect(new URL(LOGIN_PATH, req.url));
  }

  if (!sessionToken || sessionToken !== secretToken) {
    if (isAdminApi) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }
    return NextResponse.redirect(new URL(LOGIN_PATH, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
