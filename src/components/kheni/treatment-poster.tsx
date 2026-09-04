import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { TreatmentArt } from "@/components/kheni/art/treatment-art";
import { MediaFrame } from "@/components/kheni/media-frame";
import type { Treatment } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * A treatment as a poster: its illustration on a tinted field, its name, one
 * plain sentence and a link. Two sizes:
 *
 *   featured   taller, illustration large. For the first card of a grid.
 *   standard   compact. Six of these fit two screens on a phone.
 *
 * A real clinic photograph replaces the illustration by passing `photo`.
 */
export function TreatmentPoster({
  treatment,
  featured = false,
  placement,
  photo,
  className,
}: {
  treatment: Treatment;
  featured?: boolean;
  placement: string;
  photo?: { src: string; alt: string; objectPosition?: string };
  className?: string;
}) {
  return (
    <Link
      href={`/treatments/${treatment.slug}/`}
      data-track="treatment_view"
      data-placement={placement}
      className={cn(
        `hue-${treatment.hue} lift group flex flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white`,
        featured && "sm:col-span-2 sm:flex-row lg:col-span-3",
        className,
      )}
    >
      <MediaFrame
        src={photo?.src}
        alt={photo?.alt}
        objectPosition={photo?.objectPosition}
        ratio={featured ? "4 / 3" : "16 / 10"}
        mobileRatio={featured ? "16 / 10" : "16 / 10"}
        className={cn("rounded-none", featured && "sm:w-[46%] sm:shrink-0 lg:w-[38%]")}
      >
        <TreatmentArt slug={treatment.slug} className="size-full" />
      </MediaFrame>
      <div className={cn("flex flex-1 flex-col p-4 sm:p-5", featured && "sm:justify-center sm:p-7")}>
        <p className="t-eyebrow text-h-text">{treatment.concern}</p>
        <h3 className={cn("mt-2 font-serif font-medium leading-tight tracking-[-.02em]", featured ? "t-h2" : "text-[1.35rem]")}>{treatment.title}</h3>
        <p className="t-small mt-2 text-ink-soft">{treatment.short}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-h-text">
          {featured ? "Learn how it works" : "How it works"}
          <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

/** Compact row for a phone: illustration thumbnail, name, one line. */
export function TreatmentRow({ treatment, placement }: { treatment: Treatment; placement: string }) {
  return (
    <Link
      href={`/treatments/${treatment.slug}/`}
      data-track="treatment_view"
      data-placement={placement}
      className={`hue-${treatment.hue} flex min-h-[4.5rem] items-center gap-3.5 rounded-2xl border border-line bg-white p-2.5 pr-4`}
    >
      <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-h-tint">
        <TreatmentArt slug={treatment.slug} className="size-12" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold leading-tight">{treatment.title}</span>
        <span className="t-small mt-0.5 line-clamp-2 text-ink-soft">{treatment.short}</span>
      </span>
      <ArrowRight className="size-4 shrink-0 text-h-text" aria-hidden="true" />
    </Link>
  );
}

/**
 * Compact tile for a phone grid: illustration, name, the patient's sentence.
 * Two per row; the first may span both columns as a wide tile.
 */
export function TreatmentTile({ treatment, placement, wide = false }: { treatment: Treatment; placement: string; wide?: boolean }) {
  return (
    <Link
      href={`/treatments/${treatment.slug}/`}
      data-track="treatment_view"
      data-placement={placement}
      className={cn(`hue-${treatment.hue} lift flex overflow-hidden rounded-2xl border border-line bg-white`, wide ? "col-span-2 flex-row items-stretch" : "flex-col")}
    >
      <span className={cn("relative block shrink-0 overflow-hidden bg-h-tint", wide ? "w-[38%]" : "aspect-[16/10] w-full")}>
        <TreatmentArt slug={treatment.slug} className="absolute inset-0 size-full" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col justify-center p-3">
        <span className="block font-serif text-[1.05rem] font-medium leading-tight tracking-[-.015em]">{treatment.title}</span>
        <span className="t-small mt-1 line-clamp-2 text-ink-soft">{wide ? treatment.short : treatment.concern}</span>
        <span className="mt-2 inline-flex items-center gap-1 text-[.8rem] font-semibold text-h-text">
          How it works
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}
