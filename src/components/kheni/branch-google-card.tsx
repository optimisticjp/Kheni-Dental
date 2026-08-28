import { ArrowUpRight, Star } from "lucide-react";

import { PendingTag } from "@/components/kheni/pending";
import type { Location } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Google reputation for a single branch.
 *
 * Both clinics get their own card. A branch only ever shows its own figure:
 * when a rating has not been verified the card renders complete with the value
 * masked and tagged, so Yogi Chowk's rating can never be read as Hirabaug's.
 */
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

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border p-5 sm:p-6",
        dark ? "border-white/10 bg-white/[.04] text-white" : "border-border bg-card",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[.66rem] font-semibold uppercase tracking-[.18em] text-gold">On Google</p>
          <p className="mt-2 font-serif text-2xl leading-tight">{location.shortName}</p>
          <p className={cn("mt-1 text-xs", dark ? "text-white/45" : "text-muted-foreground")}>{location.areaLabel}</p>
        </div>

        {verified ? (
          <div className="shrink-0 text-right">
            <p className="font-serif text-4xl leading-none text-gold">{location.google.rating}</p>
            <div className="mt-1.5 flex justify-end gap-0.5 text-gold" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="size-3 fill-current" />
              ))}
            </div>
          </div>
        ) : (
          <div className="shrink-0 text-right">
            <p className="font-serif text-4xl leading-none text-gold/40">4.X</p>
          </div>
        )}
      </div>

      <p className={cn("mt-4 text-sm leading-6", dark ? "text-white/60" : "text-muted-foreground")}>
        {verified ? (
          <>
            <strong className={dark ? "text-white" : "text-foreground"}>{location.google.reviewCount}</strong> Google
            reviews for this clinic.
          </>
        ) : (
          <>This clinic keeps its own Google listing, separate from {location.slug === "hirabaug" ? "Yogi Chowk" : "Hirabaug"}.</>
        )}
      </p>

      {!verified && <PendingTag className="mt-3" label="Rating to confirm" />}

      <div className="mt-auto flex flex-wrap items-center gap-x-5 pt-5">
        <a
          href={location.googleProfileUrl}
          target="_blank"
          rel="noreferrer"
          data-track="review_click"
          data-placement={placement}
          data-branch={location.slug}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold"
        >
          Read reviews
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
        <a
          href={location.googleWriteReviewUrl}
          target="_blank"
          rel="noreferrer"
          data-track="review_click"
          data-placement={`${placement}_write`}
          data-branch={location.slug}
          className={cn(
            "inline-flex min-h-11 items-center text-sm font-semibold",
            dark ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground",
          )}
        >
          Write a review
        </a>
      </div>
    </div>
  );
}
