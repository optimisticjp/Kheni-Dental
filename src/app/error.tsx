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
    <section className="on-coral mood-coral relative isolate flex min-h-[70vh] items-center overflow-hidden bg-coral text-ink">
      <Container width="7xl" className="relative py-14">
        <p className="t-eyebrow text-coral-deep">Something went wrong</p>
        <h1 className="t-h1 measure-head mt-3">This page did not load properly.</h1>
        <p className="t-stand measure-stand mt-4 text-ink-soft">Nothing you did caused it. Try again, or reach the clinic directly.</p>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          <button type="button" onClick={reset} className="btn btn-ink">
            <RotateCw className="size-4" aria-hidden="true" />
            Try again
          </button>
          <a href={`tel:${site.primaryPhoneHref}`} data-track="phone_click" data-placement="error_page" className="btn btn-white">
            <Phone className="size-4 text-ink" aria-hidden="true" />
            {site.primaryPhoneDisplay}
          </a>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="error_page" className="btn btn-whatsapp">
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
        <Link href="/" className="mt-6 inline-flex min-h-11 items-center text-sm font-bold text-ink underline underline-offset-4">
          Back to the homepage
        </Link>
      </Container>
    </section>
  );
}
