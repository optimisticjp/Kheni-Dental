import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { MediaFrame } from "@/components/kheni/media-frame";
import { BookButton, WhatsAppButton } from "@/components/ui/cta";
import { languages } from "@/content/clinic-proof";
import { googleReputation } from "@/content/google-reputation";
import { doctorPhotos } from "@/content/photos";
import { doctors, treatments, type Doctor } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Doctors, name first.
 *
 *   DoctorSpotlight   the principal dentist: large portrait frame, name as
 *                     the heading, credentials, three credential blocks,
 *                     treatment chips, Book and WhatsApp.
 *   DoctorCard        the rest of the team, each as professional as the
 *                     spotlight, only smaller.
 *
 * Every fact here is confirmed by the clinic. Nothing is added.
 */

function Portrait({ doctor, className, ratio = "4 / 5", mobileRatio, from = "sm" }: { doctor: Doctor; className?: string; ratio?: string; mobileRatio?: string; from?: "sm" | "lg" }) {
  const initials = doctor.name.replace(/^Dr\.?\s*/i, "").split(/\s+/).slice(0, 2).map((p) => p[0]).join("");
  // With a photograph MediaFrame renders it; the monogram field below is the
  // fallback for a doctor whose portrait has not arrived yet.
  const photo = doctorPhotos[doctor.slug];
  return (
    <MediaFrame src={photo?.src} alt={photo?.alt} objectPosition={photo?.objectPosition} ratio={ratio} mobileRatio={mobileRatio} from={from} className={cn("rounded-[1.5rem]", className)}>
      <div className="absolute inset-0">
        <div aria-hidden="true" className="absolute -right-12 -top-12 size-48 rounded-full bg-h-soft opacity-80" />
        <div aria-hidden="true" className="absolute -bottom-10 -left-10 size-40 rounded-full bg-h-fill opacity-20" />
        <span aria-hidden="true" className="absolute inset-0 grid place-items-center font-serif text-[clamp(3rem,10vw,5.5rem)] font-medium tracking-[-.04em] text-h-text/70">
          {initials}
        </span>
      </div>
    </MediaFrame>
  );
}

function Blocks({ doctor }: { doctor: Doctor }) {
  const blocks = [
    { value: `${doctor.yearsExperience}`, label: "Years in practice" },
    { value: doctor.credentials, label: "Qualification" },
    { value: googleReputation.sharedRating ?? "–", label: "On Google, both clinics" },
  ];
  return (
    <dl className="grid grid-cols-3 gap-2">
      {blocks.map((block) => (
        <div key={block.label} className="rounded-xl bg-white px-3 py-3 ring-1 ring-line">
          <dt className="sr-only">{block.label}</dt>
          <dd>
            <span className="block font-serif text-2xl font-semibold leading-none tracking-[-.02em] text-h-text">{block.value}</span>
            <span className="mt-1.5 block text-[.68rem] font-semibold uppercase leading-[1.3] tracking-[.08em] text-ink-soft">{block.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function DoctorSpotlight({ doctor = doctors[0], className, as: Heading = "h2" }: { doctor?: Doctor; className?: string; as?: "h1" | "h2" }) {
  const related = treatments.filter((t) => doctor.relatedTreatmentSlugs.includes(t.slug));
  return (
    <div className={cn(`hue-${doctor.hue} relative isolate overflow-hidden rounded-[1.75rem] bg-h-tint`, className)}>
      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-12 lg:p-10">
        <Portrait doctor={doctor} ratio="4 / 5" mobileRatio="16 / 10" from="lg" />
        <div>
          <p className="t-eyebrow text-h-text">{doctor.principal ? "Principal dentist" : "Our dentist"}</p>
          <Heading className="t-h1 mt-2">{doctor.name}</Heading>
          <p className="mt-2 font-serif text-xl font-medium leading-snug text-h-text">
            {doctor.credentials} · {doctor.specialty}
          </p>
          <p className="t-body mt-4 max-w-xl text-ink-soft">{doctor.bio}</p>
          <div className="mt-5">
            <Blocks doctor={doctor} />
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {related.map((t) => (
              <li key={t.slug} className={`hue-${t.hue}`}>
                <Link href={`/treatments/${t.slug}/`} className="inline-flex min-h-9 items-center gap-2 rounded-full bg-white px-3 text-sm font-medium ring-1 ring-line">
                  <span aria-hidden="true" className="size-2 rounded-full bg-h-fill" />
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
          <p className="t-small mt-3 text-ink-soft">Consults in {languages.join(", ")}.</p>
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <BookButton placement="doctor_spotlight" label={`Book with ${doctor.shortName}`} />
            <WhatsAppButton
              placement="doctor_spotlight"
              message={`Hello Kheni Dental, I would like to book an appointment with ${doctor.name}. Thank you.`}
              variant="secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className={`hue-${doctor.hue} lift flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white`}>
      <Portrait doctor={doctor} ratio="4 / 3" className="rounded-none" />
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="t-card">{doctor.name}</h3>
        <p className="t-small mt-1 text-ink-soft">{doctor.credentials}</p>
        <p className="mt-2 text-[.9375rem] font-semibold leading-snug text-h-text">{doctor.specialty}</p>
        <p className="mt-2 text-sm font-medium text-ink">{doctor.yearsExperience} years in practice</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {doctor.focus.map((item) => (
            <li key={item} className="rounded-full bg-h-tint px-2.5 py-1 text-[.75rem] font-medium text-ink">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          <Link
            href={`/doctors/${doctor.slug}/`}
            data-track="doctor_profile_view"
            data-placement="doctor_card"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line-strong px-4 text-sm font-semibold"
          >
            Profile
            <ArrowUpRight className="size-3.5 text-h-text" aria-hidden="true" />
          </Link>
          <BookButton placement="doctor_card" label="Book" className="min-h-11 px-4 text-sm" arrow={false} />
        </div>
      </div>
    </article>
  );
}

export function DoctorRoster({ exclude }: { exclude?: string }) {
  const team = doctors.filter((doctor) => doctor.slug !== exclude);
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((doctor) => (
        <DoctorCard key={doctor.slug} doctor={doctor} />
      ))}
    </div>
  );
}

/** A small "meet the team" hand-off for pages that only show the principal. */
export function TeamLink() {
  return (
    <Link
      href="/doctors/"
      data-track="doctor_profile_view"
      data-placement="team_link"
      className="lift mt-4 flex items-center justify-between gap-4 rounded-2xl border border-line bg-white px-5 py-4"
    >
      <span className="flex items-center gap-3">
        <span className="flex -space-x-2">
          {doctors.slice(1).map((d) => (
            <span key={d.slug} className={`hue-${d.hue} grid size-8 place-items-center rounded-full bg-h-soft text-[.7rem] font-bold text-h-text ring-2 ring-white`}>
              {d.name.replace(/^Dr\.?\s*/i, "")[0]}
            </span>
          ))}
        </span>
        <span className="text-sm font-medium text-ink">Three more dentists across both clinics</span>
      </span>
      <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-cobalt-deep">
        Meet the team
        <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
      </span>
    </Link>
  );
}
