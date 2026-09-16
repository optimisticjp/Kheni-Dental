import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Clock3, MapPin } from "lucide-react";

import { BranchMap, DirectionsButton } from "@/components/kheni/branch-map";
import { CtaBand } from "@/components/kheni/cta-band";
import { MediaFrame } from "@/components/kheni/media-frame";
import { BranchProof, Stars } from "@/components/kheni/proof";
import { SectionIntro } from "@/components/kheni/section-intro";
import { TreatmentRow } from "@/components/kheni/treatment-poster";
import { Container } from "@/components/ui/container";
import { BookButton, CallButton, WhatsAppButton } from "@/components/ui/cta";
import { locationPhotos } from "@/content/photos";
import { doctors, locations, treatments, type DoctorBranch } from "@/content/site";

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
    description: `Kheni Dental at ${location.shortName}, ${location.areaLabel}. Address, phone, WhatsApp, opening hours, facilities, dentists and directions.`,
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) notFound();
  const other = locations.find((l) => l.slug !== slug);
  // Implant consultations are offered at both clinics (ledger conflict C1), so
  // both lists lead with everyday care and include implants.
  const featured = treatments.filter((t) => (location.implantCentre ? ["dental-implants-surat", "dental-check-up-surat", "root-canal-treatment-surat"] : ["dental-check-up-surat", "root-canal-treatment-surat", "kids-dentistry-surat", "dental-implants-surat"]).includes(t.slug));
  const team = doctors.filter((d) => d.branchSlugs.includes(location.slug as DoctorBranch));

  return (
    <>
      <section className={`hue-${location.hue} on-dark grain relative isolate overflow-hidden bg-ink text-ivory`}>
        <div aria-hidden="true" className="bloom-gold pointer-events-none absolute inset-0" />
        <Container width="7xl" className="relative grid gap-6 sec-hero lg:grid-cols-[1fr_.95fr] lg:items-center lg:gap-12">
          <div>
            <p className="t-eyebrow flex items-center gap-3 text-gold">
              {location.implantCentre ? "Kheni Dental & Elite Implant Center" : "Kheni Dental"}
              <span aria-hidden="true" className="rule-gold h-px w-12" />
            </p>
            <h1 className="t-h1 mt-2">
              {location.displayArea}
              {location.shortName !== location.displayArea && <span className="block text-[.55em] text-ivory/60">{location.shortName}</span>}
            </h1>
            {location.google.status === "verified" && (
              <p className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-ivory/15 bg-ivory/[.06] px-3">
                <span className="font-serif text-xl leading-none text-gold">{location.google.rating}</span>
                <Stars />
                <span className="t-small text-ivory/70">{location.google.reviewCount} Google reviews for this clinic</span>
              </p>
            )}
            <p className="t-stand measure-stand mt-4 text-ivory/70">{location.note}</p>
            <dl className="mt-5 space-y-2.5">
              <div className="flex gap-3">
                <dt className="sr-only">Address</dt>
                <MapPin className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                <dd className="t-body text-ivory/85">
                  {location.addressLines.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="sr-only">Hours</dt>
                <Clock3 className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                <dd className="t-body text-ivory/85">
                  {location.hours}
                  {location.hoursNote && <span className="t-small block text-ivory/55">{location.hoursNote}</span>}
                </dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <DirectionsButton location={location} placement={`location_hero_${location.slug}`} className="bg-gold text-ink [&>svg]:text-ink" />
              <CallButton placement={`location_hero_${location.slug}`} location={location} label={location.phoneDisplay} variant="onDark" />
              <WhatsAppButton placement={`location_hero_${location.slug}`} location={location} variant="onDark" />
            </div>
          </div>
          <BranchMap location={location} size="tall" className="border border-ivory/10" />
        </Container>
      </section>

      <section className="sec">
        <Container width="7xl">
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            <BranchProof location={location} placement={`location_google_${location.slug}`} />
            <div className={`hue-${location.hue} rounded-[1.5rem] bg-h-tint p-5 sm:p-6`}>
              <p className="t-eyebrow text-gold-text">Book at this clinic</p>
              <p className="t-h3 mt-2">Call, WhatsApp or send a request.</p>
              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <BookButton placement={`location_${location.slug}`} branch={location.slug} />
              </div>
              <p className="t-eyebrow mt-6 text-ink-soft">Dentists at this clinic</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {team.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/doctors/${d.slug}/`} className="inline-flex min-h-10 items-center rounded-full bg-white px-3.5 text-sm font-medium ring-1 ring-line">
                      {d.name}
                      {d.availabilityNote && location.slug === "swastik-plaza" && <span className="ml-1.5 text-ink-soft">· by appointment</span>}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="t-small mt-3 text-ink-soft">Call to check which days a particular dentist is at this clinic.</p>
              {location.facilities.length > 0 && (
                <>
                  <p className="t-eyebrow mt-6 text-ink-soft">At this clinic</p>
                  <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                    {location.facilities.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="size-3.5 text-gold-text" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className={`hue-${location.hue} bg-h-tint sec`}>
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
            <div>
              <SectionIntro eyebrow="Inside the clinic" title={location.implantCentre ? "Our Hirabaug clinic, open since 2020." : "Our first clinic, open since 2012."} highlight={location.implantCentre ? "since 2020" : "since 2012"} />
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
                  <ArrowRight className="cta-arrow size-4 text-gold-text" aria-hidden="true" />
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
