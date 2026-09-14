import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock3, MapPin } from "lucide-react";

import { BranchMap, DirectionsButton } from "@/components/kheni/branch-map";
import { CtaBand } from "@/components/kheni/cta-band";
import { MediaFrame } from "@/components/kheni/media-frame";
import { BranchProof, Stars } from "@/components/kheni/proof";
import { SectionIntro } from "@/components/kheni/section-intro";
import { TreatmentLine } from "@/components/kheni/treatment-cards";
import { BookButton, CallButton, WhatsAppButton } from "@/components/ui/cta";
import { Container } from "@/components/ui/container";
import { locationPhotos } from "@/content/photos";
import { doctors, locations, treatments } from "@/content/site";
import { fieldClass, isDarkHue } from "@/lib/utils";

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) return {};
  return {
    alternates: { canonical: `/locations/${slug}/` },
    title: location.shortName === location.displayArea ? `Dental Clinic in ${location.displayArea}, Surat` : `Dental Clinic in ${location.displayArea} | ${location.shortName}`,
    description: `Kheni Dental at ${location.shortName}, ${location.areaLabel}. Address, phone, WhatsApp, opening hours and directions.`,
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) notFound();
  const other = locations.find((l) => l.slug !== slug);
  const featured = treatments.filter((t) => (location.implantCentre ? ["dental-implants-surat", "full-mouth-rehabilitation", "cosmetic-smile-dentistry"] : ["dental-check-up-surat", "root-canal-treatment-surat", "kids-dentistry-surat"]).includes(t.slug));
  const dark = isDarkHue(location.hue);
  const photos = locationPhotos[location.slug] ?? [];

  return (
    <>
      <section className={`${fieldClass(location.hue)} smile-cut relative isolate overflow-hidden`} style={{ ["--curve" as string]: "var(--cream)" }}>
        <Container width="7xl" className="relative grid gap-8 pb-20 pt-8 sm:pt-12 lg:grid-cols-[1fr_.95fr] lg:items-center lg:gap-14 lg:pb-28 lg:pt-16">
          <div>
            <p className="t-eyebrow">{location.implantCentre ? "Kheni Dental & Elite Implant Center" : "Kheni Dental"}</p>
            <h1 className="t-h1 mt-2">
              {location.displayArea}
              {location.shortName !== location.displayArea && <span className="muted block text-[.5em] font-bold tracking-[-.02em]">{location.shortName}</span>}
            </h1>
            {location.google.status === "verified" && (
              <p className="mt-5 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-white px-4 text-ink">
                <span className="font-display text-2xl font-extrabold leading-none tracking-[-.03em]">{location.google.rating}</span>
                <Stars tone="ink" />
                <span className="text-sm font-semibold text-ink-soft">{location.google.reviewCount} Google reviews for this clinic</span>
              </p>
            )}
            <p className="t-lead measure-lead muted mt-5">{location.note}</p>
            <dl className="mt-6 space-y-3">
              <div className="flex gap-3">
                <dt className="sr-only">Address</dt>
                <MapPin className="mt-1 size-5 shrink-0" aria-hidden="true" />
                <dd className="t-body font-semibold">
                  {location.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="sr-only">Hours</dt>
                <Clock3 className="mt-1 size-5 shrink-0" aria-hidden="true" />
                <dd className="t-body font-semibold">
                  {location.hours}
                  {location.hoursNote && <span className="muted t-small block font-medium">{location.hoursNote}</span>}
                </dd>
              </div>
            </dl>
            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <DirectionsButton location={location} placement={`location_hero_${location.slug}`} />
              <CallButton placement={`location_hero_${location.slug}`} location={location} label={location.phoneDisplay} variant={dark ? "outlineLight" : "outline"} />
              <WhatsAppButton placement={`location_hero_${location.slug}`} location={location} />
            </div>
          </div>
          <BranchMap location={location} size="tall" shape="smile" />
        </Container>
      </section>

      <section className="py-10 sm:py-14 lg:py-20">
        <Container width="7xl" className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <BranchProof location={location} placement={`location_google_${location.slug}`} />
          <div className={`mood-${location.hue} rounded-[1.5rem] bg-m-tint p-5 sm:p-6`}>
            <p className="t-eyebrow text-m-text">Book at this clinic</p>
            <p className="t-h3 mt-2">Call, WhatsApp or send a request.</p>
            <div className="mt-4">
              <BookButton placement={`location_${location.slug}`} branch={location.slug} />
            </div>
            <p className="t-eyebrow mt-6 text-ink-soft">Dentists at Kheni</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {doctors.map((d) => (
                <li key={d.slug}>
                  <Link href={`/doctors/${d.slug}/`} className="inline-flex min-h-10 items-center rounded-full bg-white px-3.5 text-sm font-semibold">
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="t-small mt-3 text-ink-soft">Call to check which days a particular dentist is at this clinic.</p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-10 sm:py-14 lg:py-20">
        <Container width="7xl" className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            <SectionIntro eyebrow="Inside the clinic" title={location.implantCentre ? "Where implant cases are planned." : "Our original clinic at Yogi Chowk."} highlight={location.implantCentre ? "implant cases" : "original clinic"} />
            <div className="mt-6 grid grid-cols-3 gap-3">
              {photos.map((photo, i) => (
                <MediaFrame key={photo.src} ratio="1 / 1" src={photo.src} alt={photo.alt} objectPosition={photo.objectPosition} shape={i === 0 ? "smile-lg" : "rounded"} className={i === 0 ? "col-span-2 row-span-2" : ""} />
              ))}
            </div>
          </div>
          <div>
            <SectionIntro eyebrow="Often booked here" title="Treatments at this clinic." highlight="this clinic" />
            <div className="mt-3">
              {featured.map((t) => (
                <TreatmentLine key={t.slug} treatment={t} placement={`location_${location.slug}`} />
              ))}
            </div>
            {other && (
              <Link href={`/locations/${other.slug}/`} className="lift mt-6 flex items-center justify-between gap-4 rounded-[1.25rem] bg-ink px-5 py-4 text-white">
                <span>
                  <span className="t-eyebrow block text-butter">Our other clinic</span>
                  <span className="mt-0.5 block font-display text-xl font-extrabold tracking-[-.03em]">{other.displayArea}</span>
                </span>
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            )}
          </div>
        </Container>
      </section>

      <CtaBand title={`Book a visit at ${location.displayArea}.`} highlight={location.displayArea} copy={location.hours} placement={`location_final_${location.slug}`} location={location} />
    </>
  );
}
