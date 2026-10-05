import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FadeIn from '@/components/FadeIn';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse industrial oils, machine oils, lubricants and greases. Contact us to enquire about brands, grades and pack sizes.',
};

const categories = ['Industrial Oils', 'Machine Oils', 'Lubricants', 'Greases'];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Products"
        subtitle="Explore industrial and machine oils, lubricants and greases. Contact us to enquire about product specifications and pack sizes."
        imageSrc="/images/heroes/products.jpg"
        imageAlt="Industrial products"
      />

      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((category, index) => (
              <FadeIn key={category} delay={index * 0.07}>
                <div className="h-full rounded-2xl border border-brand-100 bg-white p-7 shadow-sm">
                  <h2 className="font-display text-xl font-bold text-brand-900">{category}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-brand-500">
                    Contact us for product options, grades and pack sizes.
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-900 py-20">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">Looking for a specific product?</h2>
            <p className="mx-auto mb-8 mt-4 max-w-2xl text-lg text-brand-300">
              Share the product name or specification you need and contact us to enquire.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-brand-900 transition hover:-translate-y-0.5">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
