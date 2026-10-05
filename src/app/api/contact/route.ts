type Enquiry = {
  name: string;
  phone: string;
  email: string;
  product: string;
  quantity: string;
  message: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });
}

function parseEnquiry(value: unknown): Enquiry | null {
  if (!isRecord(value)) return null;
  const fields = ['name', 'phone', 'email', 'product', 'quantity', 'message'] as const;
  if (fields.some((field) => typeof value[field] !== 'string')) return null;

  const enquiry = value as Record<(typeof fields)[number], string>;
  if (!enquiry.name.trim() || !enquiry.phone.trim()) return null;
  if (enquiry.name.length > 100 || enquiry.phone.length > 30 || enquiry.email.length > 254 ||
      enquiry.product.length > 150 || enquiry.quantity.length > 100 || enquiry.message.length > 2000) return null;
  if (enquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) return null;

  return enquiry;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const enquiry = parseEnquiry(body);
  if (!enquiry) {
    return Response.json({ error: 'Please provide valid enquiry details.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFY_EMAIL;
  const fromEmail = process.env.FROM_EMAIL;
  if (!apiKey || !toEmail || !fromEmail) {
    return Response.json({ error: 'The enquiry service is not configured.' }, { status: 503 });
  }

  const html = `
    <h2>New Product Enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(enquiry.name)}</p>
    <p><strong>Phone / WhatsApp:</strong> ${escapeHtml(enquiry.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(enquiry.email || 'Not provided')}</p>
    <p><strong>Product:</strong> ${escapeHtml(enquiry.product || 'Not specified')}</p>
    <p><strong>Quantity / pack size:</strong> ${escapeHtml(enquiry.quantity || 'Not specified')}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(enquiry.message || 'No message provided').replace(/\n/g, '<br>')}</p>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        subject: 'New website product enquiry',
        html,
      }),
    });

    if (!response.ok) {
      console.error('Contact email provider rejected the enquiry:', response.status);
      return Response.json({ error: 'Failed to send enquiry.' }, { status: 502 });
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error('Contact email provider request failed:', error);
    return Response.json({ error: 'Failed to send enquiry.' }, { status: 502 });
  }
}
