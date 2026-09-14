import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * The Kheni mark: a heavy K set on an arch, the mirror of the site's smile
 * window, with a butter spark at the shoulder. Drawn inline so it costs no
 * request and scales cleanly.
 */
export function KheniMonogram({ className, tone = "blue" }: { className?: string; tone?: "blue" | "butter" | "white" | "ink" }) {
  const fill = { blue: "var(--blue)", butter: "var(--butter)", white: "#ffffff", ink: "var(--ink)" }[tone];
  const k = tone === "blue" || tone === "ink" ? "#ffffff" : "var(--ink)";
  const spark = tone === "butter" ? "var(--blue)" : "var(--butter)";
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true" focusable="false">
      <path d="M22 1c11.6 0 21 9.4 21 21v14a7 7 0 0 1-7 7H8a7 7 0 0 1-7-7V22C1 10.4 10.4 1 22 1z" fill={fill} />
      <text x="22" y="32" textAnchor="middle" fontFamily="var(--font-bricolage), var(--font-inter), sans-serif" fontSize="27" fontWeight="800" letterSpacing="-1.5" fill={k}>
        K
      </text>
      <path d="M33.5 6.5l1.4 3 3 1.4-3 1.4-1.4 3-1.4-3-3-1.4 3-1.4z" fill={spark} />
    </svg>
  );
}

export function BrandMark({ tone = "light", className, compact = false }: { tone?: "light" | "dark"; className?: string; compact?: boolean }) {
  const dark = tone === "dark";
  return (
    <Link href="/" className={cn("group inline-flex shrink-0 items-center gap-2.5", className)} aria-label="Kheni Dental home">
      <KheniMonogram className="size-10 shrink-0" tone={dark ? "butter" : "blue"} />
      <span className="leading-none">
        <span className={cn("block whitespace-nowrap font-display text-[1.2rem] font-extrabold tracking-[-.04em]", dark ? "text-white" : "text-ink")}>
          Kheni Dental
        </span>
        {!compact && (
          <span className={cn("mt-1 hidden whitespace-nowrap text-[.6rem] font-bold uppercase tracking-[.16em] min-[360px]:block", dark ? "text-butter" : "text-blue-deep")}>
            Elite Implant Center · Surat
          </span>
        )}
      </span>
    </Link>
  );
}
