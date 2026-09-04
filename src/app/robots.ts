import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

/**
 * The search crawlers that matter for a Surat dental clinic, named
 * individually.
 *
 * A group naming a crawler outright beats the `User-agent: *` group, and only
 * the matched group is obeyed. That matters here because Cloudflare's managed
 * robots.txt prepends its own `User-agent: *` group carrying `Allow: /`;
 * merged with ours, the least restrictive rule would win and the site would
 * be crawlable. Naming the crawlers sidesteps that merge entirely.
 *
 * The meta robots tag in `src/app/layout.tsx` is the second line of defence,
 * and the one that actually prevents indexing rather than crawling.
 */
const SEARCH_CRAWLERS = ["Googlebot", "Googlebot-Image", "Bingbot", "Slurp", "DuckDuckBot", "Baiduspider", "YandexBot"];

export default function robots(): MetadataRoute.Robots {
  const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
  const base = (process.env.NEXT_PUBLIC_SITE_URL || site.domain).replace(/\/$/, "");

  if (!allowIndexing) {
    return {
      rules: [
        { userAgent: "*", disallow: "/" },
        ...SEARCH_CRAWLERS.map((userAgent) => ({ userAgent, disallow: "/" })),
      ],
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
