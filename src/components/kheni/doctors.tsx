import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { MediaFrame } from "@/components/kheni/media-frame";
import { BookButton, WhatsAppButton } from "@/components/ui/cta";
import { languages } from "@/content/clinic-proof";
import { doctorPhotos } from "@/content/photos";
import { doctors, treatments, type Doctor } from "@/content/site";
import { cn, fieldClass, isDarkHue } from "@/lib/utils";

/**
 * The dentists as people, not a directory.
 *
 *   DoctorFeature   the principal dentist as an editorial spread: the name
 *                   set huge, the philosophy as a pull quote, credentials
 *                   as a line, and the portrait in a smile window.
 *   DoctorPortrait  the other dentists as tall colour portraits with a
 *                   human line each, overlapping on desktop.
 *
 * A dentist without a real photograph renders as a colour field with
 * their initials, and the layout is built to look finished that way.
 * Every fact here is confirmed by the clinic. Nothing is added.
 */
export const initialsOf = (doctor: Doctor) => doctor.name.replace(/^Dr\.?\s*/i, "").split(/\s+/).slice(0, 2).map((p) => p[0]).join("");

export function Portrait({ doctor, className, ratio = "4 / 5", mobileRatio, from = "sm", shape = "smile", priority = false }: { doctor: Doctor; className?: string; ratio?: string; mobileRatio?: string; from?: "sm" | "lg"; shape?: "smile" | "smile-lg" | "arch" | "rounded"; priority?: boolean }) {
  const photo = doctorPhotos[doctor.slug];
  return (
    <MediaFrame src={photo?.src} alt={photo?.alt} objectPosition={photo?.objectPosition} ratio={ratio} mobileRatio={mobileRatio} from={from} shape={shape} priority={priority} className={cn(`mood-${doctor.hue}`, className)}>
      <div className={cn(fieldClass(doctor.hue), "absolute inset-0")}>
        <div aria-hidden="true" className="absolute -right-10 -top-10 size-44 rounded-full bg-white/20" />
        <div aria-hidden="true" className="absolute -bottom-8 -left-8 size-40 rounded-full bg-ink/10" />
        <span aria-hidden="true" className="absolute inset-0 grid place-items-center font-accent text-[clamp(4rem,22vw,9rem)] italic leading-none tracking-[-.04em]">
          {initialsOf(doctor)}
        </span>
      </div>
    </MediaFrame>
  );
}

export function DoctorFeature({ doctor = doctors[0], className, as: Heading = "h2", placement = "doctor_feature" }: { doctor?: Doctor; className?: string; as?: "h1" | "h2"; placement?: string }) {
  const related = treatments.filter((t) => doctor.relatedTreatmentSlugs.includes(t.slug));
  return (
    <div className={cn("grid gap-6 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-14", className)}>
      <Portrait doctor={doctor} ratio="4 / 5" mobileRatio="4 / 3" from="lg" shape="smile-lg" />
      <div>
        <p className="t-eyebrow text-m-text">{doctor.principal ? "Founder and principal dentist" : "Our dentist"}</p>
        <Heading className="t-h1 mt-2">{doctor.name}</Heading>
        <p className="mt-3 font-display text-lg font-bold tracking-[-.01em] text-m-text sm:text-xl">
          {doctor.credentials} · {doctor.specialty} · {doctor.yearsExperience} years
        </p>
        <blockquote className="mt-5 font-accent text-[1.6rem] italic leading-[1.15] tracking-[-.01em] text-ink sm:text-[2rem]">&ldquo;{doctor.philosophy}&rdquo;</blockquote>
        <p className="t-body mt-5 max-w-xl text-ink-soft">{doctor.bio}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {related.map((t) => (
            <li key={t.slug}>
              <Link href={`/treatments/${t.slug}/`} className={`mood-${t.hue} inline-flex min-h-9 items-center gap-2 rounded-full bg-white px-3 text-sm font-semibold ring-1 ring-line`}>
                <span aria-hidden="true" className="size-2 rounded-full bg-m-fill" />
                {t.title}
              </Link>
            </li>
          ))}
        </ul>
        <p className="t-small mt-3 text-ink-soft">Consults in {languages.join(", ")}.</p>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <BookButton placement={placement} label={`Book with ${doctor.shortName}`} />
          <WhatsAppButton placement={placement} message={`Hello Kheni Dental, I would like to book an appointment with ${doctor.name}. Thank you.`} variant="outline" />
        </div>
      </div>
    </div>
  );
}

export function DoctorPortrait({ doctor, placement = "doctor_portrait", className, compact = false }: { doctor: Doctor; placement?: string; className?: string; compact?: boolean }) {
  const dark = isDarkHue(doctor.hue);
  return (
    <Link href={`/doctors/${doctor.slug}/`} data-track="doctor_profile_view" data-placement={placement} className={cn("group block", className)}>
      <Portrait doctor={doctor} ratio={compact ? "1 / 1" : "4 / 5"} mobileRatio="4 / 5" shape="smile" />
      <span className="mt-3 block sm:mt-4">
        <span className={cn("block font-display font-extrabold leading-none tracking-[-.035em]", compact ? "text-[1.05rem] sm:text-[1.6rem]" : "text-[1.6rem]")}>{doctor.name}</span>
        <span className={cn("mt-1.5 block font-bold", compact ? "text-xs sm:text-sm" : "text-sm", `mood-${doctor.hue}`, dark ? "text-blue-deep" : "text-m-text")}>{doctor.specialty}</span>
        <span className={cn("mt-1 block text-ink-soft", compact ? "text-xs sm:text-sm" : "text-sm")}>
          {doctor.credentials} · {doctor.yearsExperience} years
        </span>
        <span className={cn("mt-2 block leading-snug text-ink", compact ? "hidden sm:block sm:text-[.95rem]" : "text-[.95rem]")}>{doctor.focus.join(" · ")}</span>
        <span className={cn("mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-ink", compact && "hidden sm:inline-flex")}>
          Profile
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}

/** The other three dentists in one row, offset so the row has rhythm. */
export function DoctorRoster({ exclude, placement }: { exclude?: string; placement?: string }) {
  const team = doctors.filter((doctor) => doctor.slug !== exclude);
  return (
    <div className="grid grid-cols-3 gap-x-2.5 gap-y-8 sm:gap-x-5">
      {team.map((doctor, i) => (
        <DoctorPortrait key={doctor.slug} doctor={doctor} placement={placement} compact className={cn(i % 2 === 1 && "mt-6 sm:mt-10")} />
      ))}
    </div>
  );
}

/** A small "meet the team" hand-off for pages that only show the principal. */
export function TeamLink({ className }: { className?: string }) {
  return (
    <Link href="/doctors/" data-track="doctor_profile_view" data-placement="team_link" className={cn("lift flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-[1.25rem] bg-ink px-5 py-4 text-white", className)}>
      <span className="flex items-center gap-3">
        <span className="flex -space-x-2">
          {doctors.slice(1).map((d) => (
            <span key={d.slug} className={`${fieldClass(d.hue)} grid size-9 place-items-center rounded-full font-accent text-sm italic ring-2 ring-ink`}>
              {initialsOf(d)}
            </span>
          ))}
        </span>
        <span className="font-display text-base font-bold tracking-[-.01em]">Three more dentists across both clinics</span>
      </span>
      <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-butter">
        Meet them
        <ArrowRight className="size-4" aria-hidden="true" />
      </span>
    </Link>
  );
}
