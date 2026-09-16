import type { Metadata } from "next";

import { CtaBand } from "@/components/kheni/cta-band";
import { PageHero } from "@/components/kheni/page-hero";
import { GoogleQuotes } from "@/components/kheni/proof";
import { ResultsPreview } from "@/components/kheni/results-preview";
import { SectionIntro } from "@/components/kheni/section-intro";
import { Container } from "@/components/ui/container";
import { caseCategories, caseResults } from "@/content/cases";
import { sampleCases } from "@/content/review-sample";

export const metadata: Metadata = {
  alternates: { canonical: "/smile-gallery/" },
  title: "Before & After Results",
  description:
    "Before and after dental results from Kheni Dental in Surat: implants, full mouth rehabilitation, smile design, crowns and braces, published only with the patient's written permission.",
};

export default function SmileGalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Before and after"
        title="Results, shown honestly."
        highlight="honestly"
        copy="Every case here is treated at one of our two Surat clinics and published only with the patient's written permission. Drag the handle on each pair to compare."
        hue="gold"
      >
        <ul className="mt-5 flex flex-wrap gap-2">
          {caseCategories.map((c) => (
            <li key={c} className="rounded-full border border-ivory/25 px-3 py-1.5 text-sm font-medium text-ivory/90">
              {c}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <ResultsPreview limit={caseResults.length || sampleCases.length} placement="gallery" />
        </Container>
      </section>

      <section className="bg-sand py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <SectionIntro eyebrow="Meanwhile" title="What patients already say on Google." highlight="already say" />
          <GoogleQuotes placement="gallery_quotes" className="mt-6" />
        </Container>
      </section>


      <CtaBand title="Wondering what is possible for your smile?" highlight="your case" copy="The honest answer comes after somebody looks in your mouth. Book a consultation at either clinic and you will get one." placement="gallery_final" hue="gold" />
    </>
  );
}
