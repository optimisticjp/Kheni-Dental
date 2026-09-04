import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * The Kheni mark: a cobalt roundel carrying a serif K, with a small sunshine
 * spark. Drawn inline so it costs no request and scales cleanly.
 */
export function KheniMonogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <circle cx="20" cy="20" r="20" fill="var(--cobalt)" />
      <text
        x="20"
        y="27.5"
        textAnchor="middle"
        fontFamily="var(--font-fraunces), Georgia, serif"
        fontSize="24"
        fontWeight="600"
        fill="#ffffff"
        style={{ fontVariationSettings: '"SOFT" 60' }}
      >
        K
      </text>
      <path d="M31 6.5l1.1 2.4 2.4 1.1-2.4 1.1L31 13.5l-1.1-2.4-2.4-1.1 2.4-1.1z" fill="var(--sunshine)" />
    </svg>
  );
}

export function BrandMark({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <Link href="/" className={cn("group inline-flex shrink-0 items-center gap-2.5", className)} aria-label="Kheni Dental home">
      <KheniMonogram className="size-10 shrink-0" />
      <span className="leading-none">
        <span className={cn("block whitespace-nowrap font-serif text-[1.15rem] font-semibold tracking-[-.02em]", dark ? "text-white" : "text-ink")}>
          Kheni Dental
        </span>
        <span className={cn("mt-1 block whitespace-nowrap text-[.62rem] font-bold uppercase tracking-[.16em]", dark ? "text-gold-soft" : "text-gold-text")}>
          Elite Implant Center
        </span>
      </span>
    </Link>
  );
}
