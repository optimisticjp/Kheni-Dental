import type { Metadata } from "next";
import { HeartPulse, ScanSearch, ShieldCheck, Sparkles } from "lucide-react";
import { MediaPlaceholder } from "@/components/kheni/media-placeholder";
import { PageHero } from "@/components/kheni/page-hero";
import { SectionHeading } from "@/components/kheni/section-heading";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Clinic Experience & Dental Technology | Kheni Dental",
  description: "See how Kheni Dental approaches diagnosis, treatment planning, patient comfort and clinic spaces across Surat.",
};

const principles = [
  { icon: ScanSearch, title: "Diagnosis before decisions", copy: "Imaging and diagnostic tools are useful when they answer a clinical question. The dentist will explain what is needed for your case and why." },
  { icon: ShieldCheck, title: "Hygiene that feels visible", copy: "Patients should feel comfortable asking how instruments, treatment rooms and clinical workflows are managed between appointments." },
  { icon: HeartPulse, title: "Technology with a purpose", copy: "Equipment matters when it improves diagnosis, planning, comfort or communication. The patient benefit matters more than the model name." },
  { icon: Sparkles, title: "A clinic that feels calm", copy: "Clear spaces, thoughtful communication and a team that explains what comes next can make a dental visit feel much easier." },
];

export default function ClinicTechnologyPage() {
  return (
    <>
      <PageHero eyebrow="Clinic experience" title="Good technology should make care clearer, not more complicated." copy="The goal is simple: understand the problem well, plan responsibly and help you feel informed throughout the visit." />
      <Section spacing="lg">
        <Container width="7xl">
          <div className="grid gap-5 md:grid-cols-2">{principles.map(({ icon: Icon, title, copy }) => <article key={title} className="rounded-[2rem] border border-border bg-card p-7"><Icon className="size-5 text-gold" /><h2 className="mt-5 font-serif text-3xl">{title}</h2><p className="mt-4 text-sm leading-6 text-muted-foreground">{copy}</p></article>)}</div>
        </Container>
      </Section>
      <Section className="bg-ink text-white" spacing="lg">
        <Container width="7xl">
          <SectionHeading eyebrow="Inside Kheni Dental" title="See the spaces before you visit." copy="Real clinic photography will show the exterior, reception and treatment spaces at both Surat locations." />
          <div className="mt-10 grid gap-5 md:grid-cols-2"><MediaPlaceholder label="Swastik Plaza clinic" className="min-h-[28rem]" /><MediaPlaceholder label="Hirabaug clinic" className="min-h-[28rem]" /></div>
        </Container>
      </Section>
    </>
  );
}
