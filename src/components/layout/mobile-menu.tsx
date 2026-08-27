"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { BrandMark } from "@/components/kheni/brand-mark";
import { whatsappUrl } from "@/lib/links";
import { cn } from "@/lib/utils";

export type NavLink = { href: string; label: string };

export function MobileMenu({ open, onClose, links }: { open: boolean; onClose: () => void; links: NavLink[] }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const menu = document.getElementById("mobile-menu");
      if (!menu) return;
      const focusable = Array.from(menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus.current?.focus();
    };
  }, [open, onClose]);

  return (
    <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site navigation" inert={!open} aria-hidden={!open} className={cn("fixed inset-0 z-50 flex flex-col bg-ink text-white transition-opacity xl:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")}>
      <div className="flex h-[74px] items-center justify-between border-b border-white/10 px-4 sm:px-6">
        <BrandMark />
        <button ref={closeRef} onClick={onClose} aria-label="Close menu" className="grid size-11 place-items-center rounded-full border border-white/15"><X className="size-5" /></button>
      </div>
      <nav className="flex flex-1 flex-col overflow-y-auto px-4 py-6 sm:px-6">
        {links.map((link, index) => <Link key={link.href} href={link.href} onClick={onClose} className="flex items-center justify-between border-b border-white/10 py-5 font-serif text-2xl"><span>{link.label}</span><span className="font-mono text-xs text-gold">0{index + 1}</span></Link>)}
        <Link href="/contact" onClick={onClose} className="flex items-center justify-between border-b border-white/10 py-5 font-serif text-2xl"><span>Contact</span><span className="font-mono text-xs text-gold">07</span></Link>
        <div className="mt-auto grid gap-3 pt-8">
          <Link href="/contact#book" onClick={onClose} data-track="appointment_start" data-placement="mobile_menu" className="rounded-full bg-gold px-5 py-3.5 text-center font-semibold text-ink">Book consultation</Link>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="mobile_menu" className="rounded-full border border-white/15 px-5 py-3.5 text-center">Ask us on WhatsApp</a>
        </div>
      </nav>
    </div>
  );
}
