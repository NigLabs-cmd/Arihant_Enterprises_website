import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import PageHero from '@/components/PageHero';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact us with enquiries about industrial oils, machine oils, lubricants and greases.',
  openGraph: {
    title: 'Contact Arihant Enterprises',
    description: 'Contact us with enquiries about industrial oils, machine oils, lubricants and greases.',
  },
  twitter: {
    title: 'Contact Arihant Enterprises',
    description: 'Contact us with enquiries about industrial oils, machine oils, lubricants and greases.',
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Send us an enquiry about industrial oils, machine oils, lubricants or greases."
        imageSrc="/images/heroes/contact.jpg"
        imageAlt="Industrial business enquiry"
      />

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-8 font-display text-2xl font-bold text-brand-900 md:text-3xl">Send an Enquiry</h2>
            <ContactForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
