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
 * Phone: a 3x3 grid of coloured concern tiles, each a real link. One tap
 * and the patient is on the right treatment page. Nothing to expand,
 * nothing that depends on hover, nine tiles in about one screen.
 *
 * Desktop: the same tiles as a rail on the left, and the selected concern's
 * treatment shown large on the right, with its illustration and one plain
 * sentence, so the page feels alive without hijacking anything.
 *
 * It never diagnoses. The tiles point; the dentist decides.
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
      <ul className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-2 lg:content-start">
        {concerns.map((concern, index) => {
          const selected = index === active;
          return (
            <li key={concern.id} className={`hue-${concern.hue}`}>
              <Link
                href={concern.href}
                data-track="treatment_view"
                data-placement="concern_finder"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={touch}
                aria-current={selected ? "true" : undefined}
                className={cn(
                  "lift group flex min-h-[6.25rem] flex-col justify-between rounded-2xl bg-h-tint p-3 text-left ring-1 ring-transparent transition-[box-shadow,transform] sm:min-h-[7rem] sm:p-4 lg:min-h-0 lg:flex-row lg:items-center lg:gap-4 lg:py-3.5",
                  selected && "lg:bg-white lg:ring-h-fill lg:shadow-[0_18px_40px_-24px_rgba(18,34,74,.35)]",
                )}
              >
                <span className="grid size-9 place-items-center rounded-xl bg-white text-h-text sm:size-10">
                  <ConcernGlyph icon={concern.icon} className="size-5 sm:size-6" />
                </span>
                <span className="min-w-0 lg:flex-1">
                  <span className="block text-[.9375rem] font-semibold leading-tight sm:text-base">{concern.label}</span>
                  <span className="t-small mt-0.5 hidden text-ink-soft sm:block">{concern.sub}</span>
                </span>
                <ArrowRight className="cta-arrow hidden size-4 shrink-0 text-h-text lg:block" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>

      {treatment && (
        <div className={cn(`hue-${treatment.hue}`, "hidden lg:block")}>
          <div className="sticky top-24 overflow-hidden rounded-[1.75rem] bg-h-tint p-8 xl:p-10">
            <div className="grid grid-cols-[1fr_11rem] items-center gap-6">
              <div>
                <p className="t-eyebrow text-h-text">{current.label}</p>
                <p className="t-h2 mt-3">{treatment.headline}</p>
                <p className="t-body mt-4 text-ink-soft">{treatment.short}</p>
                <Link
                  href={current.href}
                  data-track="treatment_view"
                  data-placement="concern_finder_panel"
                  onClick={touch}
                  className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-h-fill px-5 text-[.9375rem] font-semibold text-h-on-fill"
                >
                  {treatment.title}
                  <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
                </Link>
              </div>
              <TreatmentArt slug={treatment.slug} className="w-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
