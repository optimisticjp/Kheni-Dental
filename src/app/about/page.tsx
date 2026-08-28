import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { DoctorsGrid } from "@/components/kheni/doctors-grid";
import { GoogleTrustCard } from "@/components/kheni/google-trust-card";
import { LocationCard } from "@/components/kheni/location-card";
import { MediaPlaceholder } from "@/components/kheni/media-placeholder";
import { PageHero } from "@/components/kheni/page-hero";
import { SectionHeading } from "@/components/kheni/section-heading";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { locations, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Kheni Dental",
  description: "Learn about Kheni Dental & Elite Implant Center, its four-doctor team, 15 years in Surat and clinics at Swastik Plaza and Hirabaug.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Kheni Dental" title="15 years of dental care in Surat. Still personal at every visit." copy="Kheni Dental is led by Dr. Mayur Kheni and supported by a four-doctor team across two Surat clinics." />
      <Section spacing="lg">
        <Container width="7xl">
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading eyebrow="Our story" title="A clinic can grow without making care feel impersonal." copy="Over 15 years in Surat, Kheni Dental has grown from a local practice into a four-doctor team across two clinics. The approach has stayed personal: listen first, explain the reason behind a recommendation and help patients know what comes next." />
              <div className="mt-8 grid grid-cols-2 gap-4"><div className="rounded-2xl bg-[#f1eee7] p-5"><p className="font-serif text-4xl text-gold">{site.yearsInSurat}</p><p className="mt-2 text-sm text-muted-foreground">years in Surat</p></div><div className="rounded-2xl bg-[#f1eee7] p-5"><p className="font-serif text-4xl text-gold">2</p><p className="mt-2 text-sm text-muted-foreground">Surat clinics</p></div></div>
              <GoogleTrustCard className="mt-5" placement="about_google" />
            </div>
            <MediaPlaceholder label="Dr. Mayur, team and clinic history photography" className="min-h-[34rem]" />
          </div>
        </Container>
      </Section>
      <Section className="bg-ink text-white" spacing="lg"><Container width="7xl"><SectionHeading eyebrow="How we want care to feel" title="Clear enough to understand. Calm enough to ask questions." copy="Start with the patient's concern, explain options in plain language and avoid making treatment sound predetermined." /><div className="mt-10 grid gap-4 md:grid-cols-3">{[["Listen first","What is bothering you and what are you hoping to change?"],["Explain the why","Understand the findings, options and trade-offs before deciding."],["Plan responsibly","Treatment should be based on examination, clinical need and realistic expectations."]].map(([title,copy]) => <div key={title} className="rounded-2xl border border-white/10 p-6"><h2 className="font-serif text-2xl">{title}</h2><p className="mt-3 text-sm leading-6 text-white/58">{copy}</p></div>)}</div></Container></Section>
      <Section spacing="lg"><Container width="7xl"><SectionHeading eyebrow="Dental team" title="Four doctors. Different areas of focus. One patient journey." copy="Meet the four doctors currently caring for patients at Kheni Dental, with their confirmed degrees, experience and listed areas of focus." /><div className="mt-12"><DoctorsGrid /></div></Container></Section>
      <Section className="bg-[#f1eee7]" spacing="lg"><Container width="7xl"><SectionHeading eyebrow="Visit us" title="Find your Kheni." copy="Choose the clinic that is easier for your day, then open directions directly in Google Maps." /><div className="mt-10 grid gap-5 lg:grid-cols-2">{locations.map((location) => <LocationCard key={location.slug} location={location} />)}</div><Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold"><MapPin className="size-4" />Contact the clinic <ArrowRight className="size-4" /></Link></Container></Section>
    </>
  );
}
