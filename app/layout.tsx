import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/SchemaMarkup';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export const metadata: Metadata = {
  metadataBase: new URL('https://yogeshcoldstorage.com'),
  title: {
    default: 'Yogesh Cold Storage | Cold Storage & Warehousing in Gannaur, Sonipat, Haryana',
    template: '%s | Yogesh Cold Storage',
  },
  description:
    'Yogesh Cold Storage offers 2,412 MT temperature-controlled cold storage and warehousing solutions in Gannaur, Sonipat, Haryana. Ideal for potatoes, apples, agricultural produce, and commercial commodities.',
  keywords: [
    'cold storage Gannaur',
    'cold storage Sonipat',
    'cold storage Haryana',
    'potato storage Haryana',
    'apple storage Haryana',
    'warehousing Haryana',
    'agricultural storage Haryana',
    'temperature controlled storage Haryana',
    'commercial storage Sonipat',
    'storage facility Haryana',
    'cold chain Haryana',
    'cold storage near me',
    'refrigerated warehouse Haryana',
    'Yogesh Cold Storage',
  ],
  authors: [{ name: 'Yogesh Cold Storage' }],
  creator: 'Yogesh Cold Storage',
  publisher: 'Yogesh Cold Storage',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://yogeshcoldstorage.com',
    siteName: 'Yogesh Cold Storage',
    title: 'Yogesh Cold Storage | Cold Storage & Warehousing in Haryana',
    description:
      '2,412 MT temperature-controlled cold storage and warehousing in Gannaur, Sonipat, Haryana. Serving farmers, traders, exporters and food businesses.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Yogesh Cold Storage Facility in Gannaur, Haryana',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yogesh Cold Storage | Cold Storage & Warehousing Haryana',
    description:
      '2,412 MT cold storage in Gannaur, Sonipat, Haryana. Temperature-controlled chambers for agricultural & commercial storage.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://yogeshcoldstorage.com',
  },
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#16a34a" />
        <meta name="geo.region" content="IN-HR" />
        <meta name="geo.placename" content="Gannaur, Sonipat, Haryana" />
        <meta name="geo.position" content="29.0088;77.0024" />
        <meta name="ICBM" content="29.0088, 77.0024" />
      </head>
      <body className="bg-white text-steel-800 antialiased">
        <SchemaMarkup />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
