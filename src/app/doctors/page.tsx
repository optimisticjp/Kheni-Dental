import type { Metadata } from "next";
import { DoctorsGrid } from "@/components/kheni/doctors-grid";
import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Dentists at Kheni Dental Surat",
  description: "Meet Dr. Mayur Kheni, Dr. Jinal Monapara, Dr. Ishita Dobariya and Dr. Parita Vastarpara at Kheni Dental in Surat.",
};

export default function DoctorsPage() {
  return <><PageHero eyebrow="Dental team" title="Meet the people behind your care." copy="See each doctor's verified experience, listed area of focus and the treatments most closely connected with their profile."/><Section spacing="lg"><Container width="7xl"><DoctorsGrid /></Container></Section></>;
}
