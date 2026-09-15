import { Container } from "@/components/ui/container";
import { Highlighted } from "@/components/kheni/section-intro";
import { smileNotes, type SmileNote as Note } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * A Smile Note: one short Kheni line set in Fraunces between sections,
 * opened by a champagne hairline, one word in italic rose. Brand voice, not
 * a patient quote, and never a claim. Two or three on a page at most.
 *
 * On light it sits on blush rather than white, because an editorial line is
 * exactly the moment the logo's rose should be in the room. `tone="dark"`
 * sets it on ink; `field` puts it on one of the soft supporting fields.
 */
export function SmileNote({
  index = 0,
  note,
  className,
  compact = false,
  tone = "light",
  field,
}: {
  index?: number;
  note?: Note;
  className?: string;
  compact?: boolean;
  tone?: "light" | "dark";
  field?: "sky" | "mint" | "peach" | "lavender" | "butter" | "sand";
}) {
  const n = note ?? smileNotes[index % smileNotes.length];
  const dark = tone === "dark";
  return (
    <section className={cn(dark && "on-dark", className)} aria-label="A note from Kheni Dental">
      <Container width="7xl">
        <figure
          className={cn(
            "relative isolate overflow-hidden rounded-[1.5rem] border",
            dark ? "grain border-rose/25 bg-ink-2 text-ivory" : field ? `border-transparent bg-${field}` : "border-transparent bg-blush",
            compact ? "px-6 py-7 sm:px-8" : "px-6 py-9 sm:px-10 sm:py-11 lg:px-14 lg:py-12",
          )}
        >
          <span aria-hidden="true" className="rule-gold block h-px w-14" />
          <blockquote className={cn("t-note mt-5", compact ? "max-w-[24ch]" : "max-w-[22ch]", dark ? "text-ivory" : "text-ink")}>
            <Highlighted title={n.line} highlight={n.highlight} />
          </blockquote>
          <figcaption className={cn("t-eyebrow mt-5", dark ? "text-gold" : "text-gold-text")}>Kheni Dental, Surat</figcaption>
        </figure>
      </Container>
    </section>
  );
}
