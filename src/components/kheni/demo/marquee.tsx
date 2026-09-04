import { Sparkle } from "lucide-react";

import { demoMarqueeClaims } from "@/content/demo";
import { cn } from "@/lib/utils";

/**
 * The claim marquee.
 *
 * A single CSS animation on a duplicated track, so it loops seamlessly with
 * no JavaScript. The duplicate is `aria-hidden` and the whole strip is one
 * list to a screen reader. It stops entirely under `prefers-reduced-motion`,
 * where it becomes a static wrapped row.
 *
 * Every claim in it is invented.
 */
export function ClaimMarquee({ claims = demoMarqueeClaims, className, tone = "dark" }: { claims?: string[]; className?: string; tone?: "dark" | "sunshine" }) {
  const track = (
    <ul className="marquee-track">
      {claims.map((claim) => (
        <li key={claim} className="flex items-center gap-2.5 whitespace-nowrap px-4 text-[.875rem] font-semibold uppercase tracking-[.08em] sm:px-6 sm:text-[.9375rem]">
          <Sparkle className="size-3.5 shrink-0 fill-current opacity-70" aria-hidden="true" />
          {claim}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("marquee relative isolate overflow-hidden py-3 sm:py-3.5", tone === "dark" ? "bg-ink text-white" : "bg-sunshine text-ink", className)}>
      <div className="marquee-rail flex" aria-label="Clinic claims">
        {track}
        <div aria-hidden="true" className="marquee-clone flex">{track}</div>
      </div>
    </div>
  );
}
