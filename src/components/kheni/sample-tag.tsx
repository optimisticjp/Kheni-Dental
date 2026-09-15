import { reviewPreview } from "@/content/provenance";
import { cn } from "@/lib/utils";

/**
 * Small, honest markers for the clinic review preview.
 *
 *   SAMPLE       the item is placeholder content from review-sample.ts.
 *   TO CONFIRM   the item is a clinic figure or credential awaiting evidence.
 *
 * Both render only while the build is not indexable. On an indexable build
 * the integrity check has already refused any content that would need them,
 * so they never reach a real visitor.
 */
export function SampleTag({ kind = "sample", className, tone = "light" }: { kind?: "sample" | "confirm"; className?: string; tone?: "light" | "dark" }) {
  if (!reviewPreview) return null;
  const label = kind === "sample" ? "Sample" : "To confirm";
  return (
    <span
      className={cn(
        "inline-flex h-5 shrink-0 items-center rounded-full border px-1.5 align-middle text-[.6rem] font-bold uppercase tracking-[.12em]",
        tone === "dark" ? "border-gold/50 text-gold" : "border-gold-text/40 text-gold-text",
        className,
      )}
      title={kind === "sample" ? "Sample content for review. Replaced by the clinic's own before launch." : "Stated by the clinic. Evidence needed before launch."}
    >
      {label}
    </span>
  );
}

/**
 * One discreet line under the header, on review builds only. Says what the
 * markers mean so a reviewer does not mistake a sample for a fact.
 */
export function ReviewBanner() {
  if (!reviewPreview) return null;
  return (
    <div className="border-b border-gold/25 bg-ink text-center text-[.75rem] text-ivory/70" role="note">
      <p className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
        Clinic review preview · Items marked <span className="font-bold uppercase tracking-[.12em] text-gold">Sample</span> or <span className="font-bold uppercase tracking-[.12em] text-gold">To confirm</span> need final clinic information before launch.
      </p>
    </div>
  );
}
