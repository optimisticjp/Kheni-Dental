import { ProofPill } from "@/components/kheni/proof";
import { Highlighted } from "@/components/kheni/section-intro";
import { Container } from "@/components/ui/container";
import type { Hue } from "@/content/site";
import { cn, fieldClass } from "@/lib/utils";

/**
 * Inner page opening: a full colour field in the page's mood, the title
 * set large straight on the colour, the lead beneath, an optional aside on
 * the right from lg. The field ends in a smile curve into the next section.
 */
export function PageHero({
  eyebrow,
  title,
  highlight,
  copy,
  hue = "blue",
  aside,
  children,
  proof = true,
  compact = false,
  curve = "var(--cream)",
}: {
  eyebrow: string;
  title: string;
  highlight?: string | string[];
  copy?: string;
  hue?: Hue;
  aside?: React.ReactNode;
  children?: React.ReactNode;
  proof?: boolean;
  compact?: boolean;
  /** Colour of the section underneath, for the smile cut. */
  curve?: string;
}) {
  return (
    <section className={cn(fieldClass(hue), "smile-cut relative isolate overflow-hidden")} style={{ ["--curve" as string]: curve }}>
      <Container width="7xl" className={cn("relative", compact ? "pb-14 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-14" : "pb-16 pt-9 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-16", aside && "grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14")}>
        <div>
          <p className="t-eyebrow">{eyebrow}</p>
          <h1 className="t-h1 measure-head mt-3">
            <Highlighted title={title} highlight={highlight} />
          </h1>
          {copy && <p className="t-lead measure-lead muted mt-4">{copy}</p>}
          {proof && <ProofPill placement="page_hero" className="mt-5" />}
          {children}
        </div>
        {aside}
      </Container>
    </section>
  );
}
