# Validation

## Before deployment

```bash
npm run typecheck
npx eslint src
npm run build
npm run build:vinext
npx vinext check
```

The Next build also runs two build-time guards imported by `src/app/layout.tsx`:

- `src/content/__checks__/branch-data.check.ts`: Place IDs, coordinates, phone
  numbers and derived map URLs are per branch and never shared.
- `src/content/__checks__/content-integrity.check.ts`: no prices, EMI or
  "free consultation"; no "painless", "guaranteed", "best", "world-class" or
  similar; no unconfirmed techniques, equipment, credentials or travel
  services; no em dashes; proof (cases, stories, videos) only with consent;
  canonical origin is `https://www.khenidentalcare.com`; four-doctor roster.

## Browser checks (V5, 14 September 2026)

A 32-check Playwright suite (`qa.mjs`, kept with the session) passed on the
V5 black/gold build: no horizontal overflow on 19 pages at 14 widths, no
forbidden claims, canonical www and `noindex` on every page, @khenielite
linked on every page, robots and sitemap, the floating action pill (three
actions, 48px targets, Directions and the branch phone on clinic pages),
the mobile menu (focus, trap, Escape, scroll lock, Instagram link), the
booking sheet, lazy YouTube on the privacy domain, reel cards linking to
the exact Reel in a new tab with local posters and no Instagram script,
16px form inputs, reduced motion, keyboard FAQ. Homepage at 390px: 12,399px.

## Browser checks (V4)

Run against a local production build (`npm run build && npx next start -p 3100`)
with the Playwright scripts kept alongside the session (`interactions.mjs`,
`shoot.mjs`). They cover:

- Mobile menu: opens, traps focus, locks body scroll, closes on Escape,
  returns focus to the trigger
- Mobile dock: three actions, at the bottom, 48px+ targets, swaps to
  Directions and the branch phone on clinic pages
- Booking sheet: opens from any Book button without navigating, offers both
  clinics plus "not sure", WhatsApp and Call, has focus, closes on Escape
- Concern finder links, before/after slider (keyboard and label)
- Videos: no iframe until tap, then the privacy-enhanced YouTube domain
- No horizontal overflow at 320, 360, 375, 390, 430, 768, 820, 834, 1024,
  1280, 1366, 1440, 1536, 1920
- Canonical, robots.txt (disallow, search crawlers named individually),
  the `noindex` meta tag, sitemap on the www origin
- Rendered pages free of forbidden claims and placeholder markers

## Screenshot passes

Capture at 390 / 834 / 1440 first, then 320 / 360 / 375 / 430 / 768 / 1024 /
1366 / 1920, then the conversion pages again at 390 / 1440. Compare page
heights against the previous build and look at every fold.
