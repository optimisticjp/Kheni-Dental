import { ArrowUpRight, Star } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function GoogleTrustCard({ className = "", dark = false, placement = "google_trust_card" }: { className?: string; dark?: boolean; placement?: string }) {
  return (
    <div className={cn("rounded-[1.6rem] border p-5 sm:p-6", dark ? "border-white/10 bg-white/[.04] text-white" : "border-border bg-card", className)}>
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-[.68rem] font-semibold uppercase tracking-[.2em] text-gold">Independent patient proof</p>
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
        Based on {site.googleReviewCount} reviews on Kheni Dental&apos;s established Google profile.
      </p>
      <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
        <a href={site.googleProfileUrl} target="_blank" rel="noreferrer" data-track="review_click" data-placement={placement} className="inline-flex items-center gap-2 text-gold">Read Google reviews <ArrowUpRight className="size-4" /></a>
        <a href={site.googleWriteReviewUrl} target="_blank" rel="noreferrer" data-track="review_click" data-placement={`${placement}_write`} className={dark ? "text-white/65 hover:text-white" : "text-muted-foreground hover:text-foreground"}>Share your experience</a>
      </div>
    </div>
  );
}
