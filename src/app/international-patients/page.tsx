import type { Metadata } from "next";
import { Check } from "lucide-react";

import { GlobeSurat } from "@/components/kheni/art/diagrams";
import { ConsultationForm } from "@/components/kheni/consultation-form";
import { CtaBand } from "@/components/kheni/cta-band";
import { ViewTracker } from "@/components/kheni/implant/view-tracker";
import { PageHero } from "@/components/kheni/page-hero";
import { ProcessSteps } from "@/components/kheni/process-steps";
import { MetricRow, ProofCluster } from "@/components/kheni/proof";
import { SampleTag } from "@/components/kheni/sample-tag";
import { MediaFrame } from "@/components/kheni/media-frame";
import { SectionIntro } from "@/components/kheni/section-intro";
import { internationalPhoto } from "@/content/photos";
import { SmileNote } from "@/components/kheni/smile-note";
import { TreatmentRow } from "@/components/kheni/treatment-poster";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/ui/cta";
import { languages, metricsFor } from "@/content/clinic-proof";
import { sampleNriWorkflow } from "@/content/review-sample";
import { locations, treatments } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/international-patients/" },
  title: "NRI & International Patients",
  description:
    "Dental care in Surat for NRIs and international visitors. Send your travel dates before you fly, find out what fits into your trip, and plan the visit on WhatsApp with Kheni Dental.",
};

const NRI_MESSAGE = "Hello Kheni Dental, I live abroad and would like to plan dental treatment during a visit to Surat. Here are my dates:";

/** Treatments patients most often plan a trip around. */
const popularSlugs = ["dental-implants-surat", "full-mouth-rehabilitation", "cosmetic-smile-dentistry", "crowns-and-bridges"];

/**
 * The planning workflow. Page 55 of the clinic form ticked nothing, so the
 * steps are the review sample from review-sample.ts, marked SAMPLE until the
 * clinic confirms each one. Nothing about airports, hotels or visas.
 */
const journey = sampleNriWorkflow.steps;
const nriMetrics = metricsFor("nri");

/** Plain facts, none of them a travel-agency promise. */
const whatToExpect = [
  "Consultations in Gujarati, Hindi and English",
  "Two clinics in Surat, at Yogi Chowk and Hirabaug",
  "An examination before any plan is confirmed",
  "Staged treatments explained before you commit",
  "WhatsApp for questions before and after your trip",
  "Written aftercare instructions to take home",
];

const faqs = [
  {
    question: "Can I plan everything before I fly?",
    answer: "You can plan the visit, the likely treatment and the number of appointments. The final plan is confirmed after an examination here, because a photo or a report from abroad cannot show everything.",
  },
  {
    question: "Can implants be finished in one trip?",
    answer: "Often not. The bone needs time to bond with the implant before the final tooth is fitted, so many implant cases need two visits with months between them. We will say plainly what can be started on this trip and what would wait.",
  },
  {
    question: "Which clinic should I come to?",
    answer: "Both clinics offer everyday dentistry and implant consultations. Tell us your case and where you will be staying, and we will suggest the one that is easier for you.",
  },
  {
    question: "How is the cost decided?",
    answer: "By the treatment needed after examination. The dentist explains the plan and the estimate before treatment starts. We do not publish prices online.",
  },
  {
    question: "What happens if something bothers me after I get home?",
    answer: "Message the clinic on WhatsApp. For anything that needs looking at in person, we will help you understand what to tell a dentist where you live.",
  },
];

export default function InternationalPage() {
  const popular = treatments.filter((t) => popularSlugs.includes(t.slug));
  return (
    <>
      <ViewTracker event="international_patient_contact" placement="international_page" />
      <PageHero
        eyebrow="NRI and international patients"
        title="Dental care in Surat for NRIs and international visitors."
        highlight="Surat"
        copy="Visiting family, or planning dental care during your India trip? Send your dates first. We will tell you what fits into your visit and what would need a second one."
        hue="sky"
        aside={<div className="rounded-[1.5rem] border border-ivory/10 bg-ivory p-4 lg:ml-auto lg:max-w-md"><GlobeSurat className="mx-auto w-full max-w-[20rem] lg:max-w-none" /></div>}
      >
        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <WhatsAppButton placement="international_hero" message={NRI_MESSAGE} label="Plan your visit on WhatsApp" track="international_patient_contact" />
        </div>
      </PageHero>

      <section className="py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-12">
            <div>
              <SectionIntro eyebrow="How a visit works" title="From your first message to your flight home." highlight={["first message", "flight home"]} />
              {sampleNriWorkflow.status === "review_sample" && (
                <p className="t-small mt-3 flex items-center gap-2 text-ink-soft">
                  <SampleTag />
                  Workflow shown for review. Each step is confirmed with the clinic before launch.
                </p>
              )}
              <ProcessSteps steps={journey} columns={3} className="mt-6 sm:mt-8" variant="cards" dense />
              {nriMetrics.length > 0 && <MetricRow metrics={nriMetrics} className="mt-6 max-w-md" />}
            </div>
            <MediaFrame
              ratio="4 / 3"
              mobileRatio="16 / 9"
              from="lg"
              src={internationalPhoto.src}
              alt={internationalPhoto.alt}
              className="rounded-[1.5rem] ring-1 ring-line"
            />
          </div>
        </Container>
      </section>

      <section className="bg-sky py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div>
              <SectionIntro eyebrow="What to expect" title="What we can promise, and nothing we cannot." highlight="promise" />
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {whatToExpect.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 text-[.9375rem] font-medium leading-snug">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ink text-gold">
                      <Check className="size-3" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="t-small mt-4 text-ink-soft">We speak {languages.join(", ")}. Ask us about anything else you need for the trip and we will tell you honestly what we can help with.</p>
            </div>
            <div>
              <SectionIntro eyebrow="Often planned around a trip" title="Treatments people travel for." highlight="travel for" />
              <div className="mt-5 grid gap-3">
                {popular.map((t) => (
                  <TreatmentRow key={t.slug} treatment={t} placement="international_treatments" />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SmileNote index={2} compact tone="dark" className="py-10 sm:py-14" />

      <section className="pb-10 sm:pb-14 lg:pb-18">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
            <div>
              <SectionIntro eyebrow="Questions" title="Planning questions, answered plainly." highlight="plainly" />
              <ProofCluster placement="international_proof" className="mt-6" />
              <ul className="mt-4 grid gap-2">
                {locations.map((l) => (
                  <li key={l.slug} className={`hue-${l.hue} rounded-xl bg-h-tint px-4 py-3`}>
                    <p className="text-sm font-semibold">{l.displayArea} · {l.landmark}</p>
                    <p className="t-small text-ink-soft">{l.hours}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Accordion items={faqs} name="nri-faq" />
              <div className="mt-6">
                <ConsultationForm international />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand title="Send your dates before you book flights." highlight="before" copy="A short message is enough to start. We reply with what is realistic." placement="international_final" hue="coral" whatsappMessage={NRI_MESSAGE} />
    </>
  );
}
