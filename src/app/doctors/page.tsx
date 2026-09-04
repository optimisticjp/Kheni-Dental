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
    "Dr. Mayur Kheni, Dr. Jinal Monapara, Dr. Ishita Dobariya and Dr. Parita Vastarpara. Degrees, years of experience and areas of work at both Kheni Dental clinics in Surat.",
};

export default function DoctorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our dentists"
        title="Know who is treating you before you sit down."
        highlight="who"
        copy={`Four dentists across two clinics in Surat, led by Dr. Mayur Kheni. Consultations in ${languages.join(", ")}.`}
        hue="cobalt"
        compact
      />

      <section className="py-8 sm:py-12 lg:py-16">
        <Container width="7xl">
          <DoctorSpotlight />
        </Container>
      </section>

      <section className="bg-porcelain pb-10 sm:pb-14 lg:pb-18">
        <Container width="7xl">
          <SectionIntro eyebrow="The team" title="Three more dentists, each with their own area of work." highlight="area of work" copy="Degrees and years in practice are listed exactly as each doctor gave them." />
          <div className="mt-6">
            <DoctorRoster exclude="dr-mayur-kheni" />
          </div>
          <div className="mt-6 grid gap-3 rounded-[1.5rem] bg-cobalt-tint p-5 sm:grid-cols-2 sm:p-6">
            {locations.map((l) => (
              <p key={l.slug} className="t-small text-ink-soft">
                <strong className="text-ink">{l.displayArea}:</strong> {l.note}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <SmileNote note={smileNotes[1]} compact className="pb-10 sm:pb-14" />

      <section className="pb-10 sm:pb-14 lg:pb-18">
        <Container width="7xl">
          <ProofCluster placement="doctors_proof" />
        </Container>
      </section>

      <CtaBand title="Book with the dentist who fits your problem." highlight="fits" copy="Or tell us what is troubling you and we will suggest who to see and where." placement="doctors_final" />
    </>
  );
}
