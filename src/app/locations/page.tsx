import type { Metadata } from "next";

import { BranchLocator } from "@/components/kheni/branch-locator";
import { BrandLine } from "@/components/kheni/brand-line";
import { CtaBand } from "@/components/kheni/cta-band";
import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { clinicHours } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/locations/" },
  title: "Our Two Clinics in Surat",
  description:
    "Kheni Dental at Swastik Plaza, Yogi Chowk and the Elite Implant Center at Hirabaug, Varachha Main Road, Surat. Addresses, hours, phone numbers, WhatsApp and directions.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero eyebrow="Two clinics in Surat" title="Two clinics. Pick the one closer to you." highlight="closer to you" copy={`Swastik Plaza at Yogi Chowk, and the Elite Implant Center at Hirabaug on Varachha Main Road. ${clinicHours.compact}.`} hue="aqua" compact />
      <section className="py-8 sm:py-12 lg:py-16">
        <Container width="7xl">
          <BranchLocator placement="locations" />
        </Container>
      </section>
      <BrandLine id="clinics" />
      <CtaBand title="Not sure which clinic? Ask us." highlight="Ask us" copy="Message with your area and we will suggest the easier one to reach." placement="locations_final" />
    </>
  );
}
