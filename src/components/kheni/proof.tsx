import { ArrowUpRight, Star } from "lucide-react";

import { GoogleGlyph } from "@/components/icons/google-glyph";
import { googleReputation, verifiedBranches } from "@/content/google-reputation";
import { reviewHighlights, type Location } from "@/content/site";
import { placeUrl, writeReviewUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";

/**
 * Google proof, in four sizes.
 *
 *   ProofPill    one line: G, 4.9, stars, count. For heroes.
 *   ProofBig     the rating enormous on a butter field, both listings named.
 *   BranchProof  one clinic's own figure. Never the other clinic's.
 *   GoogleQuotes the three verbatim excerpts, in rhythm: one big, two small.
 *
 * Every figure is a verified Google value and every combined count says,
 * in the same breath, that it is two listings added together.
 */

export function Stars({ className, size = "size-3.5", tone = "butter" }: { className?: string; size?: string; tone?: "butter" | "ink" }) {
  return (
    <span className={cn("flex gap-0.5", tone === "butter" ? "text-butter" : "text-ink", className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className={cn(size, "fill-current")} />
      ))}
    </span>
  );
}

export function ProofPill({ placement, className, tone = "light" }: { placement: string; className?: string; tone?: "light" | "dark" }) {
  const { sharedRating, combinedReviews } = googleReputation;
  if (!sharedRating) return null;
  return (
    <a
      href="/reviews/"
      data-track="review_click"
      data-placement={placement}
      className={cn("inline-flex min-h-12 items-center gap-2.5 rounded-full py-1.5 pl-3 pr-4 text-sm shadow-[0_10px_30px_-18px_rgba(11,22,51,.6)]", tone === "dark" ? "bg-white/10 text-white ring-1 ring-white/25" : "bg-white text-ink", className)}
    >
      <GoogleGlyph className="size-4 shrink-0" />
      <strong className="font-display text-xl font-extrabold leading-none tracking-[-.02em]">{sharedRating}</strong>
      <Stars tone={tone === "dark" ? "butter" : "ink"} />
      <span className={cn("font-semibold", tone === "dark" ? "text-white/80" : "text-ink-soft")}>
        {combinedReviews} reviews<span className="hidden sm:inline"> · two clinics</span>
      </span>
    </a>
  );
}

/** The rating enormous, on whatever field it sits on. */
export function ProofBig({ placement, className }: { placement: string; className?: string }) {
  const { sharedRating, combinedReviews, verifiedOn } = googleReputation;
  return (
    <div className={cn("grid gap-6 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-12", className)}>
      <div>
        <div className="flex items-end gap-4">
          <span className="t-num">{sharedRating ?? "–"}</span>
          <div className="pb-2">
            <Stars size="size-6" tone="ink" />
            <p className="mt-2 flex items-center gap-2 text-sm font-bold">
              <GoogleGlyph className="size-4" />
              on Google
            </p>
          </div>
        </div>
        <p className="t-h3 mt-3">
          {combinedReviews} reviews across our two clinic profiles.
        </p>
        {verifiedOn && <p className="t-small mt-1 opacity-80">Two separate Google listings, checked {verifiedOn}.</p>}
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {verifiedBranches.map((branch) => (
          <li key={branch.location.slug}>
            <a href={placeUrl(branch.location)} target="_blank" rel="noreferrer" data-track="google_reviews_click" data-placement={`${placement}_${branch.location.slug}`} data-branch={branch.location.slug} className="lift flex min-h-16 items-center justify-between gap-3 rounded-[1.25rem] bg-white px-4 py-3 text-ink">
              <span>
                <span className="block font-display text-lg font-extrabold leading-tight tracking-[-.02em]">{branch.location.displayArea}</span>
                <span className="block text-xs text-ink-soft">{branch.reviewCount} reviews on this listing</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="font-display text-2xl font-extrabold tracking-[-.03em]">{branch.rating}</span>
                <ArrowUpRight className="size-4 text-blue-deep" aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BranchProof({ location, placement, className }: { location: Location; placement: string; className?: string }) {
  const verified = location.google.status === "verified";
  return (
    <div className={cn(`mood-${location.hue} rounded-[1.5rem] bg-white p-5 text-ink sm:p-6`, className)}>
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
          <p className="font-display text-5xl font-extrabold tracking-[-.04em]">{verified ? location.google.rating : "–"}</p>
          {verified && <Stars className="mt-1 justify-end" tone="ink" />}
        </div>
      </div>
      {verified ? (
        <p className="t-body mt-4 text-ink-soft">
          <strong className="font-display text-xl font-extrabold text-ink">{location.google.reviewCount}</strong> reviews on this clinic&rsquo;s own listing.
          {location.google.verifiedOn && <span className="block text-[.72rem] text-ink-soft/80">Checked {location.google.verifiedOn}</span>}
        </p>
      ) : (
        <p className="t-body mt-4 text-ink-soft">This clinic keeps its own Google listing.</p>
      )}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
        <a href={placeUrl(location)} target="_blank" rel="noreferrer" data-track="google_reviews_click" data-placement={placement} data-branch={location.slug} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-blue-deep">
          Read reviews
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
        <a href={writeReviewUrl(location)} target="_blank" rel="noreferrer" data-track="review_click" data-placement={`${placement}_write`} data-branch={location.slug} className="inline-flex min-h-11 items-center text-sm font-semibold text-ink-soft hover:text-ink">
          Write a review
        </a>
      </div>
    </div>
  );
}

/** The three verbatim Google excerpts. Never edited. One big, two beside. */
export function GoogleQuotes({ className, placement, tone = "light" }: { className?: string; placement: string; tone?: "light" | "dark" }) {
  const [first, ...rest] = reviewHighlights;
  const dark = tone === "dark";
  const card = dark ? "bg-white/10 ring-1 ring-white/15" : "bg-white";
  return (
    <div className={cn("-mx-4 sm:mx-0", className)} data-placement={placement}>
      {/* Phone: a swipe rail. From sm: one big quote, two beside it. */}
      <div className="rail px-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-[1.3fr_1fr]">
        <figure className={cn("flex w-[82vw] max-w-[22rem] flex-col justify-between rounded-[1.5rem] p-6 sm:w-auto sm:max-w-none sm:p-8 lg:row-span-2", card)}>
          <blockquote className="t-h3 text-balance">&ldquo;{first.quote}&rdquo;</blockquote>
          <figcaption className={cn("mt-6 flex items-center gap-2 text-sm font-semibold", dark ? "text-white/75" : "text-ink-soft")}>
            <GoogleGlyph className="size-4 shrink-0" />
            {first.source}, quoted as written
          </figcaption>
        </figure>
        {rest.map((review) => (
          <figure key={review.theme} className={cn("flex w-[82vw] max-w-[22rem] flex-col justify-between rounded-[1.25rem] p-5 sm:w-auto sm:max-w-none", card)}>
            <blockquote className="t-body font-semibold">&ldquo;{review.quote}&rdquo;</blockquote>
            <figcaption className={cn("mt-4 flex items-center gap-2 text-xs font-semibold", dark ? "text-white/70" : "text-ink-soft")}>
              <GoogleGlyph className="size-3.5 shrink-0" />
              {review.source}, quoted as written
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
