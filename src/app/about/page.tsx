import type { Metadata } from "next";
import { Award, HeartHandshake, ShieldCheck, Stethoscope } from "lucide-react";
import { PageHero } from "@/components/kheni/page-hero";
import { MediaPlaceholder } from "@/components/kheni/media-placeholder";
import { SectionHeading } from "@/components/kheni/section-heading";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = { title: "About", description: "Learn about Kheni Elite Dental & Implant Center, its care philosophy and patient experience in Surat." };

export default function AboutPage() {
  const values = [
    { icon: Stethoscope, title: "Diagnosis before procedure", copy: "Treatment recommendations should begin with appropriate assessment, not a preselected package." },
    { icon: HeartHandshake, title: "Clear communication", copy: "Explain options, limitations, expected visits and aftercare in language patients can understand." },
    { icon: ShieldCheck, title: "Responsible claims", copy: "Use verified credentials, real cases with consent and evidence-based patient information." },
    { icon: Award, title: "Specialist collaboration", copy: "Present the clinic as a coordinated team, with the appropriate clinician involved when specialist care is required." },
  ];
  return <>
    <PageHero eyebrow="About Kheni Elite" title="Premium care should feel precise, calm and personal." copy="This page is intentionally ready for the clinic’s verified history, philosophy, doctors, milestones and genuine differentiators." />
    <Section spacing="lg"><Container width="7xl"><div className="grid gap-12 lg:grid-cols-2 lg:items-center"><MediaPlaceholder label="Clinic / founder story photography" className="min-h-[34rem]"/><div><SectionHeading eyebrow="Our story" title="Replace marketing clichés with the real Kheni story." copy="Add the year founded, why the clinic exists, how it evolved into Kheni Elite, and what the doctors believe good dentistry should feel like. Keep every milestone factual and verifiable."/><div className="mt-8 rounded-2xl border border-gold/25 bg-gold/5 p-6 text-sm leading-7 text-muted-foreground">CONTENT NEEDED: verified founding story, years in practice, clinic milestones, specialist team structure, accreditations, awards, number of locations and any genuine clinical differentiators.</div></div></div></Container></Section>
    <Section className="bg-ink text-white" spacing="lg"><Container width="7xl"><SectionHeading eyebrow="Care philosophy" title="What patients should be able to expect."/><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{values.map(v=><article key={v.title} className="rounded-2xl border border-white/10 p-6"><v.icon className="size-5 text-gold"/><h2 className="mt-6 font-serif text-2xl">{v.title}</h2><p className="mt-3 text-sm leading-6 text-white/55">{v.copy}</p></article>)}</div></Container></Section>
  </>;
}
