import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Globe2, MessageCircle, Plane } from "lucide-react";

import { BranchGoogleCard, GoogleProofPanel } from "@/components/kheni/branch-google-card";
import { PriceTable } from "@/components/kheni/capability-grids";
import { CaseResultsGrid } from "@/components/kheni/case-results";
import { ConsultationForm } from "@/components/kheni/consultation-form";
import { MediaFrame, PendingTag, ProofNumber, gapBorder, showContentGaps } from "@/components/kheni/pending";
import { PageHero } from "@/components/kheni/page-hero";
import { VideoStoryGrid } from "@/components/kheni/stories";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { languages, nriStats } from "@/content/clinic-proof";
import { locations, treatments } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "International & NRI Patients",
  description:
    "Dental treatment in Surat for NRI and international patients. Send records and travel dates before you fly, get a plan and an estimate, and know how many visits your case needs.",
};

const NRI_MESSAGE =
  "Hello Kheni Dental, I live abroad and would like to plan dental treatment during a visit to Surat. Here are my dates:";

/** Treatments NRI patients most often travel for. */
const popularSlugs = [
  "dental-implants-surat",
  "full-mouth-rehabilitation",
  "cosmetic-smile-dentistry",
  "crowns-and-bridges",
];

/**
 * The five stages of a trip. Apollo and the stronger Indian dental-tourism
 * pages all use a staged journey, because the real anxiety is not the
 * dentistry, it is not knowing how the trip fits around it.
 */
const journey = [
  {
    stage: "Before you travel",
    title: "Send your records and your dates",
    copy: "Any recent x-rays or reports, plus the days you will be in Surat. We come back with what is realistically possible in that window and an estimate.",
  },
  {
    stage: "On arrival",
    title: "Examination confirms the plan",
    copy: "Nothing is fixed until a dentist has examined you here. If what we find changes the plan, you hear it before anything starts.",
  },
  {
    stage: "Treatment",
    title: "Staged around the days you have",
    copy: "Appointments are grouped so you are not travelling back and forth. Some cases finish in one trip; some need healing time between stages.",
  },
  {
    stage: "Between stages",
    title: "If your case needs a gap",
    copy: "Implant and full mouth cases often need months between surgical and fitting stages. We plan that gap around your next visit rather than your current one.",
  },
  {
    stage: "Back home",
    title: "Follow-up from wherever you are",
    copy: "You leave with what was done, what was used and what to watch for. If something needs attention, message us and we will tell you what it likely is.",
  },
];

/** Practical travel support. Every one of these is unconfirmed clinic policy. */
const travelSupport = [
  "Airport to clinic distance and travel time",
  "Help arranging accommodation nearby",
  "Visa or travel documentation letters",
  "Support between appointments",
];

const faqs = [
  {
    question: "Can you give me a plan before I fly?",
    answer:
      "We can give you an indicative plan and an estimate from your records and photographs. It is not a diagnosis. The plan is only confirmed after a dentist examines you in Surat, and we will tell you plainly if what we find changes it.",
  },
  {
    question: "How many visits will my case need?",
    answer:
      "It depends entirely on the treatment. Crowns, root canals and cosmetic work often finish inside one trip. Implants and full mouth cases usually need healing time, which means more than one visit. Send your records and we will tell you which one you are looking at.",
  },
  {
    question: "How much time should I keep free in Surat?",
    answer:
      "Tell us your travel dates first and we will work backwards from them. It is better to know what fits into eight days than to arrive hoping for something that needs three weeks.",
  },
  {
    question: "What happens if I have a problem after I get home?",
    answer:
      "Message the clinic on WhatsApp. We can usually tell you whether it is something that settles, something a local dentist should look at, or something that needs us. You will also have a record of exactly what was done.",
  },
  {
    question: "Which languages can I be seen in?",
    answer: `Consultations are in ${languages.join(", ")}. Tell us which you are most comfortable in when you first message.`,
  },
];

