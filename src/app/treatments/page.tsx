import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CtaBand } from "@/components/kheni/cta-band";
import { PageHero } from "@/components/kheni/page-hero";
import { SmileNote } from "@/components/kheni/smile-note";
import { TreatmentPoster, TreatmentRow } from "@/components/kheni/treatment-poster";
import { Container } from "@/components/ui/container";
import { smileNotes, treatments, type TreatmentCategory } from "@/content/site";
import { SectionIntro } from "@/components/kheni/section-intro";
import { IconServiceGrid } from "@/components/kheni/demo/icon-grid";
import { demoContentActive } from "@/content/demo";

export const metadata: Metadata = {
  alternates: { canonical: "/treatments/" },
  title: "Dental Treatments in Surat",
  description:
    "Dental implants, root canal treatment, braces and aligners, smile design, full mouth rehabilitation, crowns, kids dentistry, gum care, wisdom tooth, check-ups and fillings in Surat.",
};

const groups: { id: TreatmentCategory; label: string }[] = [
  { id: "restorative", label: "Replace and repair" },
  { id: "everyday", label: "Everyday dentistry" },
  { id: "cosmetic", label: "Straighten and brighten" },
  { id: "kids", label: "Children" },
  { id: "surgical", label: "Wisdom teeth" },
];

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        eyebrow={`${treatments.length} treatments · two clinics`}
        title="You do not need the name of the treatment."
        highlight="name"
        copy="Have a look through if it helps you put words to the problem. If it does not, tell us what you are feeling and the examination decides where care starts."
        hue="cobalt"
      >
        <Link href="/problems-we-treat/" className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 text-[.9375rem] font-semibold ring-1 ring-line">
          Start from what is bothering you
          <ArrowRight className="cta-arrow size-4 text-cobalt-deep" aria-hidden="true" />
        </Link>
      </PageHero>

      {/* Phone: compact rows grouped by need. Tablet and up: posters. */}
      <section className="py-8 sm:py-12 lg:py-16">
        <Container width="7xl">
          <div className="space-y-8 sm:hidden">
            {groups.map((group) => {
              const items = treatments.filter((t) => t.category === group.id);
              if (!items.length) return null;
              return (
                <div key={group.id}>
                  <h2 className="t-eyebrow text-ink-soft">{group.label}</h2>
                  <div className="mt-3 grid gap-2.5">
                    {items.map((t) => (
                      <TreatmentRow key={t.slug} treatment={t} placement="treatments_index" />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map((t, index) => (
              <TreatmentPoster key={t.slug} treatment={t} featured={index === 0} placement="treatments_index" />
            ))}
          </div>
        </Container>
      </section>

      <SmileNote note={smileNotes[4]} compact className="pb-10 sm:pb-14" />

      {demoContentActive && (
        <>
          <section className="hue-navy py-10 sm:py-14 lg:py-20">
            <Container width="7xl">
              <SectionIntro eyebrow="At a glance" title="Every service, one tap away." highlight="one tap" />
              <IconServiceGrid className="mt-6 sm:mt-8" />
            </Container>
          </section>

        </>
      )}

      <CtaBand title="Not sure which one you need? That is normal." highlight="normal" copy="Describe it in your own words. The examination sorts out the rest." placement="treatments_final" />
    </>
  );
}
