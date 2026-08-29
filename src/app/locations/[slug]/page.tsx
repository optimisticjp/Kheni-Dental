import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, MapPin, MessageCircle, Phone, Star } from "lucide-react";

import { BranchGoogleCard } from "@/components/kheni/branch-google-card";
import { BranchMap, DirectionsButton } from "@/components/kheni/branch-map";
import { ClinicGallery } from "@/components/kheni/clinic-gallery";
import { PendingTag } from "@/components/kheni/pending";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { doctors, locations } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const location = locations.find((item) => item.slug === slug);
  if (!location) return {};
  return {
    title: `Dental Clinic in ${location.displayArea} | ${location.shortName}`,
    description: `Kheni Dental at ${location.shortName}, ${location.areaLabel}. Address, phone, WhatsApp, opening hours and directions.`,
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locations.find((item) => item.slug === slug);
  if (!location) notFound();

  const message = `Hello Kheni Dental, I would like to book an appointment at ${location.shortName}, ${location.areaLabel}.`;
  const other = locations.find((item) => item.slug !== location.slug);

  return (
    <>
      {/* Hero: name, area, and the three actions, straight away. */}
      <section className="grain relative isolate overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="bloom-gold pointer-events-none absolute inset-0 -z-10" />
        <Container width="7xl" className="relative grid gap-10 py-12 lg:grid-cols-[1fr_.85fr] lg:items-center lg:py-16">
          <div>
            {location.implantCentre && (
              <p className="mb-3 inline-flex rounded-full bg-gold/15 px-2.5 py-1 text-[.6rem] font-semibold uppercase tracking-[.14em] text-gold">
                Elite Implant Center
              </p>
            )}
            <h1 className="t-h1">
              {location.shortName}
            </h1>
            <p className="mt-3 text-sm uppercase tracking-[.14em] text-white/40">{location.areaLabel}</p>

            {/* This branch's own Google figure, in the first screen. */}
            {location.google.status === "verified" && (
              <p className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/[.07] py-2 pl-3.5 pr-4 text-sm">
                <span className="flex gap-0.5 text-gold" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-3.5 fill-current" />
                  ))}
                </span>
                <strong className="font-serif text-lg leading-none text-gold">{location.google.rating}</strong>
                <span className="text-white/55">{location.google.reviewCount} Google reviews for this clinic</span>
              </p>
            )}
            <p className="mt-5 max-w-xl t-stand text-white/60">{location.note}</p>

            <dl className="mt-7 space-y-3 text-sm">
              <div className="flex gap-3">
                <dt className="sr-only">Address</dt>
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <dd className="leading-6 text-white/65">{location.address}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="sr-only">Hours</dt>
                <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <dd className="leading-6 text-white/65">
                  {location.hours}
                  {location.hoursNote && <span className="mt-1 block text-xs text-white/35">{location.hoursNote}</span>}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <a
                href={`tel:${location.phoneHref}`}
                data-track="phone_click"
                data-placement={`location_hero_${location.slug}`}
                data-branch={location.slug}
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-ink sm:whitespace-nowrap"
              >
                <Phone className="size-4" aria-hidden="true" />
                {location.phoneDisplay}
              </a>
              <a
                href={whatsappUrl(message, location.whatsappNumber)}
                target="_blank"
                rel="noreferrer"
                data-track="whatsapp_click"
                data-placement={`location_hero_${location.slug}`}
                data-branch={location.slug}
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold sm:whitespace-nowrap"
              >
                <MessageCircle className="size-4 text-gold" aria-hidden="true" />
                WhatsApp
              </a>
              <DirectionsButton
                location={location}
                placement={`location_hero_${location.slug}`}
                className="border border-white/15 bg-transparent text-white sm:whitespace-nowrap"
              />
            </div>
          </div>

          <BranchMap location={location} />
        </Container>
      </section>

      {/* This branch on Google. Its own figure, never the other branch's. */}
      <Section spacing="md">
        <Container width="7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-stretch">
            <BranchGoogleCard location={location} placement={`location_google_${location.slug}`} />
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-serif text-2xl leading-tight">Book at this clinic</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Call the number above, message us on WhatsApp, or send an appointment request.
              </p>
              <Link
                href="/contact/#book"
                data-track="appointment_start"
                data-placement={`location_${location.slug}`}
                className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white"
              >
                Book Appointment
                <ArrowRight className="cta-arrow size-4 text-gold" aria-hidden="true" />
              </Link>
              <p className="mt-6 border-t border-border pt-5 text-xs uppercase tracking-[.14em] text-muted-foreground">
                Doctors at this clinic
              </p>
              <div className="mt-2 flex items-center gap-2">
                <PendingTag label="Days per doctor to confirm" />
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {doctors.map((doctor) => (
                  <li key={doctor.slug}>
                    <Link
                      href={`/doctors/${doctor.slug}/`}
                      className="inline-flex min-h-11 items-center rounded-full border border-border px-3.5 text-xs font-medium hover:border-gold/50"
                    >
                      {doctor.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Clinic photography */}
      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <h2 className="t-h2">Inside the clinic</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            Photography for this branch specifically, so patients see the clinic they are actually walking into.
          </p>
          <ClinicGallery tone="light" branchLabel={location.shortName} className="mt-8" />
        </Container>
      </Section>

      {/* The other branch */}
      {other && (
        <Section spacing="md">
          <Container width="7xl">
            <div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
              <div>
                <p className="text-[.66rem] font-semibold uppercase tracking-[.18em] text-gold">Our other clinic</p>
                <p className="mt-2 font-serif text-2xl leading-tight">{other.shortName}</p>
                <p className="mt-1 text-sm text-muted-foreground">{other.areaLabel}</p>
              </div>
              <Link
                href={`/locations/${other.slug}/`}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold text-gold"
              >
                View clinic <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
              </Link>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
