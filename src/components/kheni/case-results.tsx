import { MediaFrame, PendingTag } from "@/components/kheni/pending";
import { PENDING_CASE_TILES, caseCategories, caseDisclaimer, caseResults } from "@/content/cases";
import { cn } from "@/lib/utils";

/**
 * Before and after results.
 *
 * Side-by-side rather than a drag slider: it works with a keyboard and a
 * screen reader without any custom interaction, it reads correctly at 320px,
 * and both states stay visible at once, which is what patients actually want
 * to compare. A slider would look clever and show less.
 */
export function CaseResultsGrid({ limit, tone = "light" }: { limit?: number; tone?: "dark" | "light" }) {
  const cases = limit ? caseResults.slice(0, limit) : caseResults;

  if (cases.length > 0) {
    return (
      <>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <article
              key={item.id}
              className={cn(
                "overflow-hidden rounded-2xl border",
                tone === "dark" ? "border-white/10 bg-white/[.04] text-white" : "border-border bg-card",
              )}
            >
              <div className="grid grid-cols-2 gap-px bg-border">
                <figure className="relative bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.beforeImage} alt="Before treatment" className="aspect-square w-full object-cover" loading="lazy" />
                  <figcaption className="absolute left-2 top-2 rounded-full bg-ink/80 px-2 py-0.5 text-[.6rem] font-semibold uppercase tracking-[.14em] text-white">
                    Before
                  </figcaption>
                </figure>
                <figure className="relative bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.afterImage} alt="After treatment" className="aspect-square w-full object-cover" loading="lazy" />
                  <figcaption className="absolute left-2 top-2 rounded-full bg-gold px-2 py-0.5 text-[.6rem] font-semibold uppercase tracking-[.14em] text-ink">
                    After
                  </figcaption>
                </figure>
              </div>
              <div className="p-5">
                <p className="text-[.62rem] font-semibold uppercase tracking-[.16em] text-gold">{item.category}</p>
                <p className="mt-2 text-sm font-medium">{item.startingConcern}</p>
                <p className={cn("mt-2 text-sm leading-6", tone === "dark" ? "text-white/55" : "text-muted-foreground")}>
                  {item.resultSummary}
                </p>
                <p className={cn("mt-3 text-xs", tone === "dark" ? "text-white/35" : "text-muted-foreground/80")}>
                  {item.afterTakenAt}
                  {item.timeline ? ` · ${item.timeline}` : ""}
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className={cn("mt-6 text-xs leading-5", tone === "dark" ? "text-white/40" : "text-muted-foreground")}>
          {caseDisclaimer}
        </p>
      </>
    );
  }

  // Pending state: the finished card with both frames, so the clinic can see
  // exactly which two photographs each case needs.
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: PENDING_CASE_TILES }).map((_, index) => {
        const category = caseCategories[index % caseCategories.length];
        return (
          <article
            key={index}
            className={cn(
              "overflow-hidden rounded-2xl border border-dashed",
              tone === "dark" ? "border-white/12" : "border-border",
            )}
          >
            <div className="grid grid-cols-2 gap-2 p-2">
              <MediaFrame shot="Before" tone={tone} ratio="1 / 1" className="rounded-xl" />
              <MediaFrame shot="After" tone={tone} ratio="1 / 1" className="rounded-xl" />
            </div>
            <div className="p-5 pt-2">
              <p className="text-[.62rem] font-semibold uppercase tracking-[.16em] text-gold">{category}</p>
              <PendingTag className="mt-3" label="Consented case needed" />
            </div>
          </article>
        );
      })}
    </div>
  );
}
