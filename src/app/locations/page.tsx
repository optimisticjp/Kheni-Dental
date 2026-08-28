import type { Metadata } from "next";
import { ArrowUpRight, MapPin } from "lucide-react";
import { LocationCard } from "@/components/kheni/location-card";
import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { locations } from "@/content/site";

export const metadata: Metadata = {
  title: "Kheni Dental Clinics in Surat | Swastik Plaza & Hirabaug",
  description: "Find Kheni Dental at Swastik Plaza and Hirabaug in Surat. Compare clinic details, call, WhatsApp or open each location directly in Google Maps.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero eyebrow="Visit us" title="Find your Kheni." copy="Two clinics across Surat, one approach to care. Pick the location that fits your day, then open it directly in Google Maps." />
      <Section spacing="lg">
        <Container width="7xl">
          <div className="grid gap-5 lg:grid-cols-2">{locations.map((location) => <LocationCard key={location.slug} location={location} />)}</div>
        </Container>
      </Section>
      <Section className="bg-ink text-white" spacing="lg">
        <Container width="7xl" className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Google Maps first</p><h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">When you are ready to visit, the useful button is Directions.</h2><p className="mt-5 text-sm leading-7 text-white/55">We keep the homepage light and fast rather than loading two heavy map embeds. Each clinic opens in Google Maps so you can check the route, travel time and current listing details on your phone.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {locations.map((location) => <a key={location.slug} href={location.mapsUrl} target="_blank" rel="noreferrer" data-track="directions_click" data-placement={`locations_map_${location.slug}`} className="group rounded-[1.6rem] border border-white/10 p-6 transition hover:border-gold/35 hover:bg-white/[.03]"><MapPin className="size-5 text-gold" /><p className="mt-8 text-xs uppercase tracking-[.16em] text-white/40">Open in Google Maps</p><h3 className="mt-2 font-serif text-3xl">{location.shortName}</h3><p className="mt-2 text-sm text-white/45">{location.areaLabel}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold">Directions <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" /></span></a>)}
          </div>
        </Container>
      </Section>
    </>
  );
}
