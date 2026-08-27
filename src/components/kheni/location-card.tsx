import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Star } from "lucide-react";
import type { Location } from "@/content/site";

export function LocationCard({ location }: { location: Location }) {
  return (
    <article className="flex h-full flex-col rounded-[2rem] border border-border bg-card p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Surat clinic</p>
          <h3 className="mt-3 font-serif text-3xl">{location.shortName}</h3>
        </div>
        {location.rating && (
          <div className="rounded-2xl bg-ink px-3 py-2 text-right text-white">
            <p className="flex items-center gap-1 font-semibold text-gold"><Star className="size-4 fill-current" />{location.rating}</p>
            <p className="mt-0.5 text-[.65rem] text-white/45">{location.reviewCount} {location.reviewSource}</p>
          </div>
        )}
      </div>
      <p className="mt-5 flex gap-3 text-sm leading-6 text-muted-foreground"><MapPin className="mt-1 size-4 shrink-0 text-gold" />{location.address}</p>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{location.note}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        <a href={`tel:${location.phoneHref}`} data-track="phone_click" data-placement={`location_${location.slug}`} className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white"><Phone className="size-4 text-gold" />{location.phoneDisplay}</a>
        <a href={location.mapsUrl} target="_blank" rel="noreferrer" data-track="directions_click" data-placement={`location_${location.slug}`} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold">Directions <ArrowUpRight className="size-4" /></a>
        <Link href={`/locations/${location.slug}`} className="inline-flex items-center gap-2 px-2 py-2.5 text-sm font-semibold text-gold">Branch details <ArrowUpRight className="size-4" /></Link>
      </div>
    </article>
  );
}
