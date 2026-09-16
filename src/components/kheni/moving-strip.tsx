import { googleReputation } from "@/content/google-reputation";
import { clinicHours, site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The moving strip under the header.
 *
 * The doctor asked for this back. It existed once before, in a demo
 * marketing layer, and it scrolled lines like "Rated #1 in Surat",
 * "98.6% still holding" and "Award winning full mouth work". None of that
 * was true, which is why the layer was deleted, and the content integrity
 * check would now fail the build on most of it.
 *
 * So the strip is back and the claims are not. Every line below is a fact
 * the clinic confirmed on its own form or that is checkable on a public
 * listing, and each one is derived from the content layer rather than typed
 * here, so it cannot drift out of date on its own.
 *
 * A screen reader gets one list. The duplicate that makes the loop seamless
 * is hidden from it.
 */

/** Facts, in the order they read best. Nothing here is a claim. */
function stripFacts(): string[] {
  const rating = googleReputation.sharedRating;
  const reviews = googleReputation.combinedReviews;
  return [
    "Yogi Chowk and Hirabaug, Surat",
    rating ? `${rating} on Google across ${reviews} reviews` : `${reviews} Google reviews`,
    "Dentists since 2012",
    "Gujarati, Hindi and English",
    "Implants planned and placed at Yogi Chowk",
    `${clinicHours.days}, morning and evening`,
    "Four dentists, two clinics",
    "The plan and the estimate before treatment starts",
    site.instagramHandle,
  ];
}

export function MovingStrip({ className, tone = "gold" }: { className?: string; tone?: "gold" | "dark" }) {
  const facts = stripFacts();

  const track = (
    <ul className="strip-track">
      {facts.map((fact) => (
        <li key={fact} className="flex items-center gap-3 whitespace-nowrap px-4 text-[.8125rem] font-semibold uppercase tracking-[.1em] sm:px-6 sm:text-[.875rem]">
          <span aria-hidden="true" className={cn("size-1.5 shrink-0 rotate-45", tone === "gold" ? "bg-ink/45" : "bg-gold")} />
          {fact}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        // Pinned above the sticky header, so it is the first thing on every
        // page and never scrolls away. The header sits directly beneath it at
        // `top: var(--strip-h)`, which is why the height is fixed rather than
        // left to the content.
        "strip sticky top-0 z-50 isolate flex h-[var(--strip-h)] items-center overflow-hidden",
        tone === "gold" ? "bg-gold text-ink" : "bg-ink-2 text-gold",
        className,
      )}
    >
      <div className="strip-rail flex" aria-label="Kheni Dental at a glance">
        {track}
        <div aria-hidden="true" className="flex">{track}</div>
      </div>
    </div>
  );
}
