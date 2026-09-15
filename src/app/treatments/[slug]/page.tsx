import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";

import {
  AlignerMovementDiagram,
  BiteMapDiagram,
  BridgeDiagram,
  CariesDiagram,
  CrownDiagram,
  GumStagesDiagram,
  KidsTeethDiagram,
  RootCanalStagesDiagram,
  SmileLineDiagram,
  ToothSectionDiagram,
  WisdomImpactionDiagram,
} from "@/components/kheni/art/anatomy";
import { TreatmentArt } from "@/components/kheni/art/treatment-art";
import { CtaBand } from "@/components/kheni/cta-band";
import { DoctorCard, TeamLink } from "@/components/kheni/doctor-spotlight";
import { MediaFrame } from "@/components/kheni/media-frame";
import { PageHero } from "@/components/kheni/page-hero";
import { ProcessSteps } from "@/components/kheni/process-steps";
import { MetricRow } from "@/components/kheni/proof";
import { ProofCluster } from "@/components/kheni/proof";
import { ResultsPreview } from "@/components/kheni/results-preview";
import { SectionIntro } from "@/components/kheni/section-intro";
import { SmileNote } from "@/components/kheni/smile-note";
import { TreatmentRow } from "@/components/kheni/treatment-poster";
import { ViewTracker } from "@/components/kheni/implant/view-tracker";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { BookButton, WhatsAppButton } from "@/components/ui/cta";
import { caseCategories } from "@/content/cases";
import { metricsFor, type ProofMetric } from "@/content/clinic-proof";
import { treatmentVisual } from "@/content/photos";
import { editorialLines } from "@/content/review-sample";
import { doctors, treatments } from "@/content/site";
import { technologyFor } from "@/content/technology";

export function generateStaticParams() {
  return treatments.filter((t) => t.slug !== "dental-implants-surat").map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const treatment = treatments.find((t) => t.slug === slug);
  if (!treatment) return {};
  return { title: treatment.seoTitle, description: treatment.metaDescription, alternates: { canonical: `/treatments/${slug}/` } };
}

/** Treatments whose results can be photographed, so the results block is shown. */
const resultCategories = new Set(caseCategories.map((c) => c.toLowerCase()));

/** Clinic figures that belong on a treatment page, by slug. From clinic-proof.ts, never typed here. */
const METRIC_PLACEMENT: Record<string, ProofMetric["placements"][number]> = {
  "kids-dentistry-surat": "kids",
  "full-mouth-rehabilitation": "full-mouth",
  "cosmetic-smile-dentistry": "smile",
  "root-canal-treatment-surat": "rct",
};

/**
 * One diagram per treatment, each answering the question a patient has on
 * that page. The caption under each is the question it answers.
 */
