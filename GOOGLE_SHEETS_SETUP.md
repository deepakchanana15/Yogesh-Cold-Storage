# Google Sheets Integration — Setup Guide

## Overview

When visitors submit the inquiry form, data is sent to a **Google Apps Script Web App**
which writes it directly into your Google Sheet.

**Target Sheet:**
`https://docs.google.com/spreadsheets/d/11pPA8qjFrIo5J3calNfeefZuYbWbl5I09gsdv6O3GL8`

---

## Step 1: Open the Google Sheet

1. Open the sheet: https://docs.google.com/spreadsheets/d/11pPA8qjFrIo5J3calNfeefZuYbWbl5I09gsdv6O3GL8
2. Make sure you are logged into the Google Account that owns this sheet.
3. Create a sheet tab named **`Inquiries`** (if not already present).
4. Add these column headers in row 1:

   | A | B | C | D | E | F | G | H | I | J |
   |---|---|---|---|---|---|---|---|---|---|
   | Timestamp | Name | Company | Phone | Email | Commodity | Storage (MT) | Duration | Message | Source Page |

---

## Step 2: Create the Apps Script

1. In the Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code in the editor
3. Paste the following code:

```javascript
const SHEET_NAME = 'Inquiries';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Sheet not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([
      data.timestamp        || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      data.name             || '',
      data.company          || '',
      data.phone            || '',
      data.email            || '',
      data.commodity        || '',
      data.storageRequirement || '',
      data.duration         || '',
      data.message          || '',
      data.sourcePage       || 'Website',
    ]);

    // Optional: send email notification
    // sendEmailNotification(data);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: email notification on new inquiry
function sendEmailNotification(data) {
  const to = 'YOUR_EMAIL@gmail.com'; // ← Change this
  const subject = `New Inquiry — ${data.name} (${data.commodity || 'Not specified'})`;
  const body = `
New inquiry received from Yogesh Cold Storage website:

Name: ${data.name}
Company: ${data.company || 'N/A'}
Phone: ${data.phone}
Email: ${data.email || 'N/A'}
Commodity: ${data.commodity || 'N/A'}
Storage Required: ${data.storageRequirement || 'N/A'} MT
Duration: ${data.duration || 'N/A'}
Message: ${data.message || 'N/A'}
Source: ${data.sourcePage}
Time: ${data.timestamp}
  `;
  MailApp.sendEmail(to, subject, body);
}

// Test function — run this manually to verify sheet access
function testSetup() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (sheet) {
    Logger.log('✅ Sheet found: ' + SHEET_NAME);
  } else {
    Logger.log('❌ Sheet NOT found. Create a tab named: ' + SHEET_NAME);
  }
}
```

---

## Step 3: Deploy as Web App

1. Click **Deploy → New Deployment**
2. Click the gear icon → Select **Web app**
3. Set:
   - **Description**: `Yogesh Cold Storage Inquiry Form`
   - **Execute as**: `Me (your@gmail.com)`
   - **Who has access**: `Anyone` ← IMPORTANT
4. Click **Deploy**
5. Authorise permissions when prompted (click "Advanced" → "Go to [project] (unsafe)" if needed)
6. Copy the **Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfyc.../exec
   ```

---

## Step 4: Add URL to Environment Variable

Open `.env.local` and paste the URL:

```
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfyc.../exec
```

Restart the development server after changing `.env.local`.

---

## Step 5: Test the Integration

1. Go to your website's contact or home page
2. Fill in and submit the inquiry form
3. Check the **Inquiries** tab in your Google Sheet — the row should appear within seconds
4. If it doesn't work, check the Apps Script execution logs:
   **Apps Script → Executions** tab

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `GOOGLE_SHEET_WEBHOOK_URL` not set | Add the Apps Script URL to `.env.local` and restart |
| Sheet row not appearing | Verify the tab is named exactly `Inquiries` (case-sensitive) |
| CORS errors in browser | Apps Script handles CORS — make sure "Who has access" is set to "Anyone" |
| 403 Forbidden | Re-deploy the script and re-authorise permissions |
| Email not sending | Add your email in `sendEmailNotification()` and enable the call |

---

## Security Notes

- The Apps Script endpoint accepts POST requests from your Next.js backend — not directly from the browser
- Phone numbers are validated server-side before forwarding to the sheet
- A honeypot field filters obvious spam bots
- The Google Sheet URL is kept in environment variables, not committed to code
