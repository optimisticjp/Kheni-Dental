import type { MetadataRoute } from "next";
import { treatments } from "@/content/site";
const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["","/about","/doctors","/treatments","/problems-we-treat","/smile-gallery","/reviews","/patient-resources","/international-patients","/clinic-technology","/contact","/privacy","/terms"];
  return [...staticPages.map(url=>({url:`${base}${url}`,lastModified:new Date(),changeFrequency:url===""?"weekly" as const:"monthly" as const,priority:url===""?1:0.7})),...treatments.map(t=>({url:`${base}/treatments/${t.slug}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:0.8}))];
}
