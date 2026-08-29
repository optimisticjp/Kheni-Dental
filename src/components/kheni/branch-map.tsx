import { ArrowUpRight, Clock3, MapPin, Star } from "lucide-react";

import type { Location } from "@/content/site";
import { directionsUrl, embedSrc, placeUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";

/**
 * A branch on the map.
 *
 * Renders the official Google Maps Embed API pinned to this branch's Place ID
 * when `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` is set. Without a key it renders an
 * exact-location panel instead — never a text-search map, which is what used
 * to put both clinics in roughly the same part of Varachha.
 *
 * The fallback is not a warning or an empty box. It carries the same
 * information a patient actually wants from a map on a phone (where, how
 * good, when open, how do I get there) and its two actions resolve to the
 * exact listing, so the page is fully usable with or without the key.
 */

/** Map frame heights. Deliberately shorter on a phone than on a desktop. */
const RATIO = {
  standard: "aspect-[16/10] sm:aspect-[16/9]",
  /** For the mobile switcher, where the map sits above its own detail block. */
  compact: "aspect-[16/11] sm:aspect-[16/9]",
} as const;

export function BranchMap({
  location,
  className,
  size = "standard",
  variant = "full",
}: {
  location: Location;
  className?: string;
  size?: keyof typeof RATIO;
  /**
   * `slot` is for a map sitting directly above a block that already states the
   * address, hours and rating. Its fallback stays purely orientational, so the
   * page does not say the same thing twice.
   */
  variant?: "full" | "slot";
}) {
  const src = embedSrc(location);

  if (!src) {
    return variant === "slot" ? (
      <MapSlotFallback location={location} className={cn(RATIO[size], className)} />
    ) : (
      <ExactLocationPanel location={location} className={className} />
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-muted", RATIO[size], className)}>
      <iframe
        src={src}
        title={`Map showing ${location.name}, ${location.areaLabel}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="size-full border-0"
      />
    </div>
  );
}

/**
 * The map slot with no embed available. Deliberately holds only what a map
 * itself would have told you — which branch this is, and a way into the exact
 * listing — because the block underneath carries the address and hours.
 */
function MapSlotFallback({ location, className }: { location: Location; className?: string }) {
  return (
    <div
      className={cn(
        "light-surface relative isolate flex flex-col items-center justify-center gap-2 overflow-hidden border-border bg-[#f4f1ea] text-center text-foreground",
        className,
      )}
    >
      <div aria-hidden="true" className="map-grid pointer-events-none absolute inset-0 -z-10" />
      <MapPin className="size-5 text-gold" aria-hidden="true" />
      <p className="t-small px-4 font-medium">{location.displayArea}</p>
      <a
        href={placeUrl(location)}
        target="_blank"
        rel="noreferrer"
        data-track="review_click"
        data-placement={`map_slot_${location.slug}`}
        data-branch={location.slug}
        className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold"
      >
        Open exact location
        <ArrowUpRight className="size-3.5" aria-hidden="true" />
      </a>
    </div>
  );
}

/**
 * What a patient needs when there is no embed and nothing else on the page
 * states it: the exact address, this branch's own rating, the hours, and two
 * links that open the precise listing.
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

      <div className="mt-5 flex flex-wrap gap-2">
        <DirectionsButton location={location} placement={`exact_panel_${location.slug}`} />
        <a
          href={placeUrl(location)}
          target="_blank"
          rel="noreferrer"
          data-track="review_click"
          data-placement={`exact_panel_${location.slug}_profile`}
          data-branch={location.slug}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border bg-white px-4 text-sm font-semibold"
        >
          Open in Google Maps
          <ArrowUpRight className="size-3.5 text-gold" aria-hidden="true" />
        </a>
      </div>
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
