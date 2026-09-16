import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CtaBand } from "@/components/kheni/cta-band";
import { PageHero } from "@/components/kheni/page-hero";
import { SectionIntro } from "@/components/kheni/section-intro";
import { Container } from "@/components/ui/container";
import { implantSystems } from "@/content/capabilities";
import { treatments } from "@/content/site";
import { technology } from "@/content/technology";

export const metadata: Metadata = {
  alternates: { canonical: "/technology/" },
  title: "Clinic Technology",
  description:
    "The equipment behind a visit to Kheni Dental, Surat: digital X-ray, intraoral scanner and camera, dental microscope, rotary root canal system, implant planning and guided surgery, autoclave sterilisation.",
};

/**
 * Technology by category, exactly as the clinic ticked it on its form.
 * No brand, no model, no "latest". Each item says what it does for you.
 */
export default function TechnologyPage() {
  const byTreatment = (slug: string) => treatments.find((t) => t.slug === slug);
  return (
    <>
      <PageHero
        eyebrow="Inside the clinic"
        title="The equipment is there so you can see what we see."
        highlight="see what we see"
        copy="A camera that shows you the tooth on a screen, X-rays that appear while you wait, a microscope for the fine work inside a root canal. Here is what we use and why."
        hue="sky"
        tone="light"
        field="sky"
        compact
      />

      <section className="sec">
        <Container width="7xl">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {technology.map((item, i) => (
              <li key={item.id} className="flex flex-col rounded-[1.5rem] border border-line bg-white p-5">
                <span className="font-serif text-2xl text-gold-text">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="t-card mt-2">{item.title}</h2>
                <p className="t-small mt-1.5 flex-1 text-ink-soft">{item.copy}</p>
                {item.treatmentSlugs.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {item.treatmentSlugs.map((slug) => {
                      const t = byTreatment(slug);
                      return t ? (
                        <li key={slug}>
                          <Link href={`/treatments/${slug}/`} className={`hue-${t.hue} inline-flex min-h-8 items-center rounded-full bg-h-tint px-2.5 text-[.75rem] font-medium`}>
                            {t.shortTitle}
                          </Link>
                        </li>
                      ) : null;
                    })}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <p className="t-small mt-5 max-w-2xl text-ink-soft">
            Listed by category. Makes and models are given on request at the clinic, and having a machine is not the same as needing it: what is used for you depends on your case.
          </p>
        </Container>
      </section>

      <section className="bg-sand sec">
        <Container width="7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-12">
            <div>
              <SectionIntro eyebrow="Implants" title={implantSystems.title} highlight="work with" copy={implantSystems.note} />
              <ul className="mt-5 flex flex-wrap gap-2">
                {implantSystems.items.map((s) => (
                  <li key={s.name} className="rounded-full bg-white px-4 py-2 text-sm font-semibold ring-1 ring-line">
                    {s.name} <span className="font-normal text-ink-soft">· {s.country}</span>
                  </li>
                ))}
              </ul>
              <Link href="/treatments/dental-implants-surat/" className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink">
                How implant planning works
                <ArrowUpRight className="cta-arrow size-4 text-gold-text" aria-hidden="true" />
              </Link>
            </div>
            <div className="rounded-[1.5rem] bg-white p-5 ring-1 ring-line sm:p-6">
              <p className="t-eyebrow text-gold-text">Sterilisation</p>
              <p className="t-body mt-3 text-ink-soft">
                Instruments are cleaned, sealed in pouches and sterilised in an autoclave between patients. Single-use items are used once. Ask to see the sterilisation area; the team will show you.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand title="Ask us what any of it is for." highlight="what any of it is for" copy="Point at anything on the tray and ask what it does. Nobody here minds the question." placement="technology_final" />
    </>
  );
}
