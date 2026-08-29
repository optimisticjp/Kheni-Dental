import Link from "next/link";
import { GoogleReviewQuotes } from "@/components/kheni/google-trust";
import { ArrowRight, ArrowUpRight, MapPin, MessageCircle, Phone, Plane } from "lucide-react";

import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { GoogleProofPanel } from "@/components/kheni/branch-google-card";
import { CaseResultsGrid } from "@/components/kheni/case-results";
import { PrincipalDoctor } from "@/components/kheni/doctor-authority";
import { ImplantDiagram } from "@/components/kheni/implant/implant-diagram";
import { BranchLocator } from "@/components/kheni/branch-locator";
import { MediaFrame } from "@/components/kheni/pending";
import { ProofBand } from "@/components/kheni/proof-band";
import { PatientStoryGrid, VideoStoryGrid } from "@/components/kheni/stories";
import { TreatmentRail } from "@/components/kheni/treatment-rail";
import { implantCapabilities } from "@/content/capabilities";
import { heroAssurances, proofStats } from "@/content/clinic-proof";
import { googleReputation } from "@/content/google-reputation";
import { homepageFaqs, site } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

/**
 * Homepage.
 *
 * Rhythm rather than a run of card grids: dark editorial hero, a proof strip,
 * the interactive treatment rail as the centre of gravity, then alternating
 * ivory and ink bands for the implant centre, the doctors, results, patient
 * voices, international care and the two clinics.
 *
 * Discovery happens once. The rail is the only place treatments are browsed on
 * this page; the full directory lives on /treatments and the problems index on
 * /problems-we-treat, so the three do not repeat one another.
 */

