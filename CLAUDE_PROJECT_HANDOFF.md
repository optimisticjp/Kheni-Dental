# Claude Code Handoff: Kheni Elite

## First action in Claude Code
Read in this order:
1. `PROJECT_BRIEF.md`
2. `CONTENT_NEEDED.md`
3. `TRACKING_PLAN.md`
4. `DEPLOYMENT.md`
5. `src/content/site.ts`

Then run:
- `npm install`
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Current state
The starter already includes:
- Premium black/gold design tokens
- Responsive navbar, mobile menu and sticky mobile conversion bar
- Moving top tagline
- Homepage with hero, services, interactive problems, doctors, technology, international patients, reviews, resources, FAQs and final CTA
- Doctor profile page
- Treatments index
- Static dynamic treatment pages
- Problems We Treat page
- Smile Gallery placeholders
- Reviews placeholders
- Patient Resources
- International Patients
- Clinic & Technology
- Contact + generic WhatsApp consultation form
- Privacy / terms placeholders
- sitemap + robots
- GTM loader with default-denied Google Consent Mode
- consent banner
- generic dataLayer tracking events
- schema component disabled until clinic facts are verified

## Do not do
- Do not replace real doctor/clinic photography with fake AI clinical photography in production.
- Do not invent credentials, awards, case counts, technology or testimonials.
- Do not use unsupported “best”, “#1”, “painless”, guaranteed-outcome or lowest-price claims.
- Do not add medical/symptom free-text fields to tracked marketing forms.
- Do not remove mobile/reduced-motion/accessibility behavior for visual effects.
- Do not scatter direct Google/Meta scripts throughout components. Keep tracking centralized.

## Best next improvements
1. Replace content placeholders after clinic data arrives.
2. Replace `MediaPlaceholder` blocks with optimized real assets.
3. Refine visual polish using selected real photography.
4. Add clinician-approved case gallery.
5. Add clinician-approved resource PDFs/content.
6. Configure real GTM + GA4 + Google Ads + Meta.
7. Validate events in Tag Assistant and browser network tools.
8. Run Lighthouse and fix Core Web Vitals.
9. Test 360px, 390px, 768px, 1280px and large desktop.
10. Run accessibility and security review before launch.
