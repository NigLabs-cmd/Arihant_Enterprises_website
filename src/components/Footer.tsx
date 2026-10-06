import Link from 'next/link';
import { ArrowRight, Mail, Phone } from 'lucide-react';

const productAreas = ['Industrial Oils', 'Machine Oils', 'Lubricants', 'Greases'];

export default function Footer() {
  return (
    <footer>
      <section className="relative overflow-hidden bg-brand-900">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
            Have a product enquiry?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-brand-300">
            Contact us with the product name or specification you are looking for.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-brand-900 transition-all duration-300 hover:-translate-y-0.5"
          >
            Contact Us
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <div className="bg-brand-950 text-brand-400">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="mb-4 font-display text-lg font-bold text-white">Arihant Enterprises</div>
            <p className="max-w-sm text-sm leading-relaxed">
              Mumbai-based suppliers of industrial oils, lubricants, and greases since 1996.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">Product Areas</h3>
            <ul className="space-y-2 text-sm">
              {productAreas.map((area) => (
                <li key={area}>
                  <Link href="/products" className="transition-colors hover:text-white">{area}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="transition-colors hover:text-white">Home</Link></li>
              <li><Link href="/about" className="transition-colors hover:text-white">About</Link></li>
              <li><Link href="/products" className="transition-colors hover:text-white">Products</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+919820671176" className="flex items-center gap-2 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  +91 9820671176
                </a>
              </li>
              <li>
                <a href="tel:+919152352574" className="flex items-center gap-2 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  +91 9152352574
                </a>
              </li>
              <li>
                <a href="mailto:arihantoil01@gmail.com" className="flex items-center gap-2 break-all transition-colors hover:text-white">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  arihantoil01@gmail.com
                </a>
              </li>
              <li>
                <a href="mailto:arihantoil02@gmail.com" className="flex items-center gap-2 break-all transition-colors hover:text-white">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  arihantoil02@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 py-6 text-center text-xs text-brand-500">
          &copy; {new Date().getFullYear()} Arihant Enterprises. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
