'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const isTransparent = isHome && !scrolled && !open;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/80 backdrop-blur-2xl shadow-[0_1px_0_rgba(0,0,0,0.04)] border-b border-brand-200/50'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
        <Link href="/" className="flex-shrink-0">
          <span className={`font-display text-sm font-bold tracking-wide sm:text-base ${isTransparent ? 'text-white' : 'text-brand-900'}`}>
            Industrial Oils &amp; Lubricants
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-4 py-2 text-[13px] font-medium rounded-lg transition-all duration-300 ${
                  isTransparent
                    ? isActive
                      ? 'text-white bg-white/15'
                      : 'text-white/75 hover:text-white hover:bg-white/10'
                    : isActive
                      ? 'text-accent-700 bg-accent-50'
                      : 'text-brand-600 hover:text-brand-900 hover:bg-brand-50'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className={`ml-4 flex items-center gap-2 text-[13px] font-semibold px-5 py-2.5 rounded-full transition-all duration-300 ${
              isTransparent
                ? 'bg-white/15 backdrop-blur-sm text-white border border-white/25 hover:bg-white/25'
                : 'bg-brand-900 text-white hover:bg-brand-800 shadow-sm'
            }`}
          >
            Get Quote
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2.5 rounded-xl transition-colors ${
            isTransparent ? 'text-white hover:bg-white/10' : 'text-brand-700 hover:bg-brand-50'
          }`}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden overflow-hidden bg-white/95 backdrop-blur-2xl border-t border-brand-100 animate-slideDown">
          <div className="px-5 py-4 space-y-1">
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block py-2.5 px-4 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-accent-700 bg-accent-50'
                      : 'text-brand-700 hover:text-brand-900 hover:bg-brand-50'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 mt-3 bg-brand-900 text-white text-sm font-semibold px-5 py-3 rounded-full"
            >
              Get Quote
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
