import { cn } from "@/lib/utils";

/**
 * A section opening: a small gold eyebrow, a heading with at most one
 * italic word, an optional standfirst. `tone="dark"` sets it for an ink
 * section. `highlight` must appear in `title`.
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
  rule = false,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string | string[];
  copy?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2" | "h3";
  size?: "h1" | "h2" | "h3" | "display";
  /** Draw the gold hairline after the eyebrow, the way the dark sections open. */
  rule?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", dark && "on-dark", className)}>
      {eyebrow && (
        <p className={cn("t-eyebrow flex items-center gap-3", align === "center" && "justify-center", dark ? "text-gold" : "text-gold-text")}>
          {eyebrow}
          {rule && <span aria-hidden="true" className="rule-gold h-px w-12" />}
        </p>
      )}
      <Tag className={cn(`t-${size}`, eyebrow && "mt-3", dark ? "text-ivory" : "text-ink")}>
        <Highlighted title={title} highlight={highlight} />
      </Tag>
      {copy && <p className={cn("t-stand mt-4", align === "center" && "mx-auto", dark ? "text-ivory/70" : "text-ink-soft", "measure-stand")}>{copy}</p>}
    </div>
  );
}

/**
 * Sets one or more phrases of a heading in italic gold. Matching is exact
 * and case-sensitive; a phrase that is not in the title is ignored rather
 * than crashing the page.
 */
export function Highlighted({ title, highlight }: { title: string; highlight?: string | string[] }) {
  const phrases = (Array.isArray(highlight) ? highlight : highlight ? [highlight] : []).filter((h) => h && title.includes(h));
  if (phrases.length === 0) return <>{title}</>;
  const out: React.ReactNode[] = [];
  let cursor = 0;
  for (const phrase of phrases) {
    const at = title.indexOf(phrase, cursor);
    if (at === -1) continue;
    if (at > cursor) out.push(title.slice(cursor, at));
    out.push(<span key={at} className="hl">{phrase}</span>);
    cursor = at + phrase.length;
  }
  if (cursor < title.length) out.push(title.slice(cursor));
  return <>{out}</>;
}
