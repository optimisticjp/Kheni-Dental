import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight, MessageCircle, Phone } from "lucide-react";

import { PageHero } from "@/components/kheni/page-hero";
import { PendingTag } from "@/components/kheni/pending";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { emergencyPending, resourceCategories, urgentSigns } from "@/content/patient-resources";
import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "Patient Resources & Aftercare",
  description:
    "Practical guides from Kheni Dental, Surat: what to bring to a first visit, aftercare for root canals and implants, kids dental advice and when to call the clinic.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient resources"
        title="The bit that happens after you leave the chair."
        copy="Guides for the day before an appointment and the days after one. Written to help you prepare and to tell you when something is worth a phone call."
      >
        {/* Category jump list. Faster than scrolling a long library on a phone. */}
        <nav aria-label="Resource categories" className="mt-8 flex flex-wrap gap-2">
          {resourceCategories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="inline-flex min-h-11 items-center rounded-full border border-white/18 px-4 text-sm text-white/70 hover:border-gold/50 hover:text-white"
            >
              {category.label}
            </a>
          ))}
          <a
            href="#urgent"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gold/45 bg-gold/[.08] px-4 text-sm font-semibold text-gold"
          >
            <AlertTriangle className="size-3.5" aria-hidden="true" />
            Something is wrong now
          </a>
        </nav>
      </PageHero>

      {/* ── Urgent first. Anyone in pain should not have to scroll. ──────── */}
      <Section id="urgent" className="scroll-mt-24 bg-[#f1eee7]" spacing="sm">
        <Container width="7xl">
          <div className="rounded-[1.4rem] border border-gold/40 bg-white p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-[.66rem] font-semibold uppercase tracking-[.16em] text-gold">
                  <AlertTriangle className="size-3.5" aria-hidden="true" />
                  Call the clinic if you notice
                </span>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {urgentSigns.map((sign) => (
                    <li key={sign} className="flex items-start gap-3 text-sm leading-6">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                      {sign}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
                  {emergencyPending}
                  <PendingTag label="To confirm" />
                </div>
              </div>

              <div className="flex flex-col gap-2.5 lg:w-56">
                <a
                  href={`tel:${site.primaryPhoneHref}`}
                  data-track="phone_click"
                  data-placement="resources_urgent"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white"
                >
                  <Phone className="size-4 text-gold" aria-hidden="true" />
                  Call the clinic
                </a>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  data-track="whatsapp_click"
                  data-placement="resources_urgent"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-border px-5 text-sm font-semibold"
                >
                  <MessageCircle className="size-4 text-gold" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── The library ──────────────────────────────────────────────────── */}
      {resourceCategories.map((category, index) => (
        <Section
          key={category.id}
          id={category.id}
          className={index % 2 === 1 ? "scroll-mt-24 bg-[#f1eee7]" : "scroll-mt-24"}
          spacing="md"
        >
          <Container width="7xl">
            <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:gap-14">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="font-mono text-[.65rem] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="rule-gold h-px w-12" />
                </div>
                <h2 className="t-h2 mt-4">
                  {category.label}
                </h2>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{category.intro}</p>
              </div>

              <div className="grid gap-4">
                {category.guides.map((guide) => (
                  <article
                    key={guide.id}
                    id={guide.id}
                    className={
                      guide.status === "published"
                        ? "scroll-mt-24 rounded-2xl border border-border bg-card p-6 sm:p-7"
                        : "scroll-mt-24 rounded-2xl border border-dashed border-border bg-card/50 p-6 sm:p-7"
                    }
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h3 className="font-serif text-xl leading-snug">{guide.title}</h3>
                      {guide.status === "pending" && <PendingTag label="Clinic instructions needed" />}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{guide.summary}</p>

                    {guide.status === "published" ? (
                      <ul className="mt-5 grid gap-3">
                        {guide.points.map((point) => (
                          <li
                            key={point}
                            className="rounded-xl bg-[#f4f1ea] p-4 text-sm leading-6 text-muted-foreground"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-5 rounded-xl border border-dashed border-border p-4 text-xs leading-6 text-muted-foreground/80">
                        <span className="font-semibold text-foreground">We need from the clinic: </span>
                        {guide.needs}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <Section spacing="md">
        <Container width="7xl">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
              These guides are general information, written to help you prepare and ask better questions. They cannot
              tell you what is happening in your own mouth, because that needs an examination. If anything here does
              not match what you have been told at the clinic, go with what the doctor treating you said and ask them
              about the difference.
            </p>
            <Link
              href="/contact/#book"
              data-track="appointment_start"
              data-placement="resources_footer"
              className="mt-6 inline-flex min-h-13 items-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-ink"
            >
              Book Appointment
              <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
