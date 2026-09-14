import { ClipboardList, MessageCircle, ScanLine, Sparkles, Stethoscope, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Numbered steps, two ways.
 *
 *   rail    the original. A numbered disc, a connector, title and copy.
 *           Compact, and the one to use inside a dark or busy section.
 *
 *   cards   the pattern the clinic pointed at: a white card with a glyph in
 *           a soft circle top left, the title and copy, and a large numeral
 *           printed faintly in the bottom right corner like a page number.
 *           The numeral is aria-hidden; the <ol> already carries the order.
 *
 * Both stack on a phone and run as a row from lg. Nothing animates.
 */
export type ProcessStep = { title: string; copy: string; icon?: LucideIcon };

/** Glyphs by position, for steps that do not name their own. */
const DEFAULT_ICONS: LucideIcon[] = [MessageCircle, ScanLine, ClipboardList, Stethoscope, Sparkles];

export function ProcessSteps({
  steps,
  className,
  columns = 5,
  dense = false,
  variant = "rail",
  tone = "light",
}: {
  steps: readonly ProcessStep[];
  className?: string;
  columns?: 3 | 4 | 5;
  /** On phones, show titles only; the copy returns from sm up. */
  dense?: boolean;
  variant?: "rail" | "cards";
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const grid = cn(
    "relative grid gap-3 lg:gap-4",
    columns === 5 && "lg:grid-cols-5",
    columns === 4 && "lg:grid-cols-4",
    columns === 3 && "lg:grid-cols-3",
    className,
  );

  if (variant === "cards") {
    return (
      <ol className={cn(grid, "sm:grid-cols-2")}>
        {steps.map((step, index) => {
          const Icon = step.icon ?? DEFAULT_ICONS[index % DEFAULT_ICONS.length];
          return (
            <li key={step.title} className={cn("relative isolate overflow-hidden rounded-[1.25rem] p-5 ring-1 sm:p-6", dark ? "bg-ivory/[.05] ring-ivory/10 text-ivory" : "bg-white ring-line")}>
              <span aria-hidden="true" className={cn("grid size-12 place-items-center rounded-full", dark ? "border border-gold/40 text-gold" : "bg-gold-tint text-gold-text")}>
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="t-card mt-5 pr-10">{step.title}</h3>
              <p className={cn("t-small mt-2", dark ? "text-ivory/65" : "text-ink-soft", dense && "hidden sm:block")}>{step.copy}</p>
              {/* The page-number numeral. Set in the serif, very large and very faint. */}
              <span
                aria-hidden="true"
                className={cn("pointer-events-none absolute -bottom-3 -right-1 select-none font-serif text-[5rem] leading-none tracking-[-.06em] opacity-[.12]", dark ? "text-gold" : "text-ink")}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className={grid}>
      {steps.map((step, index) => (
        <li key={step.title} className={cn("relative flex gap-4 rounded-2xl p-4 ring-1 lg:flex-col lg:gap-0 lg:p-5", dark ? "bg-ivory/[.05] ring-ivory/10 text-ivory" : "bg-white ring-line", dense && "items-center py-3 lg:items-stretch lg:py-5")}>
          <div className="relative flex shrink-0 flex-col items-center lg:mb-4 lg:flex-row">
            <span className={cn("grid size-10 shrink-0 place-items-center rounded-full font-serif text-lg", dark ? "bg-gold text-ink" : "bg-ink text-gold")}>
              {index + 1}
            </span>
            {index < steps.length - 1 && (
              <span aria-hidden="true" className={cn("mt-2 w-px flex-1 lg:mt-0 lg:ml-2 lg:h-px lg:w-auto lg:flex-1", dark ? "bg-gold/30" : "bg-ink/15", dense && "hidden sm:block")} />
            )}
          </div>
          <div>
            <h3 className="t-card">{step.title}</h3>
            <p className={cn("t-small mt-1.5", dark ? "text-ivory/65" : "text-ink-soft", dense && "hidden sm:block")}>{step.copy}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
