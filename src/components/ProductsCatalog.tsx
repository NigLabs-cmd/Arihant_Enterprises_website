'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, Search, Image as ImageIcon } from 'lucide-react';
import hpImage from '@/app/products/HP_image.jpg';
import makImage from '@/app/products/MAk_image.jpg';
import servoImage from '@/app/products/Servo_image.jpg';
import { products } from '@/data/products';

const brands = ['All brands', ...Array.from(new Set(products.map((product) => product.brand)))];
const brandImages: Record<string, typeof hpImage | undefined> = {
  HP: hpImage,
  'Indian Oil (IOC)': servoImage,
  BPCL: makImage,
};

export default function ProductsCatalog() {
  const [activeBrand, setActiveBrand] = useState('All brands');
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesBrand = activeBrand === 'All brands' || product.brand === activeBrand;
      const matchesSearch =
        !query ||
        [product.brand, product.name, product.category, ...product.packSizes]
          .join(' ')
          .toLowerCase()
          .includes(query);

      return matchesBrand && matchesSearch;
    });
  }, [activeBrand, search]);

  return (
    <div>
      <div className="mb-10 space-y-5">
        <label className="relative block max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400" />
          <span className="sr-only">Search products</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products, categories or pack sizes"
            className="w-full rounded-xl border border-brand-200 bg-white py-3 pl-11 pr-4 text-sm text-brand-900 outline-none transition placeholder:text-brand-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
          />
        </label>

        <div className="flex flex-wrap gap-2" aria-label="Filter by brand">
          {brands.map((brand) => {
            const isActive = activeBrand === brand;

            return (
              <button
                key={brand}
                type="button"
                onClick={() => setActiveBrand(brand)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'border-brand-900 bg-brand-900 text-white'
                    : 'border-brand-200 bg-white text-brand-600 hover:border-brand-400 hover:text-brand-900'
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mb-5 text-sm text-brand-500" aria-live="polite">
        Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
      </p>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const imageSrc = product.imageSrc || brandImages[product.brand];

            return (
              <article
                key={product.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-brand-50 via-white to-accent-50">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={`${product.brand} lubricant`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-brand-400">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-200 bg-white/80 text-accent-700 shadow-sm">
                        <ImageIcon className="h-7 w-7" aria-hidden="true" />
                      </div>
                      <span className="text-xs font-medium">Product image coming soon</span>
                    </div>
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-700 shadow-sm">
                    {product.brand}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent-700">
                    {product.category}
                  </p>
                  <h2 className="mt-2 font-display text-lg font-bold leading-snug text-brand-900">
                    {product.name}
                  </h2>

                  <div className="mt-auto pt-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-400">
                      Available pack sizes
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.packSizes.map((size) => (
                        <span
                          key={size}
                          className="rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/contact?product=${encodeURIComponent(`${product.brand} - ${product.name}`)}`}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-brand-200 bg-white py-3 text-sm font-semibold text-brand-900 transition hover:bg-brand-50"
                  >
                    Send an enquiry
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-brand-200 bg-white px-6 py-14 text-center">
          <h2 className="font-display text-lg font-bold text-brand-900">No matching products</h2>
          <p className="mt-2 text-sm text-brand-500">Try another product name, pack size or brand.</p>
        </div>
      )}
    </div>
  );
}
