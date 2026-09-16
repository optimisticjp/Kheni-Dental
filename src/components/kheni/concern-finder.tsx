"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { ConcernGlyph, TreatmentArt } from "@/components/kheni/art/treatment-art";
import { concerns, treatments } from "@/content/site";
import { pushTrackingEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

/**
 * "What brings you in today?"
 *
 * Sits on a soft mint field. Phone: a 3x3 grid of white cards, each a real
 * link, with a black line icon and the concern in plain words. Nothing to
 * expand, nothing that depends on hover, nine cards in about one screen.
 *
 * Desktop: the same cards as a two-column list on the left and the
 * selected concern's treatment on the right, in a white panel with a gold
 * eyebrow, so the section feels alive without hijacking anything.
 *
 * It never diagnoses. The cards point; the dentist decides.
 *
 * Privacy: the tracking event records only that the finder was used, never
 * which concern, because a concern can describe the visitor's own mouth.
 */
export function ConcernFinder() {
  const [active, setActive] = useState(0);
  const current = concerns[active];
  const treatment = treatments.find((t) => `/treatments/${t.slug}/` === current.href);

  const touch = () => pushTrackingEvent({ event: "concern_interaction", placement: "concern_finder", interaction: "select" });

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8 xl:gap-12">
      {/* Three across held at every width below lg, which squeezed "A broken
          tooth" and its subtitle into roughly 100px on a small phone. The
          count now follows the space: one column on the narrowest phones,
          two once there is room for the subtitle to breathe, three on a
          tablet, and back to two inside the narrower column at lg. */}
      <ul className="grid grid-cols-1 gap-2 min-[400px]:grid-cols-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-2 lg:content-start">
        {concerns.map((concern, index) => {
          const selected = index === active;
          return (
            <li key={concern.id}>
              <Link
                href={concern.href}
                data-track="treatment_view"
                data-placement="concern_finder"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={touch}
                aria-current={selected ? "true" : undefined}
                className={cn(
                  "lift group flex min-h-[6.25rem] flex-col justify-between rounded-2xl border border-ink/[.06] bg-white p-3 text-left transition-[box-shadow,transform,border-color] sm:min-h-[7rem] sm:p-4 lg:min-h-0 lg:flex-row lg:items-center lg:gap-4 lg:py-3.5",
                  selected && "lg:border-gold lg:shadow-[0_18px_40px_-24px_rgba(13,13,12,.35)]",
                )}
              >
                <span className={cn("grid size-9 place-items-center rounded-full border text-ink sm:size-10", selected ? "border-gold bg-gold-tint" : "border-ink/15 bg-ivory")}>
                  <ConcernGlyph icon={concern.icon} className="size-5" />
                </span>
                <span className="min-w-0 lg:flex-1">
                  <span className="block text-[.9375rem] font-semibold leading-tight sm:text-base">{concern.label}</span>
                  <span className="t-small mt-0.5 hidden text-ink-soft sm:block">{concern.sub}</span>
                </span>
                <ArrowRight className={cn("cta-arrow hidden size-4 shrink-0 lg:block", selected ? "text-gold-text" : "text-ink/40")} aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>

      {treatment && (
        <div className={cn(`hue-${treatment.hue}`, "hidden lg:block")}>
          <div className="sticky top-24 overflow-hidden rounded-[1.5rem] border border-ink/[.06] bg-white p-8 xl:p-10">
            <div className="grid grid-cols-[1fr_11rem] items-center gap-6">
              <div>
                <p className="t-eyebrow text-gold-text">{current.label}</p>
                <p className="t-h2 mt-3">{treatment.headline}</p>
                <p className="t-body mt-4 text-ink-soft">{treatment.short}</p>
                <Link
                  href={current.href}
                  data-track="treatment_view"
                  data-placement="concern_finder_panel"
                  onClick={touch}
                  className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-5 text-[.9375rem] font-semibold text-ivory hover:bg-ink-3"
                >
                  {treatment.title}
                  <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="rounded-2xl bg-h-tint p-3">
                <TreatmentArt slug={treatment.slug} className="w-full" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
