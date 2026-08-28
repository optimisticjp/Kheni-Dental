import type { Metadata } from "next";
import { locations } from "@/content/site";
import { DoctorsGrid } from "@/components/kheni/doctors-grid";
import { PageHero } from "@/components/kheni/page-hero";
import { BranchGoogleCard } from "@/components/kheni/branch-google-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Meet Our Dentists in Surat",
  description: "Dr. Mayur Kheni, Dr. Jinal Monapara, Dr. Ishita Dobariya and Dr. Parita Vastarpara. See each dentist's degree, years of experience and areas of work in Surat.",
};

export default function DoctorsPage() {
  return <><PageHero eyebrow="Dental team" title="Know who is treating you before you sit down." copy="Four dentists across two clinics in Surat, led by Dr. Mayur Kheni."/><Section spacing="lg"><Container width="7xl"><DoctorsGrid /></Container></Section><Section className="bg-[#f1eee7]" spacing="lg"><Container width="7xl" className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">From Google</p><h2 className="mt-4 font-serif text-4xl sm:text-5xl">What patients say about our clinics.</h2></div><div className="grid gap-4 sm:grid-cols-2">{locations.map((location) => <BranchGoogleCard key={location.slug} location={location} placement={`doctors_google_${location.slug}`} />)}</div></Container></Section></>;
}
