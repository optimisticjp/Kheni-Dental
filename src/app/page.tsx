import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";

import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { BookButton, WhatsAppButton } from "@/components/ui/cta";
import { ImplantDiagram } from "@/components/kheni/art/diagrams";
import { TreatmentArt } from "@/components/kheni/art/treatment-art";
import { BranchLocator } from "@/components/kheni/branch-locator";
import { ClinicShorts } from "@/components/kheni/clinic-shorts";
import { ConcernFinder } from "@/components/kheni/concern-finder";
import { CtaBand } from "@/components/kheni/cta-band";
import { DoctorSpotlight, TeamLink } from "@/components/kheni/doctor-spotlight";
import { MediaFrame } from "@/components/kheni/media-frame";
import { ProcessSteps } from "@/components/kheni/process-steps";
import { GoogleQuotes, ProofCluster, Stars } from "@/components/kheni/proof";
import { ResultsPreview } from "@/components/kheni/results-preview";
import { SectionIntro } from "@/components/kheni/section-intro";
import { SmileNote } from "@/components/kheni/smile-note";
import { TreatmentPoster, TreatmentTile } from "@/components/kheni/treatment-poster";
import { StockHero } from "@/components/kheni/demo/stock-hero";
import { ClaimMarquee } from "@/components/kheni/demo/marquee";
import { StatBand } from "@/components/kheni/demo/stat-band";
import { IconServiceGrid } from "@/components/kheni/demo/icon-grid";
import { HorizontalAccordion } from "@/components/kheni/demo/horizontal-accordion";
import { PromiseStrip } from "@/components/kheni/demo/promise-strip";
import { RatingSummary, TestimonialWall } from "@/components/kheni/demo/testimonial-wall";
import { VideoWall } from "@/components/kheni/demo/video-wall";
import { AwardsRow, PressQuotes, PressStrip } from "@/components/kheni/demo/press-strip";
import { CaseWall } from "@/components/kheni/demo/result-gallery";
import { demoContentActive, demoRatingSummary } from "@/content/demo";
import { implantCapabilities } from "@/content/capabilities";
import { googleReputation, verifiedBranches } from "@/content/google-reputation";
import { implantProcess } from "@/content/implant-center";
import { homepageFaqs, locations, site, treatments } from "@/content/site";
import { GlobeSurat } from "@/components/kheni/art/diagrams";
import { placeUrl } from "@/lib/maps";

/**
 * Homepage.
 *
 * Built for a phone first. In one screen: who we are, where, the Google
 * proof and a way to book. Then "What brings you in today?", six treatments,
 * the implant centre, the principal dentist, results, reviews, NRI, the two
 * clinics, videos, questions, and one closing action. Colour does the work
 * of section count: tinted fields, illustration and a few Smile Notes
 * between them rather than fifteen stacked cards.
 */
const featured = treatments.filter((t) => t.featured).slice(0, 7);
const nriMessage = "Hello Kheni Dental, I live abroad and would like to plan dental treatment during a visit to Surat. Here are my dates:";

