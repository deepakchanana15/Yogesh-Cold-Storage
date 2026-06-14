import { Inquiry } from './firebase-admin';

interface SheetsResult {
  success: boolean;
  error?: string;
}

export async function syncToSheets(inquiry: Inquiry, timestamp: string): Promise<SheetsResult> {
  const WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL || '';

  if (!WEBHOOK_URL) {
    console.warn('[Sheets] GOOGLE_SHEET_WEBHOOK_URL is not set — skipping sync.');
    return { success: false, error: 'Webhook URL not configured' };
  }

  const payload = {
    timestamp,
    name:               inquiry.name,
    companyName:        inquiry.companyName,
    phone:              inquiry.phone,
    email:              inquiry.email,
    commodity:          inquiry.commodity,
    storageRequirement: inquiry.storageRequirement,
    duration:           inquiry.duration,
    message:            inquiry.message,
    status:             inquiry.status,
    source:             inquiry.source,
  };

  const body = JSON.stringify(payload);
  const headers = { 'Content-Type': 'application/json' };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    // Step 1: POST with redirect:manual so we can follow it as POST (not GET)
    // Google Apps Script returns a 302 redirect; default fetch converts POST→GET
    // which loses the body and causes a 401. We follow it manually as POST.
    const initial = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers,
      body,
      signal: controller.signal,
      redirect: 'manual',
    });

    let res = initial;

    if (initial.status >= 300 && initial.status < 400) {
      const location = initial.headers.get('location');
      if (location) {
        res = await fetch(location, {
          method: 'POST',
          headers,
          body,
          signal: controller.signal,
        });
      }
    }

    clearTimeout(timeout);

    if (!res.ok) {
      const text = await res.text();
      console.error('[Sheets] Webhook responded with error:', res.status, text.slice(0, 200));
      return { success: false, error: `HTTP ${res.status}` };
    }

    console.log('[Sheets] Row written successfully for:', inquiry.name);
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[Sheets] Sync failed:', msg);
    return { success: false, error: msg };
  }
}
