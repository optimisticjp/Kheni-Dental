import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ImplantDiagram } from "@/components/kheni/art/diagrams";
import { BranchLocator } from "@/components/kheni/branch-locator";
import { ConcernCards } from "@/components/kheni/concern-cards";
import { CtaBand } from "@/components/kheni/cta-band";
import { DoctorFeature, DoctorRoster } from "@/components/kheni/doctors";
import { HomeHero } from "@/components/kheni/home-hero";
import { FollowLine, InstagramReels } from "@/components/kheni/instagram-reels";
import { ProcessSteps } from "@/components/kheni/process-steps";
import { GoogleQuotes, ProofBig } from "@/components/kheni/proof";
import { SectionIntro } from "@/components/kheni/section-intro";
import { TreatmentCard } from "@/components/kheni/treatment-cards";
import { Accordion } from "@/components/ui/accordion";
import { ArrowLink, BookButton, WhatsAppButton } from "@/components/ui/cta";
import { Container } from "@/components/ui/container";
import { googleReputation } from "@/content/google-reputation";
import { implantProcess } from "@/content/implant-center";
import { instagramHandle } from "@/content/instagram";
import { homepageFaqs, locations, site, treatments } from "@/content/site";

/**
 * Homepage, as one composition.
 *
 *   blue    who we are, and the line we live by
 *   butter  the facts, in one strip
 *   ink     inside Kheni, from the clinic's own Instagram
 *   cream   tell us what is bothering you
 *   white   six treatments people come for
 *   ink     the Elite Implant Center
 *   cream   the dentists, as people
 *   butter  4.9 on Google, in patients' own words
 *   (YouTube lives on the treatment, doctor and reviews pages, so the
 *   homepage carries one social rail, not two)
 *   aqua    two clinics, pick the closer one
 *   coral   visiting from abroad
 *   cream   questions, then one closing action
 */
const featured = treatments.filter((t) => t.featured).slice(0, 6);
const hirabaug = locations.find((l) => l.implantCentre) ?? locations[1];
const nriMessage = "Hello Kheni Dental, I live abroad and would like to plan dental treatment during a visit to Surat. Here are my dates:";
const facts = [
  { value: String(site.yearsInSurat), label: "years in Surat" },
  { value: String(site.clinicCount), label: "clinics" },
  { value: String(site.doctorCount), label: "dentists" },
  { value: googleReputation.sharedRating ?? "–", label: "on Google" },
  { value: googleReputation.combinedReviews, label: "reviews, two listings" },
];

