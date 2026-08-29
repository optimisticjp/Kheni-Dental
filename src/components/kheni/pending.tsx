import { Camera, ImageIcon, Play } from "lucide-react";

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
 */

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
  className,
  tone = "dark",
  icon = "photo",
  ratio,
  compact = false,
}: {
  shot: string;
  className?: string;
  tone?: "dark" | "light";
  icon?: "photo" | "portrait" | "video";
  ratio?: string;
  /** Drops the caption, for small repeated frames where it would be noise. */
  compact?: boolean;
}) {
  const Icon = icon === "video" ? Play : icon === "portrait" ? Camera : ImageIcon;
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed p-5 text-center",
        tone === "dark" ? "border-white/10 bg-white/[.02]" : "border-border/70 bg-[#f4f1ea]",
        className,
      )}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <Icon
        className={cn("size-5 shrink-0", tone === "dark" ? "text-white/20" : "text-foreground/15")}
        aria-hidden="true"
      />
      {!compact && (
        <p className={cn("t-small mt-2.5 max-w-[24ch]", tone === "dark" ? "text-white/30" : "text-muted-foreground/60")}>
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