const DIAGRAMS: Record<string, { caption: string; Diagram: React.ComponentType<{ className?: string }>[] }> = {
  "root-canal-treatment-surat": { caption: "What a root canal actually does, in three stages.", Diagram: [RootCanalStagesDiagram, ToothSectionDiagram] },
  "tooth-fillings-surat": { caption: "How deep a cavity has gone decides what it needs.", Diagram: [CariesDiagram, ToothSectionDiagram] },
  "gum-care-surat": { caption: "Where healthy gums end and gum disease begins.", Diagram: [GumStagesDiagram] },
  "crowns-and-bridges": { caption: "A crown fits over a tooth. A bridge spans a gap.", Diagram: [CrownDiagram, BridgeDiagram] },
  "wisdom-tooth-oral-surgery": { caption: "Why a wisdom tooth with no room hurts.", Diagram: [WisdomImpactionDiagram] },
  "braces-clear-aligners": { caption: "How a clear tray moves teeth a little at a time.", Diagram: [AlignerMovementDiagram] },
  "kids-dentistry-surat": { caption: "The adult tooth is already waiting underneath.", Diagram: [KidsTeethDiagram] },
  "cosmetic-smile-dentistry": { caption: "The six teeth people mean when they say their smile.", Diagram: [SmileLineDiagram] },
  "full-mouth-rehabilitation": { caption: "How several separate problems become one plan.", Diagram: [BiteMapDiagram] },
  "dental-check-up-surat": { caption: "What the dentist is looking at, layer by layer.", Diagram: [ToothSectionDiagram] },
  "teeth-whitening-surat": { caption: "Stain sits on the enamel. Colour can come from deeper.", Diagram: [ToothSectionDiagram] },
  "dentures-surat": { caption: "What a denture rests on, and what an implant gives it to hold.", Diagram: [BridgeDiagram] },
};

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "dental-implants-surat") redirect("/treatments/dental-implants-surat/");
  const treatment = treatments.find((t) => t.slug === slug);
  if (!treatment) notFound();

  const team = doctors.filter((d) => treatment.doctorSlugs.includes(d.slug));
  const related = treatments.filter((t) => t.slug !== slug && t.category === treatment.category).slice(0, 3);
  const more = related.length < 3 ? treatments.filter((t) => t.slug !== slug && !related.includes(t)).slice(0, 3 - related.length) : [];
  const showResults = resultCategories.has(treatment.title.toLowerCase()) || treatment.slug === "cosmetic-smile-dentistry";
  const kids = treatment.slug === "kids-dentistry-surat";
  const lead = team[0];
  const leadLine = lead ? editorialLines.find((l) => l.doctorSlug === lead.slug) : undefined;
  const diagrams = DIAGRAMS[treatment.slug];
  const visual = treatmentVisual(treatment.slug);
  const tech = technologyFor(treatment.slug);
  const metricPlacement = METRIC_PLACEMENT[treatment.slug];
  const metrics = metricPlacement ? metricsFor(metricPlacement) : [];
  const stepColumns = treatment.visit.length === 5 ? 5 : treatment.visit.length === 6 ? 3 : 4;

  return (
    <>
      <ViewTracker event="treatment_view" placement={`treatment_${treatment.slug}`} />
      <PageHero
        eyebrow={treatment.concern}
        title={treatment.headline}
        copy={treatment.short}
        hue={treatment.hue}
        tone={kids ? "light" : "dark"}
        field={kids ? "butter" : undefined}
        aside={
          <MediaFrame
            ratio="4 / 3"
            mobileRatio="16 / 9"
            from="lg"
            src={visual?.src}
            alt={visual?.alt}
            objectPosition={visual?.objectPosition}
            tone={kids ? "light" : "dark"}
            className={kids ? "rounded-[1.5rem] ring-1 ring-ink/10" : "rounded-[1.5rem] border border-ivory/10"}
          >
            <div className={`hue-${treatment.hue} absolute inset-0 bg-h-tint`}>
              <TreatmentArt slug={treatment.slug} className="absolute inset-0 size-full" title={`${treatment.title} illustration`} />
            </div>
          </MediaFrame>
        }
      >
        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <BookButton placement={`treatment_hero_${treatment.slug}`} />
          <WhatsAppButton placement={`treatment_hero_${treatment.slug}`} message={treatment.whatsappMessage} label="Ask on WhatsApp" variant={kids ? "secondary" : "onDark"} />
        </div>
      </PageHero>

      {/* ── What it is, and when ─────────────────────────────────────── */}
      <section className={`hue-${treatment.hue} py-10 sm:py-14 lg:py-18`}>
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-14">
            <div>
              <SectionIntro eyebrow={treatment.title} title={treatment.plainTitle.title} highlight={treatment.plainTitle.highlight} />
              <p className="t-stand measure-body mt-5 text-ink-soft">{treatment.intro}</p>
              {metrics.length > 0 && <MetricRow metrics={metrics} className="mt-6" />}
            </div>
            <div className="rounded-[1.5rem] bg-h-tint p-5 sm:p-6">
              <p className="t-eyebrow text-gold-text">{kids ? "Bring your child in for" : "You might need this if"}</p>
              <ul className="mt-4 space-y-2.5">
                {treatment.signs.map((sign) => (
                  <li key={sign} className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 text-[.9375rem] font-medium leading-snug">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ink text-gold">
                      <Check className="size-3" aria-hidden="true" />
                    </span>
                    {sign}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {diagrams && (
            <div className="mt-8 space-y-4 sm:mt-10">
              <p className="t-eyebrow text-gold-text">{diagrams.caption}</p>
              {diagrams.Diagram.map((Diagram, i) => (
                <div key={i} className="rounded-[1.5rem] bg-white p-4 ring-1 ring-line sm:p-6 lg:p-8">
                  <Diagram />
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ── What the clinic offers, from its own form ────────────────── */}
      {(treatment.offer || treatment.brands) && (
        <section className="bg-white py-10 sm:py-14 lg:py-18">
          <Container width="7xl">
            <div className={`hue-${treatment.hue} grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:gap-12`}>
              {treatment.offer && (
                <div>
                  <SectionIntro eyebrow="At Kheni" title={treatment.offer.title} />
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {treatment.offer.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 rounded-xl border border-line bg-ivory px-4 py-3 text-[.9375rem] leading-snug">
                        <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-h-fill" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {treatment.offer.note && <p className="t-small mt-3 text-ink-soft">{treatment.offer.note}</p>}
                </div>
              )}
              <div className="grid gap-4 content-start">
                {treatment.brands && (
                  <div className="rounded-[1.5rem] bg-h-tint p-5 sm:p-6">
                    <p className="t-eyebrow text-gold-text">{treatment.brands.title}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {treatment.brands.items.map((b) => (
                        <li key={b} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold ring-1 ring-line">
                          {b}
                        </li>
                      ))}
                    </ul>
                    {treatment.brands.note && <p className="t-small mt-3 text-ink-soft">{treatment.brands.note}</p>}
                  </div>
                )}
                {tech.length > 0 && (
                  <div className="rounded-[1.5rem] border border-line bg-ivory p-5 sm:p-6">
                    <p className="t-eyebrow text-gold-text">Used for this treatment</p>
                    <ul className="mt-3 grid gap-2">
                      {tech.map((t) => (
                        <li key={t.id} className="text-sm leading-snug">
                          <span className="font-semibold">{t.title}.</span> <span className="text-ink-soft">{t.copy}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/technology/" className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-gold-text">
                      All clinic technology
                      <ArrowUpRight className="cta-arrow size-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ── At a visit ───────────────────────────────────────────────── */}
      <section className={`hue-${treatment.hue} bg-h-tint py-10 sm:py-14 lg:py-18`}>
        <Container width="7xl">
          <SectionIntro eyebrow="At your visit" title={treatment.visitTitle.title} highlight={treatment.visitTitle.highlight} />
          <ProcessSteps steps={treatment.visit} columns={stepColumns} className="mt-6 sm:mt-8" variant="cards" />
          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[1.5rem] bg-white p-5 ring-1 ring-line sm:p-6">
              <p className="t-eyebrow text-gold-text">What to expect after</p>
              <ul className="mt-3 space-y-2">
                {treatment.expect.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[.9375rem] leading-6 text-ink">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-h-fill" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="on-dark grain rounded-[1.5rem] border border-gold/20 bg-ink-2 p-5 text-ivory sm:p-6">
              <p className="t-eyebrow text-gold">Worth knowing</p>
              <p className="t-card mt-3">{treatment.worthKnowing.title}</p>
              <p className="t-body mt-2 text-ivory/70">{treatment.worthKnowing.copy}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Who handles it ───────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <SectionIntro
            eyebrow="Who you will see"
            title={team.length ? "The dentists who do this every week." : treatment.teamLabel ? `${treatment.teamLabel}.` : "Any of our four dentists."}
            highlight={team.length ? "every week" : treatment.teamLabel ?? "four dentists"}
            copy={
              team.length
                ? undefined
                : treatment.teamLabel
                  ? "Assessment and planning are handled by our orthodontic care team. Book at either clinic and you will be told who is looking after your case before treatment starts."
                  : "Book at either clinic and tell us what is troubling you. The dentist you see will examine you and explain the plan."
            }
          />
          {lead && leadLine && (
            <figure className="mt-6 rounded-[1.5rem] bg-peach px-6 py-6 sm:px-8 sm:py-7">
              <span aria-hidden="true" className="rule-gold block h-px w-12" />
              <p className="t-quote mt-4 font-serif text-ink">{leadLine.line}</p>
              <figcaption className="t-eyebrow mt-3 text-gold-text">In the words of the Kheni team</figcaption>
            </figure>
          )}
          {team.length > 0 ? (
            <div className={`mt-6 grid gap-4 sm:grid-cols-2 ${team.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
              {team.map((doctor) => (
                <DoctorCard key={doctor.slug} doctor={doctor} compact={team.length >= 4} />
              ))}
            </div>
          ) : null}
          <TeamLink />
        </Container>
      </section>

      {showResults && (
        <section className="bg-sand py-10 sm:py-14 lg:py-18">
          <Container width="7xl">
            <SectionIntro eyebrow="Results" title="Before and after, shown honestly." highlight="honestly" />
            <ResultsPreview limit={2} placement={`treatment_results_${treatment.slug}`} className="mt-6" />
          </Container>
        </section>
      )}

      <SmileNote note={{ line: treatment.note.line, highlight: treatment.note.highlight, hue: treatment.hue }} tone={kids ? "light" : "dark"} field={kids ? "mint" : undefined} />

      {/* ── Proof and questions ──────────────────────────────────────── */}
      <section className={`hue-${treatment.hue} py-10 sm:py-14 lg:py-18`}>
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
            <div>
              <SectionIntro eyebrow="Questions" title={`${treatment.title} questions people ask.`} highlight="people ask" />
              <ProofCluster placement={`treatment_proof_${treatment.slug}`} className="mt-6" />
            </div>
            <Accordion items={treatment.faqs} name={`faq-${treatment.slug}`} />
          </div>
        </Container>
      </section>

      {/* ── Related ──────────────────────────────────────────────────── */}
      <section className="pb-10 sm:pb-14">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="t-h3">Related treatments</h2>
            <Link href="/treatments/" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink">
              All treatments
              <ArrowUpRight className="cta-arrow size-4 text-gold-text" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {[...related, ...more].map((t) => (
              <TreatmentRow key={t.slug} treatment={t} placement={`treatment_related_${treatment.slug}`} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title={treatment.ctaTitle}
        placement={`treatment_final_${treatment.slug}`}
        hue={treatment.hue}
        copy="Two clinics in Surat, at Yogi Chowk and Hirabaug. Book a time or send a message and we will suggest which is easier for you."
        whatsappMessage={treatment.whatsappMessage}
      />
    </>
  );
}
