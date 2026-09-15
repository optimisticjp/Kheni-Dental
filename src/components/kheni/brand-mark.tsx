import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * The clinic's own logo, in its two official website treatments.
 *
 * Both are generated from the clinic's original artwork by
 * scripts/make-brand-assets.mjs, which repaints flat colour zones and keeps
 * the original alpha. The geometry, the tooth, the K and the wording are
 * never touched.
 *
 *   light   the clinic's own colours, charcoal linework and a rose mark.
 *           For ivory, white, blush, sand, sage and blue-grey surfaces.
 *   dark    the reverse treatment: the K swoosh lifted to a rose that reads
 *           on ink, the tooth linework in a held-back ivory so the rose
 *           leads, "KHENI DENTAL &" in warm ivory and "ELITE IMPLANT
 *           CENTER" in champagne. For the header, mobile menu and footer.
 *
 * The tooth interior is transparent rather than filled white, so the reverse
 * treatment is the real artwork rather than a knocked-out box.
 *
 * Plain <img> rather than next/image because images are unoptimized
 * site-wide; width and height are set so nothing shifts while it loads.
 */

/** Source aspect ratio of the full lockup, from the supplied artwork. */
const LOCKUP_RATIO = 2030 / 442;

const LOCKUP = {
  dark: {
    src: "/brand/kheni-logo-dark-640w.png",
    srcSet: "/brand/kheni-logo-dark-320w.png 320w, /brand/kheni-logo-dark-640w.png 640w",
  },
  light: {
    src: "/brand/kheni-logo-light-640w.png",
    srcSet: "/brand/kheni-logo-light-320w.png 320w, /brand/kheni-logo-light-640w.png 640w",
  },
} as const;

const MARK = {
  dark: {
    src: "/brand/kheni-mark-dark-192w.png",
    srcSet: "/brand/kheni-mark-dark-96w.png 96w, /brand/kheni-mark-dark-192w.png 192w",
  },
  light: {
    src: "/brand/kheni-mark-light-192w.png",
    srcSet: "/brand/kheni-mark-light-96w.png 96w, /brand/kheni-mark-light-192w.png 192w",
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
        "group inline-flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-4 focus-visible:ring-offset-transparent",
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
 * Both treatments and the app icons come from the clinic's original artwork
 * at assets/brand/kheni-logo-original.png. Re-run the script if the clinic
 * sends a revised logo, rather than editing the PNGs by hand:
 *
 *   node scripts/make-brand-assets.mjs [path-to-logo.png]
 */
