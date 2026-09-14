import { cn } from "@/lib/utils";

/**
 * A section opening: small eyebrow, heading with one warm italic word,
 * optional lead. The colours of the eyebrow and the highlight come from
 * the field the intro sits on (see the on-* classes in globals.css).
 */
export function SectionIntro({
  eyebrow,
  title,
  highlight,
  copy,
  align = "left",
  className,
  as: Tag = "h2",
  size = "h2",
}: {
  eyebrow?: string;
  title: string;
  highlight?: string | string[];
  copy?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
  size?: "h1" | "h2" | "h3" | "hero";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="t-eyebrow text-m-text">{eyebrow}</p>}
      <Tag className={cn(`t-${size}`, eyebrow && "mt-3")}>
        <Highlighted title={title} highlight={highlight} />
      </Tag>
      {copy && <p className={cn("t-lead muted mt-4 measure-lead", align === "center" && "mx-auto")}>{copy}</p>}
    </div>
  );
}

/**
 * Sets one or more phrases of a heading in the warm italic. Matching is
 * exact; a phrase that is not in the title is ignored rather than crashing.
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
    out.push(
      <span key={at} className="hl">
        {phrase}
      </span>,
    );
    cursor = at + phrase.length;
  }
  if (cursor < title.length) out.push(title.slice(cursor));
  return <>{out}</>;
}
