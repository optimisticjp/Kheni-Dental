import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ImplantSystemRail, TechnologyGrid } from "@/components/kheni/capability-grids";
import { MediaFrame } from "@/components/kheni/pending";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { clinicGallerySlots } from "@/content/capabilities";

export const metadata: Metadata = {
  title: "Our Technology & Clinic",
  description:
    "The equipment, implant systems and clinic environment at Kheni Dental in Surat, at Yogi Chowk and Hirabaug.",
};

export default function ClinicTechnologyPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <Container width="7xl" className="py-12 lg:py-16">
          <p className="text-[.7rem] font-semibold uppercase tracking-[.24em] text-gold">Technology</p>
          <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.1rem,5.4vw,3.8rem)] leading-[1] tracking-[-.045em]">
            The equipment behind your treatment
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/60">
            What each machine lets the dentist see, and what it means for your appointment.
          </p>
        </Container>
      </section>

      <Section spacing="md">
        <Container width="7xl">
          <TechnologyGrid />
        </Container>
      </Section>

      <Section className="bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Implant systems</h2>
          <div className="mt-7">
            <ImplantSystemRail tone="light" />
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container width="7xl">
          <h2 className="font-serif text-3xl leading-tight tracking-[-.03em] sm:text-4xl">Inside our clinics</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clinicGallerySlots.map((shot) => (
              <MediaFrame key={shot} shot={shot} tone="light" ratio="4 / 3" />
            ))}
          </div>
          <Link
            href="/locations/"
            className="mt-8 inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-gold"
          >
            See both clinics <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Container>
      </Section>
    </>
  );
}
