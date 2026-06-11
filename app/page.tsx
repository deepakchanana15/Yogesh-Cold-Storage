import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Thermometer, Shield, MapPin, Truck, CheckCircle2,
  ArrowRight, Phone, Star, Package, BarChart3, Clock, Snowflake,
} from 'lucide-react';
import InquiryForm from '@/components/InquiryForm';

export const metadata: Metadata = {
  title: 'Cold Storage & Warehousing in Gannaur, Sonipat, Haryana | Yogesh Cold Storage',
  description:
    '2,412 MT temperature-controlled cold storage in Gannaur, Sonipat, Haryana. 3 chambers, 48,240 bag capacity, 2°C–4°C. Ideal for potatoes, apples, and agricultural commodities. Call +91 82872 82830.',
  alternates: { canonical: 'https://yogeshcoldstorage.com' },
};

const stats = [
  { value: '2,412', unit: 'MT', label: 'Total Storage Capacity', icon: Package },
  { value: '48,240', unit: 'Bags', label: 'Bag Capacity (50 kg)', icon: BarChart3 },
  { value: '96', unit: 'MT/day', label: 'Daily Loading Capacity', icon: Truck },
  { value: '2°–4°C', unit: '', label: 'Temperature Controlled', icon: Thermometer },
];

const whyPoints = [
  { icon: Package,     title: '2,412 MT Capacity',         desc: 'Three dedicated chambers with a combined capacity of 2,412 MT — built for large-volume storage at scale.' },
  { icon: Thermometer, title: 'Precision Temperature',     desc: 'Consistent 2°C–4°C with 90–95% humidity keeps produce fresh and market-ready throughout storage.' },
  { icon: MapPin,      title: 'Strategic Location',        desc: 'On NH-44 at Gannaur with easy access from Delhi, Panipat, Rohtak, and all key Haryana mandis.' },
  { icon: Truck,       title: '96 MT Daily Throughput',    desc: 'Efficient ramps and bay layout supports rapid loading and unloading — 96 MT per day across chambers.' },
  { icon: Shield,      title: 'Secure Facility',           desc: 'Locked access, restricted entry, and continuous oversight protects your stored commodity.' },
  { icon: Clock,       title: 'Flexible Storage Terms',    desc: 'Short-term, seasonal, and annual arrangements available for farmers, traders, and commercial clients.' },
];

const customers = [
  { emoji: '🌾', title: 'Farmers & Growers',          desc: 'Avoid distress sales. Store your harvest and sell when market prices are right.' },
  { emoji: '🤝', title: 'Commission Agents',           desc: 'Reliable storage partner for your clients through the full season.' },
  { emoji: '📦', title: 'Traders & Distributors',     desc: 'Bulk commodity storage with efficient loading and dispatch support.' },
  { emoji: '🏭', title: 'Food Processors & FMCG',     desc: 'Temperature-controlled storage for raw material and finished goods.' },
  { emoji: '🚢', title: 'Exporters',                   desc: 'Pre-shipment cold storage maintaining cold chain integrity.' },
  { emoji: '🏢', title: 'Agricultural Businesses',    desc: 'Reliable commercial storage partner for seasonal inventory management.' },
];

