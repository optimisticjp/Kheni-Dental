import { ProofChip } from "@/components/kheni/proof";
import { Highlighted } from "@/components/kheni/section-intro";
import { Container } from "@/components/ui/container";
import type { Hue } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Shared page opening. By default a near-black band with a gold eyebrow and
 * hairline, ivory title, standfirst and the Google chip: the same room the
 * homepage opens in. `tone="light"` puts the same composition on a soft
 * field (kids, resources) so not every page starts in the dark.
 * Compact on phones: the first content starts within one screen.
 */
export function PageHero({
  eyebrow,
  title,
  highlight,
  copy,
  hue = "gold",
  tone = "dark",
  field,
  aside,
  children,
  proof = true,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  highlight?: string | string[];
  copy?: string;
  hue?: Hue;
  tone?: "dark" | "light";
  /** The light field to use when tone is light. */
  field?: "sky" | "mint" | "peach" | "lavender" | "butter" | "sand" | "ivory";
  aside?: React.ReactNode;
  children?: React.ReactNode;
  proof?: boolean;
  compact?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <section
      className={cn(
        `hue-${hue} relative isolate overflow-hidden`,
        dark ? "on-dark grain bg-ink text-ivory" : field ? `bg-${field}` : "bg-ivory",
      )}
    >
      {dark && <div aria-hidden="true" className="bloom-gold pointer-events-none absolute inset-0" />}
      <Container width="7xl" className={cn("relative", compact ? "sec-tight" : "sec", aside && "grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-14")}>
        <div>
          <p className={cn("t-eyebrow flex items-center gap-3", dark ? "text-gold" : "text-gold-text")}>
            {eyebrow}
            <span aria-hidden="true" className="rule-gold h-px w-12" />
          </p>
          <h1 className="t-h1 measure-head mt-3">
            <Highlighted title={title} highlight={highlight} />
          </h1>
          {copy && <p className={cn("t-stand measure-stand mt-4", dark ? "text-ivory/70" : "text-ink-soft")}>{copy}</p>}
          {proof && <ProofChip placement="page_hero" tone={dark ? "dark" : "light"} className="mt-5" />}
          {children}
        </div>
        {aside}
      </Container>
    </section>
  );
}
