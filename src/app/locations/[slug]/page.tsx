import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock3, MapPin } from "lucide-react";

import { BranchMap, DirectionsButton } from "@/components/kheni/branch-map";
import { CtaBand } from "@/components/kheni/cta-band";
import { MediaFrame } from "@/components/kheni/media-frame";
import { BranchProof, Stars } from "@/components/kheni/proof";
import { SectionIntro } from "@/components/kheni/section-intro";
import { TreatmentRow } from "@/components/kheni/treatment-poster";
import { Container } from "@/components/ui/container";
import { BookButton, CallButton, WhatsAppButton } from "@/components/ui/cta";
import { locationPhotos } from "@/content/photos";
import { doctors, locations, treatments } from "@/content/site";

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

  return (
    <>
      <section className={`hue-${location.hue} field relative isolate overflow-hidden`} style={{ ["--f1" as string]: "var(--h-tint)", ["--f2" as string]: "var(--sunshine-tint)", ["--f3" as string]: "var(--h-soft)" }}>
        <Container width="7xl" className="relative grid gap-6 py-7 sm:py-10 lg:grid-cols-[1fr_.95fr] lg:items-center lg:gap-12 lg:py-14">
          <div>
            <p className="t-eyebrow text-h-text">{location.implantCentre ? "Kheni Dental & Elite Implant Center" : "Kheni Dental"}</p>
            <h1 className="t-h1 mt-2">
              {location.displayArea}
              {location.shortName !== location.displayArea && <span className="block text-[.55em] font-medium text-ink-soft">{location.shortName}</span>}
            </h1>
            {location.google.status === "verified" && (
              <p className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-3 ring-1 ring-line">
                <span className="font-serif text-xl font-semibold leading-none">{location.google.rating}</span>
                <Stars />
                <span className="t-small text-ink-soft">{location.google.reviewCount} Google reviews for this clinic</span>
              </p>
            )}
            <p className="t-stand measure-stand mt-4 text-ink-soft">{location.note}</p>
            <dl className="mt-5 space-y-2.5">
              <div className="flex gap-3">
                <dt className="sr-only">Address</dt>
                <MapPin className="mt-1 size-4 shrink-0 text-h-text" aria-hidden="true" />
                <dd className="t-body">
                  {location.addressLines.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="sr-only">Hours</dt>
                <Clock3 className="mt-1 size-4 shrink-0 text-h-text" aria-hidden="true" />
                <dd className="t-body">
                  {location.hours}
                  {location.hoursNote && <span className="t-small block text-ink-soft">{location.hoursNote}</span>}
                </dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <DirectionsButton location={location} placement={`location_hero_${location.slug}`} />
              <CallButton placement={`location_hero_${location.slug}`} location={location} label={location.phoneDisplay} variant="secondary" />
              <WhatsAppButton placement={`location_hero_${location.slug}`} location={location} variant="secondary" />
            </div>
          </div>
          <BranchMap location={location} size="tall" />
        </Container>
      </section>

      <section className="py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            <BranchProof location={location} placement={`location_google_${location.slug}`} />
            <div className={`hue-${location.hue} rounded-[1.5rem] bg-h-tint p-5 sm:p-6`}>
              <p className="t-eyebrow text-h-text">Book at this clinic</p>
              <p className="t-h3 mt-2">Call, WhatsApp or send a request.</p>
              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <BookButton placement={`location_${location.slug}`} branch={location.slug} />
              </div>
              <p className="t-eyebrow mt-6 text-ink-soft">Dentists at Kheni</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {doctors.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/doctors/${d.slug}/`} className="inline-flex min-h-10 items-center rounded-full bg-white px-3.5 text-sm font-medium ring-1 ring-line">
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="t-small mt-3 text-ink-soft">Call to check which days a particular dentist is at this clinic.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className={`hue-${location.hue} bg-h-tint py-10 sm:py-14 lg:py-18`}>
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
            <div>
              <SectionIntro eyebrow="Inside the clinic" title={location.implantCentre ? "Where implant cases are planned." : "Our original clinic at Yogi Chowk."} highlight={location.implantCentre ? "implant cases" : "original clinic"} />
              <div className="mt-5 grid grid-cols-3 gap-2">
                {(locationPhotos[location.slug] ?? []).map((photo, i) => (
                  <MediaFrame
                    key={photo.src}
                    ratio="1 / 1"
                    src={photo.src}
                    alt={photo.alt}
                    objectPosition={photo.objectPosition}
                    className={i === 0 ? "col-span-2 row-span-2 rounded-[1.25rem]" : "rounded-[1.25rem]"}
                  />
                ))}
              </div>
            </div>
            <div>
              <SectionIntro eyebrow="Often booked here" title="Treatments at this clinic." highlight="this clinic" />
              <div className="mt-5 grid gap-3">
                {featured.map((t) => (
                  <TreatmentRow key={t.slug} treatment={t} placement={`location_${location.slug}`} />
                ))}
              </div>
              {other && (
                <Link href={`/locations/${other.slug}/`} className="lift mt-4 flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4 ring-1 ring-line">
                  <span>
                    <span className="t-eyebrow block text-ink-soft">Our other clinic</span>
                    <span className="t-card mt-0.5 block">{other.displayArea}</span>
                  </span>
                  <ArrowRight className="cta-arrow size-4 text-h-text" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </Container>
      </section>

      <CtaBand title={`Book a visit at ${location.displayArea}.`} highlight={location.displayArea} copy={location.hours} placement={`location_final_${location.slug}`} hue={location.hue} location={location} />
    </>
  );
}
