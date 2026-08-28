# Validation Status

Validation completed for this packaged build:

- TypeScript/TSX syntax transpile check: PASS across 51 source files
- Project `@/` local import resolution check: PASS
- Static internal route link scan: PASS
- Mobile menu architecture reviewed and rebuilt
- Search for stale `/locations/yogi-chowk` routes: PASS, none remain
- Public-facing location naming uses Swastik Plaza and Hirabaug
- Generated `node_modules`, `.next`, `dist` and vinext output are excluded from the archive

## Dependency build note

The packaging container could not complete `npm ci` because registry installation stalled. No dependency or build output is bundled in the ZIP.

Run this in GitHub Codespaces after extracting or committing the project:

```bash
npm install
npm run typecheck
npm run lint
npm run build
npm run build:vinext
```

Then test these routes at minimum:

- `/`
- `/reviews/`
- `/locations/`
- `/locations/swastik-plaza/`
- `/locations/hirabaug/`
- `/contact/`
- one treatment route
- one doctor route

## Mobile QA

Test the mobile menu at:

- 320px
- 360px
- 390px
- 430px
- tablet portrait
- tablet landscape

Confirm:

- menu opens and closes
- Escape closes on a hardware keyboard
- body does not scroll behind the menu
- all navigation links close the menu
- focus returns to the menu trigger
- sticky Call / WhatsApp / Book bar works
- location detail pages replace Book with Directions

Search indexing remains disabled by default until production launch approval.
