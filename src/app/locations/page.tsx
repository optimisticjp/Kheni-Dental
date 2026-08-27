import type { Metadata } from "next";
import { LocationCard } from "@/components/kheni/location-card";
import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { locations } from "@/content/site";

export const metadata: Metadata = { title: "Kheni Dental Locations in Surat", description: "Visit Kheni Dental in Yogi Chowk or Hirabaug, Surat. Find branch contact details, maps and directions." };
export default function LocationsPage(){return <><PageHero eyebrow="Locations" title="Two clinics in Surat. Choose the one that fits your visit." copy="Find contact details and directions for Kheni Dental in Yogi Chowk and Hirabaug."/><Section spacing="lg"><Container width="7xl"><div className="grid gap-5 lg:grid-cols-2">{locations.map(location=><LocationCard key={location.slug} location={location}/>)}</div></Container></Section></>}
