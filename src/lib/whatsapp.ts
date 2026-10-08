const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919152352574';

export function getWhatsAppUrl(message: string): string | null {
  if (!/^\d{8,15}$/.test(phone)) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
