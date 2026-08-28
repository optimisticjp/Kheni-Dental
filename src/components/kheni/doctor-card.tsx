import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";

import { InitialsPortrait } from "@/components/kheni/pending";
import type { Doctor } from "@/content/site";
import { whatsappUrl } from "@/lib/links";
import { cn } from "@/lib/utils";

/**
 * Doctor card.
 *
 * Leads with the things Indian patients weigh up: name, degree, what the
 * doctor actually treats, and how many years they have been doing it. The
 * biography is trimmed to a line here; the full text lives on the profile.
 *
 * Until photography arrives the portrait is the doctor's initials set in the
 * brand serif, which reads as a designed choice rather than a missing asset.
 */
export function DoctorCard({ doctor, featured = false }: { doctor: Doctor; featured?: boolean }) {
  const message = `Hello Kheni Dental, I would like to book an appointment with ${doctor.name}.`;

  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border bg-card",
        featured ? "border-gold/30" : "border-border",
      )}
    >
      <div className="grid sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)]">
        <InitialsPortrait name={doctor.name} tone="light" className="aspect-[4/5] w-full sm:aspect-auto sm:h-full" />

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-serif text-2xl leading-tight">{doctor.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{doctor.credentials}</p>
          <p className="mt-2 text-sm leading-6">{doctor.specialty}</p>

          <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-4 text-sm">
            <div>
              <dt className="text-[.6rem] uppercase tracking-[.14em] text-muted-foreground">Experience</dt>
              <dd className="mt-0.5 font-semibold text-gold">{doctor.yearsExperience} years</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[.6rem] uppercase tracking-[.14em] text-muted-foreground">Treats</dt>
              <dd className="mt-0.5 text-sm">{doctor.badges.slice(0, 2).join(", ")}</dd>
            </div>
          </dl>

          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            <Link
              href={`/doctors/${doctor.slug}/`}
              data-track="doctor_profile_view"
              data-placement="doctor_card"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-xs font-semibold hover:border-gold/50"
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
      </div>
    </article>
  );
}
