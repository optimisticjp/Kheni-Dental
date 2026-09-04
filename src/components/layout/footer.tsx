import Link from "next/link";
import { ArrowUpRight, ChevronDown, Mail, MessageCircle, Phone } from "lucide-react";
import { YoutubeIcon as Youtube } from "@/components/icons/youtube-icon";

import { InstagramIcon } from "@/components/icons/instagram-icon";
import { BrandMark } from "@/components/kheni/brand-mark";
import { Container } from "@/components/ui/container";
import { googleReputation } from "@/content/google-reputation";
import { clinicHours, locations, navLinks, secondaryNav, site, treatments } from "@/content/site";
import { youtubeChannelUrl } from "@/content/videos";
import { whatsappUrl } from "@/lib/links";
import { directionsUrl } from "@/lib/maps";

/**
 * Footer. Deep navy, so the page closes with weight, with the two clinics
 * as the thing a footer is actually used for. On a phone the sitemap folds
 * into two disclosures; on desktop it sits in columns.
 */
const groups = [
  { label: "Explore", links: [...navLinks, ...secondaryNav.filter((l) => !navLinks.some((n) => n.href === l.href))] },
  { label: "Treatments", links: treatments.map((t) => ({ href: `/treatments/${t.slug}/`, label: t.title })) },
];

function ClinicLine({ location }: { location: (typeof locations)[number] }) {
  return (
    <div className={`hue-${location.hue} rounded-2xl bg-white/[.06] p-4`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link href={`/locations/${location.slug}/`} className="font-serif text-lg font-medium leading-tight text-white hover:underline">
            {location.displayArea}
          </Link>
          <p className="t-small mt-0.5 text-white/60">{location.shortName === location.displayArea ? location.landmark : location.shortName}</p>
        </div>
        <span aria-hidden="true" className="mt-1 size-2.5 shrink-0 rounded-full bg-h-fill" />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
        <a
          className="inline-flex min-h-10 items-center gap-2 text-sm text-white/80 hover:text-white"
          href={`tel:${location.phoneHref}`}
          data-track="phone_click"
          data-placement="footer"
          data-branch={location.slug}
        >
          <Phone className="size-3.5 text-sunshine" aria-hidden="true" />
          {location.phoneDisplay}
        </a>
        <a
          className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-sunshine hover:text-sunshine-soft"
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
      <Container width="7xl" className="py-10 sm:py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr_.8fr_1.2fr] lg:gap-10">
          <div>
            <BrandMark tone="dark" />
            <p className="t-small measure-narrow mt-4 text-white/65">
              {site.yearsInSurat} years of dental care in Surat. Two clinics, four dentists, {googleReputation.sharedRating} on Google across{" "}
              {googleReputation.combinedReviews} reviews on two listings.
            </p>
            <p className="t-small mt-3 text-white/60">{clinicHours.compact}</p>
            <a href={`mailto:${site.email}`} className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm text-sunshine">
              <Mail className="size-4" aria-hidden="true" />
              {site.email}
            </a>
            <div className="mt-2 flex gap-2.5">
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Kheni Dental on Instagram"
                className="grid size-11 place-items-center rounded-full border border-white/20 hover:border-sunshine hover:text-sunshine"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={youtubeChannelUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Kheni Dental on YouTube"
                className="grid size-11 place-items-center rounded-full border border-white/20 hover:border-sunshine hover:text-sunshine"
              >
                <Youtube className="size-4" />
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                aria-label="Message Kheni Dental on WhatsApp"
                data-track="whatsapp_click"
                data-placement="footer"
                className="grid size-11 place-items-center rounded-full border border-white/20 hover:border-sunshine hover:text-sunshine"
              >
                <MessageCircle className="size-4" />
              </a>
            </div>
          </div>

          {groups.map((group) => (
            <div key={group.label} className="hidden lg:block">
              <h3 className="t-eyebrow text-sunshine">{group.label}</h3>
              <ul className="mt-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link className="inline-flex min-h-8 items-center text-sm text-white/70 hover:text-white" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {locations.map((location) => (
              <ClinicLine key={location.slug} location={location} />
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-1 lg:hidden">
          {groups.map((group) => (
            <details key={group.label} className="group border-t border-white/10">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-sm font-semibold text-white/85 [&::-webkit-details-marker]:hidden">
                {group.label}
                <ChevronDown className="size-4 text-sunshine transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <ul className="grid grid-cols-2 gap-x-4 pb-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link className="inline-flex min-h-10 items-center text-sm text-white/70 hover:text-white" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5">
            <Link href="/privacy/" className="inline-flex min-h-10 items-center hover:text-white">
              Privacy
            </Link>
            <Link href="/terms/" className="inline-flex min-h-10 items-center hover:text-white">
              Terms &amp; medical disclaimer
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
