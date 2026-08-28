import Link from "next/link";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { reviewHighlights, site } from "@/content/site";

export function GoogleReputationSection() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-24 top-1/3 size-80 rounded-full bg-gold/8 blur-3xl" />
      <Container width="7xl" className="relative">
        <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-xs font-semibold uppercase tracking-[.24em] text-gold">Trusted across Surat</p>
            <h2 className="mt-5 font-serif text-5xl leading-[.94] tracking-[-.045em] sm:text-6xl">Surat has already spoken.</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/58">Choosing a dentist is personal. Independent reviews give you a better sense of how patients describe the people, atmosphere and care before you contact us.</p>
            <div className="mt-9 flex items-end gap-5">
              <span className="font-serif text-[5.5rem] leading-none text-gold sm:text-8xl">{site.googleRating}</span>
              <div className="pb-2">
                <div className="flex gap-1 text-gold" aria-hidden="true">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-current" />)}</div>
                <p className="mt-2 text-sm font-semibold">Google rating</p>
                <p className="mt-1 text-xs text-white/42">{site.googleReviewCount} reviews</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold">
              <a href={site.googleProfileUrl} target="_blank" rel="noreferrer" data-track="review_click" data-placement="home_reputation" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-ink">Read all reviews <ArrowUpRight className="size-4" /></a>
              <a href={site.googleWriteReviewUrl} target="_blank" rel="noreferrer" data-track="review_click" data-placement="home_reputation_write" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-white">Write a review <ArrowUpRight className="size-4" /></a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {reviewHighlights.map((item, index) => (
              <article key={item.theme} className={`rounded-[1.8rem] border border-white/10 bg-white/[.035] p-6 sm:p-7 ${index === 0 ? "sm:col-span-2" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full border border-gold/25 px-3 py-1 text-[.65rem] font-semibold uppercase tracking-[.18em] text-gold">{item.theme}</span>
                  <Quote className="size-5 text-gold/55" aria-hidden="true" />
                </div>
                <p className={`mt-8 font-serif leading-snug ${index === 0 ? "text-3xl sm:text-4xl" : "text-2xl"}`}>“{item.quote}”</p>
                <p className="mt-5 text-xs uppercase tracking-[.16em] text-white/35">{item.source}</p>
              </article>
            ))}
            <div className="rounded-[1.8rem] border border-gold/20 bg-gold p-6 text-ink sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[.18em]">Want the unfiltered version?</p>
              <p className="mt-4 font-serif text-3xl leading-tight">Do not just take our word for it.</p>
              <p className="mt-4 text-sm leading-6 text-ink/65">Open the clinic&apos;s Google profile and read patient experiences directly at the source.</p>
              <a href={site.googleProfileUrl} target="_blank" rel="noreferrer" data-track="review_click" data-placement="home_reputation_source" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">See Kheni Dental on Google <ArrowUpRight className="size-4" /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center sm:text-left">
          <Link href="/reviews" className="inline-flex items-center gap-2 text-sm font-semibold text-gold">Explore patient review signals <ArrowUpRight className="size-4" /></Link>
        </div>
      </Container>
    </section>
  );
}
