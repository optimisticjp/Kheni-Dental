"use client";

import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import { locations, site } from "@/content/site";
import { bookHref, branchWhatsappUrl, whatsappUrl } from "@/lib/links";
import { directionsUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";

/**
 * The floating action pill. One near-black pill above the phone's safe
 * area, not a full-width bar: gold Book (or Directions on a clinic page),
 * a white Call icon and a green WhatsApp icon. Call and WhatsApp follow
 * the branch on a clinic page, so a patient on Hirabaug reaches Hirabaug.
 */
export function MobileDock() {
  const pathname = usePathname();
  const active = locations.find((location) => pathname.includes(`/locations/${location.slug}`));

  const icon =
    "grid size-12 shrink-0 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-gold focus-visible:ring-inset";

  return (
    <nav
      aria-label="Quick actions"
      className="on-dark pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[calc(.75rem+env(safe-area-inset-bottom))] md:hidden"
    >
      <div className="pointer-events-auto grain flex w-full max-w-[26rem] items-center gap-1.5 rounded-full border border-ivory/12 bg-ink/95 p-1.5 shadow-[0_18px_40px_-16px_rgba(0,0,0,.7)] backdrop-blur-md">
        {active ? (
          <a
            href={directionsUrl(active)}
            target="_blank"
            rel="noreferrer"
            data-track="directions_click"
            data-placement="mobile_dock_location"
            data-branch={active.slug}
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gold px-3 text-[.9375rem] font-semibold text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ink"
          >
            <MapPin className="size-[1.05rem]" aria-hidden="true" />
            Directions to {active.displayArea}
          </a>
        ) : (
          <Link
            href={bookHref}
            data-book
            data-track="appointment_start"
            data-placement="mobile_dock"
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gold px-3 text-[.9375rem] font-semibold text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ink"
          >
            Book Appointment
          </Link>
        )}

        <a
          href={`tel:${active?.phoneHref || site.primaryPhoneHref}`}
          data-track="phone_click"
          data-placement="mobile_dock"
          data-branch={active?.slug}
          aria-label={active ? `Call ${active.displayArea}` : `Call the clinic on ${site.primaryPhoneDisplay}`}
          className={cn(icon, "border border-ivory/20 text-ivory")}
        >
          <Phone className="size-[1.15rem]" aria-hidden="true" />
        </a>

        <a
          href={active ? branchWhatsappUrl(active) : whatsappUrl()}
          target="_blank"
          rel="noreferrer"
          data-track="whatsapp_click"
          data-placement="mobile_dock"
          data-branch={active?.slug}
          aria-label="Message us on WhatsApp"
          className={cn(icon, "bg-whatsapp text-white")}
        >
          <MessageCircle className="size-[1.2rem]" aria-hidden="true" />
        </a>
      </div>
    </nav>
  );
}
