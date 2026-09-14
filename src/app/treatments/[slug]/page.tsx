import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Check } from "lucide-react";

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
import { BrandLine } from "@/components/kheni/brand-line";
import { ClinicShorts } from "@/components/kheni/clinic-shorts";
import { CtaBand } from "@/components/kheni/cta-band";
import { DoctorPortrait, Portrait, TeamLink } from "@/components/kheni/doctors";
import { ViewTracker } from "@/components/kheni/implant/view-tracker";
import { InstagramReels } from "@/components/kheni/instagram-reels";
import { MediaFrame } from "@/components/kheni/media-frame";
import { PageHero } from "@/components/kheni/page-hero";
import { ProcessSteps } from "@/components/kheni/process-steps";
import { ProofPill } from "@/components/kheni/proof";
import { ResultsPreview, hasResults } from "@/components/kheni/results-preview";
import { SectionIntro } from "@/components/kheni/section-intro";
import { TreatmentLine } from "@/components/kheni/treatment-cards";
import { Accordion } from "@/components/ui/accordion";
import { ArrowLink, BookButton, WhatsAppButton } from "@/components/ui/cta";
import { Container } from "@/components/ui/container";
import { reelsFor } from "@/content/instagram";
import { treatmentVisual } from "@/content/photos";
import { doctors, locations, treatments } from "@/content/site";
import { videosFor } from "@/content/videos";
import { isDarkHue } from "@/lib/utils";

export function generateStaticParams() {
  return treatments.filter((t) => t.slug !== "dental-implants-surat").map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const treatment = treatments.find((t) => t.slug === slug);
  if (!treatment) return {};
  return { title: treatment.seoTitle, description: treatment.metaDescription, alternates: { canonical: `/treatments/${slug}/` } };
}

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
};

/**
 * A treatment page as a short editorial story: a colour hero in the
 * treatment's mood, the problem in plain words, the diagram as a chapter
 * break, what happens at a visit, the dentist, real clips, questions, and
 * one closing action.
 */
