import { ArrowUpRight, Play } from "lucide-react";

import { InstagramIcon } from "@/components/icons/instagram-icon";
import { featuredReels, instagramHandle, instagramReelsUrl, instagramUrl, reelPosterSrcSet, type Reel } from "@/content/instagram";
import { cn } from "@/lib/utils";

/**
 * Inside Kheni: the clinic's own Reels.
 *
 * A horizontal rail of 9:16 cards. On a phone about 1.3 cards show, so the
 * next one peeks in and invites a swipe. Each card is the clinic's own
 * poster frame with a play badge and opens that exact Reel on Instagram.
 * Nothing from Instagram loads on this page, so it is fast and never
 * silently empty: a Reel without a saved poster still renders on its
 * colour field with its title.
 */
const CATEGORY: Record<Reel["category"], string> = {
  doctor: "Doctor",
  kids: "Kids",
  clinic: "Inside the clinic",
  implants: "Implants",
  patient: "Patient",
  education: "Dental tip",
  smile: "Smile",
};

export function ReelCard({ reel, placement, className, sizes = "(min-width: 1024px) 220px, 72vw" }: { reel: Reel; placement: string; className?: string; sizes?: string }) {
  return (
    <a
      href={reel.url}
      target="_blank"
      rel="noreferrer"
      data-track="instagram_reel_open"
      data-placement={placement}
      aria-label={`${reel.title}. Watch on Instagram`}
      className={cn(`mood-${reel.hue} zoom group relative block overflow-hidden rounded-[1.25rem] bg-m-fill text-white focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-butter`, className)}
      style={{ aspectRatio: "9 / 16" }}
    >
      {reel.poster ? (
        // eslint-disable-next-line @next/next/no-img-element -- images are unoptimized site-wide
        <img src={reel.poster} srcSet={reelPosterSrcSet(reel.poster)} sizes={sizes} alt={reel.posterAlt ?? ""} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" style={{ objectPosition: reel.objectPosition }} />
      ) : (
        <span aria-hidden="true" className="absolute inset-0">
          <span className="absolute -right-10 top-8 size-40 rounded-full bg-white/20" />
        </span>
      )}
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/10" />
      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[.66rem] font-bold uppercase tracking-[.1em] text-ink">
        <InstagramIcon className="size-3" />
        {CATEGORY[reel.category]}
      </span>
      <span aria-hidden="true" className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-butter text-ink shadow-[0_10px_30px_rgba(11,22,51,.45)] transition-transform duration-300 group-hover:scale-105">
        <Play className="ml-0.5 size-6 fill-current" />
      </span>
      <span className="absolute inset-x-0 bottom-0 p-4">
        <span className="block font-display text-[1.15rem] font-extrabold leading-tight tracking-[-.02em]">{reel.title}</span>
        <span className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-white/80">
          Watch on Instagram
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </span>
      </span>
    </a>
  );
}

export function InstagramReels({ placement = "home_instagram", limit = 6, className, reels }: { placement?: string; limit?: number; className?: string; reels?: Reel[] }) {
  const list = (reels ?? featuredReels(limit)).slice(0, limit);
  if (list.length === 0) return null;
  return (
    <div className={className}>
      <div className="-mx-4 sm:-mx-6 lg:mx-0">
        <div className="rail px-4 sm:px-6 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:px-0">
          {list.map((reel) => (
            <ReelCard key={reel.id} reel={reel} placement={placement} className="w-[72vw] max-w-[19rem] sm:w-[44vw] lg:w-auto lg:max-w-none" />
          ))}
          <a
            href={instagramReelsUrl}
            target="_blank"
            rel="noreferrer"
            data-track="instagram_profile_click"
            data-placement={`${placement}_more`}
            className="flex w-[60vw] max-w-[16rem] flex-col items-start justify-end rounded-[1.25rem] bg-butter p-4 text-ink sm:w-[36vw] lg:w-auto lg:max-w-none"
            style={{ aspectRatio: "9 / 16" }}
          >
            <InstagramIcon className="size-8" />
            <span className="mt-4 block font-display text-2xl font-extrabold leading-none tracking-[-.03em]">
              More on
              <br />
              {instagramHandle}
            </span>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold">
              View all on Instagram
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

/** Follow line for the end of any Instagram section. */
export function FollowLine({ placement, tone = "dark", className }: { placement: string; tone?: "dark" | "light"; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-3", className)}>
      <p className={cn("t-small", tone === "dark" ? "text-white/70" : "text-ink-soft")}>Reels open on Instagram. Nothing plays until you tap.</p>
      <a href={instagramUrl} target="_blank" rel="noreferrer" data-track="instagram_profile_click" data-placement={placement} className={cn("btn btn-sm", tone === "dark" ? "btn-white" : "btn-ink")}>
        <InstagramIcon className="size-4" />
        Follow {instagramHandle}
      </a>
    </div>
  );
}
