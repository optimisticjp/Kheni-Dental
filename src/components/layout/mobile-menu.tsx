"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { BrandMark } from "@/components/kheni/brand-mark";
import { whatsappUrl } from "@/lib/links";

export type NavLink = { href: string; label: string };

export function MobileMenu({ open, onClose, links }: { open: boolean; onClose: () => void; links: NavLink[] }) {
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

  return (
    <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site navigation" className="fixed inset-0 z-[100] flex min-h-dvh flex-col bg-ink text-white xl:hidden">
      <div className="flex h-[74px] shrink-0 items-center justify-between border-b border-white/10 px-4 sm:px-6">
        <BrandMark />
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close menu" className="grid size-11 place-items-center rounded-full border border-white/15">
          <X className="size-5" />
        </button>
      </div>
      <nav aria-label="Mobile navigation" className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-5 sm:px-6">
        <div>
          {links.map((link, index) => (
            <Link key={link.href} href={link.href} onClick={onClose} className="flex items-center justify-between border-b border-white/10 py-4 font-serif text-[1.65rem] leading-tight">
              <span>{link.label}</span><span className="font-mono text-[.65rem] text-gold">{String(index + 1).padStart(2, "0")}</span>
            </Link>
          ))}
          <Link href="/contact" onClick={onClose} className="flex items-center justify-between border-b border-white/10 py-4 font-serif text-[1.65rem] leading-tight">
            <span>Contact</span><span className="font-mono text-[.65rem] text-gold">{String(links.length + 1).padStart(2, "0")}</span>
          </Link>
        </div>
        <div className="mt-auto grid gap-3 pt-8 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Link href="/contact#book" onClick={onClose} data-track="appointment_start" data-placement="mobile_menu" className="rounded-full bg-gold px-5 py-3.5 text-center font-semibold text-ink">Book a consultation</Link>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="mobile_menu" className="rounded-full border border-white/15 px-5 py-3.5 text-center">Ask us on WhatsApp</a>
        </div>
      </nav>
    </div>
  );
}
