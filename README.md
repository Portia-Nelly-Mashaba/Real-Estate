# Mashaba Property Investments

A modern B2C real estate website built for the **CommunityBytes Web Developer Technical Assessment**. The site showcases premium South African property listings with a full booking flow, responsive design, and production-ready performance.

**Live site:** [https://real-estate-teal-delta.vercel.app](https://real-estate-teal-delta.vercel.app)  
**Repository:** [https://github.com/Portia-Nelly-Mashaba/Real-Estate](https://github.com/Portia-Nelly-Mashaba/Real-Estate)

![Mashaba Property Investments — Home page](./public/screenshots/home.png)

---

## Project overview

Mashaba Property Investments is a luxury real estate brand site for buyers and sellers across South Africa. The experience is designed to feel premium and trustworthy — serif headings, a warm cream-and-charcoal palette, and high-quality imagery — while remaining fast, accessible, and fully functional on mobile.

The project covers all core assessment pages (Home, Services, About, Gallery, Contact, Booking) plus additional features such as property detail pages, favourites, and SEO optimisation.

---

## Features implemented

### Core pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero search, featured listings, popular areas, testimonials, CTAs |
| Properties | `/gallery` | Searchable property grid/list with filters and sorting |
| Property detail | `/property/[id]` | Full listing with hero, specs, interior gallery, and booking CTA |
| About | `/about` | Company story, team, services section (`#services`) |
| Gallery | `/services` | Photo gallery of homes and interiors |
| Contact | `/contact` | Validated contact form with office details |
| Booking | `/booking` | Multi-step viewing reservation wizard |
| Favourites | `/favorites` | Saved properties (persisted in `localStorage`) |
| Privacy / Terms | `/privacy`, `/terms` | Legal pages linked from footer |

### Booking system

- **Calendar view** — pick an available date; Sundays and past dates are disabled and visually distinct
- **Time slots** — Mon–Sat, 09:00–17:00 SAST (12:00–14:00 lunch gap); booked slots are disabled
- **Customer details** — name, email, phone, optional notes with validation feedback
- **Confirmation screen** — summary of the booking with next steps
- **WhatsApp integration** — pre-filled message to demo number `+27 78 152 6699`
- **Toast feedback** — success notification on submission (no browser permission prompts)
- **Availability management** — slots stored in `localStorage`; duplicate bookings prevented per email/slot
- **No dead ends** — every button, link, and form action provides visible feedback or a state change

### Additional features

- **Favourites** — heart toggle on property cards, header badge count, dedicated favourites page
- **Property search & filters** — by name, suburb, region, type, beds, baths, and price range
- **Grid / list views** — toggle on the properties page
- **Interior galleries** — three internal photos per property on detail pages
- **Related properties** — suggestions on each detail page
- **Booking history** — header icon showing past viewing bookings
- **Contact form API** — server-side handler with user-facing error feedback
- **SEO** — per-page metadata, sitemap, robots.txt, JSON-LD structured data
- **Accessibility** — skip link, semantic HTML, form labels, keyboard focus styles, alt text
- **Security headers** — configured in `next.config.ts`

---

## Screenshots

### Properties

![Properties listing page](./public/screenshots/properties.png)

### Book a viewing

![Booking wizard](./public/screenshots/booking.png)

### Contact

![Contact page](./public/screenshots/contact.png)

---

## Technologies used

| Category | Stack |
|----------|-------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| UI | React 19, [Tailwind CSS 4](https://tailwindcss.com) |
| Icons | [Lucide React](https://lucide.dev) |
| Fonts | Google Fonts (serif + sans via `next/font`) |
| Images | Next.js `<Image>` with AVIF/WebP; Unsplash for interior gallery |
| Deployment | [Vercel](https://vercel.com) |
| Storage | `localStorage` (bookings, favourites) |

---

## Project structure

```
src/
├── app/                  # Routes, layouts, API handlers, global styles
│   ├── api/booking/      # Booking notification endpoint
│   ├── api/contact/      # Contact form endpoint
│   ├── booking/          # Booking page
│   ├── gallery/          # Properties listing
│   ├── property/[id]/    # Property detail pages (SSG)
│   └── ...
├── components/
│   ├── booking/          # Wizard, calendar, time slots, confirmation
│   ├── contact/          # Form and contact info
│   ├── gallery/          # Listing grid, filters, toolbar
│   ├── home/             # Hero, cards, testimonials, areas
│   ├── layout/           # Header, footer, skip link
│   └── property/         # Detail page and interior gallery
├── hooks/                # useBookings, useFavorites, useHasMounted
└── lib/
    ├── booking/          # Availability, WhatsApp, storage, config
    ├── data/             # Properties, about, contact, services
    ├── favorites/        # Favourites storage helpers
    ├── gallery/          # Filter and sort logic
    └── seo.ts            # Metadata and JSON-LD helpers
public/
├── images/               # Hero, areas, property photos
└── screenshots/          # README preview images
```

---

## Setup instructions

### Prerequisites

- Node.js 20+
- npm (or yarn / pnpm)

### 1. Clone the repository

```bash
git clone https://github.com/Portia-Nelly-Mashaba/Real-Estate.git
cd Real-Estate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and set your site URL:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, set `NEXT_PUBLIC_SITE_URL` to your Vercel URL (no trailing slash). This is used for canonical URLs, sitemap, and Open Graph tags.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
```

### 6. Lint

```bash
npm run lint
```

---

## Deployment

The site is deployed on **Vercel**. Connect the GitHub repository and set the environment variable:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://real-estate-teal-delta.vercel.app` |

Push to `main` to trigger automatic deployments.

---

## Performance & accessibility

The site is optimised for Lighthouse review:

- Next.js static generation for property pages
- Optimised images (AVIF/WebP, responsive `sizes`)
- Semantic HTML, heading hierarchy, and ARIA labels
- Skip-to-content link for keyboard users
- Security and best-practice headers

Run Lighthouse against the live URL in Chrome DevTools (Incognito, mobile or desktop) to verify scores.

**Target scores (assessment):**

| Category | Target |
|----------|--------|
| Performance | 80+ |
| Accessibility | 80+ |
| Best Practices | 90+ |
| SEO | 90+ |

---

## Assessment mapping

This project fulfils the CommunityBytes Web Developer Technical Assessment brief:

- **Industry:** Real Estate
- **Required pages:** Home, Services/Menu, About, Gallery, Contact, Booking
- **Booking:** Calendar, time slots, operating hours, confirmation, WhatsApp pre-fill
- **Responsive:** Mobile, tablet, desktop layouts
- **Accessibility:** Semantic markup, labels, keyboard navigation, contrast, alt text
- **Deployment:** Live on Vercel with GitHub repository
- **README:** Overview, setup, tech stack, features, embedded screenshots

---


