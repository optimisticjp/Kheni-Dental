import { MediaFrame } from "@/components/kheni/pending";
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
 * On phones this becomes a snap rail. A stack of nine dashed frames is a lot
 * of scrolling for something that is, today, entirely placeholder.
 */
export function ClinicGallery({
  slots = clinicGallerySlots,
  branchLabel,
  tone = "dark",
  className,
}: {
  slots?: readonly string[];
  branchLabel?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const shot = (slot: string) => (branchLabel ? `${slot}, ${branchLabel}` : slot);
  const [lead, ...rest] = slots;

  return (
    <div className={className}>
      {/* Desktop: establishing frame plus a stepped grid. */}
      <div className="hidden gap-3 md:grid md:grid-cols-4">
        <MediaFrame shot={shot(lead)} tone={tone} className="col-span-2 row-span-2 min-h-64" />
        {rest.slice(0, 6).map((slot) => (
          <MediaFrame key={slot} shot={shot(slot)} tone={tone} ratio="4 / 3" />
        ))}
      </div>

      {/* Touch: one rail, full-size frames, no stack of nine. */}
      <div className="edge-fade-dark -mx-4 px-4 md:hidden">
        <div className="rail-snap flex gap-3 overflow-x-auto">
          {slots.map((slot) => (
            <MediaFrame
              key={slot}
              shot={shot(slot)}
              tone={tone}
              ratio="4 / 3"
              className={cn("w-[76vw] shrink-0 sm:w-[52vw]")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
