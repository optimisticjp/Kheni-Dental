import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { BranchGoogleCard } from "@/components/kheni/branch-google-card";
import { CaseResultsGrid } from "@/components/kheni/case-results";
import { PriceTable } from "@/components/kheni/capability-grids";
import { ConsultationForm } from "@/components/kheni/consultation-form";
import { PendingTag } from "@/components/kheni/pending";
import { ProofBand } from "@/components/kheni/proof-band";
import { PatientStoryGrid } from "@/components/kheni/stories";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { nriStats } from "@/content/clinic-proof";
import { locations, treatments } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "International & NRI Patients",
  description:
    "Planning dental treatment in Surat from abroad. Send your dates, get a treatment plan before you fly, and know how many visits to expect.",
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

const steps = [
  { title: "Send your dates", copy: "Message us with when you will be in Surat and what is bothering you." },
  { title: "Plan before you fly", copy: "We tell you what can realistically be done in that window." },
  { title: "Examination on arrival", copy: "Your first appointment confirms the plan and the stages." },
  { title: "Treatment and review", copy: "Some treatment finishes in one trip. Some needs a second." },
];

export default function InternationalPage() {
  const popular = popularSlugs
    .map((slug) => treatments.find((t) => t.slug === slug))
    .filter((t): t is (typeof treatments)[number] => Boolean(t));

  return (
    <>
      <section className="bg-ink text-white">
        <Container width="7xl" className="grid gap-10 py-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:py-16">
          <div>
            <p className="text-[.7rem] font-semibold uppercase tracking-[.24em] text-gold">International &amp; NRI</p>
            <h1 className="mt-4 font-serif text-[clamp(2.1rem,5.4vw,3.8rem)] leading-[1] tracking-[-.045em]">
              Coming to Surat? Plan your treatment first.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/62">
              Send your travel dates before you book flights. We will tell you what fits into your trip and what
              would need a second visit.
            </p>
            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
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
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold sm:whitespace-nowrap"
              >
                Send an enquiry
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[.03] p-6 sm:p-8">
            <ProofBand stats={nriStats} className="grid-cols-2 lg:grid-cols-2" />
          </div>
        </Container>
      </section>

      {/* Popular treatments */}
      <Section spacing="md">
        <Container width="7xl">
          <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">
            What NRI patients come for
          </h2>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((treatment) => (
              <li key={treatment.slug}>
                <Link
                  href={`/treatments/${treatment.slug}/`}
                  data-track="treatment_view"
                  data-placement="nri_treatments"
                  className="flex min-h-[4.5rem] items-center rounded-2xl border border-border bg-card px-5 py-4 font-serif text-lg leading-tight hover:border-gold/50"
                >
                  {treatment.title}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* How it works */}
      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">How it works</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-border bg-white p-5">
                <span aria-hidden="true" className="font-serif text-2xl text-gold/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-lg leading-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.copy}</p>
              </li>
            ))}
          </ol>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {["Airport to clinic distance", "Accommodation support", "Treatment time required"].map((item) => (
              <div key={item} className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-border bg-white px-4 py-3 text-sm">
                {item}
                <PendingTag label="To confirm" />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Cost */}
      <Section spacing="md">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
            <div>
              <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Treatment costs</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Ask for a written plan with the cost of each stage before you travel.
              </p>
            </div>
            <PriceTable />
          </div>
        </Container>
      </Section>

      {/* Proof */}
      <Section className="bg-ink text-white" spacing="md">
        <Container width="7xl">
          <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Before you decide</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {locations.map((location) => (
              <BranchGoogleCard key={location.slug} location={location} dark placement={`nri_google_${location.slug}`} />
            ))}
          </div>
          <div className="mt-8">
            <PatientStoryGrid tone="dark" />
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container width="7xl">
          <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Results</h2>
          <div className="mt-8">
            <CaseResultsGrid limit={3} />
          </div>
        </Container>
      </Section>

      {/* Enquiry */}
      <Section id="plan" className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Send an enquiry</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Your dates and the treatment you are asking about are enough to start. Please do not send medical
                reports in the first message.
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
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
            <ConsultationForm international />
          </div>
        </Container>
      </Section>
    </>
  );
}
