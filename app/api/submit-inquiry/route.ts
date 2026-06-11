export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, Inquiry } from '@/lib/firebase-admin';
import { sendOwnerNotification, sendCustomerConfirmation } from '@/lib/email';
import { syncToSheets } from '@/lib/sheets';

// ── In-memory rate limiter (per IP, 5 submissions / minute) ──────────────────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000; // 1 minute
  const limit = 5;

  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}

// Periodically clean up old entries to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  Array.from(rateLimitMap.entries()).forEach(([key, val]) => {
    if (val.resetAt < now) rateLimitMap.delete(key);
  });
}, 5 * 60_000);

// ── Validation ────────────────────────────────────────────────────────────────

function validateBody(body: Record<string, unknown>): string | null {
  if (!body.name || typeof body.name !== 'string' || !body.name.trim())
    return 'Full name is required.';

  if (!body.phone || typeof body.phone !== 'string')
    return 'Phone number is required.';

  if (!/^[6-9]\d{9}$/.test(body.phone.trim()))
    return 'Please enter a valid 10-digit Indian mobile number.';

  if (body.email && typeof body.email === 'string' && body.email.trim()) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim()))
      return 'Please enter a valid email address.';
  }

  return null;
}

// ── POST handler ──────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please wait a minute and try again.' },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields; silently discard
  if (body._honey) {
    return NextResponse.json({ success: true });
  }

  // Validate fields
  const validationError = validateBody(body);
  if (validationError) {
    return NextResponse.json({ success: false, error: validationError }, { status: 400 });
  }

  const now = new Date();
  const timestamp = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const inquiry: Inquiry = {
    name:               (body.name as string).trim(),
    companyName:        ((body.companyName ?? body.company) as string | undefined)?.trim() || '',
    phone:              (body.phone as string).trim(),
    email:              ((body.email as string | undefined)?.trim()) || '',
    commodity:          (body.commodity as string | undefined) || '',
    storageRequirement: ((body.storageRequirement as string | undefined)?.trim()) || '',
    duration:           (body.duration as string | undefined) || '',
    message:            ((body.message as string | undefined)?.trim()) || '',
    createdAt:          now.toISOString(),
    status:             'New',
    source:             (body.sourcePage as string | undefined) || 'Website',
  };

  // ── Step 1: Save to Firestore (MUST succeed) ──────────────────────────────
  let docId: string;
  try {
    const ref = await getAdminDb().collection('inquiries').add(inquiry);
    docId = ref.id;
    console.log('[Inquiry] Saved to Firestore:', docId);
  } catch (err) {
    console.error('[Inquiry] Firestore write failed:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to save your inquiry. Please call us directly.' },
      { status: 500 }
    );
  }

  // ── Steps 2–4: Email + Sheets (run in parallel, failures are non-fatal) ───
  const [ownerResult, customerResult, sheetsResult] = await Promise.allSettled([
    sendOwnerNotification(inquiry, timestamp),
    sendCustomerConfirmation(inquiry),
    syncToSheets(inquiry, timestamp),
  ]);

  // Log results without blocking the response
  if (ownerResult.status === 'rejected' || (ownerResult.status === 'fulfilled' && !ownerResult.value.success)) {
    console.error('[Inquiry] Owner email failed for', docId);
  }
  if (customerResult.status === 'rejected' || (customerResult.status === 'fulfilled' && !customerResult.value.success)) {
    console.warn('[Inquiry] Customer confirmation email failed for', docId);
  }
  if (sheetsResult.status === 'rejected' || (sheetsResult.status === 'fulfilled' && !sheetsResult.value.success)) {
    console.warn('[Inquiry] Google Sheets sync failed for', docId, '— data safe in Firestore');
  }

  return NextResponse.json({ success: true, id: docId });
}
