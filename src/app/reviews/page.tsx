import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { ClinicShorts } from "@/components/kheni/clinic-shorts";
import { CtaBand } from "@/components/kheni/cta-band";
import { PageHero } from "@/components/kheni/page-hero";
import { BranchProof, GoogleQuotes, ProofCluster } from "@/components/kheni/proof";
import { ResultsPreview } from "@/components/kheni/results-preview";
import { SectionIntro } from "@/components/kheni/section-intro";
import { Container } from "@/components/ui/container";
import { googleReputation, verifiedBranches } from "@/content/google-reputation";
import { patientStories, videoStories } from "@/content/patient-stories";
import { locations } from "@/content/site";
import { writeReviewUrl } from "@/lib/maps";

export const metadata: Metadata = {
  alternates: { canonical: "/reviews/" },
  title: "Patient Reviews",
  description:
    "Google reviews for both Kheni Dental clinics in Surat, at Yogi Chowk and Hirabaug, quoted exactly as written, plus short videos from the clinic and treatment results.",
};

/**
 * The reputation hub. Three kinds of evidence, kept visibly separate:
 * Google reviews (independent, per branch), the clinic's own videos, and
 * clinic-supplied stories with consent. They are never blended.
 */
export default function ReviewsPage() {
  const { sharedRating, combinedReviews } = googleReputation;
  return (
    <>
      <PageHero
        eyebrow="Patient reviews"
        title={sharedRating ? `${sharedRating} on Google, across both our clinics.` : "What patients say about both our clinics."}
        highlight={sharedRating ?? undefined}
        copy={`${combinedReviews} reviews, counted across two separate clinic listings. Each clinic keeps its own, so you can read the one you plan to visit.`}
        hue="sunshine"
        proof={false}
        aside={<ProofCluster placement="reviews_hero" />}
      />

      <section className="py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <SectionIntro eyebrow="Google review" title="Reviews by clinic." highlight="by clinic" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {locations.map((l) => (
              <BranchProof key={l.slug} location={l} placement={`reviews_google_${l.slug}`} />
            ))}
          </div>
          <SectionIntro eyebrow="In their words" title="Straight from the Google listings." highlight="Straight" copy="Quoted exactly as written, spelling and emoji included. Nothing here has been tidied up." className="mt-10" />
          <GoogleQuotes placement="reviews_quotes" className="mt-6" />
        </Container>
      </section>

      <section className="hue-violet bg-violet-tint py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <SectionIntro eyebrow="Video from the clinic" title="Patients on the day their treatment finished." highlight="finished" copy="Short videos the clinic published on its own YouTube channel. Nothing plays until you tap it." />
          <ClinicShorts limit={6} kind="patient" className="mt-6" />
        </Container>
      </section>

      {(patientStories.length > 0 || videoStories.length > 0) && (
        <section className="py-10 sm:py-14 lg:py-18">
          <Container width="7xl">
            <SectionIntro eyebrow="Patient story" title="Stories given to the clinic." highlight="Stories" copy="Separate from Google, and published only where the patient has given written consent." />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {patientStories.map((story) => (
                <figure key={story.id} className="flex h-full flex-col rounded-2xl border border-line bg-white p-5">
                  <blockquote className="t-body flex-1">{story.quote}</blockquote>
                  <figcaption className="t-small mt-4 border-t border-line pt-3 text-ink-soft">
                    <span className="font-semibold text-ink">{story.name}</span>
                    {story.city ? ` · ${story.city}` : ""} · {story.treatment}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="hue-sunshine py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <SectionIntro eyebrow="Before and after" title="Results, shown honestly." highlight="honestly" />
          <ResultsPreview limit={2} placement="reviews_results" className="mt-6" />
        </Container>
      </section>

      <section className="hue-teal bg-teal-tint py-10 sm:py-14 lg:py-18">
        <Container width="7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <SectionIntro eyebrow="Been treated with us?" title="Say so where it helps someone else." highlight="helps someone else" copy="Pick the clinic you were seen at, so your review lands on the right listing." />
            <div className="flex flex-col gap-2.5">
              {verifiedBranches.map((b) => (
                <a
                  key={b.location.slug}
                  href={writeReviewUrl(b.location)}
                  target="_blank"
                  rel="noreferrer"
                  data-track="review_click"
                  data-placement={`reviews_write_${b.location.slug}`}
                  data-branch={b.location.slug}
                  className="inline-flex min-h-13 items-center justify-between gap-4 rounded-full bg-ink px-6 text-[.9375rem] font-semibold text-white"
                >
                  Review {b.location.displayArea}
                  <ArrowRight className="cta-arrow size-4 text-sunshine" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CtaBand title="Ready when you are." highlight="Ready" copy="Book a time at either clinic, or just message and tell us what is bothering you." placement="reviews_final" hue="sunshine" />
    </>
  );
}
