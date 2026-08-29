import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin, MessageCircle, Phone, Star } from "lucide-react";

import { PendingTag } from "@/components/kheni/pending";
import type { Location } from "@/content/site";
import { whatsappUrl } from "@/lib/links";
import { cn } from "@/lib/utils";
import { directionsUrl, placeUrl } from "@/lib/maps";

/**
 * Branch card.
 *
 * The mapless branch summary, for pages that mention both clinics in passing.
 * Anywhere a map belongs, `BranchLocator` owns it: one component, one map per
 * branch, and on a phone only the selected branch's map exists at all.
 *
 * Actions are ranked rather than equal. Directions is what almost everyone
 * wants from a branch block, so it leads; Call and WhatsApp are peers beneath
 * it; the clinic page is a plain link.
 */
export function LocationCard({ location }: { location: Location }) {
  const message = `Hello Kheni Dental, I would like to book an appointment at ${location.shortName}, ${location.areaLabel}.`;
  const verified = location.google.status === "verified";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {location.implantCentre && (
              <p className="mb-2 inline-flex rounded-full bg-gold/15 px-2.5 py-0.5 text-[.6rem] font-semibold uppercase tracking-[.14em] text-gold">
                Elite Implant Center
              </p>
            )}
            <h3 className="font-serif text-2xl leading-tight sm:text-3xl">{location.shortName}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{location.areaLabel}</p>
          </div>

          <a
            href={placeUrl(location)}
            target="_blank"
            rel="noreferrer"
            data-track="review_click"
            data-placement={`location_${location.slug}_rating`}
            data-branch={location.slug}
            className="inline-flex min-h-11 shrink-0 flex-col items-end justify-center rounded-xl border border-border px-3 py-1.5 text-right hover:border-gold/50"
          >
            {verified ? (
              <>
                <span className="inline-flex items-center gap-1 font-semibold text-gold">
                  <Star className="size-3.5 fill-current" aria-hidden="true" />
                  {location.google.rating}
                </span>
                <span className="text-[.6rem] uppercase tracking-[.1em] text-muted-foreground">
                  {location.google.reviewCount} reviews
                </span>
              </>
            ) : (
              <>
                <span className="inline-flex items-center gap-1 font-semibold text-gold/45">
                  <Star className="size-3.5 fill-current" aria-hidden="true" />
                  4.X
                </span>
                <span className="text-[.6rem] uppercase tracking-[.1em] text-muted-foreground">On Google</span>
              </>
            )}
          </a>
        </div>

        {!verified && <PendingTag className="mt-3 self-start" label="Rating to confirm" />}

        <p className="mt-4 text-sm leading-6 text-muted-foreground">{location.note}</p>

        <dl className="mt-5 space-y-2.5 text-sm">
          <div className="flex gap-3">
            <dt className="sr-only">Address</dt>
            <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
            <dd className="leading-6 text-muted-foreground">{location.address}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="sr-only">Opening hours</dt>
            <Clock3 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
            <dd className="leading-6 text-muted-foreground">{location.hours}</dd>
          </div>
        </dl>

        <div className="mt-auto pt-5">
          <a
            href={directionsUrl(location)}
            target="_blank"
            rel="noreferrer"
            data-track="directions_click"
            data-placement={`location_${location.slug}`}
            data-branch={location.slug}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white"
          >
            Get Directions
            <ArrowUpRight className="size-4 text-gold" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2">
          <a
            href={`tel:${location.phoneHref}`}
            data-track="phone_click"
            data-placement={`location_${location.slug}`}
            data-branch={location.slug}
            className={cn(
              "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-border px-3 text-sm font-semibold",
            )}
          >
            <Phone className="size-3.5 text-gold" aria-hidden="true" />
            Call
          </a>
          <a
            href={whatsappUrl(message, location.whatsappNumber)}
            target="_blank"
            rel="noreferrer"
            data-track="whatsapp_click"
            data-placement={`location_${location.slug}`}
            data-branch={location.slug}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-border px-3 text-sm font-semibold"
          >
            <MessageCircle className="size-3.5 text-gold" aria-hidden="true" />
            WhatsApp
          </a>
        </div>

        <Link
          href={`/locations/${location.slug}/`}
          className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold"
        >
          This clinic in detail
          <ArrowUpRight className="cta-arrow size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
