import type { Metadata } from "next";
import { DoctorsGrid } from "@/components/kheni/doctors-grid";
import { PageHero } from "@/components/kheni/page-hero";
import { SectionHeading } from "@/components/kheni/section-heading";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = { title: "Doctors & Specialists", description: "Meet the doctors and specialists at Kheni Elite Dental & Implant Center in Surat." };
export default function DoctorsPage(){return <><PageHero eyebrow="Doctors & specialists" title="Know who is responsible for your care." copy="A credential-forward profile system built around verified qualifications, clinical focus and real professional photography."/><Section spacing="lg"><Container width="7xl"><SectionHeading eyebrow="Clinical team" title="Expertise should be easy to understand." copy="Replace all placeholders with doctor-approved profiles. Avoid unsupported “best dentist” claims and vague credential badges."/><div className="mt-12"><DoctorsGrid /></div></Container></Section></>}
