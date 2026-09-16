import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { BookButton, WhatsAppButton } from "@/components/ui/cta";
import { ImplantDiagram } from "@/components/kheni/art/diagrams";
import { BranchLocator } from "@/components/kheni/branch-locator";
import { ClinicShorts } from "@/components/kheni/clinic-shorts";
import { ConcernFinder } from "@/components/kheni/concern-finder";
import { CtaBand } from "@/components/kheni/cta-band";
import { DoctorRoster, DoctorSpotlight } from "@/components/kheni/doctor-spotlight";
import { FollowLine, InstagramReels } from "@/components/kheni/instagram-reels";
import { ProcessSteps } from "@/components/kheni/process-steps";
import { GoogleQuotes, MetricRow, ProofChip, ProofPanel, Stars } from "@/components/kheni/proof";
import { Highlighted, SectionIntro } from "@/components/kheni/section-intro";
import { TreatmentRail } from "@/components/kheni/treatment-rail";
import { TreatmentTile } from "@/components/kheni/treatment-poster";
import { photoSrcSet } from "@/components/kheni/media-frame";
import { headlineCapabilities } from "@/content/capabilities";
import { metricsFor } from "@/content/clinic-proof";
import { googleReputation, verifiedBranches } from "@/content/google-reputation";
import { implantHero, implantProcess } from "@/content/implant-center";
import { instagramHandle, instagramReels } from "@/content/instagram";
import { homepageFaqs, site, treatments } from "@/content/site";
import { clinicVideos } from "@/content/videos";
import { placeUrl } from "@/lib/maps";

/**
 * Homepage.
 *
 * A premium black-and-gold clinic that has opened its windows. The rhythm:
 *
 *   dark    hero, with real Kheni frames and the Google proof
 *   mint    what brings you in today
 *   white   treatments (the rail on desktop, editorial tiles on a phone)
 *   ivory   Inside Kheni: the clinic's own Instagram Reels
 *   dark    the Elite Implant Center, diagram on a warm white panel
 *   ivory   the dentists, on a soft peach spread
 *   dark    Google reviews, the 4.9 set enormous
 *   sky     NRI and international, with real patient videos from abroad
 *   white   the two clinics
 *   ivory   questions
 *   dark    one closing action, then the footer
 *
 * Built for a phone first: within the first half a visitor has seen the
 * clinic, the proof, their concern, the treatments and real people.
 */
const featured = treatments.filter((t) => t.featured).slice(0, 7);
const railTreatments = featured.slice(0, 6);
const nriMessage = "Hello Kheni Dental, I live abroad and would like to plan dental treatment during a visit to Surat. Here are my dates:";
const abroadVideos = clinicVideos.filter((v) => ["eex02jLikGk", "7n0mOTFirzI"].includes(v.id));

/** Every volume the clinic gave on its form. Eight, so they sit 2 x 4. */
const homeMetrics = metricsFor("home");
const heroFrames = ["consultation-desk", "kids-camp"].map((id) => instagramReels.find((r) => r.id === id)).filter((r): r is NonNullable<typeof r> => Boolean(r));

