import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { TreatmentArt } from "@/components/kheni/art/treatment-art";
import { photoSrcSet } from "@/components/kheni/media-frame";
import { treatmentVisual } from "@/content/photos";
import type { Treatment } from "@/content/site";
import { cn, fieldClass, isDarkHue } from "@/lib/utils";

/**
 * Treatments, curated rather than catalogued.
 *
 *   TreatmentCard   a tall colour card in the treatment's mood: the
 *                   patient's sentence, the name set large, and a real
 *                   picture in a smile window at the foot. Rail on a phone,
 *                   grid from lg.
 *   TreatmentLine   an editorial list row: number, name, one sentence,
 *                   thumbnail. For the index and related lists.
 */
export function TreatmentCard({ treatment, placement, className, sizes = "(min-width: 1024px) 380px, 76vw" }: { treatment: Treatment; placement: string; className?: string; sizes?: string }) {
  const visual = treatmentVisual(treatment.slug);
  const dark = isDarkHue(treatment.hue);
  return (
    <Link href={`/treatments/${treatment.slug}/`} data-track="treatment_view" data-placement={placement} className={cn(fieldClass(treatment.hue), "zoom lift group flex h-full flex-col overflow-hidden rounded-[1.75rem]", className)}>
      <span className="flex flex-1 flex-col p-5 pb-4">
        <span className="t-eyebrow">&ldquo;{treatment.concern}&rdquo;</span>
        <span className="mt-3 block font-display text-[2rem] font-extrabold leading-[.95] tracking-[-.04em] sm:text-[2.25rem]">{treatment.title}</span>
        <span className="muted mt-3 block text-sm font-medium leading-snug">{treatment.short}</span>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">
          How it works
          <span className={cn("grid size-7 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-1", dark ? "bg-butter text-ink" : "bg-ink text-white")}>
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
        </span>
      </span>
      <span className="smile relative mx-3 mb-3 block aspect-[4/3] overflow-hidden bg-ink/10">
        {visual ? (
          // eslint-disable-next-line @next/next/no-img-element -- images are unoptimized site-wide
          <img src={visual.src} srcSet={photoSrcSet(visual.src)} sizes={sizes} alt="" loading="lazy" decoding="async" className="zoom-target absolute inset-0 size-full object-cover" style={{ objectPosition: visual.objectPosition }} />
        ) : (
          <TreatmentArt slug={treatment.slug} className="absolute inset-0 size-full" />
        )}
      </span>
    </Link>
  );
}

export function TreatmentLine({ treatment, index, placement, className }: { treatment: Treatment; index?: number; placement: string; className?: string }) {
  const visual = treatmentVisual(treatment.slug);
  return (
    <Link href={`/treatments/${treatment.slug}/`} data-track="treatment_view" data-placement={placement} className={cn(`mood-${treatment.hue} group flex min-w-0 items-center gap-3 border-b border-line py-4 sm:gap-4`, className)}>
      {typeof index === "number" && <span className="w-6 shrink-0 font-display text-sm font-extrabold text-m-text sm:w-8">{String(index + 1).padStart(2, "0")}</span>}
      <span className="smile-sm relative size-14 shrink-0 overflow-hidden bg-m-fill sm:size-20">
        {visual ? (
          // eslint-disable-next-line @next/next/no-img-element -- images are unoptimized site-wide
          <img src={visual.src} srcSet={photoSrcSet(visual.src)} sizes="80px" alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" style={{ objectPosition: visual.objectPosition }} />
        ) : (
          <TreatmentArt slug={treatment.slug} className="absolute inset-0 size-full" />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-[1.25rem] font-extrabold leading-tight tracking-[-.03em] [overflow-wrap:anywhere] sm:text-2xl">{treatment.title}</span>
        <span className="t-small mt-1 line-clamp-2 block text-ink-soft">{treatment.short}</span>
      </span>
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:translate-x-1">
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </span>
    </Link>
  );
}
