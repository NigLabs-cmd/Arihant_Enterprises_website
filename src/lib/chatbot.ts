import { products, type Product } from '@/data/products';

export interface ChatbotAnswer {
  text: string;
  products?: Product[];
}

const stopWords = new Set([
  'a', 'about', 'and', 'are', 'brand', 'by', 'do', 'does', 'find', 'for', 'from',
  'have', 'i', 'in', 'is', 'it', 'me', 'of', 'please', 'product', 'products',
  'show', 'some', 'the', 'there', 'to', 'which', 'with', 'hp', 'hpcl', 'bpcl',
  'ioc', 'servo', 'mak', 'oil', 'oils',
]);

const categories = [
  'hydraulic oil',
  'engine oil',
  'gear oil',
  'cutting oil',
  'refrigeration oil',
  'quenching oil',
  'rubber processing oil',
  'vacuum oil',
  'grease',
];

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function getBrandFilter(query: string): string | undefined {
  if (/\b(hpcl|hp)\b/.test(query)) return 'HP';
  if (/\b(bpcl|mak)\b/.test(query)) return 'BPCL';
  if (/\b(ioc|indian oil|servo)\b/.test(query)) return 'Indian Oil (IOC)';
  return undefined;
}

function getProductMatches(question: string): Product[] {
  const query = normalize(question);
  const brand = getBrandFilter(query);
  const category = categories.find((item) => query.includes(item));
  const tokens = query
    .split(' ')
    .filter((token) => token.length > 1 && !stopWords.has(token));

  return products
    .map((product) => {
      const productText = normalize(
        [product.brand, product.name, product.category, ...product.packSizes].join(' '),
      );
      const brandMatches = !brand || product.brand === brand;
      const categoryMatches = !category || product.category.toLowerCase() === category;
      const matchedTokens = tokens.filter((token) => productText.includes(token));
      const matches = brandMatches && categoryMatches &&
        (tokens.length === 0 ? Boolean(brand || category) : matchedTokens.length > 0);

      return { product, matches };
    })
    .filter((result) => result.matches)
    .map((result) => result.product);
}

export function answerChatbot(question: string): ChatbotAnswer {
  const query = normalize(question);

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(query)) {
    return {
      text: 'Hello! I can help you search our listed products, grades, brands and pack sizes, or answer questions about Arihant Enterprises. What are you looking for?',
    };
  }

  if (/\b(price|pricing|cost|rate|stock|in stock|currently available|availability)\b/.test(query) ||
      /\b\d+\s*(ltr|litre|liter|kg|kgs|ton|tons)\b/.test(query)) {
    return {
      text: 'I can show the pack sizes listed in our catalogue, but I can’t confirm prices, current stock, or whether we can supply a particular order quantity. Please contact the team to confirm.',
    };
  }

  if (/\b(contact|call|phone|whatsapp|email|reach)\b/.test(query)) {
    return {
      text: 'You can call us at +91 9820671176 or +91 9152352574, email arihantoil01@gmail.com or arihantoil02@gmail.com, or use the Contact Us page.',
    };
  }

  if (/\b(where|location|located|address|based)\b/.test(query)) {
    return {
      text: 'The website describes Arihant Enterprises as a Mumbai-based supplier. For the exact address or delivery coverage, please contact the team.',
    };
  }

  if (/\b(when|since|established|founded|history|years)\b/.test(query)) {
    return {
      text: 'Arihant Enterprises was established in 1996, according to the website.',
    };
  }

  if (/\b(hours|opening|open|closed|timing|business hours)\b/.test(query)) {
    return {
      text: 'I don’t have confirmed business hours. Please contact the team by phone or through the Contact Us page.',
    };
  }

  if (/\b(pack|packs|size|sizes|quantity)\b/.test(query)) {
    const matches = getProductMatches(question);
    if (matches.length > 0) {
      return {
        text: `These are the pack sizes listed for ${matches.length === 1 ? 'this product' : 'these products'}. Please contact the team to confirm what is available for your order.`,
        products: matches.slice(0, 6),
      };
    }

    const packSizes = Array.from(new Set(products.flatMap((product) => product.packSizes)));
    return {
      text: `The catalogue lists these pack sizes: ${packSizes.join(', ')}. They are listed options, not a guarantee of current stock or supply for a specific order.`,
    };
  }

  if (/\b(brand|brands|company|business|about|who|what do you sell|what does)\b/.test(query) &&
      !getBrandFilter(query)) {
    return {
      text: 'Arihant Enterprises is a Mumbai-based supplier of industrial oils, machine oils, lubricants and greases, established in 1996. The published catalogue currently lists products from HP, Indian Oil (IOC) and BPCL.',
    };
  }

  const matches = getProductMatches(question);
  if (matches.length > 0) {
    return {
      text: `I found ${matches.length} matching ${matches.length === 1 ? 'product' : 'products'} in the catalogue. The pack sizes shown are the ones listed; please contact the team to confirm availability for your order.`,
      products: matches.slice(0, 6),
    };
  }

  return {
    text: 'I couldn’t find that in the published catalogue or business information. Try a brand, product name, category or listed pack size, or contact the team and they can confirm.',
  };
}
