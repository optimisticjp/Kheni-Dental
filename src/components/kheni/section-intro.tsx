import { cn } from "@/lib/utils";

/**
 * A section opening: small hue eyebrow, heading with one highlighted word,
 * optional standfirst. `highlight` marks the word in the heading to set in
 * italic hue; it must appear in `title`.
 */
export function SectionIntro({
  eyebrow,
  title,
  highlight,
  copy,
  align = "left",
  tone = "light",
  className,
  as: Tag = "h2",
  size = "h2",
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  copy?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2" | "h3";
  size?: "h1" | "h2" | "h3" | "display";
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("t-eyebrow", dark ? "text-sunshine" : "text-h-text")}>{eyebrow}</p>}
      <Tag className={cn(`t-${size}`, eyebrow && "mt-3", dark ? "text-white" : "text-ink")}>
        <Highlighted title={title} highlight={highlight} />
      </Tag>
      {copy && <p className={cn("t-stand mt-4", align === "center" && "mx-auto", dark ? "text-white/75" : "text-ink-soft", "measure-stand")}>{copy}</p>}
    </div>
  );
}

/** Splits a heading around its highlighted word. Exact, case-sensitive match. */
export function Highlighted({ title, highlight }: { title: string; highlight?: string }) {
  if (!highlight) return <>{title}</>;
  const index = title.indexOf(highlight);
  if (index === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, index)}
      <span className="hl">{highlight}</span>
      {title.slice(index + highlight.length)}
    </>
  );
}
