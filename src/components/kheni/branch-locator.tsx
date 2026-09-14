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
 *             that branch's rating, hours and actions under it.
 *   TABLET +  both branches side by side.
 */
export function BranchLocator({ placement = "branch_locator", tone = "light" }: { placement?: string; tone?: "light" | "dark" }) {
  const [active, setActive] = useState(0);
  const dark = tone === "dark";

  const select = (index: number) => {
    setActive(index);
    pushTrackingEvent({ event: "location_switch", placement, interaction: "select", branch: locations[index].slug });
  };

  return (
    <div>
      <div className="lg:hidden">
        <div role="tablist" aria-label="Choose a clinic" className={cn("grid grid-cols-2 gap-1 rounded-full p-1", dark ? "bg-white/10" : "bg-ink/8")}>
          {locations.map((location, index) => (
            <button
              key={location.slug}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls={`branch-tabpanel-${location.slug}`}
              onClick={() => select(index)}
              className={cn(
                "flex min-h-12 items-center justify-center gap-2 rounded-full px-3 font-display text-[.95rem] font-bold tracking-[-.01em] transition-colors duration-300",
                index === active ? "bg-ink text-white" : dark ? "text-white/80" : "text-ink",
              )}
            >
              {location.displayArea}
              {location.google.status === "verified" && <span className={cn("text-xs font-semibold", index === active ? "text-butter" : "opacity-70")}>{location.google.rating} ★</span>}
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
    <div className={`mood-${location.hue} overflow-hidden rounded-[1.75rem] bg-white text-ink`}>
      <BranchMap location={location} size="compact" className="rounded-none" />
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {location.implantCentre && <p className="t-eyebrow mb-1 text-m-text">Elite Implant Center</p>}
            <h3 className="font-display text-[1.9rem] font-extrabold leading-none tracking-[-.04em]">{location.displayArea}</h3>
            <p className="t-small mt-1.5 text-ink-soft">{location.shortName === location.displayArea ? location.landmark : `${location.shortName} · ${location.landmark}`}</p>
          </div>
          {verified && (
            <a href={placeUrl(location)} target="_blank" rel="noreferrer" data-track="google_reviews_click" data-placement={`${placement}_${location.slug}_rating`} data-branch={location.slug} className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-butter px-3 text-ink">
              <Stars size="size-3" tone="ink" />
              <span className="font-display text-base font-extrabold">{location.google.rating}</span>
              <span className="text-xs font-semibold">{location.google.reviewCount}</span>
            </a>
          )}
        </div>
        <p className="t-small mt-3 text-ink-soft">{location.hours}</p>
        <DirectionsButton location={location} placement={`${placement}_${location.slug}`} className="mt-4 w-full" />
        <div className="mt-2 grid grid-cols-2 gap-2">
          <a href={`tel:${location.phoneHref}`} data-track="phone_click" data-placement={`${placement}_${location.slug}`} data-branch={location.slug} className="btn btn-outline">
            <Phone className="size-4" aria-hidden="true" />
            Call
          </a>
          <a href={branchWhatsappUrl(location)} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement={`${placement}_${location.slug}`} data-branch={location.slug} className="btn btn-whatsapp">
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
        <Link href={`/locations/${location.slug}/`} className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-blue-deep">
          This clinic in detail
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
