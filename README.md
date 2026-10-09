# Export Business Website Template

A premium, production-ready website template for export/trading businesses. Built with Next.js 14, Tailwind CSS, Framer Motion, and TypeScript.

**Live demo:** [fastscalingai.com](https://fastscalingai.com)

## Features

- Premium design with scroll animations (Framer Motion)
- Fully responsive (mobile, tablet, desktop)
- Server-side contact form email delivery via Resend
- SEO optimized (Open Graph, Twitter Cards, sitemap, robots.txt)
- WhatsApp floating button
- 6 pages: Home, About, Products, Markets, Blog/Resources, Contact

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/rohit96/export-website-template.git
cd export-website-template

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Customize for Your Business

All business-specific content is in **`site.config.ts`**. Update these fields:

| Field | What to change |
|-------|---------------|
| `companyName` | Your company name |
| `domain` | Your domain (e.g. `https://yourdomain.com`) |
| `emails` | Your business email addresses |
| `whatsapp` | Your WhatsApp number with country code |
| `products` | Your product catalog |
| `markets` | Countries you serve |
| `about` | Your company story & milestones |
| `hero` | Homepage headline & description |

### Configure contact form email

The contact form sends enquiries through Resend from the Next.js API route. Copy
`.env.example` to `.env.local` and set:

| Variable | What to set |
|----------|-------------|
| `RESEND_API_KEY` | API key from your Resend account |
| `NOTIFY_EMAIL` | Inbox that should receive website enquiries |
| `FROM_EMAIL` | Sender address on a domain verified with Resend |

Set the same variables in your hosting provider's environment settings. Never
expose the Resend API key in a `NEXT_PUBLIC_` variable. The API route requires a
server-capable Next.js deployment; static export hosting does not support it.

### Replace Images

Images are in `public/images/`:
- `heroes/` — Page hero backgrounds
- `products/` — Product photos
- `blog/` — Blog article images
- `logo.png` — Your company logo
- `og-image.jpg` — Social sharing image (1200x630)
- `favicon.ico` — Browser tab icon

### Update SEO

1. Edit `site.config.ts` → `seo` section
2. Update `public/sitemap.xml` with your domain
3. Update `public/robots.txt` with your sitemap URL
4. Replace `src/app/layout.tsx` metadata with your domain

## Deploy to Cloudflare Pages

The current contact form uses a Next.js API route and cannot run as a static
Cloudflare Pages export. Use a server-capable Next.js host such as Vercel, or
configure a separate Cloudflare Worker/function before deploying there.

## Deploy to Vercel

```bash
npx vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com).

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Inter + Playfair Display (Google Fonts)
- **Contact Form:** Web3Forms
- **Language:** TypeScript

## Project Structure

```
├── public/
│   ├── images/          # All site images
│   ├── logo.png         # Company logo
│   ├── favicon.ico      # Browser icon
│   ├── og-image.jpg     # Social sharing image
│   ├── sitemap.xml      # SEO sitemap
│   └── robots.txt       # Search engine directives
├── src/
│   ├── app/
│   │   ├── page.tsx         # Homepage
│   │   ├── about/           # About page
│   │   ├── products/        # Products catalog
│   │   ├── markets/         # Markets served
│   │   ├── blog/            # Resources/blog
│   │   ├── contact/         # Contact page
│   │   ├── layout.tsx       # Root layout + SEO
│   │   └── globals.css      # Global styles
│   └── components/
│       ├── Navbar.tsx       # Navigation bar
│       ├── Footer.tsx       # Site footer
│       ├── ContactForm.tsx  # Contact form
│       ├── ProductCard.tsx  # Product display card
│       ├── CountryCard.tsx  # Market display card
│       ├── PageHero.tsx     # Page hero banner
│       ├── FadeIn.tsx       # Scroll animation wrapper
│       └── SectionHeader.tsx # Section title component
├── site.config.ts       # ← All business content here
├── tailwind.config.js   # Theme colors & design tokens
└── next.config.js       # Next.js config
```

## License

MIT — free to use for any business.
