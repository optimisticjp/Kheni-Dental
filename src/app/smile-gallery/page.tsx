import type { Metadata } from "next";

import { CtaBand } from "@/components/kheni/cta-band";
import { InstagramReels } from "@/components/kheni/instagram-reels";
import { PageHero } from "@/components/kheni/page-hero";
import { GoogleQuotes } from "@/components/kheni/proof";
import { ResultsPreview, hasResults } from "@/components/kheni/results-preview";
import { SectionIntro } from "@/components/kheni/section-intro";
import { Container } from "@/components/ui/container";
import { caseCategories, caseDisclaimer, caseResults } from "@/content/cases";
import { featuredReels } from "@/content/instagram";

export const metadata: Metadata = {
  alternates: { canonical: "/smile-gallery/" },
  title: "Before & After Results",
  description:
    "Before and after dental results from Kheni Dental in Surat: implants, full mouth rehabilitation, smile design, crowns and braces, published only with the patient's written permission.",
};

export default function SmileGalleryPage() {
  return (
    <>
      <PageHero eyebrow="Before and after" title="Results, shown honestly." highlight="honestly" copy="Every case here is treated at one of our two Surat clinics and published only with the patient's written permission." hue="butter" proof={false}>
        <ul className="mt-6 flex flex-wrap gap-2">
          {caseCategories.map((c) => (
            <li key={c} className="rounded-full bg-white px-3.5 py-2 text-sm font-bold">
              {c}
            </li>
          ))}
        </ul>
      </PageHero>

      {hasResults ? (
        <section className="py-10 sm:py-14 lg:py-20">
          <Container width="7xl">
            <ResultsPreview limit={caseResults.length} />
            <p className="t-small mt-6 max-w-2xl text-ink-soft">{caseDisclaimer}</p>
          </Container>
        </section>
      ) : (
        <section className="py-10 sm:py-14 lg:py-20">
          <Container width="7xl">
            <SectionIntro eyebrow="Real results only" title="Cases go here as patients agree to share them." highlight="agree to share" copy="We publish a before and after only with the patient's written permission, and never a picture that is not a Kheni patient. Until then, the honest answer about what is possible for you is the one the dentist gives after looking." />
          </Container>
        </section>
      )}

      <section className="on-dark mood-ink bg-ink py-10 text-white sm:py-14 lg:py-20">
        <Container width="7xl">
          <SectionIntro eyebrow="Meanwhile, from the clinic" title="What a visit actually looks like." highlight="actually looks like" copy="Reels from @khenielite. Nothing plays until you tap." />
          <InstagramReels reels={featuredReels(5)} limit={5} placement="gallery_reels" className="mt-7" />
        </Container>
      </section>

      <section className="on-butter bg-butter py-10 text-ink sm:py-14 lg:py-20">
        <Container width="7xl">
          <SectionIntro eyebrow="On Google" title="What patients already say." highlight="already say" />
          <GoogleQuotes placement="gallery_quotes" className="mt-7" />
        </Container>
      </section>

      <CtaBand title="Want to know what is possible in your case?" highlight="your case" copy="The honest answer comes after looking. Book a consultation at either clinic." placement="gallery_final" />
    </>
  );
}
