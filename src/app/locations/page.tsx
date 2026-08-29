import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { GoogleProofPanel } from "@/components/kheni/branch-google-card";
import { BranchMap, DirectionsButton } from "@/components/kheni/branch-map";
import { LocationCard } from "@/components/kheni/location-card";
import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { locations } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "Our Two Clinics in Surat",
  description:
    "Kheni Dental has two clinics in Surat: Swastik Plaza at Yogi Chowk, and the Elite Implant Center at Hirabaug on Varachha Main Road. Address, phone, hours and directions.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our two Surat clinics"
        title="Find your Kheni."
        copy="Both clinics belong to the same practice, so pick whichever is easier to reach on the day. Each one keeps its own phone number, its own Google listing and its own team on the floor."
        aside={<GoogleProofPanel placement="locations_hero_google" className="w-full" />}
      />

      <Section spacing="md">
        <Container width="7xl">
          <div className="grid gap-5 lg:grid-cols-2">
            {locations.map((location) => (
              <LocationCard key={location.slug} location={location} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Maps, one per branch. Lazy iframes, so nothing loads until scrolled to. */}
      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Getting here</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            The maps below load only when you scroll to them, so the page stays quick on mobile data. Tap Get
            Directions and the live route opens in your own maps app.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {locations.map((location) => (
              <div key={location.slug} className="rounded-2xl border border-border bg-white p-4 sm:p-5">
                <BranchMap location={location} ratio="4 / 3" />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-serif text-xl leading-tight">{location.shortName}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{location.areaLabel}</p>
                  </div>
                  <DirectionsButton
                    location={location}
                    placement={`locations_map_${location.slug}`}
                    className="border border-border sm:whitespace-nowrap"
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <section className="bg-gold py-14 text-ink sm:py-16">
        <Container width="7xl" className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <h2 className="max-w-xl font-serif text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.02] tracking-[-.04em]">
            Not sure which clinic suits you? Ask us.
          </h2>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Link
              href="/contact/#book"
              data-track="appointment_start"
              data-placement="locations_cta"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white sm:whitespace-nowrap"
            >
              Book Appointment
              <ArrowRight className="size-4 text-gold" aria-hidden="true" />
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
