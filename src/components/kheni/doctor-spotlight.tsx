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
 *   DoctorSpotlight   the principal dentist as an editorial spread on a
 *                     soft peach field: a tall portrait frame, the name in
 *                     Fraunces, the credential in gold, three facts, the
 *                     treatments they lead, Book and WhatsApp.
 *   DoctorCard        the rest of the team, same crop, same light.
 *
 * No portrait has arrived yet, so the frame is a designed ink panel with
 * the doctor's initials in gold. A real photograph drops into the same
 * frame with no layout change. Every fact here is confirmed by the clinic.
 */

export function Portrait({ doctor, className, ratio = "4 / 5", mobileRatio, from = "sm", tone = "dark" }: { doctor: Doctor; className?: string; ratio?: string; mobileRatio?: string; from?: "sm" | "lg"; tone?: "dark" | "light" }) {
  const initials = doctor.name.replace(/^Dr\.?\s*/i, "").split(/\s+/).slice(0, 2).map((p) => p[0]).join("");
  const photo = doctorPhotos[doctor.slug];
  return (
    <MediaFrame src={photo?.src} alt={photo?.alt} objectPosition={photo?.objectPosition} ratio={ratio} mobileRatio={mobileRatio} from={from} tone={tone} className={cn("rounded-[1.5rem]", className)}>
      <div className={cn("grain absolute inset-0", tone === "dark" ? "bg-ink-2" : "bg-sand")}>
        <div aria-hidden="true" className={cn("absolute inset-0", tone === "dark" ? "bloom-gold" : "dots opacity-60")} />
        <span aria-hidden="true" className={cn("absolute inset-0 grid place-items-center font-serif text-[clamp(3rem,9vw,5.5rem)] tracking-[-.04em]", tone === "dark" ? "text-gold" : "text-ink/20")}>
          {initials}
        </span>
        <span aria-hidden="true" className={cn("absolute bottom-5 left-5 right-5 h-px", tone === "dark" ? "rule-gold" : "bg-ink/10")} />
        <span className={cn("absolute bottom-7 left-5 t-eyebrow", tone === "dark" ? "text-ivory/60" : "text-ink-soft")}>{doctor.shortName}</span>
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
        <div key={block.label} className="rounded-xl border border-ink/[.08] bg-white/70 px-3 py-3">
          <dt className="sr-only">{block.label}</dt>
          <dd>
            <span className="block font-serif text-2xl leading-none tracking-[-.02em] text-gold-text">{block.value}</span>
            <span className="mt-1.5 block text-[.66rem] font-semibold uppercase leading-[1.3] tracking-[.1em] text-ink-soft">{block.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function DoctorSpotlight({ doctor = doctors[0], className, as: Heading = "h2" }: { doctor?: Doctor; className?: string; as?: "h1" | "h2" }) {
  const related = treatments.filter((t) => doctor.relatedTreatmentSlugs.includes(t.slug));
  return (
    <div className={cn("relative isolate overflow-hidden rounded-[1.75rem] bg-peach", className)}>
      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-12 lg:p-10">
        <Portrait doctor={doctor} ratio="4 / 5" mobileRatio="16 / 10" from="lg" />
        <div>
          <p className="t-eyebrow flex items-center gap-3 text-gold-text">
            {doctor.principal ? "Principal dentist" : "Our dentist"}
            <span aria-hidden="true" className="rule-gold h-px w-12" />
          </p>
          <Heading className="t-h1 mt-3">{doctor.name}</Heading>
          <p className="mt-2 font-serif text-xl leading-snug text-gold-text">
            {doctor.credentials} · {doctor.specialty}
          </p>
          <p className="t-body mt-4 max-w-xl text-ink-soft">{doctor.bio}</p>
          <div className="mt-5">
            <Blocks doctor={doctor} />
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {related.map((t) => (
              <li key={t.slug}>
                <Link href={`/treatments/${t.slug}/`} className="inline-flex min-h-9 items-center rounded-full border border-ink/15 bg-white/70 px-3 text-sm font-medium hover:border-ink">
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

export function DoctorCard({ doctor, compact = false }: { doctor: Doctor; compact?: boolean }) {
  return (
    <article className={cn("lift flex h-full overflow-hidden rounded-[1.5rem] border border-line bg-white", compact ? "flex-row min-[420px]:flex-col" : "flex-col")}>
      <Portrait doctor={doctor} ratio={compact ? "4 / 5" : "4 / 3"} tone="light" className={cn("rounded-none", compact && "w-[38%] shrink-0 self-stretch [aspect-ratio:auto] min-[420px]:w-auto min-[420px]:[aspect-ratio:4/5]")} />
      <div className={cn("flex flex-1 flex-col p-4", compact ? "min-w-0 sm:p-4" : "sm:p-5")}>
        <h3 className="t-card">{doctor.name}</h3>
        <p className="mt-1 text-sm font-medium text-gold-text">
          {doctor.credentials} · {doctor.specialty}
        </p>
        <p className="t-small mt-2 text-ink-soft">{doctor.yearsExperience} years in practice</p>
        {!compact && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {doctor.focus.map((item) => (
              <li key={item} className="rounded-full bg-sand px-2.5 py-1 text-[.75rem] font-medium text-ink">
                {item}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          <Link
            href={`/doctors/${doctor.slug}/`}
            data-track="doctor_profile_view"
            data-placement="doctor_card"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-ink/25 px-4 text-sm font-semibold hover:border-ink"
          >
            Profile
            <ArrowUpRight className="size-3.5 text-gold-text" aria-hidden="true" />
          </Link>
          <BookButton placement="doctor_card" label="Book" className={cn("min-h-11 px-4 text-sm shadow-none", compact && "hidden min-[420px]:inline-flex")} arrow={false} />
        </div>
      </div>
    </article>
  );
}

export function DoctorRoster({ exclude, compact = false }: { exclude?: string; compact?: boolean }) {
  const team = doctors.filter((doctor) => doctor.slug !== exclude);
  return (
    <div className={cn("grid gap-3 sm:gap-4", compact ? "grid-cols-1 min-[420px]:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3")}>
      {team.map((doctor) => (
        <DoctorCard key={doctor.slug} doctor={doctor} compact={compact} />
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
      className="lift mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white px-5 py-4"
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex -space-x-2">
          {doctors.slice(1).map((d) => (
            <span key={d.slug} className="grid size-8 place-items-center rounded-full bg-ink font-serif text-[.75rem] text-gold ring-2 ring-white">
              {d.name.replace(/^Dr\.?\s*/i, "")[0]}
            </span>
          ))}
        </span>
        <span className="text-sm font-medium text-ink">Three more dentists across both clinics</span>
      </span>
      <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-ink">
        Meet the team
        <ArrowRight className="cta-arrow size-4 text-gold-text" aria-hidden="true" />
      </span>
    </Link>
  );
}
