import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import InquiryForm from '@/components/InquiryForm';

export const metadata: Metadata = {
  title: 'Contact Us — Yogesh Cold Storage, Gannaur, Sonipat, Haryana',
  description:
    'Contact Yogesh Cold Storage for cold storage availability, rates, and site visits. Phone: +91 82872 82830. Located in Gannaur, Sonipat, Haryana.',
  alternates: { canonical: 'https://yogeshcoldstorage.com/contact' },
};

const contactCards = [
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+91 82872 82830'],
    action: { href: 'tel:+918287282830', label: 'Call Now' },
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    lines: ['+91 82872 82830', 'Quick responses on WhatsApp'],
    action: {
      href: 'https://wa.me/918287282830?text=Hello%2C%20I%20want%20to%20inquire%20about%20cold%20storage%20in%20Gannaur.',
      label: 'Chat on WhatsApp',
    },
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['yogeshcoldstorage@gmail.com'],
    action: { href: 'mailto:yogeshcoldstorage@gmail.com', label: 'Send Email' },
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['Gannaur, Sonipat, Haryana — 131101'],
    action: { href: 'https://maps.google.com/?q=Gannaur+Sonipat+Haryana', label: 'Get Directions' },
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-green-50 border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="section-label">Contact Us</span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-green-950 leading-tight mb-5 mt-3">
              Get in Touch —{' '}
              <span className="gradient-text">We Respond Fast</span>
            </h1>
            <p className="text-steel-600 text-lg leading-relaxed">
              Reach out to check availability, get a quote, or schedule a site visit. Our team
              at Gannaur responds within 24 hours — often much faster.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {contactCards.map(({ icon: Icon, title, lines, action, iconBg, iconColor }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-green-200 hover:border-green-400 hover:shadow-green-sm transition-all group">
                <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
                  <Icon size={18} className={iconColor} />
                </div>
                <h3 className="text-green-900 font-semibold mb-2">{title}</h3>
                {lines.map((line, i) => (
                  <p key={i} className="text-steel-500 text-sm leading-snug">{line}</p>
                ))}
                <a
                  href={action.href}
                  target={action.href.startsWith('http') ? '_blank' : undefined}
                  rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="mt-4 inline-flex items-center text-xs font-semibold text-green-700 hover:text-green-900 transition-colors"
                >
                  {action.label} →
                </a>
              </div>
            ))}
          </div>

          {/* Inquiry form + Business hours */}
          <div className="grid lg:grid-cols-3 gap-10 mb-16">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-display font-bold text-green-950 mb-6">Send Us an Inquiry</h2>
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-green-200 shadow-green-sm">
                <InquiryForm sourcePage="Contact Page" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-green-950 mb-6">Business Hours</h2>
              <div className="bg-white rounded-2xl p-6 mb-5 border border-green-200">
                <div className="flex items-center gap-3 mb-5">
                  <Clock size={18} className="text-green-600" />
                  <span className="text-green-900 font-semibold">Operating Hours</span>
                </div>
                {[
                  { days: 'Monday – Saturday', hours: '8:00 AM – 8:00 PM' },
                  { days: 'Sunday', hours: '10:00 AM – 4:00 PM' },
                  { days: 'Public Holidays', hours: 'On prior arrangement' },
                ].map(({ days, hours }) => (
                  <div key={days} className="flex justify-between items-center py-3 border-b border-green-100 last:border-0">
                    <span className="text-steel-500 text-sm">{days}</span>
                    <span className="text-green-700 text-sm font-medium">{hours}</span>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/918287282830?text=Hello%20Yogesh%20Cold%20Storage%2C%20I%20want%20to%20know%20about%20storage%20availability."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-4 rounded-xl transition-all shadow-green-sm hover:shadow-green-md"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp +91 82872 82830
              </a>

              <div className="mt-5 bg-green-50 rounded-xl p-5 border border-green-200">
                <div className="text-green-700 text-xs font-semibold uppercase tracking-wider mb-3">Quick Note</div>
                <p className="text-steel-500 text-sm leading-relaxed">
                  For urgent storage requirements, WhatsApp is the fastest way to reach us. For detailed inquiries, the form above ensures we have all the information needed to respond accurately.
                </p>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div>
            <h2 className="text-2xl font-display font-bold text-green-950 mb-6">Find Us in Gannaur</h2>
            <div className="rounded-2xl overflow-hidden border border-green-200 h-80 bg-green-50 flex items-center justify-center">
              <div className="text-center text-steel-500">
                <MapPin size={36} className="mx-auto mb-3 text-green-600" />
                <p className="font-medium text-green-900 text-sm mb-1">Yogesh Cold Storage</p>
                <p className="text-sm text-steel-500">Gannaur, Sonipat, Haryana</p>
                <a
                  href="https://maps.google.com/?q=Gannaur+Sonipat+Haryana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-green-700 text-sm underline underline-offset-2 hover:text-green-900"
                >
                  Open Gannaur on Google Maps →
                </a>
                <p className="text-steel-400 text-xs mt-4">
                  Replace this block with an embedded Google Map iframe using your Google Maps URL
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