export default function Home() {
  return (
    <>
      {/* ── Hero: dark, gold detail, real Kheni frames ───────────────── */}
      <section className="on-dark grain relative isolate overflow-hidden bg-ink text-ivory">
        <div aria-hidden="true" className="bloom-gold pointer-events-none absolute inset-0" />
        <Container width="7xl" className="relative grid gap-8 sec-hero lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14">
          <div>
            {/* The logo directly above already says the clinic's name, so the
                eyebrow names the two clinics instead of repeating it. */}
            <p className="t-eyebrow flex items-center gap-3 text-gold">
              Yogi Chowk &middot; Hirabaug &middot; Surat
              <span aria-hidden="true" className="rule-gold h-px w-14" />
            </p>
            <h1 className="t-display measure-display mt-5">
              Smile like you <span className="hl">mean it</span> again.
            </h1>
            <p className="t-stand measure-stand mt-5 text-ivory/70">
              {site.yearsInSurat} years in Surat. Four dentists, two clinics, and one habit we have never dropped: you hear what we found, in words you can repeat at home, before anyone picks up an instrument.
            </p>
            <div className="mt-7 grid gap-2.5 sm:flex sm:flex-wrap">
              <BookButton placement="home_hero" size="lg" className="px-4 sm:px-7" />
              <WhatsAppButton placement="home_hero" size="lg" variant="onDark" className="px-4 sm:px-7 [&>svg]:text-gold" />
            </div>
            <ProofChip placement="home_hero" tone="dark" className="mt-5" />
          </div>

          {/* Right: two frames from the clinic's own Instagram and the two
              listings on one soft mint card. The one light accent in the
              dark hero. */}
          {/* 640 to 767 is the one width where three across still reads, because
              the hero is stacked and the row has the full container. From 768
              it goes back to the two-column composition used on desktop: the
              tall frame beside a stacked square and proof card. Three across at
              768 was the single worst thing on the tablet layout, a cramped row
              with mismatched heights and a hole in the middle. */}
          <div className="grid grid-cols-[1.1fr_.9fr] gap-3 sm:grid-cols-[1fr_.9fr_.9fr] md:grid-cols-[1.1fr_.9fr] md:gap-4">
            {heroFrames.map((reel, index) => (
              <a
                key={reel.id}
                href={reel.url}
                target="_blank"
                rel="noreferrer"
                data-track="instagram_reel_open"
                data-placement="home_hero_frame"
                aria-label={`${reel.title}. Watch on Instagram`}
                className={index === 0 ? "row-span-2 sm:row-span-1 md:row-span-2" : "hidden sm:block"}
              >
                <span className="relative block overflow-hidden rounded-[1.25rem] border border-ivory/10 bg-ink-2" style={{ aspectRatio: index === 0 ? "4 / 5" : "1 / 1" }}>
                  {reel.poster && (
                    // eslint-disable-next-line @next/next/no-img-element -- images are unoptimized site-wide
                    <img
                      src={reel.poster}
                      srcSet={photoSrcSet(reel.poster)}
                      sizes="(min-width: 1024px) 360px, 50vw"
                      alt={reel.posterAlt ?? ""}
                      loading="eager"
                      fetchPriority={index === 0 ? "high" : undefined}
                      decoding="async"
                      className="absolute inset-0 size-full object-cover"
                      style={{ objectPosition: reel.objectPosition }}
                    />
                  )}
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 text-[.7rem] text-ivory/85">
                    <span className="min-w-0 truncate">{reel.title}</span>
                    <span className="shrink-0 text-gold">{instagramHandle}</span>
                  </span>
                </span>
              </a>
            ))}
            <div className="flex flex-col justify-between rounded-[1.25rem] bg-mint p-4 text-ink sm:col-span-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-serif text-3xl leading-none">{googleReputation.sharedRating}</span>
                <Stars size="size-3" />
              </div>
              <p className="t-small mt-2 text-ink-soft">
                {googleReputation.combinedReviews} Google reviews, {googleReputation.combinedShort}.
              </p>
              <ul className="mt-3 divide-y divide-ink/10">
                {verifiedBranches.map((b) => (
                  <li key={b.location.slug}>
                    <a
                      href={placeUrl(b.location)}
                      target="_blank"
                      rel="noreferrer"
                      data-track="google_reviews_click"
                      data-placement="home_hero_branch"
                      data-branch={b.location.slug}
                      className="flex min-h-10 items-center justify-between gap-2 text-sm"
                    >
                      <span className="font-semibold">{b.location.displayArea}</span>
                      <span className="flex items-center gap-1.5 text-ink-soft">
                        <span className="font-serif text-ink">{b.rating}</span>
                        {b.reviewCount}
                        <ArrowUpRight className="size-3 text-gold-text" aria-hidden="true" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ── What brings you in today? Soft mint. ─────────────────────── */}
      <section className="bg-mint sec-loose">
        <Container width="7xl">
          <SectionIntro eyebrow="Start here" title="What brings you in today?" highlight="today" copy="Pick whichever sounds like you. You do not need the name of the treatment, and you do not need to have worked out how bad it is. That is our job." />
          <div className="mt-6 sm:mt-8">
            <ConcernFinder />
          </div>
        </Container>
      </section>

      {/* ── Treatments: editorial tiles, the rail from lg. White. ────── */}
      <section className="bg-white sec-loose">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionIntro eyebrow="Treatments" title="From a check-up to a whole new bite." highlight="whole new bite" />
            <Link href="/treatments/" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink">
              All {treatments.length} treatments
              <ArrowUpRight className="cta-arrow size-4 text-gold-text" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-4 lg:hidden">
            {featured.map((t, index) => (
              <TreatmentTile key={t.slug} treatment={t} wide={index === 0} placement="home_treatments" />
            ))}
          </div>
          <div className="mt-8 hidden lg:block">
            <TreatmentRail treatments={railTreatments} />
          </div>
        </Container>
      </section>

      {/* ── Inside Kheni: the clinic's own Instagram. Ivory. ─────────── */}
      <section className="sec-loose">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionIntro eyebrow={`Inside Kheni · ${instagramHandle}`} title="The clinic, as it is on an ordinary day." highlight="ordinary day" copy="Short clips from our own Instagram: a school camp, the consultation desk, a child settling into the chair." />
          </div>
          <InstagramReels className="mt-6 sm:mt-8" placement="home_instagram" />
          <FollowLine placement="home_instagram_follow" className="mt-3" />
        </Container>
      </section>

      {/* ── Elite Implant Center. Dark. ───────────────────────────────── */}
      <section className="on-dark grain relative isolate overflow-hidden bg-ink py-10 text-ivory sm:py-14 lg:py-20">
        <div aria-hidden="true" className="bloom-gold-soft pointer-events-none absolute inset-0" />
        <Container width="7xl" className="relative">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
            <div>
              <p className="t-eyebrow flex items-center gap-3 text-gold">
                Elite Implant Center · Surat
                <span aria-hidden="true" className="rule-gold h-px w-12" />
              </p>
              <h2 className="t-h1 mt-3">
                A fixed tooth for the gap you have been <span className="hl">working around.</span>
              </h2>
              <p className="t-stand mt-4 max-w-xl text-ivory/70">
                Implants are led by Dr. Mayur Kheni, and planned and placed at Yogi Chowk. Bone cannot be judged by looking at it, so every case starts with an examination and imaging. You will know whether an implant suits you before anyone suggests one.
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-2">
                {headlineCapabilities.map((item) => (
                  <li key={item.id} className="rounded-xl border border-ivory/10 bg-ivory/[.04] px-3.5 py-3">
                    <p className="text-sm font-semibold text-ivory">{item.title}</p>
                    <p className="t-small mt-1 hidden text-ivory/60 sm:block">{item.copy}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <Link href="/treatments/dental-implants-surat/" data-track="treatment_view" data-placement="home_implant" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-gold px-6 text-[.9375rem] font-semibold text-ink hover:bg-gold-soft">
                  Inside the Elite Implant Center
                  <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
                </Link>
                <WhatsAppButton placement="home_implant" message={implantHero.whatsappMessage} variant="onDark" />
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-gold/20 bg-ivory p-4 text-ink sm:p-6">
              <ImplantDiagram />
            </div>
          </div>

          <div className="mt-10 border-t border-ivory/10 pt-8 lg:mt-12">
            <p className="t-eyebrow text-gold">{implantProcess.eyebrow}</p>
            <h3 className="t-h2 mt-2 text-ivory">
              <Highlighted title={implantProcess.title} highlight={["first visit", "final tooth"]} />
            </h3>
            <ProcessSteps steps={implantProcess.steps} columns={5} dense tone="dark" className="mt-6" />
          </div>
        </Container>
      </section>

      {/* ── The dentists. Ivory, with a peach spread. ─────────────────── */}
      <section className="sec-loose">
        <Container width="7xl">
          <DoctorSpotlight />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-3 sm:mt-8">
            <SectionIntro size="h3" eyebrow="The team" title="Three more dentists across both clinics." />
            <Link href="/doctors/" data-track="doctor_profile_view" data-placement="team_link" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink">
              All doctors
              <ArrowUpRight className="cta-arrow size-4 text-gold-text" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-4">
            <DoctorRoster exclude="dr-mayur-kheni" compact />
          </div>
        </Container>
      </section>

      {/* ── The clinic's own numbers. Every volume it gave us, in one place. ── */}
      <section className="bg-sand sec">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-14">
            <SectionIntro
              eyebrow="Kheni Dental in numbers"
              title="Fifteen years of work, counted."
              highlight="counted"
              copy="The clinic's own figures for what it has treated since 2012, across both Surat clinics. Numbers do not tell you whether a dentist is right for you, but they do tell you this is not anyone's first week."
            />
            {/* Two-up until 1360. Four across is too tight for "90,000+" while
                the intro still takes a column: it overflowed at 1024 and again
                at exactly 1280, so the switch sits above xl rather than on it. */}
            <MetricRow metrics={homeMetrics} className="lg:grid-cols-2 min-[1360px]:grid-cols-4" />
          </div>
        </Container>
      </section>

      {/* ── Google reviews. Dark, the number enormous. ────────────────── */}
      <section className="on-dark grain relative isolate overflow-hidden bg-ink py-10 text-ivory sm:py-14 lg:py-20">
        <Container width="7xl" className="relative">
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start lg:gap-14">
            <div>
              <SectionIntro tone="dark" rule eyebrow="Patient reviews" title={`${googleReputation.combinedReviews} reviews, on Google.`} highlight="on Google" copy="Counted across two separate clinic listings. Each clinic keeps its own, so you can read the one you plan to visit." />
              <Link href="/reviews/" data-track="review_click" data-placement="home_reviews" className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold">
                Reputation in full
                <ArrowUpRight className="cta-arrow size-4" aria-hidden="true" />
              </Link>
            </div>
            <ProofPanel placement="home_reviews" />
          </div>
          <GoogleQuotes placement="home_quotes" tone="dark" className="mt-8" />
        </Container>
      </section>

      {/* ── NRI and international. Soft sky, real patients from abroad. ── */}
      <section className="bg-sky sec-loose">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
            <div>
              <p className="t-eyebrow flex items-center gap-3 text-gold-text">
                NRI and international patients
                <span aria-hidden="true" className="rule-gold h-px w-12" />
              </p>
              <h2 className="t-h1 mt-3">
                Visiting Surat? Plan your dental care <span className="hl">before you fly.</span>
              </h2>
              <p className="t-stand mt-4 max-w-xl text-ink-soft">
                Send your dates and what you would like looked at before you book flights. We will tell you honestly what fits into the trip and what would need a second one. Better to hear that now than from a chair in Surat with a flight on Tuesday.
              </p>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <WhatsAppButton placement="home_nri" message={nriMessage} label="Plan your visit on WhatsApp" track="international_patient_contact" />
                <Link href="/international-patients/" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/25 px-5 text-[.9375rem] font-semibold hover:border-ink">
                  How a visit works
                  <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="min-w-0">
              <p className="t-eyebrow text-gold-text">Patients who flew in</p>
              <ClinicShorts videos={abroadVideos} limit={2} columns={2} uniform className="mt-3" />
            </div>
          </div>
        </Container>
      </section>

      {/* ── The two clinics. White. ───────────────────────────────────── */}
      <section className="bg-white sec-loose">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionIntro eyebrow="Two clinics in Surat" title="Come to whichever is nearer." highlight="nearer" />
            <Link href="/locations/" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink">
              Both clinics in detail
              <ArrowUpRight className="cta-arrow size-4 text-gold-text" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 sm:mt-8">
            <BranchLocator placement="home" />
          </div>
        </Container>
      </section>

      {/* ── Questions. Ivory. ─────────────────────────────────────────── */}
      <section className="sec-loose">
        <Container width="7xl">
          <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:gap-14">
            <SectionIntro eyebrow="Questions" title="Things people ask before their first visit." highlight="first visit" />
            <Accordion items={homepageFaqs} exclusive name="home-faq" />
          </div>
        </Container>
      </section>

      <CtaBand title="Tell us what is bothering you. We will take it from there." highlight="take it from there" placement="home_final" />
    </>
  );
}
