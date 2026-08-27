import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
  if (!allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.khenidentalcare.com";
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
