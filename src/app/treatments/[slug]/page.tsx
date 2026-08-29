import type { Metadata } from "next";
import { GoogleTrustBar } from "@/components/kheni/google-trust";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, MessageCircle, Phone, Star } from "lucide-react";

import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BranchGoogleCard } from "@/components/kheni/branch-google-card";
import { PriceTable, TickList } from "@/components/kheni/capability-grids";
import { CaseResultsGrid } from "@/components/kheni/case-results";
import { InitialsPortrait, MediaFrame } from "@/components/kheni/pending";
import { googleReputation } from "@/content/google-reputation";
import { doctors, locations, site, treatments } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

/**
 * Dental implants has its own flagship route at
 * `src/app/treatments/dental-implants-surat/page.tsx`. It is excluded here so
 * the slug is never prerendered twice and there is no duplicate content.
 */
const SPECIALIZED_SLUGS = new Set(["dental-implants-surat"]);

export function generateStaticParams() {
  return treatments.filter((t) => !SPECIALIZED_SLUGS.has(t.slug)).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (SPECIALIZED_SLUGS.has(slug)) return {};
  const t = treatments.find((x) => x.slug === slug);
  if (!t) return {};
  return {
    title: t.seoTitle,
    description: t.metaDescription,
    alternates: { canonical: `/treatments/${slug}/` },
  };
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (SPECIALIZED_SLUGS.has(slug)) notFound();
  const t = treatments.find((x) => x.slug === slug);
  if (!t) notFound();

  const relatedDoctors = doctors.filter((doctor) => doctor.relatedTreatmentSlugs.includes(t.slug));
  const message = `Hello Kheni Dental, I would like to book an appointment for ${t.title}.`;

  return (
    <>
      {/* Hero: what it is, then the three ways to reach us. */}
      <section className="grain relative isolate overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="bloom-gold pointer-events-none absolute inset-0 -z-10" />
        <Container width="7xl" className="relative grid gap-10 py-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-14 lg:py-16">
          <div>
            <p className="t-eyebrow text-gold">{t.eyebrow}</p>
            <h1 className="mt-5 t-h1">
              {t.title} in Surat
            </h1>
            <p className="mt-5 max-w-xl t-stand text-white/60">{t.short}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href="/reviews/"
                data-track="review_click"
                data-placement={`treatment_${t.slug}_google`}
                className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-gold/25 bg-gold/[.07] px-4 text-sm"
              >
                <span className="flex gap-0.5 text-gold" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </span>
                <strong className="text-white">{googleReputation.sharedRating}</strong>
                <span className="text-white/50">
                  {googleReputation.combinedReviews} reviews, two clinic profiles
                </span>
              </Link>
            </div>

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact/#book"
                data-track="appointment_start"
                data-placement="treatment_hero"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-ink sm:whitespace-nowrap"
              >
                Book Appointment
                <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
              </Link>
              <a
                href={`tel:${site.primaryPhoneHref}`}
                data-track="phone_click"
                data-placement="treatment_hero"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold sm:whitespace-nowrap"
              >
                <Phone className="size-4 text-gold" aria-hidden="true" />
                Call Clinic
              </a>
              <a
                href={whatsappUrl(message)}
                target="_blank"
                rel="noreferrer"
                data-track="whatsapp_click"
                data-placement="treatment_hero"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold sm:whitespace-nowrap"
              >
                <MessageCircle className="size-4 text-gold" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>

          <MediaFrame shot={`${t.title} at Kheni Dental`} ratio="4 / 3" className="w-full" />

          {/* Independent proof, on the page where the patient is deciding
              whether this clinic is the one. */}
          <GoogleTrustBar placement={`treatment_${slug}`} className="mt-4" />
        </Container>
      </section>

      {/* What it helps with */}
      <Section spacing="md">
        <Container width="7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
            <div>
              <h2 className="t-h2">{t.problem}</h2>
              <p className="mt-5 max-w-2xl t-stand text-muted-foreground">{t.intro}</p>
              <div className="mt-8">
                <TickList items={t.benefits} />
              </div>
            </div>
            <aside className="self-start rounded-2xl bg-[#f1eee7] p-6 sm:p-7">
              <p className="text-[.66rem] font-semibold uppercase tracking-[.18em] text-gold">Worth knowing</p>
              <p className="mt-3 font-serif text-xl leading-tight">{t.aside.title}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{t.aside.copy}</p>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Steps */}
      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <h2 className="t-h2">{t.processHeading}</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.process.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-border bg-white p-5">
                <span aria-hidden="true" className="font-serif text-2xl text-gold/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-lg leading-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.copy}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Cost */}
      <Section spacing="md">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
            <div>
              <h2 className="t-h2">Cost and EMI</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                You get the full plan with the cost of each stage before treatment starts.
              </p>
            </div>
            <PriceTable limit={4} />
          </div>
        </Container>
      </Section>

      {/* Doctors */}
      {relatedDoctors.length > 0 && (
        <Section className="bg-[#f1eee7]" spacing="md">
          <Container width="7xl">
            <h2 className="t-h2">Your doctors</h2>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedDoctors.map((doctor) => (
                <li key={doctor.slug}>
                  <Link
                    href={`/doctors/${doctor.slug}/`}
                    data-track="doctor_profile_view"
                    data-placement="treatment_doctors"
                    className="flex h-full gap-4 rounded-2xl border border-border bg-white p-4 hover:border-gold/50"
                  >
                    <InitialsPortrait name={doctor.name} tone="light" className="size-20 shrink-0 rounded-xl" />
                    <span className="min-w-0">
                      <span className="block font-serif text-lg leading-tight">{doctor.name}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">{doctor.credentials}</span>
                      <span className="mt-2 block text-xs font-semibold uppercase tracking-[.1em] text-gold">
                        {doctor.yearsExperience} years
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* Results */}
      <Section spacing="md">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="t-h2">Results</h2>
            <Link href="/smile-gallery/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold">
              All results <ArrowUpRight className="cta-arrow size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8">
            <CaseResultsGrid limit={3} />
          </div>
        </Container>
      </Section>

      {/* Reviews for both branches */}
      <Section className="grain relative isolate bg-ink text-white" spacing="md">
        <Container width="7xl">
          <h2 className="t-h2">What patients say</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {locations.map((location) => (
              <BranchGoogleCard
                key={location.slug}
                location={location}
                dark
                placement={`treatment_${t.slug}_google_${location.slug}`}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-14">
            <h2 className="t-h2">Common questions</h2>
            <Accordion items={t.faqs} className="bg-white" />
          </div>
        </Container>
      </Section>

      <section className="bg-gold py-14 text-ink sm:py-16">
        <Container width="7xl" className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <h2 className="max-w-xl t-h1">
            {t.ctaTitle}
          </h2>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Link
              href="/contact/#book"
              data-track="appointment_start"
              data-placement="treatment_final_cta"
              className="inline-flex min-h-13 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white sm:whitespace-nowrap"
            >
              Book Appointment
            </Link>
            <a
              href={whatsappUrl(message)}
              target="_blank"
              rel="noreferrer"
              data-track="whatsapp_click"
              data-placement="treatment_final_cta"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-ink/25 px-6 text-sm font-semibold sm:whitespace-nowrap"
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
