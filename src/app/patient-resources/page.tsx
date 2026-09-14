import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

import { CtaBand } from "@/components/kheni/cta-band";
import { PageHero } from "@/components/kheni/page-hero";
import { ResourceLibrary } from "@/components/kheni/resource-library";
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
  const categories = resourceCategories.map((c) => ({ ...c, guides: c.guides.filter((g) => g.status === "published") })).filter((c) => c.guides.length > 0);

  return (
    <>
      <PageHero eyebrow="Patient resources" title="The part that happens after you leave the chair." highlight="after" copy="Short guides for the day before an appointment and the days after one. Written to help you prepare and to tell you when something is worth a phone call." hue="blue" compact proof={false} curve="var(--coral)" />

      <section className="on-coral mood-coral bg-coral py-8 text-ink sm:py-10">
        <Container width="7xl" className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="t-eyebrow inline-flex items-center gap-2">
              <AlertTriangle className="size-4" aria-hidden="true" />
              Call the clinic if you notice
            </p>
            <ul className="mt-3 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
              {urgentSigns.map((sign) => (
                <li key={sign} className="flex items-start gap-2.5 font-display text-lg font-bold leading-snug tracking-[-.01em]">
                  <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-ink" />
                  {sign}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col">
            <CallButton placement="resources_urgent" variant="ink" label="Call the clinic" />
            <WhatsAppButton placement="resources_urgent" />
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-14 lg:py-20">
        <Container width="7xl">
          <ResourceLibrary categories={categories} />
          <p className="t-small mt-12 max-w-3xl text-ink-soft">These guides are general information, written to help you prepare and ask better questions. They cannot tell you what is happening in your own mouth. If anything here does not match what you were told at the clinic, go with what the doctor treating you said and ask them about the difference.</p>
        </Container>
      </section>

      <CtaBand title="Something not covered here? Just ask." highlight="Just ask" placement="resources_final" />
    </>
  );
}
