import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Export Products',
  description: 'Explore 11+ categories of premium Indian export products — jaggery, textiles, leather, carpets, handicrafts, spices, rice, tea, and more. Competitive pricing, quality assured.',
};
import FadeIn from '@/components/FadeIn';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const products = [
  { name: 'Jaggery', hsCode: '1701', margin: '35-45%', indiaRank: 'Top 3', description: 'Organic jaggery blocks, powder, and liquid jaggery. Made from pure sugarcane without chemicals. Popular natural sweetener in African and Middle Eastern markets.', moq: '1 MT', packaging: '25kg bags', imageSrc: '/images/products/jaggery.jpg' },
  { name: 'Textiles & Garments', hsCode: '52-63', margin: '25-40%', indiaRank: 'Top 5', description: 'Cotton fabrics, readymade garments, bed linen, towels, and industrial textiles. India is one of the world\'s largest textile producers.', moq: '500 pcs', packaging: 'Poly bags', imageSrc: '/images/products/textiles.jpg' },
  { name: 'Leather Goods', hsCode: '4101-4115', margin: '30-50%', indiaRank: 'Top 5', description: 'Finished leather, leather bags, belts, wallets, and accessories. Premium quality from Indian tanneries with eco-friendly processing.', moq: '200 pcs', packaging: 'Ind. boxes', imageSrc: '/images/products/leather.jpg' },
  { name: 'Carpets & Rugs', hsCode: '5701-5705', margin: '40-60%', indiaRank: 'Top 3', description: 'Handwoven carpets, tufted rugs, and machine-made floor coverings. India\'s carpet heritage spans centuries with exceptional craftsmanship.', moq: '50 pcs', packaging: 'Rolled', imageSrc: '/images/products/carpets.jpg' },
  { name: 'Handicrafts', hsCode: '4420, 6913', margin: '50-70%', indiaRank: 'Top 3', description: 'Artisan-crafted home decor, wooden products, brass items, pottery, and decorative pieces. Unique, handmade products with high perceived value.', moq: '100 pcs', packaging: 'Custom', imageSrc: '/images/products/handicrafts.jpg' },
  { name: 'Jute Products', hsCode: '5303-5310', margin: '20-35%', indiaRank: '#1 Global', description: 'Jute bags, sacks, twine, and eco-friendly packaging solutions. India is the world\'s #1 jute producer. Growing demand for sustainable packaging.', moq: '5000 pcs', packaging: 'Bales', imageSrc: '/images/products/jute.jpg' },
  { name: 'Shoes & Footwear', hsCode: '6401-6405', margin: '30-45%', indiaRank: 'Top 10', description: 'Leather shoes, sports footwear, sandals, and industrial safety shoes. Competitive pricing with good quality from Indian manufacturers.', moq: '300 pairs', packaging: 'Cartons', imageSrc: '/images/products/shoes.jpg' },
  { name: 'Spices', hsCode: '0904-0910', margin: '40-60%', indiaRank: '#1 Global', description: 'Turmeric, cumin, coriander, chili, black pepper, cardamom, and spice blends. India is the world\'s largest spice producer and exporter.', moq: '500 kg', packaging: '25kg bags', imageSrc: '/images/products/spices.jpg' },
  { name: 'Rice', hsCode: '1006', margin: '15-30%', indiaRank: '#1 Global', description: 'Basmati rice, non-basmati rice, parboiled rice, and broken rice. India is the world\'s largest rice exporter with diverse varieties.', moq: '20 MT', packaging: '50kg bags', imageSrc: '/images/products/rice.jpg' },
  { name: 'Tea', hsCode: '0902', margin: '25-40%', indiaRank: '#2 Global', description: 'Assam tea, Darjeeling tea, Nilgiri tea, CTC and orthodox varieties. Iconic Indian teas with global brand recognition.', moq: '1 MT', packaging: '25kg chests', imageSrc: '/images/products/tea.jpg' },
  { name: 'Pharmaceuticals', hsCode: '3003-3004', margin: '40-65%', indiaRank: 'Top 3', description: 'Generic medicines, API (Active Pharmaceutical Ingredients), and medical supplies. India is the "Pharmacy of the World."', moq: 'Varies', packaging: 'Pharma', imageSrc: '/images/products/pharma.jpg' },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Our Export Products"
        subtitle="Premium Indian products sourced from verified manufacturers. Competitive pricing, quality assured, and ready to ship worldwide."
        imageSrc="/images/heroes/products.jpg"
        imageAlt="Product warehouse"
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.05}>
                <ProductCard {...p} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-900 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Looking for a specific product?</h2>
            <p className="text-brand-400 mb-8 text-lg">We source from a network of verified Indian manufacturers. If you don&apos;t see what you need, reach out — we can likely source it.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-brand-900 font-semibold px-8 py-3.5 rounded-full hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 group">
              Request Custom Sourcing
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
