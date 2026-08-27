# Kheni Dental & Elite Implant Center

Production-oriented website foundation for **Kheni Dental & Elite Implant Center, Surat**.

## Current brand setup

- Domain: `https://www.khenidentalcare.com`
- Patient email: `smile@khenidentalcare.com`
- Locations: Yogi Chowk and Hirabaug, Surat
- Framework: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- Cloudflare deployment: vinext + Cloudflare Workers
- Tracking: GTM-ready, disabled until a GTM ID is configured
- Search indexing: disabled by default until launch approval

## First commands

```bash
npm install
npm run typecheck
npm run lint
npm run build
```

For the Cloudflare build:

```bash
npm run build:vinext
```

## Content rule

Do not turn this site into a list of dental procedures. Copy should start with the patient's concern, uncertainty or desired outcome, then explain the clinical option in plain language.

Examples of the intended approach:

- Missing tooth: focus on eating, speaking and smiling with confidence before explaining implants.
- Root canal: start with tooth pain and relief before explaining the procedure.
- Kids dentistry: start with comfort and a calmer first experience.
- International patients: start with planning and certainty before discussing treatment logistics.

Avoid hype, unsupported superlatives, guaranteed results, absolute pain claims and generic AI-style phrases. Do not use em dashes in visitor-facing copy.

## Before production launch

Read:

- `CONTENT_TO_VERIFY.md`
- `SOURCE_FACTS.md`
- `COPY_STYLE_GUIDE.md`
- `TRACKING_PLAN.md`
- `DEPLOYMENT.md`
- `SENIOR_AUDIT.md`

Real doctor and clinic photography is still required. Do not open search indexing until content, legal pages, tracking consent and location details have been reviewed.
