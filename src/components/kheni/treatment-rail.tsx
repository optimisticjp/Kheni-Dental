"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCallback, useId, useRef, useState } from "react";

import { TreatmentArt } from "@/components/kheni/art/treatment-art";
import { photoSrcSet } from "@/components/kheni/media-frame";
import { treatmentVisual } from "@/content/photos";
import type { Treatment } from "@/content/site";
import { pushTrackingEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

/**
 * The treatment rail: the site's one signature interaction, for lg and up.
 *
 * Six treatments stand as narrow ivory columns with their names set
 * vertically and a small tab of their own colour. The selected one opens
 * into a wide editorial panel: photograph left under a soft dark gradient,
 * the patient's concern in gold, the name in Fraunces, one plain sentence
 * and a black call to action. Hover previews, click commits, and the
 * keyboard reaches every panel with the arrow keys, Home and End.
 *
 * Accessibility: a disclosure set, not a tab set. The open panel contains
 * its content, so `aria-expanded` plus `aria-controls` describes it
 * honestly. Expansion is driven by state rather than :hover.
 *
 * Below lg the page renders TreatmentTile instead; nothing rotated on a
 * phone, nothing that depends on hover.
 */
export function TreatmentRail({ treatments, placement = "home_treatment_rail", className }: { treatments: Treatment[]; placement?: string; className?: string }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const select = useCallback((index: number) => {
    setActive(index);
    pushTrackingEvent({ event: "treatment_view", placement, interaction: "rail_select" });
  }, [placement]);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = treatments.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  };

  return (
    <div className={cn("flex h-[30rem] gap-2.5", className)}>
      {treatments.map((treatment, index) => {
        const open = index === active;
        const panelId = `${baseId}-panel-${index}`;
        const photo = treatmentVisual(treatment.slug);
        return (
          <div
            key={treatment.slug}
            className={cn(
              `hue-${treatment.hue} ease-kheni relative isolate overflow-hidden rounded-[1.4rem] border bg-white transition-[flex-grow,border-color,box-shadow] duration-700`,
              open ? "border-ink/15 shadow-[0_28px_60px_-30px_rgba(13,13,12,.45)]" : "border-line hover:border-ink/25",
            )}
            style={{ flexGrow: open ? 9 : 0.55, flexBasis: 0 }}
            onMouseEnter={() => !open && setActive(index)}
          >
            <span aria-hidden="true" className="absolute left-1/2 top-0 z-20 h-1 w-8 -translate-x-1/2 rounded-b-full bg-h-fill" />
            {/* The control stays mounted open or shut, so keyboard focus survives the expansion. */}
            <button
              type="button"
              ref={(node) => {
                buttons.current[index] = node;
              }}
              onClick={() => select(index)}
              onFocus={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              aria-expanded={open}
              aria-controls={panelId}
              className={cn(
                "absolute inset-0 z-20 flex flex-col items-center justify-between py-6 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-gold",
                open && "pointer-events-none",
              )}
            >
              <span className={cn("ease-kheni flex h-full w-full flex-col items-center justify-between transition-opacity duration-300", open ? "opacity-0" : "opacity-100")}>
                <span aria-hidden="true" className="font-serif text-[.72rem] tracking-[.1em] text-gold-text">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="rotate-180 font-serif text-[1.2rem] leading-none tracking-[-.01em] text-ink [writing-mode:vertical-rl]">{treatment.title}</span>
                <span aria-hidden="true" className="h-8 w-px bg-gradient-to-b from-gold/70 to-transparent" />
              </span>
              {open && <span className="sr-only">{treatment.title}</span>}
            </button>

            <div id={panelId} className={cn("ease-kheni h-full transition-opacity duration-500", open ? "opacity-100 delay-150" : "pointer-events-none opacity-0")} inert={!open}>
              {open && (
                <div className="grid h-full grid-cols-[1fr_1fr]">
                  <div className="rail-media relative m-2.5 overflow-hidden rounded-[1.05rem] bg-h-tint">
                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element -- images are unoptimized site-wide
                      <img src={photo.src} srcSet={photoSrcSet(photo.src)} sizes="40vw" alt={photo.alt} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" style={{ objectPosition: photo.objectPosition }} />
                    ) : (
                      <TreatmentArt slug={treatment.slug} className="absolute inset-0 size-full" />
                    )}
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 font-serif text-[.72rem] tracking-[.1em] text-gold">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="flex flex-col p-8 xl:p-10">
                    <p className="t-eyebrow flex items-center gap-3 text-gold-text">
                      {treatment.category}
                      <span aria-hidden="true" className="rule-gold h-px w-12" />
                    </p>
                    <p className="mt-6 max-w-md font-serif text-[1.35rem] italic leading-snug text-gold-text [font-variation-settings:'SOFT'_40,'WONK'_1]">&ldquo;{treatment.concern}&rdquo;</p>
                    <h3 className="t-h1 mt-3 text-ink">{treatment.title}</h3>
                    <p className="t-body mt-4 max-w-md text-ink-soft">{treatment.short}</p>
                    <div className="mt-auto pt-6">
                      <Link
                        href={`/treatments/${treatment.slug}/`}
                        data-track="treatment_view"
                        data-placement={placement}
                        className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-5 text-[.9375rem] font-semibold text-ivory hover:bg-ink-3"
                      >
                        How {treatment.title.toLowerCase()} works
                        <ArrowRight className="cta-arrow size-4 text-gold" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
