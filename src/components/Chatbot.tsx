'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Bot,
  MessageCircle,
  Send,
  X,
} from 'lucide-react';
import { answerChatbot } from '@/lib/chatbot';
import { getWhatsAppUrl } from '@/lib/whatsapp';

type ChatMessage = {
  id: number;
  role: 'assistant' | 'visitor';
  text: string;
  products?: ReturnType<typeof answerChatbot>['products'];
};

const starterPrompts = ['Find hydraulic oil', 'Show BPCL products', 'What pack sizes are listed?'];
const firstVisitKey = 'arihant-aribot-seen';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: 'assistant',
      text: 'Welcome to Arihant Enterprises. I am your automated digital assistant. I can instantly answer questions about our products, compliance documents, and general services. How can I assist you today?',
    },
  ]);
  const conversationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.localStorage.getItem(firstVisitKey) === 'true') return;

    window.localStorage.setItem(firstVisitKey, 'true');
    setOpen(true);
  }, []);

  useEffect(() => {
    const conversation = conversationRef.current;
    if (conversation) conversation.scrollTop = conversation.scrollHeight;
  }, [messages, open]);

  const ask = (question: string) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    const answer = answerChatbot(trimmedQuestion);
    setMessages((current) => [
      ...current,
      { id: Date.now(), role: 'visitor', text: trimmedQuestion },
      {
        id: Date.now() + 1,
        role: 'assistant',
        text: answer.text,
        products: answer.products,
      },
    ]);
    setInput('');
  };

  const whatsappUrl = getWhatsAppUrl(
    'Hello, I have a question about your products. Please get in touch.',
  );

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
      {open && (
        <section
          aria-label="Product and business assistant"
          className="mb-3 flex h-[min(72dvh,36rem)] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-2xl"
        >
          <header className="flex items-center justify-between bg-brand-900 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <Bot className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-sm font-semibold">Aribot</h2>
                <p className="text-xs text-brand-200">Product catalogue & business FAQs</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div
            ref={conversationRef}
            aria-live="polite"
            className="flex-1 space-y-4 overflow-y-auto bg-brand-50/60 p-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'visitor' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-3.5 py-3 text-sm leading-relaxed ${
                    message.role === 'visitor'
                      ? 'rounded-br-md bg-brand-900 text-white'
                      : 'rounded-bl-md border border-brand-100 bg-white text-brand-700'
                  }`}
                >
                  <p>{message.text}</p>
                  {message.products && message.products.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.products.map((product) => (
                        <Link
                          key={product.id}
                          href={`/contact?product=${encodeURIComponent(`${product.brand} - ${product.name}`)}`}
                          className="block rounded-xl border border-brand-100 bg-brand-50 p-3 text-brand-800 transition hover:border-brand-300"
                        >
                          <span className="block font-semibold">{product.name}</span>
                          <span className="mt-0.5 block text-xs text-brand-500">
                            {product.brand} · {product.category}
                          </span>
                          <span className="mt-1 block text-xs text-brand-600">
                            Pack sizes: {product.packSizes.join(', ')}
                          </span>
                          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent-700">
                            Enquire <ArrowRight className="h-3 w-3" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => ask(prompt)}
                    className="rounded-full border border-brand-200 bg-white px-3 py-2 text-xs font-medium text-brand-700 transition hover:border-brand-400"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-brand-100 bg-white p-3">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                ask(input);
              }}
              className="flex items-center gap-2"
            >
              <label className="sr-only" htmlFor="assistant-question">Your question</label>
              <input
                id="assistant-question"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about products..."
                maxLength={300}
                className="min-w-0 flex-1 rounded-xl border border-brand-200 px-3 py-2.5 text-sm text-brand-800 outline-none placeholder:text-brand-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send question"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-900 text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between gap-2 text-xs">
              <Link href="/contact" className="font-medium text-brand-600 hover:text-brand-900">
                Contact form
              </Link>
              <a href="tel:+919152352574" className="font-medium text-brand-600 hover:text-brand-900">
                Call us
              </a>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-600 hover:text-brand-900"
                >
                  WhatsApp
                </a>
              )}
            </div>
            <p className="mt-2 text-[10px] leading-relaxed text-brand-400">
              Listed information only. Contact us to confirm prices, stock or order quantities.
            </p>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={open ? 'Close Aribot' : 'Open Aribot'}
        className="flex items-center gap-2 rounded-full bg-accent-700 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-accent-800 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span>{open ? 'Close' : 'Aribot'}</span>
      </button>
    </div>
  );
}
