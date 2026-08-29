import { Play } from "lucide-react";

import type { ProofValue } from "@/content/clinic-proof";
import { cn } from "@/lib/utils";

/**
 * The placeholder system.
 *
 * WHY THIS LOOKS QUIET
 * An earlier version drew every pending marker in gold. On a site whose
 * content is still arriving that meant the accent colour landed almost
 * entirely on things we do *not* have: nine gold "photo needed" pills sat in
 * one viewport of the gallery, and the empty frame in the homepage hero was
 * the largest object on the page. The site advertised its own gaps.
 *
 * So the rule is now explicit and one-way:
 *
 *   REAL PROOF IS LOUD. MISSING CONTENT IS QUIET.
 *
 * Placeholders hold the final composition, stay legible enough that the
 * clinic can see exactly what is wanted, and otherwise recede. Gold is
 * reserved for real numbers, primary actions and selected states.
 *
 * `tone="marked"` restores the louder treatment, for the few places whose
 * whole purpose is to show the doctor what to send.
 *
 * WHO THE MARKERS ARE FOR
 * They are notes to the clinic, and they were rendering to patients. The NRI
 * page listed "Country 01 … Country 06 · CONFIRM" to someone deciding whether
 * to fly to Surat for treatment; the homepage showed "XX,XXX+ PATIENTS
 * TREATED". A visitor cannot act on either, and both cost more trust than the
 * missing content would have earned.
 *
 * So the markers are now off by default and the site reads as finished.
 * `NEXT_PUBLIC_SHOW_CONTENT_GAPS=true` turns them back on in a preview build,
 * which is where the doctors should be looking at them; the standing list is
 * docs/CLINIC-CONTENT-NEEDED.md.
 */

/** Whether to draw the clinic's to-do notes over the site. Off in production. */
export const showContentGaps = process.env.NEXT_PUBLIC_SHOW_CONTENT_GAPS === "true";

type PendingTone = "quiet" | "marked";

/** Small tag marking an unfilled value. Neutral unless explicitly marked. */
export function PendingTag({
  label = "Clinic data needed",
  tone = "quiet",
  className,
}: {
  label?: string;
  tone?: PendingTone;
  className?: string;
}) {
  if (!showContentGaps) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-dashed px-2 py-0.5 text-[.58rem] font-medium uppercase tracking-[.12em]",
        tone === "marked"
          ? "border-gold/50 text-gold"
          : "border-current/25 text-current opacity-45",
        className,
      )}
    >
      {label}
    </span>
  );
}

/**
 * A single proof number. A verified figure gets the gold and the full weight;
 * a pending one keeps the exact same footprint so the layout never shifts,
 * but drops back to the surrounding text colour.
 */
export function ProofNumber({
  value,
  label,
  detail,
  align = "left",
  size = "md",
  tone = "dark",
}: {
  value: ProofValue;
  label: string;
  detail?: string;
  align?: "left" | "center";
  size?: "md" | "lg";
  tone?: "dark" | "light";
}) {
  const isPending = value.status === "pending";
  // A figure nobody has sent is not a figure. Rendering "XX,XXX+" in the brand
  // serif beside real numbers reads as an unfinished website, so the slot is
  // simply absent until there is something true to put in it.
  if (isPending && !showContentGaps) return null;
  const shown = value.status === "verified" ? value.value : value.placeholder;
  return (
    <div className={cn(align === "center" && "text-center")}>
      <p
        className={cn(
          "t-proof",
          size === "lg" && "text-[clamp(2.3rem,3.6vw,3.2rem)]",
          isPending
            ? tone === "dark"
              ? "text-white/25"
              : "text-foreground/20"
            : "text-gold",
        )}
      >
        {shown}
      </p>
      <p
        className={cn(
          "t-eyebrow mt-2.5",
          isPending
            ? tone === "dark"
              ? "text-white/35"
              : "text-muted-foreground/70"
            : tone === "dark"
              ? "text-white/60"
              : "text-muted-foreground",
        )}
      >
        {label}
      </p>
      {detail && !isPending && (
        <p className={cn("t-small mt-1", tone === "dark" ? "text-white/35" : "text-muted-foreground/80")}>{detail}</p>
      )}
      {isPending && <PendingTag className="mt-2" label="Figure needed" />}
    </div>
  );
}

