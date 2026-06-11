import Link from 'next/link';
import { Phone, Mail, MapPin, Leaf, ArrowRight } from 'lucide-react';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/facility', label: 'Facility' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact Us' },
];

const services = [
  'Potato Cold Storage',
  'Apple Cold Storage',
  'Agricultural Produce Storage',
  'Seasonal Inventory Storage',
  'Commercial Storage',
  'Bulk Commodity Storage',
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green-950 text-green-100">
      {/* CTA Band */}
      <div className="bg-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-display font-bold text-white">
                🌾 Ready to Store Your Commodity?
              </h3>
              <p className="text-green-200 mt-1">
                Check availability for 2,412 MT of temperature-controlled storage.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/918287282830?text=I%20want%20to%20inquire%20about%20cold%20storage%20availability."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white text-green-700 font-bold px-6 py-3 rounded-xl transition-all hover:bg-green-50 whitespace-nowrap shadow"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-green-600">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Now
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-green-900 font-bold px-6 py-3 rounded-xl transition-all whitespace-nowrap shadow"
              >
                Send Inquiry <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center">
                <Leaf size={18} className="text-white" />
              </div>
              <div>
                <div className="text-white font-display font-bold text-sm">Yogesh Cold Storage</div>
                <div className="text-green-400 text-[10px] tracking-wider uppercase">Gannaur, Haryana</div>
              </div>
            </Link>
            <p className="text-green-300 text-sm leading-relaxed mb-5">
              Professional cold storage and warehousing in Gannaur, Sonipat. Trusted by farmers, traders, and businesses across Haryana.
            </p>
            <div className="space-y-3 text-sm">
              <a href="tel:+918287282830" className="flex items-start gap-3 text-green-300 hover:text-white transition-colors">
                <Phone size={14} className="mt-0.5 shrink-0 text-green-500" />
                <span>+91 82872 82830</span>
              </a>
              <a href="mailto:yogeshcoldstorage@gmail.com" className="flex items-start gap-3 text-green-300 hover:text-white transition-colors">
                <Mail size={14} className="mt-0.5 shrink-0 text-green-500" />
                <span>yogeshcoldstorage@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-green-300">
                <MapPin size={14} className="mt-0.5 shrink-0 text-green-500" />
                <span>Gannaur, Sonipat, Haryana — 131101</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm tracking-wide uppercase">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-green-300 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 text-green-400 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm tracking-wide uppercase">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s} className="flex items-center gap-2 text-green-300 text-sm">
                  <span className="w-1 h-1 rounded-full bg-green-500 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Snapshot */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm tracking-wide uppercase">Facility Snapshot</h4>
            <div className="space-y-1">
              {[
                ['Total Capacity', '2,412 MT'],
                ['Storage Bags', '48,240 Bags'],
                ['Daily Loading', '96 MT/day'],
                ['Temperature', '2°C – 4°C'],
                ['Humidity', '90% – 95%'],
                ['Chambers', '3 Chambers'],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between py-2 border-b border-green-900">
                  <span className="text-green-400 text-xs">{l}</span>
                  <span className="text-green-200 text-xs font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-green-500 text-xs">
            © {year} Yogesh Cold Storage. All rights reserved. Managed by Sudha Jain.
          </p>
          <div className="flex items-center gap-4 text-xs text-green-600">
            <Link href="/contact" className="hover:text-green-400 transition-colors">Privacy</Link>
            <span>·</span>
            <Link href="/faq" className="hover:text-green-400 transition-colors">FAQ</Link>
            <span>·</span>
            <Link href="/sitemap.xml" className="hover:text-green-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
