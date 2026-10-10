import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center justify-center px-4 py-24 sm:px-6">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">404 · Page not found</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-brand-900 sm:text-5xl">
          We couldn’t find that page
        </h1>
        <p className="mt-5 leading-relaxed text-brand-600">
          The page may have moved or the address may be incorrect. Browse our products or return to the home page.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-brand-900 px-6 py-3 font-semibold text-white transition hover:bg-brand-800"
          >
            Go to Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-6 py-3 font-semibold text-brand-900 transition hover:bg-brand-50"
          >
            Browse Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
