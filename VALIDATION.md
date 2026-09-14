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

## Browser checks (V5)

Run against a local production build (`npm run build && npx next start -p 3100`)
with the Playwright QA script kept alongside the session (`qa.mjs`, using
the globally installed Playwright and the pre-installed Chromium). It covers:

- Mobile menu: opens, traps focus, locks body scroll, closes on Escape,
  returns focus to the trigger
- Mobile dock: three actions, at the bottom, 48px+ targets, swaps to
  Directions and the branch phone on clinic pages
- Booking sheet: opens from any Book button without navigating, offers both
  clinics plus "not sure", WhatsApp and Call, has focus, closes on Escape
- Instagram: every page links @khenielite, reel cards open the exact Reel
  in a new tab, posters load from public/images/instagram, and no
  Instagram script or iframe is ever on the page
- Videos: no iframe until tap, then the privacy-enhanced YouTube domain
- Hero reveal disabled under prefers-reduced-motion; FAQ opens by keyboard
- Form inputs at 16px or more, so iOS does not zoom
- No horizontal overflow at 320, 360, 375, 390, 430, 768, 820, 834, 1024,
  1280, 1366, 1440, 1536, 1920
- Canonical, robots.txt (disallow, search crawlers named individually),
  the `noindex` meta tag, sitemap on the www origin
- Rendered pages free of forbidden claims and placeholder markers

## Screenshot passes

Capture at 390 / 834 / 1440 first, then 320 / 360 / 375 / 430 / 768 / 1024 /
1366 / 1920, then the conversion pages again at 390 / 1440. Compare page
heights against the previous build and look at every fold.
