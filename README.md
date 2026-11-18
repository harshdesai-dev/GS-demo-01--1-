# Forge Fitness Club — GrowthSathi Package 01 Demo

A static, five-page gym website demo built for **GrowthSathi Package 01 — Essential Presence**.

## Included Pages

- `index.html` — Home (Hero, Training Zones, Brand Introduction, Pillars, Gallery Preview, Final CTA)
- `about.html` — About Us (Studio Overview, Philosophy, Mission & Approach)
- `facilities.html` — Facilities & Services (Strength, Functional Turf, Cardio Area, Illustrative Personal & Small-Group Coaching)
- `gallery.html` — Gallery (Filterable 4:3 photography grid with keyboard-accessible lightbox preview)
- `contact.html` — Contact Us (Direct click-to-call, prefilled WhatsApp enquiry link, placeholder address, and illustrative opening hours)

## Assets & Scripts

- `assets/styles.css` — Responsive CSS3 design system (`390px`, `768px`, `1366px+`) with dark charcoal surfaces, restrained electric lime accents, tabular numerals, and `prefers-reduced-motion` support
- `assets/app.js` — Vanilla JavaScript for mobile drawer navigation (Escape/link/backdrop close and keyboard focus containment), gallery filtering, accessible lightbox focus containment and keyboard navigation, clipboard phone copy, and image fallback handling
- `src/assets/images/` — Local optimized photography assets

## Strict Package 01 Boundaries

This demo intentionally excludes Package 02+ backend features:
- No membership management, login, authentication, or user portals
- No class booking, attendance tracking, CRM, or admin dashboards
- No payment gateways, databases, AI chatbots, or fake contact form submissions

All contact enquiries route directly through `tel:` and prefilled `https://wa.me/...` links.

## Before Live Launch (Checklist)

1. Replace the placeholder phone number (`+91 00000 00000`) and WhatsApp number (`910000000000`) across all HTML pages.
2. Replace the illustrative studio address, email (`hello@forgefitness-demo.example`), and opening hours on `contact.html`.
3. Verify Open Graph metadata and page descriptions for your target city and brand name.

## Stack & Local Preview

- **Stack**: Semantic HTML, CSS, vanilla JavaScript, and Vite. No React app, backend server, database, or API is required.
- **Prerequisite**: Node.js `20.19+`.
- **Install**: Run `npm install` once after cloning or pulling dependency changes.
- **Development**: Run `npm run dev` (Vite serves the site on port `3000`).
- **Production build**: Run `npm run build` to output all five HTML pages and assets to `dist/`.
- **Preview production build**: Run `npm run preview`.
- **Vercel**: Deploy as a static Vite site with build command `npm run build` and output directory `dist`.