export default function Home() {
  return (
    <>
      <HomeHero />

      {/* ── The facts, one strip ─────────────────────────────────────── */}
      <section className="on-butter bg-butter text-ink">
        <Container width="7xl" className="py-6 sm:py-8">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-4 sm:flex sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-8">
            {facts.map((fact, i) => (
              <li key={fact.label} className={`flex items-baseline gap-2 ${i === facts.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}>
                <span className="font-display text-[2.2rem] font-extrabold leading-none tracking-[-.05em] sm:text-5xl">{fact.value}</span>
                <span className="text-sm font-bold leading-tight sm:text-base">{fact.label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Inside Kheni: Instagram ──────────────────────────────────── */}
      <section className="on-dark mood-ink bg-ink py-12 text-white sm:py-16 lg:py-20">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionIntro eyebrow={`Inside Kheni · ${instagramHandle}`} title="See the clinic before you visit it." highlight="before you visit" copy="Real clips from the clinic's own Instagram. The desk, the chair, the school camp, the people." />
          </div>
          <InstagramReels placement="home_instagram" limit={5} className="mt-7 sm:mt-9" />
          <FollowLine placement="home_instagram_follow" className="mt-5" />
        </Container>
      </section>

      {/* ── What is bothering you ────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20">
        <Container width="7xl">
          <SectionIntro eyebrow="Start here" title="Tell us what is bothering you." highlight="bothering you" copy="Pick the one that sounds like you. You do not need to know the name of the treatment. The dentist works that out." />
          <ConcernCards placement="home_concerns" className="mt-7 sm:mt-9" />
        </Container>
      </section>

      {/* ── Treatments, curated ──────────────────────────────────────── */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionIntro eyebrow="Treatments" title="Six things people come to us for." highlight="come to us" />
            <ArrowLink href="/treatments/" className="text-ink">
              All {treatments.length} treatments
            </ArrowLink>
          </div>
          <div className="-mx-4 mt-7 sm:-mx-6 sm:mt-9 lg:mx-0">
            <div className="rail px-4 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0">
              {featured.map((t) => (
                <TreatmentCard key={t.slug} treatment={t} placement="home_treatments" className="w-[76vw] max-w-[22rem] sm:w-[46vw] lg:w-auto lg:max-w-none" />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Elite Implant Center ─────────────────────────────────────── */}
      <section className="on-dark mood-blue relative isolate overflow-hidden bg-ink py-12 text-white sm:py-16 lg:py-24">
        <div aria-hidden="true" className="absolute -right-40 top-0 size-[36rem] rounded-full bg-blue/40 blur-3xl" />
        <Container width="7xl" className="relative">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <p className="t-eyebrow">Elite Implant Center · Hirabaug</p>
              <h2 className="t-h1 mt-3">
                A fixed tooth for the gap you have been <span className="hl">working around.</span>
              </h2>
              <p className="t-lead measure-lead mt-4 text-white/80">Implant work is led from Hirabaug by Dr. Mayur Kheni. One tooth, several, a full arch, or a denture that will not sit still. Every case starts with an examination and the imaging needed to see the bone.</p>
              <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                <Link href="/treatments/dental-implants-surat/" data-track="treatment_view" data-placement="home_implant" className="btn btn-butter btn-lg">
                  Inside the Elite Implant Center
                  <span className="arrow" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </Link>
                <WhatsAppButton placement="home_implant" location={hirabaug} context="implants" variant="outlineLight" size="lg" />
              </div>
            </div>
            <div className="mood-blue rounded-[2rem] bg-cream p-5 text-ink sm:p-8">
              <ImplantDiagram />
            </div>
          </div>
          <div className="mt-12 lg:mt-16">
            <p className="t-eyebrow">{implantProcess.eyebrow}</p>
            <h3 className="t-h2 mt-2">
              From your first visit <span className="hl">to your final tooth.</span>
            </h3>
            <ProcessSteps steps={implantProcess.steps} tone="dark" className="mt-6" />
          </div>
        </Container>
      </section>

      {/* ── The dentists ─────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-24">
        <Container width="7xl">
          <SectionIntro eyebrow="Meet the dentists" title="The people behind your care." highlight="people" />
          <div className="mood-blue mt-8">
            <DoctorFeature placement="home_doctor" />
          </div>
          <div className="mt-12">
            <DoctorRoster exclude="dr-mayur-kheni" placement="home_roster" />
          </div>
        </Container>
      </section>

      {/* ── Google proof ─────────────────────────────────────────────── */}
      <section className="on-butter bg-butter py-12 text-ink sm:py-16 lg:py-24">
        <Container width="7xl">
          <ProofBig placement="home_proof" />
          <GoogleQuotes placement="home_quotes" className="mt-10" />
          <ArrowLink href="/reviews/" data-track="review_click" data-placement="home_quotes_more" className="mt-6">
            Read reviews for each clinic
          </ArrowLink>
        </Container>
      </section>

      {/* ── Clinics ──────────────────────────────────────────────────── */}
      <section className="on-aqua mood-aqua bg-aqua py-12 text-ink sm:py-16 lg:py-24">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionIntro eyebrow="Two clinics in Surat" title="Pick the one closer to you." highlight="closer to you" copy="Yogi Chowk for everyday and family dentistry. Hirabaug for the Elite Implant Center. Both do both." />
            <ArrowLink href="/locations/">Both clinics in detail</ArrowLink>
          </div>
          <div className="mt-7 sm:mt-9">
            <BranchLocator placement="home" />
          </div>
        </Container>
      </section>

      {/* ── NRI ──────────────────────────────────────────────────────── */}
      <section className="on-coral mood-coral bg-coral py-12 text-ink sm:py-16 lg:py-20">
        <Container width="7xl" className="grid gap-6 lg:grid-cols-[1.2fr_auto] lg:items-center">
          <div>
            <p className="t-eyebrow">NRI and international patients</p>
            <h2 className="t-h1 mt-3">
              Visiting Surat? Plan your dental care <span className="hl">before you fly.</span>
            </h2>
            <p className="t-lead measure-lead muted mt-4">Send your dates and what you would like looked at. We tell you what fits into the trip, what needs a second visit, and what to expect once you are home.</p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col">
            <WhatsAppButton placement="home_nri" message={nriMessage} label="Plan your visit on WhatsApp" track="international_patient_contact" size="lg" />
            <Link href="/international-patients/" className="btn btn-ink btn-lg">
              How a visit works
              <span className="arrow" aria-hidden="true">
                <ArrowUpRight />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Questions ────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20">
        <Container width="7xl" className="grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:gap-14">
          <div>
            <SectionIntro eyebrow="Questions" title="Before your first visit." highlight="first visit" />
            <div className="mt-6 hidden lg:block">
              <BookButton placement="home_faq" />
            </div>
          </div>
          <Accordion items={homepageFaqs.slice(0, 5)} exclusive name="home-faq" />
        </Container>
      </section>

      <CtaBand title="Tell us what is bothering you. We will take it from there." highlight="take it from there" placement="home_final" />
    </>
  );
}
