import { ArrowUpRight, Play } from "lucide-react";

import { InstagramIcon } from "@/components/icons/instagram-icon";
import { featuredReels, instagramHandle, instagramReelsUrl, instagramUrl, reelPosterSrcSet, type Reel } from "@/content/instagram";
import { cn } from "@/lib/utils";

/**
 * Inside Kheni: the clinic's own Reels, in the site's own frame.
 *
 * A horizontal rail of 9:16 cards on ivory. Each card is the clinic's own
 * poster in a near-black frame with a small gold label and a quiet play
 * mark, and opens that exact Reel on Instagram in a new tab. Nothing from
 * Instagram loads on this page: no script, no iframe, no cookies. On a
 * phone about 1.4 cards show, so the next one invites a swipe.
 *
 * Every card in the rail is the same size. It used to lead with a larger
 * first card, the way a magazine leads with one picture, and sit the rest on
 * a baseline. On a phone that produced three widths, three heights and tops
 * 127px apart, which reads as a mistake rather than as art direction. The
 * "more reels" card is built on the same frame as the others, outer border
 * and 1.5 of padding around an inner 9:16 span, so it comes out at exactly
 * the same height instead of nine pixels taller.
 */
/** One width for every card in the rail, so the row cannot go ragged. */
const RAIL_CARD = "w-[68vw] max-w-[17rem] shrink-0 sm:w-[38vw] lg:w-auto lg:max-w-none";
const CATEGORY: Record<Reel["category"], string> = {
  doctor: "Doctor",
  kids: "Kids",
  clinic: "Inside the clinic",
  implants: "Implants",
  patient: "Patient",
  education: "Dental tip",
  smile: "Smile",
};

export function ReelCard({
  reel,
  placement,
  className,
  sizes = "(min-width: 1024px) 240px, 68vw",
}: {
  reel: Reel;
  placement: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <a
      href={reel.url}
      target="_blank"
      rel="noreferrer"
      data-track="instagram_reel_open"
      data-placement={placement}
      aria-label={`${reel.title}. Watch on Instagram`}
      className={cn(
        "zoom group relative block overflow-hidden rounded-[1.25rem] border border-ink/80 bg-ink-2 p-1.5 text-ivory shadow-[0_20px_40px_-28px_rgba(13,13,12,.6)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-gold focus-visible:ring-offset-2",
        className,
      )}
    >
      <span className="relative block overflow-hidden rounded-[.9rem] bg-ink-3" style={{ aspectRatio: "9 / 16" }}>
        {reel.poster ? (
          // eslint-disable-next-line @next/next/no-img-element -- images are unoptimized site-wide
          <img
            src={reel.poster}
            srcSet={reelPosterSrcSet(reel.poster)}
            sizes={sizes}
            alt={reel.posterAlt ?? ""}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
            style={{ objectPosition: reel.objectPosition }}
          />
        ) : (
          <span aria-hidden="true" className="bloom-gold-soft absolute inset-0" />
        )}
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-ink/15" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 text-[.62rem] font-semibold uppercase tracking-[.14em] text-gold backdrop-blur-sm">
          <InstagramIcon className="size-3" />
          {CATEGORY[reel.category]}
        </span>
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ivory/60 bg-ink/40 text-ivory backdrop-blur-sm transition-[transform,background-color] duration-300 group-hover:scale-105 group-hover:bg-gold group-hover:text-ink"
        >
          <Play className="ml-0.5 size-5 fill-current" />
        </span>
        <span className="absolute inset-x-0 bottom-0 p-4">
          <span className="block font-serif text-[1.05rem] leading-tight tracking-[-.015em] text-ivory">{reel.title}</span>
          <span className="mt-1.5 flex items-center gap-1 text-[.72rem] font-medium text-ivory/70">
            {reel.posted}
            <span aria-hidden="true">·</span>
            Watch on Instagram
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </span>
        </span>
      </span>
    </a>
  );
}

export function InstagramReels({ placement = "home_instagram", limit = 5, className, reels }: { placement?: string; limit?: number; className?: string; reels?: Reel[] }) {
  const list = (reels ?? featuredReels(limit)).slice(0, limit);
  if (list.length === 0) return null;
  return (
    <div className={className}>
      <div className="edge-fade -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:[mask-image:none]">
        <div className="rail-snap flex items-start gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible">
          {list.map((reel) => (
            <ReelCard key={reel.id} reel={reel} placement={placement} className={RAIL_CARD} />
          ))}
          <a
            href={instagramReelsUrl}
            target="_blank"
            rel="noreferrer"
            data-track="instagram_profile_click"
            data-placement={`${placement}_more`}
            className={cn("block rounded-[1.25rem] border border-line bg-white p-1.5 text-ink", RAIL_CARD)}
          >
            <span className="flex size-full flex-col justify-end rounded-[.9rem] p-3" style={{ aspectRatio: "9 / 16" }}>
              <span className="mb-auto grid size-11 place-items-center rounded-full border border-gold/50 text-gold-text">
                <InstagramIcon className="size-5" />
              </span>
              <span className="t-eyebrow block text-gold-text">More reels</span>
              <span className="mt-2 block font-serif text-[1.35rem] leading-tight tracking-[-.015em]">{instagramHandle}</span>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold">
                Open Instagram
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

/** Follow line for the end of any Instagram section. */
export function FollowLine({ placement, tone = "light", className }: { placement: string; tone?: "dark" | "light"; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-3", className)}>
      <p className={cn("t-small", tone === "dark" ? "text-ivory/65" : "text-ink-soft")}>Reels open on Instagram. Nothing plays until you tap.</p>
      <a
        href={instagramUrl}
        target="_blank"
        rel="noreferrer"
        data-track="instagram_profile_click"
        data-placement={placement}
        className={cn(
          "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold",
          tone === "dark" ? "border-ivory/30 text-ivory hover:border-gold hover:text-gold" : "border-ink/25 text-ink hover:border-ink",
        )}
      >
        <InstagramIcon className="size-4" />
        Follow {instagramHandle}
      </a>
    </div>
  );
}
