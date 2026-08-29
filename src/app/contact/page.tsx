import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";

import { BranchLocator } from "@/components/kheni/branch-locator";
import { ConsultationForm } from "@/components/kheni/consultation-form";
import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { locations, site } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "Contact the Clinic in Surat",
  description:
    "Call Kheni Dental in Surat, message us on WhatsApp or email the clinic. You do not need to know which treatment you need before you get in touch.",
};

/**
 * Contact.
 *
 * Recomposed around what a phone actually needs, in order: reach us now, then
 * the form, then choose a clinic. The page previously ran a dark card, an
 * advice card, two Google review cards, the form, and then both branch cards
 * again complete with maps — the same two clinics stated three times.
 *
 * WhatsApp leads because for this audience it is the highest-value action: it
 * costs nothing, it is asynchronous, and it is where the clinic already talks
 * to patients. The branch locator at the bottom carries the branch choice, the
 * per-branch Google rating, the exact map and directions in one block.
 */
export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Getting in touch should be the easy part."
        copy="You do not need a diagnosis or the name of a treatment to start. Say what is troubling you, in whatever words you would use, and the team will take it from there."
      />

      {/* ── Reach us now ─────────────────────────────────────────────────── */}
      <Section spacing="sm">
        <Container width="7xl">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              data-track="whatsapp_click"
              data-placement="contact_primary"
              className="flex min-h-16 items-center justify-between gap-4 rounded-2xl bg-ink px-5 text-white sm:col-span-2 lg:col-span-1"
            >
              <span>
                <span className="t-eyebrow block text-gold">Fastest reply</span>
                <span className="t-card mt-1 block">Message on WhatsApp</span>
              </span>
              <MessageCircle className="size-5 shrink-0 text-gold" aria-hidden="true" />
            </a>

            {/*
              Both lines, not just the Yogi Chowk one.

              The clinics keep separate numbers, and the contact page led with
              a single line labelled "Yogi Chowk line" — which is honest, but
              leaves a patient who wants Hirabaug at a dead end on the page
              built for reaching us. Each branch now offers its own number,
              named, so nobody has to guess which clinic they are calling.
            */}
            {locations.map((location) => (
              <a
                key={location.slug}
                href={`tel:${location.phoneHref}`}
                data-track="phone_click"
                data-placement="contact_primary"
                data-branch={location.slug}
                className="flex min-h-16 items-center justify-between gap-4 rounded-2xl border border-border bg-card px-5"
              >
                <span className="min-w-0">
                  <span className="t-eyebrow block text-muted-foreground">{location.displayArea}</span>
                  <span className="t-card mt-1 block">{location.phoneDisplay}</span>
                </span>
                <Phone className="size-5 shrink-0 text-gold" aria-hidden="true" />
              </a>
            ))}

            <a
              href={`mailto:${site.email}`}
              className="flex min-h-16 items-center justify-between gap-4 rounded-2xl border border-border bg-card px-5"
            >
              <span className="min-w-0">
                <span className="t-eyebrow block text-muted-foreground">Email</span>
                <span className="mt-1 block truncate text-sm font-medium">{site.email}</span>
              </span>
              <Mail className="size-5 shrink-0 text-gold" aria-hidden="true" />
            </a>
          </div>
        </Container>
      </Section>

      {/* ── The form ─────────────────────────────────────────────────────── */}
      <Section id="book" className="scroll-mt-24 bg-[#f1eee7]" spacing="md">
        <Container width="7xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
            <div>
              <h2 className="t-h2">Ask for an appointment</h2>
              <p className="t-body measure-narrow mt-3 text-muted-foreground">
                Four details and the team will come back to you with times. Please keep medical history for the
                consultation itself rather than the form.
              </p>
            </div>
            <ConsultationForm />
          </div>
        </Container>
      </Section>

      {/* ── Choose a clinic. Map, rating, hours and directions in one. ──── */}
      <Section spacing="md">
        <Container width="7xl">
          <h2 className="t-h2">Which clinic suits you?</h2>
          <p className="t-body measure-body mt-3 text-muted-foreground">
            Both belong to the same practice. Each keeps its own number and its own Google listing.
          </p>
          <div className="mt-7">
            <BranchLocator placement="contact" />
          </div>
        </Container>
      </Section>
    </>
  );
}
