import type { Metadata } from "next";

import { BranchLocator } from "@/components/kheni/branch-locator";
import { CtaBand } from "@/components/kheni/cta-band";
import { DoctorFeature, DoctorRoster } from "@/components/kheni/doctors";
import { FollowLine, InstagramReels } from "@/components/kheni/instagram-reels";
import { MediaFrame } from "@/components/kheni/media-frame";
import { PageHero } from "@/components/kheni/page-hero";
import { ProcessSteps } from "@/components/kheni/process-steps";
import { GoogleQuotes, ProofBig } from "@/components/kheni/proof";
import { SectionIntro } from "@/components/kheni/section-intro";
import { Container } from "@/components/ui/container";
import { instagramHandle } from "@/content/instagram";
import { reelPhoto } from "@/content/photos";
import { site } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/about/" },
  title: "About Kheni Dental, Surat",
  description:
    "Kheni Dental & Elite Implant Center: 15 years in Surat, four dentists led by Dr. Mayur Kheni, two clinics at Yogi Chowk and Hirabaug, and 4.9 on Google across both.",
};

const expect = [
  { title: "You talk first", copy: "The appointment opens with your description of the problem, when it started and what it stops you doing." },
  { title: "Plain words", copy: "Findings are explained in words you could repeat to your family at home." },
  { title: "Some things can wait", copy: "Where watching is the sensible option, the dentist says so and tells you what to look out for." },
  { title: "One stage at a time", copy: "For bigger plans you agree to one stage, see how it goes, and decide the next." },
];

export default function AboutPage() {
  const a = reelPhoto("young-patient");
  const b = reelPhoto("close-work");
  return (
    <>
      <PageHero
        eyebrow="About Kheni Dental"
        title={`${site.yearsInSurat} years in Surat, still explaining every step.`}
        highlight="every step"
        copy="Dr. Mayur Kheni founded the practice, and three more dentists now see patients alongside him across two clinics. A visit still begins the same way: by asking what brought you in and listening to the answer."
        hue="blue"
        aside={
          <div className="grid grid-cols-[1fr_.8fr] items-end gap-3 sm:gap-4">
            <MediaFrame ratio="3 / 4" src={a?.src} alt={a?.alt} objectPosition={a?.objectPosition} shape="smile-lg" className="mood-aqua" sizes="(min-width: 1024px) 360px, 55vw" />
            <MediaFrame ratio="3 / 4" src={b?.src} alt={b?.alt} objectPosition={b?.objectPosition} shape="arch" className="mood-coral mb-10" sizes="(min-width: 1024px) 280px, 40vw" />
          </div>
        }
      />

      <section className="py-10 sm:py-14 lg:py-20">
        <Container width="7xl">
          <SectionIntro eyebrow="How a visit feels" title="Nobody should leave the chair still guessing." highlight="still guessing" />
          <ProcessSteps steps={expect} columns={4} className="mood-blue mt-6" />
        </Container>
      </section>

      <section className="on-dark mood-ink bg-ink py-10 text-white sm:py-14 lg:py-20">
        <Container width="7xl">
          <SectionIntro eyebrow={`Inside Kheni · ${instagramHandle}`} title="The clinic, on its own camera." highlight="its own camera" copy="Reels the clinic posts itself. No stock library, no staging." />
          <InstagramReels placement="about_instagram" limit={5} className="mt-7" />
          <FollowLine placement="about_instagram_follow" className="mt-5" />
        </Container>
      </section>

      <section className="py-10 sm:py-14 lg:py-24">
        <Container width="7xl">
          <SectionIntro eyebrow="Who will see you" title="Four dentists, and what each one handles." highlight="Four dentists" />
          <div className="mood-blue mt-8">
            <DoctorFeature placement="about_doctor" />
          </div>
          <div className="mt-12">
            <DoctorRoster exclude="dr-mayur-kheni" placement="about_roster" />
          </div>
        </Container>
      </section>

      <section className="on-butter bg-butter py-12 text-ink sm:py-16 lg:py-24">
        <Container width="7xl">
          <ProofBig placement="about_proof" />
          <GoogleQuotes placement="about_quotes" className="mt-10" />
        </Container>
      </section>

      <section className="on-aqua mood-aqua bg-aqua py-10 text-ink sm:py-14 lg:py-20">
        <Container width="7xl">
          <SectionIntro eyebrow="Two clinics" title="Pick the one closer to you." highlight="closer to you" />
          <div className="mt-7">
            <BranchLocator placement="about" />
          </div>
        </Container>
      </section>

      <CtaBand title="Tell us what is bothering you. We will take it from there." highlight="take it from there" placement="about_final" />
    </>
  );
}
