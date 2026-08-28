"use client";

import { ChevronDown, Menu, Phone } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

import { BrandMark } from "@/components/kheni/brand-mark";
import { Container } from "@/components/ui/container";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { featuredTreatmentSlugs, primaryNav, site, treatments } from "@/content/site";
import { cn } from "@/lib/utils";

const menuTreatments = featuredTreatmentSlugs
  .map((slug) => treatments.find((t) => t.slug === slug))
  .filter((t): t is (typeof treatments)[number] => Boolean(t));

/**
 * Site header.
 *
 * Six primary links instead of nine, with Treatments opening a short menu of
 * the treatments people actually search for. The header keeps one primary
 * action (Book) and one immediate action (Call), because on an Indian dental
 * site the phone is still the fastest conversion.
 *
 * The treatments menu opens on hover for a mouse and on focus for a keyboard,
 * and every item inside it is a real link, so it works with JavaScript
 * unavailable and with a screen reader.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/8 bg-ink/95 text-white backdrop-blur-xl">
        <Container width="7xl">
          <div className="flex h-[74px] items-center justify-between gap-4">
            <BrandMark />

            <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
              {primaryNav.map((link) =>
                link.hasMenu ? (
                  <div key={link.href} className="group relative">
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm text-white/70 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      {link.label}
                      <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" aria-hidden="true" />
                    </Link>
                    <div className="invisible absolute left-0 top-full w-64 pt-2 opacity-0 transition-[opacity,visibility] group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <ul className="overflow-hidden rounded-2xl border border-white/10 bg-[#111110] p-1.5 shadow-2xl">
                        {menuTreatments.map((treatment) => (
                          <li key={treatment.slug}>
                            <Link
                              href={`/treatments/${treatment.slug}/`}
                              data-track="treatment_view"
                              data-placement="header_menu"
                              className="block rounded-xl px-3 py-2.5 text-sm text-white/75 hover:bg-white/[.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
                            >
                              {treatment.title}
                            </Link>
                          </li>
                        ))}
                        <li className="mt-1 border-t border-white/10 pt-1">
                          <Link
                            href="/treatments/"
                            className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-gold hover:bg-white/[.06]"
                          >
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
                      "whitespace-nowrap rounded-full px-3 py-2 text-sm transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                      link.featured ? "text-gold" : "text-white/70",
                    )}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="hidden items-center gap-2 xl:flex">
              <a
                href={`tel:${site.primaryPhoneHref}`}
                data-track="phone_click"
                data-placement="header"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 px-3.5 py-2.5 text-sm text-white/85 hover:border-gold/40 hover:text-gold"
              >
                <Phone className="size-4 text-gold" aria-hidden="true" />
                {site.primaryPhoneDisplay}
              </a>
              <Link
                href="/contact/#book"
                data-track="appointment_start"
                data-placement="header"
                className="whitespace-nowrap rounded-full bg-gold px-4 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                Book Appointment
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full border border-white/15 text-white xl:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </Container>
      </header>
      <MobileMenu open={open} onClose={closeMenu} />
    </>
  );
}
