import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";

import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { GoogleProofStrip } from "@/components/kheni/google-proof-strip";
import { GoogleTrustCard } from "@/components/kheni/google-trust-card";
import { LocationCard } from "@/components/kheni/location-card";
import { MediaPlaceholder } from "@/components/kheni/media-placeholder";
import { SectionHeading } from "@/components/kheni/section-heading";
import { ImplantDiagram } from "@/components/kheni/implant/implant-diagram";
import { ImplantSectionNav } from "@/components/kheni/implant/section-nav";
import { OptionComparison } from "@/components/kheni/implant/option-comparison";
import { StartingPointNavigator } from "@/components/kheni/implant/starting-point-navigator";
import { ViewTracker } from "@/components/kheni/implant/view-tracker";
import {
  caseDisclaimer,
  caseStudies,
  comparison,
  consultation,
  costClosing,
  costFactors,
  decisionStages,
  finalCta,
  implantFaqs,
  implantHero,
  internationalModule,
  planFactors,
  technologies,
  timelineFactors,
} from "@/content/implant-center";
import { doctors, locations, site, treatments } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

const SLUG = "dental-implants-surat";

/**
 * Flagship implant experience.
 *
 * This is a dedicated static route at the canonical implant URL rather than a
 * second landing page, so there is no duplicate content and no competing URL.
 * `treatments/[slug]` skips this slug (see its `generateStaticParams`), which
 * leaves every other treatment on the shared generic template untouched.
 *
 * Server Component throughout. The only client islands are the starting-point
 * navigator and the section view tracker.
 */
const treatment = treatments.find((item) => item.slug === SLUG);

export const metadata: Metadata = {
  title: treatment?.seoTitle ?? "Dental Implants in Surat",
  description: treatment?.metaDescription,
};

