import type { Metadata } from 'next';
import Link from 'next/link';
import { Thermometer, Package, Truck, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';
import InquiryForm from '@/components/InquiryForm';

export const metadata: Metadata = {
  title: 'Facility — Cold Storage Chambers, Capacity & Specifications | Yogesh Cold Storage',
  description:
    'Detailed facility specs for Yogesh Cold Storage. 3 chambers, 2,412 MT total capacity, 2°C–4°C temperature, 90–95% humidity, 96 MT daily loading. Located in Gannaur, Sonipat, Haryana.',
  alternates: { canonical: 'https://yogeshcoldstorage.com/facility' },
};

const chambers = [
  {
    id: 'C1',
    name: 'Chamber 1',
    capacity: '1,206 MT',
    volume: '1,44,738 cu.ft',
    bags: '24,120 Bags',
    dimensions: '64.5 ft × 66 ft × 34 ft',
    dailyLoading: '48 MT / day',
    temp: '2°C – 4°C',
    humidity: '90% – 95%',
    share: 50,
    accent: 'from-green-600 to-green-500',
    borderTop: 'border-t-green-600',
  },
  {
    id: 'C2',
    name: 'Chamber 2',
    capacity: '603 MT',
    volume: '72,369 cu.ft',
    bags: '12,060 Bags',
    dimensions: '64.5 ft × 33 ft × 34 ft',
    dailyLoading: '24 MT / day',
    temp: '2°C – 4°C',
    humidity: '90% – 95%',
    share: 25,
    accent: 'from-green-700 to-green-500',
    borderTop: 'border-t-green-500',
  },
  {
    id: 'C3',
    name: 'Chamber 3',
    capacity: '603 MT',
    volume: '72,369 cu.ft',
    bags: '12,060 Bags',
    dimensions: '64.5 ft × 33 ft × 34 ft',
    dailyLoading: '24 MT / day',
    temp: '2°C – 4°C',
    humidity: '90% – 95%',
    share: 25,
    accent: 'from-amber-500 to-amber-400',
    borderTop: 'border-t-amber-500',
  },
];

const totalSpecs = [
  { label: 'Total Volume', value: '2,89,476 cu.ft', icon: BarChart3 },
  { label: 'Total Capacity', value: '2,412 MT', icon: Package },
  { label: 'Total Bags', value: '48,240 Bags', icon: Package },
  { label: 'Max Daily Loading', value: '96 MT / day', icon: Truck },
  { label: 'Temperature', value: '2°C – 4°C', icon: Thermometer },
  { label: 'Humidity', value: '90% – 95%', icon: Thermometer },
];

const infrastructure = [
  { title: 'Insulated Chambers', desc: 'High-performance PUF panels ensure minimal thermal loss and energy-efficient temperature maintenance throughout the storage cycle.' },
  { title: 'Refrigeration Units', desc: 'Industrial-grade refrigeration compressors and evaporators maintain steady temperature across all chambers simultaneously.' },
  { title: 'Humidity Management', desc: 'Controlled humidity at 90–95% prevents moisture loss and maintains the natural weight and quality of stored agricultural produce.' },
  { title: 'Loading Infrastructure', desc: 'Wide entry points, ramps, and clear internal spacing support efficient bag stacking, forklift movement, and daily loading operations.' },
  { title: 'Power Backup', desc: 'Dedicated power supply arrangements ensure continuous refrigeration without interruption during power fluctuations or outages.' },
  { title: 'Access Security', desc: 'Restricted access with locked entry doors and oversight ensures the safety and integrity of all stored commodities.' },
];

export default function FacilityPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-green-50 border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="section-label">Our Facility</span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-green-950 leading-tight mb-5 mt-3">
              Purpose-Built{' '}
              <span className="gradient-text">Cold Storage Infrastructure</span>
            </h1>
            <p className="text-steel-600 text-lg leading-relaxed">
              Three dedicated temperature-controlled chambers with a combined capacity of 2,412 MT,
              engineered for agricultural produce and commercial storage in Gannaur, Haryana.
            </p>
          </div>
        </div>
      </section>

      {/* Total Specs */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {totalSpecs.map(({ label, value, icon: Icon }) => (
              <div key={label} className="glass-card rounded-2xl p-5 text-center hover:border-green-400 hover:shadow-green-sm transition-all">
                <Icon size={20} className="text-green-600 mx-auto mb-3" />
                <div className="text-green-900 font-bold text-base">{value}</div>
                <div className="text-steel-500 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Capacity visual bar */}
          <div className="bg-white rounded-2xl p-6 mb-16 border border-green-200 shadow-green-sm">
            <h2 className="text-green-950 font-display font-bold text-lg mb-6">Capacity Distribution</h2>
            <div className="space-y-4">
              {chambers.map((c) => (
                <div key={c.id}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-green-900 text-sm font-medium">{c.name}</span>
                    <span className="text-green-700 text-sm font-bold">{c.capacity} ({c.share}%)</span>
                  </div>
                  <div className="h-3 bg-green-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${c.accent}`}
                      style={{ width: `${c.share}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chamber cards */}
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-green-950 mb-8 text-center">
            Chamber <span className="gradient-text">Specifications</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            {chambers.map((ch) => (
              <div key={ch.id} className={`bg-white rounded-2xl overflow-hidden border-t-4 border border-green-200 hover:shadow-green-md transition-all duration-300 ${ch.borderTop}`}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-green-950 font-display font-bold text-xl">{ch.name}</h3>
                      <div className="text-steel-500 text-xs mt-0.5">{ch.volume}</div>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ch.accent} flex items-center justify-center text-white font-bold text-lg`}>
                      {ch.id}
                    </div>
                  </div>

                  <div className="space-y-0">
                    {[
                      { l: 'Storage Capacity', v: ch.capacity },
                      { l: 'Dimensions', v: ch.dimensions },
                      { l: 'Bag Capacity (50kg)', v: ch.bags },
                      { l: 'Daily Loading', v: ch.dailyLoading },
                      { l: 'Temperature', v: ch.temp },
                      { l: 'Humidity', v: ch.humidity },
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

          {/* Consolidated spec table */}
          <h2 className="text-2xl font-display font-bold text-green-950 mb-6 text-center">
            Consolidated <span className="gradient-text">Specification Table</span>
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-green-200 mb-16">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-green-50">
                  <th className="px-5 py-4 text-left text-green-800 font-semibold">Parameter</th>
                  <th className="px-5 py-4 text-center text-green-700 font-semibold">Chamber 1</th>
                  <th className="px-5 py-4 text-center text-green-700 font-semibold">Chamber 2</th>
                  <th className="px-5 py-4 text-center text-green-700 font-semibold">Chamber 3</th>
                  <th className="px-5 py-4 text-center text-green-900 font-bold bg-green-100">Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Dimensions (ft)', '64.5×66×34', '64.5×33×34', '64.5×33×34', '—'],
                  ['Volume (cu.ft)', '1,44,738', '72,369', '72,369', '2,89,476'],
                  ['Capacity (MT)', '1,206', '603', '603', '2,412'],
                  ['Bag Capacity (50kg)', '24,120', '12,060', '12,060', '48,240'],
                  ['Daily Loading (MT)', '48', '24', '24', '96'],
                  ['Temperature', '2°C–4°C', '2°C–4°C', '2°C–4°C', '2°C–4°C'],
                  ['Humidity', '90%–95%', '90%–95%', '90%–95%', '90%–95%'],
                ].map(([param, c1, c2, c3, total]) => (
                  <tr key={param} className="border-b border-green-100 hover:bg-green-50 transition-colors">
                    <td className="px-5 py-3.5 text-steel-700 font-medium">{param}</td>
                    <td className="px-5 py-3.5 text-green-900 text-center">{c1}</td>
                    <td className="px-5 py-3.5 text-green-900 text-center">{c2}</td>
                    <td className="px-5 py-3.5 text-green-900 text-center">{c3}</td>
                    <td className="px-5 py-3.5 text-green-700 font-bold text-center bg-green-50">{total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Infrastructure */}
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-green-950 mb-8 text-center">
            Facility <span className="gradient-text">Infrastructure</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {infrastructure.map(({ title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-5 border border-green-200 hover:border-green-400 hover:shadow-green-sm transition-all duration-300">
                <CheckCircle2 size={18} className="text-green-600 mb-3" />
                <h3 className="text-green-900 font-semibold text-sm mb-2">{title}</h3>
                <p className="text-steel-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Inquiry */}
          <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto border border-green-200 shadow-green-sm">
            <div className="text-center mb-6">
              <h3 className="text-xl font-display font-bold text-green-950">Check Storage Availability</h3>
              <p className="text-steel-500 text-sm mt-1">
                Tell us your requirements and we will confirm availability and rates.
              </p>
            </div>
            <InquiryForm sourcePage="Facility Page" />
          </div>
        </div>
      </section>

      <div className="py-8 bg-green-50 text-center border-t border-green-200">
        <Link href="/gallery" className="btn-primary">
          View Facility Gallery <ArrowRight size={16} />
        </Link>
      </div>
    </>
  );
}
