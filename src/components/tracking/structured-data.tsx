import { doctors, homepageFaqs, locations, site, treatments } from "@/content/site";
import { youtubeChannelUrl } from "@/content/videos";
import { placeUrl, placeUrlFromId } from "@/lib/maps";

/**
 * JSON-LD for the organisation, both clinics, the doctors, the treatments
 * and the homepage FAQ. Everything here is visible on the page and comes
 * from clinic-confirmed data. Nothing is generated from testimonials or
 * cases, and no rating is emitted for a branch that is not verified.
 */
export function StructuredData() {
  if (process.env.NEXT_PUBLIC_ENABLE_SCHEMA !== "true") return null;

  const base = (process.env.NEXT_PUBLIC_SITE_URL || site.domain).replace(/\/$/, "");
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${base}/#organization`,
      name: site.name,
      url: `${base}/`,
      email: site.email,
      telephone: site.primaryPhoneDisplay,
      sameAs: [site.instagram, youtubeChannelUrl, ...locations.map((l) => l.googleShortUrl)],
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
        geo: { "@type": "GeoCoordinates", latitude: location.coords.lat, longitude: location.coords.lng },
        address: {
          "@type": "PostalAddress",
          streetAddress: location.address,
          addressLocality: site.city,
          addressRegion: site.region,
          addressCountry: "IN",
        },
        areaServed: [site.city, site.region],
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:30", closes: "13:00" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "16:00", closes: "20:00" },
        ],
        currenciesAccepted: "INR",
        parentOrganization: { "@id": `${base}/#organization` },
      };
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
    {
      "@type": "WebSite",
      "@id": `${base}/#website`,
      url: `${base}/`,
      name: site.name,
      publisher: { "@id": `${base}/#organization` },
      inLanguage: "en-IN",
    },
    {
      "@type": "FAQPage",
      "@id": `${base}/#faq`,
      mainEntity: homepageFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    ...treatments.map((treatment) => ({
      "@type": "MedicalProcedure",
      "@id": `${base}/treatments/${treatment.slug}/#procedure`,
      name: treatment.title,
      url: `${base}/treatments/${treatment.slug}/`,
      procedureType: "https://schema.org/TherapeuticProcedure",
      description: treatment.short,
      provider: { "@id": `${base}/#organization` },
    })),
    ...doctors.map((doctor) => ({
      "@type": "Person",
      "@id": `${base}/doctors/${doctor.slug}/#person`,
      name: doctor.name,
      honorificPrefix: "Dr.",
      jobTitle: doctor.specialty,
      description: `${doctor.credentials}. ${doctor.specialty}. ${doctor.yearsExperience} years of experience.`,
      url: `${base}/doctors/${doctor.slug}/`,
      worksFor: { "@id": `${base}/#organization` },
    })),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}
