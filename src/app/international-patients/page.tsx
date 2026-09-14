import type { Metadata } from "next";
import { Check } from "lucide-react";

import { GlobeSurat } from "@/components/kheni/art/diagrams";
import { BrandLine } from "@/components/kheni/brand-line";
import { ClinicShorts } from "@/components/kheni/clinic-shorts";
import { ConsultationForm } from "@/components/kheni/consultation-form";
import { CtaBand } from "@/components/kheni/cta-band";
import { ViewTracker } from "@/components/kheni/implant/view-tracker";
import { MediaFrame } from "@/components/kheni/media-frame";
import { PageHero } from "@/components/kheni/page-hero";
import { ProcessSteps } from "@/components/kheni/process-steps";
import { ProofPill } from "@/components/kheni/proof";
import { SectionIntro } from "@/components/kheni/section-intro";
import { TreatmentLine } from "@/components/kheni/treatment-cards";
import { Accordion } from "@/components/ui/accordion";
import { WhatsAppButton } from "@/components/ui/cta";
import { Container } from "@/components/ui/container";
import { languages } from "@/content/clinic-proof";
import { internationalPhoto } from "@/content/photos";
import { locations, treatments } from "@/content/site";
import { clinicVideos } from "@/content/videos";

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
  { question: "Can I plan everything before I fly?", answer: "You can plan the visit, the likely treatment and the number of appointments. The final plan is confirmed after an examination here, because a photo or a report from abroad cannot show everything." },
  { question: "Can implants be finished in one trip?", answer: "Often not. The bone needs time to bond with the implant before the final tooth is fitted, so many implant cases need two visits with months between them. We will say plainly what can be started on this trip and what would wait." },
  { question: "Which clinic should I come to?", answer: "Implant, full mouth and smile design work is led from the Elite Implant Center at Hirabaug. Everyday dentistry is available at both clinics. Tell us your case and we will suggest one." },
  { question: "How is the cost decided?", answer: "By the treatment needed after examination. The dentist explains the plan and the estimate before treatment starts. We do not publish prices online." },
  { question: "What happens if something bothers me after I get home?", answer: "Message the clinic on WhatsApp. For anything that needs looking at in person, we will help you understand what to tell a dentist where you live." },
];

/** The clinic's own clips of patients who travelled. Titles are the clinic's. */
const abroad = clinicVideos.filter((v) => ["eex02jLikGk", "7n0mOTFirzI"].includes(v.id));

export default function InternationalPage() {
  const popular = treatments.filter((t) => popularSlugs.includes(t.slug));
  return (
    <>
      <ViewTracker event="international_patient_contact" placement="international_page" />
      <PageHero eyebrow="NRI and international patients" title="Visiting Surat? Plan your dental care before you fly." highlight="before you fly" copy="Visiting family, or planning dental care during your India trip? Send your dates first. We will tell you what fits into your visit and what would need a second one." hue="coral" proof={false} aside={<GlobeSurat className="mood-blue mx-auto w-full max-w-[20rem] lg:max-w-none" />}>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <WhatsAppButton placement="international_hero" message={NRI_MESSAGE} label="Plan your visit on WhatsApp" track="international_patient_contact" size="lg" />
        </div>
        <ProofPill placement="international_hero" className="mt-5" />
      </PageHero>

      <section className="mood-coral py-10 sm:py-14 lg:py-20">
        <Container width="7xl" className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:gap-14">
          <div>
            <SectionIntro eyebrow="How a visit works" title="From your first message to your flight home." highlight={["first message", "flight home"]} />
            <ProcessSteps steps={journey} columns={5} className="mt-6 lg:grid-cols-1" />
          </div>
          <MediaFrame ratio="4 / 5" mobileRatio="16 / 9" from="lg" src={internationalPhoto.src} alt={internationalPhoto.alt} shape="smile-lg" />
        </Container>
      </section>

      <section className="bg-white py-10 sm:py-14 lg:py-20">
        <Container width="7xl" className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionIntro eyebrow="What to expect" title="What we can promise, and nothing we cannot." highlight="promise" />
            <ul className="mt-5 grid gap-2.5">
              {whatToExpect.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[1.02rem] font-semibold leading-snug">
                  <span className="mood-coral mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-coral text-ink">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="t-small mt-4 text-ink-soft">We speak {languages.join(", ")}. Ask us about anything else you need for the trip and we will tell you honestly what we can help with.</p>
          </div>
          <div>
            <SectionIntro eyebrow="Often planned around a trip" title="Treatments people travel for." highlight="travel for" />
            <div className="mt-3">
              {popular.map((t) => (
                <TreatmentLine key={t.slug} treatment={t} placement="international_treatments" />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {abroad.length > 0 && (
        <section className="on-dark mood-ink bg-ink py-10 text-white sm:py-14 lg:py-20">
          <Container width="7xl">
            <SectionIntro eyebrow="From the clinic, on YouTube" title="Patients who travelled to Surat." highlight="travelled" copy="Two clips from the clinic's own channel, titled as the clinic titled them. Nothing plays until you tap." />
            <ClinicShorts videos={abroad} limit={2} columns={3} tone="dark" placement="international_videos" className="mt-7" />
          </Container>
        </section>
      )}

      <BrandLine id="clinics" />

      <section className="mood-coral py-10 sm:py-14 lg:py-20">
        <Container width="7xl" className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionIntro eyebrow="Questions" title="Planning questions, answered plainly." highlight="plainly" />
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {locations.map((l) => (
                <li key={l.slug} className="py-3">
                  <p className="font-display text-lg font-extrabold tracking-[-.02em]">
                    {l.displayArea} · <span className="font-semibold text-ink-soft">{l.landmark}</span>
                  </p>
                  <p className="t-small text-ink-soft">{l.hours}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Accordion items={faqs} name="nri-faq" />
            <div className="mt-8">
              <ConsultationForm international />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand title="Send your dates before you book flights." highlight="before" copy="A short message is enough to start. We reply with what is realistic." placement="international_final" hue="coral" whatsappMessage={NRI_MESSAGE} />
    </>
  );
}
