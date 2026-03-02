import type { Metadata } from 'next';
import CountryCard from '@/components/CountryCard';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Markets We Serve',
  description: 'Fast Scaling Trade ships premium Indian products to Tanzania, Kenya, Nigeria, UAE, UK, China, and more. Flexible FOB, CIF, DDP shipping and TT, LC payment terms.',
};
import FadeIn from '@/components/FadeIn';
import SectionHeader from '@/components/SectionHeader';
import { Ship, CreditCard } from 'lucide-react';

const countries = [
  { name: 'Tanzania', flag: '\u{1F1F9}\u{1F1FF}', score: 9, maxScore: 10, competition: 'LOW', population: '65M (growing 3%/yr)', port: 'Dar es Salaam', topProducts: 'Jaggery, Textiles, Leather, FMCG' },
  { name: 'Kenya', flag: '\u{1F1F0}\u{1F1EA}', score: 8, maxScore: 10, competition: 'MODERATE', population: '56M', port: 'Mombasa', topProducts: 'Textiles, Pharmaceuticals, Rice' },
  { name: 'Zambia', flag: '\u{1F1FF}\u{1F1F2}', score: 8, maxScore: 10, competition: 'LOW', population: '20M', port: 'Via Dar es Salaam', topProducts: 'Jaggery, Textiles, Shoes, FMCG' },
  { name: 'Nigeria', flag: '\u{1F1F3}\u{1F1EC}', score: 7, maxScore: 10, competition: 'MODERATE', population: '230M', port: 'Lagos', topProducts: 'Pharmaceuticals, Rice, Chemicals' },
  { name: 'UAE', flag: '\u{1F1E6}\u{1F1EA}', score: 7, maxScore: 10, competition: 'HIGH', population: '10M (high purchasing)', port: 'Jebel Ali', topProducts: 'Carpets, Handicrafts, Spices, Tea' },
  { name: 'United Kingdom', flag: '\u{1F1EC}\u{1F1E7}', score: 6, maxScore: 10, competition: 'HIGH', population: '68M', port: 'Felixstowe', topProducts: 'Carpets, Handicrafts, Textiles, Tea' },
  { name: 'China', flag: '\u{1F1E8}\u{1F1F3}', score: 6, maxScore: 10, competition: 'VARIES', population: '1.4B', port: 'Shanghai', topProducts: 'Rice, Spices, Leather, Pharmaceuticals' },
];

const whyAfrica = [
  { stat: '54', label: 'Countries in AfCFTA', desc: 'The African Continental Free Trade Agreement is creating a single connected market' },
  { stat: '3x', label: 'Middle Class Growth', desc: 'Africa\'s middle class is projected to triple by 2030, driving demand for quality imports' },
  { stat: '#1', label: 'India-Africa Trade', desc: 'India is one of Africa\'s largest trade partners with strong supply chain links' },
  { stat: '1.4B', label: 'People by 2030', desc: 'Africa\'s young, growing population is the world\'s fastest-expanding consumer market' },
];

const incoterms = [
  { term: 'FOB', desc: 'Free on Board — we deliver to Indian port, you handle freight.' },
  { term: 'CIF', desc: 'Cost, Insurance & Freight — we handle everything to your port.' },
  { term: 'EXW', desc: 'Ex Works — you handle logistics from our factory gate.' },
  { term: 'DDP', desc: 'Delivered Duty Paid — we deliver to your door, all-inclusive.' },
];

const paymentTerms = [
  { term: 'TT Advance', desc: '100% before shipment. Standard for new relationships.' },
  { term: '30/70 TT', desc: '30% advance, 70% before shipment. Common in Africa/ME.' },
  { term: 'Letter of Credit', desc: 'Bank-guaranteed payment. Highest security for both parties.' },
  { term: 'D/P', desc: 'Documents Against Payment. For established trade partners.' },
];

export default function MarketsPage() {
  return (
    <>
      <PageHero
        title="Markets We Serve"
        subtitle="We ship premium Indian products to buyers across Africa, the Middle East, Europe, and Asia. Wherever you are, we deliver."
        imageSrc="/images/heroes/markets.jpg"
        imageAlt="Global trade routes and world map"
      />

      {/* Africa Opportunity */}
      <section className="py-24 bg-brand-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Growing Markets"
            headline="India-Africa Trade"
            subheadline="Africa is one of the fastest-growing import markets in the world, and Indian products are in high demand across the continent."
            align="left"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {whyAfrica.map((w, i) => (
              <FadeIn key={w.label} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 md:p-7 border border-brand-100 card-hover">
                  <div className="font-display text-4xl md:text-5xl font-bold text-accent-600 mb-2">{w.stat}</div>
                  <div className="text-sm font-bold text-brand-900 mb-1">{w.label}</div>
                  <p className="text-xs text-brand-500 leading-relaxed">{w.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Country Cards */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Active Markets"
            headline="Countries We Trade With"
            subheadline="We have established trade relationships and shipping routes to these markets, with more being added regularly."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {countries.map((c, i) => (
              <FadeIn key={c.name} delay={i * 0.07}>
                <CountryCard {...c} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Trade Terms */}
      <section className="py-24 bg-brand-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Flexible Terms"
            headline="Trade Terms We Support"
            subheadline="We offer flexible shipping and payment terms to accommodate buyers across different markets and experience levels."
          />
          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn direction="left">
              <div>
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-8 h-8 bg-brand-900 rounded-lg flex items-center justify-center">
                    <Ship className="w-4 h-4 text-accent-400" />
                  </div>
                  <h3 className="font-display font-bold text-brand-900 text-lg">Incoterms</h3>
                </div>
                <div className="space-y-3">
                  {incoterms.map((t) => (
                    <div key={t.term} className="bg-white rounded-xl p-4 border border-brand-100 card-hover">
                      <span className="inline-block bg-brand-900 text-accent-400 text-[11px] font-bold px-3 py-1 rounded-full mr-2">{t.term}</span>
                      <span className="text-sm text-brand-600">{t.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div>
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-brand-900 text-lg">Payment Terms</h3>
                </div>
                <div className="space-y-3">
                  {paymentTerms.map((t) => (
                    <div key={t.term} className="bg-white rounded-xl p-4 border border-brand-100 card-hover">
                      <span className="inline-block bg-accent-50 text-accent-700 text-[11px] font-bold px-3 py-1 rounded-full mr-2">{t.term}</span>
                      <span className="text-sm text-brand-600">{t.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
