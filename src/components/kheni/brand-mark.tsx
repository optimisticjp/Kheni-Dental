import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * The clinic's own logo.
 *
 * Supplied as a single high-resolution PNG on a transparent background, in
 * two flat colours: charcoal linework and a rose "K" swoosh. Two tones are
 * generated from it in public/images/brand/ (see the note at the bottom of
 * this file):
 *
 *   ink     the charcoal artwork, for ivory and white surfaces
 *   ivory   the linework reversed to ivory with the rose lifted so it holds
 *           up on near-black, for the header, mobile menu and footer
 *
 * The tooth interior is transparent rather than filled white, so the reversed
 * version is the real artwork rather than a knocked-out box.
 *
 * Plain <img> rather than next/image because images are unoptimized
 * site-wide; width and height are set so nothing shifts while it loads.
 */

/** Source aspect ratio of the full lockup, from the supplied artwork. */
const LOCKUP_RATIO = 2030 / 442;

const LOCKUP = {
  dark: {
    src: "/images/brand/kheni-logo-ivory-640w.png",
    srcSet: "/images/brand/kheni-logo-ivory-320w.png 320w, /images/brand/kheni-logo-ivory-640w.png 640w",
  },
  light: {
    src: "/images/brand/kheni-logo-ink-640w.png",
    srcSet: "/images/brand/kheni-logo-ink-320w.png 320w, /images/brand/kheni-logo-ink-640w.png 640w",
  },
} as const;

const MARK = {
  dark: {
    src: "/images/brand/kheni-mark-ivory-192w.png",
    srcSet: "/images/brand/kheni-mark-ivory-96w.png 96w, /images/brand/kheni-mark-ivory-192w.png 192w",
  },
  light: {
    src: "/images/brand/kheni-mark-ink-192w.png",
    srcSet: "/images/brand/kheni-mark-ink-96w.png 96w, /images/brand/kheni-mark-ink-192w.png 192w",
  },
} as const;

/**
 * The mark on its own: the tooth with the implant post and the rose K. Used
 * as a quiet watermark in empty photo frames, where the full lockup would be
 * too wide and too loud.
 */
export function KheniMonogram({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const art = MARK[tone];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- images are unoptimized site-wide
    <img
      src={art.src}
      srcSet={art.srcSet}
      sizes="96px"
      alt=""
      aria-hidden="true"
      width={96}
      height={89}
      loading="lazy"
      decoding="async"
      className={cn("object-contain", className)}
    />
  );
}

/**
 * The full logo, linking home. `tone="dark"` is for the dark header, mobile
 * menu and footer; `tone="light"` sits on ivory. `compact` is the header
 * size, which steps up slightly from the small breakpoint.
 */
export function BrandMark({ tone = "dark", className, compact = false }: { tone?: "light" | "dark"; className?: string; compact?: boolean }) {
  const art = LOCKUP[tone];
  const width = compact ? 180 : 208;
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-transparent",
        className,
      )}
      aria-label="Kheni Dental and Elite Implant Center, home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- images are unoptimized site-wide */}
      <img
        src={art.src}
        srcSet={art.srcSet}
        sizes={compact ? "(min-width: 640px) 180px, 152px" : "208px"}
        alt="Kheni Dental &amp; Elite Implant Center"
        width={width}
        height={Math.round(width / LOCKUP_RATIO)}
        // The header logo is above the fold on every page, so it is not lazy.
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className={cn("h-auto w-[152px] transition-opacity duration-300 group-hover:opacity-85", compact ? "sm:w-[180px]" : "w-[184px] sm:w-[208px]")}
      />
    </Link>
  );
}

/*
 * Regenerating the brand assets
 * ------------------------------
 * The two tones and the app icons are derived from the clinic's original
 * artwork by scripts/make-brand-assets.mjs. Re-run it if the clinic sends a
 * revised logo, rather than editing the PNGs by hand:
 *
 *   node scripts/make-brand-assets.mjs <path-to-logo.png>
 */
