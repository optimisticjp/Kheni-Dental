import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ImplantSystemRail, TechnologyGrid } from "@/components/kheni/capability-grids";
import { ClinicGallery } from "@/components/kheni/clinic-gallery";
import { PageHero } from "@/components/kheni/page-hero";
import { PendingTag } from "@/components/kheni/pending";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { implantWorkflowPending } from "@/content/capabilities";

export const metadata: Metadata = {
  title: "Our Technology & Clinic",
  description:
    "The equipment, implant systems and clinic environment at Kheni Dental in Surat, at Yogi Chowk and Hirabaug.",
};

export default function ClinicTechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        title="The equipment behind your treatment."
        copy="What each machine lets the dentist see, and what it means for your appointment. Named only once the clinic confirms exactly what it runs."
      />

      <Section spacing="md">
        <Container width="7xl">
          <h2 className="t-h2">Equipment</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            The clinic has the equipment; we are waiting on the exact names and photographs before publishing any of
            it. No scanner, imaging system or technique is claimed until then.
          </p>
          <div className="mt-8">
            <TechnologyGrid />
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <h2 className="t-h2">Implant systems</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Which systems we place, and at which branch. This is the single most useful thing an implant patient can
            compare, so it will carry real brand names as soon as they are confirmed.
          </p>
          <div className="mt-8">
            <ImplantSystemRail tone="light" />
          </div>

          <h3 className="mt-12 font-serif text-2xl leading-tight tracking-[-.02em]">Surgical options</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Each of these is a separate clinical claim, so each needs confirming separately.
          </p>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {implantWorkflowPending.map((item) => (
              <li
                key={item}
                className="flex min-h-13 items-center justify-between gap-3 rounded-xl border border-dashed border-border bg-white px-4 text-sm"
              >
                {item}
                <PendingTag label="To confirm" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section spacing="md">
        <Container width="7xl">
          <h2 className="t-h2">Inside our clinics</h2>
          <ClinicGallery tone="light" className="mt-8" />
          <Link
            href="/locations/"
            className="mt-8 inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-gold"
          >
            See both clinics <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
          </Link>
        </Container>
      </Section>
    </>
  );
}
