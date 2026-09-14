import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

import { ImplantDiagram } from "@/components/kheni/art/diagrams";
import { BrandLine } from "@/components/kheni/brand-line";
import { ClinicShorts } from "@/components/kheni/clinic-shorts";
import { CtaBand } from "@/components/kheni/cta-band";
import { DoctorFeature } from "@/components/kheni/doctors";
import { StartingPoints } from "@/components/kheni/implant/starting-points";
import { ViewTracker } from "@/components/kheni/implant/view-tracker";
import { InstagramReels } from "@/components/kheni/instagram-reels";
import { ProcessSteps } from "@/components/kheni/process-steps";
import { ProofBig, ProofPill } from "@/components/kheni/proof";
import { ResultsPreview, hasResults } from "@/components/kheni/results-preview";
import { SectionIntro } from "@/components/kheni/section-intro";
import { Accordion } from "@/components/ui/accordion";
import { BookButton, CallButton, WhatsAppButton } from "@/components/ui/cta";
import { Container } from "@/components/ui/container";
import { implantCapabilities } from "@/content/capabilities";
import { comparison, implantFaqs, implantHero, implantProcess, planFactors } from "@/content/implant-center";
import { reelsFor } from "@/content/instagram";
import { doctors, locations, treatments } from "@/content/site";
import { videosFor } from "@/content/videos";

const treatment = treatments.find((t) => t.slug === "dental-implants-surat")!;
const hirabaug = locations.find((l) => l.implantCentre) ?? locations[1];
const drMayur = doctors.find((d) => d.slug === "dr-mayur-kheni") ?? doctors[0];

export const metadata: Metadata = {
  alternates: { canonical: "/treatments/dental-implants-surat/" },
  title: treatment.seoTitle,
  description: treatment.metaDescription,
};

/**
 * The Elite Implant Center. The Kheni system in its darker, more technical
 * register: ink and electric blue with butter detail, the diagram as the
 * hero visual, the process high on the page, real clips, real Google
 * proof. No technique names, brands, day-counts, warranties or prices.
 */
