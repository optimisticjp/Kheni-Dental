import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import type { Location } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export function LocationCard({ location }: { location: Location }) {
  const message = `Hello Kheni Dental, I would like to ask about an appointment at ${location.shortName}.`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card">
      <div className="relative min-h-52 overflow-hidden bg-ink p-6 text-white sm:p-8">
        <div className="map-grid absolute inset-0 opacity-20" aria-hidden="true" /><div className="absolute -right-20 -top-20 size-64 rounded-full bg-gold/12 blur-3xl" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Kheni Dental · Surat</p>
            <h3 className="mt-3 font-serif text-4xl">{location.shortName}</h3>
            <p className="mt-2 text-sm text-white/48">{location.areaLabel}</p>
          </div>
          {location.rating ? (
            <a href={location.googleProfileUrl} target="_blank" rel="noreferrer" data-track="review_click" data-placement={`location_${location.slug}_rating`} data-branch={location.slug} className="shrink-0 rounded-2xl border border-gold/20 bg-gold/[.07] px-3 py-2.5 text-right transition hover:bg-gold/[.12]">
              <p className="flex items-center justify-end gap-1 font-semibold text-gold"><Star className="size-4 fill-current" />{location.rating}</p>
              <p className="mt-1 text-[.62rem] uppercase tracking-[.12em] text-white/45">{location.reviewSource}</p>
            </a>
          ) : (
            <a href={location.googleProfileUrl} target="_blank" rel="noreferrer" data-track="review_click" data-placement={`location_${location.slug}_google`} data-branch={location.slug} className="shrink-0 rounded-full border border-white/12 px-3 py-2 text-[.68rem] font-semibold uppercase tracking-[.12em] text-white/65 hover:border-gold/40 hover:text-gold">View on Google</a>
          )}
        </div>
        <div className="relative mt-8 inline-flex items-center gap-2 text-sm text-white/60"><MapPin className="size-4 text-gold" />Open directions in Google Maps</div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="text-sm leading-6 text-muted-foreground">{location.note}</p>
        <p className="mt-5 flex gap-3 text-sm leading-6 text-muted-foreground"><MapPin className="mt-1 size-4 shrink-0 text-gold" />{location.address}</p>
        <p className="mt-4 flex gap-3 text-sm leading-6 text-muted-foreground"><Clock3 className="mt-1 size-4 shrink-0 text-gold" />{location.hours}</p>

        {location.rating && (
          <a href={location.googleProfileUrl} target="_blank" rel="noreferrer" data-track="review_click" data-placement={`location_${location.slug}_reviews`} data-branch={location.slug} className="mt-6 flex items-center justify-between rounded-2xl bg-[#f1eee7] px-4 py-3 text-sm">
            <span><strong>{location.reviewCount}</strong> patient reviews on Google</span>
            <ArrowUpRight className="size-4 text-gold" />
          </a>
        )}

        <div className="mt-auto grid grid-cols-2 gap-2 pt-6 sm:grid-cols-4">
          <a href={`tel:${location.phoneHref}`} data-track="phone_click" data-placement={`location_${location.slug}`} data-branch={location.slug} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink px-3 text-xs font-semibold text-white"><Phone className="size-3.5 text-gold" />Call</a>
          <a href={whatsappUrl(message, location.whatsappNumber)} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement={`location_${location.slug}`} data-branch={location.slug} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-3 text-xs font-semibold"><MessageCircle className="size-3.5 text-gold" />WhatsApp</a>
          <a href={location.mapsUrl} target="_blank" rel="noreferrer" data-track="directions_click" data-placement={`location_${location.slug}`} data-branch={location.slug} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-3 text-xs font-semibold">Directions <ArrowUpRight className="size-3.5" /></a>
          <Link href={`/locations/${location.slug}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-3 text-xs font-semibold text-gold">Clinic details</Link>
        </div>
      </div>
    </article>
  );
}
