# Yogesh Cold Storage — Deployment Guide

## ✅ Build Status
Build passes successfully. All 13 routes are generated.

---

## 1. Add Facility Photos

Copy the 16 facility photos shared with the developer into:

```
public/images/
```

**Required filenames** (match exactly — the gallery page uses these):

| File | What it shows |
|------|--------------|
| `facility-01.jpg` | Main chamber — empty wide hall, ribbed floor |
| `facility-02.jpg` | Steel roof truss from below |
| `facility-03.jpg` | Numbered steel rack grid interior |
| `facility-04.jpg` | Sections 146–148 empty |
| `facility-05.jpg` | Sections 74–86, large open space |
| `facility-06.jpg` | Corrugated roof with steel beams, light gaps |
| `facility-07.jpg` | Steel column #128 |
| `facility-08.jpg` | Wooden staircase interior |
| `facility-09.jpg` | Wide hall with staircase visible |
| `facility-10.jpg` | Grey metal door with padlock |
| `facility-11.jpg` | Interior main hall, angle 2 |
| `facility-12.jpg` | Operations room with supplies shelf |
| `facility-13.jpg` | Second wooden staircase |
| `facility-14.jpg` | Open-tread staircase with equipment |
| `facility-15.jpg` | Blue door with AC unit |
| `facility-16.jpg` | Two chamber doors side by side |

Also add:
- `public/favicon.ico` — your logo/icon
- `public/images/og-image.jpg` — 1200×630 px image for social sharing (use the best facility photo)

---

## 2. Update Contact Details

Replace placeholder values in these files once you have the full address:

| File | What to update |
|------|---------------|
| `app/contact/page.tsx` | Full street address, Google Maps URL |
| `components/Footer.tsx` | Email address (currently `info@yogeshcoldstorage.com`) |
| `app/layout.tsx` | Change `YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE` |
| `components/SchemaMarkup.tsx` | Full street address, Google Maps URL |

The phone number **+91 94167 94784** is already set everywhere.

---

## 3. Set Up Google Sheets Integration

Follow **GOOGLE_SHEETS_SETUP.md** to:
1. Create the `Inquiries` tab in your sheet
2. Deploy the Apps Script Web App
3. Add the webhook URL to `.env.local`:
   ```
   GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfyc.../exec
   ```

---

## 4. Set Up Google Analytics (Optional)

1. Create a GA4 property at analytics.google.com
2. Get your Measurement ID (e.g., `G-XXXXXXXXXX`)
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

---

## 5. Deploy to Vercel (Recommended — Free)

```bash
# Install Vercel CLI
npm install -g vercel

# From the project directory
cd yogesh-cold-storage
vercel

# For production
vercel --prod
```

When prompted:
- Project name: `yogesh-cold-storage`
- Framework: Next.js (auto-detected)
- Root directory: `./` (current)

Add environment variables in **Vercel Dashboard → Settings → Environment Variables**:
- `GOOGLE_SHEET_WEBHOOK_URL` = your Apps Script URL
- `NEXT_PUBLIC_GA_ID` = your GA4 ID (if using)
- `NEXT_PUBLIC_SITE_URL` = `https://yogeshcoldstorage.com`

---

## 6. Connect Custom Domain

Once deployed on Vercel:
1. Go to **Vercel Dashboard → Your Project → Settings → Domains**
2. Add `yogeshcoldstorage.com` and `www.yogeshcoldstorage.com`
3. Update your domain's DNS records as instructed by Vercel

---

## 7. Submit to Google Search Console

1. Go to search.google.com/search-console
2. Add property `yogeshcoldstorage.com`
3. Verify using the HTML meta tag method (add verification code to `app/layout.tsx`)
4. Submit sitemap: `https://yogeshcoldstorage.com/sitemap.xml`

---

## 8. Google Business Profile Optimisation

See the complete checklist at `/faq` on the website, or:
1. Search "Yogesh Cold Storage" on Google Maps
2. Claim/create the business listing
3. Add all 16 facility photos
4. Add services, hours, attributes
5. Enable messaging (tied to your WhatsApp number)

---

## Development Commands

```bash
npm run dev     # Start development server at http://localhost:3000
npm run build   # Production build
npm run start   # Start production server
```

---

## Project Structure

```
yogesh-cold-storage/
├── app/
│   ├── layout.tsx          ← Root layout, metadata, WhatsApp float
│   ├── page.tsx            ← Home page
│   ├── about/page.tsx      ← About us
│   ├── facility/page.tsx   ← Chamber specs & tables
│   ├── services/page.tsx   ← All storage services
│   ├── gallery/page.tsx    ← Photo gallery with actual facility images
│   ├── contact/page.tsx    ← Contact form + map
│   ├── faq/page.tsx        ← FAQ + Google Business Profile guide
│   └── api/submit-inquiry/route.ts  ← Form API → Google Sheets
├── components/
│   ├── Header.tsx          ← Navigation with mobile menu
│   ├── Footer.tsx          ← Full footer with contact info
│   ├── InquiryForm.tsx     ← Lead capture form (reused on all pages)
│   ├── WhatsAppFloat.tsx   ← Floating WhatsApp button (+91 9416794784)
│   └── SchemaMarkup.tsx    ← Local Business + FAQ JSON-LD schema
└── public/images/          ← ← PUT FACILITY PHOTOS HERE
```
