import { ProofChip } from "@/components/kheni/proof";
import { Highlighted } from "@/components/kheni/section-intro";
import { Container } from "@/components/ui/container";
import type { Hue } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Shared page opening on a light colour field in the page's hue. Title left,
 * standfirst and actions beneath, optional aside on the right from lg.
 * Compact on phones: the first content starts within one screen.
 */
export function PageHero({
  eyebrow,
  title,
  highlight,
  copy,
  hue = "cobalt",
  aside,
  children,
  proof = true,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  copy?: string;
  hue?: Hue;
  aside?: React.ReactNode;
  children?: React.ReactNode;
  proof?: boolean;
  compact?: boolean;
}) {
  return (
    <section className={cn(`hue-${hue} field relative isolate overflow-hidden`)} style={{ ["--f1" as string]: "var(--h-tint)", ["--f2" as string]: "var(--sunshine-tint)", ["--f3" as string]: "var(--h-soft)" }}>
      <Container width="7xl" className={cn("relative", compact ? "py-8 sm:py-10 lg:py-14" : "py-9 sm:py-12 lg:py-16", aside && "grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-14")}>
        <div>
          <p className="t-eyebrow text-h-text">{eyebrow}</p>
          <h1 className="t-h1 measure-head mt-3">
            <Highlighted title={title} highlight={highlight} />
          </h1>
          {copy && <p className="t-stand measure-stand mt-4 text-ink-soft">{copy}</p>}
          {proof && <ProofChip placement="page_hero" className="mt-5" />}
          {children}
        </div>
        {aside}
      </Container>
    </section>
  );
}
