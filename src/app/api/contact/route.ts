// Contact form API route
// For static export, this won't work directly — use Cloudflare Workers or Resend webhook instead
// This is a placeholder for when the site is deployed with server-side capabilities

export async function POST(request: Request) {
  const body = await request.json();

  // TODO: Replace with actual Resend API call when API key is provided
  const RESEND_API_KEY = process.env.RESEND_API_KEY || 'YOUR_RESEND_API_KEY';
  const TO_EMAIL = process.env.NOTIFY_EMAIL || 'exports@fastscalingai.com';
  const FROM_EMAIL = process.env.FROM_EMAIL || 'website@fastscalingai.com';

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `[Fast Scaling Trade] New Inquiry: ${body.product || 'General'} from ${body.name}`,
        html: `
          <h2>New Export Inquiry — Fast Scaling Trade</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Company:</strong> ${body.company || 'Not provided'}</p>
          <p><strong>Country:</strong> ${body.country || 'Not provided'}</p>
          <p><strong>Product Interest:</strong> ${body.product || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <p>${body.message || 'No message'}</p>
        `,
      }),
    });

    if (!res.ok) throw new Error('Email send failed');
    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false, error: 'Failed to send' }, { status: 500 });
  }
}