export default function DentalImplantsPage() {
  if (!treatment) notFound();

  const doctor = doctors.find((item) => item.slug === "dr-mayur-kheni");
  const hirabaug = locations.find((item) => item.slug === "hirabaug");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(206,173,108,.16),transparent_38%),radial-gradient(circle_at_8%_88%,rgba(206,173,108,.07),transparent_34%)]"
        />
        <Container
          width="7xl"
          className="relative grid items-center gap-12 py-14 lg:grid-cols-[1.06fr_.94fr] lg:gap-16 lg:py-24"
        >
          <div>
            <p className="text-[.7rem] font-semibold uppercase tracking-[.26em] text-gold">
              {implantHero.eyebrow}
            </p>
            <div aria-hidden="true" className="rule-gold mt-5 h-px w-28" />
            <h1 className="mt-7 font-serif text-[clamp(2.6rem,7.4vw,5.6rem)] leading-[.92] tracking-[-.05em]">
              {implantHero.headline}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/62 sm:text-lg">
              {implantHero.standfirst}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/42">{implantHero.qualifier}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact/#book"
                data-track="appointment_start"
                data-placement="implant_hero"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full sm:whitespace-nowrap bg-gold px-6 text-sm font-semibold text-ink"
              >
                {implantHero.primaryCta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappUrl(implantHero.whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                data-track="whatsapp_click"
                data-placement="implant_hero"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full sm:whitespace-nowrap border border-white/15 px-6 text-sm font-semibold text-white"
              >
                <MessageCircle className="size-4 text-gold" aria-hidden="true" />
                {implantHero.secondaryCta}
              </a>
            </div>

            <div className="mt-8">
              <GoogleProofStrip placement="implant_hero_google" />
            </div>

            <p className="mt-7 max-w-md text-xs leading-5 text-white/38">
              Led by {doctor?.name}, {doctor?.credentials}, {doctor?.specialty.toLowerCase()}, with{" "}
              {doctor?.yearsExperience} years in practice.
            </p>
          </div>

          {/* Educational diagram stands in for photography, and is the thing worth
              looking at rather than a placeholder apologising for a missing photo. */}
          <figure className="relative">
            <div className="rounded-[2rem] border border-gold/15 bg-white/[.02] p-6 sm:p-8">
              <ImplantDiagram className="mx-auto w-full max-w-[26rem] text-white" />
            </div>
            <figcaption className="mt-4 text-center text-xs leading-5 text-white/40">
              The four parts your dentist will refer to. General illustration, not a surgical guide.
            </figcaption>
          </figure>
        </Container>
      </section>

      <ImplantSectionNav />

      {/* ── Overview ─────────────────────────────────────────────────────── */}
      <Section id="overview" className="implant-anchor" spacing="lg">
        <Container width="7xl">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
            <div>
              <p className="text-[.7rem] font-semibold uppercase tracking-[.24em] text-gold">
                What people come in with
              </p>
              <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.03] tracking-[-.035em] sm:text-5xl">
                {treatment.problem}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                {treatment.intro}
              </p>

              <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {treatment.benefits.map((benefit, index) => (
                  <li key={benefit} className="border-t border-border pt-4">
                    <span className="font-mono text-[.68rem] text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-sm leading-6">{benefit}</p>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="self-start rounded-[1.75rem] bg-[#f1eee7] p-7 lg:sticky lg:top-32 lg:p-8">
              <p className="text-[.68rem] font-semibold uppercase tracking-[.2em] text-gold">
                Worth knowing early
              </p>
              <p className="mt-4 font-serif text-2xl leading-tight sm:text-3xl">
                {treatment.aside.title}
              </p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{treatment.aside.copy}</p>
            </aside>
          </div>
        </Container>
      </Section>

      {/* ── Your situation ───────────────────────────────────────────────── */}
      <Section id="your-situation" className="implant-anchor bg-ink text-white" spacing="lg">
        <Container width="7xl">
          <div className="max-w-3xl">
            <p className="text-[.7rem] font-semibold uppercase tracking-[.24em] text-gold">
              Start where you are
            </p>
            <div aria-hidden="true" className="rule-gold mt-5 h-px w-24" />
            <h2 className="mt-6 font-serif text-4xl leading-[1.02] tracking-[-.035em] sm:text-5xl">
              What are you trying to solve?
            </h2>
            <p className="mt-5 text-base leading-7 text-white/55">
              Pick whichever is closest. Each one shows the questions worth raising, the options
              usually discussed and what a dentist would need to look at. Nothing here is a
              diagnosis, and you are not asked anything about your health.
            </p>
          </div>
          <div className="mt-12">
            <StartingPointNavigator />
          </div>
        </Container>
      </Section>

      {/* ── Options ──────────────────────────────────────────────────────── */}
      <Section id="options" className="implant-anchor bg-[#f1eee7]" spacing="lg">
        <Container width="7xl">
          <ViewTracker event="implant_comparison_view" placement="implant_comparison" />
          <SectionHeading eyebrow={comparison.eyebrow} title={comparison.title} copy={comparison.copy} />
          <div className="mt-12">
            <OptionComparison />
          </div>
        </Container>
      </Section>

      {/* ── Planning: how the decision is made ───────────────────────────── */}
      <Section id="planning" className="implant-anchor bg-ink text-white" spacing="lg">
        <Container width="7xl">
          <div className="lg:grid lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-[.7rem] font-semibold uppercase tracking-[.24em] text-gold">
                How planning works
              </p>
              <div aria-hidden="true" className="rule-gold mt-5 h-px w-24" />
              <h2 className="mt-6 font-serif text-4xl leading-[1.02] tracking-[-.035em] sm:text-5xl">
                {treatment.processHeading}
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-white/55">
                Five stages, in the order they actually happen. What is found at one stage decides
                how much of the next one is needed.
              </p>
            </div>

            {/* A real sequence, so the numbering carries information rather than decorating. */}
            <ol className="mt-12 lg:mt-0">
              {decisionStages.map((stage, index) => (
                <li
                  key={stage.title}
                  className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-5 border-t border-white/10 py-7 first:border-t-0 first:pt-0 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-x-8"
                >
                  <span
                    aria-hidden="true"
                    className="font-serif text-3xl leading-none text-gold/45 sm:text-5xl"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl leading-tight sm:text-3xl">{stage.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-white/55">{stage.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* ── What a consultation is for ───────────────────────────────────── */}
      <Section spacing="lg">
        <Container width="7xl">
          <div className="max-w-4xl">
            <p className="text-[.7rem] font-semibold uppercase tracking-[.24em] text-gold">
              {consultation.eyebrow}
            </p>
            <h2 className="mt-5 font-serif text-[clamp(2.1rem,5.2vw,4rem)] leading-[1.02] tracking-[-.04em]">
              {consultation.title}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              {consultation.standfirst}
            </p>
          </div>

          {/* Deliberately a list with hairline rules rather than a grid of cards.
              A consultation is a sequence, and cards would flatten it. */}
          <ol className="mt-14 border-t border-border">
            {consultation.steps.map((step, index) => (
              <li
                key={step.title}
                className="grid gap-x-8 gap-y-2 border-b border-border py-6 sm:grid-cols-[3rem_minmax(0,15rem)_minmax(0,1fr)] sm:items-baseline"
              >
                <span aria-hidden="true" className="font-mono text-xs text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-2xl leading-tight">{step.title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">{step.copy}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── What can change the plan ─────────────────────────────────────── */}
      <Section className="bg-[#f1eee7]" spacing="lg">
        <Container width="7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-[.7rem] font-semibold uppercase tracking-[.24em] text-gold">
                Why plans differ
              </p>
              <div aria-hidden="true" className="rule-gold mt-5 h-px w-24" />
              <h2 className="mt-6 font-serif text-4xl leading-[1.03] tracking-[-.035em] sm:text-5xl">
                {planFactors.title}
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
                {planFactors.copy}
              </p>
            </div>

            <dl className="grid gap-px overflow-hidden rounded-[1.5rem] border border-border bg-border sm:grid-cols-2">
              {planFactors.factors.map((factor) => (
                <div key={factor.title} className="bg-[#faf8f4] p-6">
                  <dt className="font-serif text-xl">{factor.title}</dt>
                  <dd className="mt-2.5 text-sm leading-6 text-muted-foreground">{factor.copy}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* ── Time and cost, without inventing figures ─────────────────────── */}
      <Section spacing="lg">
        <Container width="7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
            {[timelineFactors, costFactors].map((group) => (
              <div key={group.title}>
                <div aria-hidden="true" className="rule-gold h-px w-20" />
                <h2 className="mt-6 font-serif text-3xl leading-[1.05] tracking-[-.03em] sm:text-4xl">
                  {group.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">{group.copy}</p>
                <ul className="mt-8 space-y-5">
                  {group.factors.map((factor) => (
                    <li key={factor.title} className="border-t border-border pt-4">
                      <p className="text-sm font-semibold">{factor.title}</p>
                      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{factor.copy}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-12 max-w-3xl border-l-2 border-gold/50 pl-6 font-serif text-xl leading-relaxed sm:text-2xl">
            {costClosing}
          </p>
        </Container>
      </Section>

      {/* ── Dr. Mayur Kheni ──────────────────────────────────────────────── */}
      {doctor && (
        <Section id="dr-mayur" className="implant-anchor bg-ink text-white" spacing="lg">
          <Container width="7xl">
            <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-16">
              {/* Image slot. Sized and framed now so the real portrait drops
                  straight in without the section being rebuilt. */}
              <MediaPlaceholder
                label={`${doctor.name} at Kheni Dental, Surat`}
                className="min-h-[24rem] lg:min-h-[34rem]"
              />

              <div>
                <p className="text-[.7rem] font-semibold uppercase tracking-[.24em] text-gold">
                  Principal implant doctor
                </p>
                <div aria-hidden="true" className="rule-gold mt-5 h-px w-24" />
                <h2 className="mt-6 font-serif text-[clamp(2.2rem,5vw,4rem)] leading-[.98] tracking-[-.045em]">
                  {doctor.name}
                </h2>
                <p className="mt-4 text-sm text-white/55">
                  {doctor.credentials} · {doctor.specialty} · {doctor.yearsExperience} years in
                  practice
                </p>

                <blockquote className="mt-9 border-l-2 border-gold/60 pl-6">
                  <p className="font-serif text-2xl leading-snug sm:text-3xl">
                    &ldquo;{doctor.philosophy}&rdquo;
                  </p>
                </blockquote>

                <p className="mt-8 max-w-xl text-base leading-7 text-white/55">{doctor.bio}</p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href={`/doctors/${doctor.slug}/`}
                    data-track="doctor_profile_view"
                    data-placement="implant_doctor"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full sm:whitespace-nowrap border border-white/15 px-6 text-sm font-semibold"
                  >
                    Meet {doctor.name.split(" ").slice(0, 2).join(" ")}
                    <ArrowUpRight className="size-4 text-gold" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/contact/#book"
                    data-track="appointment_start"
                    data-placement="implant_doctor"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full sm:whitespace-nowrap bg-gold px-6 text-sm font-semibold text-ink"
                  >
                    Ask about an implant consultation
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ── Technology. Renders only when the clinic has verified entries. ── */}
      {technologies.length > 0 && (
        <Section spacing="lg">
          <Container width="7xl">
            <SectionHeading
              eyebrow="Planning and assessment"
              title="What each of these helps the dentist understand."
              copy="Equipment is only worth mentioning when it changes what can be assessed or explained to you."
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {technologies.map((item) => (
                <article key={item.name} className="rounded-[1.5rem] border border-border bg-card p-7">
                  <h3 className="font-serif text-2xl">{item.name}</h3>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {item.assessmentValue}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.patientExperience}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ── Cases. Renders only when consented cases exist. ───────────────── */}
      {caseStudies.length > 0 && (
        <Section className="bg-[#f1eee7]" spacing="lg">
          <Container width="7xl">
            <SectionHeading
              eyebrow="Treated at Kheni Dental"
              title="Cases shown with patient permission."
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {caseStudies.map((item) => (
                <article key={item.id} className="rounded-[1.5rem] border border-border bg-card p-7">
                  <p className="text-xs uppercase tracking-[.18em] text-gold">{item.category}</p>
                  <h3 className="mt-3 font-serif text-2xl">{item.startingConcern}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.context}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 text-sm leading-6 text-muted-foreground">{caseDisclaimer}</p>
          </Container>
        </Section>
      )}

      {/* ── Google proof at the decision point ───────────────────────────── */}
      <Section className="bg-[#f1eee7]" spacing="lg">
        <Container width="7xl">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <SectionHeading
              eyebrow="Independent of us"
              title="Read what patients wrote somewhere we do not control."
              copy="A review cannot tell you what is happening in your own mouth. It can tell you how a clinic talks to people and how patients describe their visits."
            />
            <GoogleTrustCard placement="implant_google_proof" />
          </div>
        </Container>
      </Section>

      {/* ── Clinics ──────────────────────────────────────────────────────── */}
      <Section id="clinics" className="implant-anchor" spacing="lg">
        <Container width="7xl">
          <SectionHeading
            eyebrow="Two addresses in Surat"
            title="Pick whichever clinic is the shorter trip."
            copy={
              hirabaug
                ? "Both clinics belong to the same practice and each keeps its own number, its own WhatsApp and its own Google listing. The Hirabaug clinic on Varachha Main Road is the Elite Implant Center address."
                : "Both clinics belong to the same practice and each keeps its own number, its own WhatsApp and its own Google listing."
            }
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {locations.map((location) => (
              <LocationCard key={location.slug} location={location} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── NRI and international ────────────────────────────────────────── */}
      <Section className="bg-ink text-white" spacing="md">
        <Container width="7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div>
              <p className="text-[.7rem] font-semibold uppercase tracking-[.24em] text-gold">
                {internationalModule.eyebrow}
              </p>
              <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-[1.05] tracking-[-.03em] sm:text-4xl">
                {internationalModule.title}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/55">
                {internationalModule.copy}
              </p>
              <ul className="mt-7 space-y-2.5">
                {internationalModule.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-white/60">
                    <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-gold" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <Link
                href="/international-patients/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full sm:whitespace-nowrap bg-gold px-6 text-sm font-semibold text-ink"
              >
                {internationalModule.primaryCta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappUrl(internationalModule.whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                data-track="international_patient_contact"
                data-placement="implant_international"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full sm:whitespace-nowrap border border-white/15 px-5 text-center text-sm font-semibold sm:px-6"
              >
                <MessageCircle className="size-4 text-gold" aria-hidden="true" />
                {internationalModule.secondaryCta}
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Questions ────────────────────────────────────────────────────── */}
      <Section id="questions" className="implant-anchor bg-[#f1eee7]" spacing="lg">
        <Container width="7xl">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <SectionHeading
              eyebrow="Patient questions"
              title="What people ask before they decide."
              copy="These answers are general. What applies to you can only be settled after an examination."
            />
            <Accordion items={implantFaqs} className="bg-white" />
          </div>
        </Container>
      </Section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(206,173,108,.18),transparent_58%)]"
        />
        <Container width="7xl" className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[.7rem] font-semibold uppercase tracking-[.26em] text-gold">
              {finalCta.eyebrow}
            </p>
            <h2 className="mt-6 font-serif text-[clamp(2.2rem,6vw,4.5rem)] leading-[.98] tracking-[-.045em]">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/55">
              {finalCta.copy}
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contact/#book"
                data-track="appointment_start"
                data-placement="implant_final_cta"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full sm:whitespace-nowrap bg-gold px-7 text-sm font-semibold text-ink"
              >
                {finalCta.primaryCta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappUrl(implantHero.whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                data-track="whatsapp_click"
                data-placement="implant_final_cta"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full sm:whitespace-nowrap border border-white/15 px-7 text-sm font-semibold"
              >
                <MessageCircle className="size-4 text-gold" aria-hidden="true" />
                {finalCta.secondaryCta}
              </a>
            </div>
            <p className="mt-8 text-xs uppercase tracking-[.14em] text-white/35">
              ★★★★★ {site.googleRating} on Google, {site.googleReviewBranch} ·{" "}
              {site.googleReviewDisplay} reviews
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
