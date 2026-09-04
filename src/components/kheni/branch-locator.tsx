"use client";

import Link from "next/link";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

import { BranchMap, DirectionsButton } from "@/components/kheni/branch-map";
import { Stars } from "@/components/kheni/proof";
import { locations } from "@/content/site";
import { branchWhatsappUrl } from "@/lib/links";
import { placeUrl } from "@/lib/maps";
import { pushTrackingEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

/**
 * Two clinics, easy to choose between.
 *
 *   PHONE     a segmented switcher, one branch selected, one exact map, and
 *             that branch's rating, hours and actions under it. One map is
 *             requested, a second only when the patient switches.
 *   TABLET +  both branches side by side.
 */
export function BranchLocator({ placement = "branch_locator" }: { placement?: string }) {
  const [active, setActive] = useState(0);

  const select = (index: number) => {
    setActive(index);
    pushTrackingEvent({ event: "location_switch", placement, interaction: "select", branch: locations[index].slug });
  };

  return (
    <div>
      <div className="lg:hidden">
        <div role="tablist" aria-label="Choose a clinic" className="grid grid-cols-2 gap-1 rounded-full bg-white p-1 ring-1 ring-line">
          {locations.map((location, index) => (
            <button
              key={location.slug}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls={`branch-tabpanel-${location.slug}`}
              onClick={() => select(index)}
              className={cn(
                `hue-${location.hue} ease-kheni flex min-h-12 items-center justify-center gap-2 rounded-full px-3 text-sm font-semibold transition-colors duration-300`,
                index === active ? "bg-ink text-white" : "text-ink-soft",
              )}
            >
              <span aria-hidden="true" className="size-2 rounded-full bg-h-fill" />
              {location.displayArea}
              {location.google.status === "verified" && <span className={cn("text-xs font-medium", index === active ? "text-white/70" : "text-ink-soft")}>{location.google.rating} ★</span>}
            </button>
          ))}
        </div>
        <div id={`branch-tabpanel-${locations[active].slug}`} role="tabpanel" className="mt-4">
          <BranchDetail location={locations[active]} placement={placement} />
        </div>
      </div>

      <div className="hidden gap-5 lg:grid lg:grid-cols-2">
        {locations.map((location) => (
          <BranchDetail key={location.slug} location={location} placement={placement} />
        ))}
      </div>
    </div>
  );
}

function BranchDetail({ location, placement }: { location: (typeof locations)[number]; placement: string }) {
  const verified = location.google.status === "verified";
  return (
    <div className={`hue-${location.hue} overflow-hidden rounded-[1.5rem] border border-line bg-white`}>
      <BranchMap location={location} size="compact" className="rounded-none" />
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {location.implantCentre && <p className="t-eyebrow mb-1 text-gold-text">Elite Implant Center</p>}
            <h3 className="t-h3">{location.displayArea}</h3>
            <p className="t-small mt-0.5 text-ink-soft">{location.shortName === location.displayArea ? location.landmark : `${location.shortName} · ${location.landmark}`}</p>
          </div>
          {verified && (
            <a
              href={placeUrl(location)}
              target="_blank"
              rel="noreferrer"
              data-track="google_reviews_click"
              data-placement={`${placement}_${location.slug}_rating`}
              data-branch={location.slug}
              className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-h-tint px-3"
            >
              <Stars size="size-3" />
              <span className="text-sm font-semibold">{location.google.rating}</span>
              <span className="t-small text-ink-soft">{location.google.reviewCount}</span>
            </a>
          )}
        </div>
        <p className="t-small mt-3 text-ink-soft">{location.hours}</p>
        <DirectionsButton location={location} placement={`${placement}_${location.slug}`} className="mt-4 w-full" />
        <div className="mt-2 grid grid-cols-2 gap-2">
          <a
            href={`tel:${location.phoneHref}`}
            data-track="phone_click"
            data-placement={`${placement}_${location.slug}`}
            data-branch={location.slug}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-line-strong text-sm font-semibold"
          >
            <Phone className="size-3.5 text-cobalt" aria-hidden="true" />
            Call
          </a>
          <a
            href={branchWhatsappUrl(location)}
            target="_blank"
            rel="noreferrer"
            data-track="whatsapp_click"
            data-placement={`${placement}_${location.slug}`}
            data-branch={location.slug}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-whatsapp text-sm font-semibold text-white"
          >
            <MessageCircle className="size-3.5" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
        <Link href={`/locations/${location.slug}/`} className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-h-text">
          This clinic in detail
          <ArrowUpRight className="cta-arrow size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
