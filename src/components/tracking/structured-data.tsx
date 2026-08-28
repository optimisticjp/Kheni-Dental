import { doctors, locations, site } from "@/content/site";

export function StructuredData() {
  if (process.env.NEXT_PUBLIC_ENABLE_SCHEMA !== "true") return null;

  const base = process.env.NEXT_PUBLIC_SITE_URL || site.domain;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${base}/#organization`,
      name: site.name,
      url: base,
      email: site.email,
      sameAs: [site.instagram, site.googleProfileUrl],
    },
    ...locations.map((location) => {
      const data: Record<string, unknown> = {
        "@type": "Dentist",
        "@id": `${base}/locations/${location.slug}/#dentist`,
        name: location.name,
        url: `${base}/locations/${location.slug}/`,
        telephone: location.phoneDisplay,
        email: site.email,
        hasMap: location.googleProfileUrl,
        sameAs: [location.googleProfileUrl],
        address: {
          "@type": "PostalAddress",
          streetAddress: location.address,
          addressLocality: site.city,
          addressRegion: site.region,
          addressCountry: "IN",
        },
        areaServed: [site.city, site.region],
        parentOrganization: { "@id": `${base}/#organization` },
      };

      // Only emit a rating for a branch whose figure is actually verified.
      // A pending branch must never inherit the other branch's numbers.
      if (location.google.status === "verified" && location.google.rating && location.google.reviewCount) {
        data.aggregateRating = {
          "@type": "AggregateRating",
          ratingValue: location.google.rating,
          reviewCount: location.google.reviewCount.replace(/,/g, ""),
          bestRating: "5",
          worstRating: "1",
        };
      }
      return data;
    }),
    ...doctors.map((doctor) => ({
      "@type": "Person",
      "@id": `${base}/doctors/${doctor.slug}/#person`,
      name: doctor.name,
      honorificPrefix: "Dr.",
      description: `${doctor.credentials} ${doctor.specialty}. ${doctor.yearsExperience} years of experience.`,
      url: `${base}/doctors/${doctor.slug}/`,
      worksFor: { "@id": `${base}/#organization` },
    })),
  ];

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }} />;
}
