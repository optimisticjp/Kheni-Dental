import { ArrowUpRight, Clock3, MapPin, Star } from "lucide-react";

import { AerialFrame } from "@/components/kheni/aerial-frame";
import type { Location } from "@/content/site";
import { directionsUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";

/**
 * A branch on the map.
 *
 * The picture is a real aerial photograph from Bing's keyless consumer embed,
 * centred on this branch's own verified coordinates, with our own marker at
 * the centre. No API key, no billing account, and the view is placed by
 * coordinate rather than by a search that could re-rank — which is what used
 * to put both clinics in roughly the same part of Varachha.
 *
 * The actions stay on Google, where the clinic's reviews and turn-by-turn
 * navigation live, built from this branch's Place ID.
 *
 * `ExactLocationPanel` sits underneath the photograph on every render. It is
 * what a patient is left with if the imagery never arrives, so it carries
 * real information rather than an apology.
 */

/** Map frame heights. Deliberately shorter on a phone than on a desktop. */
const RATIO = {
  standard: "h-68 sm:h-auto sm:aspect-[16/9]",
  /** For the mobile switcher, where the map sits above its own detail block. */
  compact: "h-64 sm:h-auto sm:aspect-[16/9]",
} as const;

export function BranchMap({
  location,
  className,
  size = "standard",
}: {
  location: Location;
  className?: string;
  size?: keyof typeof RATIO;
}) {
  return (
    <AerialFrame
      location={location}
      className={cn(
        "group/map relative isolate overflow-hidden rounded-2xl border border-border bg-muted",
        RATIO[size],
        className,
      )}
    >
      <ExactLocationPanel location={location} className="size-full" />
    </AerialFrame>
  );
}

/**
 * What a patient needs when the photograph is not there: which branch this
 * is, its own rating, the exact address and the hours. Rendered on the server
 * and never removed, so it is the floor the map sits on rather than a state
 * something has to detect and swap in.
 */
export function ExactLocationPanel({ location, className }: { location: Location; className?: string }) {
  const verified = location.google.status === "verified";

  return (
    <div
      className={cn(
        "light-surface relative isolate overflow-hidden rounded-2xl border border-border bg-[#f4f1ea] p-5 text-foreground sm:p-6",
        className,
      )}
    >
      <div aria-hidden="true" className="map-grid pointer-events-none absolute inset-0 -z-10" />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="t-card">{location.shortName}</p>
          <p className="t-small mt-0.5 text-muted-foreground">
            {location.shortName === location.displayArea
              ? location.areaLabel.replace(/,\s*Surat$/, "")
              : location.displayArea}
          </p>
        </div>
        {verified && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-2.5 py-1">
            <Star className="size-3.5 fill-current text-gold" aria-hidden="true" />
            <span className="text-sm font-semibold text-gold">{location.google.rating}</span>
            <span className="t-small text-muted-foreground">{location.google.reviewCount}</span>
          </span>
        )}
      </div>

      <dl className="mt-4 space-y-2">
        <div className="flex gap-2.5">
          <dt className="sr-only">Address</dt>
          <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
          <dd className="t-small text-muted-foreground">{location.address}</dd>
        </div>
        <div className="flex gap-2.5">
          <dt className="sr-only">Opening hours</dt>
          <Clock3 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
          <dd className="t-small text-muted-foreground">{location.hours}</dd>
        </div>
      </dl>
    </div>
  );
}

/** Directions to this exact listing. Built from the branch's Place ID. */
export function DirectionsButton({
  location,
  placement,
  className,
}: {
  location: Location;
  placement: string;
  className?: string;
}) {
  return (
    <a
      href={directionsUrl(location)}
      target="_blank"
      rel="noreferrer"
      data-track="directions_click"
      data-placement={placement}
      data-branch={location.slug}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white",
        className,
      )}
    >
      Get Directions
      <ArrowUpRight className="size-4 text-gold" aria-hidden="true" />
    </a>
  );
}
