import { locations, site } from "@/content/site";

export function StructuredData() {
  if (process.env.NEXT_PUBLIC_ENABLE_SCHEMA !== "true") return null;
  const base = process.env.NEXT_PUBLIC_SITE_URL || site.domain;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: site.name,
        url: base,
        email: site.email,
        sameAs: [site.instagram],
      },
      ...locations.map((location) => ({
        "@type": "Dentist",
        "@id": `${base}/locations/${location.slug}/#dentist`,
        name: location.name,
        url: `${base}/locations/${location.slug}/`,
        telephone: location.phoneDisplay,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: location.address,
          addressLocality: site.city,
          addressRegion: site.region,
          addressCountry: "IN",
        },
        areaServed: [site.city, site.region],
        parentOrganization: { "@id": `${base}/#organization` },
      })),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
