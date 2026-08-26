# Kheni Elite Dental & Implant Center Website Starter

A premium, mobile-first Next.js 16 website starter prepared for Kheni Elite in Surat. It is intended to be opened and continued in **Claude Code Web**.

## What is already built
- Black / warm off-white / premium gold design system
- Moving top tagline
- Premium responsive header + mobile menu
- Hero and clinic trust architecture
- Treatment/service system
- Interactive “Problems We Treat” section
- Premium doctor profile cards
- Technology section
- International/NRI patient pathway
- Patient journey and social-proof sections
- Patient Resources architecture
- Treatment-specific static pages
- Contact + WhatsApp consultation flow
- Mobile sticky Call / WhatsApp / Book bar
- GTM loader and consent mode defaults
- consent banner
- healthcare-safe generic dataLayer events
- sitemap and robots
- schema component disabled until facts are verified
- static export for inexpensive hosting

## Start here in Claude Code
Read:
1. `PROJECT_BRIEF.md`
2. `CONTENT_NEEDED.md`
3. `REFERENCES.md`
4. `TRACKING_PLAN.md`
5. `DEPLOYMENT.md`
6. `CLAUDE_PROJECT_HANDOFF.md`

Then:
```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
```

## Important editable clinic data
`src/content/site.ts`

This file centralizes:
- clinic contact placeholders
- reviews / proof-point placeholders
- doctors
- treatments
- problem pathways
- patient resources

Replace placeholder content only with verified clinic data.

## Tracking
Set in hosting environment:
```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_ENABLE_SCHEMA=false
```

Keep schema disabled until address, phone, email and other clinic facts are verified.

## Hosting
The current project uses Next static export (`out/`) because there is no payment capture or server-side patient portal. It can be hosted inexpensively through Cloudflare static hosting. If server features are needed later, remove `output: "export"` and migrate deployment without rebuilding the design system.

## Original template capabilities
This project retains the original `.claude/skills`, `.agents`, GitHub Spec Kit files, shadcn compatibility and Claude Code web-building workflow from the uploaded standard template.
