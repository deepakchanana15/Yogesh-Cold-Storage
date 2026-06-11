import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Leaf } from 'lucide-react';
import InquiryForm from '@/components/InquiryForm';

export const metadata: Metadata = {
  title: 'Cold Storage Services — Potato, Apple, Agricultural & Commercial | Yogesh Cold Storage',
  description:
    'Cold storage services for potato, apple, onion, agricultural produce, and commercial commodities in Gannaur, Sonipat, Haryana. Seasonal, short-term and annual storage options available.',
  alternates: { canonical: 'https://yogeshcoldstorage.com/services' },
};

const services = [
  {
    emoji: '🥔',
    title: 'Potato Cold Storage',
    subtitle: 'Primary Specialisation',
    desc: 'Our chambers are engineered to the specifications required for potato storage — maintaining 2°C–4°C temperature and 90–95% humidity that minimises sprouting, dehydration, and rot across the storage season.',
    features: [
      '2°C – 4°C temperature for dormancy maintenance',
      '90–95% humidity prevents weight loss',
      'Minimal sprouting and greening',
      'Up to 2,412 MT capacity',
      'Seasonal storage from harvest through peak-price period',
      'Trusted by 500+ farmers across Haryana',
    ],
  },
  {
    emoji: '🍎',
    title: 'Apple Cold Storage',
    subtitle: 'High-Value Produce Storage',
    desc: 'Apples require precise temperature control to maintain firmness, colour, and shelf life. Our controlled-atmosphere conditions keep apple quality intact from harvest through the trading season.',
    features: [
      'Temperature precision at 2°C for firmness retention',
      'High humidity minimises moisture loss',
      'Extended shelf life beyond natural post-harvest period',
      'Supports post-harvest trading flexibility',
      'Suitable for Shimla, Kinnaur, and Kashmiri varieties',
      'Capacity available across multiple chambers',
    ],
  },
  {
    emoji: '🌾',
    title: 'Agricultural Produce Storage',
    subtitle: 'Multi-Commodity Solutions',
    desc: 'Beyond potatoes and apples, our facility can accommodate a range of agricultural produce based on availability and compatibility. Storage for approved commodities can be arranged through prior discussion.',
    features: [
      'Suitable for multiple compatible commodities',
      'Onion, garlic, and other root vegetables (subject to approval)',
      'Seasonal fruits requiring temperature control',
      'Bulk storage for agricultural traders',
      'Volume discounts for large-scale storage',
      'Flexible intake and dispatch scheduling',
    ],
  },
  {
    emoji: '📦',
    title: 'Seasonal Inventory Storage',
    subtitle: 'Harvest-to-Market Bridge',
    desc: 'Store your commodity immediately after harvest at low prices and retrieve it when market prices peak. Our seasonal storage model is designed specifically to help farmers and traders maximise their returns.',
    features: [
      'Flexible intake from harvest season onwards',
      'Retain produce until market price is right',
      'Clear documentation and stock tracking',
      'Partial lot release available',
      'Transparent daily/monthly storage rates',
      'Priority dispatch support during peak demand',
    ],
  },
  {
    emoji: '🏭',
    title: 'Commercial Storage',
    subtitle: 'For Businesses & Distributors',
    desc: 'Food processors, FMCG companies, and distributors can leverage our large-capacity facility for commercial inventory storage. We support high-volume clients with dedicated chamber options and flexible terms.',
    features: [
      'Dedicated chamber or shared storage options',
      'Suitable for FMCG and processed food raw materials',
      'Volume-based rate structures',
      'Rapid loading and dispatch support',
      'Stock management documentation',
      'Easy access from NH-44, Gannaur',
    ],
  },
  {
    emoji: '🚢',
    title: 'Bulk Commodity Storage',
    subtitle: 'For Exporters & Large Traders',
    desc: 'Exporters requiring pre-shipment cold storage and large trading businesses managing bulk inventory will find our 2,412 MT facility well-suited for their operational requirements.',
    features: [
      '2,412 MT combined capacity across 3 chambers',
      '96 MT daily loading and unloading capability',
      'Pre-shipment storage maintaining cold chain',
      'Export-grade storage conditions',
      'Flexible contract terms',
      'Proximity to Delhi and Panipat for export logistics',
    ],
  },
];

