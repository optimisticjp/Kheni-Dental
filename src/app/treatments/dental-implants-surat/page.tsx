import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

import { ImplantDiagram } from "@/components/kheni/art/diagrams";
import { ClinicShorts } from "@/components/kheni/clinic-shorts";
import { CtaBand } from "@/components/kheni/cta-band";
import { DoctorSpotlight } from "@/components/kheni/doctor-spotlight";
import { StartingPoints } from "@/components/kheni/implant/starting-points";
import { ViewTracker } from "@/components/kheni/implant/view-tracker";
import { ProcessSteps } from "@/components/kheni/process-steps";
import { BranchProof, ProofChip, ProofCluster } from "@/components/kheni/proof";
import { ResultsPreview } from "@/components/kheni/results-preview";
import { SectionIntro } from "@/components/kheni/section-intro";
import { SmileNote } from "@/components/kheni/smile-note";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { BookButton, CallButton, WhatsAppButton } from "@/components/ui/cta";
import { implantCapabilities } from "@/content/capabilities";
import { comparison, implantFaqs, implantHero, implantProcess, planFactors } from "@/content/implant-center";
import { doctors, locations, smileNotes, treatments } from "@/content/site";

const treatment = treatments.find((t) => t.slug === "dental-implants-surat")!;
const hirabaug = locations.find((l) => l.implantCentre) ?? locations[1];
const drMayur = doctors.find((d) => d.slug === "dr-mayur-kheni") ?? doctors[0];

export const metadata: Metadata = {
  alternates: { canonical: "/treatments/dental-implants-surat/" },
  title: treatment.seoTitle,
  description: treatment.metaDescription,
};

/**
 * The flagship. Near-black, gold and ivory, with one cool blue technical
 * accent in the comparison. The process the doctor asked for sits high,
 * the diagram is the hero visual, and every claim is one the clinic has
 * confirmed. No technique names, brands, day-counts, warranties or prices.
 */
