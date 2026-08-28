import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { GoogleTrustCard } from "@/components/kheni/google-trust-card";
import { MediaPlaceholder } from "@/components/kheni/media-placeholder";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { locations } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const location = locations.find((item) => item.slug === slug);
  if (!location) return {};
  return {
    title: `Kheni Dental ${location.shortName} | Dentist in Surat`,
    description: `Visit Kheni Dental at ${location.shortName}, ${location.areaLabel}. Find the address, phone, WhatsApp, clinic hours and Google Maps directions.`,
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locations.find((item) => item.slug === slug);
  if (!location) notFound();
  const message = `Hello Kheni Dental, I would like to book an appointment at ${location.shortName}. Please share the available options.`;

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute -right-32 top-10 size-[30rem] rounded-full bg-gold/10 blur-3xl" />
        <Container width="7xl" className="relative grid min-h-[66vh] items-center gap-12 py-16 lg:grid-cols-[1fr_.9fr] lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-gold">Kheni Dental · Surat</p>
            <h1 className="mt-5 font-serif text-5xl leading-[.95] tracking-[-.04em] sm:text-6xl">{location.shortName}</h1>
            <p className="mt-3 text-sm uppercase tracking-[.14em] text-white/38">{location.areaLabel}</p>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">{location.note}</p>
            {location.rating && (
              <a href={location.googleProfileUrl} target="_blank" rel="noreferrer" data-track="review_click" data-placement={`location_hero_${location.slug}`} data-branch={location.slug} className="mt-6 inline-flex items-center gap-3 rounded-full border border-gold/20 px-4 py-2 text-sm">
                <Star className="size-4 fill-current text-gold" /><strong>{location.rating}</strong><span className="text-white/50">{location.reviewCount} Google reviews</span><ArrowUpRight className="size-4 text-gold" />
              </a>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsappUrl(message, location.whatsappNumber)} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement={`location_hero_${location.slug}`} data-branch={location.slug} className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink"><MessageCircle className="size-4" />WhatsApp clinic</a>
              <a href={location.mapsUrl} target="_blank" rel="noreferrer" data-track="directions_click" data-placement={`location_hero_${location.slug}`} data-branch={location.slug} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold">Open Google Maps <ArrowUpRight className="size-4" /></a>
            </div>
          </div>
          <div className="relative">
            <MediaPlaceholder label={`${location.shortName} clinic exterior and interior`} className="min-h-[30rem]" />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-ink/92 p-4 backdrop-blur">
              <p className="flex items-center gap-2 text-sm text-white/70"><MapPin className="size-4 shrink-0 text-gold" />{location.address}</p>
            </div>
          </div>
        </Container>
      </section>

      <Section spacing="lg">
        <Container width="7xl">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6"><MapPin className="size-5 text-gold" /><h2 className="mt-4 font-serif text-2xl">Address</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{location.address}</p><a href={location.mapsUrl} target="_blank" rel="noreferrer" data-track="directions_click" data-placement={`location_details_${location.slug}`} data-branch={location.slug} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold">Directions <ArrowUpRight className="size-4" /></a></div>
            <a href={`tel:${location.phoneHref}`} data-track="phone_click" data-placement={`location_details_${location.slug}`} data-branch={location.slug} className="rounded-2xl border border-border bg-card p-6"><Phone className="size-5 text-gold" /><h2 className="mt-4 font-serif text-2xl">Call</h2><p className="mt-3 text-sm text-muted-foreground">{location.phoneDisplay}</p><p className="mt-5 text-xs text-muted-foreground">Tap to call this clinic directly.</p></a>
            <div className="rounded-2xl border border-border bg-card p-6"><Clock className="size-5 text-gold" /><h2 className="mt-4 font-serif text-2xl">Visiting hours</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{location.hours}</p>{location.hoursNote && <p className="mt-3 text-xs leading-5 text-muted-foreground">{location.hoursNote}</p>}</div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f1eee7]" spacing="lg">
        <Container width="7xl">
          {location.rating ? (
            <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Patient proof</p><h2 className="mt-4 font-serif text-4xl sm:text-5xl">Check what patients say before you visit.</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">The rating belongs to this clinic&apos;s established Google profile. Open Google to read the full reviews directly.</p></div><GoogleTrustCard placement={`location_google_${location.slug}`} /></div>
          ) : (
            <div className="rounded-[2rem] bg-ink p-8 text-white sm:p-10"><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Google profile</p><h2 className="mt-4 font-serif text-4xl">Check this clinic on Google before you travel.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/55">We keep branch ratings separate. Open the Hirabaug profile to check current listing details and directions at the source.</p><a href={location.googleProfileUrl} target="_blank" rel="noreferrer" data-track="review_click" data-placement={`location_google_${location.slug}`} data-branch={location.slug} className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink">View on Google <ArrowUpRight className="size-4" /></a></div>
          )}
        </Container>
      </Section>
    </>
  );
}
