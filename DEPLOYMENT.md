# Online-Only Deployment Workflow

This starter is intentionally compatible with a browser-only workflow using Claude Code on the web, GitHub and Cloudflare.

## Current deployment mode
`next.config.ts` uses `output: "export"` because the clinic currently needs no backend, login, payment or server-side form processing.

Production output: `out/`

## Suggested workflow
1. Keep the GitHub repository in a clinic-owned GitHub organization/account.
2. Open the repository in Claude Code Web.
3. Configure environment variables in the deployment provider.
4. Build with `npm run build`.
5. Publish the `out` directory through Cloudflare's static hosting workflow.
6. Connect the clinic-owned domain in Cloudflare.
7. Verify HTTPS, canonical URL, redirects and sitemap.
8. Add Google Search Console property and submit `/sitemap.xml`.

## Environment values
Copy `.env.example` values into the hosting environment:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_ENABLE_SCHEMA`

Leave schema disabled until all contact details and clinic facts in `src/content/site.ts` are verified.

## Future server features
If later you add:
- secure file uploads
- server-side appointment API
- CRM integration
- authenticated patient portal
- dynamic CMS previews

remove `output: "export"` and move deployment to a suitable Next.js server/Cloudflare Workers adapter. The app structure does not need to be rebuilt.
