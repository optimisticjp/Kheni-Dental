import Link from "next/link";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";

import { InstagramIcon } from "@/components/icons/instagram-icon";
import { YoutubeIcon } from "@/components/icons/youtube-icon";
import { KheniMonogram } from "@/components/kheni/brand-mark";
import { Container } from "@/components/ui/container";
import { googleReputation } from "@/content/google-reputation";
import { featuredReels, instagramHandle, instagramUrl, reelPosterSrcSet } from "@/content/instagram";
import { clinicHours, locations, navLinks, secondaryNav, site, treatments } from "@/content/site";
import { youtubeChannelUrl } from "@/content/videos";
import { whatsappUrl } from "@/lib/links";
import { directionsUrl } from "@/lib/maps";

/**
 * Footer as the last brand moment. Ink field, the name set enormous in
 * butter, the two clinics with the three things a footer is used for
 * (call, WhatsApp, directions), Instagram as a proper block rather than an
 * icon, and the sitemap small underneath.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const reels = featuredReels(4);
  const links = [...navLinks, ...secondaryNav.filter((l) => !navLinks.some((n) => n.href === l.href))];

  return (
    <footer className="on-dark overflow-hidden bg-ink text-white">
      <Container width="7xl" className="pt-12 sm:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <KheniMonogram className="size-12" tone="butter" />
            <p className="t-h3 mt-4 max-w-md text-white">
              {site.yearsInSurat} years of Surat smiles. Two clinics, four dentists, {googleReputation.sharedRating} on Google across {googleReputation.combinedReviews} reviews on two listings.
            </p>
            <p className="t-small mt-3 text-white/70">{clinicHours.compact}</p>
          </div>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="footer" className="btn btn-butter btn-lg">
            <MessageCircle className="size-5" aria-hidden="true" />
            Ask us on WhatsApp
          </a>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {locations.map((location) => (
            <div key={location.slug} className={`mood-${location.hue} rounded-[1.5rem] bg-white/[.06] p-5 ring-1 ring-white/10`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link href={`/locations/${location.slug}/`} className="font-display text-2xl font-extrabold tracking-[-.03em] text-white hover:underline">
                    {location.displayArea}
                  </Link>
                  <p className="t-small mt-1 text-white/70">{location.shortName === location.displayArea ? location.landmark : `${location.shortName} · ${location.landmark}`}</p>
                  {location.implantCentre && <p className="t-eyebrow mt-2 text-butter">Elite Implant Center</p>}
                </div>
                <span aria-hidden="true" className="mt-1.5 size-3 shrink-0 rounded-full bg-m-fill" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href={`tel:${location.phoneHref}`} data-track="phone_click" data-placement="footer" data-branch={location.slug} className="btn btn-sm btn-outline-light">
                  <Phone className="size-3.5" aria-hidden="true" />
                  {location.phoneDisplay}
                </a>
                <a href={directionsUrl(location)} target="_blank" rel="noreferrer" data-track="directions_click" data-placement="footer" data-branch={location.slug} className="btn btn-sm btn-white">
                  Directions
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram, as a block a thumb can find. */}
        <a
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          data-track="instagram_profile_click"
          data-placement="footer"
          className="group mt-3 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] bg-blue p-5 ring-1 ring-white/10"
        >
          <span className="flex items-center gap-4">
            <span className="flex -space-x-3">
              {reels.map((reel) =>
                reel.poster ? (
                  // eslint-disable-next-line @next/next/no-img-element -- images are unoptimized site-wide
                  <img key={reel.id} src={reel.poster} srcSet={reelPosterSrcSet(reel.poster)} sizes="48px" alt="" loading="lazy" decoding="async" className="size-12 rounded-full object-cover ring-2 ring-blue" style={{ objectPosition: reel.objectPosition }} />
                ) : (
                  <span key={reel.id} className="size-12 rounded-full bg-butter ring-2 ring-blue" />
                ),
              )}
            </span>
            <span>
              <span className="block font-display text-2xl font-extrabold tracking-[-.03em]">{instagramHandle}</span>
              <span className="block text-sm text-white/80">Follow the clinic on Instagram</span>
            </span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-ink">
            <InstagramIcon className="size-4" />
            Follow
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </a>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-[1fr_1fr_auto]">
          <div>
            <p className="t-eyebrow text-butter">Kheni Dental</p>
            <ul className="mt-3 sm:grid sm:grid-cols-2 sm:gap-x-4">
              {links.map((link) => (
                <li key={link.href}>
                  <Link className="inline-flex min-h-8 items-center text-sm text-white/75 hover:text-white" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t-eyebrow text-butter">Treatments</p>
            <ul className="mt-3 sm:grid sm:grid-cols-2 sm:gap-x-4">
              {treatments.map((t) => (
                <li key={t.slug}>
                  <Link className="inline-flex min-h-8 items-center text-sm text-white/75 hover:text-white" href={`/treatments/${t.slug}/`}>
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="t-eyebrow text-butter">Reach us</p>
            <a href={`mailto:${site.email}`} className="mt-3 inline-flex min-h-9 items-center text-sm text-white/75 hover:text-white">
              {site.email}
            </a>
            <div className="mt-2 flex gap-2">
              <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Kheni Dental on Instagram" data-track="instagram_profile_click" data-placement="footer_icon" className="grid size-11 place-items-center rounded-full border border-white/20 hover:border-butter hover:text-butter">
                <InstagramIcon className="size-4" />
              </a>
              <a href={youtubeChannelUrl} target="_blank" rel="noreferrer" aria-label="Kheni Dental on YouTube" className="grid size-11 place-items-center rounded-full border border-white/20 hover:border-butter hover:text-butter">
                <YoutubeIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </Container>

      <div className="mt-10 overflow-hidden">
        <p aria-hidden="true" className="wordmark -mb-[.18em] whitespace-nowrap text-center text-butter">
          Kheni
        </p>
      </div>

      <div className="border-t border-white/10">
        <Container width="7xl" className="flex flex-col gap-2 py-4 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5">
            <Link href="/privacy/" className="inline-flex min-h-9 items-center hover:text-white">
              Privacy
            </Link>
            <Link href="/terms/" className="inline-flex min-h-9 items-center hover:text-white">
              Terms &amp; medical disclaimer
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
