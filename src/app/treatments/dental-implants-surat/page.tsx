import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronDown, MessageCircle, Phone, Star } from "lucide-react";

import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BranchGoogleCard } from "@/components/kheni/branch-google-card";
import { CaseResultsGrid } from "@/components/kheni/case-results";
import {
  ImplantSystemRail,
  ImplantWorkflowPending,
  PriceTable,
  TechnologyGrid,
  TickList,
} from "@/components/kheni/capability-grids";
import { ImplantDiagram } from "@/components/kheni/implant/implant-diagram";
import { OptionComparison } from "@/components/kheni/implant/option-comparison";
import { StartingPointNavigator } from "@/components/kheni/implant/starting-point-navigator";
import { InitialsPortrait } from "@/components/kheni/pending";
import { ProofBand } from "@/components/kheni/proof-band";
import { VideoStoryGrid } from "@/components/kheni/stories";
import { implantCapabilities } from "@/content/capabilities";
import { treatmentStats } from "@/content/clinic-proof";
import { decisionStages, implantFaqs, implantHero, planFactors } from "@/content/implant-center";
import { doctors, locations, site, treatments } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

const SLUG = "dental-implants-surat";
const treatment = treatments.find((item) => item.slug === SLUG);

export const metadata: Metadata = {
  title: treatment?.seoTitle ?? "Dental Implants in Surat",
  description:
    "Dental implants in Surat at Kheni Dental & Elite Implant Center, Hirabaug and Yogi Chowk. Single, multiple and full mouth implants led by Dr. Mayur Kheni.",
};

/** Plain-language benefits. No absolutes, no guarantees. */
const benefits = [
  "Chew on both sides again",
  "Fixed in the jawbone, not resting on the gum",
  "Neighbouring teeth usually left untouched",
  "Speak and laugh without thinking about the gap",
];

