/**
 * Firebase Functions — Yogesh Cold Storage
 *
 * These functions act as a REDUNDANT fallback for email and Google Sheets sync.
 * The primary path is the Next.js API route. These functions are triggered by
 * Firestore writes and provide fault tolerance if the API route's async tasks fail.
 *
 * Deploy: firebase deploy --only functions
 */

const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { defineString }      = require('firebase-functions/params');
const admin                 = require('firebase-admin');
const nodemailer            = require('nodemailer');

admin.initializeApp();

// ── Config params (set via: firebase functions:config:set or .env in functions/) ──

const OWNER_EMAIL         = defineString('OWNER_EMAIL',         { default: 'yogeshcoldstorage@gmail.com' });
const GMAIL_USER          = defineString('GMAIL_USER',          { default: '' });
const GMAIL_APP_PASSWORD  = defineString('GMAIL_APP_PASSWORD',  { default: '' });
const GOOGLE_SHEET_URL    = defineString('GOOGLE_SHEET_URL',    { default: '' });
const SITE_URL            = defineString('SITE_URL',            { default: 'https://yogeshcoldstorage.com' });

// ── Firestore onCreate trigger ────────────────────────────────────────────────

exports.onNewInquiry = onDocumentCreated('inquiries/{docId}', async (event) => {
  const snap = event.data;
  if (!snap) return;

  const inquiry  = snap.data();
  const docId    = event.params.docId;
  const timestamp = new Date(inquiry.createdAt || Date.now()).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
  });

  console.log('[Function] New inquiry received:', docId, inquiry.name);

  // Check if email was already sent (set a flag to avoid double-sending)
  const alreadySent = inquiry._emailSent === true;

  // Run email + sheets in parallel
  await Promise.allSettled([
    alreadySent ? Promise.resolve() : sendOwnerEmail(inquiry, timestamp),
    alreadySent ? Promise.resolve() : sendCustomerEmail(inquiry),
    syncSheets(inquiry, timestamp),
  ]);

  // Mark email as sent (prevents duplicates on Function retries)
  if (!alreadySent) {
    await snap.ref.update({ _emailSent: true }).catch(console.error);
  }
});

// ── Email via Nodemailer ──────────────────────────────────────────────────────

function createTransporter() {
  const user = GMAIL_USER.value();
  const pass = GMAIL_APP_PASSWORD.value();
  if (!user || !pass) return null;
  return nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
}

async function sendOwnerEmail(inquiry, timestamp) {
  const transport = createTransporter();
  if (!transport) {
    console.warn('[Function] No email config — skipping owner notification');
    return;
  }

  const owner = OWNER_EMAIL.value();
  const site  = SITE_URL.value();

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#16a34a;padding:24px;border-radius:8px 8px 0 0;">
        <h1 style="color:#fff;margin:0;font-size:20px;">🚨 New Inquiry — Yogesh Cold Storage</h1>
      </div>
      <div style="background:#f0fdf4;padding:24px;border:1px solid #bbf7d0;">
        <table style="width:100%;border-collapse:collapse;">
          ${[
            ['Name',             inquiry.name],
            ['Company',          inquiry.companyName || '—'],
            ['Phone',            inquiry.phone],
            ['Email',            inquiry.email || '—'],
            ['Commodity',        inquiry.commodity || '—'],
            ['Storage Required', inquiry.storageRequirement ? inquiry.storageRequirement + ' MT' : '—'],
            ['Duration',         inquiry.duration || '—'],
            ['Message',          inquiry.message || '—'],
            ['Submitted',        timestamp],
            ['Source',           inquiry.source],
          ].map(([l, v]) => `
            <tr>
              <td style="padding:8px;background:#fff;border-bottom:1px solid #e5e7eb;font-weight:600;color:#15803d;width:35%">${l}</td>
              <td style="padding:8px;border-bottom:1px solid #e5e7eb;color:#1f2937">${v}</td>
            </tr>`).join('')}
        </table>
        <p style="margin:16px 0 0;text-align:center;">
          <a href="${site}/admin" style="color:#16a34a;">Open Admin Dashboard</a>
        </p>
      </div>
    </div>`;

  await transport.sendMail({
    from:    `"Yogesh Cold Storage" <${GMAIL_USER.value()}>`,
    to:      owner,
    subject: '🚨 New Website Inquiry - Yogesh Cold Storage',
    html,
    replyTo: inquiry.email || undefined,
  });

  console.log('[Function] Owner email sent to', owner);
}

async function sendCustomerEmail(inquiry) {
  if (!inquiry.email) return;
  const transport = createTransporter();
  if (!transport) return;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#16a34a;padding:24px;border-radius:8px 8px 0 0;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:20px;">Thank You for Your Inquiry</h1>
      </div>
      <div style="background:#fff;padding:32px;">
        <p>Dear <strong>${inquiry.name}</strong>,</p>
        <p>Thank you for contacting <strong>Yogesh Cold Storage</strong>.</p>
        <p>We have successfully received your inquiry. Our team will contact you shortly.</p>
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin-top:24px;">
          <strong style="color:#15803d;">Yogesh Cold Storage</strong><br>
          Gannaur, Sonipat, Haryana, India<br>
          yogeshcoldstorage@gmail.com · +91 82872 82830
        </div>
      </div>
    </div>`;

  await transport.sendMail({
    from:    `"Yogesh Cold Storage" <${GMAIL_USER.value()}>`,
    to:      inquiry.email,
    subject: 'Thank You For Contacting Yogesh Cold Storage',
    html,
    replyTo: OWNER_EMAIL.value(),
  });

  console.log('[Function] Customer email sent to', inquiry.email);
}

// ── Google Sheets sync ────────────────────────────────────────────────────────

async function syncSheets(inquiry, timestamp) {
  const url = GOOGLE_SHEET_URL.value();
  if (!url) {
    console.warn('[Function] GOOGLE_SHEET_URL not set — skipping Sheets sync');
    return;
  }

  try {
    const res = await fetch(url, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
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
      }),
    });

    if (!res.ok) {
      console.error('[Function] Sheets sync failed:', res.status, await res.text());
    } else {
      console.log('[Function] Sheets sync successful for', inquiry.name);
    }
  } catch (err) {
    console.error('[Function] Sheets sync error:', err);
  }
}