const nriMessage =
  "Hello Kheni Dental, I live abroad and would like to plan dental treatment during a visit to Surat. Here are my dates:";

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────
          No photography slot here on purpose. While the clinic's own images
          are still coming, an empty frame was the largest object on the page
          and the first screen advertised what we lack. The right column is
          now the Google proof, which is real, external and the strongest
          thing Kheni has. Photography slots remain everywhere they can carry
          their own weight: the rail, the clinics, the gallery. */}
      <section className="grain relative isolate overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="bloom-gold pointer-events-none absolute inset-0 -z-10" />
        <Container
          width="7xl"
          className="relative grid gap-8 py-9 sm:py-12 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-20 lg:py-20"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="t-eyebrow text-gold">Kheni Dental &amp; Elite Implant Center</span>
              <span aria-hidden="true" className="rule-gold h-px w-14" />
            </div>

            <h1 className="t-display measure-display mt-6">The dentist in Surat you keep going back to.</h1>

            <p className="t-stand measure-stand mt-5 text-white/60">
              Fifteen years, four dentists and two clinics at Yogi Chowk and Hirabaug. Dental implants, root canals,
              braces, kids dentistry and smile design, led by Dr. Mayur Kheni.
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {heroAssurances.map((item) => (
                <li key={item} className="t-small flex items-center gap-2 text-white/40">
                  <span aria-hidden="true" className="size-1 rounded-full bg-gold/70" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Call and WhatsApp are permanently docked at the bottom of every
                phone screen at 64px each, so repeating them here as two more
                full-width buttons was pure duplication. They return from sm up,
                where there is no dock. */}
            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact/#book"
                data-track="appointment_start"
                data-placement="home_hero"
                className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-ink sm:whitespace-nowrap"
              >
                Book Appointment
                <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
              </Link>
              <a
                href={`tel:${site.primaryPhoneHref}`}
                data-track="phone_click"
                data-placement="home_hero"
                className="hidden min-h-13 items-center justify-center gap-2 rounded-full border border-white/18 px-6 text-sm font-semibold sm:inline-flex sm:whitespace-nowrap"
              >
                <Phone className="size-4 text-gold" aria-hidden="true" />
                {site.primaryPhoneDisplay}
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                data-track="whatsapp_click"
                data-placement="home_hero"
                className="hidden min-h-13 items-center justify-center gap-2 rounded-full border border-white/18 px-6 text-sm font-semibold sm:inline-flex sm:whitespace-nowrap"
              >
                <MessageCircle className="size-4 text-gold" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>

          <GoogleProofPanel placement="home_hero_google" className="w-full" />
        </Container>
      </section>

      {/* ── Proof numbers ────────────────────────────────────────────────── */}
      <section className="border-y border-white/10 bg-[#0a0a09] py-10 text-white sm:py-12">
        <Container width="7xl">
          <ProofBand stats={proofStats} />
        </Container>
      </section>

      {/* ── Problems we treat: the signature rail ────────────────────────── */}
      <Section className="bg-ink text-white" spacing="md">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="t-eyebrow text-gold">Problems we treat</p>
              <h2 className="t-h1 measure-head mt-4">
                Start with what is bothering you.
              </h2>
            </div>
            <p className="t-body measure-narrow text-white/45">
              Pick the one that sounds like you. You do not need to know the name of the treatment.
            </p>
          </div>

          <div className="mt-10">
            <TreatmentRail />
          </div>
        </Container>
      </Section>

      {/* ── Elite Implant Center ─────────────────────────────────────────── */}
      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16">
            <div>
              <p className="t-eyebrow text-gold">Elite Implant Center</p>
              <h2 className="t-h1 mt-4">
                Tooth replacement, planned properly.
              </h2>
              <p className="t-stand measure-body mt-5 text-muted-foreground">
                Our implant work is led from the Hirabaug clinic by Dr. Mayur Kheni. Every case starts with an
                examination and the imaging needed to assess the bone, before anything is recommended.
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {implantCapabilities.map((item) => (
                  <li key={item.id} className="rounded-xl border border-border bg-white p-4">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{item.copy}</p>
                  </li>
                ))}
              </ul>

              <Link
                href="/treatments/dental-implants-surat/"
                data-track="treatment_view"
                data-placement="home_implant_centre"
                className="mt-8 inline-flex min-h-13 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white"
              >
                Inside the Elite Implant Center
                <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="rounded-[1.4rem] border border-border bg-white p-6 sm:p-8">
              <ImplantDiagram />
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Doctors ──────────────────────────────────────────────────────── */}
      <Section spacing="md">
        <Container width="7xl">
          <PrincipalDoctor />

          {/*
            The other three dentists had a full card grid here, and the doctors
            block came to 2,548px on a phone — three screens, a fifth of the
            homepage, for people a patient has not asked about yet. They have
            their own page, which does the job properly. The homepage says
            who leads the clinic and that there is a team behind him.
          */}
          <Link
            href="/doctors/"
            className="ease-kheni group mt-9 flex items-center justify-between gap-6 rounded-2xl border border-border px-5 py-4 transition-colors duration-300 hover:border-gold/45 sm:px-6"
          >
            <span className="t-small text-muted-foreground">
              Three more dentists across both clinics, each with their own areas of work.
            </span>
            <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gold">
              Meet the team
              <ArrowUpRight className="cta-arrow size-4" aria-hidden="true" />
            </span>
          </Link>
        </Container>
      </Section>

      {/* ── Before and after ─────────────────────────────────────────────── */}
      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="t-eyebrow text-gold">Our work</p>
              <h2 className="t-h2 mt-4">Before &amp; after</h2>
            </div>
            <Link
              href="/smile-gallery/"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold"
            >
              All results <ArrowUpRight className="cta-arrow size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8">
            <CaseResultsGrid limit={3} />
          </div>
        </Container>
      </Section>

      {/* ── Reputation and patient voices ────────────────────────────────── */}
      <Section className="grain relative isolate bg-ink text-white" spacing="md">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="t-eyebrow text-gold">Patient reviews</p>
              <h2 className="t-h1 measure-head mt-4">
                {googleReputation.combinedReviews} reviews, on Google.
              </h2>
              <p className="t-body measure-narrow mt-3 text-white/45">
                Counted {googleReputation.combinedLabel.replace(/^Google reviews /, "")}. Each clinic keeps its own
                listing, so you can read the one you plan to visit.
              </p>
            </div>
            <Link href="/reviews/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold">
              Reputation in full <ArrowUpRight className="cta-arrow size-4" aria-hidden="true" />
            </Link>
          </div>

          {/*
            Both branch cards used to repeat here in full. The hero already
            carries the same rating, the same two review counts and the same
            verified date about 1,500px further up, so this section spent
            2,308px on a phone re-stating what the visitor read first. What
            belongs here is the part the hero cannot show: what patients
            actually said.
          */}
          {/* Three things patients actually wrote on Google, verbatim. These
              are independent of us in a way nothing else on the page is. */}
          <GoogleReviewQuotes tone="dark" placement="home_google_quotes" className="mt-9" />

          <div className="mt-10">
            <VideoStoryGrid />
            <div className="mt-4">
              <PatientStoryGrid tone="dark" />
            </div>
          </div>
        </Container>
      </Section>

      {/* ── International and NRI ────────────────────────────────────────── */}
      <Section spacing="md">
        <Container width="7xl">
          <div className="relative overflow-hidden rounded-[1.6rem] border border-border bg-white">
            <div aria-hidden="true" className="map-grid pointer-events-none absolute inset-0" />
            <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-14">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/[.08] px-3 py-1.5 text-[.66rem] font-semibold uppercase tracking-[.16em] text-gold">
                  <Plane className="size-3.5" aria-hidden="true" />
                  International &amp; NRI
                </span>
                <h2 className="t-h1 measure-head mt-5">
                  Planning dental treatment during your visit to India?
                </h2>
                <p className="t-stand measure-body mt-5 text-muted-foreground">
                  Send your travel dates before you book flights. We will tell you what realistically fits into your
                  trip, what would need a second visit, and what to expect once you are back home.
                </p>
                <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
                  <Link
                    href="/international-patients/"
                    data-track="international_patient_contact"
                    data-placement="home_nri"
                    className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white sm:whitespace-nowrap"
                  >
                    Plan your treatment
                    <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={whatsappUrl(nriMessage)}
                    target="_blank"
                    rel="noreferrer"
                    data-track="whatsapp_click"
                    data-placement="home_nri"
                    className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-border px-6 text-sm font-semibold sm:whitespace-nowrap"
                  >
                    <MessageCircle className="size-4 text-gold" aria-hidden="true" />
                    Send your dates
                  </a>
                </div>
              </div>

              <MediaFrame shot="NRI patient consultation" tone="light" ratio="4 / 3" />
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Clinics ──────────────────────────────────────────────────────── */}
      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="t-eyebrow text-gold">Visit us</p>
              <h2 className="t-h2 mt-4">Our clinics</h2>
            </div>
            <Link href="/locations/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold">
              <MapPin className="size-4" aria-hidden="true" />
              Both locations
            </Link>
          </div>
          <div className="mt-7">
            <BranchLocator placement="home" />
          </div>
        </Container>
      </Section>

      {/* ── Questions ────────────────────────────────────────────────────── */}
      <Section spacing="md">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-14">
            <h2 className="t-h2">Common questions</h2>
            <Accordion items={homepageFaqs} />
          </div>
        </Container>
      </Section>

      {/* ── Final action ─────────────────────────────────────────────────── */}
      <section className="bg-gold py-14 text-ink sm:py-16">
        <Container width="7xl" className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <h2 className="t-h1 measure-head">
            Tell us what is bothering you. We will take it from there.
          </h2>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Link
              href="/contact/#book"
              data-track="appointment_start"
              data-placement="home_final_cta"
              className="inline-flex min-h-13 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white sm:whitespace-nowrap"
            >
              Book Appointment
            </Link>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              data-track="whatsapp_click"
              data-placement="home_final_cta"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-ink/25 px-6 text-sm font-semibold sm:whitespace-nowrap"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