export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "dental-implants-surat") redirect("/treatments/dental-implants-surat/");
  const treatment = treatments.find((t) => t.slug === slug);
  if (!treatment) notFound();

  const team = doctors.filter((d) => treatment.doctorSlugs.includes(d.slug));
  const related = treatments.filter((t) => t.slug !== slug && t.category === treatment.category).slice(0, 3);
  const more = related.length < 3 ? treatments.filter((t) => t.slug !== slug && !related.includes(t)).slice(0, 3 - related.length) : [];
  const kids = treatment.slug === "kids-dentistry-surat";
  const lead = team[0];
  const diagrams = DIAGRAMS[treatment.slug];
  const visual = treatmentVisual(treatment.slug);
  const dark = isDarkHue(treatment.hue);
  const reels = reelsFor({ treatmentSlug: treatment.slug }, 4);
  const videos = videosFor({ treatmentSlug: treatment.slug }, 4);
  const mood = `mood-${treatment.hue}`;

  return (
    <>
      <ViewTracker event="treatment_view" placement={`treatment_${treatment.slug}`} />
      <PageHero
        eyebrow={`"${treatment.concern}"`}
        title={treatment.headline}
        copy={treatment.short}
        hue={treatment.hue}
        proof={false}
        aside={
          <MediaFrame ratio="4 / 5" mobileRatio="4 / 3" from="lg" src={visual?.src} alt={visual?.alt} objectPosition={visual?.objectPosition} shape="smile-lg" className={`${mood} bg-white/20`} priority>
            <div className="absolute inset-0 bg-white/15">
              <TreatmentArt slug={treatment.slug} className="absolute inset-0 size-full" title={`${treatment.title} illustration`} />
            </div>
          </MediaFrame>
        }
      >
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <BookButton placement={`treatment_hero_${treatment.slug}`} variant={dark ? "butter" : "ink"} />
          <WhatsAppButton placement={`treatment_hero_${treatment.slug}`} message={treatment.whatsappMessage} label="Ask on WhatsApp" />
        </div>
        <ProofPill placement="page_hero" className="mt-5" />
      </PageHero>

      {/* ── In plain words ────────────────────────────────────────────── */}
      <section className={`${mood} py-10 sm:py-14 lg:py-20`}>
        <Container width="7xl" className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
          <div>
            <SectionIntro eyebrow={treatment.title} title={treatment.plainTitle.title} highlight={treatment.plainTitle.highlight} />
            <p className="t-lead measure-body mt-5 text-ink-soft">{treatment.intro}</p>
          </div>
          <div>
            <p className="t-eyebrow text-m-text">{kids ? "Bring your child in for" : "You might need this if"}</p>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {treatment.signs.map((sign) => (
                <li key={sign} className="flex items-start gap-3 py-3.5 text-[1.05rem] font-semibold leading-snug">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-m-fill text-m-on">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {sign}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── The diagram, as a chapter break ──────────────────────────── */}
      {diagrams && (
        <section className={`${mood} bg-m-tint py-10 sm:py-14 lg:py-20`}>
          <Container width="7xl">
            <SectionIntro eyebrow="How it works" title={diagrams.caption} />
            <div className="mt-8 grid gap-10">
              {diagrams.Diagram.map((Diagram, i) => (
                <Diagram key={i} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── At a visit ───────────────────────────────────────────────── */}
      <section className={`${mood} bg-white py-10 sm:py-14 lg:py-20`}>
        <Container width="7xl">
          <SectionIntro eyebrow="At your visit" title={treatment.visitTitle.title} highlight={treatment.visitTitle.highlight} />
          <ProcessSteps steps={treatment.visit} columns={treatment.visit.length === 5 ? 5 : 4} className="mt-6" />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-10">
            <div>
              <p className="t-eyebrow text-m-text">What to expect after</p>
              <ul className="mt-3 space-y-2.5">
                {treatment.expect.map((item) => (
                  <li key={item} className="flex gap-3 text-[1.02rem] leading-6 text-ink">
                    <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-m-fill" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="on-dark rounded-[1.75rem] bg-ink p-6 text-white sm:p-8">
              <p className="t-eyebrow">Worth knowing</p>
              <p className="t-h3 mt-3">{treatment.worthKnowing.title}</p>
              <p className="t-body mt-3 text-white/80">{treatment.worthKnowing.copy}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Who handles it ───────────────────────────────────────────── */}
      <section className={`${mood} py-10 sm:py-14 lg:py-20`}>
        <Container width="7xl">
          {lead ? (
            <div className="grid gap-6 lg:grid-cols-[.5fr_1fr] lg:items-center lg:gap-14">
              <Portrait doctor={lead} ratio="4 / 5" mobileRatio="4 / 3" from="lg" shape="smile-lg" />
              <div>
                <p className="t-eyebrow text-m-text">Who you will see</p>
                <h2 className="t-h2 mt-2">{lead.name}</h2>
                <p className="mt-2 font-display text-lg font-bold text-ink-soft">
                  {lead.credentials} · {lead.specialty} · {lead.yearsExperience} years
                </p>
                <blockquote className="mt-5 font-accent text-[1.6rem] italic leading-[1.15] sm:text-[2rem]">&ldquo;{lead.philosophy}&rdquo;</blockquote>
                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                  <BookButton placement={`treatment_doctor_${treatment.slug}`} label={`Book with ${lead.shortName}`} />
                  <ArrowLink href={`/doctors/${lead.slug}/`} data-track="doctor_profile_view" data-placement={`treatment_doctor_${treatment.slug}`} className="text-ink">
                    Profile
                  </ArrowLink>
                </div>
                {team.length > 1 && (
                  <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {team.slice(1).map((d) => (
                      <DoctorPortrait key={d.slug} doctor={d} placement={`treatment_team_${treatment.slug}`} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <SectionIntro eyebrow="Who you will see" title="Any of our four dentists." highlight="four dentists" copy="Book at either clinic and tell us what is troubling you. The dentist you see will examine you and explain the plan." />
          )}
          <TeamLink className="mt-8" />
        </Container>
      </section>

      {/* ── Watch ─────────────────────────────────────────────────────── */}
      {(reels.length > 0 || videos.length > 0) && (
        <section className="on-dark mood-ink bg-ink py-10 text-white sm:py-14 lg:py-20">
          <Container width="7xl">
            <SectionIntro eyebrow="From the clinic" title="Watch, before you decide." highlight="before you decide" copy="Real clips from the clinic's own Instagram and YouTube. Nothing plays until you tap." />
            {reels.length > 0 && <InstagramReels reels={reels} limit={4} placement={`treatment_reels_${treatment.slug}`} className="mt-7" />}
            {videos.length > 0 && <ClinicShorts videos={videos} limit={4} columns={4} tone="dark" placement={`treatment_videos_${treatment.slug}`} className="mt-7" />}
          </Container>
        </section>
      )}

      {hasResults && (
        <section className="on-butter bg-butter py-10 sm:py-14 lg:py-20">
          <Container width="7xl">
            <SectionIntro eyebrow="Results" title="Before and after, shown honestly." highlight="honestly" />
            <ResultsPreview limit={2} category={treatment.title} className="mt-6" />
          </Container>
        </section>
      )}

      <BrandLine line={{ id: treatment.slug, line: treatment.note.line, highlight: treatment.note.highlight, hue: treatment.hue }} />

      {/* ── Questions ─────────────────────────────────────────────────── */}
      <section className={`${mood} py-10 sm:py-14 lg:py-20`}>
        <Container width="7xl" className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionIntro eyebrow="Questions" title={`${treatment.title} questions people ask.`} highlight="people ask" />
            <ProofPill placement={`treatment_proof_${treatment.slug}`} className="mt-6" />
          </div>
          <Accordion items={treatment.faqs} name={`faq-${treatment.slug}`} />
        </Container>
      </section>

      {/* ── Related ───────────────────────────────────────────────────── */}
      <section className="bg-white py-10 sm:py-14">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="t-h3">Related treatments</h2>
            <ArrowLink href="/treatments/">All treatments</ArrowLink>
          </div>
          <div className="mt-2 grid lg:grid-cols-3 lg:gap-x-8">
            {[...related, ...more].map((t) => (
              <TreatmentLine key={t.slug} treatment={t} placement={`treatment_related_${treatment.slug}`} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title={treatment.ctaTitle}
        placement={`treatment_final_${treatment.slug}`}
        copy="Two clinics in Surat, at Yogi Chowk and Hirabaug. Book a time or send a message and we will suggest which is easier for you."
        whatsappMessage={treatment.whatsappMessage}
        location={treatment.slug === "full-mouth-rehabilitation" ? locations[1] : undefined}
      />
    </>
  );
}
