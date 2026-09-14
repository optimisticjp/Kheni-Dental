import { ArrowUpRight } from "lucide-react";

import { InstagramIcon } from "@/components/icons/instagram-icon";
import { GoogleGlyph } from "@/components/icons/google-glyph";
import { Stars } from "@/components/kheni/proof";
import { Highlighted } from "@/components/kheni/section-intro";
import { BookButton, WhatsAppButton } from "@/components/ui/cta";
import { Container } from "@/components/ui/container";
import { googleReputation } from "@/content/google-reputation";
import { instagramHandle, instagramUrl, reelPosterSrcSet, instagramReels } from "@/content/instagram";
import { brandLineById, site } from "@/content/site";

/**
 * The homepage hero: a full electric blue field, the Kheni line set as
 * large as the phone allows, and a collage of two real frames from the
 * clinic's own Instagram in the site's two shapes, the smile window and
 * the arch. The Google figure floats over the collage as a pill.
 *
 * Nothing here is a stock photograph or a generated face. When the clinic
 * sends its own portraits the two frames swap for them in photos.ts.
 */
export function HomeHero() {
  const line = brandLineById("signature");
  const big = instagramReels.find((r) => r.id === "consultation-desk");
  const small = instagramReels.find((r) => r.id === "kids-camp");
  const { sharedRating, combinedReviews } = googleReputation;

  return (
    <section className="mood-blue on-blue smile-cut relative isolate overflow-hidden bg-blue text-white" style={{ ["--curve" as string]: "var(--butter)" }}>
      <div aria-hidden="true" className="absolute -left-32 -top-40 size-[30rem] rounded-full bg-white/[.07]" />
      <Container width="7xl" className="relative grid gap-8 pb-20 pt-8 sm:pt-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-12 lg:pb-28 lg:pt-16">
        <div>
          <p className="rise t-eyebrow text-butter">
            {site.name} · Surat · {site.yearsInSurat} years
          </p>
          <h1 className="rise-2 t-hero measure-hero mt-4 text-white">
            <Highlighted title={line.line} highlight={line.highlight} />
          </h1>
          <p className="rise-3 t-lead measure-lead mt-5 text-white/85">
            Implants, root canals, braces, kids dentistry and smile design at two Surat clinics, led by Dr. Mayur Kheni. Every visit starts with what is bothering you, in your words.
          </p>
          <div className="rise-3 mt-7 flex flex-col gap-3 sm:flex-row">
            <BookButton placement="home_hero" size="lg" variant="butter" />
            <WhatsAppButton placement="home_hero" size="lg" />
          </div>
        </div>

        {/* The collage. Two real clinic frames, two shapes, one proof pill. */}
        <div className="relative grid grid-cols-[1.25fr_1fr] items-end gap-3 sm:gap-4 lg:gap-5">
          <div className="smile-lg reveal-smile relative aspect-[3/4] overflow-hidden bg-blue-deep">
            {big?.poster && (
              // eslint-disable-next-line @next/next/no-img-element -- images are unoptimized site-wide
              <img src={big.poster} srcSet={reelPosterSrcSet(big.poster)} sizes="(min-width: 1024px) 380px, 55vw" alt={big.posterAlt ?? ""} fetchPriority="high" decoding="async" className="absolute inset-0 size-full object-cover" style={{ objectPosition: big.objectPosition }} />
            )}
          </div>
          <div className="mb-10 sm:mb-14">
            <div className="arch relative aspect-[3/4] overflow-hidden bg-aqua">
              {small?.poster && (
                // eslint-disable-next-line @next/next/no-img-element -- images are unoptimized site-wide
                <img src={small.poster} srcSet={reelPosterSrcSet(small.poster)} sizes="(min-width: 1024px) 280px, 40vw" alt={small.posterAlt ?? ""} loading="eager" decoding="async" className="absolute inset-0 size-full object-cover" style={{ objectPosition: small.objectPosition }} />
              )}
            </div>
            <a href={instagramUrl} target="_blank" rel="noreferrer" data-track="instagram_profile_click" data-placement="home_hero" className="mt-3 inline-flex min-h-9 items-center gap-1.5 text-xs font-bold text-white/85 hover:text-white">
              <InstagramIcon className="size-3.5" />
              From {instagramHandle}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>

          {sharedRating && (
            <a href="/reviews/" data-track="review_click" data-placement="home_hero" className="absolute -bottom-4 left-3 inline-flex items-center gap-3 rounded-full bg-white py-2 pl-3 pr-4 text-ink shadow-[0_18px_40px_-16px_rgba(11,22,51,.6)] sm:left-5 sm:-bottom-5">
              <GoogleGlyph className="size-5" />
              <span className="font-display text-3xl font-extrabold leading-none tracking-[-.04em]">{sharedRating}</span>
              <span className="leading-tight">
                <Stars tone="ink" size="size-3" />
                <span className="mt-0.5 block text-xs font-bold">{combinedReviews} Google reviews</span>
                <span className="block text-[.68rem] font-semibold text-ink-soft">across two Surat clinics</span>
              </span>
            </a>
          )}
        </div>
      </Container>
    </section>
  );
}
