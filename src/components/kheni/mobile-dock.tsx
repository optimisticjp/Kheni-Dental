"use client";

import Link from "next/link";
import { CalendarDays, MapPin, MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import { locations, site } from "@/content/site";
import { bookHref, branchWhatsappUrl, whatsappUrl } from "@/lib/links";
import { directionsUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";

/**
 * The mobile dock. Three actions, never five.
 *
 *   [ Book Appointment (wide, cobalt) ] [ Call ] [ WhatsApp ]
 *
 * On a clinic page the wide slot becomes Directions for that clinic, and
 * Call and WhatsApp follow the same branch, so a patient on the Hirabaug
 * page reaches Hirabaug and never Swastik Plaza.
 *
 * Home and Treatments are not here: the header handles navigation, and
 * the space is worth more to content and conversion than to two links.
 */
export function MobileDock() {
  const pathname = usePathname();
  const active = locations.find((location) => pathname.includes(`/locations/${location.slug}`));

  const side =
    "flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 rounded-2xl px-2 text-[.7rem] font-semibold leading-none text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-cobalt";

  return (
    <nav
      aria-label="Quick actions"
      className="glass fixed inset-x-0 bottom-0 z-40 border-t border-line px-3 pt-2 pb-[calc(.5rem+env(safe-area-inset-bottom))] md:hidden"
    >
      <div className="grid grid-cols-[1fr_4.25rem_4.25rem] gap-2">
        {active ? (
          <a
            href={directionsUrl(active)}
            target="_blank"
            rel="noreferrer"
            data-track="directions_click"
            data-placement="mobile_dock_location"
            data-branch={active.slug}
            className={cn(
              "flex min-h-[3.25rem] items-center justify-center gap-2 rounded-2xl bg-cobalt text-[.9375rem] font-semibold text-white focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-white",
            )}
          >
            <MapPin className="size-[1.1rem]" aria-hidden="true" />
            Directions to {active.displayArea}
          </a>
        ) : (
          <Link
            href={bookHref}
            data-book
            data-track="appointment_start"
            data-placement="mobile_dock"
            className="flex min-h-[3.25rem] items-center justify-center gap-2 rounded-2xl bg-cobalt text-[.9375rem] font-semibold text-white focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-white"
          >
            <CalendarDays className="size-[1.1rem]" aria-hidden="true" />
            Book Appointment
          </Link>
        )}

        <a
          href={`tel:${active?.phoneHref || site.primaryPhoneHref}`}
          data-track="phone_click"
          data-placement="mobile_dock"
          data-branch={active?.slug}
          className={cn(side, "bg-white ring-1 ring-inset ring-line-strong")}
        >
          <Phone className="size-[1.2rem] text-cobalt" aria-hidden="true" />
          Call
        </a>

        <a
          href={active ? branchWhatsappUrl(active) : whatsappUrl()}
          target="_blank"
          rel="noreferrer"
          data-track="whatsapp_click"
          data-placement="mobile_dock"
          data-branch={active?.slug}
          className={cn(side, "bg-whatsapp text-white")}
        >
          <MessageCircle className="size-[1.2rem]" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </nav>
  );
}
