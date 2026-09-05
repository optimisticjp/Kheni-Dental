import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";

import { ToothAnatomyDiagram } from "@/components/kheni/art/diagrams";
import { TreatmentArt } from "@/components/kheni/art/treatment-art";
import { CtaBand } from "@/components/kheni/cta-band";
import { DoctorCard, TeamLink } from "@/components/kheni/doctor-spotlight";
import { MediaFrame } from "@/components/kheni/media-frame";
import { PageHero } from "@/components/kheni/page-hero";
import { ProcessSteps } from "@/components/kheni/process-steps";
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
import { treatmentPhotos } from "@/content/photos";
import { doctors, locations, smileNotes, treatments } from "@/content/site";
import { TestimonialCard } from "@/components/kheni/demo/testimonial-wall";
import { ResultDump } from "@/components/kheni/demo/result-gallery";
import { demoContentActive, demoTestimonials } from "@/content/demo";

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

/** A diagram belongs where the question is "what part of my tooth is treated?" */
const anatomySlugs = new Set(["root-canal-treatment-surat", "tooth-fillings-surat", "gum-care-surat"]);

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
  const note = smileNotes.find((n) => n.hue === treatment.hue) ?? smileNotes[1];

  return (
    <>
      <ViewTracker event="treatment_view" placement={`treatment_${treatment.slug}`} />
      <PageHero
        eyebrow={treatment.concern}
        title={treatment.headline}
        copy={treatment.short}
        hue={treatment.hue}
        aside={
          <MediaFrame
            ratio="4 / 3"
            mobileRatio="16 / 9"
            from="lg"
            src={treatmentPhotos[treatment.slug]?.src}
            alt={treatmentPhotos[treatment.slug]?.alt}
            objectPosition={treatmentPhotos[treatment.slug]?.objectPosition}
            className="rounded-[1.75rem] bg-white ring-1 ring-line"
          >
            <div className={`hue-${treatment.hue} absolute inset-0 bg-h-tint`}>
              <TreatmentArt slug={treatment.slug} className="absolute inset-0 size-full" title={`${treatment.title} illustration`} />
            </div>
          </MediaFrame>
        }
      >
        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <BookButton placement={`treatment_hero_${treatment.slug}`} />
          <WhatsAppButton placement={`treatment_hero_${treatment.slug}`} message={treatment.whatsappMessage} label="Ask on WhatsApp" variant="secondary" />
        </div>
      </PageHero>

      {/* ── What it is, and when ─────────────────────────────────────── */}
      <section className={`hue-${treatment.hue} py-10 sm:py-14 lg:py-18`}>
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-14">
            <div>
              <SectionIntro eyebrow={treatment.title} title={`What ${treatment.title.toLowerCase()} ${treatment.title.endsWith("s") ? "are" : "is"}, in plain words.`} highlight="plain words" />
              <p className="t-stand measure-body mt-5 text-ink-soft">{treatment.intro}</p>
              {anatomySlugs.has(treatment.slug) && (
                <div className="mt-6 rounded-[1.5rem] bg-white p-4 ring-1 ring-line sm:p-6">
                  <ToothAnatomyDiagram className="mx-auto w-full max-w-md" />
                </div>
              )}
            </div>
            <div className="rounded-[1.5rem] bg-h-tint p-5 sm:p-6">
              <p className="t-eyebrow text-h-text">{kids ? "Bring your child in for" : "You might need this if"}</p>
              <ul className="mt-4 space-y-2.5">
                {treatment.signs.map((sign) => (
                  <li key={sign} className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 text-[.9375rem] font-medium leading-snug">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-h-fill text-h-on-fill">
                      <Check className="size-3" aria-hidden="true" />
                    </span>
                    {sign}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ── At a visit ───────────────────────────────────────────────── */}
      <section className={`hue-${treatment.hue} bg-h-tint py-10 sm:py-14 lg:py-18`}>
        <Container width="7xl">
          <SectionIntro eyebrow="At your visit" title="What happens, step by step." highlight="step by step" />
          <ProcessSteps steps={treatment.visit} columns={treatment.visit.length === 5 ? 5 : 4} className="mt-6 sm:mt-8" />
          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[1.5rem] bg-white p-5 ring-1 ring-line sm:p-6">
              <p className="t-eyebrow text-h-text">What to expect after</p>
              <ul className="mt-3 space-y-2">
                {treatment.expect.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[.9375rem] leading-6 text-ink">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-h-fill" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.5rem] bg-ink p-5 text-white sm:p-6">
              <p className="t-eyebrow text-sunshine">Worth knowing</p>
              <p className="t-card mt-3">{treatment.worthKnowing.title}</p>
              <p className="t-body mt-2 text-white/75">{treatment.worthKnowing.copy}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Who handles it ───────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <SectionIntro eyebrow="Who you will see" title={team.length ? `Who handles ${treatment.title.toLowerCase()} at Kheni.` : "Any of our four dentists."} highlight={team.length ? "Who handles" : "four dentists"} copy={team.length ? undefined : "Book at either clinic and tell us what is troubling you. The dentist you see will examine you and explain the plan."} />
          {team.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((doctor) => (
                <DoctorCard key={doctor.slug} doctor={doctor} />
              ))}
            </div>
          ) : null}
          <TeamLink />
        </Container>
      </section>

      {showResults && (
        <section className="hue-sunshine bg-sunshine-tint py-10 sm:py-14 lg:py-18">
          <Container width="7xl">
            <SectionIntro eyebrow="Results" title="Before and after, shown honestly." highlight="honestly" />
            <ResultsPreview limit={2} placement={`treatment_results_${treatment.slug}`} className="mt-6" />
          </Container>
        </section>
      )}

      <SmileNote note={note} compact className={showResults ? "py-10 sm:py-14" : "pb-4"} />

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
            <Link href="/treatments/" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-cobalt-deep">
              All treatments
              <ArrowUpRight className="cta-arrow size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {[...related, ...more].map((t) => (
              <TreatmentRow key={t.slug} treatment={t} placement={`treatment_related_${treatment.slug}`} />
            ))}
          </div>
        </Container>
      </section>

      {demoContentActive && (
        <section className={`hue-${treatment.hue} py-10 sm:py-14 lg:py-18`}>
          <Container width="7xl">
            <SectionIntro eyebrow="Patients on this treatment" title="What they said once it was done." highlight="once it was done" />
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {demoTestimonials.filter((t) => t.treatmentSlug === treatment.slug).slice(0, 4).map((story) => (
                <TestimonialCard key={story.id} story={story} />
              ))}
            </div>
            <p className="t-eyebrow mt-8 text-h-text">Recent results</p>
            <ResultDump className="mt-3" limit={4} />
          </Container>
        </section>
      )}

      <CtaBand
        title={treatment.ctaTitle}
        placement={`treatment_final_${treatment.slug}`}
        hue={treatment.hue}
        copy="Two clinics in Surat, at Yogi Chowk and Hirabaug. Book a time or send a message and we will suggest which is easier for you."
        whatsappMessage={treatment.whatsappMessage}
        location={treatment.slug === "full-mouth-rehabilitation" ? locations[1] : undefined}
      />
    </>
  );
}
