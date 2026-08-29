import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Quote, Star } from "lucide-react";

import { BranchGoogleCard } from "@/components/kheni/branch-google-card";
import { CaseResultsGrid } from "@/components/kheni/case-results";
import { PageHero } from "@/components/kheni/page-hero";
import { PatientStoryGrid, VideoStoryGrid } from "@/components/kheni/stories";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { googleReputation, verifiedBranches } from "@/content/google-reputation";
import { locations, reviewHighlights } from "@/content/site";
import { writeReviewUrl } from "@/lib/maps";

export const metadata: Metadata = {
  title: "Patient Reviews",
  description:
    "Google reviews for both Kheni Dental clinics in Surat, at Yogi Chowk and Hirabaug, plus patient videos, written testimonials and treatment results.",
};

/**
 * The reputation hub.
 *
 * Three deliberately separate layers, in descending order of independence:
 *
 *   1. Google      other people's verdict, on Google's platform, per branch
 *   2. Videos      the patient's own face and voice, with consent
 *   3. Written     testimonials given to the clinic
 *
 * They are never blended into one carousel, because a clinic-collected quote
 * and an independent Google rating are not the same kind of evidence and a
 * patient can tell.
 */
export default function ReviewsPage() {
  const { sharedRating, combinedReviews, combinedLabel } = googleReputation;

  return (
    <>
      <PageHero
        eyebrow="Patient reviews"
        title={
          sharedRating
            ? `${sharedRating} on Google, across both our clinics.`
            : "What patients say about both our clinics."
        }
        copy={`${combinedReviews} ${combinedLabel}. Each clinic keeps its own listing, so you can read reviews for the one you are actually planning to visit.`}
      />

      {/* ── Per branch ───────────────────────────────────────────────────── */}
      <Section spacing="md">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="t-h2">
              Reviews by clinic
            </h2>

          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {locations.map((location) => (
              <BranchGoogleCard
                key={location.slug}
                location={location}
                placement={`reviews_google_${location.slug}`}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Real Google excerpts ─────────────────────────────────────────── */}
      <Section className="grain relative isolate bg-ink text-white" spacing="md">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="t-eyebrow text-gold">In their words</p>
              <h2 className="mt-4 max-w-xl t-h1">
                Straight from the Google listings.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-white/45">
              Quoted exactly as written, including the spelling. Nothing here has been tidied up.
            </p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {reviewHighlights.map((review) => (
              <figure
                key={review.quote}
                className="flex h-full flex-col rounded-2xl border border-white/12 bg-white/[.04] p-6"
              >
                <div className="flex items-center justify-between">
                  <Quote className="size-5 text-gold" aria-hidden="true" />
                  <span className="flex gap-0.5 text-gold" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="size-3 fill-current" />
                    ))}
                  </span>
                </div>
                <blockquote className="mt-5 flex-1 font-serif text-lg leading-snug">{review.quote}</blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-4 text-xs text-white/45">
                  {review.theme} · {review.source}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Video stories ────────────────────────────────────────────────── */}
      <Section spacing="md">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="t-eyebrow text-gold">Patient videos</p>
              <h2 className="t-h2 mt-4">
                Patients, in their own language.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Nothing plays on its own. Gujarati first, because that is what most Surat patients would rather listen
              to.
            </p>
          </div>
          <div className="mt-8">
            <VideoStoryGrid tone="light" />
          </div>
        </Container>
      </Section>

      {/* ── Written testimonials ─────────────────────────────────────────── */}
      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <h2 className="t-h2">
            Testimonials given to the clinic
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Separate from Google, and published only where the patient has given written consent.
          </p>
          <div className="mt-8">
            <PatientStoryGrid />
          </div>
        </Container>
      </Section>

      {/* ── Results ──────────────────────────────────────────────────────── */}
      <Section spacing="md">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="t-h2">Before &amp; after</h2>
            <Link
              href="/smile-gallery/"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold"
            >
              All results <ArrowUpRight className="cta-arrow size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8">
            <CaseResultsGrid limit={3} />
          </div>
        </Container>
      </Section>

      {/* ── Leave a review ───────────────────────────────────────────────── */}
      <section className="bg-gold py-14 text-ink sm:py-16">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="max-w-xl t-h1">
                Been treated with us? Say so where it helps someone else.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-ink/70">
                Pick the clinic you were seen at, so your review lands on the right listing.
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              {verifiedBranches.map((branch) => (
                <a
                  key={branch.location.slug}
                  href={writeReviewUrl(branch.location)}
                  target="_blank"
                  rel="noreferrer"
                  data-track="review_click"
                  data-placement={`reviews_write_${branch.location.slug}`}
                  data-branch={branch.location.slug}
                  className="inline-flex min-h-13 items-center justify-between gap-4 rounded-full bg-ink px-6 text-sm font-semibold text-white"
                >
                  Review {branch.location.displayArea}
                  <ArrowRight className="cta-arrow size-4 text-gold" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
