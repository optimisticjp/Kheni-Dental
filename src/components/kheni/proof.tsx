import { ArrowUpRight, Star } from "lucide-react";

import { GoogleGlyph } from "@/components/icons/google-glyph";
import { googleReputation, verifiedBranches } from "@/content/google-reputation";
import { reviewHighlights, type Location } from "@/content/site";
import { placeUrl, writeReviewUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";

/**
 * Google proof, in three sizes.
 *
 *   ProofChip      one line: 4.9, stars, review count. For heroes and cards.
 *   ProofCluster   the rating large, both listings named, dated. For the
 *                  homepage, the reviews page and decision points.
 *   BranchProof    one clinic's own figure. Never the other clinic's.
 *
 * Every figure is a verified Google value and every combined count says,
 * in the same breath, that it is two listings added together.
 */

export function Stars({ className, size = "size-3.5" }: { className?: string; size?: string }) {
  return (
    <span className={cn("flex gap-0.5 text-gold", className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className={cn(size, "fill-current")} />
      ))}
    </span>
  );
}

export function ProofChip({ placement, className, tone = "light" }: { placement: string; className?: string; tone?: "light" | "dark" }) {
  const { sharedRating, combinedReviews } = googleReputation;
  if (!sharedRating) return null;
  return (
    <a
      href="/reviews/"
      data-track="review_click"
      data-placement={placement}
      className={cn(
        "inline-flex min-h-11 items-center gap-2.5 rounded-full py-1.5 pl-3 pr-4 text-sm",
        tone === "dark" ? "bg-white/10 text-white ring-1 ring-white/20" : "glass text-ink ring-1 ring-line",
        className,
      )}
    >
      <GoogleGlyph className="size-4 shrink-0" />
      <strong className="font-serif text-lg font-semibold leading-none">{sharedRating}</strong>
      <Stars />
      <span className={cn("hidden sm:inline", tone === "dark" ? "text-white/70" : "text-ink-soft")}>{combinedReviews} reviews, two clinics</span>
      <span className={cn("sm:hidden", tone === "dark" ? "text-white/70" : "text-ink-soft")}>{combinedReviews} reviews</span>
    </a>
  );
}

export function ProofCluster({ placement, className }: { placement: string; className?: string }) {
  const { sharedRating, combinedReviews, combinedLabel, verifiedOn } = googleReputation;
  return (
    <div className={cn("relative isolate overflow-hidden rounded-[1.5rem] border border-line bg-white p-5 sm:p-6", className)}>
      <div aria-hidden="true" className="absolute -right-10 -top-10 size-36 rounded-full bg-sunshine-tint" />
      <div className="relative flex items-center gap-2">
        <GoogleGlyph className="size-5" />
        <span className="t-eyebrow text-ink-soft">On Google</span>
      </div>
      <div className="relative mt-3 flex flex-wrap items-end gap-x-5 gap-y-2">
        {sharedRating && (
          <div className="flex items-end gap-2.5">
            <span className="t-proof text-ink">{sharedRating}</span>
            <Stars className="mb-1.5" size="size-4" />
          </div>
        )}
        <div>
          <p className="font-serif text-2xl font-semibold leading-none">{combinedReviews}</p>
          <p className="t-small mt-1 max-w-[24ch] text-ink-soft">{combinedLabel}</p>
        </div>
      </div>
      <ul className="relative mt-4 grid gap-2 sm:grid-cols-2">
        {verifiedBranches.map((branch) => (
          <li key={branch.location.slug} className={`hue-${branch.location.hue}`}>
            <a
              href={placeUrl(branch.location)}
              target="_blank"
              rel="noreferrer"
              data-track="google_reviews_click"
              data-placement={`${placement}_${branch.location.slug}`}
              data-branch={branch.location.slug}
              className="flex min-h-12 items-center justify-between gap-3 rounded-xl bg-h-tint px-3.5 py-2"
            >
              <span className="flex items-center gap-2.5">
                <span aria-hidden="true" className="size-2.5 rounded-full bg-h-fill" />
                <span className="text-sm font-semibold">{branch.location.displayArea}</span>
              </span>
              <span className="flex items-center gap-2 text-sm">
                <span className="font-serif font-semibold">{branch.rating}</span>
                <span className="text-ink-soft">{branch.reviewCount}</span>
                <ArrowUpRight className="size-3.5 text-h-text" aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
      {verifiedOn && <p className="relative mt-3 text-[.72rem] text-ink-soft/80">Two separate Google listings, checked {verifiedOn}.</p>}
    </div>
  );
}

export function BranchProof({ location, placement, className }: { location: Location; placement: string; className?: string }) {
  const verified = location.google.status === "verified";
  return (
    <div className={cn(`hue-${location.hue} rounded-[1.5rem] border border-line bg-white p-5 sm:p-6`, className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2">
            <GoogleGlyph className="size-4" />
            <span className="t-eyebrow text-ink-soft">Google reviews</span>
          </span>
          <p className="t-h3 mt-3">{location.displayArea}</p>
          <p className="t-small mt-0.5 text-ink-soft">{location.shortName === location.displayArea ? location.areaLabel : location.shortName}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="t-proof text-ink">{verified ? location.google.rating : "–"}</p>
          {verified && <Stars className="mt-1.5 justify-end" />}
        </div>
      </div>
      {verified ? (
        <p className="t-body mt-4 text-ink-soft">
          <strong className="font-serif text-xl font-semibold text-ink">{location.google.reviewCount}</strong> reviews on this clinic&rsquo;s own listing.
          {location.google.verifiedOn && <span className="block text-[.72rem] text-ink-soft/80">Checked {location.google.verifiedOn}</span>}
        </p>
      ) : (
        <p className="t-body mt-4 text-ink-soft">This clinic keeps its own Google listing.</p>
      )}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
        <a
          href={placeUrl(location)}
          target="_blank"
          rel="noreferrer"
          data-track="google_reviews_click"
          data-placement={placement}
          data-branch={location.slug}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-h-text"
        >
          Read reviews
          <ArrowUpRight className="cta-arrow size-4" aria-hidden="true" />
        </a>
        <a
          href={writeReviewUrl(location)}
          target="_blank"
          rel="noreferrer"
          data-track="review_click"
          data-placement={`${placement}_write`}
          data-branch={location.slug}
          className="inline-flex min-h-11 items-center text-sm font-medium text-ink-soft hover:text-ink"
        >
          Write a review
        </a>
      </div>
    </div>
  );
}

/** The three verbatim Google excerpts. Never edited. */
export function GoogleQuotes({ className, placement }: { className?: string; placement: string }) {
  return (
    <div className={cn("rail-snap -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0", className)} data-placement={placement}>
      {reviewHighlights.map((review, index) => (
        <figure
          key={review.theme}
          className={cn(
            "flex w-[82vw] shrink-0 flex-col rounded-2xl border border-line bg-white p-5 sm:w-auto",
            index === 0 && "hue-sky",
            index === 1 && "hue-mint",
            index === 2 && "hue-coral",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-h-tint px-2.5 py-1 text-[.7rem] font-bold uppercase tracking-[.1em] text-h-text">{review.theme}</span>
            <Stars size="size-3" />
          </div>
          <blockquote className="t-body mt-4 flex-1 text-ink">&ldquo;{review.quote}&rdquo;</blockquote>
          <figcaption className="t-small mt-4 flex items-center gap-2 border-t border-line pt-3 text-ink-soft">
            <GoogleGlyph className="size-3.5 shrink-0" />
            {review.source}, quoted as written
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
