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
 * Site header. Light and frosted once the page scrolls, so the colour of
 * whatever is underneath shows through faintly. One primary action (Book)
 * and one immediate action (Call). The treatments menu opens on hover for a
 * mouse and on focus for a keyboard, and every item is a real link.
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
          "sticky top-0 z-40 w-full transition-[box-shadow,background-color] duration-300",
          scrolled ? "glass shadow-[0_1px_0_rgba(18,34,74,.08),0_10px_30px_-24px_rgba(18,34,74,.35)]" : "bg-porcelain",
        )}
      >
        <Container width="7xl">
          <div className="flex h-16 items-center justify-between gap-4 sm:h-[72px]">
            <BrandMark />

            <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
              {primaryNav.map((link) =>
                link.hasMenu ? (
                  <div key={link.href} className="group relative">
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-[.9375rem] font-medium text-ink/80 transition-colors hover:bg-cobalt-tint hover:text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-cobalt"
                    >
                      {link.label}
                      <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" aria-hidden="true" />
                    </Link>
                    <div className="invisible absolute left-0 top-full w-72 pt-2 opacity-0 transition-[opacity,visibility] group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <ul className="overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-[0_24px_60px_-24px_rgba(18,34,74,.35)]">
                        {menuTreatments.map((treatment) => (
                          <li key={treatment.slug} className={`hue-${treatment.hue}`}>
                            <Link
                              href={`/treatments/${treatment.slug}/`}
                              data-track="treatment_view"
                              data-placement="header_menu"
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink/85 hover:bg-h-tint hover:text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-cobalt"
                            >
                              <span aria-hidden="true" className="size-2.5 rounded-full bg-h-fill" />
                              {treatment.title}
                            </Link>
                          </li>
                        ))}
                        <li className="mt-1 border-t border-line pt-1">
                          <Link href="/treatments/" className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-cobalt-deep hover:bg-cobalt-tint">
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
                      "whitespace-nowrap rounded-full px-3 py-2 text-[.9375rem] font-medium transition-colors hover:bg-cobalt-tint hover:text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-cobalt",
                      link.accent ? "text-cobalt-deep" : "text-ink/80",
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
                className="hidden size-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-line-strong text-sm font-medium text-ink hover:border-ink/40 md:inline-flex min-[1400px]:size-auto min-[1400px]:px-4"
              >
                <Phone className="size-4 text-cobalt" aria-hidden="true" />
                <span className="hidden min-[1400px]:inline">{site.primaryPhoneDisplay}</span>
              </a>
              <BookButton placement="header" className="hidden md:inline-flex" arrow={false} />
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls={open ? "mobile-menu" : undefined}
                className="grid size-11 place-items-center rounded-full border border-line-strong text-ink xl:hidden"
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
