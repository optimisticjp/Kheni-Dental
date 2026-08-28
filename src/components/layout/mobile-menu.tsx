"use client";

import { ArrowUpRight, MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { BrandMark } from "@/components/kheni/brand-mark";
import { primaryNav, secondaryNav, site } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export type NavLink = { href: string; label: string };

/**
 * Mobile navigation.
 *
 * The old menu listed nine sections as nine equal full-width rows, which made
 * the sheet long and made every destination look equally important. This
 * version leads with six primary choices, demotes the rest into a quiet
 * secondary block, and puts Call and WhatsApp where a thumb already is.
 * Home is reachable from the logo and the bottom dock, so it is not repeated
 * as a giant row.
 *
 * The behaviour that was tested at length is unchanged: focus moves to the
 * close button on open, Tab is trapped inside the dialog, Escape closes,
 * body scroll is locked and restored, and focus returns to the trigger.
 */
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

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-[100] flex min-h-dvh flex-col bg-ink text-white xl:hidden"
    >
      <div className="flex h-[74px] shrink-0 items-center justify-between border-b border-white/10 px-4 sm:px-6">
        <BrandMark />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid size-11 place-items-center rounded-full border border-white/15"
        >
          <X className="size-5" />
        </button>
      </div>

      <nav aria-label="Mobile navigation" className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-5 sm:px-6">
        {/* Primary: six choices, large enough to hit without looking. */}
        <ul>
          {primaryNav.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="flex min-h-14 items-center justify-between gap-4 border-b border-white/10 py-3 font-serif text-2xl leading-tight"
              >
                <span className={link.featured ? "text-gold" : undefined}>{link.label}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className={link.featured ? "size-4 shrink-0 text-gold" : "size-4 shrink-0 text-white/25"}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Secondary: present, but clearly a lower tier. */}
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1">
          {secondaryNav.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="inline-flex min-h-11 items-center text-sm text-white/50 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions pinned to the bottom of the sheet, above the safe area. */}
        <div className="mt-auto grid gap-2.5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-8">
          <Link
            href="/contact/#book"
            onClick={onClose}
            data-track="appointment_start"
            data-placement="mobile_menu"
            className="inline-flex min-h-13 items-center justify-center rounded-full bg-gold px-5 font-semibold text-ink"
          >
            Book Appointment
          </Link>
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={`tel:${site.primaryPhoneHref}`}
              data-track="phone_click"
              data-placement="mobile_menu"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/15 text-sm font-semibold"
            >
              <Phone className="size-4 text-gold" aria-hidden="true" />
              Call
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              data-track="whatsapp_click"
              data-placement="mobile_menu"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/15 text-sm font-semibold"
            >
              <MessageCircle className="size-4 text-gold" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