/**
 * Flagship implant page, rebuilt shorter.
 *
 * The previous version ran to fifteen reading-heavy sections. This one keeps
 * the same substance but moves the comparison table and the planning factors
 * into disclosures, merges the consultation and process sections, and folds
 * the timeline and cost explanations into a single cost block. What is left
 * above the fold is what a patient came for: what kind of case they have,
 * what it costs, who does it and how to book.
 */
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
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_16%,rgba(206,173,108,.16),transparent_40%)]"
        />
        <Container width="7xl" className="relative grid gap-10 py-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14 lg:py-16">
          <div>
            <p className="text-[.7rem] font-semibold uppercase tracking-[.24em] text-gold">{implantHero.eyebrow}</p>
            <h1 className="mt-5 font-serif text-[clamp(2.3rem,6.2vw,4.4rem)] leading-[.98] tracking-[-.045em]">
              Dental Implants in Surat
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/65">
              Replace a missing tooth with one that is fixed in the jawbone. Single, multiple and full mouth
              implants at our Elite Implant Center, led by Dr. Mayur Kheni.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={site.googleProfileUrl}
                target="_blank"
                rel="noreferrer"
                data-track="review_click"
                data-placement="implant_hero_google"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gold/25 bg-gold/[.07] px-4 text-sm"
              >
                <span className="flex gap-0.5 text-gold" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </span>
                <strong className="text-white">{site.googleRating}</strong>
                <span className="text-white/50">Yogi Chowk</span>
              </a>
              <span className="text-sm text-white/45">{doctor?.yearsExperience} years in practice</span>
            </div>

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact/#book"
                data-track="appointment_start"
                data-placement="implant_hero"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-ink sm:whitespace-nowrap"
              >
                Book Appointment
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href={`tel:${hirabaug?.phoneHref ?? site.primaryPhoneHref}`}
                data-track="phone_click"
                data-placement="implant_hero"
                data-branch="hirabaug"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold sm:whitespace-nowrap"
              >
                <Phone className="size-4 text-gold" aria-hidden="true" />
                Call Clinic
              </a>
              <a
                href={whatsappUrl(implantHero.whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                data-track="whatsapp_click"
                data-placement="implant_hero"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold sm:whitespace-nowrap"
              >
                <MessageCircle className="size-4 text-gold" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>

          <figure className="rounded-2xl border border-gold/15 bg-white/[.02] p-6 sm:p-8">
            <ImplantDiagram className="mx-auto w-full max-w-[22rem] text-white" />
            <figcaption className="mt-3 text-center text-xs text-white/35">
              Crown, abutment, post and jawbone
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* ── Proof ────────────────────────────────────────────────────────── */}
      <section className="border-y border-white/10 bg-[#111110] py-9 text-white sm:py-11">
        <Container width="7xl">
          <ProofBand stats={treatmentStats} />
        </Container>
      </section>

      {/* ── Case types + benefits, with the comparison behind a disclosure ── */}
      <Section spacing="md">
        <Container width="7xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">
                What kind of case is yours?
              </h2>
              <ul className="mt-7 grid gap-2.5">
                {implantCapabilities.map((item) => (
                  <li key={item.id} className="rounded-xl border border-border bg-card px-5 py-4">
                    <p className="font-serif text-lg leading-tight">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.copy}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Why an implant</h2>
              <div className="mt-7">
                <TickList items={benefits} />
              </div>

              <details className="group mt-8 rounded-2xl border border-border bg-card">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 text-sm font-semibold marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
                  Compare implant, bridge and denture
                  <ChevronDown
                    className="size-4 shrink-0 text-gold transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="border-t border-border p-3 sm:p-4">
                  <OptionComparison />
                </div>
              </details>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Your situation ───────────────────────────────────────────────── */}
      <Section className="bg-ink text-white" spacing="md">
        <Container width="7xl">
          <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">
            What are you trying to solve?
          </h2>
          <div className="mt-8">
            <StartingPointNavigator />
          </div>
        </Container>
      </Section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">How treatment works</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {decisionStages.map((stage, index) => (
              <li key={stage.title} className="rounded-2xl border border-border bg-white p-5">
                <span aria-hidden="true" className="font-serif text-2xl text-gold/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-lg leading-tight">{stage.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{stage.copy}</p>
              </li>
            ))}
          </ol>

          <details className="group mt-6 rounded-2xl border border-border bg-white">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 text-sm font-semibold marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
              What can change the plan
              <ChevronDown
                className="size-4 shrink-0 text-gold transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="border-t border-border p-5">
              <p className="text-sm leading-6 text-muted-foreground">{planFactors.copy}</p>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {planFactors.factors.map((factor) => (
                  <div key={factor.title}>
                    <dt className="text-sm font-semibold">{factor.title}</dt>
                    <dd className="mt-1 text-sm leading-6 text-muted-foreground">{factor.copy}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </details>
        </Container>
      </Section>

      {/* ── Dr. Mayur ────────────────────────────────────────────────────── */}
      {doctor && (
        <Section className="bg-ink text-white" spacing="md">
          <Container width="7xl">
            <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-center lg:gap-14">
              <InitialsPortrait name={doctor.name} className="aspect-[4/5] w-full" />
              <div>
                <p className="text-[.7rem] font-semibold uppercase tracking-[.24em] text-gold">Your implant surgeon</p>
                <h2 className="mt-4 font-serif text-[clamp(2rem,4.4vw,3.2rem)] leading-[1] tracking-[-.04em]">
                  {doctor.name}
                </h2>
                <p className="mt-3 text-sm text-white/55">
                  {doctor.credentials} · {doctor.specialty} · {doctor.yearsExperience} years
                </p>
                <blockquote className="mt-6 border-l-2 border-gold/60 pl-5 font-serif text-xl leading-snug sm:text-2xl">
                  &ldquo;{doctor.philosophy}&rdquo;
                </blockquote>
                <Link
                  href={`/doctors/${doctor.slug}/`}
                  data-track="doctor_profile_view"
                  data-placement="implant_doctor"
                  className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold"
                >
                  Full profile <ArrowUpRight className="size-4 text-gold" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ── Technology and systems ───────────────────────────────────────── */}
      <Section spacing="md">
        <Container width="7xl">
          <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Technology and systems</h2>
          <div className="mt-8">
            <TechnologyGrid />
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-[.7rem] font-semibold uppercase tracking-[.2em] text-gold">Implant systems</h3>
              <div className="mt-4">
                <ImplantSystemRail tone="light" />
              </div>
            </div>
            <div>
              <h3 className="text-[.7rem] font-semibold uppercase tracking-[.2em] text-gold">Surgical options</h3>
              <div className="mt-4">
                <ImplantWorkflowPending tone="light" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Results ──────────────────────────────────────────────────────── */}
      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Implant results</h2>
          <div className="mt-8">
            <CaseResultsGrid limit={3} />
          </div>
        </Container>
      </Section>

      {/* ── Cost ─────────────────────────────────────────────────────────── */}
      <Section spacing="md">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
            <div>
              <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Cost and EMI</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                What an implant costs depends on how many teeth are involved, the condition of the bone and the
                final tooth that goes on top. You get the full plan, stage by stage, before treatment starts.
              </p>
            </div>
            <PriceTable limit={4} />
          </div>
        </Container>
      </Section>

      {/* ── Proof ────────────────────────────────────────────────────────── */}
      <Section className="bg-ink text-white" spacing="md">
        <Container width="7xl">
          <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">What patients say</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {locations.map((location) => (
              <BranchGoogleCard
                key={location.slug}
                location={location}
                dark
                placement={`implant_google_${location.slug}`}
              />
            ))}
          </div>
          <div className="mt-8">
            <VideoStoryGrid tone="dark" />
          </div>
        </Container>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-14">
            <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Implant questions</h2>
            <Accordion items={implantFaqs} className="bg-white" />
          </div>
        </Container>
      </Section>

      {/* ── Book ─────────────────────────────────────────────────────────── */}
      <section className="bg-gold py-14 text-ink sm:py-16">
        <Container width="7xl" className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="max-w-xl font-serif text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.02] tracking-[-.04em]">
              Talk to us about an implant.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-ink/70">
              {hirabaug ? `Elite Implant Center, ${hirabaug.areaLabel}.` : "Two clinics in Surat."} Book a time or send
              us a message.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Link
              href="/contact/#book"
              data-track="appointment_start"
              data-placement="implant_final_cta"
              className="inline-flex min-h-13 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white sm:whitespace-nowrap"
            >
              Book Appointment
            </Link>
            <a
              href={whatsappUrl(implantHero.whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              data-track="whatsapp_click"
              data-placement="implant_final_cta"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-ink/25 px-6 text-sm font-semibold sm:whitespace-nowrap"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
