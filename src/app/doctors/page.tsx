import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { BranchGoogleCard } from "@/components/kheni/branch-google-card";
import { DoctorRoster, PrincipalDoctor } from "@/components/kheni/doctor-authority";
import { PageHero } from "@/components/kheni/page-hero";
import { PendingTag } from "@/components/kheni/pending";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { languages } from "@/content/clinic-proof";
import { doctors, locations } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "Meet Our Dentists in Surat",
  description:
    "Dr. Mayur Kheni, Dr. Jinal Monapara, Dr. Ishita Dobariya and Dr. Parita Vastarpara. Degrees, years of experience and areas of work at both Kheni Dental clinics in Surat.",
};

/** Detail the doctors still owe us, shown as structure rather than guessed at. */
const pendingCredentialRows = [
  "Postgraduate training and fellowships",
  "Professional memberships",
  "Certifications",
  "Which branch, on which days",
];

export default function DoctorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our doctors"
        title="Know who is treating you before you sit down."
        copy={`Four dentists across two clinics in Surat, led by Dr. Mayur Kheni. Consultations in ${languages.join(", ")}.`}
      />

      <Section spacing="md">
        <Container width="7xl">
          <PrincipalDoctor />
        </Container>
      </Section>

      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">
            The rest of the team
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            Degrees and years in practice are listed exactly as each doctor gave them.
          </p>
          <div className="mt-8">
            <DoctorRoster exclude="dr-mayur-kheni" />
          </div>
        </Container>
      </Section>

      {/* Credential structure. Built now so a confirmed list drops straight in. */}
      <Section spacing="md">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
            <div>
              <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">
                Training and memberships
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Everything below is a claim about a person, so none of it appears on the site until the doctor
                concerned confirms it in writing.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {doctors.map((doctor) => (
                <li key={doctor.slug} className="rounded-2xl border border-border bg-card p-5">
                  <p className="font-serif text-lg leading-tight">{doctor.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {doctor.credentials} · {doctor.yearsExperience} years
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {pendingCredentialRows.map((row) => (
                      <li key={row} className="flex items-center justify-between gap-3 text-xs">
                        <span className="text-muted-foreground">{row}</span>
                        <PendingTag label="To confirm" />
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="grain relative isolate bg-ink text-white" spacing="md">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-14">
            <div>
              <p className="text-[.66rem] font-semibold uppercase tracking-[.2em] text-gold">From Google</p>
              <h2 className="mt-4 font-serif text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.03] tracking-[-.04em]">
                What patients say about our clinics.
              </h2>
              <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                <Link
                  href="/contact/#book"
                  data-track="appointment_start"
                  data-placement="doctors_cta"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-ink sm:whitespace-nowrap"
                >
                  Book Appointment
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  data-track="whatsapp_click"
                  data-placement="doctors_cta"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/18 px-6 text-sm font-semibold sm:whitespace-nowrap"
                >
                  <MessageCircle className="size-4 text-gold" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {locations.map((location) => (
                <BranchGoogleCard
                  key={location.slug}
                  location={location}
                  dark
                  placement={`doctors_google_${location.slug}`}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
