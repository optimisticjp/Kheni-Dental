import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { BookButton, WhatsAppButton } from "@/components/ui/cta";

export default function NotFound() {
  return (
    <section className="hue-coral field relative isolate overflow-hidden" style={{ ["--f1" as string]: "var(--coral-tint)", ["--f2" as string]: "var(--sunshine-tint)", ["--f3" as string]: "var(--sky-tint)" }}>
      <Container width="4xl" className="relative py-16 sm:py-24">
        <p className="t-eyebrow text-coral-text">404</p>
        <h1 className="t-h1 mt-3">
          We cannot find <span className="hl">that page.</span>
        </h1>
        <p className="t-stand measure-stand mt-4 text-ink-soft">The link may be old. You can look through the treatments, pick a clinic, or just tell us what is troubling you.</p>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          <BookButton placement="not_found" />
          <WhatsAppButton placement="not_found" variant="secondary" />
          <Link href="/treatments/" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-[.9375rem] font-semibold ring-1 ring-line">
            See treatments
            <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
