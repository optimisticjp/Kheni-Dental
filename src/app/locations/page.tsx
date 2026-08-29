import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { BranchLocator } from "@/components/kheni/branch-locator";
import { GoogleProofPanel } from "@/components/kheni/branch-google-card";
import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { whatsappUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "Our Two Clinics in Surat",
  description:
    "Kheni Dental has two clinics in Surat: Swastik Plaza at Yogi Chowk, and the Elite Implant Center at Hirabaug on Varachha Main Road. Address, phone, hours and directions.",
};

/**
 * Where to find us.
 *
 * The page used to show each branch's map inside its card and then repeat both
 * maps under a separate "Getting here" heading — four Google iframes for two
 * addresses. There is now one locator: a branch switcher on a phone, both
 * branches side by side from lg.
 */
export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our two Surat clinics"
        title="Find your Kheni."
        copy="Both clinics belong to the same practice, so pick whichever is easier to reach on the day. Each keeps its own phone number, its own Google listing and its own team on the floor."
        aside={<GoogleProofPanel placement="locations_hero_google" className="w-full" />}
      />

      <Section spacing="md">
        <Container width="7xl">
          <BranchLocator placement="locations" />
        </Container>
      </Section>

      <section className="bg-gold py-11 text-ink sm:py-14">
        <Container width="7xl" className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <h2 className="t-h2 measure-head">Not sure which clinic suits you? Ask us.</h2>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Link
              href="/contact/#book"
              data-track="appointment_start"
              data-placement="locations_cta"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white sm:whitespace-nowrap"
            >
              Book Appointment
              <ArrowRight className="cta-arrow size-4 text-gold" aria-hidden="true" />
            </Link>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              data-track="whatsapp_click"
              data-placement="locations_cta"
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
