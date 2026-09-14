import type { Metadata } from "next";

import { ClinicShorts } from "@/components/kheni/clinic-shorts";
import { CtaBand } from "@/components/kheni/cta-band";
import { DoctorFeature, DoctorRoster } from "@/components/kheni/doctors";
import { PageHero } from "@/components/kheni/page-hero";
import { ProofBig } from "@/components/kheni/proof";
import { SectionIntro } from "@/components/kheni/section-intro";
import { Container } from "@/components/ui/container";
import { languages } from "@/content/clinic-proof";
import { locations } from "@/content/site";
import { videosFor } from "@/content/videos";

export const metadata: Metadata = {
  alternates: { canonical: "/doctors/" },
  title: "Our Dentists in Surat",
  description:
    "Dr. Mayur Kheni, Dr. Jinal Monapara, Dr. Ishita Dobariya and Dr. Parita Vastarpara. Degrees, years of experience and areas of work at both Kheni Dental clinics in Surat.",
};

export default function DoctorsPage() {
  const jinal = videosFor({ doctorSlug: "dr-jinal-monapara" }, 3);
  return (
    <>
      <PageHero eyebrow="Our dentists" title="Know who is treating you before you sit down." highlight="who" copy={`Four dentists across two clinics in Surat, led by Dr. Mayur Kheni. Consultations in ${languages.join(", ")}.`} hue="coral" compact />

      <section className="mood-blue py-10 sm:py-14 lg:py-20">
        <Container width="7xl">
          <DoctorFeature placement="doctors_feature" />
        </Container>
      </section>

      <section className="bg-white py-10 sm:py-14 lg:py-20">
        <Container width="7xl">
          <SectionIntro eyebrow="The team" title="Three more dentists, each with their own area of work." highlight="their own area" copy="Degrees and years in practice are listed exactly as each doctor gave them." />
          <div className="mt-8">
            <DoctorRoster exclude="dr-mayur-kheni" placement="doctors_roster" />
          </div>
        </Container>
      </section>

      {jinal.length > 0 && (
        <section className="on-dark mood-ink bg-ink py-10 text-white sm:py-14 lg:py-20">
          <Container width="7xl">
            <SectionIntro eyebrow="From the clinic, on YouTube" title="A few minutes with Dr. Jinal, in Gujarati." highlight="Dr. Jinal" copy="Tooth structure, bridges and implants, and stains. Nothing plays until you tap." />
            <ClinicShorts videos={jinal} limit={3} columns={3} tone="dark" placement="doctors_videos" className="mt-7" />
          </Container>
        </section>
      )}

      <section className="on-aqua mood-aqua bg-aqua py-10 text-ink sm:py-14 lg:py-20">
        <Container width="7xl" className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          {locations.map((l) => (
            <div key={l.slug}>
              <p className="t-eyebrow">{l.displayArea}</p>
              <p className="t-h3 mt-2">{l.note}</p>
            </div>
          ))}
          <p className="t-small lg:col-span-2">Call the clinic you plan to visit to check which days a particular dentist is there.</p>
        </Container>
      </section>

      <section className="on-butter bg-butter py-12 text-ink sm:py-16 lg:py-24">
        <Container width="7xl">
          <ProofBig placement="doctors_proof" />
        </Container>
      </section>

      <CtaBand title="Book with the dentist who fits your problem." highlight="fits your problem" copy="Or tell us what is troubling you and we will suggest who to see and where." placement="doctors_final" />
    </>
  );
}
