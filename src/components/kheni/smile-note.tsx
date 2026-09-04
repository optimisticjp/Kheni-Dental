import { KheniMonogram } from "@/components/kheni/brand-mark";
import { Container } from "@/components/ui/container";
import { Highlighted } from "@/components/kheni/section-intro";
import { smileNotes, type SmileNote as Note } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * A Smile Note: one short Kheni line set large between sections, with one
 * word highlighted in the note's hue. Brand voice, not a patient quote, and
 * never a claim. Use two to four on a page, never one per section.
 */
export function SmileNote({ index = 0, note, className, compact = false }: { index?: number; note?: Note; className?: string; compact?: boolean }) {
  const n = note ?? smileNotes[index % smileNotes.length];
  return (
    <section className={cn(`hue-${n.hue}`, className)} aria-label="A note from Kheni Dental">
      <Container width="7xl">
        <figure
          className={cn(
            "relative isolate overflow-hidden rounded-[1.5rem] bg-h-tint",
            compact ? "px-6 py-7 sm:px-8" : "px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-14",
          )}
        >
          <div aria-hidden="true" className="absolute -right-12 -top-16 size-48 rounded-full bg-h-soft opacity-70 sm:size-64" />
          <div aria-hidden="true" className="absolute -bottom-20 left-1/3 size-40 rounded-full bg-h-fill opacity-[.12] sm:size-56" />
          <KheniMonogram className="relative size-8" />
          <blockquote className={cn("t-note relative mt-4 text-ink", compact ? "max-w-[22ch]" : "max-w-[20ch]")}>
            <Highlighted title={n.line} highlight={n.highlight} />
          </blockquote>
          <figcaption className="t-eyebrow relative mt-4 text-h-text">Kheni Dental, Surat</figcaption>
        </figure>
      </Container>
    </section>
  );
}
