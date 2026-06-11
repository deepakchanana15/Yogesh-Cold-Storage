import { Inquiry } from './firebase-admin';

const WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL || '';

interface SheetsResult {
  success: boolean;
  error?: string;
}

/**
 * Write a single inquiry row to Google Sheets via Apps Script webhook.
 * This is fire-and-forget from the API route's perspective —
 * Firestore is already saved before this runs. A failure here is logged
 * but does not affect the response sent to the user.
 */
export async function syncToSheets(inquiry: Inquiry, timestamp: string): Promise<SheetsResult> {
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

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8 s timeout

    const res = await fetch(WEBHOOK_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
      signal:  controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const text = await res.text();
      console.error('[Sheets] Webhook responded with error:', res.status, text);
      return { success: false, error: `HTTP ${res.status}: ${text}` };
    }

    console.log('[Sheets] Row written successfully for:', inquiry.name);
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[Sheets] Sync failed:', msg);
    return { success: false, error: msg };
  }
}
