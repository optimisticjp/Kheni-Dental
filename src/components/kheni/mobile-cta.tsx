"use client";

import Link from "next/link";
import { CalendarDays, Home, MapPin, MessageCircle, Phone, Stethoscope } from "lucide-react";
import { usePathname } from "next/navigation";
import { locations, site } from "@/content/site";
import { whatsappUrl } from "@/lib/links";
import { cn } from "@/lib/utils";

/**
 * Fixed mobile dock. Five actions: two navigation, one anchor, two conversion.
 *
 * The centre slot is the visual anchor and swaps by context: Directions on an
 * individual location page, Book everywhere else. Call and WhatsApp follow the
 * same branch, so a patient on /locations/hirabaug reaches Hirabaug and never
 * Swastik Plaza.
 */

const itemBase =
  "relative flex min-h-16 flex-col items-center justify-center gap-1 px-0.5 text-center text-[.625rem] font-medium leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold";

export function MobileCta() {
  const pathname = usePathname();
  const activeLocation = locations.find((location) => pathname.includes(`/locations/${location.slug}`));

  const isHome = pathname === "/";
  const isTreatments = pathname === "/treatments" || pathname.startsWith("/treatments/");

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 divide-x divide-white/10 border-t border-white/10 bg-ink pb-[env(safe-area-inset-bottom)] text-white md:hidden"
    >
      <Link
        href="/"
        aria-current={isHome ? "page" : undefined}
        data-track="navigation_click"
        data-placement="mobile_sticky"
        data-destination="home"
        className={cn(itemBase, isHome ? "text-gold" : "text-white/70")}
      >
        {isHome && <span aria-hidden="true" className="absolute inset-x-3 top-0 h-0.5 rounded-b bg-gold" />}
        <Home className={cn("size-[1.15rem]", isHome ? "text-gold" : "text-white/70")} />
        Home
      </Link>

      <Link
        href="/treatments/"
        aria-current={isTreatments ? "page" : undefined}
        data-track="navigation_click"
        data-placement="mobile_sticky"
        data-destination="treatments"
        className={cn(itemBase, isTreatments ? "text-gold" : "text-white/70")}
      >
        {isTreatments && <span aria-hidden="true" className="absolute inset-x-3 top-0 h-0.5 rounded-b bg-gold" />}
        <Stethoscope className={cn("size-[1.15rem]", isTreatments ? "text-gold" : "text-white/70")} />
        Treatments
      </Link>

      {activeLocation ? (
        <a
          href={activeLocation.mapsUrl}
          target="_blank"
          rel="noreferrer"
          data-track="directions_click"
          data-placement="mobile_sticky_location"
          data-branch={activeLocation.slug}
          className={cn(itemBase, "bg-gold font-semibold text-ink focus-visible:ring-ink")}
        >
          <MapPin className="size-[1.15rem]" />
          Directions
        </a>
      ) : (
        <Link
          href="/contact#book"
          data-track="appointment_start"
          data-placement="mobile_sticky"
          className={cn(itemBase, "bg-gold font-semibold text-ink focus-visible:ring-ink")}
        >
          <CalendarDays className="size-[1.15rem]" />
          Book
        </Link>
      )}

      <a
        href={`tel:${activeLocation?.phoneHref || site.primaryPhoneHref}`}
        data-track="phone_click"
        data-placement="mobile_sticky"
        data-branch={activeLocation?.slug}
        className={itemBase}
      >
        <Phone className="size-[1.15rem] text-gold" />
        Call
      </a>

      <a
        href={whatsappUrl(undefined, activeLocation?.whatsappNumber)}
        target="_blank"
        rel="noreferrer"
        data-track="whatsapp_click"
        data-placement="mobile_sticky"
        data-branch={activeLocation?.slug}
        className={itemBase}
      >
        <MessageCircle className="size-[1.15rem] text-gold" />
        WhatsApp
      </a>
    </nav>
  );
}
