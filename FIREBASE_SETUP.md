# Firebase Setup Guide — Yogesh Cold Storage

Complete step-by-step guide to configure Firebase, email, and Google Sheets.

---

## Architecture Overview

```
User submits form
       ↓
Next.js API Route (/api/submit-inquiry)
       ↓
1. Save to Firestore  ← PRIMARY (must succeed)
       ↓
2. Send owner email   ← async (failure logged, not fatal)
3. Send customer confirmation  ← async
4. Sync to Google Sheets       ← async
       ↓
Firebase Function (Firestore onCreate trigger)
       ↓
Redundant email + Sheets sync (backup path)
```

**Key principle:** Firestore is the source of truth. Email and Sheets are secondary.

---

## PART 1 — Firebase Project Setup

### Step 1.1 — Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click **Add project**
3. Name: `yogesh-cold-storage` (or similar)
4. Disable Google Analytics (optional)
5. Click **Create project**

### Step 1.2 — Enable Firestore

1. In Firebase Console → **Build → Firestore Database**
2. Click **Create database**
3. Select **Production mode**
4. Choose location: `asia-south1` (Mumbai — closest to Haryana)
5. Click **Done**

### Step 1.3 — Get Service Account Credentials

1. Firebase Console → **Project Settings** (gear icon)
2. Click **Service accounts** tab
3. Click **Generate new private key**
4. Save the downloaded JSON file securely

From the JSON file, copy these 3 values into `.env.local`:

```
FIREBASE_PROJECT_ID=       ← "project_id" field
FIREBASE_CLIENT_EMAIL=     ← "client_email" field
FIREBASE_PRIVATE_KEY=      ← "private_key" field (include the full -----BEGIN/END----- block)
```

> ⚠️ When pasting FIREBASE_PRIVATE_KEY into .env.local, keep it in double quotes:
> `FIREBASE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nABC...\n-----END RSA PRIVATE KEY-----\n"`

### Step 1.4 — Deploy Firestore Rules

```bash
npm install -g firebase-tools
firebase login
firebase use --add   # select your project
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

---

## PART 2 — Admin Dashboard Setup

### Step 2.1 — Generate a Secure Admin Token

Run this in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and add to `.env.local`:

```
ADMIN_PASSWORD=YourChosenPassword123
ADMIN_SECRET_TOKEN=paste-the-random-hex-here
```

### Step 2.2 — Access the Dashboard

- Local: http://localhost:3001/admin
- Production: https://yourdomain.com/admin

Login with the `ADMIN_PASSWORD` you set.

---

## PART 3 — Email Setup

### Option A: Resend (Recommended — Free 3,000 emails/month)

1. Go to https://resend.com → Sign up free
2. **Verify your domain** (DNS records) OR use `onboarding@resend.dev` for testing
3. Go to **API Keys** → Create API Key
4. Copy into `.env.local`:

```
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yogeshcoldstorage.com
```

> For testing before domain verification: set `RESEND_FROM_EMAIL=onboarding@resend.dev`
> (emails will be delivered but "from" will show as Resend's domain)

### Option B: Gmail SMTP (Fallback — used if Resend not configured)

1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification** (required for App Passwords)
3. Go to **App Passwords** → Select app: Mail → Select device: Other
4. Name it "Yogesh Cold Storage Website" → Generate
5. Copy the 16-character password into `.env.local`:

```
GMAIL_USER=yogeshcoldstorage@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

> Note: If both Resend and Gmail are configured, Resend is used first.

---

## PART 4 — Google Sheets Setup

### Step 4.1 — Prepare the Sheet

1. Open: https://docs.google.com/spreadsheets/d/11pPA8qjFrIo5J3calNfeefZuYbWbl5I09gsdv6O3GL8
2. Create a sheet tab named exactly: **`Inquiries`**
3. Add headers in Row 1 (A to K):

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Name | Company Name | Phone | Email | Commodity | Storage (MT) | Duration | Message | Status | Source |

### Step 4.2 — Create Apps Script

1. In the sheet → **Extensions → Apps Script**
2. Delete all code and paste:

```javascript
const SHEET_NAME = 'Inquiries';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Sheet tab "Inquiries" not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([
      data.timestamp          || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      data.name               || '',
      data.companyName        || '',
      data.phone              || '',
      data.email              || '',
      data.commodity          || '',
      data.storageRequirement || '',
      data.duration           || '',
      data.message            || '',
      data.status             || 'New',
      data.source             || 'Website',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Run this manually to test: Extensions → Apps Script → Run → testSetup
function testSetup() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  Logger.log(sheet ? '✅ Sheet found' : '❌ Sheet NOT found — create a tab named "Inquiries"');
}
```

