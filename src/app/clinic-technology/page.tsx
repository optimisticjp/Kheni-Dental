import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { ImplantSystemRail, TechnologyGrid } from "@/components/kheni/capability-grids";
import { ClinicGallery } from "@/components/kheni/clinic-gallery";
import { PageHero } from "@/components/kheni/page-hero";
import { showContentGaps } from "@/components/kheni/pending";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { whatsappUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "What We Check Before We Treat You",
  description:
    "How Kheni Dental in Surat assesses a tooth before treating it, and where implant work is planned. Two clinics, at Yogi Chowk and Hirabaug.",
};

/**
 * Technology.
 *
 * WHY THIS PAGE IS NOT A SPECIFICATION LIST
 * It used to be one, and it was made almost entirely of holes: four equipment
 * cards reading "[ Equipment name ]", four implant-system cards reading
 * "Implant system 01" beside a box marked LOGO, and a list of four surgical
 * techniques none of which is confirmed. Around them the copy explained the
 * clinic's own content backlog to the patient — "we are waiting on the exact
 * names", "each needs confirming separately" — which is the website talking
 * about itself in front of the person it is meant to be helping.
 *
 * What a patient wants from this page is not a machine list. It is an answer
 * to: will you look properly before you touch my teeth. That question can be
 * answered today, entirely from what the clinic has already confirmed, so
 * that is what the page does. Brand names and photographs slot in above it
 * the moment they exist.
 */

/** What actually happens before treatment. Every line is already published
 *  elsewhere on the site; nothing here is new clinical ground. */
const assessment = [
  {
    id: "look",
    title: "We look at the tooth and everything around it",
    copy: "The tooth itself, the gum around it, how your bite meets and the teeth on either side. A tooth that hurts is often not the tooth that is causing it.",
  },
  {
    id: "image",
    title: "Implant planning needs imaging, not just an examination",
    copy: "Bone cannot be judged by looking. Planning an implant commonly needs radiographic assessment so the bone and the structures near it can be seen before anything is placed. Your dentist decides what is appropriate for your case.",
  },
  {
    id: "explain",
    title: "You see what we saw",
    copy: "We go through what the examination and the imaging show, what the options are, and what each one involves in stages and visits, before you decide what happens next.",
  },
] as const;

export default function ClinicTechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Before treatment"
        title="What we check before we treat you."
        copy="Most of what goes wrong with dental work goes wrong at the planning stage. This is what an assessment at Kheni Dental actually involves."
      />

      {/* ── The assessment sequence ───────────────────────────────────────── */}
      <Section spacing="md">
        <Container width="7xl">
          <ol className="grid gap-4 lg:grid-cols-3">
            {assessment.map((step, index) => (
              <li key={step.id} className="rounded-2xl border border-border bg-card p-6 sm:p-7">
                <span aria-hidden="true" className="font-mono text-[.65rem] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="t-card mt-3">{step.title}</h2>
                <p className="t-small mt-3 text-muted-foreground">{step.copy}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── Where implant work is planned ─────────────────────────────────── */}
      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
            <div>
              <p className="t-eyebrow text-gold">Elite Implant Center</p>
              <h2 className="t-h2 mt-4">Implant cases are planned from Hirabaug.</h2>
              <p className="t-stand measure-body mt-5 text-muted-foreground">
                Both clinics do everyday dentistry. Implant work, full mouth cases and smile design are led from the
                Hirabaug clinic by Dr. Mayur Kheni, so the planning, the surgery and the follow-up all sit with the
                same dentist rather than being handed between them.
              </p>
              <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
                <Link
                  href="/treatments/dental-implants-surat/"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white sm:whitespace-nowrap"
                >
                  How implants work here
                  <ArrowRight className="cta-arrow size-4 text-gold" aria-hidden="true" />
                </Link>
                <a
                  href={whatsappUrl("Hello Kheni Dental, I would like to ask about an assessment.")}
                  target="_blank"
                  rel="noreferrer"
                  data-track="whatsapp_click"
                  data-placement="technology"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-border bg-white px-6 text-sm font-semibold sm:whitespace-nowrap"
                >
                  <MessageCircle className="size-4 text-gold" aria-hidden="true" />
                  Ask a question
                </a>
              </div>
            </div>

            <ClinicGallery tone="light" branchLabel="Hirabaug" bleed={false} />
          </div>
        </Container>
      </Section>

      {/*
        Equipment and implant systems. Both grids render nothing while the
        clinic has not named a machine or a system, so the whole block is
        behind the review switch rather than leaving two headings over an
        empty page. It returns on its own once there is one real name.
      */}
      {showContentGaps && (
        <Section spacing="md">
          <Container width="7xl">
            <h2 className="t-h2">Equipment</h2>
            <div className="mt-8">
              <TechnologyGrid />
            </div>
            <h2 className="t-h2 mt-12">Implant systems</h2>
            <div className="mt-8">
              <ImplantSystemRail tone="light" />
            </div>
          </Container>
        </Section>
      )}

      {/* ── Both clinics ──────────────────────────────────────────────────── */}
      <Section spacing="md">
        <Container width="7xl">
          <div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <p className="t-h3 measure-narrow">Two clinics in Surat, and you can visit either.</p>
            <Link
              href="/locations/"
              className="inline-flex min-h-13 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white"
            >
              See both clinics
              <ArrowRight className="cta-arrow size-4 text-gold" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
