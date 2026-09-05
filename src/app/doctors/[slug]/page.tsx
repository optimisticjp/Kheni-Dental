import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/kheni/cta-band";
import { DoctorSpotlight, TeamLink } from "@/components/kheni/doctor-spotlight";
import { ViewTracker } from "@/components/kheni/implant/view-tracker";
import { ProofCluster } from "@/components/kheni/proof";
import { SectionIntro } from "@/components/kheni/section-intro";
import { SmileNote } from "@/components/kheni/smile-note";
import { TreatmentRow } from "@/components/kheni/treatment-poster";
import { Container } from "@/components/ui/container";
import { doctors, locations, treatments } from "@/content/site";
import { DoctorCredentials } from "@/components/kheni/demo/credentials";
import { TestimonialCard } from "@/components/kheni/demo/testimonial-wall";
import { demoContentActive, demoTestimonials } from "@/content/demo";

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
  const message = `Hello Kheni Dental, I would like to book an appointment with ${doctor.name}. Thank you.`;

  return (
    <>
      <ViewTracker event="doctor_profile_view" placement={`doctor_${doctor.slug}`} />
      <section className="py-6 sm:py-10 lg:py-14">
        <Container width="7xl">
          <DoctorSpotlight doctor={doctor} as="h1" />
        </Container>
      </section>

      <SmileNote note={{ line: doctor.philosophy, highlight: "", hue: doctor.hue }} compact className="pb-8 sm:pb-12" />

      <section className={`hue-${doctor.hue} pb-10 sm:pb-14 lg:pb-18`}>
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
              <SectionIntro eyebrow="Where" title="Two clinics in Surat." highlight="Two clinics" copy="Call the clinic you plan to visit to check which days this dentist is there." />
              <ul className="mt-5 grid gap-3">
                {locations.map((l) => (
                  <li key={l.slug} className={`hue-${l.hue} rounded-2xl bg-h-tint p-4`}>
                    <p className="font-semibold">{l.displayArea}</p>
                    <p className="t-small mt-0.5 text-ink-soft">{l.landmark}</p>
                    <p className="t-small mt-1 text-ink-soft">{l.hours}</p>
                  </li>
                ))}
              </ul>
              <ProofCluster placement={`doctor_proof_${doctor.slug}`} className="mt-4" />
            </div>
          </div>
          <TeamLink />
        </Container>
      </section>

      {demoContentActive && (
        <section className={`hue-${doctor.hue} bg-h-tint py-10 sm:py-14 lg:py-18`}>
          <Container width="7xl">
            <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-12">
              <div>
                <SectionIntro eyebrow="Qualifications" title={`Where ${doctor.shortName} learned all this.`} highlight={doctor.shortName} />
                <DoctorCredentials doctorSlug={doctor.slug} className="mt-6" />
              </div>
              <div>
                <SectionIntro eyebrow="Patients" title={`People who sat in ${doctor.shortName}'s chair.`} highlight={doctor.shortName} />
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {demoTestimonials
                    .filter((t) => doctor.relatedTreatmentSlugs.includes(t.treatmentSlug))
                    .slice(0, 4)
                    .map((story) => (
                      <TestimonialCard key={story.id} story={story} />
                    ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      <CtaBand title={`Book an appointment with ${doctor.name}.`} highlight={doctor.name} placement={`doctor_final_${doctor.slug}`} hue={doctor.hue} whatsappMessage={message} />
    </>
  );
}
