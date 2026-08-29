import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, MessageCircle, Phone } from "lucide-react";

import { InitialsPortrait, PendingTag } from "@/components/kheni/pending";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { languages } from "@/content/clinic-proof";
import { doctors, site, treatments } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export function generateStaticParams() {
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doctor = doctors.find((item) => item.slug === slug);
  if (!doctor) return {};
  return { title: `${doctor.name}, ${doctor.credentials}`, description: doctor.metaDescription };
}

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doctor = doctors.find((item) => item.slug === slug);
  if (!doctor) notFound();

  const message = `Hello Kheni Dental, I would like to book an appointment with ${doctor.name}.`;
  const related = treatments.filter((t) => doctor.relatedTreatmentSlugs.includes(t.slug));

  return (
    <>
      {/* Facts first: name, degree, specialty, years, what they treat, book. */}
      <section className="bg-ink text-white">
        <Container width="7xl" className="grid gap-10 py-12 lg:grid-cols-[.75fr_1.25fr] lg:items-center lg:gap-14 lg:py-16">
          {/* On a phone this used to open with 460px of empty portrait frame
              before the doctor's own name. The name leads in the DOM now and
              the frame follows; lg:order-first restores the portrait-left
              composition on desktop, where there is room for both at once. */}
          <div className="lg:order-last">
            <p className="t-eyebrow text-gold">{doctor.specialty}</p>
            <h1 className="mt-4 t-h1">
              {doctor.name}
            </h1>

            <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-y border-white/10 py-5">
              <div>
                <dt className="text-[.6rem] uppercase tracking-[.14em] text-white/40">Qualification</dt>
                <dd className="mt-1 text-sm font-semibold">{doctor.credentials}</dd>
              </div>
              <div>
                <dt className="text-[.6rem] uppercase tracking-[.14em] text-white/40">Experience</dt>
                <dd className="mt-1 text-sm font-semibold text-gold">{doctor.yearsExperience} years</dd>
              </div>
              <div>
                <dt className="text-[.6rem] uppercase tracking-[.14em] text-white/40">Speaks</dt>
                <dd className="mt-1 text-sm font-semibold">{languages.join(", ")}</dd>
              </div>
            </dl>

            <ul className="mt-6 flex flex-wrap gap-2">
              {doctor.badges.map((badge) => (
                <li
                  key={badge}
                  className="inline-flex rounded-full border border-gold/25 bg-gold/[.07] px-3 py-1.5 text-xs text-gold"
                >
                  {badge}
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-xl t-stand text-white/60">{doctor.bio}</p>

            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact/#book"
                data-track="appointment_start"
                data-placement="doctor_profile"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-ink sm:whitespace-nowrap"
              >
                Book Appointment
                <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
              </Link>
              <a
                href={`tel:${site.primaryPhoneHref}`}
                data-track="phone_click"
                data-placement="doctor_profile"
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
                data-placement="doctor_profile"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold sm:whitespace-nowrap"
              >
                <MessageCircle className="size-4 text-gold" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>

          <InitialsPortrait
            name={doctor.name}
            className="aspect-[3/2] w-full lg:order-first lg:aspect-[4/5]"
          />
        </Container>
      </section>

      <Section spacing="md">
        <Container width="7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
            <div>
              <h2 className="t-h2">
                {doctor.approachHeading}
              </h2>
              <blockquote className="mt-6 border-l-2 border-gold/50 pl-5 font-serif text-xl leading-snug">
                &ldquo;{doctor.philosophy}&rdquo;
              </blockquote>
            </div>

            {/* Structured credential slots so the doctor can fill them in. */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-serif text-xl leading-tight">Training and memberships</h2>
              <ul className="mt-4 space-y-3">
                {["Postgraduate training", "Professional membership", "Certification"].map((item) => (
                  <li key={item} className="flex items-center justify-between gap-3 border-b border-border pb-3 text-sm last:border-0 last:pb-0">
                    <span className="text-muted-foreground">{item}</span>
                    <PendingTag label="To confirm" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section className="bg-[#f1eee7]" spacing="md">
          <Container width="7xl">
            <h2 className="t-h2">
              Treatments {doctor.name.split(" ").slice(0, 2).join(" ")} works with
            </h2>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/treatments/${t.slug}/`}
                    data-track="treatment_view"
                    data-placement="doctor_profile"
                    className="group flex min-h-[4.5rem] items-center justify-between gap-4 rounded-2xl border border-border bg-white px-5 py-4"
                  >
                    <span className="font-serif text-lg leading-tight">{t.title}</span>
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
      )}

      <Section spacing="md">
        <Container width="7xl">
          <div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <p className="font-serif text-2xl leading-tight">Meet the rest of the team</p>
            <Link
              href="/doctors/"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold text-gold"
            >
              All doctors <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
