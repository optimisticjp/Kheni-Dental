"use client";

import { ChevronDown, Menu, Phone } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { BrandMark } from "@/components/kheni/brand-mark";
import { BookButton } from "@/components/ui/cta";
import { Container } from "@/components/ui/container";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { featuredTreatmentSlugs, primaryNav, site, treatments } from "@/content/site";
import { cn } from "@/lib/utils";

const menuTreatments = featuredTreatmentSlugs
  .map((slug) => treatments.find((t) => t.slug === slug))
  .filter((t): t is (typeof treatments)[number] => Boolean(t));

/**
 * Site header. Near-black, with the name in ivory and "Elite Implant
 * Center" in gold. Quiet ivory navigation, the featured link in gold, one
 * outlined phone action and one gold Book. Frosted once the page scrolls.
 * The treatments menu opens on hover for a mouse and on focus for a
 * keyboard, and every item is a real link.
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
      <header
        className={cn(
          "on-dark sticky top-[var(--strip-h)] z-40 w-full text-ivory transition-[box-shadow,background-color] duration-300",
          scrolled ? "glass-dark shadow-[0_1px_0_rgba(255,255,255,.06),0_16px_40px_-28px_rgba(0,0,0,.8)]" : "bg-ink",
        )}
      >
        <Container width="7xl">
          <div className="flex h-16 items-center justify-between gap-4 sm:h-[72px]">
            <BrandMark compact />

            {/* The nav used to appear only at 1280, so a 1024 laptop hid six
                destinations behind a hamburger while roughly 500px of header
                sat empty. It now appears at 1024 with tighter item padding,
                and the phone pill stands down until 1280 to make room. */}
            <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
              {primaryNav.map((link) =>
                link.hasMenu ? (
                  <div key={link.href} className="group relative">
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2 text-[.9375rem] text-ivory/75 xl:px-3 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      {link.label}
                      <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" aria-hidden="true" />
                    </Link>
                    <div className="invisible absolute left-0 top-full w-72 pt-2 opacity-0 transition-[opacity,visibility] group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <ul className="grain overflow-hidden rounded-2xl border border-ivory/10 bg-ink-2 p-1.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,.8)]">
                        {menuTreatments.map((treatment) => (
                          <li key={treatment.slug}>
                            <Link
                              href={`/treatments/${treatment.slug}/`}
                              data-track="treatment_view"
                              data-placement="header_menu"
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ivory/80 hover:bg-ivory/[.06] hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
                            >
                              <span aria-hidden="true" className="size-1.5 rounded-full bg-gold/70" />
                              {treatment.title}
                            </Link>
                          </li>
                        ))}
                        <li className="mt-1 border-t border-ivory/10 pt-1">
                          <Link href="/treatments/" className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-gold hover:bg-ivory/[.06]">
                            All treatments
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "whitespace-nowrap rounded-full px-2.5 py-2 text-[.9375rem] transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold xl:px-3",
                      // Between 1024 and 1279 the full set overflows the header
                      // and clips the Book button. The accented implants link is
                      // the one item that duplicates a destination already in the
                      // Treatments dropdown, so it is the honest one to drop.
                      link.accent ? "hidden text-gold xl:inline-flex" : "text-ivory/75",
                    )}
                  >
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
                className="hidden size-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-ivory/20 text-sm text-ivory/90 hover:border-gold/60 hover:text-gold md:inline-flex lg:hidden xl:inline-flex min-[1400px]:size-auto min-[1400px]:px-4"
              >
                <Phone className="size-4 text-gold" aria-hidden="true" />
                <span className="hidden min-[1400px]:inline">{site.primaryPhoneDisplay}</span>
              </a>
              <BookButton placement="header" className="hidden whitespace-nowrap shadow-none md:inline-flex" arrow={false} />
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls={open ? "mobile-menu" : undefined}
                className="grid size-11 place-items-center rounded-full border border-ivory/20 text-ivory lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </Container>
      </header>
      <MobileMenu open={open} onClose={closeMenu} />
    </>
  );
}
