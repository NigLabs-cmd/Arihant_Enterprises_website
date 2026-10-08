import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import SectionHeader from '@/components/SectionHeader';
import { ArrowRight, MessageCircle } from 'lucide-react';
import makLogo from '@/app/products/Servo_image.jpg';
import hpLogo from '@/app/products/HP_image.jpg';
import servoLogo from '@/app/products/MAk_image.jpg';
import castrolLogo from '@/app/about/Castrol_image.png';

export const metadata: Metadata = {
  title: 'Arihant Enterprises',
  description: 'Explore industrial and machine oils, lubricants and greases from brands including MAK, HP, Servo and Castrol.',
};

const brands = [
  { name: 'MAK', logo: makLogo },
  { name: 'HP', logo: hpLogo },
  { name: 'Servo', logo: servoLogo },
  { name: 'Castrol', logo: castrolLogo },
];
const categories = ['Industrial Oils', 'Machine Oils', 'Lubricants', 'Greases'];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-950 pt-36 pb-28 md:pt-48 md:pb-36">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-accent-300 text-xs font-semibold uppercase tracking-[0.2em] mb-5"> Lubrication products</p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white leading-tight max-w-4xl mx-auto text-center">
              Industrial Oils,  Machine Oils, Lubricants and Greases
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-brand-300 leading-relaxed">
              Browse products from brands we deal in, or contact us with your product requirements.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-brand-900 transition hover:-translate-y-0.5">
                View Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10">
                Contact Us <MessageCircle className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Brands We Deal In"
            headline="Branded lubrication products"
            subheadline="We deal in products from MAK, HP, Servo, Castrol and other brands."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="flex min-h-36 flex-col items-center justify-center rounded-2xl border border-brand-100 bg-white px-4 py-4 shadow-sm"
              >
                <h3 className="mb-3 text-center text-base font-bold text-brand-800 sm:text-lg">
                  {brand.name}
                </h3>
                <div className="relative h-16 w-full sm:h-20">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    sizes="(max-width: 640px) 40vw, 25vw"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-50/60 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Product Categories"
            headline="Find the products you need"
            subheadline="Contact us to enquire about product details, grades and available pack sizes."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link key={category} href="/products" className="rounded-2xl border border-brand-100 bg-white p-6 font-display text-lg font-bold text-brand-900 transition hover:-translate-y-1 hover:shadow-elevated">
                {category}
              </Link>
            ))}
          </div>
          <FadeIn className="mt-10 text-center">
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-900 hover:text-accent-700">
              Browse product catalogue <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
