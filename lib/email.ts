import { Inquiry } from './firebase-admin';

// ── HTML email templates ──────────────────────────────────────────────────────

function ownerEmailHtml(inquiry: Inquiry, timestamp: string): string {
  const row = (label: string, value: string) =>
    `<tr>
      <td style="padding:10px 12px;background:#f0fdf4;border-bottom:1px solid #bbf7d0;font-weight:600;color:#15803d;width:38%;vertical-align:top;">${label}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#1f2937;vertical-align:top;">${value || '—'}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:#16a34a;padding:28px 32px;">
            <p style="margin:0;color:#bbf7d0;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">🌾 Yogesh Cold Storage</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:700;">🚨 New Website Inquiry</h1>
          </td>
        </tr>
        <!-- Alert band -->
        <tr>
          <td style="background:#dc2626;padding:12px 32px;text-align:center;">
            <p style="margin:0;color:#ffffff;font-size:13px;font-weight:700;">Please contact this customer as soon as possible</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:28px 32px;">
            <p style="margin:0 0 20px;color:#374151;font-size:14px;">A new inquiry has been received on the Yogesh Cold Storage website.</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
              ${row('Full Name', inquiry.name)}
              ${row('Company', inquiry.companyName)}
              ${row('Phone', `<a href="tel:+91${inquiry.phone}" style="color:#16a34a;font-weight:700;">${inquiry.phone}</a>`)}
              ${row('Email', inquiry.email ? `<a href="mailto:${inquiry.email}" style="color:#16a34a;">${inquiry.email}</a>` : '')}
              ${row('Commodity', inquiry.commodity)}
              ${row('Storage Required', inquiry.storageRequirement ? inquiry.storageRequirement + ' MT' : '')}
              ${row('Duration', inquiry.duration)}
              ${row('Message', inquiry.message)}
              ${row('Submitted At', timestamp)}
              ${row('Lead Source', inquiry.source)}
            </table>
            <div style="margin-top:24px;padding:16px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;text-align:center;">
              <p style="margin:0;color:#15803d;font-size:13px;">
                To manage this inquiry, visit your
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin" style="color:#16a34a;font-weight:700;">Admin Dashboard</a>
              </p>
            </div>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;text-align:center;">
            <p style="margin:0;color:#6b7280;font-size:11px;">Yogesh Cold Storage · Gannaur, Sonipat, Haryana · yogeshcoldstorage@gmail.com</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function customerEmailHtml(name: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:#16a34a;padding:28px 32px;text-align:center;">
            <p style="margin:0;color:#bbf7d0;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">🌾 Yogesh Cold Storage</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:700;">Thank You for Your Inquiry</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:32px;">
            <p style="margin:0 0 16px;color:#1f2937;font-size:15px;">Dear <strong>${name}</strong>,</p>
            <p style="margin:0 0 16px;color:#374151;font-size:14px;line-height:1.7;">
              Thank you for contacting <strong>Yogesh Cold Storage</strong>.
            </p>
            <p style="margin:0 0 24px;color:#374151;font-size:14px;line-height:1.7;">
              We have successfully received your inquiry regarding your storage requirements.
              Our team will review your request and contact you shortly.
            </p>
            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
              <p style="margin:0 0 12px;color:#15803d;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Our Contact Details</p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:4px 0;color:#374151;font-size:13px;">📍</td>
                  <td style="padding:4px 0 4px 8px;color:#374151;font-size:13px;">Gannaur, Sonipat, Haryana, India</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;color:#374151;font-size:13px;">✉️</td>
                  <td style="padding:4px 0 4px 8px;font-size:13px;">
                    <a href="mailto:yogeshcoldstorage@gmail.com" style="color:#16a34a;">yogeshcoldstorage@gmail.com</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0;color:#374151;font-size:13px;">📞</td>
                  <td style="padding:4px 0 4px 8px;font-size:13px;">
                    <a href="tel:+918287282830" style="color:#16a34a;">+91 82872 82830</a>
                  </td>
                </tr>
              </table>
            </div>
            <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">
              Thank you for choosing Yogesh Cold Storage. We look forward to serving you.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;text-align:center;">
            <p style="margin:0;color:#6b7280;font-size:11px;">Yogesh Cold Storage · Gannaur, Sonipat, Haryana · yogeshcoldstorage@gmail.com</p>
            <p style="margin:4px 0 0;color:#9ca3af;font-size:10px;">This is an automated message. Please do not reply to this email.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Email sender (Resend primary, Nodemailer fallback) ────────────────────────

interface SendResult {
  success: boolean;
  provider: 'resend' | 'nodemailer' | 'none';
  error?: string;
}

async function sendViaResend(params: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const { Resend } = await import('resend');
  const resend = new Resend(apiKey);

  const fromDomain = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  const { error } = await resend.emails.send({
    from: `Yogesh Cold Storage <${fromDomain}>`,
    to: params.to,
    subject: params.subject,
    html: params.html,
    ...(params.replyTo ? { replyTo: params.replyTo } : {}),
  });

  if (error) {
    console.error('[Resend] Error:', error);
    return false;
  }
  return true;
}

async function sendViaNodemailer(params: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return false;

  const nodemailer = await import('nodemailer');
  const transporter = nodemailer.default.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Yogesh Cold Storage" <${user}>`,
    to: params.to,
    subject: params.subject,
    html: params.html,
    ...(params.replyTo ? { replyTo: params.replyTo } : {}),
  });

  return true;
}

async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendResult> {
  // 1. Try Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const ok = await sendViaResend(params);
      if (ok) return { success: true, provider: 'resend' };
    } catch (err) {
      console.error('[Email] Resend failed, trying Nodemailer:', err);
    }
  }

  // 2. Fallback to Nodemailer/Gmail
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    try {
      const ok = await sendViaNodemailer(params);
      if (ok) return { success: true, provider: 'nodemailer' };
    } catch (err) {
      console.error('[Email] Nodemailer failed:', err);
      return { success: false, provider: 'nodemailer', error: String(err) };
    }
  }

  console.warn('[Email] No email provider configured. Set RESEND_API_KEY or GMAIL_USER + GMAIL_APP_PASSWORD.');
  return { success: false, provider: 'none', error: 'No email provider configured' };
}

// ── Public helpers ────────────────────────────────────────────────────────────

export async function sendOwnerNotification(inquiry: Inquiry, timestamp: string): Promise<SendResult> {
  const ownerEmail = process.env.OWNER_EMAIL || 'yogeshcoldstorage@gmail.com';
  return sendEmail({
    to: ownerEmail,
    subject: '🚨 New Website Inquiry - Yogesh Cold Storage',
    html: ownerEmailHtml(inquiry, timestamp),
    replyTo: inquiry.email || undefined,
  });
}

export async function sendCustomerConfirmation(inquiry: Inquiry): Promise<SendResult> {
  if (!inquiry.email) {
    return { success: false, provider: 'none', error: 'No customer email provided' };
  }
  return sendEmail({
    to: inquiry.email,
    subject: 'Thank You For Contacting Yogesh Cold Storage',
    html: customerEmailHtml(inquiry.name),
    replyTo: process.env.OWNER_EMAIL || 'yogeshcoldstorage@gmail.com',
  });
}
