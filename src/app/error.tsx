"use client";

import Link from "next/link";
import { MessageCircle, Phone, RotateCw } from "lucide-react";

import { Container } from "@/components/ui/container";
import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

/**
 * Something broke on a page. The patient gets the phone, WhatsApp and a
 * retry, not a stack trace. The clinic's number works whether or not the
 * website does.
 */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="hue-coral field relative isolate flex min-h-[70vh] items-center overflow-hidden" style={{ ["--f1" as string]: "var(--coral-tint)", ["--f2" as string]: "var(--sunshine-tint)", ["--f3" as string]: "var(--sky-tint)" }}>
      <Container width="7xl" className="relative py-14">
        <p className="t-eyebrow text-coral-text">Something went wrong</p>
        <h1 className="t-h1 measure-head mt-3">This page did not load properly.</h1>
        <p className="t-stand measure-stand mt-4 text-ink-soft">Nothing you did caused it. Try again, or reach the clinic directly.</p>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          <button type="button" onClick={reset} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cobalt px-5 text-[.9375rem] font-semibold text-white">
            <RotateCw className="size-4" aria-hidden="true" />
            Try again
          </button>
          <a href={`tel:${site.primaryPhoneHref}`} data-track="phone_click" data-placement="error_page" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-[.9375rem] font-semibold ring-1 ring-line">
            <Phone className="size-4 text-cobalt-deep" aria-hidden="true" />
            {site.primaryPhoneDisplay}
          </a>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="error_page" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-5 text-[.9375rem] font-semibold text-white">
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
        <Link href="/" className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-cobalt-deep">
          Back to the homepage
        </Link>
      </Container>
    </section>
  );
}
