import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Fast Scaling Trade — a Delhi-based export company connecting international buyers with verified Indian manufacturers across 11+ product categories.',
};
import FadeIn from '@/components/FadeIn';
import SectionHeader from '@/components/SectionHeader';
import { Handshake, ShieldCheck, Globe, Truck } from 'lucide-react';

const milestones = [
  { year: '2024', event: 'Fast Scaling Trade founded in Delhi, India' },
  { year: '2024', event: 'First export shipment to Tanzania' },
  { year: '2024', event: 'Registered with Export Promotion Councils (RCMC)' },
  { year: '2025', event: 'Expanded to Kenya, Zambia, and UAE markets' },
  { year: '2025', event: 'Active trade network across 7+ countries' },
];

const values = [
  { title: 'Trusted Partnerships', desc: 'We build long-term relationships with our buyers. Every interaction is based on transparency, honest pricing, and reliable delivery.', icon: Handshake, color: 'bg-accent-50 text-accent-600' },
  { title: 'Quality Assured', desc: 'Every product undergoes pre-shipment inspection. We work only with verified Indian manufacturers who meet international quality standards.', icon: ShieldCheck, color: 'bg-emerald-50 text-emerald-600' },
  { title: 'Global Reach', desc: 'We serve buyers across Africa, the Middle East, the UK, and Asia. Wherever you are, we deliver Indian products to your port.', icon: Globe, color: 'bg-sky-50 text-sky-600' },
  { title: 'End-to-End Service', desc: 'From product sourcing and quality checks to documentation and shipping — we handle the entire export process so you don\'t have to.', icon: Truck, color: 'bg-violet-50 text-violet-600' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Fast Scaling Trade"
        subtitle="Your reliable sourcing partner for premium Indian products. We connect international buyers with verified Indian manufacturers."
        imageSrc="/images/heroes/about.jpg"
        imageAlt="International business partnership"
      />

      {/* Story */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div>
                <span className="text-accent-600 text-xs font-semibold uppercase tracking-[0.2em]">Who We Are</span>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-900 mt-3 mb-6">Your Bridge to Indian Manufacturing</h2>
                <div className="space-y-4 text-brand-600 leading-relaxed">
                  <p>Fast Scaling Trade is an export trading company based in Delhi, India. We help international buyers source high-quality Indian products — from food and spices to textiles, leather goods, and handicrafts.</p>
                  <p>India is the world&apos;s largest producer of spices, jute, and tea, and a leading manufacturer of textiles, leather, pharmaceuticals, and handicrafts. We give you direct access to this manufacturing base with guaranteed quality and competitive pricing.</p>
                  <p>Our team has hands-on trade experience across <strong className="text-brand-900">11+ product categories</strong> and has shipped to buyers in Tanzania, Zambia, Kenya, DRC, Nigeria, UAE, UK, China, and Australia.</p>
                  <p>Whether you need a single sample or a full container load, we handle sourcing, quality inspection, documentation, and shipping — so you receive exactly what you ordered, on time.</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div className="relative rounded-2xl overflow-hidden h-[440px]">
                <Image
                  src="/images/heroes/about-story.jpg"
                  alt="Indian products and manufacturing"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <dl className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-brand-400 text-[10px] uppercase tracking-wide">Headquarters</dt>
                      <dd className="font-semibold text-white mt-0.5">Delhi, India</dd>
                    </div>
                    <div>
                      <dt className="text-brand-400 text-[10px] uppercase tracking-wide">Founded</dt>
                      <dd className="font-semibold text-white mt-0.5">2024</dd>
                    </div>
                    <div>
                      <dt className="text-brand-400 text-[10px] uppercase tracking-wide">Markets Served</dt>
                      <dd className="font-semibold text-white mt-0.5">7+ Countries</dd>
                    </div>
                    <div>
                      <dt className="text-brand-400 text-[10px] uppercase tracking-wide">Product Range</dt>
                      <dd className="font-semibold text-white mt-0.5">11+ Categories</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-brand-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What You Get"
            headline="Why Buyers Work With Us"
            subheadline="We make sourcing from India simple, reliable, and risk-free."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-7 border border-brand-100 card-hover h-full">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${v.color}`}>
                    <v.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-brand-900 mb-2 text-lg">{v.title}</h3>
                  <p className="text-sm text-brand-500 leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Milestones"
            headline="Our Journey So Far"
          />
          <div className="relative">
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-brand-200" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex gap-6 items-start relative">
                    <div className="w-11 h-11 bg-brand-900 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-4 border-white shadow-sm">
                      <span className="text-accent-400 text-xs font-bold">{m.year.slice(-2)}</span>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-brand-100 flex-1 card-hover">
                      <span className="text-[10px] font-semibold text-accent-600 uppercase tracking-wide">{m.year}</span>
                      <p className="text-brand-800 mt-1 font-medium">{m.event}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
