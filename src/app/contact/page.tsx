import type { Metadata } from "next";
import { MessageCircle, Phone } from "lucide-react";

import { BranchLocator } from "@/components/kheni/branch-locator";
import { ConsultationForm } from "@/components/kheni/consultation-form";
import { ProofCluster } from "@/components/kheni/proof";
import { SectionIntro } from "@/components/kheni/section-intro";
import { Container } from "@/components/ui/container";
import { BookButton } from "@/components/ui/cta";
import { clinicHours, locations } from "@/content/site";
import { branchWhatsappUrl } from "@/lib/links";

export const metadata: Metadata = {
  alternates: { canonical: "/contact/" },
  title: "Contact Kheni Dental, Surat",
  description:
    "Book an appointment at Kheni Dental in Surat. WhatsApp, call Yogi Chowk or Hirabaug, or send a short request. You do not need to know which treatment you need.",
};

/**
 * Contact, built for a phone. The clinic ticked four booking channels on its
 * form (p56): WhatsApp and Call for each clinic. So the first screen is
 * exactly those four, plus Book (which opens the same choice). The "form"
 * below only composes a WhatsApp message; nothing is submitted anywhere
 * else. Email stays in the footer as the clinic's address but is not
 * offered as a booking channel.
 */
export default function ContactPage() {
  const tile = "flex min-h-[4.5rem] items-center justify-between gap-3 rounded-2xl px-4 sm:px-5";
  return (
    <>
      <section className="on-dark grain relative isolate overflow-hidden bg-ink text-ivory">
        <div aria-hidden="true" className="bloom-gold pointer-events-none absolute inset-0" />
        <Container width="7xl" className="relative py-7 sm:py-10 lg:py-14">
          <p className="t-eyebrow flex items-center gap-3 text-gold">
            Contact and booking
            <span aria-hidden="true" className="rule-gold h-px w-12" />
          </p>
          <h1 className="t-h1 measure-head mt-3">
            Getting in touch should be the <span className="hl">easy part.</span>
          </h1>
          <p className="t-stand measure-stand mt-3 text-ivory/70">Tell us what is troubling you in whatever words you would use. The team takes it from there.</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((l) => (
              <a key={l.slug} href={branchWhatsappUrl(l)} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="contact_primary" data-branch={l.slug} className={`${tile} bg-whatsapp text-white`}>
                <span className="min-w-0">
                  <span className="block text-[.72rem] font-bold uppercase tracking-[.1em] text-white/80">WhatsApp {l.displayArea}</span>
                  <span className="t-card mt-0.5 block">{l.phoneDisplay}</span>
                </span>
                <MessageCircle className="size-6 shrink-0" aria-hidden="true" />
              </a>
            ))}
            {locations.map((l) => (
              <a key={l.slug} href={`tel:${l.phoneHref}`} data-track="phone_click" data-placement="contact_primary" data-branch={l.slug} className={`${tile} border border-ivory/20 text-ivory hover:border-gold`}>
                <span className="min-w-0">
                  <span className="block text-[.72rem] font-semibold uppercase tracking-[.12em] text-gold">Call {l.displayArea}</span>
                  <span className="t-card mt-0.5 block">{l.phoneDisplay}</span>
                </span>
                <Phone className="size-5 shrink-0 text-gold" aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="t-small text-ivory/65">
              {clinicHours.days}, {clinicHours.morning} and {clinicHours.evening}. Closed on {clinicHours.closed}.
            </p>
            <BookButton placement="contact_primary" label="Book Appointment" />
          </div>
          <div className="mt-6 rounded-2xl border border-ivory/15 bg-ivory/[.05] p-4 sm:p-5">
            <p className="t-eyebrow text-gold">Already have X-rays or reports?</p>
            <p className="t-small mt-2 max-w-3xl text-ivory/75">
              You can send existing X-rays or reports on WhatsApp before your visit so the dentist knows what to expect. Any advice depends on your oral condition, and a visit to the clinic is still needed. We do not diagnose from the website.
            </p>
          </div>
        </Container>
      </section>

      <section id="book" className="anchor py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
            <div>
              <SectionIntro eyebrow="Prefer to write?" title="Compose your WhatsApp message." highlight="WhatsApp" copy="Four details, and WhatsApp opens with them already typed to the clinic you chose. Nothing is stored on this website. Keep medical history for the consultation itself." />
              <ProofCluster placement="contact_proof" className="mt-6" />
            </div>
            <ConsultationForm />
          </div>
        </Container>
      </section>

      <section className="bg-mint py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <SectionIntro eyebrow="Two clinics" title="Which clinic suits you?" highlight="suits you" copy="Both belong to the same practice. Each keeps its own number and its own Google listing." />
          <div className="mt-6">
            <BranchLocator placement="contact" />
          </div>
        </Container>
      </section>
    </>
  );
}
