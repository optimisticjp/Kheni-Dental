import type { Metadata } from "next";

import { CtaBand } from "@/components/kheni/cta-band";
import { DoctorRoster, DoctorSpotlight } from "@/components/kheni/doctor-spotlight";
import { PageHero } from "@/components/kheni/page-hero";
import { ProofCluster } from "@/components/kheni/proof";
import { SectionIntro } from "@/components/kheni/section-intro";
import { SmileNote } from "@/components/kheni/smile-note";
import { Container } from "@/components/ui/container";
import { languages } from "@/content/clinic-proof";
import { locations, smileNotes } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/doctors/" },
  title: "Our Dentists in Surat",
  description:
    "Dr. Mayur Kheni, Dr. Jinali Monpara, Dr. Ishita Dobariya and Dr. Parita Vastarpara. Degrees, years of experience, colleges and areas of work at both Kheni Dental clinics in Surat.",
};

export default function DoctorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our dentists"
        title="Know who is treating you before you sit down."
        highlight="who"
        copy={`Four dentists across two clinics in Surat, led by Dr. Mayur Kheni. Consultations in ${languages.join(", ")}.`}
        hue="gold"
        compact
      />

      <section className="sec">
        <Container width="7xl">
          <DoctorSpotlight />
        </Container>
      </section>

      <section className="sec-b">
        <Container width="7xl">
          <SectionIntro eyebrow="The team" title="Three more dentists, each with their own area of work." highlight="area of work" copy="Degrees, years in practice and clinics are listed exactly as each doctor gave them on the clinic's information form." />
          <div className="mt-6">
            <DoctorRoster exclude="dr-mayur-kheni" />
          </div>
          <div className="mt-6 grid gap-3 rounded-[1.5rem] bg-sand p-5 sm:grid-cols-2 sm:p-6">
            {locations.map((l) => (
              <p key={l.slug} className="t-small text-ink-soft">
                <strong className="text-ink">{l.displayArea}:</strong> {l.note}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <SmileNote note={smileNotes[1]} compact className="sec-b" />

      <section className="sec-b">
        <Container width="7xl">
          <ProofCluster placement="doctors_proof" />
        </Container>
      </section>

      <CtaBand title="Book with the dentist who fits your problem." highlight="fits" copy="Or just tell us what is bothering you. We will work out who you should see, and at which clinic." placement="doctors_final" />
    </>
  );
}
