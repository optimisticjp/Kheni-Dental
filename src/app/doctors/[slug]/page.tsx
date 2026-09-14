import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BrandLine } from "@/components/kheni/brand-line";
import { ClinicShorts } from "@/components/kheni/clinic-shorts";
import { CtaBand } from "@/components/kheni/cta-band";
import { DoctorFeature, TeamLink } from "@/components/kheni/doctors";
import { ViewTracker } from "@/components/kheni/implant/view-tracker";
import { InstagramReels } from "@/components/kheni/instagram-reels";
import { ProofPill } from "@/components/kheni/proof";
import { SectionIntro } from "@/components/kheni/section-intro";
import { TreatmentLine } from "@/components/kheni/treatment-cards";
import { Container } from "@/components/ui/container";
import { reelsFor } from "@/content/instagram";
import { doctors, locations, treatments } from "@/content/site";
import { videosFor } from "@/content/videos";

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
  const videos = videosFor({ doctorSlug: doctor.slug }, 3);
  const reels = reelsFor({ doctorSlug: doctor.slug }, 3);

  return (
    <>
      <ViewTracker event="doctor_profile_view" placement={`doctor_${doctor.slug}`} />
      <section className={`mood-${doctor.hue} bg-m-tint py-8 sm:py-12 lg:py-16`}>
        <Container width="7xl">
          <DoctorFeature doctor={doctor} as="h1" placement={`doctor_${doctor.slug}`} />
        </Container>
      </section>

      <section className={`mood-${doctor.hue} py-10 sm:py-14 lg:py-20`}>
        <Container width="7xl" className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <div>
            <SectionIntro eyebrow="Treatments" title={`What ${doctor.shortName} works with.`} highlight={doctor.shortName} />
            <div className="mt-4">
              {related.map((t) => (
                <TreatmentLine key={t.slug} treatment={t} placement={`doctor_${doctor.slug}`} />
              ))}
            </div>
          </div>
          <div>
            <SectionIntro eyebrow="Where" title="Two clinics in Surat." highlight="Two clinics" copy="Call the clinic you plan to visit to check which days this dentist is there." />
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {locations.map((l) => (
                <li key={l.slug} className="py-4">
                  <p className="font-display text-xl font-extrabold tracking-[-.03em]">{l.displayArea}</p>
                  <p className="t-small mt-0.5 text-ink-soft">{l.landmark}</p>
                  <p className="t-small mt-1 text-ink-soft">{l.hours}</p>
                </li>
              ))}
            </ul>
            <ProofPill placement={`doctor_proof_${doctor.slug}`} className="mt-5" />
          </div>
        </Container>
      </section>

      {(videos.length > 0 || reels.length > 0) && (
        <section className="on-dark mood-ink bg-ink py-10 text-white sm:py-14 lg:py-20">
          <Container width="7xl">
            <SectionIntro eyebrow="From the clinic" title={`${doctor.shortName}, on camera.`} highlight={doctor.shortName} copy="Real clips from the clinic's own channels. Nothing plays until you tap." />
            {reels.length > 0 && <InstagramReels reels={reels} limit={3} placement={`doctor_reels_${doctor.slug}`} className="mt-7" />}
            {videos.length > 0 && <ClinicShorts videos={videos} limit={3} columns={3} tone="dark" placement={`doctor_videos_${doctor.slug}`} className="mt-7" />}
          </Container>
        </section>
      )}

      <BrandLine line={{ id: doctor.slug, line: doctor.philosophy, highlight: "", hue: doctor.hue }} />

      <section className="py-8 sm:py-10">
        <Container width="7xl">
          <TeamLink />
        </Container>
      </section>

      <CtaBand title={`Book an appointment with ${doctor.name}.`} highlight={doctor.name} placement={`doctor_final_${doctor.slug}`} whatsappMessage={message} />
    </>
  );
}
