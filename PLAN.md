# Beauty Salon Prototype — Design 1

A reusable Xbuilt Studio pitch-prototype template for local hair/beauty salons. This is not built for one specific client — it's the base to fork for the next one. Swap the content, swap the three gallery photos, and it's ready to pitch again.

## What this is

One scrolling Next.js 16 (App Router) + TypeScript + Tailwind v4 site: video hero, services with a booking calculator, about, testimonials, a photo gallery, live opening hours, and contact — plus a `/over-dit-concept` page explaining the studio's process, and an on-page "pitch mode" overlay for talking through the design live with a prospect.

All salon-specific facts live in one file: `src/lib/content.ts`. Everything else — headings, hero text, nav logo, metadata — reads from that file rather than being hardcoded, so re-skinning for a new client is mostly a content-file edit.

## How to reuse this for a new client

1. **Research first.** Look up the real business: Google Business Profile, Treatwell/Booksy, reviews, real photos, current prices and hours. Don't invent facts for a real pitch.
2. **Rewrite `src/lib/content.ts`** — name, address, phone, owner, years, rating/review count, the `reviews` array (real, verbatim quotes with real names once there's a real client), `reviewKeywords`, `serviceGroups`, and `hours`.
3. **Replace the three files in `public/`**: `gallery-storefront.jpg`, `gallery-interior.jpg`, `gallery-owner.jpg` — with the real client's own photos once there is one (this design-1 template currently ships generic, unbranded stock in their place, licensed for exactly this reuse). `hero-video.mp4` / `hero-poster.jpg` can stay as mood footage or be swapped per client.
4. **Re-derive the palette if it matters.** The current ink/brick/bone/oak tokens (`src/app/globals.css`, `@theme inline`) are a neutral starting point that reads well on almost any salon. For a real pitch, consider measuring the palette off the client's actual space instead.
5. Update `package.json` `name`, and skim `footer.tsx` / `over-dit-concept/page.tsx` for any copy that assumes a specific client.
6. `npm run lint && npm run build` before shipping.

## Design tokens

Registered in Tailwind v4 `@theme`:

- `--color-ink: #1A1A1C` — body text and headings on bone
- `--color-brick: #4A4744` — dark section backgrounds; white text on brick
- `--color-bone: #F5F3F0` — page background
- `--color-oak: #C29B6B` — CTAs, rules, price emphasis only (oak on ink is 6.8:1)
- `--ease-signature: cubic-bezier(0.16, 1, 0.3, 1)` — the one easing curve used for every transition site-wide

Type: Instrument Serif for display/headings, Geist for body and labels. One radius token (`2px`), one hairline weight. `prefers-reduced-motion: reduce` disables all of it.

## Page composition

Nav (fixed, transparent-over-hero, active-section underline) → Hero (video, live open badge, sound toggle, scroll cue) → Diensten & prijzen (editorial pricing + a "stel je bezoek samen" WhatsApp calculator) → Over (animated stat bar) → Reviews (star fill-in, tilt cards, keyword tags) → Gallery (auto-scrolling photo marquee with lightbox) → Openingstijden (live open/closed clock + countdown) → Contact (map embed, call + WhatsApp + route) → Footer.

A floating "i" button in the bottom-right corner toggles pitch-mode: a sidebar of talking points tied to whichever section is in view, meant for the studio to use live in a pitch call, not for the salon's own visitors.

## SEO and privacy

- `metadata.robots: { index: false, follow: false }` — this is a prototype, not a live client site
- `src/app/robots.ts`: `userAgent: *`, `disallow: /`
- `HairSalon` JSON-LD is built from `content.ts` — keep it factual once real client data goes in

## Components

- `src/lib/content.ts` — all business facts (the file to edit per client)
- `src/lib/hours-status.ts`, `price.ts`, `whatsapp.ts` — pure helpers, client-agnostic
- `src/components/nav.tsx`, `hero.tsx`, `hero-video.tsx`, `open-badge.tsx`, `scroll-progress.tsx`, `cursor-glow.tsx`
- `src/components/services.tsx`, `service-calculator.tsx`, `animated-price.tsx`
- `src/components/about.tsx`, `animated-number.tsx`
- `src/components/reviews.tsx`, `tilt-card.tsx`
- `src/components/gallery.tsx`
- `src/components/hours.tsx`, `contact.tsx`, `footer.tsx`
- `src/components/reveal.tsx` — shared scroll-reveal, IntersectionObserver-driven
- `src/components/pitch-mode.tsx` — the sales-call overlay
- `src/app/over-dit-concept/page.tsx` — the studio's process page, linked from the footer