3. Click **Save** (floppy disk icon)

### Step 4.3 — Deploy Apps Script

1. Click **Deploy → New deployment**
2. Click the gear icon → **Web app**
3. Configure:
   - Description: `Yogesh Cold Storage Inquiry Sync`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Authorise permissions when prompted
6. Copy the **Web App URL** (looks like `https://script.google.com/macros/s/ABC.../exec`)

### Step 4.4 — Add URL to .env.local

```
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_ID/exec
```

Restart the dev server after adding this.

---

## PART 5 — Local Development with Firebase Emulator

### Step 5.1 — Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### Step 5.2 — Configure Emulator

The `firebase.json` is already set up. Just run:

```bash
firebase emulators:start
```

This starts:
- Firestore Emulator: http://localhost:8080
- Emulator UI: http://localhost:4000
- Functions Emulator: http://localhost:5001

### Step 5.3 — Point Next.js to Emulator

Uncomment in `.env.local`:

```
FIRESTORE_EMULATOR_HOST=localhost:8080
```

Then start Next.js:

```bash
npm run dev
```

Now all Firestore reads/writes go to the local emulator. Open http://localhost:4000 to see data in real time.

### Step 5.4 — Stop Emulator

`Ctrl+C` in the terminal running the emulator. Data is NOT persisted unless you export it:

```bash
firebase emulators:export ./emulator-data
firebase emulators:start --import=./emulator-data
```

---

## PART 6 — Firebase Functions (Optional Backup Layer)

The Firebase Function (`functions/index.js`) triggers on every new Firestore document and runs email + Sheets sync as a redundant backup.

### Step 6.1 — Install function dependencies

```bash
cd functions
npm install
cd ..
```

### Step 6.2 — Set Function Environment Variables

```bash
firebase functions:secrets:set OWNER_EMAIL
firebase functions:secrets:set GMAIL_USER
firebase functions:secrets:set GMAIL_APP_PASSWORD
firebase functions:secrets:set GOOGLE_SHEET_URL
firebase functions:secrets:set SITE_URL
```

Or create `functions/.env` for local testing:

```
OWNER_EMAIL=yogeshcoldstorage@gmail.com
GMAIL_USER=yogeshcoldstorage@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_ID/exec
SITE_URL=https://yogeshcoldstorage.com
```

### Step 6.3 — Deploy Functions

```bash
firebase deploy --only functions
```

---

## PART 7 — Production Deployment

### Option A: Vercel (Recommended for Next.js)

```bash
npm install -g vercel
vercel
```

Add all environment variables from `.env.local` in Vercel Dashboard → Project → Settings → Environment Variables.

### Option B: Firebase Hosting + Functions

```bash
npm run build
firebase deploy
```

Update `.firebaserc` with your actual project ID first:

```json
{
  "projects": {
    "default": "your-actual-firebase-project-id"
  }
}
```

---

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| Firestore write fails | Missing credentials | Check FIREBASE_PROJECT_ID, CLIENT_EMAIL, PRIVATE_KEY in .env.local |
| Private key error | Escaped newlines | Wrap key in double quotes in .env.local |
| Email not sending | No provider configured | Add RESEND_API_KEY or GMAIL_USER + GMAIL_APP_PASSWORD |
| Resend 403 | From domain not verified | Use `onboarding@resend.dev` for testing |
| Sheets not updating | Webhook URL wrong | Re-deploy Apps Script and update GOOGLE_SHEET_WEBHOOK_URL |
| Admin login fails | Token mismatch | Ensure ADMIN_PASSWORD and ADMIN_SECRET_TOKEN are set |
| /admin redirects to login | Cookie not set | Clear cookies and log in again |
| Emulator not connecting | Env var not set | Uncomment FIRESTORE_EMULATOR_HOST=localhost:8080 |

---

## Quick Checklist

- [ ] Firebase project created
- [ ] Firestore enabled (asia-south1)
- [ ] Service account key downloaded
- [ ] FIREBASE_PROJECT_ID, CLIENT_EMAIL, PRIVATE_KEY added to .env.local
- [ ] Firestore rules deployed
- [ ] ADMIN_PASSWORD and ADMIN_SECRET_TOKEN set
- [ ] Email configured (Resend API key OR Gmail App Password)
- [ ] Google Sheets tab "Inquiries" created with headers
- [ ] Apps Script deployed and GOOGLE_SHEET_WEBHOOK_URL set
- [ ] Test form submission → check Firestore → check email → check Sheets
- [ ] Deploy to Vercel or Firebase Hosting
