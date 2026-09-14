import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ConcernCards } from "@/components/kheni/concern-cards";
import { CtaBand } from "@/components/kheni/cta-band";
import { PageHero } from "@/components/kheni/page-hero";
import { SectionIntro } from "@/components/kheni/section-intro";
import { Container } from "@/components/ui/container";
import { treatments } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/problems-we-treat/" },
  title: "What Brings You In? Dental Problems We Treat in Surat",
  description:
    "Tooth pain, a missing tooth, crooked teeth, bleeding gums, a scared child, a wisdom tooth, a chipped tooth. Start with the problem and see what usually comes next at Kheni Dental, Surat.",
};

/**
 * The concern index. The cards for someone who recognises their problem in
 * two words, then the same complaints written as full sentences for someone
 * who does not. It never diagnoses; it points.
 */
export default function ProblemsPage() {
  return (
    <>
      <PageHero eyebrow="Start here" title="What is bothering you today?" highlight="today" copy="Pick the one that sounds closest. You do not have to name the problem correctly to get help with it, and a dentist checks the real cause." hue="coral" />

      <section className="py-10 sm:py-14 lg:py-20">
        <Container width="7xl">
          <ConcernCards placement="problems_cards" />
        </Container>
      </section>

      <section className="bg-white py-10 sm:py-14 lg:py-20">
        <Container width="7xl">
          <SectionIntro eyebrow="In your words" title="It usually starts with a sentence like one of these." highlight="a sentence" />
          <ul className="mt-6 divide-y divide-line border-y border-line lg:grid lg:grid-cols-2 lg:gap-x-12">
            {treatments.map((t) => (
              <li key={t.slug} className={`mood-${t.hue}`}>
                <Link href={`/treatments/${t.slug}/`} data-track="treatment_view" data-placement="problems_index" className="group flex items-center justify-between gap-4 py-5">
                  <span>
                    <span className="block font-accent text-[1.5rem] italic leading-tight sm:text-[1.75rem]">&ldquo;{t.concern}&rdquo;</span>
                    <span className="mt-1.5 inline-flex items-center gap-2 text-sm font-bold text-m-text">
                      <span aria-hidden="true" className="size-2 rounded-full bg-m-fill" />
                      {t.title}
                    </span>
                  </span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand title="Not on the list? Describe it in your own words." highlight="your own words" placement="problems_final" />
    </>
  );
}
