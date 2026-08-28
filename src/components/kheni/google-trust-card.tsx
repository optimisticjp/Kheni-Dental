import { ArrowUpRight, Star } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function GoogleTrustCard({ className = "", dark = false, placement = "google_trust_card" }: { className?: string; dark?: boolean; placement?: string }) {
  return (
    <div className={cn("rounded-[1.6rem] border p-5 sm:p-6", dark ? "border-white/10 bg-white/[.04] text-white" : "border-border bg-card", className)}>
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-[.68rem] font-semibold uppercase tracking-[.2em] text-gold">Rating on Google</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1 text-gold" aria-label={`${site.googleRating} out of 5 stars on Google`}>
              {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-current" aria-hidden="true" />)}
            </div>
            <span className={cn("text-sm", dark ? "text-white/55" : "text-muted-foreground")}>Google</span>
          </div>
        </div>
        <span className="font-serif text-5xl leading-none text-gold">{site.googleRating}</span>
      </div>
      <p className={cn("mt-5 text-sm leading-6", dark ? "text-white/62" : "text-muted-foreground")}>
        From {site.googleReviewCount} reviews on the Swastik Plaza profile. Our Hirabaug clinic is listed on Google separately.
      </p>
      {/* Both actions stay visually light text links, but each carries a 44px
          practical hit area on touch. The extra height is absorbed by the
          negative margins here, so the card's spacing is unchanged. */}
      <div className="mt-2 -mb-3 flex flex-wrap items-center gap-x-5 text-sm font-semibold">
        <a href={site.googleProfileUrl} target="_blank" rel="noreferrer" data-track="review_click" data-placement={placement} className="inline-flex min-h-11 items-center gap-2 text-gold">Read Google reviews <ArrowUpRight className="size-4" /></a>
        <a href={site.googleWriteReviewUrl} target="_blank" rel="noreferrer" data-track="review_click" data-placement={`${placement}_write`} className={cn("inline-flex min-h-11 items-center", dark ? "text-white/65 hover:text-white" : "text-muted-foreground hover:text-foreground")}>Share your experience</a>
      </div>
    </div>
  );
}
