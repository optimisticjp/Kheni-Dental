import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle, Quote } from "lucide-react";

import { BranchGoogleCard } from "@/components/kheni/branch-google-card";
import { CaseResultsGrid } from "@/components/kheni/case-results";
import { PatientStoryGrid, VideoStoryGrid } from "@/components/kheni/stories";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { locations, reviewHighlights, site } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "Patient Reviews",
  description:
    "Google reviews for both Kheni Dental clinics in Surat, at Yogi Chowk and Hirabaug, plus patient stories and treatment results.",
};

export default function ReviewsPage() {
  return (
    <>
      {/* Compact hero. The proof starts immediately below it, not after an essay. */}
      <section className="bg-ink text-white">
        <Container width="7xl" className="py-12 lg:py-16">
          <p className="text-[.7rem] font-semibold uppercase tracking-[.24em] text-gold">Patient reviews</p>
          <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.1rem,5.4vw,3.8rem)] leading-[1] tracking-[-.045em]">
            What patients say about both our clinics.
          </h1>

          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {locations.map((location) => (
              <BranchGoogleCard key={location.slug} location={location} dark placement={`reviews_google_${location.slug}`} />
            ))}
          </div>
        </Container>
      </section>

      {/* Real Google excerpts. Never edited, never added to. */}
      <Section spacing="md">
        <Container width="7xl">
          <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">From our Google reviews</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviewHighlights.map((item) => (
              <figure key={item.theme} className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[.62rem] font-semibold uppercase tracking-[.16em] text-gold">{item.theme}</span>
                  <Quote className="size-4 text-gold/45" aria-hidden="true" />
                </div>
                <blockquote className="mt-5 flex-1 font-serif text-xl leading-snug">&ldquo;{item.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 text-xs uppercase tracking-[.12em] text-muted-foreground">{item.source}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* Clinic testimonials, which are a different thing from Google reviews. */}
      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Patient stories</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            Told to us directly by our own patients, published with their permission.
          </p>
          <div className="mt-8">
            <PatientStoryGrid />
          </div>
        </Container>
      </Section>

      {/* Video */}
      <Section className="bg-ink text-white" spacing="md">
        <Container width="7xl">
          <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Patient videos</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">In Gujarati, Hindi and English.</p>
          <div className="mt-8">
            <VideoStoryGrid tone="dark" />
          </div>
        </Container>
      </Section>

      {/* Results */}
      <Section spacing="md">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Treatment results</h2>
            <Link href="/smile-gallery/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold">
              See all results <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8">
            <CaseResultsGrid limit={3} />
          </div>
        </Container>
      </Section>

      <section className="bg-gold py-12 text-ink sm:py-14">
        <Container width="7xl" className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="max-w-xl font-serif text-2xl leading-tight tracking-[-.03em] sm:text-3xl">
            Been treated with us? Your review helps the next patient decide.
          </h2>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <a
              href={site.googleWriteReviewUrl}
              target="_blank"
              rel="noreferrer"
              data-track="review_click"
              data-placement="reviews_write_cta"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white sm:whitespace-nowrap"
            >
              Write a Google review
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              data-track="whatsapp_click"
              data-placement="reviews_cta"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/25 px-6 text-sm font-semibold sm:whitespace-nowrap"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
