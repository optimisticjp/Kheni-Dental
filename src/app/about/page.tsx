import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { DoctorsGrid } from "@/components/kheni/doctors-grid";
import { BranchGoogleCard } from "@/components/kheni/branch-google-card";
import { LocationCard } from "@/components/kheni/location-card";
import { MediaFrame } from "@/components/kheni/pending";
import { PageHero } from "@/components/kheni/page-hero";
import { SectionHeading } from "@/components/kheni/section-heading";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { locations, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Our Dental Practice in Surat",
  description: "Kheni Dental has treated patients in Surat for around 15 years. Meet the four doctors led by Dr. Mayur Kheni and see how care is explained at both clinics.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About the practice" title="Fifteen years in Surat, still explaining every step." copy="Dr. Mayur Kheni leads the practice, and three more doctors now see patients alongside him across two clinics in Surat. A visit still begins the same way, by asking what brought you in and listening to the answer." />
      <Section spacing="lg">
        <Container width="7xl">
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading eyebrow="Our story" title="More doctors now, the same length of appointment." copy="Kheni Dental has been treating patients in Surat for around fifteen years. There are four doctors now and two clinics, so you can pick the branch that suits your day and see a dentist whose focus fits your problem. What has not changed is the pace of an appointment. Questions are expected, and no treatment is suggested until an examination explains the reason for it." />
              <div className="mt-8 grid grid-cols-2 gap-4"><div className="rounded-2xl bg-[#f1eee7] p-5"><p className="font-serif text-4xl text-gold">{site.yearsInSurat}</p><p className="mt-2 text-sm text-muted-foreground">years treating patients in Surat</p></div><div className="rounded-2xl bg-[#f1eee7] p-5"><p className="font-serif text-4xl text-gold">2</p><p className="mt-2 text-sm text-muted-foreground">clinics across the city</p></div></div>
              <div className="mt-5 grid gap-4">{locations.map((location) => <BranchGoogleCard key={location.slug} location={location} placement={`about_google_${location.slug}`} />)}</div>
            </div>
            <MediaFrame shot="The team at Kheni Dental" ratio="4 / 5" className="w-full" />
          </div>
        </Container>
      </Section>
      <Section className="bg-ink text-white" spacing="lg"><Container width="7xl"><SectionHeading eyebrow="How we want care to feel" title="Nobody should leave the chair still guessing." copy="Most dental worry comes from not knowing what is happening in your own mouth. So findings are said out loud, options are named in plain words, and you get time to think before anything is booked." /><div className="mt-10 grid gap-4 md:grid-cols-3">{[["You talk first","The appointment opens with your description of the problem, when it started and what it stops you doing. That usually tells the dentist where to look first."],["Plain words, not jargon","Findings are explained in words you could repeat to your family at home. If a clinical term matters to your decision, you will hear what it actually means."],["Some things can wait","Not every finding needs treatment straight away. Where watching is the sensible option, the dentist will say so and tell you what to look out for."]].map(([title,copy]) => <div key={title} className="rounded-2xl border border-white/10 p-6"><h2 className="font-serif text-2xl">{title}</h2><p className="mt-3 text-sm leading-6 text-white/58">{copy}</p></div>)}</div></Container></Section>
      <Section spacing="lg"><Container width="7xl"><SectionHeading eyebrow="Who will see you" title="Four doctors, and what each one handles." copy="Dr. Mayur Kheni leads the practice. Three more doctors work alongside him, with listed areas of focus covering smile design, children's dentistry and everyday dental care. Degrees and years in practice are listed exactly as each doctor gave them." /><div className="mt-12"><DoctorsGrid /></div></Container></Section>
      <Section className="bg-[#f1eee7]" spacing="lg"><Container width="7xl"><SectionHeading eyebrow="Both addresses" title="Come to whichever clinic is nearer." copy="Swastik Plaza at Yogi Chowk and Hirabaug on Varachha Main Road. Each clinic has its own number." /><div className="mt-10 grid gap-5 lg:grid-cols-2">{locations.map((location) => <LocationCard key={location.slug} location={location} showMap={false} />)}</div><Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold"><MapPin className="size-4" />Ask us which branch suits you <ArrowRight className="size-4" /></Link></Container></Section>
    </>
  );
}