/**
 * Photography that has not arrived.
 *
 * Holds the final crop so a real image drops in without touching layout. The
 * frame is a plain recessed panel: no gold, no grid pattern, no badge. The
 * caption names the shot at the smallest legible size and nothing else in the
 * frame competes with the page around it.
 */
export function MediaFrame({
  shot,
  src,
  alt,
  className,
  tone = "dark",
  ratio,
  kind = "photo",
  compact = false,
}: {
  /** What photograph belongs here. Shown as the plate's caption until one does. */
  shot: string;
  /** A real photograph. Everything below is what stands in until there is one. */
  src?: string;
  /** Required with `src`. Describe the photograph, not the slot. */
  alt?: string;
  className?: string;
  tone?: "dark" | "light";
  ratio?: string;
  /** A video plate marks itself, because a still and a clip are not the same ask. */
  kind?: "photo" | "video";
  /** Drops the caption, for small repeated frames where it would be noise. */
  compact?: boolean;
}) {
  const dark = tone === "dark";

  if (src) {
    return (
      <div
        className={cn("relative overflow-hidden rounded-2xl", className)}
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- images are unoptimized site-wide */}
        <img src={src} alt={alt ?? shot} loading="lazy" decoding="async" className="size-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative isolate flex flex-col justify-end overflow-hidden rounded-2xl ring-1 ring-inset",
        dark ? "bg-[#100f0e] ring-white/[.07]" : "bg-[#efebe2] ring-ink/[.07]",
        compact ? "p-3" : "p-4 sm:p-5",
        className,
      )}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {/*
        The monogram, not an image icon.

        A dashed rectangle around a grey picture glyph is the same drawing a
        browser makes for an image that failed to load, so every empty slot on
        the site read as a fault rather than as a plate waiting for a
        photograph. This is the brand mark instead, set large, cropped by the
        frame and barely there.
      */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-[.12em] -bottom-[.34em] -z-10 select-none font-serif leading-none",
          compact ? "text-[5.5rem]" : "text-[11rem] sm:text-[15rem]",
          dark ? "text-white/[.045]" : "text-ink/[.05]",
        )}
      >
        K
      </span>

      {!compact && (
        <p
          className={cn(
            "flex items-center gap-2.5 text-[.62rem] font-medium uppercase tracking-[.14em]",
            dark ? "text-white/35" : "text-ink/40",
          )}
        >
          {kind === "video" ? (
            <Play className={cn("size-3 shrink-0 fill-current", dark ? "text-gold/70" : "text-gold")} aria-hidden="true" />
          ) : (
            <span aria-hidden="true" className={cn("h-px w-5 shrink-0", dark ? "bg-gold/45" : "bg-gold/55")} />
          )}
          {shot}
        </p>
      )}
    </div>
  );
}

/**
 * Doctor portrait stand-in.
 *
 * The initials sit at a confident but not enormous size, and the frame is the
 * same recessed panel as any other missing photograph. Previously this drew a
 * gold radial bloom and set the initials huge, which made an absent portrait
 * the most decorated element on a doctor's own page.
 */
export function InitialsPortrait({
  name,
  className,
  tone = "dark",
}: {
  name: string;
  className?: string;
  tone?: "dark" | "light";
}) {
  const initials = name
    .replace(/^Dr\.?\s*/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl border border-dashed",
        tone === "dark" ? "border-white/10 bg-white/[.02]" : "border-border/70 bg-[#f4f1ea]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "font-serif text-[clamp(2rem,4vw,3rem)] leading-none tracking-[-.03em]",
          tone === "dark" ? "text-white/20" : "text-foreground/15",
        )}
      >
        {initials}
      </span>
    </div>
  );
}
