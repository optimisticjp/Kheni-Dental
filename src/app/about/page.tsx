import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BranchLocator } from "@/components/kheni/branch-locator";
import { CtaBand } from "@/components/kheni/cta-band";
import { DoctorRoster, DoctorSpotlight } from "@/components/kheni/doctor-spotlight";
import { MediaFrame } from "@/components/kheni/media-frame";
import { PageHero } from "@/components/kheni/page-hero";
import { GoogleQuotes, MetricRow, ProofPanel } from "@/components/kheni/proof";
import { SectionIntro } from "@/components/kheni/section-intro";
import { SmileNote } from "@/components/kheni/smile-note";
import { Container } from "@/components/ui/container";
import { metricsFor } from "@/content/clinic-proof";
import { aboutPhoto } from "@/content/photos";
import { site, smileNotes } from "@/content/site";
import { technology } from "@/content/technology";

export const metadata: Metadata = {
  alternates: { canonical: "/about/" },
  title: "About Kheni Dental, Surat",
  description:
    "Kheni Dental & Elite Implant Center: founded in Surat in 2012 by Dr. Mayur Kheni, four dentists, two clinics at Yogi Chowk and Hirabaug, and 4.9 on Google across both.",
};

const expect = [
  { title: "You talk first", copy: "The appointment opens with your description of the problem, when it started and what it stops you doing." },
  { title: "Plain words", copy: "Findings are explained in words you could repeat to your family at home." },
  { title: "Some things can wait", copy: "Where watching is the sensible option, the dentist says so and tells you what to look out for." },
  { title: "One stage at a time", copy: "For bigger plans you agree to one stage, see how it goes, and decide the next." },
];

/** Clinic history from the information form (p13). Years as the clinic gave them. */
const timeline = [
  { year: String(site.founded), title: "The first clinic opens at Yogi Chowk", copy: "Dr. Mayur Kheni starts Kheni Dental at Swastik Plaza, Yogi Chowk Ground." },
  { year: String(site.hirabaugOpened), title: "A second clinic at Hirabaug", copy: "Kheni Dental & Elite Implant Center opens on Varachha Main Road, so patients from that side of the city have a clinic nearer home." },
  { year: "Today", title: "Comprehensive dental care in one place", copy: "Four dentists, two clinics, and the same aim the practice began with: preventive, quality treatment planned properly rather than a quick fix." },
];

export default function AboutPage() {
  const metrics = metricsFor("about");
  return (
    <>
      <PageHero
        eyebrow="About Kheni Dental"
        title={`${site.yearsInSurat} years in Surat, still explaining every step.`}
        highlight="explaining"
        copy="Dr. Mayur Kheni founded the practice in 2012, and three more dentists now see patients alongside him across two clinics. A visit still begins the same way: by asking what brought you in and listening to the answer."
        hue="gold"
        aside={aboutPhoto ? <MediaFrame ratio="4 / 5" mobileRatio="4 / 3" from="lg" src={aboutPhoto.src} alt={aboutPhoto.alt} objectPosition={aboutPhoto.objectPosition} tone="dark" className="max-w-md rounded-[1.5rem] border border-ivory/10 lg:ml-auto" /> : undefined}
      />

      <section className="py-8 sm:py-12">
        <Container width="7xl">
          <MetricRow metrics={metrics} />
        </Container>
      </section>

      <section className="bg-butter py-8 sm:py-12 lg:py-16">
        <Container width="7xl">
          {/* Asked on form p14, "what should patients feel when visiting?". The
              clinic's answer was "patients obtain accurate information", which
              is the whole section in four words. */}
          <SectionIntro
            eyebrow="How a visit feels"
            title="You should leave understanding what we found and what your options are."
            highlight="what your options are"
            copy="When the clinic was asked what a patient should feel here, the answer was that patients get accurate information. Not reassurance, not a sales pitch. The facts about your own mouth, in words you can use."
          />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {expect.map((item, i) => (
              <li key={item.title} className="rounded-2xl border border-line bg-white p-5">
                <span className="font-serif text-2xl text-gold-text">0{i + 1}</span>
                <p className="t-card mt-2">{item.title}</p>
                <p className="t-small mt-1.5 text-ink-soft">{item.copy}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
            <SectionIntro eyebrow="Since 2012" title="Two clinics, one way of working." highlight="one way" copy="The Elite Implant Center name was added so that implant and full mouth cases could be planned as carefully as they deserve. The everyday dentistry never stopped." className="lg:sticky lg:top-24 lg:self-start" />
            <ol className="grid gap-3">
              {timeline.map((item) => (
                <li key={item.year} className="grid gap-3 rounded-[1.5rem] border border-line bg-white p-5 sm:grid-cols-[6rem_1fr] sm:p-6">
                  <span className="font-serif text-3xl leading-none text-gold-text">{item.year}</span>
                  <div>
                    <p className="t-card">{item.title}</p>
                    <p className="t-small mt-1.5 text-ink-soft">{item.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
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

      <section className="bg-sand py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionIntro eyebrow="Inside the clinic" title="Equipment you can see working." highlight="see working" copy="Digital X-rays on screen while you wait, a camera that shows you the tooth, a microscope for root canal work. Listed by category; ask for makes and models at the clinic." />
            <Link href="/technology/" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink">
              All clinic technology
              <ArrowUpRight className="cta-arrow size-4 text-gold-text" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {technology.map((t) => (
              <li key={t.id} className="rounded-full bg-white px-3.5 py-2 text-sm font-medium ring-1 ring-line">
                {t.title}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="on-dark grain bg-ink py-10 text-ivory sm:py-14 lg:py-18">
        <Container width="7xl">
          <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-12">
            <div>
              <SectionIntro tone="dark" rule eyebrow="Reputation" title="What patients say on Google." highlight="Google" />
              <ProofPanel placement="about_proof" className="mt-6" giant={false} />
            </div>
            <GoogleQuotes placement="about_quotes" tone="dark" className="sm:grid-cols-1 lg:self-center" />
          </div>
        </Container>
      </section>

      <section className="bg-white py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <SectionIntro eyebrow="Two clinics" title="Come to whichever is nearer." highlight="nearer" />
          <div className="mt-6">
            <BranchLocator placement="about" />
          </div>
        </Container>
      </section>

      <CtaBand title="Tell us what is bothering you. We will take it from there." highlight="take it from there" placement="about_final" />
    </>
  );
}
