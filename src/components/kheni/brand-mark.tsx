import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * The Kheni mark: a roundel with a fine gold ring and a serif K. On a dark
 * surface the K is gold on ink; on a light one it is ivory on ink. Drawn
 * inline so it costs no request and scales cleanly.
 */
export function KheniMonogram({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const onDark = tone === "dark";
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <circle cx="20" cy="20" r="19" fill={onDark ? "var(--ink-2)" : "var(--ink)"} stroke="var(--gold)" strokeWidth="1.25" />
      <text
        x="20"
        y="27"
        textAnchor="middle"
        fontFamily="var(--font-fraunces), Georgia, serif"
        fontSize="22"
        fontWeight="500"
        fill={onDark ? "var(--gold)" : "var(--ivory)"}
        style={{ fontVariationSettings: '"SOFT" 20' }}
      >
        K
      </text>
    </svg>
  );
}

/**
 * Name and mark. `tone="dark"` is for the dark header, menu and footer:
 * ivory name, gold "Elite Implant Center". `tone="light"` sits on ivory.
 */
export function BrandMark({ tone = "dark", className, compact = false }: { tone?: "light" | "dark"; className?: string; compact?: boolean }) {
  const dark = tone === "dark";
  return (
    <Link href="/" className={cn("group inline-flex shrink-0 items-center gap-2.5", className)} aria-label="Kheni Dental home">
      <KheniMonogram tone={tone} className="size-10 shrink-0" />
      <span className="leading-none">
        <span className={cn("block whitespace-nowrap font-serif text-[1.1rem] font-medium tracking-[-.01em]", dark ? "text-ivory" : "text-ink")}>
          Kheni Dental
        </span>
        <span className={cn("mt-1 block whitespace-nowrap text-[.6rem] font-semibold uppercase tracking-[.18em]", dark ? "text-gold" : "text-gold-text", compact && "hidden min-[360px]:block")}>
          Elite Implant Center
        </span>
      </span>
    </Link>
  );
}
