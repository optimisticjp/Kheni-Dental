import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircle, Phone, Star } from "lucide-react";

import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BranchGoogleCard } from "@/components/kheni/branch-google-card";
import { CaseResultsGrid } from "@/components/kheni/case-results";
import { ImplantDiagram } from "@/components/kheni/implant/implant-diagram";
import { InitialsPortrait } from "@/components/kheni/pending";
import { LocationCard } from "@/components/kheni/location-card";
import { ProofBand } from "@/components/kheni/proof-band";
import { PatientStoryGrid, VideoStoryGrid } from "@/components/kheni/stories";
import { heroAssurances, proofStats, treatmentStats } from "@/content/clinic-proof";
import { implantCapabilities } from "@/content/capabilities";
import { doctors, helpTopics, homepageFaqs, locations, site, treatments } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export default function Home() {
  const implantDoctor = doctors.find((d) => d.slug === "dr-mayur-kheni");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(206,173,108,.17),transparent_42%),radial-gradient(circle_at_5%_92%,rgba(206,173,108,.07),transparent_38%)]"
        />
        <Container width="7xl" className="relative grid gap-10 py-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14 lg:py-20">
          <div>
            <p className="text-[.7rem] font-semibold uppercase tracking-[.24em] text-gold">
              Kheni Dental &amp; Elite Implant Center
            </p>
            <h1 className="mt-5 font-serif text-[clamp(2.4rem,6.6vw,4.6rem)] leading-[.98] tracking-[-.045em]">
              Dentist in Surat you can
              <br className="hidden sm:block" /> keep going back to.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/65">
              Implants, root canals, braces, kids dentistry and smile design. Two clinics at Yogi Chowk and
              Hirabaug, led by Dr. Mayur Kheni.
            </p>

            {/* Immediate proof, the way Indian patients scan for it. */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={site.googleProfileUrl}
                target="_blank"
                rel="noreferrer"
                data-track="review_click"
                data-placement="home_hero_google"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gold/25 bg-gold/[.07] px-4 text-sm"
              >
                <span className="flex gap-0.5 text-gold" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </span>
                <strong className="text-white">{site.googleRating}</strong>
                <span className="text-white/50">
                  {site.googleReviewCount} reviews · Yogi Chowk
                </span>
              </a>
              <span className="text-sm text-white/45">15 years in Surat</span>
            </div>

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact/#book"
                data-track="appointment_start"
                data-placement="home_hero"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-ink sm:whitespace-nowrap"
              >
                Book Appointment
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href={`tel:${site.primaryPhoneHref}`}
                data-track="phone_click"
                data-placement="home_hero"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold sm:whitespace-nowrap"
              >
                <Phone className="size-4 text-gold" aria-hidden="true" />
                Call Clinic
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                data-track="whatsapp_click"
                data-placement="home_hero"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold sm:whitespace-nowrap"
              >
                <MessageCircle className="size-4 text-gold" aria-hidden="true" />
                WhatsApp
              </a>
            </div>

            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/40">
              {heroAssurances.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <span aria-hidden="true" className="size-1 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Branch chooser: the second question every local patient has. */}
          <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
            {locations.map((location) => (
              <div key={location.slug} className="rounded-2xl border border-white/10 bg-white/[.03] p-5">
                {location.implantCentre && (
                  <p className="mb-2 inline-flex rounded-full bg-gold/15 px-2 py-0.5 text-[.55rem] font-semibold uppercase tracking-[.14em] text-gold">
                    Implant Center
                  </p>
                )}
                <p className="font-serif text-2xl leading-tight">{location.shortName}</p>
                <p className="mt-1 text-xs text-white/45">{location.areaLabel}</p>
                <p className="mt-4 text-xs leading-5 text-white/40">{location.hours}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${location.phoneHref}`}
                    data-track="phone_click"
                    data-placement="home_hero_branch"
                    data-branch={location.slug}
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-white/[.07] text-xs font-semibold"
                  >
                    <Phone className="size-3.5 text-gold" aria-hidden="true" />
                    Call
                  </a>
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-track="directions_click"
                    data-placement="home_hero_branch"
                    data-branch={location.slug}
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-white/[.07] text-xs font-semibold"
                  >
                    Directions
                    <ArrowUpRight className="size-3.5 text-gold" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Proof numbers ────────────────────────────────────────────────── */}
      <section className="border-y border-white/10 bg-[#111110] py-9 text-white sm:py-11">
        <Container width="7xl">
          <ProofBand stats={proofStats} />
        </Container>
      </section>

      {/* ── How can we help ──────────────────────────────────────────────── */}
      <Section spacing="md">
        <Container width="7xl">
          <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">How can we help you today?</h2>
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {helpTopics.map((topic) => (
              <li key={topic.label}>
                <Link
                  href={topic.href}
                  data-track="problem_interaction"
                  data-placement="home_help"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-medium transition-colors hover:border-gold/50 hover:bg-gold/[.06]"
                >
                  {topic.label}
                  <ArrowUpRight className="size-3.5 text-gold" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── Treatments ───────────────────────────────────────────────────── */}
      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Our treatments</h2>
            <Link href="/treatments/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold">
              View all treatments <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map((treatment) => (
              <li key={treatment.slug}>
                <Link
                  href={`/treatments/${treatment.slug}/`}
                  data-track="treatment_view"
                  data-placement="home_treatments"
                  className="group flex min-h-[5.5rem] items-center justify-between gap-4 rounded-2xl border border-border bg-white p-5 transition-colors hover:border-gold/50"
                >
                  <span>
                    <span className="block font-serif text-xl leading-tight">{treatment.title}</span>
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">{treatment.problem}</span>
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-gold"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── Elite Implant Center ─────────────────────────────────────────── */}
      <Section className="bg-ink text-white" spacing="lg">
        <Container width="7xl">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-[.7rem] font-semibold uppercase tracking-[.24em] text-gold">Elite Implant Center</p>
              <h2 className="mt-5 max-w-lg font-serif text-[clamp(2rem,4.6vw,3.4rem)] leading-[1] tracking-[-.04em]">
                A tooth you do not have to think about.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-white/60">
                Our Hirabaug clinic is built around implant treatment, led by Dr. Mayur Kheni.
              </p>

              <ul className="mt-7 grid gap-2 sm:grid-cols-2">
                {implantCapabilities.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-xl border border-white/10 px-4 py-3 text-sm text-white/75"
                  >
                    {item.title}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
                <Link
                  href="/treatments/dental-implants-surat/"
                  data-track="treatment_view"
                  data-placement="home_implant"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-ink sm:whitespace-nowrap"
                >
                  Dental Implants
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                {implantDoctor && (
                  <Link
                    href={`/doctors/${implantDoctor.slug}/`}
                    data-track="doctor_profile_view"
                    data-placement="home_implant"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold sm:whitespace-nowrap"
                  >
                    Meet Dr. Mayur
                  </Link>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-gold/15 bg-white/[.02] p-6 sm:p-8">
              <ImplantDiagram className="mx-auto w-full max-w-[20rem] text-white" />
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-10">
            <ProofBand stats={treatmentStats} />
          </div>
        </Container>
      </Section>

      {/* ── Results ──────────────────────────────────────────────────────── */}
      <Section spacing="md">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Before &amp; after</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Real cases from our own patients, shown with their permission.
              </p>
            </div>
            <Link href="/smile-gallery/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold">
              See all results <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8">
            <CaseResultsGrid limit={3} />
          </div>
        </Container>
      </Section>

      {/* ── Doctors ──────────────────────────────────────────────────────── */}
      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Meet our doctors</h2>
            <Link href="/doctors/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold">
              All doctors <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((doctor) => (
              <li key={doctor.slug}>
                <Link
                  href={`/doctors/${doctor.slug}/`}
                  data-track="doctor_profile_view"
                  data-placement="home_doctors"
                  className="group flex h-full items-stretch gap-4 overflow-hidden rounded-2xl border border-border bg-white p-4 sm:block sm:p-0"
                >
                  <InitialsPortrait
                    name={doctor.name}
                    tone="light"
                    className="size-24 shrink-0 rounded-xl sm:aspect-[4/5] sm:size-auto sm:w-full sm:rounded-none"
                  />
                  <div className="min-w-0 sm:p-5">
                    <p className="font-serif text-xl leading-tight">{doctor.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{doctor.credentials}</p>
                    <p className="mt-1.5 text-sm leading-5">{doctor.specialty}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[.12em] text-gold">
                      {doctor.yearsExperience} years
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── What patients say: Google per branch + stories ───────────────── */}
      <Section className="bg-ink text-white" spacing="lg">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">What patients say</h2>
            <Link href="/reviews/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold">
              All reviews <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Each branch shows its own Google profile. Neither borrows the other's. */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {locations.map((location) => (
              <BranchGoogleCard key={location.slug} location={location} dark placement={`home_google_${location.slug}`} />
            ))}
          </div>

          <div className="mt-10">
            <h3 className="text-[.7rem] font-semibold uppercase tracking-[.2em] text-gold">Patient videos</h3>
            <div className="mt-5">
              <VideoStoryGrid tone="dark" />
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Clinics ──────────────────────────────────────────────────────── */}
      <Section spacing="md">
        <Container width="7xl">
          <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Our clinics in Surat</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            Yogi Chowk and Hirabaug. Each clinic has its own number and its own Google listing.
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {locations.map((location) => (
              <LocationCard key={location.slug} location={location} showMap={false} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Questions + NRI + book ───────────────────────────────────────── */}
      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Common questions</h2>
              <div className="mt-6 rounded-2xl border border-gold/25 bg-white p-6">
                <p className="text-[.68rem] font-semibold uppercase tracking-[.18em] text-gold">Coming from abroad</p>
                <p className="mt-3 font-serif text-xl leading-tight">Planning treatment around a trip to Surat?</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Send your dates before you book flights and we will tell you what fits.
                </p>
                <Link
                  href="/international-patients/"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold"
                >
                  International &amp; NRI patients <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <Accordion items={homepageFaqs.slice(0, 5)} className="bg-white" />
          </div>
        </Container>
      </Section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="bg-gold py-14 text-ink sm:py-16">
        <Container width="7xl" className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="max-w-2xl font-serif text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.02] tracking-[-.04em]">
              Book an appointment at Yogi Chowk or Hirabaug.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-ink/70">
              Tell us what is bothering you and we will find you a time.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Link
              href="/contact/#book"
              data-track="appointment_start"
              data-placement="home_final_cta"
              className="inline-flex min-h-13 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white sm:whitespace-nowrap"
            >
              Book Appointment
            </Link>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              data-track="whatsapp_click"
              data-placement="home_final_cta"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-ink/25 px-6 text-sm font-semibold sm:whitespace-nowrap"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </Container>
      </section>

      {/* Patient stories sit below the fold as supporting proof. */}
      <Section spacing="md">
        <Container width="7xl">
          <h2 className="font-serif text-2xl leading-tight tracking-[-.03em] sm:text-3xl">In our patients&rsquo; words</h2>
          <div className="mt-6">
            <PatientStoryGrid />
          </div>
        </Container>
      </Section>
    </>
  );
}
