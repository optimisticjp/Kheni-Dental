import { ArrowUpRight } from "lucide-react";

import type { Location } from "@/content/site";
import { directionsUrl, osmEmbedSrc } from "@/lib/maps";
import { cn } from "@/lib/utils";

/**
 * A branch on the map.
 *
 * The picture is OpenStreetMap, centred and marked on this branch's own
 * verified coordinates. No API key, no billing account, and the pin is placed
 * by coordinate rather than by a search that could re-rank — which is what
 * used to put both clinics in roughly the same part of Varachha.
 *
 * The actions stay on Google, where the clinic's reviews and turn-by-turn
 * navigation live, built from this branch's Place ID.
 */

/**
 * Map frame heights.
 *
 * A fixed height on a phone rather than an aspect ratio, because what a map
 * needs is absolute room, not a proportion of the column: OpenStreetMap's
 * attribution wraps to two lines below roughly 640px and takes about 60px off
 * the bottom of the frame whatever its width. An aspect ratio left the pin
 * squeezed between the top edge and that band. From `sm` up the attribution
 * fits on one line and a ratio is the better rule again.
 *
 * The attribution stays where OpenStreetMap puts it. Its usage policy is
 * explicit that attribution must not be hidden beneath UI or pushed
 * off-screen, and the frame is sized to sit around it rather than crop it.
 */
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
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-muted", RATIO[size], className)}>
      <iframe
        src={osmEmbedSrc(location)}
        title={`Map showing ${location.name}, ${location.areaLabel}`}
        loading="lazy"
        className="size-full border-0"
      />
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
