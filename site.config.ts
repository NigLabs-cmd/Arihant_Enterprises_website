/**
 * SITE CONFIGURATION
 * ==================
 * Edit this file to customize the entire website for your business.
 * All business-specific content is centralized here for easy updates.
 *
 * After editing, run: npm run build && npx wrangler pages deploy out --project-name YOUR_PROJECT
 */

const siteConfig = {
  // ─── Company Info ───────────────────────────────────────
  companyName: 'Fast Scaling Trade',
  tagline: 'Premium Indian Export Partner',
  domain: 'https://fastscalingai.com',
  foundedYear: '2024',
  location: 'Delhi, India',
  description:
    'Fast Scaling Trade is a trusted Indian export partner specializing in jaggery, textiles, leather, carpets, handicrafts, spices, and more. Serving Africa, Middle East, UK, and Asia.',

  // ─── Contact ────────────────────────────────────────────
  emails: {
    general: 'info@fastscalingai.com',
    exports: 'exports@fastscalingai.com',
  },
  whatsapp: '91XXXXXXXXXX', // Replace with actual WhatsApp Business number (with country code, no +)
  web3formsKey: '369b3cb9-af19-4377-aa93-f56ffc9d43ff', // Get yours free at https://web3forms.com

  // ─── SEO & Social ───────────────────────────────────────
  seo: {
    title: 'Fast Scaling Trade | Premium Indian Export Partner',
    description:
      'Connecting verified Indian manufacturers with international buyers across Africa, Middle East, UK, and Asia. 11+ product categories, competitive pricing, on-time delivery.',
    keywords:
      'Fast Scaling Trade, Indian exporter, jaggery export, textiles export, Africa trade, Tanzania importer, export from India, international trade',
    ogImage: '/og-image.jpg',
  },

  // ─── Hero Section ───────────────────────────────────────
  hero: {
    badge: 'IEC Registered · RCMC Certified · FIEO Member',
    headline: {
      line1: "India's Premium",
      line2: 'Export Partner',
      line3: 'for Global Trade',
    },
    subheadline:
      'Connecting verified Indian manufacturers with international buyers across Africa, Middle East, UK, and Asia. Trust-first trade, competitive pricing, on-time delivery.',
    cta1: 'View Product Catalog',
    cta2: 'Request Free Quote',
  },

  // ─── Stats ──────────────────────────────────────────────
  stats: [
    { value: '11+', label: 'Product Categories' },
    { value: '7+', label: 'Countries Served' },
    { value: '24h', label: 'Quote Response' },
    { value: '2024', label: 'Established' },
  ],

  // ─── Certifications ─────────────────────────────────────
  certifications: [
    'IEC Registered Exporter',
    'GST Registered',
    'RCMC (Export Promotion Council)',
    'FIEO Member',
    'AD Code Registered',
  ],

  // ─── Trust Signals (homepage) ───────────────────────────
  trustSignals: [
    'IEC Registered Exporter',
    'RCMC Certified',
    'FIEO Member',
    'Quality Tested Products',
    'Secure Payment Terms',
    'On-Time Delivery Record',
  ],

  // ─── Products ───────────────────────────────────────────
  products: [
    {
      name: 'Jaggery',
      hsCode: '1701',
      margin: '35-45%',
      indiaRank: 'Top 3',
      description:
        'Organic jaggery blocks, powder, and liquid jaggery. Made from pure sugarcane without chemicals. Popular natural sweetener in African and Middle Eastern markets.',
      moq: '1 MT',
      packaging: '25kg bags',
      image: '/images/products/jaggery.jpg',
      shortDesc: 'Organic blocks & powder',
    },
    {
      name: 'Textiles & Garments',
      hsCode: '52-63',
      margin: '25-40%',
      indiaRank: 'Top 5',
      description:
        "Cotton fabrics, readymade garments, bed linen, towels, and industrial textiles. India is one of the world's largest textile producers.",
      moq: '500 pcs',
      packaging: 'Poly bags',
      image: '/images/products/textiles.jpg',
      shortDesc: 'Cotton fabrics & garments',
    },
    {
      name: 'Leather Goods',
      hsCode: '4101-4115',
      margin: '30-50%',
      indiaRank: 'Top 5',
      description:
        'Finished leather, leather bags, belts, wallets, and accessories. Premium quality from Indian tanneries with eco-friendly processing.',
      moq: '200 pcs',
      packaging: 'Ind. boxes',
      image: '/images/products/leather.jpg',
      shortDesc: 'Premium leather goods',
    },
    {
      name: 'Carpets & Rugs',
      hsCode: '5701-5705',
      margin: '40-60%',
      indiaRank: 'Top 3',
      description:
        "Handwoven carpets, tufted rugs, and machine-made floor coverings. India's carpet heritage spans centuries with exceptional craftsmanship.",
      moq: '50 pcs',
      packaging: 'Rolled',
      image: '/images/products/carpets.jpg',
      shortDesc: 'Handwoven carpets & rugs',
    },
    {
      name: 'Handicrafts',
      hsCode: '4420, 6913',
      margin: '50-70%',
      indiaRank: 'Top 3',
      description:
        'Artisan-crafted home decor, wooden products, brass items, pottery, and decorative pieces. Unique, handmade products with high perceived value.',
      moq: '100 pcs',
      packaging: 'Custom',
      image: '/images/products/handicrafts.jpg',
      shortDesc: 'Artisan crafted products',
    },
    {
      name: 'Jute Products',
      hsCode: '5303-5310',
      margin: '20-35%',
      indiaRank: '#1 Global',
      description:
        "Jute bags, sacks, twine, and eco-friendly packaging solutions. India is the world's #1 jute producer. Growing demand for sustainable packaging.",
      moq: '5000 pcs',
      packaging: 'Bales',
      image: '/images/products/jute.jpg',
      shortDesc: 'Eco-friendly jute bags & sacks',
    },
    {
      name: 'Shoes & Footwear',
      hsCode: '6401-6405',
      margin: '30-45%',
      indiaRank: 'Top 10',
      description:
        'Leather shoes, sports footwear, sandals, and industrial safety shoes. Competitive pricing with good quality from Indian manufacturers.',
      moq: '300 pairs',
      packaging: 'Cartons',
      image: '/images/products/shoes.jpg',
      shortDesc: 'Leather & sports footwear',
    },
    {
      name: 'Spices',
      hsCode: '0904-0910',
      margin: '40-60%',
      indiaRank: '#1 Global',
      description:
        "Turmeric, cumin, coriander, chili, black pepper, cardamom, and spice blends. India is the world's largest spice producer and exporter.",
      moq: '500 kg',
      packaging: '25kg bags',
      image: '/images/products/spices.jpg',
      shortDesc: 'Premium Indian spices',
    },
    {
      name: 'Rice',
      hsCode: '1006',
      margin: '15-30%',
      indiaRank: '#1 Global',
      description:
        "Basmati rice, non-basmati rice, parboiled rice, and broken rice. India is the world's largest rice exporter with diverse varieties.",
      moq: '20 MT',
      packaging: '50kg bags',
      image: '/images/products/rice.jpg',
      shortDesc: 'Basmati & non-basmati rice',
    },
    {
      name: 'Tea',
      hsCode: '0902',
      margin: '25-40%',
      indiaRank: '#2 Global',
      description:
        'Assam tea, Darjeeling tea, Nilgiri tea, CTC and orthodox varieties. Iconic Indian teas with global brand recognition.',
      moq: '1 MT',
      packaging: '25kg chests',
      image: '/images/products/tea.jpg',
      shortDesc: 'Assam, Darjeeling & Nilgiri',
    },
    {
      name: 'Pharmaceuticals',
      hsCode: '3003-3004',
      margin: '40-65%',
      indiaRank: 'Top 3',
      description:
        'Generic medicines, API (Active Pharmaceutical Ingredients), and medical supplies. India is the "Pharmacy of the World."',
      moq: 'Varies',
      packaging: 'Pharma',
      image: '/images/products/pharma.jpg',
      shortDesc: 'Generic medicines & API',
    },
  ],

  // ─── Markets ────────────────────────────────────────────
  markets: [
    { name: 'Tanzania', flag: '🇹🇿', score: 9, maxScore: 10, competition: 'LOW', population: '65M (growing 3%/yr)', port: 'Dar es Salaam', topProducts: 'Jaggery, Textiles, Leather, FMCG' },
    { name: 'Kenya', flag: '🇰🇪', score: 8, maxScore: 10, competition: 'MODERATE', population: '56M', port: 'Mombasa', topProducts: 'Textiles, Pharmaceuticals, Rice' },
    { name: 'Zambia', flag: '🇿🇲', score: 8, maxScore: 10, competition: 'LOW', population: '20M', port: 'Via Dar es Salaam', topProducts: 'Jaggery, Textiles, Shoes, FMCG' },
    { name: 'Nigeria', flag: '🇳🇬', score: 7, maxScore: 10, competition: 'MODERATE', population: '230M', port: 'Lagos', topProducts: 'Pharmaceuticals, Rice, Chemicals' },
    { name: 'UAE', flag: '🇦🇪', score: 7, maxScore: 10, competition: 'HIGH', population: '10M (high purchasing)', port: 'Jebel Ali', topProducts: 'Carpets, Handicrafts, Spices, Tea' },
    { name: 'United Kingdom', flag: '🇬🇧', score: 6, maxScore: 10, competition: 'HIGH', population: '68M', port: 'Felixstowe', topProducts: 'Carpets, Handicrafts, Textiles, Tea' },
    { name: 'China', flag: '🇨🇳', score: 6, maxScore: 10, competition: 'VARIES', population: '1.4B', port: 'Shanghai', topProducts: 'Rice, Spices, Leather, Pharmaceuticals' },
  ],

  // ─── About Page ─────────────────────────────────────────
  about: {
    story: [
      'Fast Scaling Trade is an export trading company based in Delhi, India. We help international buyers source high-quality Indian products — from food and spices to textiles, leather goods, and handicrafts.',
      "India is the world's largest producer of spices, jute, and tea, and a leading manufacturer of textiles, leather, pharmaceuticals, and handicrafts. We give you direct access to this manufacturing base with guaranteed quality and competitive pricing.",
      'Our team has hands-on trade experience across 11+ product categories and has shipped to buyers in Tanzania, Zambia, Kenya, DRC, Nigeria, UAE, UK, China, and Australia.',
      "Whether you need a single sample or a full container load, we handle sourcing, quality inspection, documentation, and shipping — so you receive exactly what you ordered, on time.",
    ],
    milestones: [
      { year: '2024', event: 'Fast Scaling Trade founded in Delhi, India' },
      { year: '2024', event: 'First export shipment to Tanzania' },
      { year: '2024', event: 'Registered with Export Promotion Councils (RCMC)' },
      { year: '2025', event: 'Expanded to Kenya, Zambia, and UAE markets' },
      { year: '2025', event: 'Active trade network across 7+ countries' },
    ],
  },

  // ─── Blog / Resources ──────────────────────────────────
  articles: [
    { title: "Why Source Products from India? A Buyer's Guide", category: 'Buyer Guide', image: '/images/blog/india-guide.jpg', excerpt: "India is the world's largest producer of spices, jute, and tea, and a top-5 exporter of textiles, leather, and pharmaceuticals. Here's why global buyers increasingly turn to Indian suppliers." },
    { title: 'Understanding Indian Export Pricing: FOB, CIF & DDP Explained', category: 'Trade Terms', image: '/images/heroes/home-hero.jpg', excerpt: "What's included in the price you're quoted? A clear breakdown of Incoterms, what each pricing model covers, and which one works best for your shipment." },
    { title: 'Quality Standards of Indian Export Products', category: 'Quality', image: '/images/products/spices.jpg', excerpt: 'From FSSAI certification for food products to BIS standards for industrial goods — understand the quality benchmarks Indian exporters follow and what to look for.' },
    { title: 'Shipping from India: Ports, Routes, Costs & Transit Times', category: 'Logistics', image: '/images/heroes/home-cta.jpg', excerpt: 'A practical guide to shipping from major Indian ports (JNPT, Mundra, Chennai) to Africa, Middle East, and beyond. FCL vs LCL, freight costs, and how to avoid delays.' },
    { title: "India's Spice Exports: Varieties, Grades & Global Demand", category: 'Product Spotlight', image: '/images/blog/spice-exports.jpg', excerpt: "India produces 75% of the world's spices. Explore the most in-demand varieties, quality grades, packaging standards, and how to place your first bulk order." },
    { title: "Payment Security in International Trade: A Buyer's Perspective", category: 'Trade Terms', image: '/images/blog/payment-security.jpg', excerpt: "TT, Letter of Credit, D/P — which payment method offers the best protection for your money? A straightforward guide for first-time importers." },
  ],

  // ─── Footer Quick Links ─────────────────────────────────
  footerProducts: [
    'Jaggery & Sugar',
    'Textiles & Garments',
    'Leather Goods',
    'Carpets & Rugs',
    'Handicrafts',
    'Spices & Tea',
  ],
  footerMarkets: ['Tanzania', 'Kenya', 'Nigeria', 'UAE', 'United Kingdom', 'China'],

  // ─── Contact Form Dropdown Options ──────────────────────
  contactCountries: [
    'Tanzania', 'Kenya', 'Nigeria', 'South Africa', 'Ghana', 'Ethiopia', 'Uganda',
    'DRC (Congo)', 'Mozambique', 'Rwanda', 'Senegal', 'Cameroon', 'Ivory Coast',
    'Angola', 'Zimbabwe', 'Botswana',
    'UAE', 'Saudi Arabia', 'Oman', 'Qatar', 'Kuwait', 'Bahrain', 'Iraq', 'Jordan',
    'China', 'Japan', 'South Korea', 'Singapore', 'Malaysia', 'Thailand',
    'Vietnam', 'Indonesia', 'Philippines', 'Bangladesh', 'Sri Lanka', 'Myanmar', 'Nepal',
    'United Kingdom', 'Germany', 'France', 'Netherlands', 'Italy', 'Spain',
    'Belgium', 'Poland', 'Sweden', 'Switzerland',
    'United States', 'Canada', 'Brazil', 'Mexico', 'Colombia', 'Chile',
    'Australia', 'New Zealand',
    'Other',
  ],
  contactProducts: [
    'Jaggery & Sugar Products', 'Textiles & Garments', 'Leather Goods',
    'Carpets & Rugs', 'Handicrafts & Home Decor', 'Spices', 'Rice',
    'Shoes & Footwear', 'Jute Products', 'Tea', 'Pharmaceuticals', 'Other',
  ],
};

export default siteConfig;
