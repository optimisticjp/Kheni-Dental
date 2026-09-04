import type { Metadata } from "next";
import { Check } from "lucide-react";

import { GlobeSurat } from "@/components/kheni/art/diagrams";
import { ConsultationForm } from "@/components/kheni/consultation-form";
import { CtaBand } from "@/components/kheni/cta-band";
import { ViewTracker } from "@/components/kheni/implant/view-tracker";
import { PageHero } from "@/components/kheni/page-hero";
import { ProcessSteps } from "@/components/kheni/process-steps";
import { ProofCluster } from "@/components/kheni/proof";
import { SectionIntro } from "@/components/kheni/section-intro";
import { SmileNote } from "@/components/kheni/smile-note";
import { TreatmentRow } from "@/components/kheni/treatment-poster";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/ui/cta";
import { languages } from "@/content/clinic-proof";
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

/** Five stages of a visit. Only what the clinic actually does. */
const journey = [
  { title: "Before you travel", copy: "Message us your dates and what you would like looked at. If you have recent X-rays or reports, share them if asked. We reply with what is realistic in that window." },
  { title: "Plan the clinic visit", copy: "We suggest which clinic suits your case and pencil in the first appointment around your arrival." },
  { title: "Examination confirms the plan", copy: "Nothing is fixed until a dentist has examined you here. If what we find changes the plan, you hear it before anything starts." },
  { title: "Treatment", copy: "Appointments are grouped so you are not travelling back and forth. Some cases finish on one trip; implants and full mouth work need healing time between stages." },
  { title: "Follow-up", copy: "You leave with written instructions and a way to reach the clinic. Questions after you are home can come by WhatsApp." },
];

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
    answer: "Implant, full mouth and smile design work is led from the Elite Implant Center at Hirabaug. Everyday dentistry is available at both clinics. Tell us your case and we will suggest one.",
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
        hue="coral"
        aside={<GlobeSurat className="mx-auto w-full max-w-[20rem] lg:max-w-none" />}
      >
        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <WhatsAppButton placement="international_hero" message={NRI_MESSAGE} label="Plan your visit on WhatsApp" track="international_patient_contact" />
        </div>
      </PageHero>

      <section className="hue-coral py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <SectionIntro eyebrow="How a visit works" title="From your first message to your flight home." highlight="flight home" />
          <ProcessSteps steps={journey} columns={5} className="mt-6 sm:mt-8" />
        </Container>
      </section>

      <section className="hue-coral bg-coral-tint py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div>
              <SectionIntro eyebrow="What to expect" title="What we can promise, and nothing we cannot." highlight="promise" />
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {whatToExpect.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 text-[.9375rem] font-medium leading-snug">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-coral text-ink">
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

      <SmileNote index={2} compact className="py-10 sm:py-14" />

      <section className="hue-coral pb-10 sm:pb-14 lg:pb-18">
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