export default function InternationalPage() {
  const popular = popularSlugs
    .map((slug) => treatments.find((t) => t.slug === slug))
    .filter((t): t is (typeof treatments)[number] => Boolean(t));

  return (
    <>
      <PageHero
        eyebrow="International & NRI patients"
        title="Dental treatment in Surat, planned around your trip."
        copy="Send your records and travel dates before you book flights. We will tell you what genuinely fits into the time you have, and what would need a second visit."
        aside={<GoogleProofPanel placement="nri_hero_google" className="w-full" />}
      >
        <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          <a
            href={whatsappUrl(NRI_MESSAGE)}
            target="_blank"
            rel="noreferrer"
            data-track="international_patient_contact"
            data-placement="nri_hero"
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-ink sm:whitespace-nowrap"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Send your dates on WhatsApp
          </a>
          <Link
            href="#plan"
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/18 px-6 text-sm font-semibold sm:whitespace-nowrap"
          >
            Send records and an enquiry
          </Link>
        </div>
      </PageHero>

      {/* ── Reach ────────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-[#f1eee7] py-10 sm:py-12">
        <Container width="7xl">
          {/* Confirmed reach first, then the two counts the clinic still owes
              us. A row that opens on greyed placeholders spends its first
              impression on what is missing. */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="t-proof text-gold">{languages.length}</p>
              <p className="t-eyebrow mt-2.5 text-muted-foreground">Languages we consult in</p>
              <p className="t-small mt-1 text-muted-foreground/80">{languages.join(", ")}</p>
            </div>
            <div>
              <p className="t-proof text-gold">2</p>
              <p className="t-eyebrow mt-2.5 text-muted-foreground">Clinics in Surat</p>
              <p className="t-small mt-1 text-muted-foreground/80">Yogi Chowk and Hirabaug</p>
            </div>
            {nriStats.map((stat) => (
              <ProofNumber key={stat.id} value={stat.value} label={stat.label} tone="light" />
            ))}
          </div>
        </Container>
      </section>

      {/* ── The journey ──────────────────────────────────────────────────── */}
      <Section className="grain relative isolate bg-ink text-white" spacing="md">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="t-eyebrow text-gold">How a trip works</p>
              <h2 className="mt-4 max-w-2xl t-h1">
                From your first message to getting home.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-white/45">
              The dentistry is rarely the hard part. Knowing how it fits around your travel is.
            </p>
          </div>

          <ol className="mt-10 grid gap-px overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/10 lg:grid-cols-5">
            {journey.map((step, index) => (
              <li key={step.stage} className="flex flex-col bg-[#0f0f0e] p-6">
                <span aria-hidden="true" className="font-mono text-[.65rem] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-4 text-[.66rem] font-semibold uppercase tracking-[.16em] text-white/40">
                  {step.stage}
                </span>
                <h3 className="mt-2 font-serif text-lg leading-snug">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/50">{step.copy}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── Treatments and cost ──────────────────────────────────────────── */}
      <Section spacing="md">
        <Container width="7xl">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
            <div>
              <h2 className="t-h2">
                What patients travel for
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Mostly the work that is worth doing in one considered stretch rather than piecemeal.
              </p>
              <ul className="mt-7 grid gap-2.5">
                {popular.map((treatment) => (
                  <li key={treatment.slug}>
                    <Link
                      href={`/treatments/${treatment.slug}/`}
                      data-track="treatment_view"
                      data-placement="nri_treatments"
                      className="flex min-h-14 items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 font-serif text-lg leading-tight hover:border-gold/50"
                    >
                      {treatment.title}
                      <ArrowRight className="size-4 shrink-0 text-gold" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="t-h2">Treatment cost</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Ask for a written plan with the cost of each stage before you travel, so there is nothing to work out
                once you have landed.
              </p>
              <div className="mt-7">
                <PriceTable />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Where patients come from, and practical support ──────────────── */}
      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/[.08] px-3 py-1.5 text-[.66rem] font-semibold uppercase tracking-[.16em] text-gold">
                <Globe2 className="size-3.5" aria-hidden="true" />
                Where patients travel from
              </span>
              <h2 className="t-h2 mt-5">
                Surat is a short trip from most of the world.
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Surat has a strong Gujarati diaspora, so a good share of our international patients are coming home
                anyway and fitting treatment around the visit.
              </p>

              {/* Country chips stay unfilled until the clinic gives us the real
                  list. Inventing plausible countries would be inventing proof. */}
              {/*
                Six chips reading "Country 01 … Country 06 · CONFIRM" used to
                sit here, on the one page written for someone deciding whether
                to fly to Surat for treatment. Inventing a list would be worse,
                so the honest version is a sentence about what we do know.
              */}
              <p className="mt-7 text-sm leading-6 text-muted-foreground">
                Tell us which city you are flying from and how long you are in Surat. We will plan around your
                dates rather than ask you to plan around ours.
              </p>
            </div>

            <div>
              <h2 className="t-h2">Getting here</h2>
              {/*
                This block used to list four travel services — none of which
                the clinic has agreed to provide — under a sentence explaining
                that it had not agreed to provide them. With the "to confirm"
                tags hidden the same four rows read as a list of things we do,
                which is the opposite of what the copy was trying to say. The
                honest version is the part that is simply true about Surat.
              */}
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Both clinics are in Varachha, about twenty minutes apart. Tell us your arrival date and we will
                tell you what we can realistically fit in before you fly back.
              </p>
              {showContentGaps && (
                <ul className="mt-7 grid gap-2.5">
                  {travelSupport.map((item) => (
                    <li
                      key={item}
                      className={cn("flex min-h-14 items-center justify-between gap-4 rounded-xl border border-border bg-white px-5 text-sm", gapBorder)}
                    >
                      {item}
                      <PendingTag label="To confirm" />
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-white px-5 py-4 text-sm">
                <Plane className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span className="text-muted-foreground">
                  Surat has its own airport, and Mumbai and Ahmedabad are both within reach by road or rail.
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Proof ────────────────────────────────────────────────────────── */}
      <Section className="grain relative isolate bg-ink text-white" spacing="md">
        <Container width="7xl">
          <h2 className="t-h1">
            Before you decide from far away.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/50">
            You cannot walk past our clinic to see what it is like, so here is the independent version: both Google
            listings, patient videos and cases.
          </p>

          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {locations.map((location) => (
              <BranchGoogleCard key={location.slug} location={location} dark placement={`nri_google_${location.slug}`} />
            ))}
          </div>

          <div className="mt-10">
            <h3 className="t-h3">Patient videos</h3>
            <div className="mt-6">
              <VideoStoryGrid />
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container width="7xl">
          <h2 className="t-h2">Results</h2>
          <div className="mt-8">
            <CaseResultsGrid limit={3} />
          </div>
        </Container>
      </Section>

      {/* ── Enquiry ──────────────────────────────────────────────────────── */}
      <Section id="plan" className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <h2 className="t-h2">Start before you fly</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Your travel dates and the treatment you are asking about are enough to start. Please do not send
                medical reports in the first message; we will tell you where to send them.
              </p>
              <a
                href={whatsappUrl(NRI_MESSAGE)}
                target="_blank"
                rel="noreferrer"
                data-track="international_patient_contact"
                data-placement="nri_form"
                className="mt-6 inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-gold"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Or message us directly
                <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
              </a>
              <MediaFrame shot="Clinic exterior, Hirabaug" tone="light" ratio="4 / 3" className="mt-8" />
            </div>
            <ConsultationForm international />
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-14">
            <h2 className="t-h2">
              Questions patients ask from abroad
            </h2>
            <Accordion items={faqs} />
          </div>
        </Container>
      </Section>
    </>
  );
}
