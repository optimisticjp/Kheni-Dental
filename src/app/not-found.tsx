import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { BookButton, WhatsAppButton } from "@/components/ui/cta";

export default function NotFound() {
  return (
    <section className="on-coral mood-coral bg-coral text-ink">
      <Container width="4xl" className="py-16 sm:py-24">
        <p className="t-eyebrow">404</p>
        <h1 className="t-h1 mt-3">
          We cannot find <span className="hl">that page.</span>
        </h1>
        <p className="t-lead measure-lead muted mt-4">The link may be old. You can look through the treatments, pick a clinic, or just tell us what is troubling you.</p>
        <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          <BookButton placement="not_found" variant="ink" />
          <WhatsAppButton placement="not_found" />
          <Link href="/treatments/" className="btn btn-white">
            See treatments
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
