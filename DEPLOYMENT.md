# Deployment

## Local / Codespaces validation

```bash
npm install
npm run typecheck
npm run lint
npm run build
npm run build:vinext
```

## Cloudflare Workers

The project is configured for vinext and Cloudflare Workers.

First authenticate:

```bash
npx wrangler login --device
npx wrangler whoami
```

Deploy:

```bash
npm run deploy:vinext
```

## Production domain

Final domain:

`https://www.khenidentalcare.com`

Set:

```text
NEXT_PUBLIC_SITE_URL=https://www.khenidentalcare.com
```

Keep search indexing disabled during review:

```text
NEXT_PUBLIC_ALLOW_INDEXING=false
```

Only after the domain, content, legal copy, links, tracking and mobile QA are approved:

```text
NEXT_PUBLIC_ALLOW_INDEXING=true
NEXT_PUBLIC_ENABLE_SCHEMA=true
```

Do not enable indexing on unfinished Workers preview URLs.
