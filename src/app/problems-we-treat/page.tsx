import type { Metadata } from "next";
import { GoogleTrustBar } from "@/components/kheni/google-trust";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";

import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { helpTopics, problems } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export const metadata: Metadata = {
  alternates: { canonical: "/problems-we-treat/" },
  title: "Dental Problems We Treat in Surat",
  description:
    "Tooth pain, bleeding gums, a missing tooth, a nervous child, crowded teeth. Start with the problem you have and see what usually comes next at our Surat clinics.",
};

/**
 * The symptom index.
 *
 * Deliberately not the homepage rail again. The rail is treatment-led and
 * interactive; this page is symptom-led and readable: two-word chips for
 * someone who already knows what is wrong, then the same complaints written
 * out as full sentences for someone who does not. Anyone landing here from a
 * search for "tooth pain Surat" wants to read, not to operate a component.
 */
export default function ProblemsPage() {
  return (
    <>
      <PageHero
        eyebrow="Problems we treat"
        title="It usually starts with a sentence like one of these."
        copy="You do not have to name the problem correctly to get help with it. Pick the one that sounds closest, read what it usually points to, then let a dentist check the real cause."
      >
        {/* Fast route out for anyone who already knows the word for it. */}
        <ul className="mt-8 flex flex-wrap gap-2">
          {helpTopics.map((topic) => (
            <li key={topic.label}>
              <Link
                href={topic.href}
                data-track="treatment_view"
                data-placement="problems_chips"
                className="inline-flex min-h-11 items-center rounded-full border border-white/18 px-4 text-sm text-white/75 hover:border-gold/50 hover:text-white"
              >
                {topic.label}
              </Link>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section spacing="md">
        <Container width="7xl">
          <ul className="grid gap-4 lg:grid-cols-2">
            {problems.map((problem, index) => (
              <li key={problem.title}>
                <Link
                  href={problem.href}
                  data-track="treatment_view"
                  data-placement="problems_index"
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-gold/45 sm:p-7"
                >
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="font-mono text-[.65rem] text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden="true" className="rule-gold h-px w-10" />

                  </div>
                  <h2 className="mt-4 font-serif text-2xl leading-snug tracking-[-.02em]">
                    &ldquo;{problem.title}&rdquo;
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{problem.detail}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                    What usually comes next
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Independent proof. The only thing on this site a patient can
          go and check for themselves, so it is restated wherever they
          might be deciding. */}
      <Section spacing="sm">
        <Container width="7xl">
          <GoogleTrustBar placement="problems-we-treat_trust" />
        </Container>
      </Section>

      <section className="bg-gold py-14 text-ink sm:py-16">
        <Container width="7xl" className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <h2 className="max-w-xl t-h1">
            Not on the list? Describe it in your own words.
          </h2>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Link
              href="/contact/#book"
              data-track="appointment_start"
              data-placement="problems_cta"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white sm:whitespace-nowrap"
            >
              Book Appointment
              <ArrowRight className="cta-arrow size-4 text-gold" aria-hidden="true" />
            </Link>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              data-track="whatsapp_click"
              data-placement="problems_cta"
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
