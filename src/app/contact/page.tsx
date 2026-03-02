import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import PageHero from '@/components/PageHero';
import FadeIn from '@/components/FadeIn';
import { Mail, Package, MapPin, Clock, CheckCircle2, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get a customized export quotation within 24 hours. Contact Fast Scaling Trade for product sourcing, pricing, samples, and shipping from India.',
};

const contactInfo = [
  { icon: Mail, label: 'General Inquiries', value: 'info@fastscalingai.com', link: 'mailto:info@fastscalingai.com' },
  { icon: Package, label: 'Export & Sales', value: 'exports@fastscalingai.com', link: 'mailto:exports@fastscalingai.com' },
  { icon: MapPin, label: 'Office', value: 'Delhi, India', link: null },
  { icon: Clock, label: 'Response Time', value: 'Within 24 hours', link: null },
];

const benefits = [
  'Free product sourcing consultation',
  'Custom quotation within 24 hours',
  'Sample arrangement available',
  'Flexible payment terms (TT, LC)',
  'FOB / CIF / DDP pricing',
  'No minimum order for samples',
];

const certifications = [
  'IEC Registered Exporter',
  'GST Registered',
  'RCMC (Export Promotion Council)',
  'FIEO Member',
  'AD Code Registered',
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Get in Touch"
        subtitle="Get a customized quotation within 24 hours. Tell us what you need, and we will find the best sourcing solution for you."
        imageSrc="/images/heroes/contact.jpg"
        imageAlt="Modern office"
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <FadeIn>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-900 mb-8">Send Us an Inquiry</h2>
                <ContactForm />
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <FadeIn delay={0.1}>
                <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-elevated">
                  <h3 className="font-display font-bold text-brand-900 mb-5 text-lg">Contact Details</h3>
                  <div className="space-y-4">
                    {contactInfo.map((c) => (
                      <div key={c.label} className="flex gap-3">
                        <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <c.icon className="w-4 h-4 text-brand-500" />
                        </div>
                        <div>
                          <div className="text-[10px] text-brand-400 font-medium uppercase tracking-wide">{c.label}</div>
                          {c.link ? (
                            <a href={c.link} className="text-sm font-semibold text-accent-600 hover:text-accent-700 transition-colors">{c.value}</a>
                          ) : (
                            <div className="text-sm font-semibold text-brand-800">{c.value}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="bg-accent-50 rounded-2xl p-6 border border-accent-100">
                  <h3 className="font-display font-bold text-brand-900 mb-4 text-lg">Why Contact Us?</h3>
                  <ul className="space-y-2.5 text-sm text-brand-700">
                    {benefits.map((b) => (
                      <li key={b} className="flex gap-2.5 items-start">
                        <CheckCircle2 className="w-4 h-4 text-accent-600 mt-0.5 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="bg-brand-50 rounded-2xl p-6 border border-brand-100">
                  <h3 className="font-display font-bold text-brand-900 mb-4 text-lg">Certifications</h3>
                  <ul className="space-y-2 text-sm text-brand-700">
                    {certifications.map((c) => (
                      <li key={c} className="flex gap-2.5 items-start">
                        <Shield className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
