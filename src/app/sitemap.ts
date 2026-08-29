import type { MetadataRoute } from "next";
import { doctors, locations, site, treatments } from "@/content/site";

export const dynamic = "force-static";
const base = process.env.NEXT_PUBLIC_SITE_URL || site.domain;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/about", "/doctors", "/locations", "/treatments", "/problems-we-treat", "/smile-gallery", "/reviews", "/patient-resources", "/international-patients", "/clinic-technology", "/contact", "/privacy", "/terms"];
  return [
    ...staticPages.map((path) => ({ url: `${base}${path}/`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : 0.7 })),
    ...treatments.map((t) => ({ url: `${base}/treatments/${t.slug}/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.85 })),
    ...doctors.map((d) => ({ url: `${base}/doctors/${d.slug}/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.75 })),
    ...locations.map((l) => ({ url: `${base}/locations/${l.slug}/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
