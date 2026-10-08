import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import FadeIn from '@/components/FadeIn';
import SectionHeader from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our industrial oils, machine oils, lubricants and grease trading business.',
};

const productAreas = ['Industrial Oils', 'Machine Oils', 'Lubricants', 'Greases'];
const brands = ['MAK', 'HP', 'Castrol', 'Servo'];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        subtitle="Established in 1996, we are trusted suppliers and stockists of leading brands such as HPCL, Servo (IOC), MAK (BPCL), Castrol, Mobil, Total, Gulf, and more. With over 30 years of expertise in the trading industry, we pride ourselves on delivering reliable, round‑the‑clock and door-step service ensuring your business operations run seamlessly without interruption."
        imageSrc="/images/heroes/about.jpg"
        imageAlt="Industrial lubrication products"
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">Our Business</span>
            <h2 className="mb-5 mt-3 font-display text-3xl font-bold text-brand-900 md:text-4xl">
              Lubrication products for industrial and machine use
            </h2>
            <p className="leading-relaxed text-brand-600">
              Our business focuses on trading and supplying industrial oils, machine oils, lubricants and greases. We deal in products from brands including MAK, HP, Servo , Castrol and Shell.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-7 md:p-9">
              <h3 className="mb-5 font-display text-xl font-bold text-brand-900">Product areas</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {productAreas.map((area) => (
                  <li key={area} className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-brand-700">{area}</li>
                ))}
              </ul>
              <h3 className="mb-4 mt-8 font-display text-xl font-bold text-brand-900">Brands we deal in</h3>
              <p className="text-sm leading-relaxed text-brand-600">{brands.join(' · ')} · Other brands</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-brand-50/60 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Product Enquiries"
            headline="Tell us what you need"
            subheadline="Contact us with a product name, grade or pack size to enquire about the catalogue."
          />
        </div>
      </section>
    </>
  );
}
