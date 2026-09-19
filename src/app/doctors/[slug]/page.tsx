import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/kheni/cta-band";
import { DoctorSpotlight, doctorBranches, TeamLink } from "@/components/kheni/doctor-spotlight";
import { ViewTracker } from "@/components/kheni/implant/view-tracker";
import { ProofCluster } from "@/components/kheni/proof";
import { SectionIntro } from "@/components/kheni/section-intro";
import { SmileNote } from "@/components/kheni/smile-note";
import { TreatmentRow } from "@/components/kheni/treatment-poster";
import { Container } from "@/components/ui/container";
import { editorialLines } from "@/content/review-sample";
import { availabilityNote, doctors, isByAppointmentAt, treatments } from "@/content/site";

export function generateStaticParams() {
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doctor = doctors.find((d) => d.slug === slug);
  if (!doctor) return {};
  return { title: `${doctor.name}, ${doctor.credentials}`, description: doctor.metaDescription, alternates: { canonical: `/doctors/${slug}/` } };
}

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doctor = doctors.find((d) => d.slug === slug);
  if (!doctor) notFound();

  const related = treatments.filter((t) => doctor.relatedTreatmentSlugs.includes(t.slug));
  const branches = doctorBranches(doctor);
  const line = editorialLines.find((l) => l.doctorSlug === doctor.slug);
  const message = `Hello Kheni Dental, I would like to book an appointment with ${doctor.name}. Thank you.`;

  return (
    <>
      <ViewTracker event="doctor_profile_view" placement={`doctor_${doctor.slug}`} />
      <section className="sec-tight">
        <Container width="7xl">
          <DoctorSpotlight doctor={doctor} as="h1" credentials />
        </Container>
      </section>

      {/* An editorial line in the site's voice, not a quotation. Dr. Jinali's
          is built from her own words on the form; the others are samples. */}
      {line && <SmileNote note={{ line: line.line, highlight: line.highlight, hue: doctor.hue }} compact tone="dark" className="sec-b" />}

      <section className={`hue-${doctor.hue} sec-b`}>
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
            <div>
              <SectionIntro eyebrow="Treatments" title={`What ${doctor.shortName} works with.`} highlight={doctor.shortName} />
              <div className="mt-5 grid gap-3">
                {related.map((t) => (
                  <TreatmentRow key={t.slug} treatment={t} placement={`doctor_${doctor.slug}`} />
                ))}
              </div>
            </div>
            <div>
              <SectionIntro
                eyebrow="Where"
                title={branches.length === 1 ? `At our ${branches[0].displayArea} clinic.` : "At both clinics in Surat."}
                highlight={branches.length === 1 ? branches[0].displayArea : "both clinics"}
                copy={branches.length === 1 ? undefined : "Call the clinic you plan to visit to check which days this dentist is there."}
              />
              <ul className="mt-5 grid gap-3">
                {branches.map((l) => (
                  <li key={l.slug} className={`hue-${l.hue} rounded-2xl bg-h-tint p-4`}>
                    <p className="font-semibold">{l.displayArea}</p>
                    <p className="t-small mt-0.5 text-ink-soft">{l.landmark}</p>
                    <p className="t-small mt-1 text-ink-soft">{l.hours}</p>
                    {isByAppointmentAt(doctor, l.slug) && <p className="t-small mt-1 text-ink-soft">{availabilityNote(doctor)}</p>}
                  </li>
                ))}
              </ul>
              <ProofCluster placement={`doctor_proof_${doctor.slug}`} className="mt-4" />
            </div>
          </div>
          <TeamLink />
        </Container>
      </section>

      <CtaBand title={`Book an appointment with ${doctor.name}.`} highlight={doctor.name} placement={`doctor_final_${doctor.slug}`} hue={doctor.hue} whatsappMessage={message} location={branches.length === 1 ? branches[0] : undefined} />
    </>
  );
}
