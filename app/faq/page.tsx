import type { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, ArrowRight, MapPin, Phone, Star, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ & Local Business Guide — Yogesh Cold Storage, Gannaur, Sonipat',
  description:
    'Frequently asked questions about Yogesh Cold Storage in Gannaur, Sonipat, Haryana. Cold storage rates, capacity, process, and local business information for Delhi-NCR region farmers and traders.',
  keywords: [
    'cold storage FAQ Haryana',
    'yogesh cold storage questions',
    'cold storage rates Gannaur',
    'potato storage charges Sonipat',
    'cold storage near Sonipat',
    'cold storage near Delhi',
    'cold storage near Panipat',
    'agricultural storage Haryana FAQ',
  ],
  alternates: { canonical: 'https://yogeshcoldstorage.com/faq' },
};

const faqCategories = [
  {
    category: 'General',
    icon: '❓',
    questions: [
      {
        q: 'What is Yogesh Cold Storage?',
        a: 'Yogesh Cold Storage is a professional cold storage and warehousing facility located in Gannaur, Sonipat, Haryana. It offers 2,412 MT of temperature-controlled storage across 3 chambers, primarily designed for agricultural produce storage including potatoes and apples. The facility is managed by Sudha Jain.',
      },
      {
        q: 'Who manages Yogesh Cold Storage?',
        a: 'The facility is owned and managed by Sudha Jain, who is personally involved in day-to-day operations and customer relations. The management philosophy centres on transparency, fair pricing, and strong service for farmers and traders of all sizes.',
      },
      {
        q: 'How many years has Yogesh Cold Storage been operating?',
        a: 'Yogesh Cold Storage is an established facility in Gannaur, Sonipat, having served hundreds of customers across Haryana and the Delhi-NCR agricultural belt. Please contact us for the exact establishment year.',
      },
    ],
  },
  {
    category: 'Capacity & Specifications',
    icon: '📦',
    questions: [
      {
        q: 'What is the total storage capacity?',
        a: 'The total capacity is 2,412 MT across three chambers. Chamber 1 holds 1,206 MT, while Chambers 2 and 3 each hold 603 MT. In terms of bags, the facility holds 48,240 bags of 50kg each.',
      },
      {
        q: 'What are the dimensions of the storage chambers?',
        a: 'Chamber 1 is 64.5 ft × 66 ft × 34 ft (volume: 1,44,738 cu.ft). Chambers 2 and 3 are each 64.5 ft × 33 ft × 34 ft (volume: 72,369 cu.ft each). Total volume is 2,89,476 cubic feet.',
      },
      {
        q: 'What is the maximum daily loading capacity?',
        a: 'The maximum daily loading capacity across all three chambers is 96 MT per day. Chamber 1 supports 48 MT/day, and Chambers 2 and 3 each support 24 MT/day.',
      },
      {
        q: 'Can I book a single chamber separately?',
        a: 'Yes, individual chamber booking may be available depending on current occupancy. Chamber 1 (1,206 MT) and Chambers 2 & 3 (603 MT each) can be discussed separately. Contact us to check current availability.',
      },
    ],
  },
  {
    category: 'Temperature & Storage Conditions',
    icon: '🌡️',
    questions: [
      {
        q: 'What temperature is maintained inside the chambers?',
        a: 'All three chambers are maintained at a consistent 2°C to 4°C. This temperature range is optimal for potato dormancy, apple firmness retention, and most agricultural produce preservation.',
      },
      {
        q: 'What is the humidity inside the storage chambers?',
        a: 'Humidity is maintained between 90% and 95%, which prevents dehydration and weight loss in stored commodities — critical for potatoes and fresh produce.',
      },
      {
        q: 'Is the temperature consistent 24/7?',
        a: 'Yes. The refrigeration systems are designed for continuous operation. Power backup arrangements ensure temperature is maintained even during power outages.',
      },
      {
        q: 'Can temperature be adjusted for different commodities?',
        a: 'Currently, all chambers are operated at the standard 2°C–4°C range. For commodities requiring different conditions, please contact us to discuss feasibility.',
      },
    ],
  },
  {
    category: 'Rates & Process',
    icon: '💰',
    questions: [
      {
        q: 'How are cold storage charges calculated?',
        a: 'Storage charges are typically calculated per bag per month, or per MT per month, depending on the agreement. Charges may vary based on commodity type, storage duration, and seasonal demand. Contact us for the current rate card.',
      },
      {
        q: 'What is the minimum storage duration?',
        a: 'We accommodate both short-term and long-term storage. Minimum storage periods are discussed at the time of booking and may vary by season and commodity.',
      },
      {
        q: 'Can I retrieve part of my stored commodity?',
        a: 'Yes. Partial dispatch is allowed. You can retrieve any portion of your stored commodity as long as proper notice is given for scheduling the dispatch.',
      },
      {
        q: 'What documentation is provided upon intake?',
        a: 'Upon intake, a receipt or storage agreement is provided specifying the quantity (in bags and MT), intake date, commodity type, and assigned storage location within the chamber.',
      },
    ],
  },
  {
    category: 'Commodities',
    icon: '🌾',
    questions: [
      {
        q: 'What commodities can be stored at Yogesh Cold Storage?',
        a: 'The facility specialises in potato and apple cold storage. Other agricultural produce — including onions, garlic, and certain fruits — may be accommodated based on prior discussion and approval. FMCG and commercial commodities are also considered.',
      },
      {
        q: 'Is Yogesh Cold Storage suitable for export-quality potatoes?',
        a: 'Yes. The 2°C–4°C temperature and controlled humidity are suitable for maintaining export-quality potatoes during the pre-shipment storage period.',
      },
      {
        q: 'Can food processing companies use this facility?',
        a: 'Absolutely. We welcome food processors, distributors, and FMCG companies needing bulk storage for raw materials or finished goods. Volume-based arrangements can be discussed.',
      },
    ],
  },
  {
    category: 'Location & Access',
    icon: '📍',
    questions: [
      {
        q: 'Where is Yogesh Cold Storage located?',
        a: 'Yogesh Cold Storage is located in Gannaur, Sonipat district, Haryana. Gannaur is on National Highway 44 (Delhi–Chandigarh highway), providing excellent connectivity to Delhi (approx. 50 km), Panipat, Rohtak, and major Haryana agricultural markets.',
      },
      {
        q: 'Is Yogesh Cold Storage accessible from Delhi?',
        a: 'Yes. The facility is approximately 50–55 km from central Delhi via NH-44. Farmers from the Delhi-NCR region regularly store produce at our facility.',
      },
      {
        q: 'Is there vehicle access for trucks and trolleys?',
        a: 'Yes. The facility has vehicle access for trucks and agricultural trolleys for loading and unloading. Please coordinate in advance for large vehicle arrivals.',
      },
    ],
  },
];

