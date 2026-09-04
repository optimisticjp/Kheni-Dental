import { cn } from "@/lib/utils";

/**
 * Numbered steps with a connector, in the section's hue. Stacks vertically
 * with a left rail on phones; runs as a row with a line between steps on
 * desktop. Numbers are the visual anchor; nothing bounces.
 */
export function ProcessSteps({
  steps,
  className,
  columns = 5,
  dense = false,
}: {
  steps: readonly { title: string; copy: string }[];
  className?: string;
  columns?: 3 | 4 | 5;
  /** On phones, show titles only; the copy returns from sm up. */
  dense?: boolean;
}) {
  return (
    <ol
      className={cn(
        "relative grid gap-3 lg:gap-4",
        columns === 5 && "lg:grid-cols-5",
        columns === 4 && "lg:grid-cols-4",
        columns === 3 && "lg:grid-cols-3",
        className,
      )}
    >
      {steps.map((step, index) => (
        <li key={step.title} className={cn("relative flex gap-4 rounded-2xl bg-white p-4 ring-1 ring-line lg:flex-col lg:gap-0 lg:p-5", dense && "items-center py-3 lg:items-stretch lg:py-5")}>
          <div className="relative flex shrink-0 flex-col items-center lg:mb-4 lg:flex-row">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-h-fill font-serif text-lg font-semibold text-h-on-fill">
              {index + 1}
            </span>
            {index < steps.length - 1 && (
              <span aria-hidden="true" className={cn("mt-2 w-0.5 flex-1 rounded-full bg-h-soft lg:mt-0 lg:ml-2 lg:h-0.5 lg:w-auto lg:flex-1", dense && "hidden sm:block")} />
            )}
          </div>
          <div>
            <h3 className="t-card">{step.title}</h3>
            <p className={cn("t-small mt-1.5 text-ink-soft", dense && "hidden sm:block")}>{step.copy}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
