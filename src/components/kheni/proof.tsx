import { ArrowUpRight, Star } from "lucide-react";

import { GoogleGlyph } from "@/components/icons/google-glyph";
import { googleReputation, verifiedBranches } from "@/content/google-reputation";
import { reviewHighlights, type Location } from "@/content/site";
import { placeUrl, writeReviewUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";

/**
 * Google proof, in four sizes.
 *
 *   ProofChip      one line: 4.9, stars, review count. For heroes and cards.
 *   ProofCluster   the rating large, both listings named, dated. Light.
 *   ProofPanel     the same on ink, with the rating set enormous. For the
 *                  homepage reviews section and the reviews page opening.
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
        tone === "dark" ? "border border-ivory/15 bg-ivory/[.06] text-ivory" : "border border-line bg-white text-ink",
        className,
      )}
    >
      <GoogleGlyph className="size-4 shrink-0" />
      <strong className={cn("font-serif text-lg font-medium leading-none", tone === "dark" && "text-gold")}>{sharedRating}</strong>
      <Stars />
      <span className={cn("hidden sm:inline", tone === "dark" ? "text-ivory/70" : "text-ink-soft")}>{combinedReviews} reviews, two clinics</span>
      <span className={cn("sm:hidden", tone === "dark" ? "text-ivory/70" : "text-ink-soft")}>{combinedReviews} reviews</span>
    </a>
  );
}

function BranchRows({ placement, tone }: { placement: string; tone: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ul className={cn("divide-y", dark ? "divide-ivory/10" : "divide-line")}>
      {verifiedBranches.map((branch) => (
        <li key={branch.location.slug}>
          <a
            href={placeUrl(branch.location)}
            target="_blank"
            rel="noreferrer"
            data-track="google_reviews_click"
            data-placement={`${placement}_${branch.location.slug}`}
            data-branch={branch.location.slug}
            className="flex min-h-12 items-center justify-between gap-3 py-2.5"
          >
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{branch.location.displayArea}</span>
              <span className={cn("t-small block", dark ? "text-ivory/50" : "text-ink-soft")}>
                {branch.location.shortName === branch.location.displayArea ? branch.location.areaLabel.replace(/,\s*Surat$/, "") : branch.location.shortName}
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-3 text-sm">
              <span className={cn("font-serif text-lg leading-none", dark ? "text-gold" : "text-ink")}>{branch.rating}</span>
              <span className={cn("tabular-nums", dark ? "text-ivory/60" : "text-ink-soft")}>{branch.reviewCount} reviews</span>
              <ArrowUpRight className={cn("size-3.5", dark ? "text-gold" : "text-gold-text")} aria-hidden="true" />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ProofCluster({ placement, className }: { placement: string; className?: string }) {
  const { sharedRating, combinedReviews, combinedLabel, verifiedOn } = googleReputation;
  return (
    <div className={cn("relative isolate overflow-hidden rounded-[1.5rem] border border-line bg-white p-5 sm:p-6", className)}>
      <div className="flex items-center gap-2">
        <GoogleGlyph className="size-5" />
        <span className="t-eyebrow text-ink-soft">On Google</span>
      </div>
      <div className="mt-3 flex flex-wrap items-end gap-x-5 gap-y-2">
        {sharedRating && (
          <div className="flex items-end gap-2.5">
            <span className="t-proof text-ink">{sharedRating}</span>
            <Stars className="mb-1.5" size="size-4" />
          </div>
        )}
        <div>
          <p className="font-serif text-2xl font-medium leading-none">{combinedReviews}</p>
          <p className="t-small mt-1 max-w-[24ch] text-ink-soft">{combinedLabel}</p>
        </div>
      </div>
      <div className="mt-3">
        <BranchRows placement={placement} tone="light" />
      </div>
      {verifiedOn && <p className="mt-2 text-[.72rem] text-ink-soft/80">Two separate Google listings, checked {verifiedOn}.</p>}
    </div>
  );
}

/**
 * The dark proof panel: a huge ivory 4.9, gold stars, the combined count
 * with its mandatory label, and one row per listing. The number is the
 * hero; everything else is set small.
 */
export function ProofPanel({ placement, className, giant = true }: { placement: string; className?: string; giant?: boolean }) {
  const { sharedRating, combinedReviews, combinedLabel, verifiedOn } = googleReputation;
  return (
    <div className={cn("on-dark grain relative isolate overflow-hidden rounded-[1.5rem] border border-gold/25 bg-ink-2 p-6 text-ivory sm:p-8", className)}>
      <div aria-hidden="true" className="bloom-gold-soft pointer-events-none absolute inset-0" />
      <div className="flex items-center gap-2.5">
        <GoogleGlyph className="size-5" />
        <span className="t-eyebrow text-ivory/60">Verified on Google</span>
      </div>
      <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-4">
        {sharedRating && (
          <div>
            <span className={cn(giant ? "t-giant" : "t-proof", "block text-ivory")}>{sharedRating}</span>
            <Stars className="mt-2" size="size-5" />
          </div>
        )}
        <div className="pb-1">
          <p className="font-serif text-3xl leading-none text-gold">{combinedReviews}</p>
          <p className="t-small mt-1.5 max-w-[22ch] text-ivory/60">{combinedLabel}</p>
        </div>
      </div>
      <div className="mt-5 border-t border-ivory/10 pt-1">
        <BranchRows placement={placement} tone="dark" />
      </div>
      {verifiedOn && <p className="mt-3 text-[.72rem] text-ivory/45">Two separate Google listings, checked {verifiedOn}.</p>}
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
          <strong className="font-serif text-xl font-medium text-ink">{location.google.reviewCount}</strong> reviews on this clinic&rsquo;s own listing.
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
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold-text"
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

/** The three verbatim Google excerpts. Never edited. Ivory cards with a gold hairline. */
export function GoogleQuotes({ className, placement, tone = "light" }: { className?: string; placement: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className={cn("rail-snap -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0", className)} data-placement={placement}>
      {reviewHighlights.map((review) => (
        <figure
          key={review.theme}
          className={cn("flex w-[82vw] shrink-0 flex-col rounded-2xl p-5 sm:w-auto", dark ? "border border-ivory/10 bg-ivory text-ink" : "border border-line bg-white")}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="t-eyebrow text-gold-text">{review.theme}</span>
            <Stars size="size-3" />
          </div>
          <span aria-hidden="true" className="rule-gold mt-3 h-px w-10" />
          <blockquote className="t-quote mt-4 flex-1 font-serif text-ink">&ldquo;{review.quote}&rdquo;</blockquote>
          <figcaption className="t-small mt-4 flex items-center gap-2 border-t border-line pt-3 text-ink-soft">
            <GoogleGlyph className="size-3.5 shrink-0" />
            {review.source}, quoted as written
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
