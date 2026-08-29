"use client";

import Link from "next/link";
import { ArrowUpRight, MessageCircle, Phone, Star } from "lucide-react";
import { useState } from "react";

import { BranchMap, DirectionsButton } from "@/components/kheni/branch-map";
import { locations } from "@/content/site";
import { whatsappUrl } from "@/lib/links";
import { placeUrl } from "@/lib/maps";
import { pushTrackingEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

/**
 * Where to find us.
 *
 * Roughly nine in ten patients arrive on a phone, and the previous layout
 * asked them to scroll past four map frames for two clinics: one inside each
 * branch card, then both again under a separate "Getting here" heading. Four
 * map iframes for two addresses is expensive on Indian mobile data and reads
 * as repetition.
 *
 *   PHONE     a segmented switcher. One branch selected, one exact map, and
 *             that branch's own rating, hours, address and actions under it.
 *   TABLET +  both branches side by side, since there is room to compare.
 *
 * The layout that is not in use stays in the markup but never paints, and
 * because the maps are `loading="lazy"` a frame that never enters the
 * viewport is never fetched. Measured, not assumed: a phone requests exactly
 * one map, a second only when the patient switches branch, and a desktop
 * requests two rather than three.
 */
export function BranchLocator({ placement = "branch_locator" }: { placement?: string }) {
  const [active, setActive] = useState(0);

  const select = (index: number) => {
    setActive(index);
    pushTrackingEvent({ event: "location_switch", placement, interaction: "select" });
  };

  return (
    <div>
      {/* ── Phone: one branch at a time ─────────────────────────────────── */}
      <div className="lg:hidden">
        <div
          role="tablist"
          aria-label="Choose a clinic"
          className="grid grid-cols-2 gap-1 rounded-full border border-border bg-card p-1"
        >
          {locations.map((location, index) => (
            <button
              key={location.slug}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls={`branch-tabpanel-${location.slug}`}
              onClick={() => select(index)}
              className={cn(
                "ease-kheni min-h-11 rounded-full px-3 text-sm font-semibold transition-colors duration-300",
                index === active ? "bg-ink text-white" : "text-muted-foreground",
              )}
            >
              {location.displayArea}
            </button>
          ))}
        </div>

        <div id={`branch-tabpanel-${locations[active].slug}`} className="mt-4">
          <BranchDetail location={locations[active]} placement={placement} />
        </div>
      </div>

      {/* ── Tablet and up: both, side by side ───────────────────────────── */}
      <div className="hidden gap-5 lg:grid lg:grid-cols-2">
        {locations.map((location) => (
          <BranchDetail key={location.slug} location={location} placement={placement} />
        ))}
      </div>
    </div>
  );
}

/**
 * One branch: map, then the four things a patient asks in order — how good,
 * when open, where, and how do I get there.
 *
 * Directions carries the most visual weight because on a location page it is
 * the action almost everybody wants. Call and WhatsApp sit beside it as equals
 * to each other but quieter than it, and the clinic page is a plain link.
 */
function BranchDetail({ location, placement }: { location: (typeof locations)[number]; placement: string }) {
  const verified = location.google.status === "verified";
  const message = `Hello Kheni Dental, I would like to book an appointment at ${location.shortName}, ${location.areaLabel}.`;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <BranchMap location={location} size="compact" className="rounded-none border-0 border-b border-border" />

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {location.implantCentre && (
              <p className="t-eyebrow mb-1.5 text-gold">Elite Implant Center</p>
            )}
            <h3 className="t-h3">{location.shortName}</h3>
            <p className="t-small mt-0.5 text-muted-foreground">{location.areaLabel}</p>
          </div>

          {verified && (
            <a
              href={placeUrl(location)}
              target="_blank"
              rel="noreferrer"
              data-track="review_click"
              data-placement={`${placement}_${location.slug}_rating`}
              data-branch={location.slug}
              className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-border px-3"
            >
              <Star className="size-3.5 fill-current text-gold" aria-hidden="true" />
              <span className="text-sm font-semibold text-gold">{location.google.rating}</span>
              <span className="t-small text-muted-foreground">{location.google.reviewCount}</span>
            </a>
          )}
        </div>

        <p className="t-small mt-3 text-muted-foreground">{location.hours}</p>
        <p className="t-small mt-1.5 text-muted-foreground/80">{location.address}</p>

        <DirectionsButton
          location={location}
          placement={`${placement}_${location.slug}`}
          className="mt-4 w-full"
        />

        <div className="mt-2 grid grid-cols-2 gap-2">
          <a
            href={`tel:${location.phoneHref}`}
            data-track="phone_click"
            data-placement={`${placement}_${location.slug}`}
            data-branch={location.slug}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-border text-sm font-semibold"
          >
            <Phone className="size-3.5 text-gold" aria-hidden="true" />
            Call
          </a>
          <a
            href={whatsappUrl(message, location.whatsappNumber)}
            target="_blank"
            rel="noreferrer"
            data-track="whatsapp_click"
            data-placement={`${placement}_${location.slug}`}
            data-branch={location.slug}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-border text-sm font-semibold"
          >
            <MessageCircle className="size-3.5 text-gold" aria-hidden="true" />
            WhatsApp
          </a>
        </div>

        <Link
          href={`/locations/${location.slug}/`}
          className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold"
        >
          This clinic in detail
          <ArrowUpRight className="cta-arrow size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
