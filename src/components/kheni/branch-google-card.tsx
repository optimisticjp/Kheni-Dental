import { ArrowUpRight, Star } from "lucide-react";
import { GoogleGlyph } from "@/components/icons/google-glyph";

import { PendingTag } from "@/components/kheni/pending";
import { googleReputation, verifiedBranches } from "@/content/google-reputation";
import { locations, type Location } from "@/content/site";
import { cn } from "@/lib/utils";
import { placeUrl, writeReviewUrl } from "@/lib/maps";

/**
 * Google reputation.
 *
 * The point of this component group is that the proof reads as *external*.
 * A patient should be able to tell at a glance that these numbers were not
 * written by the clinic: the Google mark, the exact review counts, the date
 * they were checked, and a link straight to each listing.
 *
 * TWO RULES THAT MUST SURVIVE EDITS
 *  1. A branch never displays the other branch's figure. If a branch is not
 *     verified, its card renders complete with the value masked and tagged.
 *  2. The combined review count is never shown without saying, in the same
 *     breath, that it is the sum of two separate Google listings.
 */

/** Google's own mark, so the proof reads as somebody else's verdict. */

function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("flex gap-0.5 text-gold", className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="size-3.5 fill-current" />
      ))}
    </span>
  );
}

/** Google reputation for one branch. */
export function BranchGoogleCard({
  location,
  placement,
  dark = false,
  className,
}: {
  location: Location;
  placement: string;
  dark?: boolean;
  className?: string;
}) {
  const verified = location.google.status === "verified";
  const otherBranch = locations.find((item) => item.slug !== location.slug);

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border p-5 sm:p-6",
        dark ? "grain border-white/12 bg-white/[.045] text-white" : "border-border bg-card",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2">
            <GoogleGlyph className="size-4" />
            <span className={cn("text-[.66rem] font-semibold uppercase tracking-[.18em]", dark ? "text-white/50" : "text-muted-foreground")}>
              Google reviews
            </span>
          </span>
          <p className="mt-3 font-serif text-2xl leading-tight tracking-[-.02em]">{location.shortName}</p>
          <p className={cn("mt-1 text-xs", dark ? "text-white/45" : "text-muted-foreground")}>{location.areaLabel}</p>
        </div>

        <div className="shrink-0 text-right">
          <p className={cn("font-serif text-[2.6rem] leading-none tracking-[-.03em]", verified ? "text-gold" : "text-gold/40")}>
            {verified ? location.google.rating : "4.X"}
          </p>
          {verified && <Stars className="mt-2 justify-end" />}
        </div>
      </div>

      <p className={cn("mt-5 text-sm leading-6", dark ? "text-white/60" : "text-muted-foreground")}>
        {verified ? (
          <>
            <strong className={cn("font-serif text-lg", dark ? "text-white" : "text-foreground")}>
              {location.google.reviewCount}
            </strong>{" "}
            reviews on this clinic&rsquo;s own Google listing.
          </>
        ) : (
          <>This clinic keeps its own Google listing, separate from {otherBranch?.shortName ?? "our other clinic"}.</>
        )}
      </p>

      {verified && location.google.verifiedOn && (
        <p className={cn("mt-1.5 text-[.68rem]", dark ? "text-white/30" : "text-muted-foreground/70")}>
          Checked {location.google.verifiedOn}
        </p>
      )}
      {!verified && <PendingTag className="mt-3" label="Rating to confirm" />}

      <div className="mt-auto flex flex-wrap items-center gap-x-5 pt-5">
        <a
          href={placeUrl(location)}
          target="_blank"
          rel="noreferrer"
          data-track="review_click"
          data-placement={placement}
          data-branch={location.slug}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold"
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
          className={cn(
            "inline-flex min-h-11 items-center text-sm font-semibold",
            dark ? "text-white/55 hover:text-white" : "text-muted-foreground hover:text-foreground",
          )}
        >
          Write a review
        </a>
      </div>
    </div>
  );
}

/**
 * The headline reputation panel: one rating, the combined review count with
 * its mandatory explanation, then each listing on its own line so the two
 * profiles are never implied to be one.
 */
export function GoogleProofPanel({
  placement,
  dark = true,
  className,
}: {
  placement: string;
  dark?: boolean;
  className?: string;
}) {
  const { sharedRating, combinedReviews, combinedLabel, profileCount, verifiedOn } = googleReputation;

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[1.4rem] border p-6 sm:p-7",
        dark ? "grain border-gold/25 bg-[#121210] text-white" : "border-border bg-card",
        className,
      )}
    >
      <div aria-hidden="true" className="bloom-gold-soft pointer-events-none absolute inset-0 -z-10" />

      <div className="flex items-center gap-2.5">
        <GoogleGlyph className="size-5" />
        <span className={cn("text-[.66rem] font-semibold uppercase tracking-[.18em]", dark ? "text-white/50" : "text-muted-foreground")}>
          Verified on Google
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-3">
        {sharedRating && (
          <div className="flex items-end gap-3">
            <span className="t-h1 text-gold">
              {sharedRating}
            </span>
            <Stars className="mb-2" />
          </div>
        )}
        <div>
          <p className="font-serif text-2xl leading-none tracking-[-.02em]">{combinedReviews}</p>
          {/* The combined figure never appears without this line. */}
          <p className={cn("mt-1.5 max-w-[22ch] text-xs leading-5", dark ? "text-white/50" : "text-muted-foreground")}>
            {combinedLabel}
          </p>
        </div>
      </div>

      <ul className={cn("mt-6 divide-y", dark ? "divide-white/10" : "divide-border")}>
        {verifiedBranches.map((branch) => (
          <li key={branch.location.slug} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{branch.location.displayArea}</p>
              <p className={cn("mt-0.5 truncate text-xs", dark ? "text-white/40" : "text-muted-foreground")}>
                {/* One branch is known by its building, the other by its area,
                    so the second line has to avoid repeating the first. */}
                {branch.location.shortName === branch.location.displayArea
                  ? branch.location.areaLabel.replace(/,\s*Surat$/, "")
                  : branch.location.shortName}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="font-serif text-lg leading-none text-gold">{branch.rating}</span>
              <span className={cn("text-xs tabular-nums", dark ? "text-white/45" : "text-muted-foreground")}>
                {branch.reviewCount} reviews
              </span>
              <a
                href={placeUrl(branch.location)}
                target="_blank"
                rel="noreferrer"
                data-track="review_click"
                data-placement={`${placement}_${branch.location.slug}`}
                data-branch={branch.location.slug}
                aria-label={`Read Google reviews for ${branch.location.shortName}`}
                className="inline-flex size-11 items-center justify-center rounded-full text-gold"
              >
                <ArrowUpRight className="cta-arrow size-4" aria-hidden="true" />
              </a>
            </div>
          </li>
        ))}
      </ul>

      {verifiedOn && (
        <p className={cn("mt-4 text-[.68rem]", dark ? "text-white/30" : "text-muted-foreground/70")}>
          {profileCount} separate Google listings, checked {verifiedOn}.
        </p>
      )}
    </div>
  );
}
