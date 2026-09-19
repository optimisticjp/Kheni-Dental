"use client";

import { ArrowUpRight, MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { InstagramIcon } from "@/components/icons/instagram-icon";
import { BrandMark } from "@/components/kheni/brand-mark";
import { Stars } from "@/components/kheni/proof";
import { currentNavHref } from "@/components/layout/navbar";
import { instagramHandle, instagramUrl } from "@/content/instagram";
import { googleReputation } from "@/content/google-reputation";
import { clinicHours, locations, primaryNav, secondaryNav, site } from "@/content/site";
import { bookHref, whatsappUrl } from "@/lib/links";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation. A full-screen near-black sheet that fits on one
 * screen: the seven primary destinations as ivory serif rows, one line
 * carrying the Google rating and Instagram, the quiet links, then Book,
 * Call and WhatsApp where a thumb already is.
 *
 * It did not fit before. At 390 x 844 the content ran 210px past the
 * viewport, so Book and WhatsApp sat below the fold in a menu whose whole
 * job is to get someone to tap one of them.
 *
 * What went, and why:
 *   - the "What brings you in?" chips, about 170px of the overflow. The
 *     same destination is already one of the quiet links below, so nothing
 *     became unreachable.
 *   - the two tall colour panels, replaced by one row of two compact cards.
 *     The Google rating and the review count are still here, because on a
 *     phone that is the most persuasive thing on the screen.
 *
 * Below 740px of viewport height everything steps down one notch: shorter
 * rows, smaller quiet links, tighter buttons. The full-size touch targets
 * stay wherever there is room for them rather than being traded away on
 * every phone to satisfy the smallest one.
 *
 * Focus moves to the close button on open, Tab is trapped, Escape closes,
 * body scroll is locked and restored, focus returns to the trigger.
 */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const current = currentNavHref(pathname, primaryNav);

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

      <nav aria-label="Mobile navigation" className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pt-1 sm:px-6">
        <ul>
          {primaryNav.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                aria-current={current === link.href ? "page" : undefined}
                className="flex min-h-[2.875rem] items-center justify-between gap-4 border-b border-ivory/10 py-1.5 font-serif text-[1.3rem] leading-tight tracking-[-.015em] [@media(max-height:740px)]:min-h-[2.5rem] [@media(max-height:740px)]:py-0.5 [@media(max-height:740px)]:text-[1.15rem]"
              >
                <span className={current === link.href ? "text-gold" : "text-ivory"}>{link.label}</span>
                <ArrowUpRight aria-hidden="true" className={cn("size-4 shrink-0", current === link.href ? "text-gold" : "text-ivory/35")} />
              </Link>
            </li>
          ))}
        </ul>

        {/* The rating and the clinics on one line, Instagram beside it. The
            compact replacement for two tall panels. */}
        <div className="mt-3.5 grid grid-cols-[1.35fr_1fr] gap-2.5 text-ink [@media(max-height:740px)]:mt-2">
          <Link href="/reviews/" onClick={onClose} data-track="review_click" data-placement="mobile_menu" className="rounded-2xl bg-mint px-3.5 py-2.5 [@media(max-height:740px)]:py-1.5">
            <span className="flex items-baseline gap-1.5">
              <span className="font-serif text-[1.35rem] leading-none">{googleReputation.sharedRating}</span>
              <Stars size="size-3" />
            </span>
            <span className="t-small mt-1 block leading-snug text-ink-soft">
              {googleReputation.combinedReviews} Google reviews, {locations.length} clinics
            </span>
          </Link>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            data-track="instagram_profile_click"
            data-placement="mobile_menu"
            className="rounded-2xl bg-peach px-3.5 py-2.5 [@media(max-height:740px)]:py-1.5"
          >
            <span className="flex items-center gap-1.5 text-gold-text">
              <InstagramIcon className="size-4" />
              <span className="font-serif text-[1.05rem] leading-none text-ink">Instagram</span>
            </span>
            <span className="t-small mt-1 block leading-snug text-ink-soft">{instagramHandle}</span>
          </a>
        </div>

        <ul className="mt-3.5 flex flex-wrap gap-x-4 gap-y-0 border-t border-ivory/10 pt-1.5 [@media(max-height:740px)]:mt-2 [@media(max-height:740px)]:gap-x-3">
          {secondaryNav.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="inline-flex min-h-9 items-center text-[.8125rem] text-ivory/60 hover:text-ivory [@media(max-height:740px)]:min-h-8 [@media(max-height:740px)]:text-[.75rem]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* The actions are pinned to the bottom of the sheet, where a thumb
            already is. The whole group takes the `mt-auto`, so the hours line
            can hide without the buttons drifting up with it.

            Pinning leaves a gap on a tall phone, so it carries the one line
            worth knowing before you tap Call: whether we are open. It hides
            below 820px of viewport height, because at 800 it was the 18px
            that tipped the menu back into scrolling. */}
        <div className="mt-auto">
          <p className="pt-4 text-center text-[.8125rem] text-ivory/45 [@media(max-height:820px)]:hidden">
            {clinicHours.days} &middot; {clinicHours.morning} and {clinicHours.evening}
          </p>

          <div className="grid gap-2.5 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-3.5 [@media(max-height:740px)]:gap-2 [@media(max-height:740px)]:pt-2.5">
            <Link
              href={bookHref}
              data-book
              onClick={onClose}
              data-track="appointment_start"
              data-placement="mobile_menu"
              className="inline-flex min-h-13 items-center justify-center rounded-full bg-gold px-5 text-base font-semibold text-ink [@media(max-height:740px)]:min-h-12"
            >
              Book Appointment
            </Link>
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={`tel:${site.primaryPhoneHref}`}
                data-track="phone_click"
                data-placement="mobile_menu"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-ivory/25 text-sm font-semibold text-ivory [@media(max-height:740px)]:min-h-12"
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
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-whatsapp text-sm font-semibold text-white [@media(max-height:740px)]:min-h-12"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
