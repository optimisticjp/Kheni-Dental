"use client";

import { Menu, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BrandMark } from "@/components/kheni/brand-mark";
import { Container } from "@/components/ui/container";
import { MobileMenu, type NavLink } from "@/components/layout/mobile-menu";
import { navLinks } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

const links: NavLink[] = [...navLinks];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/8 bg-ink/95 text-white backdrop-blur-xl">
      <Container width="7xl">
        <div className="flex h-[74px] items-center justify-between gap-4">
          <BrandMark />
          <nav aria-label="Primary" className="hidden items-center gap-5 xl:flex">
            {links.map((link) => <Link key={link.href} href={link.href} className="text-sm text-white/65 transition-colors hover:text-gold">{link.label}</Link>)}
          </nav>
          <div className="hidden items-center gap-2 xl:flex">
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="header" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm text-white/85 hover:border-gold/40 hover:text-gold"><MessageCircle className="size-4" />WhatsApp</a>
            <Link href="/contact#book" data-track="appointment_start" data-placement="header" className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5">Book consultation</Link>
          </div>
          <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" className="grid size-11 place-items-center rounded-full border border-white/15 text-white xl:hidden"><Menu className="size-5" /></button>
        </div>
      </Container>
      <MobileMenu open={open} onClose={() => setOpen(false)} links={links} />
    </header>
  );
}