export default function Home() {
  return (
    <>
      {/*
        Two heroes. The verified one leads with where we are and what the
        Google listings actually say. The demo one leads with a rating badge,
        a "#1", a painless promise and a counter strip, which is the pattern
        the clinic asked to see. Only one renders.
      */}
      {demoContentActive && <StockHero />}

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      {!demoContentActive && (
      <section
        className="hue-cobalt field relative isolate overflow-hidden"
        style={{ ["--f1" as string]: "var(--cobalt-tint)", ["--f2" as string]: "var(--coral-tint)", ["--f3" as string]: "var(--sunshine-tint)" }}
      >
        <Container width="7xl" className="relative grid gap-7 py-7 sm:py-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14 lg:py-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-[.8rem] font-semibold text-ink ring-1 ring-line">
              <MapPin className="size-3.5 text-coral" aria-hidden="true" />
              Two clinics in Surat · Yogi Chowk and Hirabaug
            </p>
            <h1 className="t-display measure-display mt-4">
              Dental care in Surat that <span className="hl">explains</span> before it treats.
            </h1>
            <p className="t-stand measure-stand mt-4 text-ink-soft">
              {site.yearsInSurat} years, four dentists, one familiar standard. Implants, root canals, braces, kids dentistry and smile design, led by Dr. Mayur Kheni.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <Link href="/reviews/" data-track="review_click" data-placement="home_hero" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-3 ring-1 ring-line">
                <span className="font-serif text-xl font-semibold leading-none">{googleReputation.sharedRating}</span>
                <Stars />
                <span className="t-small text-ink-soft">{googleReputation.combinedReviews} Google reviews</span>
              </Link>
              <span className="t-small text-ink-soft">across two clinic listings</span>
            </div>

            <div className="mt-6 grid gap-2.5 min-[360px]:grid-cols-2 sm:flex sm:flex-wrap">
              <BookButton placement="home_hero" size="lg" className="px-4 sm:px-7" />
              <WhatsAppButton placement="home_hero" size="lg" className="px-4 sm:px-7" />
            </div>
          </div>

          {/* Right: a colourful clinic visual with a photo slot, and the two clinics as proof chips. */}
          <div className="relative">
            <MediaFrame ratio="5 / 4" mobileRatio="16 / 9" from="lg" className="rounded-[1.75rem] bg-white ring-1 ring-line" priority>
              <div className="absolute inset-0 grid grid-cols-2 gap-2 p-2">
                {["dental-implants-surat", "cosmetic-smile-dentistry", "kids-dentistry-surat", "root-canal-treatment-surat"].map((slug) => {
                  const t = treatments.find((x) => x.slug === slug)!;
                  return (
                    <Link key={slug} href={`/treatments/${slug}/`} data-track="treatment_view" data-placement="home_hero_tiles" className={`hue-${t.hue} lift relative overflow-hidden rounded-[1.1rem] bg-h-tint`}>
                      <TreatmentArt slug={slug} className="absolute inset-0 size-full" />
                      <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-1 text-[.72rem] font-semibold text-ink">{t.title}</span>
                    </Link>
                  );
                })}
              </div>
            </MediaFrame>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {verifiedBranches.map((b) => (
                <li key={b.location.slug} className={`hue-${b.location.hue}`}>
                  <a
                    href={placeUrl(b.location)}
                    target="_blank"
                    rel="noreferrer"
                    data-track="google_reviews_click"
                    data-placement="home_hero_branch"
                    data-branch={b.location.slug}
                    className="glass flex min-h-12 items-center justify-between gap-2 rounded-2xl px-3.5 ring-1 ring-line"
                  >
                    <span className="flex items-center gap-1.5 whitespace-nowrap text-[.85rem] font-semibold sm:text-sm">
                      <span aria-hidden="true" className="size-2 rounded-full bg-h-fill" />
                      {b.location.displayArea}
                    </span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap text-[.85rem] sm:text-sm">
                      <span className="font-serif font-semibold">{b.rating}</span>
                      <span className="text-ink-soft">{b.reviewCount}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
      )}

      {demoContentActive && (
        <>
          <ClaimMarquee />
          <PressStrip />
        </>
      )}

      {/* ── What brings you in today? ───────────────────────────────── */}
      <section className="hue-teal py-10 sm:py-14 lg:py-20">
        <Container width="7xl">
          <SectionIntro eyebrow="Start here" title="What brings you in today?" highlight="today" copy="Pick the one that sounds like you. You do not need to know the name of the treatment." />
          <div className="mt-6 sm:mt-8">
            <ConcernFinder />
          </div>
        </Container>
      </section>

      {demoContentActive && (
        <>
          <PromiseStrip />

          {/* ── Icon service grid ───────────────────────────────────── */}
          <section className="hue-navy py-10 sm:py-14 lg:py-20">
            <Container width="7xl">
              <SectionIntro eyebrow="Everything we do" title="Twelve services, one clinic." highlight="one clinic" copy="The flat icon grid, four across on a phone. Tap any tile to read the full treatment page." />
              <IconServiceGrid className="mt-6 sm:mt-8" />
            </Container>
          </section>
        </>
      )}

      <SmileNote index={0} />

      {/* ── Treatments ──────────────────────────────────────────────── */}
      <section className="hue-cobalt py-10 sm:py-14 lg:py-20">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionIntro eyebrow="Treatments" title="Everyday dentistry to full mouth rehabilitation." highlight="full mouth" />
            <Link href="/treatments/" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-cobalt-deep">
              All {treatments.length} treatments
              <ArrowUpRight className="cta-arrow size-4" aria-hidden="true" />
            </Link>
          </div>
          {/* Phone: seven compact tiles in two screens. Tablet and up: posters, the first across the row. */}
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:hidden">
            {featured.map((t, index) => (
              <TreatmentTile key={t.slug} treatment={t} wide={index === 0} placement="home_treatments" />
            ))}
          </div>
          <div className="mt-8 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((t, index) => (
              <TreatmentPoster key={t.slug} treatment={t} featured={index === 0} placement="home_treatments" />
            ))}
          </div>
        </Container>
      </section>

      {demoContentActive && (
        <section className="hue-teal py-10 sm:py-14 lg:py-20">
          <Container width="7xl">
            <SectionIntro eyebrow="Problems we treat" title="Fourteen reasons people walk in." highlight="Fourteen" copy="The horizontal accordion, on the phone as well as the desktop. Tap a spine to open it, swipe to reach the rest." />
            <HorizontalAccordion className="mt-6 sm:mt-8" />
          </Container>
        </section>
      )}

      {/* ── Elite Implant Center ────────────────────────────────────── */}
      <section className="hue-cobalt relative isolate overflow-hidden bg-ink py-10 text-white sm:py-14 lg:py-20">
        <div aria-hidden="true" className="absolute -left-24 top-0 size-80 rounded-full bg-cobalt opacity-40 blur-3xl" />
        <div aria-hidden="true" className="absolute -right-24 bottom-0 size-80 rounded-full bg-teal opacity-25 blur-3xl" />
        <Container width="7xl" className="relative">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
            <div>
              <p className="t-eyebrow text-gold-soft">Elite Implant Center · Hirabaug</p>
              <h2 className="t-h1 mt-3 [--h-text:var(--sunshine)] [--h-soft:transparent]">
                A fixed tooth for the gap you have been <span className="hl">working around.</span>
              </h2>
              <p className="t-stand mt-4 max-w-xl text-white/75">
                Implant work is led from Hirabaug by Dr. Mayur Kheni. Every case starts with an examination and the imaging needed to see the bone, before anything is recommended.
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-2">
                {implantCapabilities.map((item) => (
                  <li key={item.id} className="rounded-xl bg-white/[.07] px-3.5 py-3 ring-1 ring-white/10">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="t-small mt-1 hidden text-white/65 sm:block">{item.copy}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <Link href="/treatments/dental-implants-surat/" data-track="treatment_view" data-placement="home_implant" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-sunshine px-6 text-[.9375rem] font-semibold text-ink">
                  Inside the Elite Implant Center
                  <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
                </Link>
                <WhatsAppButton placement="home_implant" location={locations[1]} context="implants" variant="onDark" />
              </div>
            </div>
            <div className="rounded-[1.5rem] bg-porcelain p-4 text-ink sm:p-6">
              <ImplantDiagram />
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8 lg:mt-12">
            <p className="t-eyebrow text-gold-soft">{implantProcess.eyebrow}</p>
            <h3 className="t-h2 mt-2 text-white">{implantProcess.title}</h3>
            <div className="mt-6 [--h-fill:var(--sunshine)] [--h-on-fill:var(--ink)] [--h-soft:rgba(255,255,255,.2)] [&_li]:bg-white/[.06] [&_li]:ring-white/10 [&_li]:text-white [&_p]:text-white/65">
              <ProcessSteps steps={implantProcess.steps} columns={5} dense />
            </div>
          </div>
        </Container>
      </section>

      {demoContentActive && <StatBand />}

      {/* ── Dr. Mayur ───────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 lg:py-20">
        <Container width="7xl">
          <DoctorSpotlight />
          <TeamLink />
        </Container>
      </section>

      {demoContentActive && (
        <>
          {/* ── Testimonial wall ────────────────────────────────────── */}
          <section className="hue-sunshine py-10 sm:py-14 lg:py-20">
            <Container width="7xl">
              <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-start lg:gap-12">
                <div className="lg:sticky lg:top-24">
                  <SectionIntro eyebrow="Patient stories" title={`${demoRatingSummary.total.toLocaleString("en-IN")} patients have told us how it went.`} highlight="how it went" />
                  <RatingSummary className="mt-6" />
                  <Link href="/reviews/" data-track="review_click" data-placement="home_testimonials" className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-cobalt-deep">
                    Read all {demoRatingSummary.total.toLocaleString("en-IN")} reviews
                    <ArrowUpRight className="cta-arrow size-4" aria-hidden="true" />
                  </Link>
                </div>
                <TestimonialWall limit={6} />
              </div>
            </Container>
          </section>

          {/* ── Video testimonials ──────────────────────────────────── */}
          <section className="hue-violet relative isolate overflow-hidden bg-ink py-10 text-white sm:py-14 lg:py-20">
            <div aria-hidden="true" className="absolute -right-24 top-0 size-80 rounded-full bg-violet opacity-30 blur-3xl" />
            <Container width="7xl" className="relative">
              <SectionIntro tone="dark" eyebrow="On camera" title="Patients, in their own words." highlight="own words" copy="Nothing loads until you tap. The player runs on YouTube's privacy domain." />
              <VideoWall className="mt-6 sm:mt-8" limit={4} />
            </Container>
          </section>

          {/* ── Recognition ─────────────────────────────────────────── */}
          <section className="hue-gold py-10 sm:py-14 lg:py-20">
            <Container width="7xl">
              <SectionIntro eyebrow="Recognition" title="Awards, accreditation and press." highlight="press" />
              <AwardsRow className="mt-6 sm:mt-8" />
              <PressQuotes className="mt-8" />
            </Container>
          </section>
        </>
      )}

      <SmileNote index={1} />

      {demoContentActive && (
        <section className="hue-cobalt py-10 sm:py-14 lg:py-20">
          <Container width="7xl">
            <SectionIntro eyebrow="Smile gallery" title="Before and after, drag to compare." highlight="drag to compare" copy="Four labelled cases with the treatment and the timeline named, then the unlabelled wall the reference clinics publish." />
            <CaseWall className="mt-6 sm:mt-8" />
            <Link href="/smile-gallery/" className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-h-text">
              The full smile gallery
              <ArrowUpRight className="cta-arrow size-4" aria-hidden="true" />
            </Link>
          </Container>
        </section>
      )}

      {/* ── Results and reviews ─────────────────────────────────────── */}
      <section className="hue-sunshine py-10 sm:py-14 lg:py-20">
        <Container width="7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div>
              <SectionIntro eyebrow="Before and after" title="Results, shown honestly." highlight="honestly" />
              <div className="mt-6">
                <ResultsPreview limit={2} placement="home_results" />
              </div>
            </div>
            <div>
              <SectionIntro eyebrow="Patient reviews" title={`${googleReputation.combinedReviews} reviews on Google.`} highlight={googleReputation.combinedReviews} copy="Counted across two separate clinic listings. Read the one you plan to visit." />
              <ProofCluster placement="home_reviews" className="mt-6" />
            </div>
          </div>
          <GoogleQuotes placement="home_quotes" className="mt-6" />
        </Container>
      </section>

      {/* ── NRI and international ───────────────────────────────────── */}
      <section className="hue-coral py-10 sm:py-14 lg:py-20">
        <Container width="7xl">
          <div className="grid gap-6 overflow-hidden rounded-[1.75rem] bg-coral-tint p-5 sm:p-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-12 lg:p-12">
            <div>
              <p className="t-eyebrow text-coral-text">NRI and international patients</p>
              <h2 className="t-h1 mt-3">
                Visiting Surat? Plan your dental care <span className="hl">before you fly.</span>
              </h2>
              <p className="t-stand mt-4 max-w-xl text-ink-soft">
                Send your travel dates and what you would like looked at. We will tell you what realistically fits into your trip, what would need a second visit, and what to expect once you are home.
              </p>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <WhatsAppButton placement="home_nri" message={nriMessage} label="Plan your visit on WhatsApp" track="international_patient_contact" />
                <Link href="/international-patients/" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line-strong bg-white px-5 text-[.9375rem] font-semibold">
                  How a visit works
                  <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <GlobeSurat className="mx-auto w-full max-w-[18rem] lg:max-w-none" />
          </div>
        </Container>
      </section>

      {/* ── Clinics ─────────────────────────────────────────────────── */}
      <section className="hue-green py-10 sm:py-14 lg:py-20">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionIntro eyebrow="Two clinics in Surat" title="Come to whichever is nearer." highlight="nearer" />
            <Link href="/locations/" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-green-text">
              Both clinics in detail
              <ArrowUpRight className="cta-arrow size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 sm:mt-8">
            <BranchLocator placement="home" />
          </div>
        </Container>
      </section>

      {/* ── From the clinic ─────────────────────────────────────────── */}
      <section className="hue-violet py-10 sm:py-14 lg:py-20">
        <Container width="7xl">
          <SectionIntro eyebrow="From the clinic" title="Short videos from our dentists." highlight="Short videos" copy="Brushing tips, kids' teeth, and patients on the day their treatment finished, in Gujarati and English." />
          <ClinicShorts limit={6} className="mt-6 sm:mt-8" />
        </Container>
      </section>

      {/* ── Questions ───────────────────────────────────────────────── */}
      <section className="hue-sky py-10 sm:py-14 lg:py-20">
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
