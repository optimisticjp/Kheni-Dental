import { MediaFrame, showContentGaps } from "@/components/kheni/pending";
import { clinicGallerySlots } from "@/content/capabilities";
import { cn } from "@/lib/utils";

/**
 * Clinic photography.
 *
 * Laid out as an editorial run rather than an even grid: the first frame is
 * the wide establishing shot and the rest step down in size, which is how a
 * real set of clinic photographs wants to be read. The composition is fixed
 * now so that when the photographs arrive they drop straight in.
 *
 * On phones this becomes a snap rail.
 *
 * HOW MANY WHILE THERE ARE NO PHOTOGRAPHS
 * Eight. Eight empty frames is not a gallery, it is a hole with a caption on
 * it, and it was the reason the technology and clinic pages read as unbuilt.
 * Three is enough to establish the composition and read as a deliberate
 * triptych; the full run comes back the moment there are real photographs to
 * put in it.
 */
export function ClinicGallery({
  slots = clinicGallerySlots,
  branchLabel,
  tone = "dark",
  bleed = true,
  className,
}: {
  slots?: readonly string[];
  branchLabel?: string;
  tone?: "dark" | "light";
  /**
   * Whether the touch rail may run to the edges of the screen.
   *
   * It reaches past its container with a negative margin and sizes its frames
   * in viewport units, which is right when the gallery owns the full column
   * and pushes the page sideways when it does not. Nested inside a grid cell,
   * that was 555px of horizontal overflow at 390.
   */
  bleed?: boolean;
  className?: string;
}) {
  const shot = (slot: string) => (branchLabel ? `${slot}, ${branchLabel}` : slot);
  const shown = showContentGaps ? slots : slots.slice(0, 3);
  const [lead, ...rest] = shown;

  return (
    // min-w-0 because the touch rail is a horizontal scroller: a grid or flex
    // item defaults to min-width:auto, so the track sizes itself to the rail's
    // full scroll width and pushes the whole page sideways. That is where the
    // 108px of horizontal overflow on the technology page came from at 320.
    <div className={cn("min-w-0", className)}>
      {/* Desktop: establishing frame plus a stepped grid. */}
      <div className="hidden gap-3 md:grid md:grid-cols-4">
        <MediaFrame shot={shot(lead)} tone={tone} className="col-span-2 row-span-2 min-h-64" />
        {rest.map((slot) => (
          <MediaFrame key={slot} shot={shot(slot)} tone={tone} ratio="4 / 3" />
        ))}
      </div>

      {/* Touch: one rail, full-size frames, no stack of nine. */}
      <div className={cn("edge-fade-dark md:hidden", bleed && "-mx-4 px-4")}>
        <div className="rail-snap flex gap-3 overflow-x-auto">
          {shown.map((slot) => (
            <MediaFrame
              key={slot}
              shot={shot(slot)}
              tone={tone}
              ratio="4 / 3"
              className={cn("shrink-0", bleed ? "w-[76vw] sm:w-[52vw]" : "w-[min(76%,17rem)]")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