export default function DentalImplantsPage() {
  return (
    <>
      <ViewTracker event="treatment_view" placement="treatment_dental-implants-surat" />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="on-dark grain relative isolate overflow-hidden bg-ink text-ivory">
        <div aria-hidden="true" className="bloom-gold pointer-events-none absolute inset-0" />
        <Container width="7xl" className="relative grid gap-8 py-9 sm:py-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14 lg:py-16">
          <div>
            <p className="t-eyebrow flex items-center gap-3 text-gold">
              {implantHero.eyebrow}
              <span aria-hidden="true" className="rule-gold h-px w-14" />
            </p>
            <h1 className="t-h1 measure-head mt-3">
              Dental implants in Surat, <span className="hl">planned properly.</span>
            </h1>
            <p className="t-stand measure-stand mt-4 text-ivory/70">{implantHero.standfirst}</p>
            <ProofChip placement="implant_hero" tone="dark" className="mt-5" />
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <BookButton placement="implant_hero" branch={hirabaug.slug} label="Book an implant consultation" />
              <WhatsAppButton placement="implant_hero" location={hirabaug} message={implantHero.whatsappMessage} variant="onDark" />
              <CallButton placement="implant_hero" location={hirabaug} variant="onDark" className="hidden sm:inline-flex" />
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-gold/20 bg-ivory p-4 text-ink sm:p-6">
            <ImplantDiagram />
          </div>
        </Container>
      </section>

      {/* ── Kinds of case ────────────────────────────────────────────── */}
      <section className="bg-white py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <SectionIntro eyebrow="What we plan" title="Single tooth to full mouth." highlight="full mouth" copy="Four kinds of case, all planned by Dr. Mayur Kheni at the Hirabaug clinic after an examination and imaging." />
          <ul className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {implantCapabilities.map((item, index) => (
              <li key={item.id} className="rounded-2xl border border-line bg-ivory p-4 sm:p-5">
                <span className="font-serif text-2xl text-gold-text">0{index + 1}</span>
                <p className="t-card mt-2">{item.title}</p>
                <p className="t-small mt-1.5 text-ink-soft">{item.copy}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Process ──────────────────────────────────────────────────── */}
      <section className="bg-sand py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <SectionIntro eyebrow={implantProcess.eyebrow} title={implantProcess.title} highlight={["first visit", "final tooth"]} copy={implantProcess.copy} />
          <ProcessSteps steps={implantProcess.steps} columns={5} className="mt-6 sm:mt-8" variant="cards" />
          <details className="group mt-5 rounded-2xl bg-white ring-1 ring-line">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 text-[.9375rem] font-semibold marker:hidden focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-gold [&::-webkit-details-marker]:hidden">
              {planFactors.title}
              <ChevronDown className="size-4 shrink-0 text-gold-text transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="border-t border-line p-5">
              <p className="t-body text-ink-soft">{planFactors.copy}</p>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {planFactors.factors.map((f) => (
                  <div key={f.title}>
                    <dt className="text-[.9375rem] font-semibold">{f.title}</dt>
                    <dd className="t-small mt-1 text-ink-soft">{f.copy}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </details>
        </Container>
      </section>

      {/* ── Your situation ───────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <SectionIntro eyebrow="Your situation" title="Which of these is closest to you?" highlight="closest" />
          <div className="mt-6 sm:mt-8">
            <StartingPoints />
          </div>
        </Container>
      </section>

      {/* ── Compare ──────────────────────────────────────────────────── */}
      <section className="hue-sky bg-sky py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <SectionIntro eyebrow="Know the words" title={comparison.title} highlight="bridge or denture" copy={comparison.copy} />
          <details className="group mt-6 overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-line">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 text-[.9375rem] font-semibold marker:hidden focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-gold [&::-webkit-details-marker]:hidden">
              See the comparison
              <ChevronDown className="size-4 shrink-0 text-sky-text transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="hidden grid-cols-[1fr_1fr_1fr_1fr] gap-x-4 border-y border-line bg-sky/60 px-5 py-3 md:grid">
              <span className="t-eyebrow text-ink-soft">Compare</span>
              {comparison.columns.map((c) => (
                <span key={c} className={`t-eyebrow ${c === "Implant" ? "text-gold-text" : "text-ink-soft"}`}>{c}</span>
              ))}
            </div>
            <div className="divide-y divide-line">
              {comparison.rows.map((row) => (
                <div key={row.label} className="grid gap-x-4 gap-y-2 px-5 py-4 md:grid-cols-[1fr_1fr_1fr_1fr]">
                  <h3 className="text-[.9375rem] font-semibold">{row.label}</h3>
                  {(["implant", "bridge", "denture"] as const).map((key) => (
                    <p key={key} className={`t-small rounded-lg px-3 py-2 md:px-0 md:py-0 ${key === "implant" ? "bg-gold-tint text-ink md:bg-transparent" : "text-ink-soft"}`}>
                      <span className="mr-1.5 font-semibold capitalize text-ink md:hidden">{key}:</span>
                      {row[key]}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <p className="t-small border-t border-line bg-sky/60 px-5 py-4 text-ink-soft">{comparison.note}</p>
          </details>
        </Container>
      </section>

      {/* ── Dr. Mayur ────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <DoctorSpotlight doctor={drMayur} />
        </Container>
      </section>

      <SmileNote note={smileNotes[5]} compact tone="dark" />

      {/* ── Results and proof ────────────────────────────────────────── */}
      <section className="bg-sand py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <SectionIntro eyebrow="Results" title="Implant results, shown honestly." highlight="honestly" />
          <ResultsPreview limit={2} placement="implant_results" className="mt-6" />
        </Container>
      </section>

      <section className="py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            <BranchProof location={hirabaug} placement="implant_google_hirabaug" />
            <ProofCluster placement="implant_proof" />
          </div>
          <div className="mt-8">
            <SectionIntro eyebrow="From the clinic" title="Patients on the day their treatment finished." highlight="finished" />
            <ClinicShorts limit={3} kind="patient" className="mt-5" />
          </div>
        </Container>
      </section>

      {/* ── Questions ────────────────────────────────────────────────── */}
      <section className="bg-sand py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:gap-14">
            <div>
              <SectionIntro eyebrow="Questions" title="Implant questions, answered plainly." highlight="plainly" />
              <div className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-line">
                <p className="t-eyebrow text-gold-text">Visiting Surat from abroad?</p>
                <p className="t-small mt-2 text-ink-soft">Implant treatment is staged. Tell us your dates before you book flights and we will say what is realistic on one trip.</p>
                <Link href="/international-patients/" className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold-text">
                  How a visit works
                  <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <Accordion items={[...treatment.faqs, ...implantFaqs]} name="implant-faq" />
          </div>
        </Container>
      </section>


      <CtaBand
        title="Talk to us about an implant."
        highlight="implant"
        copy={`Elite Implant Center, ${hirabaug.areaLabel}. Book a time or send a message.`}
        placement="implant_final"
        location={hirabaug}
        whatsappMessage={implantHero.whatsappMessage}
      />
    </>
  );
}
