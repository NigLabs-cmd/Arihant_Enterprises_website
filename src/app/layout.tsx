import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Chatbot from '@/components/Chatbot';

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
  icons: {
    icon: '/images/arihant-logo.png',
  },
  title: {
    default: 'Arihant Enterprises',
    template: '%s | Arihant Enterprises',
  },
  description: 'Industrial and machine oils, lubricants and greases from brands including MAK, HP, Shell and IndianOil.',
  keywords: 'industrial oils, machine oils, lubricants, grease, hydraulic oil, gear oil',
  openGraph: {
    title: 'Arihant Enterprises',
    description: 'Browse industrial and machine oils, lubricants and greases.',
    type: 'website',
    siteName: 'Arihant Enterprises',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arihant Enterprises',
    description: 'Browse industrial and machine oils, lubricants and greases.',
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Chatbot />
      </body>
    </html>
  );
}
