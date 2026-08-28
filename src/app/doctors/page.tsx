import type { Metadata } from "next";
import { DoctorsGrid } from "@/components/kheni/doctors-grid";
import { PageHero } from "@/components/kheni/page-hero";
import { GoogleTrustCard } from "@/components/kheni/google-trust-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Dentists at Kheni Dental Surat",
  description: "Meet Dr. Mayur Kheni, Dr. Jinal Monapara, Dr. Ishita Dobariya and Dr. Parita Vastarpara at Kheni Dental in Surat.",
};

export default function DoctorsPage() {
  return <><PageHero eyebrow="Dental team" title="Meet the people behind your care." copy="See each doctor's experience, listed area of focus and the treatments most closely connected with their profile."/><Section spacing="lg"><Container width="7xl"><DoctorsGrid /></Container></Section><Section className="bg-[#f1eee7]" spacing="lg"><Container width="7xl" className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Patient proof</p><h2 className="mt-4 font-serif text-4xl sm:text-5xl">Credentials matter. So does how patients feel in the chair.</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Use Google reviews as an independent view of the clinic experience, then meet the doctor and ask your own questions.</p></div><GoogleTrustCard placement="doctors_google" /></Container></Section></>;
}
