import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Target, Shield, Heart, Users, Leaf } from 'lucide-react';
import InquiryForm from '@/components/InquiryForm';

export const metadata: Metadata = {
  title: 'About Us — Yogesh Cold Storage, Gannaur, Sonipat',
  description:
    'Learn about Yogesh Cold Storage — a professionally managed cold storage and warehousing facility in Gannaur, Sonipat, Haryana, led by Sudha Jain with a commitment to quality and reliability.',
  alternates: { canonical: 'https://yogeshcoldstorage.com/about' },
};

const values = [
  {
    icon: Shield,
    title: 'Reliability',
    desc: 'Our customers depend on us to protect their produce. We invest in infrastructure and processes that deliver consistent, uninterrupted temperature control every single day.',
  },
  {
    icon: Target,
    title: 'Operational Excellence',
    desc: 'Efficient loading, organised storage layout, and clear documentation ensure that your commodity is always traceable and dispatched on time.',
  },
  {
    icon: Heart,
    title: 'Customer Focus',
    desc: 'Every customer — whether a small farmer or a large exporter — receives transparent rates, honest communication, and dedicated support.',
  },
  {
    icon: Users,
    title: 'Community Commitment',
    desc: 'We are proud to serve the agricultural community of Haryana, helping farmers realise better returns by providing access to professional storage infrastructure.',
  },
];

const milestones = [
  { year: 'Established', event: 'Yogesh Cold Storage founded in Gannaur, Sonipat' },
  { year: 'Chamber 1', event: '1,206 MT capacity chamber commissioned for potato & apple storage' },
  { year: 'Expansion', event: 'Chambers 2 & 3 added — total capacity reached 2,412 MT' },
  { year: 'Today', event: 'Serving 500+ customers across Haryana & Delhi-NCR region' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-green-50 border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="section-label">About Us</span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-green-950 leading-tight mb-5 mt-3">
              Cold Storage Built on{' '}
              <span className="gradient-text">Trust &amp; Reliability</span>
            </h1>
            <p className="text-steel-600 text-lg leading-relaxed">
              Yogesh Cold Storage is a professional cold storage and warehousing facility located in
              Gannaur, Sonipat, Haryana — strategically positioned to serve farmers, traders, and
              agri-businesses across the Delhi-NCR and Haryana agricultural belt.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-green-950 mb-5">
                Who We Are
              </h2>
              <div className="space-y-4 text-steel-600 leading-relaxed">
                <p>
                  Yogesh Cold Storage was established to address a critical gap in agricultural storage
                  infrastructure in the Sonipat district of Haryana. Farmers in the region, despite
                  growing high-quality produce, often had to sell at distressed prices due to lack of
                  access to professional cold storage.
                </p>
                <p>
                  Our facility changes that. With 2,412 MT of temperature-controlled storage across
                  three purpose-built chambers, we provide farmers, commission agents, traders, and
                  food businesses the infrastructure to store their commodities safely until market
                  conditions are favourable.
                </p>
                <p>
                  Each chamber is engineered to maintain precise temperature (2°C–4°C) and humidity
                  (90%–95%) conditions — creating an environment where agricultural produce retains
                  its quality, weight, and market value throughout the storage period.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { v: '2,412 MT', l: 'Total Capacity' },
                  { v: '3', l: 'Storage Chambers' },
                  { v: '48,240', l: 'Bag Capacity' },
                  { v: '96 MT', l: 'Daily Loading' },
                ].map(({ v, l }) => (
                  <div key={l} className="glass-card rounded-xl p-4 text-center">
                    <div className="text-green-700 font-bold text-xl">{v}</div>
                    <div className="text-steel-500 text-xs mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Owner Card */}
            <div>
              <div className="bg-white rounded-2xl p-8 border border-green-200 shadow-green-md">
                <div className="w-20 h-20 rounded-2xl bg-green-100 border border-green-300 flex items-center justify-center mb-6 text-3xl">
                  👩‍💼
                </div>
                <div className="text-xs font-semibold tracking-widest uppercase text-green-600 mb-2">
                  Management
                </div>
                <h3 className="text-2xl font-display font-bold text-green-950 mb-2">Sudha Jain</h3>
                <div className="text-steel-500 text-sm mb-4">Owner &amp; Managing Director</div>
                <p className="text-steel-600 text-sm leading-relaxed mb-6">
                  Under the leadership of Sudha Jain, Yogesh Cold Storage has grown into one of the
                  most trusted cold storage facilities in the Sonipat district. Her commitment to
                  transparent business practices, fair pricing, and customer satisfaction has built
                  lasting relationships with hundreds of farmers and trading businesses across Haryana.
                </p>
                <div className="space-y-2">
                  {[
                    'Transparent pricing with no hidden charges',
                    'Fair and accessible to farmers of all scales',
                    'Personally oversees quality standards',
                    'Customer-first business philosophy',
                  ].map((p) => (
                    <div key={p} className="flex items-center gap-2 text-steel-600 text-sm">
                      <CheckCircle2 size={14} className="text-green-600 shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-green-950">
              Our <span className="gradient-text">Core Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 text-center border border-green-200 hover:border-green-400 hover:shadow-green-sm transition-all">
                <div className="w-12 h-12 rounded-2xl bg-green-100 border border-green-200 flex items-center justify-center mx-auto mb-4">
                  <Icon size={20} className="text-green-700" />
                </div>
                <h3 className="text-green-900 font-semibold mb-3">{title}</h3>
                <p className="text-steel-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-green-950">Our Journey</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-green-500 via-green-400 to-green-200" />
            <div className="space-y-8">
              {milestones.map(({ year, event }) => (
                <div key={year} className="flex items-start gap-6 pl-20 relative">
                  <div className="absolute left-6 w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow -translate-x-1/2" />
                  <div className="bg-white rounded-xl p-5 flex-1 border border-green-200 shadow-green-sm">
                    <div className="text-green-600 text-xs font-semibold uppercase tracking-wider mb-1">{year}</div>
                    <div className="text-green-900 text-sm font-medium">{event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-50 border-t border-green-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Leaf size={36} className="text-green-500 mb-5" />
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-green-950 mb-4">
                Want to store with us?
              </h2>
              <p className="text-steel-600 mb-6">
                Talk to our team to understand how Yogesh Cold Storage can support your storage needs
                this season.
              </p>
              <Link href="/contact" className="btn-primary">
                Get in Touch <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-green-200 shadow-green-sm">
              <h3 className="text-green-900 font-semibold mb-4 text-sm">Quick Inquiry</h3>
              <InquiryForm sourcePage="About Page" compact />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