export default function DentalImplantsPage() {
  const reels = reelsFor({ treatmentSlug: "dental-implants-surat" }, 3);
  const videos = [...videosFor({ treatmentSlug: "dental-implants-surat" }, 2), ...videosFor({ kind: "patient", format: "short" }, 3)].filter((v, i, a) => a.findIndex((x) => x.id === v.id) === i).slice(0, 4);

  return (
    <>
      <ViewTracker event="treatment_view" placement="treatment_dental-implants-surat" />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="on-dark mood-blue smile-cut relative isolate overflow-hidden bg-ink text-white" style={{ ["--curve" as string]: "var(--blue)" }}>
        <div aria-hidden="true" className="absolute -left-32 -top-32 size-[34rem] rounded-full bg-blue/50 blur-3xl" />
        <Container width="7xl" className="relative grid gap-10 pb-20 pt-9 sm:pt-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14 lg:pb-28 lg:pt-16">
          <div>
            <p className="t-eyebrow">{implantHero.eyebrow}</p>
            <h1 className="t-h1 measure-head mt-3">
              Dental implants in Surat, <span className="hl">planned properly.</span>
            </h1>
            <p className="t-lead measure-lead mt-4 text-white/80">{implantHero.standfirst}</p>
            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <BookButton placement="implant_hero" branch={hirabaug.slug} label="Book an implant consultation" variant="butter" size="lg" />
              <WhatsAppButton placement="implant_hero" location={hirabaug} message={implantHero.whatsappMessage} size="lg" />
              <CallButton placement="implant_hero" location={hirabaug} variant="outlineLight" size="lg" className="hidden sm:inline-flex" />
            </div>
            <ProofPill placement="implant_hero" tone="dark" className="mt-6" />
          </div>
          <div className="mood-blue rounded-[2rem] bg-cream p-5 text-ink sm:p-8">
            <ImplantDiagram />
          </div>
        </Container>
      </section>

      {/* ── Kinds of case ────────────────────────────────────────────── */}
      <section className="on-blue mood-blue bg-blue py-12 text-white sm:py-16 lg:py-20">
        <Container width="7xl">
          <SectionIntro eyebrow="What we plan" title="Single tooth to full mouth." highlight="full mouth" copy="Four kinds of case, all planned by Dr. Mayur Kheni at the Hirabaug clinic after an examination and imaging." />
          <ol className="mt-8 grid gap-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {implantCapabilities.map((item, index) => (
              <li key={item.id} className="border-t border-white/25 py-5 lg:pt-5">
                <span aria-hidden="true" className="font-display text-[3rem] font-extrabold leading-none tracking-[-.05em] text-butter">
                  0{index + 1}
                </span>
                <p className="mt-3 font-display text-2xl font-extrabold tracking-[-.03em]">{item.title}</p>
                <p className="t-small mt-1.5 text-white/80">{item.copy}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── Process ──────────────────────────────────────────────────── */}
      <section className="mood-blue py-12 sm:py-16 lg:py-20">
        <Container width="7xl">
          <SectionIntro eyebrow={implantProcess.eyebrow} title={implantProcess.title} highlight={["first visit", "final tooth"]} copy={implantProcess.copy} />
          <ProcessSteps steps={implantProcess.steps} columns={5} className="mt-6" />
          <details className="group mt-8 rounded-[1.5rem] bg-white">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 font-display text-[1.1rem] font-bold tracking-[-.02em] marker:hidden focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-blue [&::-webkit-details-marker]:hidden sm:px-6">
              {planFactors.title}
              <ChevronDown className="size-5 shrink-0 text-blue-deep transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="border-t border-line p-5 sm:p-6">
              <p className="t-body text-ink-soft">{planFactors.copy}</p>
              <dl className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {planFactors.factors.map((f) => (
                  <div key={f.title}>
                    <dt className="font-display text-lg font-bold tracking-[-.02em]">{f.title}</dt>
                    <dd className="t-small mt-1 text-ink-soft">{f.copy}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </details>
        </Container>
      </section>

      {/* ── Your situation ───────────────────────────────────────────── */}
      <section className="mood-blue bg-white py-12 sm:py-16 lg:py-20">
        <Container width="7xl">
          <SectionIntro eyebrow="Your situation" title="Which of these is closest to you?" highlight="closest" />
          <div className="mt-7">
            <StartingPoints />
          </div>
        </Container>
      </section>

      {/* ── Compare ──────────────────────────────────────────────────── */}
      <section className="on-aqua mood-aqua bg-aqua py-12 text-ink sm:py-16 lg:py-20">
        <Container width="7xl">
          <SectionIntro eyebrow="Know the words" title={comparison.title} highlight="bridge or denture" copy={comparison.copy} />
          <details className="group mt-6 overflow-hidden rounded-[1.5rem] bg-white">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 font-display text-[1.1rem] font-bold tracking-[-.02em] marker:hidden focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-blue [&::-webkit-details-marker]:hidden sm:px-6">
              See the comparison
              <ChevronDown className="size-5 shrink-0 text-aqua-deep transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="hidden grid-cols-[1fr_1fr_1fr_1fr] gap-x-4 border-y border-line bg-aqua-tint px-5 py-3 md:grid">
              <span className="t-eyebrow text-ink-soft">Compare</span>
              {comparison.columns.map((c) => (
                <span key={c} className={`t-eyebrow ${c === "Implant" ? "text-blue-deep" : "text-ink-soft"}`}>{c}</span>
              ))}
            </div>
            <div className="divide-y divide-line">
              {comparison.rows.map((row) => (
                <div key={row.label} className="grid gap-x-4 gap-y-2 px-5 py-4 md:grid-cols-[1fr_1fr_1fr_1fr]">
                  <h3 className="font-display text-[1.05rem] font-bold tracking-[-.01em]">{row.label}</h3>
                  {(["implant", "bridge", "denture"] as const).map((key) => (
                    <p key={key} className={`t-small rounded-lg px-3 py-2 md:px-0 md:py-0 ${key === "implant" ? "bg-blue-tint text-ink md:bg-transparent" : "text-ink-soft"}`}>
                      <span className="mr-1.5 font-bold capitalize text-ink md:hidden">{key}:</span>
                      {row[key]}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <p className="t-small border-t border-line bg-aqua-tint px-5 py-4 text-ink-soft">{comparison.note}</p>
          </details>
        </Container>
      </section>

      {/* ── Dr. Mayur ────────────────────────────────────────────────── */}
      <section className="mood-blue py-12 sm:py-16 lg:py-24">
        <Container width="7xl">
          <DoctorFeature doctor={drMayur} placement="implant_doctor" />
        </Container>
      </section>

      {/* ── Watch ────────────────────────────────────────────────────── */}
      <section className="on-dark mood-ink bg-ink py-12 text-white sm:py-16 lg:py-20">
        <Container width="7xl">
          <SectionIntro eyebrow="From the clinic" title="Patients on the day their treatment finished." highlight="finished" copy="Real clips from the clinic's own channels. Nothing plays until you tap it." />
          {reels.length > 0 && <InstagramReels reels={reels} limit={3} placement="implant_reels" className="mt-7" />}
          <ClinicShorts videos={videos} limit={4} columns={4} tone="dark" placement="implant_videos" className="mt-7" />
        </Container>
      </section>

      {hasResults && (
        <section className="on-butter bg-butter py-12 sm:py-16 lg:py-20">
          <Container width="7xl">
            <SectionIntro eyebrow="Results" title="Implant results, shown honestly." highlight="honestly" />
            <ResultsPreview limit={2} category="Dental Implants" className="mt-6" />
          </Container>
        </section>
      )}

      <section className="on-butter bg-butter py-12 text-ink sm:py-16 lg:py-24">
        <Container width="7xl">
          <ProofBig placement="implant_proof" />
        </Container>
      </section>

      <BrandLine line={{ id: "implant", line: treatment.note.line, highlight: treatment.note.highlight, hue: "blue" }} />

      {/* ── Questions ────────────────────────────────────────────────── */}
      <section className="mood-blue py-12 sm:py-16 lg:py-20">
        <Container width="7xl" className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <div>
            <SectionIntro eyebrow="Questions" title="Implant questions, answered plainly." highlight="plainly" />
            <div className="on-coral mood-coral mt-6 rounded-[1.5rem] bg-coral p-5 text-ink">
              <p className="t-eyebrow">Visiting Surat from abroad?</p>
              <p className="t-body mt-2 font-semibold">Implant treatment is staged. Tell us your dates before you book flights and we will say what is realistic on one trip.</p>
              <Link href="/international-patients/" className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold">
                How a visit works
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <Accordion items={[...treatment.faqs, ...implantFaqs]} name="implant-faq" />
        </Container>
      </section>

      <CtaBand title="Talk to us about an implant." highlight="an implant" copy={`Elite Implant Center, ${hirabaug.areaLabel}. Book a time or send a message.`} placement="implant_final" location={hirabaug} whatsappMessage={implantHero.whatsappMessage} />
    </>
  );
}
