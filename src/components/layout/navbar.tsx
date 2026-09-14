"use client";

import { ChevronDown, Phone } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { BrandMark } from "@/components/kheni/brand-mark";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { BookButton } from "@/components/ui/cta";
import { Container } from "@/components/ui/container";
import { featuredTreatmentSlugs, primaryNav, site, treatments } from "@/content/site";
import { cn } from "@/lib/utils";

const menuTreatments = featuredTreatmentSlugs.map((slug) => treatments.find((t) => t.slug === slug)).filter((t): t is (typeof treatments)[number] => Boolean(t));

/**
 * Site header. Cream, and frosted once the page scrolls so the colour of
 * whatever is underneath shows through. One primary action (Book) and one
 * immediate action (Call). The treatments menu opens on hover for a mouse
 * and on focus for a keyboard, and every item is a real link.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={cn("sticky top-0 z-40 w-full transition-[box-shadow,background-color] duration-300", scrolled ? "glass shadow-[0_1px_0_rgba(11,22,51,.08)]" : "bg-cream")}>
        <Container width="7xl">
          <div className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
            <BrandMark />

            <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex xl:gap-1">
              {primaryNav.map((link) =>
                link.hasMenu ? (
                  <div key={link.href} className="group relative">
                    <Link href={link.href} className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 font-display text-[.95rem] font-bold tracking-[-.01em] text-ink transition-colors hover:bg-ink/5 xl:px-3.5 xl:text-[.98rem]">
                      {link.label}
                      <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" aria-hidden="true" />
                    </Link>
                    <div className="invisible absolute left-0 top-full w-72 pt-2 opacity-0 transition-[opacity,visibility] group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <ul className="overflow-hidden rounded-[1.25rem] bg-ink p-2 text-white shadow-[0_30px_60px_-24px_rgba(11,22,51,.5)]">
                        {menuTreatments.map((treatment) => (
                          <li key={treatment.slug} className={`mood-${treatment.hue}`}>
                            <Link href={`/treatments/${treatment.slug}/`} data-track="treatment_view" data-placement="header_menu" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/90 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-butter">
                              <span aria-hidden="true" className="size-2.5 rounded-full bg-m-fill" />
                              {treatment.title}
                            </Link>
                          </li>
                        ))}
                        <li className="mt-1 border-t border-white/10 pt-1">
                          <Link href="/treatments/" className="block rounded-xl px-3 py-2.5 text-sm font-bold text-butter hover:bg-white/10">
                            All treatments
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link key={link.href} href={link.href} className={cn("whitespace-nowrap rounded-full px-3 py-2 font-display text-[.95rem] font-bold tracking-[-.01em] transition-colors hover:bg-ink/5 xl:px-3.5 xl:text-[.98rem]", link.accent ? "text-blue-deep" : "text-ink")}>
                    {link.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${site.primaryPhoneHref}`}
                data-track="phone_click"
                data-placement="header"
                aria-label={`Call the clinic on ${site.primaryPhoneDisplay}`}
                className="hidden size-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-ink/15 text-sm font-semibold text-ink hover:border-ink md:inline-flex lg:hidden xl:inline-flex min-[1400px]:size-auto min-[1400px]:px-4"
              >
                <Phone className="size-4" aria-hidden="true" />
                <span className="hidden min-[1400px]:inline">{site.primaryPhoneDisplay}</span>
              </a>
              <BookButton placement="header" className="hidden md:inline-flex" size="sm" label="Book" />
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls={open ? "mobile-menu" : undefined}
                className="grid size-11 place-items-center rounded-full bg-ink text-white lg:hidden"
              >
                <span aria-hidden="true" className="grid gap-[5px]">
                  <span className="block h-[2px] w-5 rounded-full bg-current" />
                  <span className="block h-[2px] w-3.5 rounded-full bg-butter" />
                </span>
              </button>
            </div>
          </div>
        </Container>
      </header>
      <MobileMenu open={open} onClose={closeMenu} />
    </>
  );
}
