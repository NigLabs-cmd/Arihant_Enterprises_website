'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle, Loader2, Send } from 'lucide-react';

type Enquiry = {
  name: string;
  phone: string;
  email: string;
  product: string;
  quantity: string;
  message: string;
};

const emptyEnquiry: Enquiry = {
  name: '',
  phone: '',
  email: '',
  product: '',
  quantity: '',
  message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState<Enquiry>(emptyEnquiry);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const inputClass = 'w-full rounded-xl border border-brand-200 bg-white px-4 py-3.5 text-sm text-brand-800 outline-none transition-all placeholder:text-brand-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        setStatus('error');
        return;
      }
      setStatus('sent');
      setForm(emptyEnquiry);
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="space-y-1.5 text-sm font-medium text-brand-700">
          Name *
          <input required maxLength={100} autoComplete="name" className={inputClass} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        </label>
        <label className="space-y-1.5 text-sm font-medium text-brand-700">
          Phone / WhatsApp *
          <input required maxLength={30} type="tel" autoComplete="tel" className={inputClass} value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
        </label>
        <label className="space-y-1.5 text-sm font-medium text-brand-700">
          Email
          <input type="email" maxLength={254} autoComplete="email" className={inputClass} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        </label>
        <label className="space-y-1.5 text-sm font-medium text-brand-700">
          Product interested in
          <input maxLength={150} className={inputClass} value={form.product} onChange={(event) => setForm({ ...form, product: event.target.value })} />
        </label>
        <label className="space-y-1.5 text-sm font-medium text-brand-700 md:col-span-2">
          Quantity / pack size
          <input maxLength={100} className={inputClass} value={form.quantity} onChange={(event) => setForm({ ...form, quantity: event.target.value })} />
        </label>
      </div>
      <label className="block space-y-1.5 text-sm font-medium text-brand-700">
        Message
        <textarea rows={4} maxLength={2000} className={inputClass} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
      </label>

      {status === 'sent' ? (
        <div role="status" className="flex items-center gap-3 rounded-xl border border-accent-200 bg-accent-50 p-4 text-accent-800">
          <CheckCircle className="h-5 w-5 flex-shrink-0 text-accent-600" />
          <span className="text-sm font-medium">Your enquiry has been sent.</span>
        </div>
      ) : (
        <button type="submit" disabled={status === 'sending'} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-900 py-3.5 font-semibold text-white transition-all hover:bg-brand-800 disabled:opacity-60">
          {status === 'sending' ? <><Loader2 className="h-4 w-4 animate-spin" />Sending...</> : <><Send className="h-4 w-4" />Send Enquiry</>}
        </button>
      )}
      {status === 'error' && (
        <div role="alert" className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-600">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm font-medium">Unable to send your enquiry. Please try again later.</span>
        </div>
      )}
    </form>
  );
}
