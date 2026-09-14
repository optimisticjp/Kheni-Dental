import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";

import { BranchLocator } from "@/components/kheni/branch-locator";
import { ConsultationForm } from "@/components/kheni/consultation-form";
import { ProofPill } from "@/components/kheni/proof";
import { SectionIntro } from "@/components/kheni/section-intro";
import { BookButton } from "@/components/ui/cta";
import { Container } from "@/components/ui/container";
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
  const tile = "flex min-h-[5rem] items-center justify-between gap-3 rounded-[1.25rem] px-5 text-left";
  return (
    <>
      <section className="on-aqua mood-aqua smile-cut bg-aqua text-ink" style={{ ["--curve" as string]: "var(--cream)" }}>
        <Container width="7xl" className="pb-16 pt-8 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-16">
          <p className="t-eyebrow">Contact and booking</p>
          <h1 className="t-h1 measure-head mt-3">
            Getting in touch should be the <span className="hl">easy part.</span>
          </h1>
          <p className="t-lead measure-lead muted mt-3">Tell us what is troubling you in whatever words you would use. The team takes it from there.</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="contact_primary" className={`${tile} bg-whatsapp text-white`}>
              <span>
                <span className="block text-[.7rem] font-bold uppercase tracking-[.12em] text-white/80">Fastest reply</span>
                <span className="mt-0.5 block font-display text-xl font-extrabold tracking-[-.02em]">WhatsApp us</span>
              </span>
              <MessageCircle className="size-6 shrink-0" aria-hidden="true" />
            </a>
            <BookButton placement="contact_primary" className={`${tile} rounded-[1.25rem] px-5 font-display text-xl font-extrabold tracking-[-.02em]`} label="Book Appointment" />
            {locations.map((l) => (
              <a key={l.slug} href={`tel:${l.phoneHref}`} data-track="phone_click" data-placement="contact_primary" data-branch={l.slug} className={`${tile} bg-white text-ink`}>
                <span className="min-w-0">
                  <span className="block text-[.7rem] font-bold uppercase tracking-[.12em] text-blue-deep">Call {l.displayArea}</span>
                  <span className="mt-0.5 block font-display text-xl font-extrabold tracking-[-.02em]">{l.phoneDisplay}</span>
                </span>
                <Phone className="size-5 shrink-0" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="t-small mt-5 font-medium">
            {clinicHours.days}, {clinicHours.morning} and {clinicHours.evening}. Closed on {clinicHours.closed}.{" "}
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1 font-bold">
              <Mail className="size-3.5" aria-hidden="true" />
              {site.email}
            </a>
          </p>
        </Container>
      </section>

      <section id="book" className="anchor py-10 sm:py-14 lg:py-20">
        <Container width="7xl" className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionIntro eyebrow="Prefer to write?" title="Request an appointment." highlight="Request" copy="Four details and the team comes back to you with times. Keep medical history for the consultation itself." />
            <ProofPill placement="contact_proof" className="mt-6" />
          </div>
          <ConsultationForm />
        </Container>
      </section>

      <section className="bg-white py-10 sm:py-14 lg:py-20">
        <Container width="7xl">
          <SectionIntro eyebrow="Two clinics" title="Which clinic suits you?" highlight="suits you" copy="Both belong to the same practice. Each keeps its own number and its own Google listing." />
          <div className="mt-7">
            <BranchLocator placement="contact" />
          </div>
        </Container>
      </section>
    </>
  );
}