const localSEOAreas = [
  { area: 'Gannaur', dist: '0 km — On-site' },
  { area: 'Sonipat', dist: '~22 km' },
  { area: 'Delhi', dist: '~52 km via NH-44' },
  { area: 'Panipat', dist: '~38 km' },
  { area: 'Rohtak', dist: '~55 km' },
  { area: 'Gurgaon', dist: '~80 km' },
  { area: 'Faridabad', dist: '~65 km' },
  { area: 'Karnal', dist: '~68 km' },
  { area: 'Ambala', dist: '~130 km' },
  { area: 'Chandigarh', dist: '~220 km via NH-44' },
];

const gbpTips = [
  {
    title: 'Google Business Profile',
    desc: 'Yogesh Cold Storage has a Google Business Profile listing. Search "Yogesh Cold Storage Gannaur" on Google Maps to find us, get directions, and read reviews.',
    icon: '📍',
  },
  {
    title: 'Google Reviews',
    desc: 'We welcome reviews from our valued customers. Honest feedback helps future customers make informed decisions and helps us improve our service.',
    icon: '⭐',
  },
  {
    title: 'Google Maps',
    desc: 'Find us on Google Maps — get turn-by-turn directions from your location to our facility in Gannaur, Sonipat, Haryana.',
    icon: '🗺️',
  },
];

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-green-50 border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="section-label">
              <HelpCircle size={12} />
              FAQs &amp; Local Info
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-green-950 leading-tight mb-5 mt-3">
              Frequently Asked Questions &amp;{' '}
              <span className="gradient-text">Local Business Information</span>
            </h1>
            <p className="text-steel-600 text-lg leading-relaxed">
              Everything you need to know about storing your commodity at Yogesh Cold Storage in
              Gannaur, Sonipat, Haryana.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* FAQ Categories */}
          {faqCategories.map(({ category, icon, questions }) => (
            <div key={category} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{icon}</span>
                <h2 className="text-xl font-display font-bold text-green-950">{category}</h2>
              </div>
              <div className="space-y-4">
                {questions.map(({ q, a }) => (
                  <div key={q} className="bg-white rounded-2xl p-6 border border-green-200 hover:border-green-400 hover:shadow-green-sm transition-all">
                    <h3 className="text-green-900 font-semibold text-sm mb-2 flex items-start gap-2">
                      <HelpCircle size={15} className="text-green-600 mt-0.5 shrink-0" />
                      {q}
                    </h3>
                    <p className="text-steel-600 text-sm leading-relaxed pl-[23px]">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Local Business Info */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🏢</span>
              <h2 className="text-xl font-display font-bold text-green-950">Google Business &amp; Local Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
              {gbpTips.map(({ title, desc, icon }) => (
                <div key={title} className="bg-green-50 rounded-2xl p-5 text-center border border-green-200">
                  <div className="text-3xl mb-3">{icon}</div>
                  <h3 className="text-green-900 font-semibold text-sm mb-2">{title}</h3>
                  <p className="text-steel-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* Business Details */}
            <div className="bg-white rounded-2xl p-6 mb-8 border border-green-200">
              <h3 className="text-green-900 font-semibold mb-4 flex items-center gap-2">
                <MapPin size={16} className="text-green-600" />
                Business Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'Business Name', value: 'Yogesh Cold Storage' },
                  { label: 'Owner', value: 'Sudha Jain' },
                  { label: 'Category', value: 'Cold Storage & Warehousing' },
                  { label: 'Phone', value: '+91 82872 82830' },
                  { label: 'Address', value: 'Gannaur, Sonipat, Haryana' },
                  { label: 'State', value: 'Haryana, India' },
                  { label: 'Pincode', value: '131101' },
                  { label: 'Service Areas', value: 'Haryana, Delhi-NCR, Punjab' },
                  { label: 'Storage Capacity', value: '2,412 MT' },
                  { label: 'Temperature', value: '2°C – 4°C' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-2 border-b border-green-100 last:border-0">
                    <span className="text-steel-500">{label}</span>
                    <span className="text-green-900 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas served */}
            <div className="bg-white rounded-2xl p-6 border border-green-200">
              <h3 className="text-green-900 font-semibold mb-4 flex items-center gap-2">
                <MapPin size={16} className="text-green-600" />
                Areas Served — Distances from Yogesh Cold Storage
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {localSEOAreas.map(({ area, dist }) => (
                  <div key={area} className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
                    <div className="text-green-900 font-semibold text-sm">{area}</div>
                    <div className="text-green-600 text-xs mt-0.5">{dist}</div>
                  </div>
                ))}
              </div>
              <p className="text-steel-500 text-xs mt-4 leading-relaxed">
                Farmers and traders from across Haryana, Delhi, NCR, and nearby Punjab districts regularly
                store produce at Yogesh Cold Storage due to its strategic location on NH-44 at Gannaur.
              </p>
            </div>
          </div>

          {/* GBP Checklist */}
          <div className="bg-amber-50 rounded-2xl p-6 mb-12 border border-amber-200">
            <div className="flex items-start gap-3 mb-4">
              <Star size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-green-950 font-semibold">Google Business Profile — Owner Checklist</h3>
                <p className="text-steel-500 text-xs mt-1">
                  Complete these steps on your Google Business Profile to maximise local search visibility.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                'Add business category: "Cold Storage Facility" + "Warehouse" + "Self-Storage Facility"',
                'Add all photos from the gallery to your Google Business Profile',
                'Add services: Potato Storage, Apple Storage, Commercial Storage, Warehousing',
                'Add business attributes: Has parking, On-site security, 24/7 temperature control',
                'Add Q&A section answers matching common queries like "cold storage rates Gannaur"',
                'Post regular updates about availability and seasonal intake on GBP',
                'Respond to all reviews promptly — positive and negative',
                'Add your operating hours and holiday hours accurately',
                'Enable messaging so customers can WhatsApp through GBP',
                'Add products: list each chamber as a product with description and price range',
              ].map((tip) => (
                <div key={tip} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-green-600 mt-0.5 shrink-0" />
                  <span className="text-steel-600">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-green-50 rounded-2xl p-8 text-center border border-green-200">
            <Phone size={28} className="text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-display font-bold text-green-950 mb-2">
              Still Have Questions?
            </h3>
            <p className="text-steel-500 text-sm mb-6">
              Call or WhatsApp us directly. Our team will answer your specific questions about
              storage availability, rates, and operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+918287282830" className="btn-primary">
                <Phone size={16} />
                +91 82872 82830
              </a>
              <Link href="/contact" className="btn-secondary">
                Send Inquiry <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