const faqs = [
  { q: 'What is the total storage capacity?',         a: '2,412 MT across 3 chambers with space for 48,240 bags of 50 kg each.' },
  { q: 'What temperature and humidity is maintained?', a: '2°C–4°C temperature and 90–95% humidity — ideal for potatoes, apples, and agricultural produce.' },
  { q: 'What commodities can be stored?',             a: 'Potato and apple cold storage is our primary specialisation. Other approved produce can be arranged.' },
  { q: 'Where is Yogesh Cold Storage located?',       a: 'Gannaur, Sonipat, Haryana — on NH-44 with excellent connectivity to Delhi and all major Haryana mandis.' },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-green-50 to-white" />

        {/* Sun glow */}
        <div className="absolute top-16 right-10 w-72 h-72 rounded-full bg-amber-200/40 blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-16 w-40 h-40 rounded-full bg-amber-300/30 blur-2xl pointer-events-none" />

        {/* Rolling green hills SVG */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none">
          {/* Back hill */}
          <svg viewBox="0 0 1440 260" className="w-full" preserveAspectRatio="none">
            <path fill="#bbf7d0" d="M0,180 C240,80 480,220 720,160 C960,100 1200,200 1440,150 L1440,260 L0,260 Z" />
          </svg>
          {/* Mid hill */}
          <svg viewBox="0 0 1440 200" className="w-full absolute bottom-0" preserveAspectRatio="none">
            <path fill="#86efac" d="M0,140 C200,60 400,180 600,120 C800,60 1050,170 1300,100 C1380,80 1420,110 1440,120 L1440,200 L0,200 Z" />
          </svg>
          {/* Front ground */}
          <svg viewBox="0 0 1440 120" className="w-full absolute bottom-0" preserveAspectRatio="none">
            <path fill="#4ade80" d="M0,80 C180,20 360,100 540,60 C720,20 900,90 1080,50 C1260,10 1380,70 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>

        {/* Wheat stalks SVG decoration */}
        <div className="absolute bottom-16 left-4 sm:left-12 opacity-40 pointer-events-none hidden sm:block">
          <svg width="80" height="160" viewBox="0 0 80 160">
            <line x1="40" y1="160" x2="40" y2="20" stroke="#15803d" strokeWidth="2.5"/>
            <ellipse cx="40" cy="20" rx="6" ry="14" fill="#16a34a" transform="rotate(-15,40,20)"/>
            <ellipse cx="40" cy="45" rx="5" ry="12" fill="#22c55e" transform="rotate(20,40,45)"/>
            <ellipse cx="40" cy="65" rx="5" ry="11" fill="#16a34a" transform="rotate(-20,40,65)"/>
            <ellipse cx="40" cy="85" rx="4" ry="10" fill="#22c55e" transform="rotate(15,40,85)"/>
          </svg>
        </div>
        <div className="absolute bottom-16 left-20 opacity-30 pointer-events-none hidden sm:block">
          <svg width="60" height="130" viewBox="0 0 60 130">
            <line x1="30" y1="130" x2="30" y2="15" stroke="#15803d" strokeWidth="2"/>
            <ellipse cx="30" cy="15" rx="5" ry="12" fill="#16a34a" transform="rotate(10,30,15)"/>
            <ellipse cx="30" cy="38" rx="4" ry="10" fill="#22c55e" transform="rotate(-18,30,38)"/>
            <ellipse cx="30" cy="58" rx="4" ry="9" fill="#16a34a" transform="rotate(18,30,58)"/>
          </svg>
        </div>
        <div className="absolute bottom-12 right-8 opacity-35 pointer-events-none hidden lg:block">
          <svg width="90" height="170" viewBox="0 0 90 170">
            <line x1="45" y1="170" x2="45" y2="18" stroke="#15803d" strokeWidth="2.5"/>
            <ellipse cx="45" cy="18" rx="6" ry="15" fill="#16a34a" transform="rotate(8,45,18)"/>
            <ellipse cx="45" cy="42" rx="5" ry="12" fill="#22c55e" transform="rotate(-22,45,42)"/>
            <ellipse cx="45" cy="65" rx="5" ry="11" fill="#16a34a" transform="rotate(18,45,65)"/>
            <ellipse cx="45" cy="90" rx="4" ry="10" fill="#22c55e" transform="rotate(-12,45,90)"/>
          </svg>
        </div>

        {/* Crop row lines on ground */}
        <div
          className="absolute bottom-0 left-0 w-full h-24 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, #15803d 0px, #15803d 3px, transparent 3px, transparent 28px)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — headline */}
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-green-700 bg-green-100 border border-green-300 px-4 py-2 rounded-full mb-6">
                <span>🌾</span> Gannaur · Sonipat · Haryana
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-green-950 leading-[1.08] mb-6">
                Reliable{' '}
                <span className="gradient-text">Cold Storage</span>
                {' '}&amp; Warehousing for Haryana&apos;s Farmers
              </h1>

              <p className="text-lg text-steel-600 leading-relaxed mb-8 max-w-xl">
                2,412 MT temperature-controlled storage across 3 chambers in Gannaur, Sonipat.
                Protect your harvest. Sell at the right time.
              </p>

              {/* Quick capacity pills */}
              <div className="flex flex-wrap gap-3 mb-10">
                {[
                  { v: '2,412 MT', l: 'Capacity' },
                  { v: '3 Chambers', l: 'Storage' },
                  { v: '2°–4°C', l: 'Temperature' },
                  { v: '96 MT/day', l: 'Loading' },
                ].map(({ v, l }) => (
                  <div key={l} className="bg-white border border-green-200 rounded-xl px-4 py-2.5 shadow-green-sm">
                    <div className="text-green-800 font-bold text-sm">{v}</div>
                    <div className="text-steel-500 text-xs">{l}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#inquiry" className="btn-primary text-base">
                  <CheckCircle2 size={18} /> Check Availability
                </a>
                <a href="tel:+918287282830" className="btn-secondary text-base">
                  <Phone size={18} /> +91 82872 82830
                </a>
              </div>

              <p className="text-steel-500 text-sm mt-5 flex items-center gap-2">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                Managed by Sudha Jain · Trusted by 500+ customers across Haryana
              </p>
            </div>

            {/* Right — Inquiry form */}
            <div id="inquiry" className="bg-white rounded-3xl p-6 sm:p-8 border border-green-200 shadow-green-lg">
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-700 bg-green-100 px-3 py-1.5 rounded-full mb-3">
                  <Snowflake size={10} /> Free Inquiry
                </div>
                <h2 className="text-xl font-display font-bold text-green-900">Get Storage Availability</h2>
                <p className="text-steel-500 text-sm mt-1">Fill in your details — we respond within 24 hours.</p>
              </div>
              <InquiryForm sourcePage="Home Hero" compact />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <section className="bg-green-700 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x lg:divide-green-600">
            {stats.map(({ value, unit, label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center text-center px-4">
                <Icon size={22} className="text-green-300 mb-2" />
                <div className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {value}
                  {unit && <span className="text-green-300 text-lg ml-1">{unit}</span>}
                </div>
                <div className="text-green-300 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ──────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-14">
            <span className="section-label"><Star size={12} /> Who We Serve</span>
            <h2 className="section-title mt-3">
              Storage Solutions for <span className="gradient-text">Every Agri-Business</span>
            </h2>
            <p className="section-subtitle mx-auto mt-4">
              From small farmers to large exporters — our facility serves the complete
              agricultural value chain across Haryana and the Delhi-NCR region.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {customers.map(({ emoji, title, desc }) => (
              <div key={title} className="glass-card rounded-2xl p-6 hover:border-green-400 hover:shadow-green-md transition-all duration-300 group">
                <div className="text-3xl mb-4">{emoji}</div>
                <h3 className="text-green-900 font-bold text-base mb-2 group-hover:text-green-700">{title}</h3>
                <p className="text-steel-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────────── */}
      <section className="section-padding bg-green-50">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="section-label"><CheckCircle2 size={12} /> Why Choose Us</span>
              <h2 className="section-title mt-3 mb-6">
                The Cold Storage Partner <span className="gradient-text">Built for Reliability</span>
              </h2>
              <p className="text-steel-600 leading-relaxed mb-8">
                At Yogesh Cold Storage, every decision is made with one goal: protecting the value
                of what you store. Our facility in Gannaur offers professional-grade cold chain
                capabilities at a strategic Haryana location.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  '2,412 MT combined storage across 3 chambers',
                  'Consistent 2°C–4°C temperature round the clock',
                  '90–95% humidity optimised for produce preservation',
                  'Capacity for 48,240 bags (50 kg each)',
                  '96 MT daily loading and dispatch capability',
                  'Strategic location on NH-44, Gannaur, Sonipat',
                  'Professionally managed under Sudha Jain',
                  'Secure, restricted-access facility',
                ].map((p) => (
                  <div key={p} className="flex items-start gap-3">
                    <CheckCircle2 size={17} className="text-green-600 mt-0.5 shrink-0" />
                    <span className="text-steel-700 text-sm">{p}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link href="/facility" className="btn-primary text-sm">View Facility <ArrowRight size={16} /></Link>
                <Link href="/contact" className="btn-secondary text-sm">Contact Us</Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyPoints.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-2xl p-5 border border-green-200 hover:border-green-400 hover:shadow-green-sm transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-green-700" />
                  </div>
                  <h3 className="text-green-900 font-bold text-sm mb-2">{title}</h3>
                  <p className="text-steel-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAMBERS QUICK LOOK ───────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <span className="section-label"><Package size={12} /> Our Facility</span>
            <h2 className="section-title mt-3">Three Purpose-Built <span className="gradient-text">Storage Chambers</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { name: 'Chamber 1', cap: '1,206 MT', bags: '24,120 bags', dim: '64.5 × 66 × 34 ft', daily: '48 MT/day', color: 'border-t-green-600' },
              { name: 'Chamber 2', cap: '603 MT',   bags: '12,060 bags', dim: '64.5 × 33 × 34 ft', daily: '24 MT/day', color: 'border-t-green-500' },
              { name: 'Chamber 3', cap: '603 MT',   bags: '12,060 bags', dim: '64.5 × 33 × 34 ft', daily: '24 MT/day', color: 'border-t-amber-500' },
            ].map((ch) => (
              <div key={ch.name} className={`bg-white rounded-2xl border-t-4 border border-green-200 shadow-green-sm ${ch.color} overflow-hidden hover:shadow-green-md transition-all`}>
                <div className="p-6">
                  <h3 className="text-green-900 font-display font-bold text-lg mb-4">{ch.name}</h3>
                  <div className="space-y-0">
                    {[
                      { l: 'Capacity', v: ch.cap },
                      { l: 'Bag Capacity', v: ch.bags },
                      { l: 'Dimensions', v: ch.dim },
                      { l: 'Daily Loading', v: ch.daily },
                      { l: 'Temperature', v: '2°C – 4°C' },
                      { l: 'Humidity', v: '90% – 95%' },
                    ].map(({ l, v }) => (
                      <div key={l} className="flex justify-between text-sm py-2.5 border-b border-green-100 last:border-0">
                        <span className="text-steel-500">{l}</span>
                        <span className="text-green-900 font-semibold">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/facility" className="btn-primary">View Full Facility Details <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="section-padding bg-green-50">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="section-label">FAQs</span>
              <h2 className="section-title mt-3">Common Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <div key={q} className="bg-white rounded-2xl p-6 border border-green-200 hover:border-green-400 hover:shadow-green-sm transition-all">
                  <h3 className="text-green-900 font-bold text-sm mb-2">{q}</h3>
                  <p className="text-steel-600 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/faq" className="text-green-700 text-sm font-semibold hover:text-green-900 flex items-center justify-center gap-1">
                View All FAQs <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ──────────────────────────────────────────── */}
      <section className="py-20 bg-green-700 relative overflow-hidden">
        {/* Subtle crop row pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg,#fff 0px,#fff 2px,transparent 2px,transparent 30px)' }} />
        <div className="relative container-max px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-5">🌾</div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            Need Cold Storage in Haryana?
          </h2>
          <p className="text-green-200 text-lg mb-8 max-w-xl mx-auto">
            Contact us today to check availability and get a quote for your specific storage needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+918287282830" className="inline-flex items-center justify-center gap-2 bg-white text-green-700 font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-all shadow-lg">
              <Phone size={18} /> Call +91 82872 82830
            </a>
            <a
              href="https://wa.me/918287282830?text=I%20want%20to%20inquire%20about%20storage%20availability"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-green-900 font-bold px-8 py-4 rounded-xl transition-all shadow-lg"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
