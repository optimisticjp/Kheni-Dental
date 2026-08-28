import type { Metadata } from "next";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import { GoogleTrustCard } from "@/components/kheni/google-trust-card";
import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { locations, reviewHighlights, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Patient Reviews on Google",
  description: "Kheni Dental has two Surat clinics with separate Google profiles. See the Swastik Plaza rating, read review themes and open each profile yourself.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero eyebrow="Patient reviews" title="We would rather you checked Google first." copy="Anything we quote here is a small selection. So this page gives you the rating, a few patient comments and a direct link to each clinic profile, where you can read the rest yourself." />

      <Section spacing="lg">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <GoogleTrustCard placement="reviews_page_primary" />
            <div className="grid gap-4 sm:grid-cols-2">
              {reviewHighlights.map((item, index) => (
                <article key={item.theme} className={`rounded-[1.8rem] border border-border bg-card p-6 ${index === 0 ? "sm:col-span-2" : ""}`}>
                  <div className="flex items-center justify-between gap-4"><span className="text-xs font-semibold uppercase tracking-[.18em] text-gold">{item.theme}</span><Quote className="size-5 text-gold/50" /></div>
                  <p className={`mt-7 font-serif leading-snug ${index === 0 ? "text-3xl" : "text-2xl"}`}>“{item.quote}”</p>
                  <p className="mt-5 text-xs uppercase tracking-[.14em] text-muted-foreground">{item.source}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-ink text-white" spacing="lg">
        <Container width="7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[.22em] text-gold">Two clinics, two profiles</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">We keep the two clinics listed separately.</h2>
            <p className="mt-5 text-base leading-7 text-white/58">It would be easy to add the two profiles together and show one bigger number. That would not be true. The rating below belongs to Swastik Plaza. Hirabaug has its own Google listing, and its own card.</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {locations.map((location) => (
              <article key={location.slug} className="rounded-[2rem] border border-white/10 bg-white/[.035] p-7">
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-gold">Kheni Dental · {location.areaLabel}</p>
                <h3 className="mt-3 font-serif text-3xl">{location.shortName}</h3>
                {location.rating ? (
                  <div className="mt-6 flex items-end gap-4"><span className="font-serif text-6xl text-gold">{location.rating}</span><div className="pb-1"><div className="flex gap-1 text-gold">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-current" />)}</div><p className="mt-2 text-xs text-white/45">{location.reviewCount} Google reviews</p></div></div>
                ) : (
                  <p className="mt-6 text-sm leading-6 text-white/55">This clinic has its own listing on Google. We could not confirm a current public rating for it, so we are not showing a number here. The link below opens the listing as it stands today.</p>
                )}
                <div className="mt-7 flex flex-wrap gap-4 text-sm font-semibold">
                  <a href={location.googleProfileUrl} target="_blank" rel="noreferrer" data-track="review_click" data-placement={`reviews_${location.slug}`} data-branch={location.slug} className="inline-flex items-center gap-2 text-gold">View Google profile <ArrowUpRight className="size-4" /></a>
                  <a href={location.mapsUrl} target="_blank" rel="noreferrer" data-track="directions_click" data-placement={`reviews_${location.slug}`} data-branch={location.slug} className="inline-flex items-center gap-2 text-white/65">Get directions <ArrowUpRight className="size-4" /></a>
                  <a href={location.googleWriteReviewUrl} target="_blank" rel="noreferrer" data-track="review_click" data-placement={`reviews_${location.slug}_write`} data-branch={location.slug} className="inline-flex items-center gap-2 text-white/65">Write a review <ArrowUpRight className="size-4" /></a>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <section className="bg-gold py-14 text-ink">
        <Container width="7xl" className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[.18em]">Check it yourself</p><h2 className="mt-2 font-serif text-4xl">{site.googleReviewDisplay} reviews sit on the Swastik Plaza profile. Read a few before you decide.</h2></div>
          <a href={site.googleProfileUrl} target="_blank" rel="noreferrer" data-track="review_click" data-placement="reviews_final" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white">Open the Swastik Plaza profile <ArrowUpRight className="size-4" /></a>
        </Container>
      </section>
    </>
  );
}
