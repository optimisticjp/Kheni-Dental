import type { Metadata } from "next";
import { HeartPulse, ScanSearch, ShieldCheck, Sparkles } from "lucide-react";
import { MediaPlaceholder } from "@/components/kheni/media-placeholder";
import { PageHero } from "@/components/kheni/page-hero";
import { SectionHeading } from "@/components/kheni/section-heading";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Clinic Experience & Technology",
  description: "How Kheni Dental in Surat approaches diagnosis, treatment planning, hygiene and everyday patient comfort, and what that means for the visit you actually have.",
};

const principles = [
  { icon: ScanSearch, title: "Look properly before deciding", copy: "Imaging and other checks are worth doing when there is a question they can answer, not as routine. A clearer view of the roots, the bone and the bite is what lets the dentist explain why a tooth is behaving the way it is and what the sensible choices are. If something is suggested for your case, ask what it will show." },
  { icon: ShieldCheck, title: "Cleanliness you can ask about", copy: "How instruments are cleaned and how a room is prepared between patients is not a secret, and you should never feel awkward asking. Ask at reception, or ask the dentist while you are in the chair. It is a fair question and it deserves a proper answer." },
  { icon: HeartPulse, title: "Shown, not just described", copy: "It is easier to decide about a tooth you have actually looked at. Where images or records exist for your case, ask to see them and ask what you are looking at. The model name of a machine helps nobody. Understanding your own mouth helps a great deal." },
  { icon: Sparkles, title: "Knowing what comes next", copy: "A lot of what makes a dental visit hard is not the treatment, it is not knowing what is about to happen. Being told the steps, roughly how long they take and what you are likely to feel takes some of the edge off. If you would like the dentist to pause and check in with you during the appointment, say so at the start." },
];

export default function ClinicTechnologyPage() {
  return (
    <>
      <PageHero eyebrow="Clinic experience" title="A clearer picture leads to fewer surprises." copy="We would rather explain what our approach does for your treatment than list the names of machines. Here is how the clinic thinks about examining a problem, planning around it, keeping everything clean, and making the appointment itself easier to sit through." />
      <Section spacing="lg">
        <Container width="7xl">
          <div className="grid gap-5 md:grid-cols-2">{principles.map(({ icon: Icon, title, copy }) => <article key={title} className="rounded-[2rem] border border-border bg-card p-7"><Icon className="size-5 text-gold" /><h2 className="mt-5 font-serif text-3xl">{title}</h2><p className="mt-4 text-sm leading-6 text-muted-foreground">{copy}</p></article>)}</div>
        </Container>
      </Section>
      <Section className="bg-ink text-white" spacing="lg">
        <Container width="7xl">
          <SectionHeading eyebrow="Inside Kheni Dental" title="See the spaces before you visit." copy="We are having both Surat clinics photographed properly rather than filling this space with stock images. Until that is done, call the branch you are thinking of visiting and ask whatever you want to know about it." />
          <div className="mt-10 grid gap-5 md:grid-cols-2"><MediaPlaceholder label="Swastik Plaza, Nana Varachha" className="min-h-[28rem]" /><MediaPlaceholder label="Hirabaug, Varachha Main Road" className="min-h-[28rem]" /></div>
        </Container>
      </Section>
    </>
  );
}
