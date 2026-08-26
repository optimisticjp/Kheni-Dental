"use client";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { BrandMark } from "@/components/kheni/brand-mark";
import { whatsappUrl } from "@/lib/links";
import { cn } from "@/lib/utils";

export type NavLink = { href: string; label: string };
export function MobileMenu({ open, onClose, links }: { open: boolean; onClose: () => void; links: NavLink[] }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = previous; };
  }, [open, onClose]);

  return (
    <div id="mobile-menu" inert={!open} aria-hidden={!open} className={cn("fixed inset-0 z-50 flex flex-col bg-ink text-white transition-opacity lg:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")}>
      <div className="flex h-[74px] items-center justify-between border-b border-white/10 px-4 sm:px-6">
        <BrandMark /><button onClick={onClose} aria-label="Close menu" className="grid size-10 place-items-center rounded-full border border-white/15"><X className="size-5" /></button>
      </div>
      <nav className="flex flex-1 flex-col px-4 py-6 sm:px-6">
        {links.map((link, index) => <Link key={link.href} href={link.href} onClick={onClose} className="flex items-center justify-between border-b border-white/10 py-5 font-serif text-2xl"><span>{link.label}</span><span className="font-mono text-xs text-gold">0{index + 1}</span></Link>)}
        <div className="mt-auto grid gap-3 pt-8">
          <Link href="/contact#book" onClick={onClose} data-track="appointment_start" data-placement="mobile_menu" className="rounded-full bg-gold px-5 py-3.5 text-center font-semibold text-ink">Book consultation</Link>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="mobile_menu" className="rounded-full border border-white/15 px-5 py-3.5 text-center">WhatsApp us</a>
        </div>
      </nav>
    </div>
  );
}
