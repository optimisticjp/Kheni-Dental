# Kheni Dental Project Rules

You are working on the production website for **Kheni Dental & Elite Implant Center, Surat**.

Read these before making major edits:

- `PROJECT_BRIEF.md`
- `COPY_STYLE_GUIDE.md`
- `SOURCE_FACTS.md`
- `CONTENT_TO_VERIFY.md`
- `TRACKING_PLAN.md`
- `CLAUDE_PROJECT_HANDOFF.md`

## Product priorities

1. Patient trust
2. Mobile conversion
3. Clear clinic and doctor information
4. Fast performance
5. Local SEO
6. Accessibility
7. Maintainability

## Copy rules

- Patient concern first, procedure second.
- Warm, direct and human.
- No em dashes in visitor-facing copy.
- Do not sound like AI, an agency pitch or a medical textbook.
- Never invent credentials, technology, awards, ratings, patient counts or treatment results.
- Never promise painless care, guaranteed outcomes or "best" status.

## Engineering rules

- Keep most pages as Server Components.
- Use client components only where interaction requires them.
- Keep business facts centralised in `src/content/site.ts`.
- Avoid adding heavy libraries for small visual effects.
- Do not collect or transmit sensitive medical data through marketing tracking.
- Keep `NEXT_PUBLIC_ALLOW_INDEXING=false` until production launch approval.
- Run `npm run typecheck`, `npm run lint`, `npm run build`, and `npm run build:vinext` before deployment.
