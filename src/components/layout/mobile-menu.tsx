"use client";

import { ArrowUpRight, MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { BrandMark } from "@/components/kheni/brand-mark";
import { concerns, primaryNav, secondaryNav, site, treatments } from "@/content/site";
import { bookHref, whatsappUrl } from "@/lib/links";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation. A full-screen porcelain sheet with the six primary
 * destinations as large rows, each carrying the hue of what it leads to,
 * then a row of concern chips, then the quiet links. Book, Call and
 * WhatsApp sit where a thumb already is.
 *
 * Focus moves to the close button on open, Tab is trapped, Escape closes,
 * body scroll is locked and restored, focus returns to the trigger.
 */
const hueFor = (href: string) => {
  if (href.includes("dental-implants")) return "hue-cobalt";
  if (href.startsWith("/treatments")) return "hue-teal";
  if (href.startsWith("/doctors")) return "hue-coral";
  if (href.startsWith("/locations")) return "hue-green";
  if (href.startsWith("/reviews")) return "hue-sunshine";
  return "hue-violet";
};

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocus.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const menu = document.getElementById("mobile-menu");
      if (!menu) return;
      const focusable = Array.from(
        menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const implants = treatments.find((t) => t.slug === "dental-implants-surat");

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="menu-in fixed inset-0 z-[100] flex min-h-dvh flex-col bg-porcelain text-ink xl:hidden"
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4 sm:h-[72px] sm:px-6">
        <BrandMark />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid size-11 place-items-center rounded-full border border-line-strong"
        >
          <X className="size-5" />
        </button>
      </div>

      <nav aria-label="Mobile navigation" className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pt-3 sm:px-6">
        <ul className="grid gap-2">
          {primaryNav.map((link) => (
            <li key={link.href} className={hueFor(link.href)}>
              <Link
                href={link.href}
                onClick={onClose}
                className="flex min-h-14 items-center justify-between gap-4 rounded-2xl bg-h-tint px-4 py-3 font-serif text-[1.35rem] font-medium leading-tight tracking-[-.02em] text-ink"
              >
                <span className="flex items-center gap-3">
                  <span aria-hidden="true" className="size-2.5 rounded-full bg-h-fill" />
                  {link.label}
                </span>
                <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-h-text" />
              </Link>
            </li>
          ))}
        </ul>

        {/* What brings you in: a quick route in for someone who knows the symptom. */}
        <p className="t-eyebrow mt-6 text-ink-soft">What brings you in?</p>
        <ul className="mt-2.5 flex flex-wrap gap-2">
          {concerns.slice(0, 6).map((concern) => (
            <li key={concern.id} className={`hue-${concern.hue}`}>
              <Link
                href={concern.href}
                onClick={onClose}
                data-track="treatment_view"
                data-placement="mobile_menu_concern"
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line-strong bg-white px-3.5 text-sm font-medium"
              >
                <span aria-hidden="true" className="size-2 rounded-full bg-h-fill" />
                {concern.label}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-0.5 border-t border-line pt-4">
          {secondaryNav.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={onClose} className="inline-flex min-h-10 items-center text-sm text-ink-soft hover:text-ink">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={cn("mt-auto grid gap-2.5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6")}>
          <Link
            href={bookHref}
            data-book
            onClick={onClose}
            data-track="appointment_start"
            data-placement="mobile_menu"
            className="inline-flex min-h-13 items-center justify-center rounded-full bg-cobalt px-5 text-base font-semibold text-white"
          >
            Book Appointment
          </Link>
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={`tel:${site.primaryPhoneHref}`}
              data-track="phone_click"
              data-placement="mobile_menu"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-line-strong bg-white text-sm font-semibold"
            >
              <Phone className="size-4 text-cobalt" aria-hidden="true" />
              Call
            </a>
            <a
              href={whatsappUrl(implants ? site.consultationMessage : undefined)}
              target="_blank"
              rel="noreferrer"
              data-track="whatsapp_click"
              data-placement="mobile_menu"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-whatsapp text-sm font-semibold text-white"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
