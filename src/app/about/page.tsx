import type { Metadata } from "next";

import { BranchLocator } from "@/components/kheni/branch-locator";
import { CtaBand } from "@/components/kheni/cta-band";
import { DoctorRoster, DoctorSpotlight } from "@/components/kheni/doctor-spotlight";
import { MediaFrame } from "@/components/kheni/media-frame";
import { PageHero } from "@/components/kheni/page-hero";
import { ProofCluster, GoogleQuotes } from "@/components/kheni/proof";
import { SectionIntro } from "@/components/kheni/section-intro";
import { SmileNote } from "@/components/kheni/smile-note";
import { Container } from "@/components/ui/container";
import { proofStats } from "@/content/clinic-proof";
import { aboutPhoto } from "@/content/photos";
import { site, smileNotes } from "@/content/site";
import { StatBand } from "@/components/kheni/demo/stat-band";
import { AwardsRow, NotableStrip, PressQuotes, PressStrip } from "@/components/kheni/demo/press-strip";
import { ClaimMarquee } from "@/components/kheni/demo/marquee";
import { demoContentActive } from "@/content/demo";

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
  return (
    <>
      <PageHero
        eyebrow="About Kheni Dental"
        title={`${site.yearsInSurat} years in Surat, still explaining every step.`}
        highlight="explaining"
        copy="Dr. Mayur Kheni founded the practice, and three more dentists now see patients alongside him across two clinics. A visit still begins the same way: by asking what brought you in and listening to the answer."
        hue="cobalt"
        aside={<MediaFrame ratio="4 / 3" mobileRatio="16 / 9" from="lg" src={aboutPhoto.src} alt={aboutPhoto.alt} objectPosition={aboutPhoto.objectPosition} className="hue-cobalt rounded-[1.75rem] ring-1 ring-line" />}
      />

      <section className="py-8 sm:py-12">
        <Container width="7xl">
          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {proofStats.map((stat, i) => (
              <div key={stat.id} className={`${["hue-cobalt", "hue-teal", "hue-coral", "hue-sunshine"][i % 4]} rounded-2xl bg-h-tint p-4 sm:p-5`}>
                <dd className="t-proof text-h-text">{stat.value}</dd>
                <dt className="mt-1.5 text-sm font-semibold">{stat.label}</dt>
                {stat.detail && <p className="t-small mt-0.5 text-ink-soft">{stat.detail}</p>}
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-porcelain py-8 sm:py-12 lg:py-16">
        <Container width="7xl">
          <SectionIntro eyebrow="How a visit feels" title="Nobody should leave the chair still guessing." highlight="still guessing" />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {expect.map((item, i) => (
              <li key={item.title} className="rounded-2xl border border-line bg-white p-5">
                <span className="font-serif text-2xl font-semibold text-cobalt-deep">0{i + 1}</span>
                <p className="t-card mt-2">{item.title}</p>
                <p className="t-small mt-1.5 text-ink-soft">{item.copy}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <SmileNote note={smileNotes[0]} compact className="pb-8 sm:pb-12" />

      <section className="pb-10 sm:pb-14 lg:pb-18">
        <Container width="7xl">
          <SectionIntro eyebrow="Who will see you" title="Four dentists, and what each one handles." highlight="Four dentists" />
          <div className="mt-6">
            <DoctorSpotlight />
          </div>
          <div className="mt-4">
            <DoctorRoster exclude="dr-mayur-kheni" />
          </div>
        </Container>
      </section>

      <section className="hue-sunshine bg-sunshine-tint py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-12">
            <div>
              <SectionIntro eyebrow="Reputation" title="What patients say on Google." highlight="Google" />
              <ProofCluster placement="about_proof" className="mt-6" />
            </div>
            <GoogleQuotes placement="about_quotes" className="sm:grid-cols-1 lg:self-center" />
          </div>
        </Container>
      </section>

      <section className="hue-green py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <SectionIntro eyebrow="Two clinics" title="Come to whichever is nearer." highlight="nearer" />
          <div className="mt-6">
            <BranchLocator placement="about" />
          </div>
        </Container>
      </section>

      {demoContentActive && (
        <>
          <StatBand />
          <ClaimMarquee tone="sunshine" />
          <PressStrip />

          <section className="hue-gold py-10 sm:py-14 lg:py-20">
            <Container width="7xl">
              <SectionIntro eyebrow="Recognition" title="What other people have said about us." highlight="other people" copy="Awards, accreditation, and a few write-ups we did not ask for." />
              <AwardsRow className="mt-6 sm:mt-8" />
              <PressQuotes className="mt-8" />
              <div className="mt-10">
                <SectionIntro eyebrow="Notable patients" title="A few faces you might recognise." highlight="might recognise" copy="They sat in the same chairs, in the same two waiting rooms as everyone else." />
                <NotableStrip className="mt-6" />
              </div>
            </Container>
          </section>
        </>
      )}

      <CtaBand title="Tell us what is bothering you. We will take it from there." highlight="take it from there" placement="about_final" />
    </>
  );
}
