import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Fast Scaling Trade | Premium Indian Export Partner',
    template: '%s | Fast Scaling Trade',
  },
  description: 'Fast Scaling Trade is a trusted Indian export partner specializing in jaggery, textiles, leather, carpets, handicrafts, spices, and more. Serving Africa, Middle East, UK, and Asia.',
  keywords: 'Fast Scaling Trade, Indian exporter, jaggery export, textiles export, Africa trade, Tanzania importer, export from India, international trade',
  metadataBase: new URL('https://fastscalingai.com'),
  openGraph: {
    title: 'Fast Scaling Trade | Premium Indian Export Partner',
    description: 'Connecting verified Indian manufacturers with international buyers across Africa, Middle East, UK, and Asia. 11+ product categories, competitive pricing, on-time delivery.',
    url: 'https://fastscalingai.com',
    siteName: 'Fast Scaling Trade',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Fast Scaling Trade' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fast Scaling Trade | Premium Indian Export Partner',
    description: 'Connecting verified Indian manufacturers with international buyers. 11+ product categories, competitive pricing, on-time delivery.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fast Scaling Trade',
  url: 'https://fastscalingai.com',
  logo: 'https://fastscalingai.com/logo.png',
  description: 'Premium Indian export partner connecting verified manufacturers with international buyers across Africa, Middle East, UK, and Asia.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Delhi',
    addressCountry: 'IN',
  },
  email: 'info@fastscalingai.com',
  sameAs: [
    'https://www.linkedin.com/company/fast-scaling-trade',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Google Analytics — replace GA_MEASUREMENT_ID with your actual ID */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
