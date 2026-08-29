import { ArrowUpRight, Star } from "lucide-react";

import { GoogleGlyph } from "@/components/icons/google-glyph";
import { googleReputation, verifiedBranches } from "@/content/google-reputation";
import { reviewHighlights } from "@/content/site";
import { placeUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";

/**
 * Google proof, in the smallest form that still carries weight.
 *
 * WHY THIS EXISTS
 * Google is the only independent proof this practice has: 1,963 reviews at
 * 4.9, across two listings a patient can go and check. Everything else on the
 * site is the clinic talking about itself. For a local clinic the Map Pack is
 * where the decision is actually made, and clinics with a verified profile and
 * a few hundred reviews take the overwhelming share of the clicks — so the
 * website's job is to keep saying, on every page, that the reputation behind
 * it is real and independently held.
 *
 * The full branch cards are too heavy to repeat on every page. This is the
 * one-line version: the rating, what it is drawn from, and a way through to
 * the listings. Use it anywhere a patient might be deciding.
 */
export function GoogleTrustBar({
  className,
  tone = "light",
  placement,
}: {
  className?: string;
  tone?: "dark" | "light";
  placement: string;
}) {
  const { sharedRating, combinedReviews, profileCount, verifiedOn } = googleReputation;
  if (!sharedRating) return null;
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border px-5 py-4",
        // `light-surface` is the design system's opt-out: inside a dark
        // section `.text-gold` resolves to the bright #d2b56f, which on this
        // card's light background measured about 1.9:1. The opt-out swaps it
        // for the darker gold that is legible on ivory.
        dark ? "border-white/12 bg-white/[.03] text-white" : "light-surface border-border bg-card",
        className,
      )}
    >
      <span className="flex items-center gap-2.5">
        <GoogleGlyph className="size-4 shrink-0" />
        <span className="font-serif text-2xl leading-none text-gold">{sharedRating}</span>
        <span aria-hidden="true" className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3 fill-current text-gold" />
          ))}
        </span>
      </span>

      <span className={cn("t-small min-w-0 flex-1", dark ? "text-white/60" : "text-muted-foreground")}>
        <strong className={cn("font-semibold", dark ? "text-white" : "text-foreground")}>{combinedReviews}</strong>{" "}
        Google reviews across our {profileCount === 2 ? "two" : profileCount} clinic listings
        {verifiedOn && <span className={dark ? "text-white/35" : "text-muted-foreground/70"}> · checked {verifiedOn}</span>}
      </span>

      <span className="flex flex-wrap gap-x-4 gap-y-1">
        {verifiedBranches.map((branch) => (
          <a
            key={branch.location.slug}
            href={placeUrl(branch.location)}
            target="_blank"
            rel="noreferrer"
            data-track="review_click"
            data-placement={`${placement}_${branch.location.slug}`}
            data-branch={branch.location.slug}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold"
          >
            {branch.location.displayArea}
            <span className={cn("font-normal", dark ? "text-white/45" : "text-muted-foreground")}>
              {branch.reviewCount}
            </span>
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        ))}
      </span>
    </div>
  );
}

/**
 * Three things patients actually wrote, lifted from the Google listings.
 *
 * Kept verbatim, emoji included. Cleaning them up would make them read as
 * marketing copy, which is the one quality a review must not have.
 */
export function GoogleReviewQuotes({
  className,
  tone = "light",
  placement,
}: {
  className?: string;
  tone?: "dark" | "light";
  placement: string;
}) {
  const dark = tone === "dark";

  return (
    <div className={cn("grid gap-4 sm:grid-cols-3", className)}>
      {reviewHighlights.map((review) => (
        <figure
          key={review.theme}
          className={cn(
            "flex flex-col rounded-2xl border p-5",
            dark ? "border-white/12 bg-white/[.03] text-white" : "light-surface border-border bg-card",
          )}
        >
          <span aria-hidden="true" className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3 fill-current text-gold" />
            ))}
          </span>
          <blockquote className={cn("t-small mt-3 flex-1", dark ? "text-white/75" : "text-foreground")}>
            {review.quote}
          </blockquote>
          <figcaption
            className={cn(
              "t-small mt-4 flex items-center gap-2 border-t pt-3",
              dark ? "border-white/10 text-white/40" : "border-border text-muted-foreground",
            )}
          >
            <GoogleGlyph className="size-3.5 shrink-0" />
            {review.source}
          </figcaption>
        </figure>
      ))}
      <p className="sr-only" data-placement={placement}>
        Reviews shown as published on Google.
      </p>
    </div>
  );
}
