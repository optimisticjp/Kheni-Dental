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

## Non-negotiables

- Preserve the V5 black, ivory and gold system with light fields: near-black
  ink, ivory, gold as the one rationed accent, five soft light fields with
  black type (tokens and hue classes in `src/app/globals.css`). Do not
  return to all-dark, and do not turn a light field into a saturated block.
- Keep the site mobile-first. Floating three-action pill (Book, Call,
  WhatsApp; Directions on clinic pages). Never a five-item dock.
- Instagram is first-class: `src/content/instagram.ts` lists only Reels
  checked on @khenielite, posters live under `public/images/instagram/`,
  nothing from Instagram is embedded or scripted. Re-open each Reel before
  adding or keeping it; if one fails, remove it rather than replace it.
- No generated faces. A doctor without a real portrait renders as a
  monogram panel. There is no demo or sample-content layer any more.
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
