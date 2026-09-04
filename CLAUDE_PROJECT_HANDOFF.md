# Claude Code Handoff

This is Kheni Dental & Elite Implant Center, not a generic dental template.

## Before editing

Read:

1. `PROJECT_BRIEF.md`
2. `COPY_STYLE_GUIDE.md`
3. `SOURCE_FACTS.md`
4. `CONTENT_TO_VERIFY.md`
5. `TRACKING_PLAN.md`
6. `docs/CLINIC-CONTENT-NEEDED.md`
7. `DEMO_CONTENT.md` (what on this build is invented, and how to switch it off)

## Non-negotiables

- Preserve the V4 "vibrant clinical editorial" system: porcelain foundation,
  navy ink, cobalt action colour, one hue per treatment (tokens in
  `src/app/globals.css`).
- Keep the site mobile-first. Three-action dock (Book, Call, WhatsApp;
  Directions on clinic pages). Never a five-item dock.
- Keep the appointment sheet: Book opens a clinic choice, then WhatsApp or
  call. No backend, no medical questions.
- No prices, "starting from", EMI or "free consultation". No "painless",
  "best", "No. 1", "world-class", "guaranteed". The build fails on these
  (`src/content/__checks__/content-integrity.check.ts`).
- Real proof only. No invented testimonials, cases, counts, credentials,
  technology or videos. Empty content arrays render nothing.
- Current doctor roster only (four dentists). Old flyers are not a source.
- Canonical origin is `https://www.khenidentalcare.com`. Keep it.
- Do not invent medical, business or credential claims.
- Do not use em dashes in visitor-facing copy.
- Do not send healthcare data into marketing tracking.
- Keep search indexing off until final launch approval.
- Run typecheck, lint, Next build and vinext build after material changes.
