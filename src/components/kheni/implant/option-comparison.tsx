import { comparison } from "@/content/implant-center";
import { cn } from "@/lib/utils";

/**
 * Implant / bridge / denture comparison.
 *
 * This is an education module, not an argument for implants. Every row
 * describes what each option involves rather than ranking them, and the
 * closing note says plainly that the right answer depends on the examination.
 *
 * One DOM structure for every breakpoint. Each dimension is a heading followed
 * by three labelled cells, so the content reflows to a readable stack on a
 * 320px screen and lines up into aligned columns from `md` up. There is no
 * horizontally scrolling table and no duplicated copy behind a breakpoint.
 *
 * The implant cell carries a faint warm tint because this is the implant page.
 * It is a wayfinding cue only, never a claim that an implant is the right
 * choice.
 *
 * Server Component.
 */
const COLUMN_GRID = "md:grid-cols-[1.05fr_1fr_1fr_1fr]";

export function OptionComparison() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card">
      {/* Column headers, from md up. On smaller screens each cell carries its own label. */}
      <div
        className={cn(
          "hidden gap-x-6 border-b border-border bg-[#f6f3ec] px-6 py-4 md:grid lg:px-8",
          COLUMN_GRID,
        )}
      >
        <span className="text-[.68rem] font-semibold uppercase tracking-[.2em] text-muted-foreground">
          What to compare
        </span>
        {comparison.columns.map((column) => (
          <span
            key={column}
            className={cn(
              "text-[.68rem] font-semibold uppercase tracking-[.2em]",
              column === "Implant" ? "text-gold" : "text-muted-foreground",
            )}
          >
            {column}
          </span>
        ))}
      </div>

      <div className="divide-y divide-border">
        {comparison.rows.map((row) => (
          <div key={row.label} className={cn("grid gap-x-6 px-5 py-5 sm:px-6 md:py-6 lg:px-8", COLUMN_GRID)}>
            <h3 className="font-serif text-xl leading-tight md:text-lg md:leading-snug">
              {row.label}
            </h3>

            <Cell option="Implant" emphasis>
              {row.implant}
            </Cell>
            <Cell option="Bridge">{row.bridge}</Cell>
            <Cell option="Denture">{row.denture}</Cell>
          </div>
        ))}
      </div>

      <p className="border-t border-border bg-[#f6f3ec] px-6 py-6 text-sm leading-6 text-muted-foreground lg:px-8">
        {comparison.note}
      </p>
    </div>
  );
}

function Cell({
  option,
  emphasis = false,
  children,
}: {
  option: string;
  emphasis?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mt-2.5 rounded-xl px-3.5 py-2.5 md:mt-0 md:px-3 md:py-2.5",
        emphasis ? "bg-gold/[.09] md:bg-gold/[.07]" : "bg-[#f6f3ec]/70 md:bg-transparent",
      )}
    >
      {/* The column name travels with the cell below md, where the header row is hidden. */}
      <span
        className={cn(
          "block text-[.62rem] font-semibold uppercase tracking-[.18em] md:hidden",
          emphasis ? "text-gold" : "text-muted-foreground",
        )}
      >
        {option}
      </span>
      <p className="mt-1.5 text-sm leading-6 text-muted-foreground md:mt-0">{children}</p>
    </div>
  );
}
