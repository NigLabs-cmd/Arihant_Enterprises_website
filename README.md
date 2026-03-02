# Export Business Website Template

A premium, production-ready website template for export/trading businesses. Built with Next.js 14, Tailwind CSS, Framer Motion, and TypeScript.

**Live demo:** [fastscalingai.com](https://fastscalingai.com)

## Features

- Premium design with scroll animations (Framer Motion)
- Fully responsive (mobile, tablet, desktop)
- Static export — deploys anywhere (Cloudflare Pages, Vercel, Netlify)
- SEO optimized (Open Graph, Twitter Cards, sitemap, robots.txt)
- Contact form via Web3Forms (free, no backend needed)
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
| `web3formsKey` | Your free key from [web3forms.com](https://web3forms.com) |
| `products` | Your product catalog |
| `markets` | Countries you serve |
| `about` | Your company story & milestones |
| `hero` | Homepage headline & description |

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

```bash
# Build the static site
npm run build

# Deploy (first time — creates project)
npx wrangler pages project create your-project-name --production-branch main
npx wrangler pages deploy out --project-name your-project-name

# Subsequent deploys
npm run build && npx wrangler pages deploy out --project-name your-project-name
```

Then add your custom domain in Cloudflare Pages dashboard → Custom domains.

## Deploy to Vercel

```bash
npx vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com).

## Tech Stack

- **Framework:** Next.js 14 (Static Export)
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
└── next.config.js       # Next.js config (static export)
```

## License

MIT — free to use for any business.
