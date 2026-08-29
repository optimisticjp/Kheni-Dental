import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, copy, align = "left", className }: { eyebrow?: string; title: string; copy?: string; align?: "left" | "center"; className?: string }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gold">{eyebrow}</p>}
      <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">{title}</h2>
      {copy && <p className="mt-5 max-w-2xl t-stand text-muted-foreground sm:text-lg">{copy}</p>}
    </div>
  );
}
