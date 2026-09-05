import type { Metadata } from "next";

import { CtaBand } from "@/components/kheni/cta-band";
import { PageHero } from "@/components/kheni/page-hero";
import { GoogleQuotes } from "@/components/kheni/proof";
import { ResultsPreview } from "@/components/kheni/results-preview";
import { SectionIntro } from "@/components/kheni/section-intro";
import { Container } from "@/components/ui/container";
import { caseCategories, caseDisclaimer, caseResults } from "@/content/cases";
import { CaseWall, ResultDump } from "@/components/kheni/demo/result-gallery";
import { VideoWall } from "@/components/kheni/demo/video-wall";
import { demoContentActive } from "@/content/demo";

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
        hue="sunshine"
      >
        <ul className="mt-5 flex flex-wrap gap-2">
          {caseCategories.map((c) => (
            <li key={c} className="rounded-full bg-white px-3 py-1.5 text-sm font-medium ring-1 ring-line">
              {c}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <ResultsPreview limit={caseResults.length || 1} placement="gallery" />
          <p className="t-small mt-6 max-w-2xl text-ink-soft">{caseDisclaimer}</p>
        </Container>
      </section>

      <section className="hue-sky bg-sky-tint py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <SectionIntro eyebrow="Meanwhile" title="What patients already say on Google." highlight="already say" />
          <GoogleQuotes placement="gallery_quotes" className="mt-6" />
        </Container>
      </section>

      {demoContentActive && (
        <>
          <section className="hue-cobalt py-10 sm:py-14 lg:py-20">
            <Container width="7xl">
              <SectionIntro eyebrow="Labelled cases" title="Drag the handle. Watch it change." highlight="Watch it change" copy="Treatment, arch and how long it took, named on every pair. No mystery." />
              <CaseWall className="mt-6 sm:mt-8" />
            </Container>
          </section>

          <section className="hue-teal py-10 sm:py-14 lg:py-20">
            <Container width="7xl">
              <SectionIntro eyebrow="The full wall" title="And a few hundred more." highlight="a few hundred" copy="Fifteen years of before and after, stacked without captions. Ask about any one of them." />
              <ResultDump className="mt-6 sm:mt-8" limit={12} />
            </Container>
          </section>

          <section className="hue-violet relative isolate overflow-hidden bg-ink py-10 text-white sm:py-14 lg:py-20">
            <Container width="7xl" className="relative">
              <SectionIntro tone="dark" eyebrow="On camera" title="Some of them said it out loud." highlight="out loud" />
              <VideoWall className="mt-6 sm:mt-8" />
            </Container>
          </section>
        </>
      )}

      <CtaBand title="Want to know what is possible in your case?" highlight="your case" copy="The honest answer comes after looking. Book a consultation at either clinic." placement="gallery_final" hue="sunshine" />
    </>
  );
}
