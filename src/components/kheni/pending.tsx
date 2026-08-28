import { Camera, ImageIcon, Play } from "lucide-react";

import type { ProofValue } from "@/content/clinic-proof";
import { cn } from "@/lib/utils";

/**
 * The placeholder system.
 *
 * Two kinds of content are missing while the clinic gathers material:
 *
 *   DATA   a number, price, technology name or rating we do not have yet
 *   VISUAL a photo, portrait, case image or video thumbnail
 *
 * In both cases the component renders *finished*. What is missing is marked
 * clearly enough that nobody could mistake it for real information, and
 * replacing it later is a one-line data change. Nothing here says "this
 * section will contain X later"; it shows the real component with the value
 * flagged.
 */

/** Small tag that marks an unfilled value. Deliberately hard to miss. */
export function PendingTag({ label = "Clinic data needed", className }: { label?: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-dashed border-gold/55 px-2 py-0.5 text-[.58rem] font-semibold uppercase tracking-[.14em] text-gold",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1 rounded-full bg-gold" />
      {label}
    </span>
  );
}

/**
 * A single proof number. Renders the real figure when verified, otherwise the
 * masked shape of the number plus a pending tag, so the layout is identical
 * either way.
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
          "font-serif leading-none tracking-[-.03em]",
          size === "lg" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl",
          isPending ? "text-gold/45" : "text-gold",
        )}
      >
        {shown}
      </p>
      <p
        className={cn(
          "mt-2 text-[.7rem] font-semibold uppercase tracking-[.14em]",
          tone === "dark" ? "text-white/55" : "text-muted-foreground",
        )}
      >
        {label}
      </p>
      {detail && !isPending && (
        <p className={cn("mt-1 text-xs", tone === "dark" ? "text-white/35" : "text-muted-foreground/80")}>{detail}</p>
      )}
      {isPending && <PendingTag className="mt-2" />}
    </div>
  );
}

/**
 * Neutral visual placeholder for photography that has not arrived.
 *
 * Designed to look like an intentional part of the layout rather than a note
 * to the developer. The caption names the shot the clinic needs to take, in
 * the smallest type in the frame.
 */
export function MediaFrame({
  shot,
  className,
  tone = "dark",
  icon = "photo",
  ratio,
}: {
  shot: string;
  className?: string;
  tone?: "dark" | "light";
  icon?: "photo" | "portrait" | "video";
  ratio?: string;
}) {
  const Icon = icon === "video" ? Play : icon === "portrait" ? Camera : ImageIcon;
  return (
    <div
      className={cn(
        "relative isolate flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed p-6 text-center",
        tone === "dark"
          ? "border-white/12 bg-[linear-gradient(150deg,#171714,#0c0c0b)]"
          : "border-border bg-[linear-gradient(150deg,#f6f3ec,#efeae0)]",
        className,
      )}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[.35] [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:34px_34px] [color:rgba(202,169,104,.10)]"
      />
      <span
        className={cn(
          "relative grid size-10 place-items-center rounded-full border",
          tone === "dark" ? "border-gold/25 bg-gold/8 text-gold" : "border-gold/30 bg-gold/10 text-gold",
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <p className={cn("relative mt-3 text-xs font-medium", tone === "dark" ? "text-white/60" : "text-muted-foreground")}>
        {shot}
      </p>
      <PendingTag label="Photo needed" className="relative mt-2.5" />
    </div>
  );
}

/**
 * Doctor portrait stand-in. Uses the doctor's initials in the brand type
 * rather than a grey avatar, so a profile still looks composed without a
 * photograph.
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
        "relative flex items-center justify-center overflow-hidden rounded-2xl",
        tone === "dark"
          ? "bg-[radial-gradient(circle_at_50%_18%,rgba(202,169,104,.20),transparent_62%),linear-gradient(160deg,#191916,#0b0b0a)]"
          : "bg-[radial-gradient(circle_at_50%_18%,rgba(202,169,104,.22),transparent_62%),linear-gradient(160deg,#f7f4ed,#ebe5d9)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "font-serif text-[clamp(3rem,9vw,5.5rem)] leading-none tracking-[-.04em]",
          tone === "dark" ? "text-gold/40" : "text-gold/55",
        )}
      >
        {initials}
      </span>
    </div>
  );
}
