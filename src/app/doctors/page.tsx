import type { Metadata } from "next";
import { DoctorsGrid } from "@/components/kheni/doctors-grid";
import { PageHero } from "@/components/kheni/page-hero";
import { GoogleTrustCard } from "@/components/kheni/google-trust-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Meet Our Dentists in Surat",
  description: "Dr. Mayur Kheni, Dr. Jinal Monapara, Dr. Ishita Dobariya and Dr. Parita Vastarpara. See each dentist's degree, years of experience and areas of work in Surat.",
};

export default function DoctorsPage() {
  return <><PageHero eyebrow="Dental team" title="Know who is treating you before you sit down." copy="Dr. Mayur Kheni leads the practice and three colleagues work alongside him. Each profile lists the degree, the years of experience and the areas of care that doctor covers."/><Section spacing="lg"><Container width="7xl"><DoctorsGrid /></Container></Section><Section className="bg-[#f1eee7]" spacing="lg"><Container width="7xl" className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">From Google</p><h2 className="mt-4 font-serif text-4xl sm:text-5xl">A degree explains the training, not the appointment.</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Patients describe the appointments on Google. Read a few there, then come and ask the doctor whatever is still on your mind.</p></div><GoogleTrustCard placement="doctors_google" /></Container></Section></>;
}