const process = [
  { step: '01', title: 'Inquiry', desc: 'Contact us via phone, WhatsApp, or the inquiry form to check availability for your commodity and required quantity.' },
  { step: '02', title: 'Site Visit', desc: 'Visit our facility in Gannaur to see the chambers, discuss requirements, and understand our storage process.' },
  { step: '03', title: 'Agreement', desc: 'Confirm storage terms, sign the storage agreement, and agree on intake schedule and rates.' },
  { step: '04', title: 'Intake', desc: 'Bring your commodity to our loading bay. Our team assists with weighing, bag counting, and stacking.' },
  { step: '05', title: 'Storage', desc: 'Your commodity is stored in a designated chamber at 2°C–4°C. You can check on it at any time.' },
  { step: '06', title: 'Dispatch', desc: "When you're ready to sell, schedule a dispatch date. We handle unloading and handover efficiently." },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-green-50 border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="section-label">Our Services</span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-green-950 leading-tight mb-5 mt-3">
              Cold Storage &amp; Warehousing{' '}
              <span className="gradient-text">Solutions</span>
            </h1>
            <p className="text-steel-600 text-lg leading-relaxed">
              From potato and apple storage to commercial warehousing — our temperature-controlled
              facility in Gannaur, Sonipat offers flexible storage solutions for every type of
              agricultural and commercial storage need.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
            {services.map(({ emoji, title, subtitle, desc, features }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-green-200 hover:border-green-400 hover:shadow-green-md transition-all duration-300 group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{emoji}</div>
                  <div>
                    <div className="text-green-600 text-xs font-semibold uppercase tracking-wider mb-1">{subtitle}</div>
                    <h2 className="text-green-950 font-display font-bold text-xl group-hover:text-green-700 transition-colors">{title}</h2>
                  </div>
                </div>
                <p className="text-steel-600 text-sm leading-relaxed mb-5">{desc}</p>
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-steel-600">
                      <CheckCircle2 size={14} className="text-green-600 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-green-950">
                How the <span className="gradient-text">Process Works</span>
              </h2>
              <p className="text-steel-600 mt-3 max-w-xl mx-auto">
                Simple, transparent, and farmer-friendly — here&apos;s how we work with you from first inquiry to final dispatch.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {process.map(({ step, title, desc }) => (
                <div key={step} className="bg-white rounded-2xl p-6 relative overflow-hidden border border-green-200 hover:border-green-400 hover:shadow-green-sm transition-all">
                  <div className="text-6xl font-bold text-green-100 absolute top-4 right-4 leading-none">{step}</div>
                  <div className="relative">
                    <div className="w-8 h-8 rounded-lg bg-green-100 border border-green-200 flex items-center justify-center text-green-700 text-xs font-bold mb-4">
                      {step}
                    </div>
                    <h3 className="text-green-900 font-semibold text-base mb-2">{title}</h3>
                    <p className="text-steel-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inquiry */}
          <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto border border-green-200 shadow-green-sm">
            <div className="text-center mb-6">
              <Leaf size={28} className="text-green-500 mx-auto mb-3" />
              <h3 className="text-xl font-display font-bold text-green-950">Ready to Store Your Commodity?</h3>
              <p className="text-steel-500 text-sm mt-1">
                Tell us what you need. We will confirm availability and pricing within 24 hours.
              </p>
            </div>
            <InquiryForm sourcePage="Services Page" />
          </div>
        </div>
      </section>

      <div className="py-8 bg-green-50 text-center border-t border-green-200">
        <Link href="/contact" className="btn-primary">
          Contact Our Team <ArrowRight size={16} />
        </Link>
      </div>
    </>
  );
}
