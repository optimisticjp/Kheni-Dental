import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/**
 * Shared page opening.
 *
 * Carries the same devices as the homepage hero (grain, low gold bloom, a
 * drawn hairline beside the eyebrow) so every route reads as one site. Shorter
 * than the old version: a full viewport of ink before any content was costing
 * a scroll on every page for no information.
 *
 * `aside` takes an optional panel for the right-hand column, used where a page
 * has proof worth putting at the very top, such as reviews or a branch.
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
  return (
    <section className="grain relative isolate overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="bloom-gold pointer-events-none absolute inset-0 -z-10" />
      <Container
        width="7xl"
        className={cn(
          "relative py-12 sm:py-16 lg:py-20",
          aside && "grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-14",
        )}
      >
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[.66rem] font-semibold uppercase tracking-[.22em] text-gold">{eyebrow}</span>
            <span aria-hidden="true" className="rule-gold h-px w-16" />
          </div>
          <h1 className="mt-5 max-w-3xl font-serif text-[clamp(2.3rem,5.6vw,4.2rem)] leading-[.99] tracking-[-.045em]">
            {title}
          </h1>
          {copy && <p className="mt-5 max-w-xl text-base leading-7 text-white/60">{copy}</p>}
          {children}
        </div>
        {aside}
      </Container>
    </section>
  );
}
