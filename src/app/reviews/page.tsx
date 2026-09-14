import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { ClinicShorts } from "@/components/kheni/clinic-shorts";
import { CtaBand } from "@/components/kheni/cta-band";
import { InstagramReels } from "@/components/kheni/instagram-reels";
import { BranchProof, GoogleQuotes, ProofBig } from "@/components/kheni/proof";
import { ResultsPreview, hasResults } from "@/components/kheni/results-preview";
import { SectionIntro } from "@/components/kheni/section-intro";
import { Container } from "@/components/ui/container";
import { googleReputation, verifiedBranches } from "@/content/google-reputation";
import { featuredReels } from "@/content/instagram";
import { patientStories, videoStories } from "@/content/patient-stories";
import { locations } from "@/content/site";
import { videosFor } from "@/content/videos";
import { writeReviewUrl } from "@/lib/maps";

export const metadata: Metadata = {
  alternates: { canonical: "/reviews/" },
  title: "Patient Reviews",
  description:
    "Google reviews for both Kheni Dental clinics in Surat, at Yogi Chowk and Hirabaug, quoted exactly as written, plus short videos from the clinic and treatment results.",
};

/**
 * The reputation hub, in rhythm: the rating enormous, the three quotes,
 * each clinic's own listing, patients on video, the clinic on Instagram,
 * and a way to leave a review. Three kinds of evidence, kept visibly
 * separate: Google reviews, the clinic's own videos, and consented stories.
 */
export default function ReviewsPage() {
  const { sharedRating } = googleReputation;
  return (
    <>
      <section className="on-butter smile-cut bg-butter text-ink" style={{ ["--curve" as string]: "var(--cream)" }}>
        <Container width="7xl" className="pb-16 pt-9 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-16">
          <p className="t-eyebrow">Patient reviews · Google</p>
          <h1 className="t-h1 measure-head mt-3">{sharedRating ? "What Surat says about us, on Google." : "What patients say about both our clinics."}</h1>
          <ProofBig placement="reviews_hero" className="mt-8" />
        </Container>
      </section>

      <section className="py-10 sm:py-14 lg:py-20">
        <Container width="7xl">
          <SectionIntro eyebrow="In their words" title="Straight from the Google listings." highlight="Straight" copy="Quoted exactly as written, spelling and emoji included. Nothing here has been tidied up." />
          <GoogleQuotes placement="reviews_quotes" className="mt-7" />
        </Container>
      </section>

      <section className="bg-white py-10 sm:py-14 lg:py-20">
        <Container width="7xl">
          <SectionIntro eyebrow="By clinic" title="Each clinic keeps its own listing." highlight="its own listing" copy="Read the one you plan to visit." />
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {locations.map((l) => (
              <BranchProof key={l.slug} location={l} placement={`reviews_google_${l.slug}`} className="ring-1 ring-line" />
            ))}
          </div>
        </Container>
      </section>

      <section className="on-dark mood-ink bg-ink py-10 text-white sm:py-14 lg:py-20">
        <Container width="7xl">
          <SectionIntro eyebrow="Patient video · YouTube" title="Patients on the day their treatment finished." highlight="finished" copy="Short videos the clinic published on its own YouTube channel. Nothing plays until you tap it." />
          <ClinicShorts videos={videosFor({ kind: "patient" }, 6)} limit={6} tone="dark" placement="reviews_videos" className="mt-7" />
          <div className="mt-12">
            <SectionIntro eyebrow="Watch the experience · Instagram" title="Inside the clinic, from the clinic." highlight="from the clinic" copy="Reels from @khenielite. What a visit looks like, not what a review says it looks like." />
            <InstagramReels reels={featuredReels(5)} limit={5} placement="reviews_reels" className="mt-7" />
          </div>
        </Container>
      </section>

      {(patientStories.length > 0 || videoStories.length > 0) && (
        <section className="py-10 sm:py-14 lg:py-20">
          <Container width="7xl">
            <SectionIntro eyebrow="Clinic-supplied story" title="Stories given to the clinic." highlight="Stories" copy="Separate from Google, and published only where the patient has given written consent." />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {patientStories.map((story) => (
                <figure key={story.id} className="flex h-full flex-col rounded-[1.5rem] bg-white p-5">
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

      {hasResults && (
        <section className="py-10 sm:py-14 lg:py-20">
          <Container width="7xl">
            <SectionIntro eyebrow="Before and after" title="Results, shown honestly." highlight="honestly" />
            <ResultsPreview limit={2} className="mt-6" />
          </Container>
        </section>
      )}

      <section className="on-aqua mood-aqua bg-aqua py-10 text-ink sm:py-14 lg:py-20">
        <Container width="7xl" className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <SectionIntro eyebrow="Been treated with us?" title="Say so where it helps someone else." highlight="helps someone else" copy="Pick the clinic you were seen at, so your review lands on the right listing." />
          <div className="flex flex-col gap-2.5">
            {verifiedBranches.map((b) => (
              <a key={b.location.slug} href={writeReviewUrl(b.location)} target="_blank" rel="noreferrer" data-track="review_click" data-placement={`reviews_write_${b.location.slug}`} data-branch={b.location.slug} className="btn btn-ink btn-lg justify-between">
                Review {b.location.displayArea}
                <ArrowRight className="size-4 text-butter" aria-hidden="true" />
              </a>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title="Ready when you are." highlight="Ready" copy="Book a time at either clinic, or just message and tell us what is bothering you." placement="reviews_final" />
    </>
  );
}
