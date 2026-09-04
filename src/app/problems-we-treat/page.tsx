import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ConcernFinder } from "@/components/kheni/concern-finder";
import { CtaBand } from "@/components/kheni/cta-band";
import { PageHero } from "@/components/kheni/page-hero";
import { SectionIntro } from "@/components/kheni/section-intro";
import { Container } from "@/components/ui/container";
import { treatments } from "@/content/site";
import { HorizontalAccordion } from "@/components/kheni/demo/horizontal-accordion";
import { demoContentActive } from "@/content/demo";

export const metadata: Metadata = {
  alternates: { canonical: "/problems-we-treat/" },
  title: "What Brings You In? Dental Problems We Treat in Surat",
  description:
    "Tooth pain, a missing tooth, crooked teeth, bleeding gums, a scared child, a wisdom tooth, a chipped tooth. Start with the problem and see what usually comes next at Kheni Dental, Surat.",
};

/**
 * The concern index. The finder for someone who recognises their problem in
 * two words, then the same complaints written as full sentences for someone
 * who does not. It never diagnoses; it points.
 */
export default function ProblemsPage() {
  return (
    <>
      <PageHero
        eyebrow="Start here"
        title="What brings you in today?"
        highlight="today"
        copy="Pick the one that sounds closest. You do not have to name the problem correctly to get help with it, and a dentist checks the real cause."
        hue="teal"
      />

      <section className="hue-teal py-8 sm:py-12 lg:py-16">
        <Container width="7xl">
          <ConcernFinder />
        </Container>
      </section>

      <section className="bg-porcelain py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <SectionIntro eyebrow="In your words" title="It usually starts with a sentence like one of these." highlight="sentence" />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map((t) => (
              <li key={t.slug} className={`hue-${t.hue}`}>
                <Link
                  href={`/treatments/${t.slug}/`}
                  data-track="treatment_view"
                  data-placement="problems_index"
                  className="lift flex h-full flex-col rounded-2xl border border-line bg-white p-5"
                >
                  <span aria-hidden="true" className="h-1.5 w-10 rounded-full bg-h-fill" />
                  <h2 className="mt-3 font-serif text-[1.35rem] font-medium leading-snug tracking-[-.02em]">&ldquo;{t.concern}&rdquo;</h2>
                  <p className="t-small mt-2 flex-1 text-ink-soft">{t.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-h-text">
                    {t.title}
                    <ArrowUpRight className="cta-arrow size-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {demoContentActive && (
        <section className="hue-teal py-10 sm:py-14 lg:py-20">
          <Container width="7xl">
            <SectionIntro eyebrow="All fourteen" title="Open one, swipe for the rest." highlight="swipe" copy="The horizontal expanding accordion, on the phone as well as the desktop." />
            <HorizontalAccordion className="mt-6 sm:mt-8" />
          </Container>
        </section>
      )}

      <CtaBand title="Not on the list? Describe it in your own words." highlight="your own words" placement="problems_final" hue="teal" />
    </>
  );
}
