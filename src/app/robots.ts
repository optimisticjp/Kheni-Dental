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

/**
 * The ad landing-page crawlers, allowed even while search indexing is off.
 *
 * These check that an ad's destination works and matches what the ad claims.
 * They do not index anything, so allowing them does not put the site into
 * search results, and blocking them gets ads disapproved for an unreachable
 * destination.
 *
 * Google documents that AdsBot ignores the `User-agent: *` group and has to
 * be named to be blocked, so ads would most likely have run anyway. Naming
 * them removes the "most likely" from a paid launch.
 */
const AD_CRAWLERS = ["AdsBot-Google", "AdsBot-Google-Mobile", "AdsBot-Google-Mobile-Apps"];

export default function robots(): MetadataRoute.Robots {
  const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
  const base = (process.env.NEXT_PUBLIC_SITE_URL || site.domain).replace(/\/$/, "");

  if (!allowIndexing) {
    return {
      rules: [
        { userAgent: "*", disallow: "/" },
        ...SEARCH_CRAWLERS.map((userAgent) => ({ userAgent, disallow: "/" })),
        ...AD_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
      ],
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
