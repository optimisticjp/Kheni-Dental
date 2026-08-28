import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CaseResultsGrid } from "@/components/kheni/case-results";
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
      <section className="bg-ink text-white">
        <Container width="7xl" className="py-12 lg:py-16">
          <p className="text-[.7rem] font-semibold uppercase tracking-[.24em] text-gold">Our work</p>
          <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.1rem,5.4vw,3.8rem)] leading-[1] tracking-[-.045em]">
            Before &amp; after
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/60">
            Cases treated at our Surat clinics, published only where the patient has given permission.
          </p>
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
        </Container>
      </section>

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
