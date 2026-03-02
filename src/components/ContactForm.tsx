'use client';
import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, Mail } from 'lucide-react';

const WEB3FORMS_KEY = '369b3cb9-af19-4377-aa93-f56ffc9d43ff';

const countries = [
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
];

const products = [
  'Jaggery & Sugar Products', 'Textiles & Garments', 'Leather Goods',
  'Carpets & Rugs', 'Handicrafts & Home Decor', 'Spices', 'Rice',
  'Shoes & Footwear', 'Jute Products', 'Tea', 'Pharmaceuticals', 'Other',
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', country: '', product: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[Fast Scaling Trade] Export Inquiry: ${form.product || 'General'} from ${form.name}`,
          from_name: 'Fast Scaling Trade Website',
          name: form.name, email: form.email,
          company: form.company || 'Not provided',
          country: form.country || 'Not selected',
          product_interest: form.product || 'Not specified',
          message: form.message || 'No message provided',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        setForm({ name: '', email: '', company: '', country: '', product: '', message: '' });
      } else { setStatus('error'); }
    } catch { setStatus('error'); }
  };

  const inputClass = 'w-full px-4 py-3.5 rounded-xl border border-brand-200 bg-white focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 outline-none transition-all duration-200 text-sm text-brand-800 placeholder:text-brand-400';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input required placeholder="Full Name *" className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input required type="email" placeholder="Email Address *" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Company Name" className={inputClass} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        <select className={inputClass} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}>
          <option value="">Select Country</option>
          {countries.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <select className={inputClass} value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })}>
        <option value="">Product of Interest</option>
        {products.map((p) => <option key={p} value={p}>{p}</option>)}
      </select>
      <textarea rows={4} placeholder="Tell us about your requirements — products, quantities, destination, and preferred terms..." className={inputClass} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />

      {status === 'sent' ? (
        <div className="flex items-center gap-3 bg-accent-50 text-accent-800 p-4 rounded-xl border border-accent-200">
          <CheckCircle className="w-5 h-5 flex-shrink-0 text-accent-600" />
          <div>
            <span className="text-sm font-medium block">Inquiry sent successfully!</span>
            <span className="text-xs text-accent-600">We will review your inquiry and reply within 24 hours.</span>
          </div>
        </div>
      ) : (
        <button type="submit" disabled={status === 'sending'} className="w-full flex items-center justify-center gap-2 bg-brand-900 text-white font-semibold py-3.5 rounded-xl hover:bg-brand-800 hover:shadow-elevated transition-all duration-300 disabled:opacity-60">
          {status === 'sending' ? (<><Loader2 className="w-4 h-4 animate-spin" />Sending...</>) : (<><Send className="w-4 h-4" />Send Inquiry</>)}
        </button>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-3 bg-rose-50 text-rose-600 p-4 rounded-xl border border-rose-200">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">Failed to send. Please email us directly at exports@fastscalingai.com</span>
        </div>
      )}
      <div className="flex items-center gap-2 text-xs text-brand-400 pt-1">
        <Mail className="w-3.5 h-3.5" />
        <span>Or email us directly at <a href="mailto:exports@fastscalingai.com" className="text-accent-600 hover:underline">exports@fastscalingai.com</a></span>
      </div>
    </form>
  );
}
