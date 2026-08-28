import { Star } from "lucide-react";
import { site } from "@/content/site";

export function GoogleProofStrip({ placement = "proof_strip" }: { placement?: string }) {
  return (
    <a href={site.googleProfileUrl} target="_blank" rel="noreferrer" data-track="review_click" data-placement={placement} className="group inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-gold/25 bg-gold/[.06] px-4 py-2.5 text-sm">
      <span className="flex items-center gap-1 text-gold" aria-hidden="true">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-3.5 fill-current" />)}</span>
      <strong className="text-white">{site.googleRating} on Google</strong>
      <span className="text-white/45">{site.googleReviewDisplay} reviews · Swastik Plaza</span>
      <span className="text-gold transition-transform group-hover:translate-x-0.5">↗</span>
    </a>
  );
}
