import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

import { CtaBand } from "@/components/kheni/cta-band";
import { PageHero } from "@/components/kheni/page-hero";
import { SectionIntro } from "@/components/kheni/section-intro";
import { Container } from "@/components/ui/container";
import { CallButton, WhatsAppButton } from "@/components/ui/cta";
import { resourceCategories, urgentSigns } from "@/content/patient-resources";

export const metadata: Metadata = {
  alternates: { canonical: "/patient-resources/" },
  title: "Patient Resources & Aftercare",
  description:
    "Practical guides from Kheni Dental, Surat: what to bring to a first visit, aftercare after a root canal, thinking about implants, bringing a child in, and when to call the clinic.",
};

/**
 * Patient help, not an article library. Only guides reviewed in this
 * repository are shown; the clinic's own aftercare sheets are listed in
 * docs/CLINIC-CONTENT-NEEDED.md and appear here when they arrive.
 */
export default function ResourcesPage() {
  const categories = resourceCategories
    .map((c) => ({ ...c, guides: c.guides.filter((g) => g.status === "published") }))
    .filter((c) => c.guides.length > 0);

  return (
    <>
      <PageHero
        eyebrow="Patient resources"
        title="The part that happens after you leave the chair."
        highlight="after"
        copy="Short guides for the day before an appointment and the days after one. Written to help you prepare and to tell you when something is worth a phone call."
        hue="sky"
        compact
      >
        <nav aria-label="Resource categories" className="mt-5 flex flex-wrap gap-2">
          {categories.map((c) => (
            <a key={c.id} href={`#${c.id}`} className={`hue-${c.hue} inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-medium ring-1 ring-line`}>
              <span aria-hidden="true" className="size-2 rounded-full bg-h-fill" />
              {c.label}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="hue-coral py-8 sm:py-10">
        <Container width="7xl">
          <div className="grid gap-5 rounded-[1.5rem] border border-coral/40 bg-coral-tint p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="t-eyebrow inline-flex items-center gap-2 text-coral-text">
                <AlertTriangle className="size-4" aria-hidden="true" />
                Call the clinic if you notice
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {urgentSigns.map((sign) => (
                  <li key={sign} className="flex items-start gap-2.5 text-[.9375rem] font-medium leading-snug">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-coral" />
                    {sign}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col">
              <CallButton placement="resources_urgent" variant="primary" label="Call the clinic" />
              <WhatsAppButton placement="resources_urgent" variant="secondary" />
            </div>
          </div>
        </Container>
      </section>

      {categories.map((category, index) => (
        <section key={category.id} id={category.id} className={`hue-${category.hue} anchor py-10 sm:py-14 ${index % 2 === 1 ? "bg-h-tint" : ""}`}>
          <Container width="7xl">
            <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:gap-14">
              <SectionIntro eyebrow={`0${index + 1}`} title={category.label} copy={category.intro} className="lg:sticky lg:top-24 lg:self-start" />
              <div className="grid gap-4">
                {category.guides.map((guide) => (
                  <article key={guide.id} id={guide.id} className="anchor rounded-[1.5rem] bg-white p-5 ring-1 ring-line sm:p-6">
                    <h3 className="t-h3">{guide.title}</h3>
                    <p className="t-small mt-1.5 text-ink-soft">{guide.summary}</p>
                    {guide.status === "published" && (
                      <ol className="mt-4 grid gap-2.5">
                        {guide.points.map((point, i) => (
                          <li key={point} className="flex gap-3 rounded-xl bg-h-tint p-4 text-[.9375rem] leading-6">
                            <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-h-fill text-xs font-bold text-h-on-fill">{i + 1}</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ))}

      <section className="py-8 sm:py-10">
        <Container width="7xl">
          <p className="t-small max-w-3xl text-ink-soft">
            These guides are general information, written to help you prepare and ask better questions. They cannot tell you what is happening in your own mouth. If anything here does not match what you were told at the clinic, go with what the doctor treating you said and ask them about the difference.
          </p>
        </Container>
      </section>

      <CtaBand title="Something not covered here? Just ask." highlight="ask" placement="resources_final" hue="sky" />
    </>
  );
}
