import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";

import { InitialsPortrait, PendingTag } from "@/components/kheni/pending";
import { languages } from "@/content/clinic-proof";
import { googleReputation } from "@/content/google-reputation";
import { doctors, type Doctor } from "@/content/site";
import { whatsappUrl } from "@/lib/links";
import { cn } from "@/lib/utils";

/**
 * Doctor authority.
 *
 * Indian patients choose a dentist before they choose a clinic, so the doctor
 * has to arrive with weight rather than as a face in a grid. Two pieces:
 *
 *   PrincipalDoctor   an asymmetric editorial panel for Dr. Mayur Kheni, with
 *                     a tall portrait, three hard credential blocks and both
 *                     ways of reaching him.
 *   DoctorRoster      the rest of the team, each card carrying degree,
 *                     specialty, years and what they actually treat.
 *
 * Every credential block below is a fact already confirmed in the repository.
 * Training, memberships, awards and branch days are not confirmed, so they
 * render as marked pending rows instead of being filled in with something
 * plausible.
 */

type Block = { value: string; label: string };

function CredentialBlocks({ blocks, dark = true }: { blocks: Block[]; dark?: boolean }) {
  return (
    <dl className="grid grid-cols-3 gap-2.5">
      {blocks.map((block) => (
        <div
          key={block.label}
          className={cn(
            "rounded-xl border px-3 py-3.5",
            dark ? "border-white/12 bg-white/[.03]" : "border-border bg-card",
          )}
        >
          <dt className="sr-only">{block.label}</dt>
          <dd>
            <span className="block font-serif text-xl leading-none tracking-[-.02em] text-gold">{block.value}</span>
            <span
              className={cn(
                "mt-2 block text-[.6rem] uppercase leading-[1.35] tracking-[.12em]",
                dark ? "text-white/45" : "text-muted-foreground",
              )}
            >
              {block.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** The principal dentist panel. */
export function PrincipalDoctor({ doctor = doctors[0] }: { doctor?: Doctor }) {
  const message = `Hello Kheni Dental, I would like to book a consultation with ${doctor.name}.`;
  const blocks: Block[] = [
    { value: String(doctor.yearsExperience), label: "Years in practice" },
    { value: doctor.credentials, label: "Qualification" },
    {
      value: googleReputation.sharedRating ? `${googleReputation.sharedRating} ★` : "—",
      label: "Both clinics on Google",
    },
  ];

  return (
    <div className="grain relative isolate overflow-hidden rounded-[1.6rem] border border-gold/25 bg-[#101010] text-white">
      <div aria-hidden="true" className="bloom-gold pointer-events-none absolute inset-0 -z-10" />

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-12 lg:p-10">
        {/* Portrait. Falls back to initials in the brand serif; a real
            photograph drops into the same frame with no layout change. */}
        <div className="relative">
          <InitialsPortrait name={doctor.name} className="aspect-[4/5] w-full rounded-[1.2rem]" />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[1.2rem] ring-1 ring-inset ring-gold/25"
          />
          <PendingTag className="absolute bottom-3 left-3" label="Portrait needed" />
        </div>

        <div>
          <div className="flex items-center gap-3">
            <span className="text-[.66rem] font-semibold uppercase tracking-[.2em] text-gold">
              Meet the principal dentist
            </span>
            <span aria-hidden="true" className="rule-gold h-px flex-1" />
          </div>

          <h2 className="mt-5 font-serif text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1] tracking-[-.04em]">
            {doctor.name}
          </h2>
          <p className="mt-3 text-sm text-white/50">{doctor.credentials}</p>
          <p className="mt-1 font-serif text-xl leading-snug text-gold">{doctor.specialty}</p>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">{doctor.bio}</p>

          <div className="mt-7">
            <CredentialBlocks blocks={blocks} />
          </div>

          <p className="mt-5 text-xs text-white/40">Consults in {languages.join(", ")}.</p>

          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <Link
              href={`/doctors/${doctor.slug}/`}
              data-track="doctor_profile_view"
              data-placement="principal_doctor"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-ink sm:whitespace-nowrap"
            >
              Consult {doctor.name.split(" ").slice(0, 2).join(" ")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href={whatsappUrl(message)}
              target="_blank"
              rel="noreferrer"
              data-track="whatsapp_click"
              data-placement="principal_doctor"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/18 px-6 text-sm font-semibold sm:whitespace-nowrap"
            >
              <MessageCircle className="size-4 text-gold" aria-hidden="true" />
              Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/** One doctor, as a card. Used for the rest of the team. */
export function DoctorCard({ doctor, tone = "light" }: { doctor: Doctor; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  const message = `Hello Kheni Dental, I would like to book an appointment with ${doctor.name}.`;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border transition-colors",
        dark ? "border-white/12 bg-white/[.03] text-white hover:border-gold/35" : "border-border bg-card hover:border-gold/40",
      )}
    >
      <div className="relative">
        <InitialsPortrait name={doctor.name} tone={tone} className="aspect-[5/4] w-full rounded-none" />
        <span
          className={cn(
            "absolute bottom-3 left-3 inline-flex items-center rounded-full px-2.5 py-1 text-[.6rem] font-semibold uppercase tracking-[.12em]",
            dark ? "bg-ink/70 text-gold" : "bg-ink/80 text-gold",
          )}
        >
          {doctor.yearsExperience} years
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl leading-tight tracking-[-.02em]">{doctor.name}</h3>
        <p className={cn("mt-1 text-xs", dark ? "text-white/40" : "text-muted-foreground")}>{doctor.credentials}</p>
        <p className="mt-2.5 text-sm leading-6 text-gold">{doctor.specialty}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {doctor.badges.slice(0, 3).map((badge) => (
            <li
              key={badge}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[.68rem]",
                dark ? "border-white/12 text-white/55" : "border-border text-muted-foreground",
              )}
            >
              {badge}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <Link
            href={`/doctors/${doctor.slug}/`}
            data-track="doctor_profile_view"
            data-placement="doctor_card"
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-xs font-semibold",
              dark ? "border-white/15" : "border-border",
            )}
          >
            View profile
            <ArrowUpRight className="size-3.5 text-gold" aria-hidden="true" />
          </Link>
          <a
            href={whatsappUrl(message)}
            target="_blank"
            rel="noreferrer"
            data-track="whatsapp_click"
            data-placement="doctor_card"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-4 text-xs font-semibold text-ink"
          >
            <MessageCircle className="size-3.5" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

/** The team, minus whoever is being shown as principal above. */
export function DoctorRoster({ exclude, tone = "light" }: { exclude?: string; tone?: "dark" | "light" }) {
  const team = doctors.filter((doctor) => doctor.slug !== exclude);
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((doctor) => (
        <DoctorCard key={doctor.slug} doctor={doctor} tone={tone} />
      ))}
    </div>
  );
}
