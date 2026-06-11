import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, ArrowRight, Play } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Facility Gallery & Tour — Yogesh Cold Storage, Gannaur, Haryana',
  description:
    'Photo gallery and virtual facility tour of Yogesh Cold Storage in Gannaur, Sonipat, Haryana. See our cold storage chambers, loading bays, access doors, and infrastructure.',
  alternates: { canonical: 'https://yogeshcoldstorage.com/gallery' },
};

const galleryImages = [
  {
    src: '/images/facility-01.jpeg',
    alt: 'Cold storage main chamber — ribbed floor and high bay with steel roof trusses',
    caption: 'Main Storage Chamber — 34 ft high bay with corrugated roof',
    tag: 'Main Chamber',
    wide: true,
  },
  {
    src: '/images/facility-02.jpeg',
    alt: 'Steel roof truss structure inside Yogesh Cold Storage',
    caption: 'Heavy-duty steel truss roofing structure',
    tag: 'Roof Structure',
  },
  {
    src: '/images/facility-03.jpeg',
    alt: 'Numbered steel rack frames inside cold storage facility',
    caption: 'Numbered rack grid system — organised commodity stacking',
    tag: 'Storage Racks',
  },
  {
    src: '/images/facility-04.jpeg',
    alt: 'Empty cold storage chamber with numbered steel columns, sections 146–148',
    caption: 'Chamber section 146–148 — cleared and ready for intake',
    tag: 'Chamber Interior',
  },
  {
    src: '/images/facility-05.jpeg',
    alt: 'Cold storage interior with numbered columns 74–86, high capacity space',
    caption: 'Chamber sections 74–86 — large open storage floor',
    tag: 'Chamber Interior',
  },
  {
    src: '/images/facility-06.jpeg',
    alt: 'Corrugated roof sheets with steel beams and natural light gaps',
    caption: 'Corrugated iron roofing with structural steel beams',
    tag: 'Roof Detail',
  },
  {
    src: '/images/facility-07.jpeg',
    alt: 'Steel column number 128 — internal post with storage floor',
    caption: 'Internal post column 128 — section marker system',
    tag: 'Column Markers',
  },
  {
    src: '/images/facility-08.jpeg',
    alt: 'Wooden staircase inside cold storage facility connecting floors',
    caption: 'Interior wooden staircase — access between levels',
    tag: 'Access',
  },
  {
    src: '/images/facility-09.jpeg',
    alt: 'Cold storage hall with external staircase and large open floor area',
    caption: 'Wide open storage hall with external staircase visible',
    tag: 'Main Hall',
    wide: true,
  },
  {
    src: '/images/facility-10.jpeg',
    alt: 'Secure grey metal access door with padlock at cold storage facility',
    caption: 'Secure steel entry door with padlock — restricted access',
    tag: 'Security',
  },
  {
    src: '/images/facility-11.jpeg',
    alt: 'Interior of cold storage hall — wide floor space with industrial ceiling',
    caption: 'Chamber interior — 64.5 ft wide floor space',
    tag: 'Chamber Interior',
    wide: true,
  },
  {
    src: '/images/facility-12.jpeg',
    alt: 'Storage room with chemical and supplies shelf, wooden door entry',
    caption: 'Operations room with supplies and chemical storage',
    tag: 'Operations Room',
  },
  {
    src: '/images/facility-13.jpeg',
    alt: 'Second wooden staircase with green tarpaulin visible — cold storage access',
    caption: 'Interior staircase — access to upper storage level',
    tag: 'Access',
  },
  {
    src: '/images/facility-14.jpeg',
    alt: 'Open-tread wooden staircase with storage equipment underneath',
    caption: 'Working staircase with equipment storage beneath',
    tag: 'Access',
  },
  {
    src: '/images/facility-15.jpeg',
    alt: 'Blue cold storage door with air conditioning unit above — pre-cooling zone',
    caption: 'Pre-cooling zone entry — blue insulated door with AC unit',
    tag: 'Cold Room Entry',
  },
  {
    src: '/images/facility-16.jpeg',
    alt: 'Two cold storage chamber doors side by side — insulated access points',
    caption: 'Dual cold chamber doors — insulated and sealed for temperature control',
    tag: 'Chamber Doors',
  },
];

const tourHighlights = [
  { icon: '🏗️', title: '34 ft High Bay', desc: 'High-clearance chambers designed for maximum vertical bag stacking capacity' },
  { icon: '📍', title: 'Numbered Grid System', desc: 'Every column and section is numbered for precise commodity location tracking' },
  { icon: '🔒', title: 'Secure Entry', desc: 'Multiple locked access points restrict entry and protect stored commodities' },
  { icon: '🚪', title: 'Insulated Chamber Doors', desc: 'Heavy-duty insulated doors maintain temperature integrity at all entry points' },
  { icon: '🪜', title: 'Internal Access', desc: 'Multi-level access via internal staircases for efficient operations' },
  { icon: '🌡️', title: 'AC & Cooling Units', desc: 'Dedicated cooling units at chamber entries for pre-cooling incoming produce' },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-green-50 border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="section-label">
              <Camera size={12} />
              Facility Gallery
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-green-950 leading-tight mb-5 mt-3">
              See the Facility{' '}
              <span className="gradient-text">Up Close</span>
            </h1>
            <p className="text-steel-600 text-lg leading-relaxed">
              Real photographs from inside Yogesh Cold Storage — our chambers, loading areas,
              infrastructure, and security systems as they are today.
            </p>
          </div>
        </div>
      </section>

      {/* Facility Tour Highlights */}
      <section className="py-12 bg-white border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Play size={18} className="text-green-600" />
            <h2 className="text-xl font-display font-bold text-green-950">Facility Tour Highlights</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {tourHighlights.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-4 text-center border border-green-200 hover:border-green-400 hover:shadow-green-sm transition-all">
                <div className="text-2xl mb-2">{icon}</div>
                <div className="text-green-900 font-semibold text-xs mb-1">{title}</div>
                <div className="text-steel-500 text-[10px] leading-tight">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map(({ src, alt, caption, tag }) => (
              <div
                key={src}
                className="break-inside-avoid bg-white rounded-2xl overflow-hidden border border-green-200 group hover:border-green-400 hover:shadow-green-md transition-all duration-300"
              >
                <div className="relative overflow-hidden bg-green-50">
                  <Image
                    src={src}
                    alt={alt}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-steel-600 text-xs leading-snug">{caption}</p>
                    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-green-700 bg-green-100 border border-green-200 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Site visit CTA */}
          <div className="mt-12 bg-green-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-green-200">
            <div>
              <h3 className="text-green-900 font-semibold mb-1">Want to see the facility in person?</h3>
              <p className="text-steel-500 text-sm">
                Schedule a site visit to walk through the chambers and discuss your storage requirements directly.
              </p>
            </div>
            <Link href="/contact" className="btn-primary shrink-0">
              Book a Site Visit <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
