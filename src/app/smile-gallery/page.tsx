import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CaseResultsGrid, FeaturedCase } from "@/components/kheni/case-results";
import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { caseDisclaimer } from "@/content/cases";

export const metadata: Metadata = {
  title: "Before & After Results",
  description:
    "Before and after dental results from Kheni Dental in Surat. Implants, full mouth rehabilitation, smile design, crowns and braces, shown with patient permission.",
};

/**
 * Before and after.
 *
 * One case leads, told properly; the rest sit behind it as an archive. The
 * category filter chips that used to open this page are gone: they were
 * controls for filtering nothing, and a row of buttons that cannot act is the
 * fastest way to make a page feel unfinished. The categories now appear where
 * they are simply information, in the standfirst.
 */
export default function SmileGalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Before &amp; after"
        copy={`Implants, full mouth rehabilitation, smile design, crowns and braces. Every case here was treated at one of our two Surat clinics and is published only with the patient's written permission.`}
      />

      <Section spacing="md">
        <Container width="7xl">
          <FeaturedCase />
        </Container>
      </Section>

      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="t-h2">More cases</h2>
            <p className="t-small measure-narrow text-muted-foreground">
Implants, full mouth rehabilitation, smile design, crowns and braces.
            </p>
          </div>
          <div className="mt-8">
            <CaseResultsGrid limit={6} />
          </div>
          <p className="t-small mt-6 max-w-2xl text-muted-foreground">{caseDisclaimer}</p>
        </Container>
      </Section>

      <Section spacing="md">
        <Container width="7xl">
          <div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <p className="t-h3 measure-narrow">Want to know what is possible in your case?</p>
            <Link
              href="/contact/#book"
              data-track="appointment_start"
              data-placement="gallery_cta"
              className="group inline-flex min-h-13 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white"
            >
              Book Appointment
              <ArrowRight className="cta-arrow size-4 text-gold" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
