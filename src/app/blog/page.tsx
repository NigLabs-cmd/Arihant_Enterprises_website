import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import FadeIn from '@/components/FadeIn';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resources & Insights',
  description: 'Practical guides on sourcing from India — pricing, shipping, quality standards, payment security, and product spotlights for international buyers.',
};

const articles = [
  {
    title: 'Why Source Products from India? A Buyer\'s Guide',
    excerpt: 'India is the world\'s largest producer of spices, jute, and tea, and a top-5 exporter of textiles, leather, and pharmaceuticals. Here\'s why global buyers increasingly turn to Indian suppliers.',
    category: 'Buyer Guide',
    image: '/images/blog/india-guide.jpg',
  },
  {
    title: 'Understanding Indian Export Pricing: FOB, CIF & DDP Explained',
    excerpt: 'What\'s included in the price you\'re quoted? A clear breakdown of Incoterms, what each pricing model covers, and which one works best for your shipment.',
    category: 'Trade Terms',
    image: '/images/heroes/home-hero.jpg',
  },
  {
    title: 'Quality Standards of Indian Export Products',
    excerpt: 'From FSSAI certification for food products to BIS standards for industrial goods — understand the quality benchmarks Indian exporters follow and what to look for.',
    category: 'Quality',
    image: '/images/products/spices.jpg',
  },
  {
    title: 'Shipping from India: Ports, Routes, Costs & Transit Times',
    excerpt: 'A practical guide to shipping from major Indian ports (JNPT, Mundra, Chennai) to Africa, Middle East, and beyond. FCL vs LCL, freight costs, and how to avoid delays.',
    category: 'Logistics',
    image: '/images/heroes/home-cta.jpg',
  },
  {
    title: 'India\'s Spice Exports: Varieties, Grades & Global Demand',
    excerpt: 'India produces 75% of the world\'s spices. Explore the most in-demand varieties, quality grades, packaging standards, and how to place your first bulk order.',
    category: 'Product Spotlight',
    image: '/images/blog/spice-exports.jpg',
  },
  {
    title: 'Payment Security in International Trade: A Buyer\'s Perspective',
    excerpt: 'TT, Letter of Credit, D/P — which payment method offers the best protection for your money? A straightforward guide for first-time importers.',
    category: 'Trade Terms',
    image: '/images/blog/payment-security.jpg',
  },
];

const categoryColors: Record<string, string> = {
  'Buyer Guide': 'bg-sky-50 text-sky-700 border-sky-200',
  'Trade Terms': 'bg-accent-50 text-accent-700 border-accent-200',
  'Quality': 'bg-violet-50 text-violet-700 border-violet-200',
  'Logistics': 'bg-brand-50 text-brand-700 border-brand-200',
  'Product Spotlight': 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Resources & Insights"
        subtitle="Practical guides, product knowledge, and trade information to help international buyers make informed sourcing decisions."
        imageSrc="/images/heroes/blog.jpg"
        imageAlt="Market research and data analysis"
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((a, i) => (
              <FadeIn key={a.title} delay={i * 0.07}>
                <article className="bg-white rounded-2xl border border-brand-100 overflow-hidden card-hover flex flex-col h-full group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      unoptimized
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className={`self-start text-[11px] font-semibold px-3 py-1 rounded-full mb-3 border ${categoryColors[a.category] || 'bg-brand-50 text-brand-700 border-brand-200'}`}>
                      {a.category}
                    </span>
                    <h2 className="font-display text-lg font-bold text-brand-900 mb-2 leading-snug">{a.title}</h2>
                    <p className="text-sm text-brand-500 flex-1 leading-relaxed mb-4">{a.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 group-hover:text-accent-700 transition-colors mt-auto">
                      Coming Soon
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="text-center mt-20 bg-brand-900 rounded-2xl p-12 md:p-16 relative overflow-hidden">
              <div className="absolute inset-0 mesh-gradient opacity-30" />
              <div className="relative">
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">Have Questions About Sourcing from India?</h3>
                <p className="text-brand-400 mb-8 max-w-lg mx-auto text-lg">Our team can help you understand pricing, shipping, quality standards, and more. Get in touch for a free consultation.</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-brand-900 px-8 py-3.5 rounded-full text-sm font-semibold hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
