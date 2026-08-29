"use client";

import Link from "next/link";
import { MessageCircle, Phone, RotateCw } from "lucide-react";

import { Container } from "@/components/ui/container";
import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

/**
 * Something broke on a page.
 *
 * A patient who hits this is usually mid-task and often in discomfort, so the
 * page does not apologise at length or offer a stack trace. It gives back the
 * two things they were probably reaching for anyway — the phone and WhatsApp —
 * and a way to try again. The clinic's number works whether or not the website
 * does.
 */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="grain relative isolate flex min-h-[70vh] items-center overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="bloom-gold pointer-events-none absolute inset-0 -z-10" />
      <Container width="7xl">
        <p className="t-eyebrow text-gold">Something went wrong</p>
        <h1 className="t-h1 measure-head mt-4">This page did not load properly.</h1>
        <p className="t-stand measure-stand mt-5 text-white/60">
          Nothing you did caused it. You can try again, or reach the clinic directly and we will help you from there.
        </p>

        <div className="mt-9 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-ink"
          >
            <RotateCw className="size-4" aria-hidden="true" />
            Try again
          </button>
          <a
            href={`tel:${site.primaryPhoneHref}`}
            data-track="phone_click"
            data-placement="error_page"
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold"
          >
            <Phone className="size-4 text-gold" aria-hidden="true" />
            {site.primaryPhoneDisplay}
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            data-track="whatsapp_click"
            data-placement="error_page"
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold"
          >
            <MessageCircle className="size-4 text-gold" aria-hidden="true" />
            WhatsApp
          </a>
        </div>

        <Link href="/" className="mt-8 inline-flex min-h-11 items-center text-sm font-semibold text-gold">
          Back to the homepage
        </Link>
      </Container>
    </section>
  );
}
