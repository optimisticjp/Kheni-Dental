import { ArrowUpRight, Clock3, MapPin } from "lucide-react";

import { AerialFrame } from "@/components/kheni/aerial-frame";
import { Stars } from "@/components/kheni/proof";
import type { Location } from "@/content/site";
import { directionsUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";

/**
 * A branch on the map: a real aerial photograph from Bing's keyless embed,
 * centred on this branch's own verified coordinates, with our marker at the
 * centre. Actions stay on Google, built from this branch's Place ID.
 *
 * `ExactLocationPanel` sits underneath the photograph on every render, so a
 * patient with no imagery still has the address, the rating and the hours.
 */
const RATIO = {
  standard: "h-64 sm:h-auto sm:aspect-[16/9]",
  compact: "h-56 sm:h-auto sm:aspect-[16/9]",
  tall: "h-64 sm:h-auto sm:aspect-[4/3]",
} as const;

export function BranchMap({ location, className, size = "standard" }: { location: Location; className?: string; size?: keyof typeof RATIO }) {
  return (
    <AerialFrame location={location} className={cn("group/map relative isolate overflow-hidden rounded-[1.25rem] bg-navy-tint", RATIO[size], className)}>
      <ExactLocationPanel location={location} className="size-full" />
    </AerialFrame>
  );
}

export function ExactLocationPanel({ location, className }: { location: Location; className?: string }) {
  const verified = location.google.status === "verified";
  return (
    <div className={cn(`hue-${location.hue} dots relative isolate overflow-hidden rounded-[1.25rem] bg-h-tint p-5 text-ink sm:p-6`, className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="t-card">{location.displayArea}</p>
          <p className="t-small mt-0.5 text-ink-soft">{location.shortName === location.displayArea ? location.landmark : location.shortName}</p>
        </div>
        {verified && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-2.5 py-1">
            <Stars size="size-3" />
            <span className="text-sm font-semibold">{location.google.rating}</span>
          </span>
        )}
      </div>
      <dl className="mt-4 space-y-2">
        <div className="flex gap-2.5">
          <dt className="sr-only">Address</dt>
          <MapPin className="mt-0.5 size-4 shrink-0 text-h-text" aria-hidden="true" />
          <dd className="t-small text-ink-soft">{location.address}</dd>
        </div>
        <div className="flex gap-2.5">
          <dt className="sr-only">Opening hours</dt>
          <Clock3 className="mt-0.5 size-4 shrink-0 text-h-text" aria-hidden="true" />
          <dd className="t-small text-ink-soft">{location.hours}</dd>
        </div>
      </dl>
    </div>
  );
}

export function DirectionsButton({ location, placement, className }: { location: Location; placement: string; className?: string }) {
  return (
    <a
      href={directionsUrl(location)}
      target="_blank"
      rel="noreferrer"
      data-track="directions_click"
      data-placement={placement}
      data-branch={location.slug}
      className={cn("inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-[.9375rem] font-semibold text-white", className)}
    >
      <MapPin className="size-4 text-sunshine" aria-hidden="true" />
      Get Directions
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </a>
  );
}
