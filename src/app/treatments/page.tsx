import type { Metadata } from "next";

import { BrandLine } from "@/components/kheni/brand-line";
import { ConcernCards } from "@/components/kheni/concern-cards";
import { CtaBand } from "@/components/kheni/cta-band";
import { PageHero } from "@/components/kheni/page-hero";
import { SectionIntro } from "@/components/kheni/section-intro";
import { TreatmentLine } from "@/components/kheni/treatment-cards";
import { Container } from "@/components/ui/container";
import { treatments, type TreatmentCategory } from "@/content/site";

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
  let n = 0;
  return (
    <>
      <PageHero eyebrow={`${treatments.length} treatments · two clinics`} title="You do not need the name of the treatment." highlight="the name" copy="Have a look through if it helps you put words to the problem. If it does not, tell us what you are feeling and the examination decides where care starts." hue="blue" />

      <section className="py-10 sm:py-14 lg:py-20">
        <Container width="7xl" className="grid gap-10 lg:grid-cols-[.6fr_1.4fr] lg:gap-16 [&>*]:min-w-0">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionIntro eyebrow="Everything we do" title="Eleven treatments, in the order people usually need them." highlight="usually need them" />
          </div>
          <div>
            {groups.map((group) => {
              const items = treatments.filter((t) => t.category === group.id);
              if (!items.length) return null;
              return (
                <div key={group.id} className="mb-10 last:mb-0">
                  <h2 className="t-eyebrow text-ink-soft">{group.label}</h2>
                  <div className="mt-2">
                    {items.map((t) => (
                      <TreatmentLine key={t.slug} treatment={t} index={n++} placement="treatments_index" />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-10 sm:py-14 lg:py-20">
        <Container width="7xl">
          <SectionIntro eyebrow="Or start here" title="Start from what is bothering you." highlight="bothering you" />
          <ConcernCards placement="treatments_concerns" className="mt-7" />
        </Container>
      </section>

      <BrandLine id="plan" />

      <CtaBand title="Not sure which one you need? That is normal." highlight="normal" copy="Describe it in your own words. The examination sorts out the rest." placement="treatments_final" />
    </>
  );
}
