import { ArrowUpRight } from "lucide-react";

import type { Location } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Lazy Google Maps embed for a branch.
 *
 * Uses the keyless `maps.google.com/maps?output=embed` form, so there is no
 * API key, no billing and no extra infrastructure. It is orientation only: the
 * action stays the "Get Directions" button, which opens the branch's real
 * Google profile in the Maps app.
 *
 * `loading="lazy"` keeps it off the critical path, and the wrapper reserves the
 * aspect ratio so nothing shifts when the frame loads.
 */
export function BranchMap({
  location,
  className,
  ratio = "16 / 10",
}: {
  location: Location;
  className?: string;
  ratio?: string;
}) {
  const src = `https://maps.google.com/maps?q=${location.mapEmbedQuery}&z=15&output=embed`;

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-muted", className)} style={{ aspectRatio: ratio }}>
      <iframe
        src={src}
        title={`Map showing ${location.name}, ${location.areaLabel}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full border-0"
      />
    </div>
  );
}

/** Directions button. Always paired with a map, never replaced by it. */
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
      href={location.mapsUrl}
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
