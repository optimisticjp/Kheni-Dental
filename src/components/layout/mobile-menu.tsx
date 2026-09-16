"use client";

import { ArrowUpRight, MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { InstagramIcon } from "@/components/icons/instagram-icon";
import { BrandMark } from "@/components/kheni/brand-mark";
import { instagramHandle, instagramUrl } from "@/content/instagram";
import { googleReputation } from "@/content/google-reputation";
import { concerns, locations, primaryNav, secondaryNav, site } from "@/content/site";
import { bookHref, whatsappUrl } from "@/lib/links";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation. A full-screen near-black sheet: the six primary
 * destinations as large ivory serif rows (implants in gold), a row of
 * concern chips, two soft-colour panels for the clinics and Instagram,
 * the quiet links, then Book, Call and WhatsApp where a thumb already is.
 *
 * Focus moves to the close button on open, Tab is trapped, Escape closes,
 * body scroll is locked and restored, focus returns to the trigger.
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
      className="menu-in on-dark fixed inset-0 z-[100] flex min-h-dvh flex-col bg-ink text-ivory lg:hidden"
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-ivory/10 px-4 sm:h-[72px] sm:px-6">
        <BrandMark compact />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid size-11 place-items-center rounded-full border border-ivory/20"
        >
          <X className="size-5" />
        </button>
      </div>

      <nav aria-label="Mobile navigation" className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pt-2 sm:px-6">
        <ul>
          {primaryNav.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="flex min-h-[3.25rem] items-center justify-between gap-4 border-b border-ivory/10 py-2.5 font-serif text-[1.45rem] leading-tight tracking-[-.015em]"
              >
                <span className={link.accent ? "text-gold" : "text-ivory"}>{link.label}</span>
                <ArrowUpRight aria-hidden="true" className={cn("size-4 shrink-0", link.accent ? "text-gold" : "text-ivory/35")} />
              </Link>
            </li>
          ))}
        </ul>

        {/* A quick route in for someone who knows the symptom. */}
        <p className="t-eyebrow mt-5 text-gold">What brings you in?</p>
        <ul className="mt-2.5 flex flex-wrap gap-2">
          {concerns.slice(0, 6).map((concern) => (
            <li key={concern.id}>
              <Link
                href={concern.href}
                onClick={onClose}
                data-track="treatment_view"
                data-placement="mobile_menu_concern"
                className="inline-flex min-h-10 items-center rounded-full border border-ivory/15 px-3.5 text-sm text-ivory/85"
              >
                {concern.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Two light panels: where we are, and the living clinic on Instagram. */}
        <div className="mt-5 grid grid-cols-2 gap-2.5 text-ink">
          <Link href="/locations/" onClick={onClose} className="rounded-2xl bg-mint p-3.5">
            <span className="t-eyebrow block text-gold-text">Two clinics</span>
            <span className="mt-1.5 block font-serif text-[1.05rem] leading-snug">{locations.map((l) => l.displayArea).join(" and ")}</span>
            <span className="t-small mt-1 block text-ink-soft">{googleReputation.sharedRating} on Google, {googleReputation.combinedShort}</span>
          </Link>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            data-track="instagram_profile_click"
            data-placement="mobile_menu"
            className="rounded-2xl bg-peach p-3.5"
          >
            <span className="t-eyebrow flex items-center gap-1.5 text-gold-text">
              <InstagramIcon className="size-3.5" />
              Instagram
            </span>
            <span className="mt-1.5 block font-serif text-[1.05rem] leading-snug">Inside Kheni</span>
            <span className="t-small mt-1 block text-ink-soft">{instagramHandle}</span>
          </a>
        </div>

        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-0.5 border-t border-ivory/10 pt-3">
          {secondaryNav.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={onClose} className="inline-flex min-h-10 items-center text-sm text-ivory/60 hover:text-ivory">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto grid gap-2.5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-5">
          <Link
            href={bookHref}
            data-book
            onClick={onClose}
            data-track="appointment_start"
            data-placement="mobile_menu"
            className="inline-flex min-h-13 items-center justify-center rounded-full bg-gold px-5 text-base font-semibold text-ink"
          >
            Book Appointment
          </Link>
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={`tel:${site.primaryPhoneHref}`}
              data-track="phone_click"
              data-placement="mobile_menu"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-ivory/25 text-sm font-semibold text-ivory"
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
