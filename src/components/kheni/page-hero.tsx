import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/**
 * Shared page opening.
 *
 * Carries the same devices as the homepage hero (grain, a low gold bloom, a
 * drawn hairline beside the eyebrow) so every route reads as one site.
 *
 * TWO SHAPES, PICKED AUTOMATICALLY
 *
 *   with `aside`   heading left, proof panel right. Used where a page has
 *                  something real to put at the very top.
 *
 *   without        an editorial masthead: title left, standfirst right,
 *                  sharing a baseline. A single left-aligned column left the
 *                  right 55% of a 1440 canvas empty on half the site, which
 *                  read as unfinished rather than spacious.
 *
 * `children` always sits below both columns, full width, so chip rows and
 * button clusters keep their own line.
 */
export function PageHero({
  eyebrow,
  title,
  copy,
  aside,
  children,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const split = !aside && Boolean(copy);

  return (
    <section className="grain relative isolate overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="bloom-gold pointer-events-none absolute inset-0 -z-10" />
      <Container
        width="7xl"
        className={cn(
          "relative py-12 sm:py-14 lg:py-18",
          aside && "grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-14",
        )}
      >
        <div>
          <div className="flex items-center gap-3">
            <span className="t-eyebrow text-gold">{eyebrow}</span>
            <span aria-hidden="true" className="rule-gold h-px w-16" />
          </div>

          <div
            className={cn(
              "mt-5",
              split && "grid gap-6 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-16",
            )}
          >
            <h1 className={cn("t-h1", !split && "measure-head")}>{title}</h1>
            {copy && (
              <p className={cn("t-stand text-white/60", split ? "measure-stand lg:pb-1.5" : "measure-stand mt-5")}>
                {copy}
              </p>
            )}
          </div>

          {children}
        </div>
        {aside}
      </Container>
    </section>
  );
}
