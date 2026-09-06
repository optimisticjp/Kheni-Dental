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
  highlight?: string | string[];
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

/**
 * Sets one or more phrases of a heading in the hue.
 *
 * "From your first visit to your final tooth" wants both ends lit, the way
 * the reference clinics do it, so `highlight` accepts an array. Matching is
 * exact and case-sensitive; a phrase that is not in the title is ignored
 * rather than crashing the page.
 */
export function Highlighted({ title, highlight }: { title: string; highlight?: string | string[] }) {
  const phrases = (Array.isArray(highlight) ? highlight : highlight ? [highlight] : []).filter((h) => h && title.includes(h));
  if (phrases.length === 0) return <>{title}</>;
  // Walk the title once, left to right, lighting each phrase where it first appears after the previous one.
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
