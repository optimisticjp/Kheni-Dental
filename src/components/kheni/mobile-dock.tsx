"use client";

import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import { locations, site } from "@/content/site";
import { bookHref, branchWhatsappUrl, whatsappUrl } from "@/lib/links";
import { directionsUrl } from "@/lib/maps";

/**
 * The floating action pill. Not a tab bar: one ink pill, inset from the
 * edges and the safe area, with Book as its blue heart and Call and
 * WhatsApp as two round buttons beside it.
 *
 *   ( Book Appointment  ●call  ●whatsapp )
 *
 * On a clinic page Book becomes Directions to that clinic, and Call and
 * WhatsApp follow the same branch, so a patient on the Hirabaug page
 * reaches Hirabaug and never Swastik Plaza.
 */
export function MobileDock() {
  const pathname = usePathname();
  const active = locations.find((location) => pathname.includes(`/locations/${location.slug}`));

  const round = "grid size-12 shrink-0 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-butter";

  return (
    <nav aria-label="Quick actions" className="fixed inset-x-3 bottom-[calc(.75rem+env(safe-area-inset-bottom))] z-40 md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-1.5 rounded-full bg-ink p-1.5 shadow-[0_18px_40px_-16px_rgba(11,22,51,.7)] ring-1 ring-white/10">
        {active ? (
          <a href={directionsUrl(active)} target="_blank" rel="noreferrer" data-track="directions_click" data-placement="mobile_dock_location" data-branch={active.slug} className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-blue px-4 text-[.95rem] font-bold text-white focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-butter">
            <MapPin className="size-[1.1rem] text-butter" aria-hidden="true" />
            Directions to {active.displayArea}
          </a>
        ) : (
          <Link href={bookHref} data-book data-track="appointment_start" data-placement="mobile_dock" className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-blue px-4 text-[.95rem] font-bold text-white focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-butter">
            Book Appointment
          </Link>
        )}

        <a href={`tel:${active?.phoneHref || site.primaryPhoneHref}`} data-track="phone_click" data-placement="mobile_dock" data-branch={active?.slug} aria-label={active ? `Call ${active.displayArea}` : "Call the clinic"} className={`${round} bg-white/12 text-white`}>
          <Phone className="size-5" aria-hidden="true" />
        </a>

        <a href={active ? branchWhatsappUrl(active) : whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="mobile_dock" data-branch={active?.slug} aria-label="Message on WhatsApp" className={`${round} bg-whatsapp text-white`}>
          <MessageCircle className="size-5" aria-hidden="true" />
        </a>
      </div>
    </nav>
  );
}
