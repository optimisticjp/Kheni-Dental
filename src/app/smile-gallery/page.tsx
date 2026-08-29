import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CaseResultsGrid } from "@/components/kheni/case-results";
import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { caseCategories } from "@/content/cases";

export const metadata: Metadata = {
  title: "Before & After Results",
  description:
    "Before and after dental results from Kheni Dental in Surat. Implants, full mouth rehabilitation, smile design, crowns and braces, shown with patient permission.",
};

export default function SmileGalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Before &amp; after."
        copy="Cases treated at our Surat clinics, published only where the patient has given written permission."
      >
        <ul className="mt-8 flex flex-wrap gap-2">
            {caseCategories.map((category) => (
              <li
                key={category}
                className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 text-sm text-white/70"
              >
                {category}
              </li>
            ))}
          </ul>
      </PageHero>

      <Section spacing="md">
        <Container width="7xl">
          <CaseResultsGrid />
        </Container>
      </Section>

      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <p className="max-w-xl font-serif text-2xl leading-tight sm:text-3xl">
              Want to know what is possible in your case?
            </p>
            <Link
              href="/contact/#book"
              data-track="appointment_start"
              data-placement="gallery_cta"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white"
            >
              Book Appointment <ArrowRight className="size-4 text-gold" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
