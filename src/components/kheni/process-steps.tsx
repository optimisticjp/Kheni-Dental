import { cn } from "@/lib/utils";

/**
 * A process as a story, not five identical cards.
 *
 * Each stage gets a huge numeral, a title and a line. On a phone the
 * stages stack down a single rule with the numeral leading; from lg they
 * run as a row. `tone` follows the field the steps sit on.
 */
export type ProcessStep = { title: string; copy: string };

export function ProcessSteps({ steps, className, tone = "light", columns = 5 }: { steps: readonly ProcessStep[]; className?: string; tone?: "light" | "dark"; columns?: 3 | 4 | 5 }) {
  const dark = tone === "dark";
  const grid = columns === 5 ? "lg:grid-cols-5" : columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <ol className={cn("grid gap-0 lg:gap-6", grid, className)}>
      {steps.map((step, index) => (
        <li key={step.title} className={cn("relative grid grid-cols-[3rem_1fr] gap-3 border-t py-4 lg:block lg:pt-5", dark ? "border-white/20" : "border-ink/15")}>
          <span aria-hidden="true" className={cn("font-display text-[2.25rem] font-extrabold leading-none tracking-[-.05em] lg:text-[3.5rem]", dark ? "text-butter" : "text-m-text")}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="lg:mt-3">
            <h3 className="font-display text-xl font-extrabold leading-tight tracking-[-.025em]">{step.title}</h3>
            <p className={cn("t-small mt-1.5", dark ? "text-white/78" : "text-ink-soft")}>{step.copy}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
