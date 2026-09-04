import type { Metadata } from "next";

import { BranchLocator } from "@/components/kheni/branch-locator";
import { CtaBand } from "@/components/kheni/cta-band";
import { PageHero } from "@/components/kheni/page-hero";
import { SmileNote } from "@/components/kheni/smile-note";
import { Container } from "@/components/ui/container";
import { clinicHours, smileNotes } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/locations/" },
  title: "Our Two Clinics in Surat",
  description:
    "Kheni Dental at Swastik Plaza, Yogi Chowk and the Elite Implant Center at Hirabaug, Varachha Main Road, Surat. Addresses, hours, phone numbers, WhatsApp and directions.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Two clinics in Surat"
        title="Come to whichever is nearer."
        highlight="nearer"
        copy={`Swastik Plaza at Yogi Chowk, and the Elite Implant Center at Hirabaug on Varachha Main Road. ${clinicHours.compact}.`}
        hue="green"
        compact
      />
      <section className="hue-green py-8 sm:py-12 lg:py-16">
        <Container width="7xl">
          <BranchLocator placement="locations" />
        </Container>
      </section>
      <SmileNote note={smileNotes[2]} compact className="pb-10 sm:pb-14" />
      <CtaBand title="Not sure which clinic? Ask us." highlight="Ask us" copy="Message with your area and we will suggest the easier one to reach." placement="locations_final" hue="green" />
    </>
  );
}
