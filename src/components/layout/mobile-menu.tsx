"use client";

import { ArrowUpRight, MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { KheniMonogram } from "@/components/kheni/brand-mark";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { featuredReels, instagramHandle, instagramUrl, reelPosterSrcSet } from "@/content/instagram";
import { concerns, primaryNav, secondaryNav, site } from "@/content/site";
import { bookHref, whatsappUrl } from "@/lib/links";

/**
 * Mobile navigation as a brand moment: a full-screen electric blue field,
 * six big destinations, the concern chips, the clinic's Instagram, and
 * Book, Call and WhatsApp where a thumb already is.
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
      const focusable = Array.from(menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
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

  const reels = featuredReels(4);

  return (
    <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site navigation" className="menu-in on-blue fixed inset-0 z-[100] flex min-h-dvh flex-col bg-blue text-white lg:hidden">
      <div className="flex h-16 shrink-0 items-center justify-between px-4 sm:h-[4.5rem] sm:px-6">
        <Link href="/" onClick={onClose} className="inline-flex items-center gap-2.5" aria-label="Kheni Dental home">
          <KheniMonogram className="size-10" tone="butter" />
          <span className="font-display text-[1.2rem] font-extrabold tracking-[-.04em]">Kheni Dental</span>
        </Link>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close menu" className="grid size-11 place-items-center rounded-full bg-white text-ink">
          <X className="size-5" />
        </button>
      </div>

      <nav aria-label="Mobile navigation" className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pt-2 sm:px-6">
        <ul>
          {primaryNav.map((link, i) => (
            <li key={link.href} className={`rise${i > 0 ? (i > 1 ? "-3" : "-2") : ""}`}>
              <Link href={link.href} onClick={onClose} className="flex min-h-[3.4rem] items-center justify-between gap-4 border-b border-white/15 font-display text-[2rem] font-extrabold leading-none tracking-[-.04em] text-white">
                {link.label}
                <ArrowUpRight aria-hidden="true" className="size-6 shrink-0 text-butter" />
              </Link>
            </li>
          ))}
        </ul>

        <p className="t-eyebrow mt-6 text-butter">Tell us what is bothering you</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {concerns.slice(0, 6).map((concern) => (
            <li key={concern.id}>
              <Link href={concern.href} onClick={onClose} data-track="treatment_view" data-placement="mobile_menu_concern" className="inline-flex min-h-10 items-center rounded-full bg-white/12 px-3.5 text-sm font-semibold text-white ring-1 ring-white/25">
                {concern.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          data-track="instagram_profile_click"
          data-placement="mobile_menu"
          onClick={onClose}
          className="mt-6 flex items-center justify-between gap-3 rounded-[1.25rem] bg-ink/25 p-3 pr-4 ring-1 ring-white/15"
        >
          <span className="flex items-center gap-3">
            <span className="flex -space-x-3">
              {reels.map((reel) =>
                reel.poster ? (
                  // eslint-disable-next-line @next/next/no-img-element -- images are unoptimized site-wide
                  <img key={reel.id} src={reel.poster} srcSet={reelPosterSrcSet(reel.poster)} sizes="44px" alt="" loading="lazy" decoding="async" className="size-11 rounded-full object-cover ring-2 ring-blue" style={{ objectPosition: reel.objectPosition }} />
                ) : (
                  <span key={reel.id} className="size-11 rounded-full bg-butter ring-2 ring-blue" />
                ),
              )}
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base font-extrabold tracking-[-.02em]">{instagramHandle}</span>
              <span className="block text-xs text-white/75">Reels from the clinic</span>
            </span>
          </span>
          <InstagramIcon className="size-5 shrink-0 text-butter" />
        </a>

        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-0.5">
          {secondaryNav.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={onClose} className="inline-flex min-h-10 items-center text-sm text-white/80 hover:text-white">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto grid gap-2.5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6">
          <Link href={bookHref} data-book onClick={onClose} data-track="appointment_start" data-placement="mobile_menu" className="btn btn-butter btn-lg">
            Book Appointment
          </Link>
          <div className="grid grid-cols-2 gap-2.5">
            <a href={`tel:${site.primaryPhoneHref}`} data-track="phone_click" data-placement="mobile_menu" className="btn btn-outline-light">
              <Phone className="size-4" aria-hidden="true" />
              Call
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="mobile_menu" className="btn btn-whatsapp">
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
