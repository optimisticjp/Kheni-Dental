import { site } from "@/content/site";

export function StructuredData() {
  if (process.env.NEXT_PUBLIC_ENABLE_SCHEMA !== "true") return null;
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const data = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: site.name,
    url: base,
    telephone: site.phoneDisplay,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: "IN",
    },
    areaServed: [site.city, site.region],
    sameAs: [site.instagram],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
