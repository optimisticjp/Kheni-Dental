import { KheniMonogram } from "@/components/kheni/brand-mark";
import { Highlighted } from "@/components/kheni/section-intro";
import { Container } from "@/components/ui/container";
import { brandLineById, type BrandLine as Line } from "@/content/site";
import { cn, fieldClass, isDarkHue } from "@/lib/utils";

/**
 * A Kheni line set enormous on a full colour field. Brand voice, not a
 * patient quote, and never a claim. Once per page at most.
 */
export function BrandLine({ id, line, className, curve }: { id?: string; line?: Line; className?: string; curve?: string }) {
  const n = line ?? brandLineById(id ?? "signature");
  const dark = isDarkHue(n.hue);
  return (
    <section className={cn(fieldClass(n.hue), curve && "smile-cut", className)} aria-label="A note from Kheni Dental" style={curve ? ({ ["--curve" as string]: curve } as React.CSSProperties) : undefined}>
      <Container width="7xl" className="py-14 sm:py-20 lg:py-24">
        <KheniMonogram className="size-10" tone={dark ? "butter" : "ink"} />
        <p className="t-h1 mt-5 max-w-[18ch]">
          <Highlighted title={n.line} highlight={n.highlight} />
        </p>
        <p className="t-eyebrow mt-6">Kheni Dental, Surat</p>
      </Container>
    </section>
  );
}
