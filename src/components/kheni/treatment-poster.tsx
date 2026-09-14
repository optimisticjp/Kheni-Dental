import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { TreatmentArt } from "@/components/kheni/art/treatment-art";
import { MediaFrame, photoSrcSet } from "@/components/kheni/media-frame";
import { treatmentVisual } from "@/content/photos";
import type { Treatment } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * A treatment as an editorial card: a large photograph (or its drawing on
 * a soft field), a gold eyebrow with the patient's concern, the name in
 * Fraunces, one plain sentence, and a thin tab of the treatment's own
 * colour along the top edge. White body, black type. Two sizes:
 *
 *   featured   wider, photograph beside the text. For the first card.
 *   standard   compact, photograph above.
 *
 * A real clinic photograph replaces the drawing by passing `photo`.
 */
export function TreatmentPoster({
  treatment,
  featured = false,
  placement,
  photo: photoOverride,
  className,
}: {
  treatment: Treatment;
  featured?: boolean;
  placement: string;
  photo?: { src: string; alt: string; objectPosition?: string };
  className?: string;
}) {
  const photo = photoOverride ?? treatmentVisual(treatment.slug);
  return (
    <Link
      href={`/treatments/${treatment.slug}/`}
      data-track="treatment_view"
      data-placement={placement}
      className={cn(
        `hue-${treatment.hue} lift group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white`,
        featured && "sm:col-span-2 sm:flex-row lg:col-span-3",
        className,
      )}
    >
      <span aria-hidden="true" className="absolute left-6 top-0 z-10 h-1 w-10 rounded-b-full bg-h-fill" />
      <MediaFrame
        src={photo?.src}
        alt={photo?.alt}
        objectPosition={photo?.objectPosition}
        ratio={featured ? "4 / 3" : "16 / 10"}
        mobileRatio="16 / 10"
        className={cn("rounded-none", featured && "sm:w-[46%] sm:shrink-0 lg:w-[40%]")}
      >
        <span className="absolute inset-0 bg-h-tint">
          <TreatmentArt slug={treatment.slug} className="size-full" />
        </span>
      </MediaFrame>
      <div className={cn("flex flex-1 flex-col p-4 sm:p-5", featured && "sm:justify-center sm:p-7")}>
        <p className="t-eyebrow text-gold-text">{treatment.concern}</p>
        <h3 className={cn("mt-2 font-serif leading-tight tracking-[-.02em]", featured ? "t-h2" : "text-[1.35rem] font-medium")}>{treatment.title}</h3>
        <p className="t-small mt-2 text-ink-soft">{treatment.short}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-ink">
          {featured ? "Learn how it works" : "How it works"}
          <ArrowRight className="cta-arrow size-4 text-gold-text" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

/** Compact row for a phone: thumbnail, name, one line. */
export function TreatmentRow({ treatment, placement }: { treatment: Treatment; placement: string }) {
  const photo = treatmentVisual(treatment.slug);
  return (
    <Link
      href={`/treatments/${treatment.slug}/`}
      data-track="treatment_view"
      data-placement={placement}
      className={`hue-${treatment.hue} flex min-h-[4.5rem] items-center gap-3.5 rounded-2xl border border-line bg-white p-2.5 pr-4`}
    >
      <span className="relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-h-tint">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- images are unoptimized site-wide
          <img src={photo.src} srcSet={photoSrcSet(photo.src)} sizes="56px" alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" style={{ objectPosition: photo.objectPosition }} />
        ) : (
          <TreatmentArt slug={treatment.slug} className="size-12" />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold leading-tight">{treatment.title}</span>
        <span className="t-small mt-0.5 line-clamp-2 text-ink-soft">{treatment.short}</span>
      </span>
      <ArrowRight className="size-4 shrink-0 text-gold-text" aria-hidden="true" />
    </Link>
  );
}

/**
 * Compact editorial tile for a phone grid: the photograph with a dark
 * gradient, the name set on it in ivory, the concern beneath in gold.
 * Two per row; the first may span both columns as a wide tile.
 */
export function TreatmentTile({ treatment, placement, wide = false }: { treatment: Treatment; placement: string; wide?: boolean }) {
  const photo = treatmentVisual(treatment.slug);
  return (
    <Link
      href={`/treatments/${treatment.slug}/`}
      data-track="treatment_view"
      data-placement={placement}
      className={cn(`hue-${treatment.hue} lift relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white`, wide && "col-span-2")}
    >
      <span aria-hidden="true" className="absolute left-4 top-0 z-10 h-1 w-8 rounded-b-full bg-h-fill" />
      <span className={cn("relative block w-full overflow-hidden bg-h-tint", wide ? "aspect-[2/1]" : "aspect-[4/3]")}>
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- images are unoptimized site-wide
          <img src={photo.src} srcSet={photoSrcSet(photo.src)} sizes={wide ? "100vw" : "50vw"} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" style={{ objectPosition: photo.objectPosition }} />
        ) : (
          <TreatmentArt slug={treatment.slug} className="absolute inset-0 size-full" />
        )}
      </span>
      <span className="flex min-w-0 flex-1 flex-col p-3">
        {wide && <span className="t-eyebrow text-gold-text">{treatment.concern}</span>}
        <span className={cn("block font-serif text-[1.1rem] font-medium leading-tight tracking-[-.015em]", wide && "mt-1.5")}>{treatment.title}</span>
        {wide ? (
          <span className="t-small mt-1 line-clamp-2 text-ink-soft">{treatment.short}</span>
        ) : (
          <span className="mt-1.5 inline-flex items-center gap-1 text-[.78rem] font-semibold text-gold-text">
            How it works
            <ArrowRight className="size-3" aria-hidden="true" />
          </span>
        )}
      </span>
    </Link>
  );
}
