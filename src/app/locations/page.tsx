import type { Metadata } from "next";
import { ArrowUpRight, MapPin } from "lucide-react";
import { LocationCard } from "@/components/kheni/location-card";
import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { locations } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Two Clinics in Surat",
  description: "Kheni Dental has two clinics in Surat, at Swastik Plaza in Yogi Chowk and at Hirabaug on Varachha Main Road. Get the address, phone and directions.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero eyebrow="Our two Surat clinics" title="Find your Kheni." copy="Both clinics belong to the same practice, so pick whichever is easier to reach on the day. Each card below has the address, the number for that branch and a map link that opens on your phone." />
      <Section spacing="lg">
        <Container width="7xl">
          <div className="grid gap-5 lg:grid-cols-2">{locations.map((location) => <LocationCard key={location.slug} location={location} />)}</div>
        </Container>
      </Section>
      <Section className="bg-ink text-white" spacing="lg">
        <Container width="7xl" className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Getting here</p><h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Open the map before you leave the house.</h2><p className="mt-5 text-sm leading-7 text-white/55">We link straight out to Google Maps instead of loading a heavy map on this page, so the site stays quick on mobile data. Tap a clinic and you get the live route, the travel time from wherever you are and the current listing details.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {locations.map((location) => <a key={location.slug} href={location.mapsUrl} target="_blank" rel="noreferrer" data-track="directions_click" data-placement={`locations_map_${location.slug}`} className="group rounded-[1.6rem] border border-white/10 p-6 transition hover:border-gold/35 hover:bg-white/[.03]"><MapPin className="size-5 text-gold" /><p className="mt-8 text-xs uppercase tracking-[.16em] text-white/40">Open in Google Maps</p><h3 className="mt-2 font-serif text-3xl">{location.shortName}</h3><p className="mt-2 text-sm text-white/45">{location.areaLabel}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold">Directions <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" /></span></a>)}
          </div>
        </Container>
      </Section>
    </>
  );
}
