import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";

import { BranchLocator } from "@/components/kheni/branch-locator";
import { ConsultationForm } from "@/components/kheni/consultation-form";
import { ProofCluster } from "@/components/kheni/proof";
import { SectionIntro } from "@/components/kheni/section-intro";
import { Container } from "@/components/ui/container";
import { BookButton } from "@/components/ui/cta";
import { clinicHours, locations, site } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export const metadata: Metadata = {
  alternates: { canonical: "/contact/" },
  title: "Contact Kheni Dental, Surat",
  description:
    "Book an appointment at Kheni Dental in Surat. WhatsApp, call Yogi Chowk or Hirabaug, or send a short request. You do not need to know which treatment you need.",
};

/**
 * Contact, built for a phone. In the first screen: WhatsApp, Book, and a
 * call button for each clinic. Then the short form, then the two clinics
 * with maps and directions. Nothing is repeated three times.
 */
export default function ContactPage() {
  const tile = "flex min-h-[4.5rem] items-center justify-between gap-3 rounded-2xl px-4 sm:px-5";
  return (
    <>
      <section className="hue-green field relative isolate overflow-hidden" style={{ ["--f1" as string]: "var(--green-tint)", ["--f2" as string]: "var(--sunshine-tint)", ["--f3" as string]: "var(--teal-tint)" }}>
        <Container width="7xl" className="relative py-7 sm:py-10 lg:py-14">
          <p className="t-eyebrow text-green-text">Contact and booking</p>
          <h1 className="t-h1 measure-head mt-3">
            Getting in touch should be the <span className="hl">easy part.</span>
          </h1>
          <p className="t-stand measure-stand mt-3 text-ink-soft">Tell us what is troubling you in whatever words you would use. The team takes it from there.</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="contact_primary" className={`${tile} bg-whatsapp text-white`}>
              <span>
                <span className="block text-[.72rem] font-bold uppercase tracking-[.1em] text-white/80">Fastest reply</span>
                <span className="t-card mt-0.5 block">WhatsApp us</span>
              </span>
              <MessageCircle className="size-6 shrink-0" aria-hidden="true" />
            </a>
            <BookButton placement="contact_primary" className={`${tile} justify-between rounded-2xl px-4 text-left text-[1.1875rem] sm:px-5`} label="Book Appointment" />
            {locations.map((l) => (
              <a key={l.slug} href={`tel:${l.phoneHref}`} data-track="phone_click" data-placement="contact_primary" data-branch={l.slug} className={`hue-${l.hue} ${tile} bg-white ring-1 ring-line`}>
                <span className="min-w-0">
                  <span className="block text-[.72rem] font-bold uppercase tracking-[.1em] text-h-text">Call {l.displayArea}</span>
                  <span className="t-card mt-0.5 block">{l.phoneDisplay}</span>
                </span>
                <Phone className="size-5 shrink-0 text-h-text" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="t-small mt-4 text-ink-soft">
            {clinicHours.days}, {clinicHours.morning} and {clinicHours.evening}. Closed on {clinicHours.closed}.{" "}
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1 font-semibold text-green-text">
              <Mail className="size-3.5" aria-hidden="true" />
              {site.email}
            </a>
          </p>
        </Container>
      </section>

      <section id="book" className="anchor py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
            <div>
              <SectionIntro eyebrow="Prefer to write?" title="Request an appointment." highlight="Request" copy="Four details and the team comes back to you with times. Keep medical history for the consultation itself." />
              <ProofCluster placement="contact_proof" className="mt-6" />
            </div>
            <ConsultationForm />
          </div>
        </Container>
      </section>

      <section className="hue-green bg-green-tint py-10 sm:py-14 lg:py-18">
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
