import { doctors, homepageFaqs, locations, site, treatments } from "@/content/site";
import { placeUrl, placeUrlFromId } from "@/lib/maps";

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
      sameAs: [site.instagram, locations[0].googleShortUrl],
    },
    ...locations.map((location) => {
      const data: Record<string, unknown> = {
        "@type": "Dentist",
        "@id": `${base}/locations/${location.slug}/#dentist`,
        name: location.name,
        url: `${base}/locations/${location.slug}/`,
        telephone: location.phoneDisplay,
        email: site.email,
        hasMap: placeUrlFromId(location),
        sameAs: [placeUrl(location)],
        // The same verified pin the aerial map is centred on, never a second
        // hand-typed pair that could drift away from it.
        geo: {
          "@type": "GeoCoordinates",
          latitude: location.coords.lat,
          longitude: location.coords.lng,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: location.address,
          addressLocality: site.city,
          addressRegion: site.region,
          addressCountry: "IN",
        },
        areaServed: [site.city, site.region],
        // Both clinics run the same split shift, six days a week. Stated as
        // structured hours rather than only as the display string, so Google
        // can show open/closed rather than making a patient parse a sentence.
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:30",
            closes: "13:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "16:00",
            closes: "20:00",
          },
        ],
        currenciesAccepted: "INR",
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
    // The site itself, so the knowledge graph has something to hang a
    // sitelinks search box and a name on.
    {
      "@type": "WebSite",
      "@id": `${base}/#website`,
      url: base,
      name: site.name,
      publisher: { "@id": `${base}/#organization` },
      inLanguage: "en-IN",
    },
    // Fifty-three answers were already written across the site and none of
    // them was marked up. This is the cheapest rich-result eligibility
    // available to a local clinic, so the homepage set is emitted here and
    // each treatment page contributes its own below.
    {
      "@type": "FAQPage",
      "@id": `${base}/#faq`,
      mainEntity: homepageFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    // What the practice actually offers, one entity per treatment, each tied
    // back to the organisation and to its own page.
    ...treatments.map((treatment) => ({
      "@type": "MedicalProcedure",
      "@id": `${base}/treatments/${treatment.slug}/#procedure`,
      name: treatment.title,
      url: `${base}/treatments/${treatment.slug}/`,
      procedureType: "https://schema.org/TherapeuticProcedure",
      howPerformed: treatment.metaDescription,
      provider: { "@id": `${base}/#organization` },
    })),
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
