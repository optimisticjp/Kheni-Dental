import Link from "next/link";
import { ArrowUpRight, ChevronDown, Mail, MessageCircle, Phone } from "lucide-react";

import { InstagramIcon } from "@/components/icons/instagram-icon";
import { BrandMark } from "@/components/kheni/brand-mark";
import { Container } from "@/components/ui/container";
import { locations, navLinks, secondaryNav, site, treatments } from "@/content/site";
import { whatsappUrl } from "@/lib/links";
import { directionsUrl } from "@/lib/maps";

/**
 * Footer.
 *
 * A desktop sitemap stacked onto a phone was costing roughly a third of the
 * page: fifteen navigation links, each a 44px row, one under another. The fix
 * is not smaller tap targets — it is fewer links visible at once.
 *
 *   PHONE     what someone at the bottom of a page actually wants: the two
 *             clinics with a number and directions, then navigation folded
 *             into two disclosures they can open if they want it.
 *   DESKTOP   the full sitemap in columns, where it costs nothing.
 *
 * `navLinks` already contains Contact, so the hand-added extra row is gone.
 */

const groups = [
  { label: "Explore", links: navLinks },
  { label: "Treatments", links: treatments.slice(0, 6).map((t) => ({ href: `/treatments/${t.slug}/`, label: t.title })) },
  { label: "Patient information", links: secondaryNav },
];

function BranchLine({ location }: { location: (typeof locations)[number] }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-3">
        <Link
          href={`/locations/${location.slug}/`}
          className="inline-flex min-h-11 items-center font-medium text-white hover:text-gold"
        >
          {location.shortName}
        </Link>
        <span className="t-small text-white/40">{location.displayArea}</span>
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-x-4">
        <a
          className="inline-flex min-h-11 items-center gap-2 text-sm text-white/60 hover:text-white"
          href={`tel:${location.phoneHref}`}
          data-track="phone_click"
          data-placement="footer"
          data-branch={location.slug}
        >
          <Phone className="size-3.5 text-gold" aria-hidden="true" />
          {location.phoneDisplay}
        </a>
        <a
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-gold hover:text-gold-soft"
          href={directionsUrl(location)}
          target="_blank"
          rel="noreferrer"
          data-track="directions_click"
          data-placement="footer"
          data-branch={location.slug}
        >
          Directions
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <Container width="7xl" className="py-11 sm:py-14 lg:py-16">
        {/* ── Always: who we are and how to reach us ────────────────────── */}
        <div className="grid gap-10 lg:grid-cols-[1.15fr_.7fr_.8fr_1.05fr]">
          <div>
            <BrandMark />
            <p className="t-small measure-narrow mt-4 text-white/55">{site.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center gap-2 text-sm text-gold"
              >
                <Mail className="size-4" aria-hidden="true" />
                {site.email}
              </a>
            </div>
            <div className="mt-2 flex gap-3">
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Kheni Dental on Instagram"
                className="grid size-11 place-items-center rounded-full border border-white/12 hover:border-gold/50 hover:text-gold"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                aria-label="Message Kheni Dental on WhatsApp"
                data-track="whatsapp_click"
                data-placement="footer"
                className="grid size-11 place-items-center rounded-full border border-white/12 hover:border-gold/50 hover:text-gold"
              >
                <MessageCircle className="size-4" />
              </a>
            </div>
          </div>

          {/* Desktop sitemap columns. */}
          {groups.map((group) => (
            <div key={group.label} className="hidden lg:block">
              <h3 className="t-eyebrow text-gold">{group.label}</h3>
              <ul className="mt-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="inline-flex min-h-9 items-center text-sm text-white/60 hover:text-white"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Both clinics. The thing a footer is actually used for. ────── */}
        <div className="mt-9 grid gap-5 border-t border-white/10 pt-7 sm:grid-cols-2 lg:mt-10">
          {locations.map((location) => (
            <BranchLine key={location.slug} location={location} />
          ))}
        </div>

        {/* ── Phone: navigation folded away until asked for ─────────────── */}
        <div className="mt-8 space-y-1 lg:hidden">
          {groups.map((group) => (
            <details key={group.label} className="group border-b border-white/10">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-sm font-medium text-white/75 [&::-webkit-details-marker]:hidden">
                {group.label}
                <ChevronDown
                  className="size-4 text-gold transition-transform duration-300 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <ul className="pb-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="inline-flex min-h-11 items-center text-sm text-white/55 hover:text-white"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5">
            <Link href="/privacy/" className="inline-flex min-h-11 items-center hover:text-white">
              Privacy
            </Link>
            <Link href="/terms/" className="inline-flex min-h-11 items-center hover:text-white">
              Terms &amp; medical disclaimer
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
