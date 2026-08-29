import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, MessageCircle, Phone, Plane } from "lucide-react";

import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BranchGoogleCard, GoogleProofPanel } from "@/components/kheni/branch-google-card";
import { CaseResultsGrid } from "@/components/kheni/case-results";
import { DoctorRoster, PrincipalDoctor } from "@/components/kheni/doctor-authority";
import { ImplantDiagram } from "@/components/kheni/implant/implant-diagram";
import { LocationCard } from "@/components/kheni/location-card";
import { MediaFrame } from "@/components/kheni/pending";
import { ProofBand } from "@/components/kheni/proof-band";
import { PatientStoryGrid, VideoStoryGrid } from "@/components/kheni/stories";
import { TreatmentRail } from "@/components/kheni/treatment-rail";
import { implantCapabilities } from "@/content/capabilities";
import { heroAssurances, proofStats } from "@/content/clinic-proof";
import { googleReputation } from "@/content/google-reputation";
import { homepageFaqs, locations, site } from "@/content/site";
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
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="grain relative isolate overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="bloom-gold pointer-events-none absolute inset-0 -z-10" />
        <Container
          width="7xl"
          className="relative grid gap-12 py-12 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-16 lg:py-20"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[.66rem] font-semibold uppercase tracking-[.22em] text-gold">
                Kheni Dental &amp; Elite Implant Center
              </span>
              <span aria-hidden="true" className="rule-gold h-px flex-1 max-w-24" />
            </div>

            {/* No hard break: text-balance distributes the line lengths, which
                stops "to." being orphaned on a line of its own at wide widths. */}
            <h1 className="mt-6 font-serif text-[clamp(2.3rem,4.6vw,3.75rem)] leading-[1.01] tracking-[-.045em] text-balance">
              The dentist in Surat you keep going back to.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/60">
              Fifteen years, four dentists and two clinics at Yogi Chowk and Hirabaug. Dental implants, root canals,
              braces, kids dentistry and smile design, led by Dr. Mayur Kheni.
            </p>

            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5">
              {heroAssurances.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[.8rem] text-white/45">
                  <span aria-hidden="true" className="size-1 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact/#book"
                data-track="appointment_start"
                data-placement="home_hero"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-ink sm:whitespace-nowrap"
              >
                Book Appointment
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href={`tel:${site.primaryPhoneHref}`}
                data-track="phone_click"
                data-placement="home_hero"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/18 px-6 text-sm font-semibold sm:whitespace-nowrap"
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
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/18 px-6 text-sm font-semibold sm:whitespace-nowrap"
              >
                <MessageCircle className="size-4 text-gold" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Photography slot with the Google proof overlapping its lower edge.
              The overlap is what stops this reading as two stacked boxes. */}
          {/* The panel hangs off the bottom-left corner of the photograph.
              The overlap is deliberately shallow so the frame still reads as a
              photograph and the proof still reads as a separate object. */}
          <div className="relative">
            <MediaFrame
              shot="Dr. Mayur Kheni at the Elite Implant Center"
              ratio="4 / 3"
              className="ml-auto w-full lg:w-[88%]"
            />
            <GoogleProofPanel
              placement="home_hero_google"
              className="relative -mt-8 w-full shadow-[0_30px_70px_-24px_rgba(0,0,0,.85)] sm:max-w-md lg:-mt-14 lg:max-w-[21rem]"
            />
          </div>
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
              <p className="text-[.66rem] font-semibold uppercase tracking-[.2em] text-gold">Problems we treat</p>
              <h2 className="mt-4 max-w-2xl font-serif text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.02] tracking-[-.04em]">
                Start with what is bothering you.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-white/45">
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
              <p className="text-[.66rem] font-semibold uppercase tracking-[.2em] text-gold">Elite Implant Center</p>
              <h2 className="mt-4 font-serif text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.02] tracking-[-.04em]">
                Tooth replacement, planned properly.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
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
                <ArrowRight className="size-4" aria-hidden="true" />
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

          <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">The rest of the team</h2>
            <Link href="/doctors/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold">
              All doctors <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-7">
            <DoctorRoster exclude="dr-mayur-kheni" />
          </div>
        </Container>
      </Section>

      {/* ── Before and after ─────────────────────────────────────────────── */}
      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[.66rem] font-semibold uppercase tracking-[.2em] text-gold">Our work</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Before &amp; after</h2>
            </div>
            <Link
              href="/smile-gallery/"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold"
            >
              All results <ArrowUpRight className="size-4" aria-hidden="true" />
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
              <p className="text-[.66rem] font-semibold uppercase tracking-[.2em] text-gold">Patient reviews</p>
              <h2 className="mt-4 max-w-xl font-serif text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.02] tracking-[-.04em]">
                {googleReputation.combinedReviews} reviews, on Google.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/45">
                Counted {googleReputation.combinedLabel.replace(/^Google reviews /, "")}. Each clinic keeps its own
                listing, so you can read the one you plan to visit.
              </p>
            </div>
            <Link href="/reviews/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold">
              Reputation in full <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {locations.map((location) => (
              <BranchGoogleCard
                key={location.slug}
                location={location}
                dark
                placement={`home_google_${location.slug}`}
              />
            ))}
          </div>

          <div className="mt-12">
            <h3 className="font-serif text-2xl leading-tight tracking-[-.02em]">Patient stories</h3>
            <div className="mt-6">
              <VideoStoryGrid />
            </div>
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
                <h2 className="mt-5 max-w-xl font-serif text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.02] tracking-[-.04em]">
                  Planning dental treatment during your visit to India?
                </h2>
                <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
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
                    <ArrowRight className="size-4" aria-hidden="true" />
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
              <p className="text-[.66rem] font-semibold uppercase tracking-[.2em] text-gold">Visit us</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Our clinics</h2>
            </div>
            <Link href="/locations/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold">
              <MapPin className="size-4" aria-hidden="true" />
              Both locations
            </Link>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {locations.map((location) => (
              <LocationCard key={location.slug} location={location} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Questions ────────────────────────────────────────────────────── */}
      <Section spacing="md">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-14">
            <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Common questions</h2>
            <Accordion items={homepageFaqs} />
          </div>
        </Container>
      </Section>

      {/* ── Final action ─────────────────────────────────────────────────── */}
      <section className="bg-gold py-14 text-ink sm:py-16">
        <Container width="7xl" className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <h2 className="max-w-2xl font-serif text-[clamp(2rem,4.6vw,3.2rem)] leading-[1] tracking-[-.04em]">
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
