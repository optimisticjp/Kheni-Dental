"use client";

import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { locations, site } from "@/content/site";
import { bookHref, branchWhatsappUrl, whatsappUrl } from "@/lib/links";
import { directionsUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";

/**
 * The floating action pill. One near-black pill above the phone's safe
 * area, not a full-width bar: gold Book (or Directions on a clinic page),
 * a white Call icon and a green WhatsApp icon. Call and WhatsApp follow
 * the branch on a clinic page, so a patient on Hirabaug reaches Hirabaug.
 *
 * WHY IT WAITS FOR THE HERO.
 *
 * It used to be on screen from the first paint, which on the homepage put
 * two "Book Appointment" buttons in view at once: the hero's own, and this
 * one floating over it. Two identical calls to action a thumb apart do not
 * read as twice the invitation, they read as a mistake, and the floating
 * one also covered the top of the picture underneath.
 *
 * So the pill waits for the page's own action buttons to leave the screen,
 * and steps back out of the way when they return. The rule is the same
 * everywhere rather than a per-page decision: a page marks its hero buttons
 * with `data-hero-actions` and the pill defers to them. A page with no such
 * group has nothing to collide with, so the pill appears immediately. Today
 * that is the homepage, the implant page and the international page on one
 * side, and everything else on the other.
 *
 * Without JavaScript the pill never appears. That is acceptable: every
 * action in it is a plain link that also exists in the page body and the
 * footer, so nothing is only reachable here.
 */
export function MobileDock() {
  const pathname = usePathname();
  const active = locations.find((location) => pathname.includes(`/locations/${location.slug}`));

  // False on the server and on first paint, so the pill can never flash over
  // a hero it is supposed to be waiting for.
  const [clear, setClear] = useState(false);

  useEffect(() => {
    const heroActions = document.querySelector("[data-hero-actions]");
    if (!heroActions) {
      // Nothing to defer to, so the pill is free. Deferred by a frame
      // because setting state in the body of an effect cascades a second
      // render before paint; this also lets the pill fade in rather than
      // appear fully formed.
      const frame = requestAnimationFrame(() => setClear(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      ([entry]) => setClear(!entry.isIntersecting),
      // A sliver counts as visible, so the pill does not reappear while the
      // last few pixels of the hero buttons are still on screen.
      { threshold: 0 },
    );
    observer.observe(heroActions);
    return () => observer.disconnect();
    // Re-run per page: this is a single-page app, so the anchor changes
    // under the component without it unmounting.
  }, [pathname]);

  const icon =
    "grid size-12 shrink-0 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-gold focus-visible:ring-inset";

  return (
    <nav
      aria-label="Quick actions"
      className={cn(
        "on-dark pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[calc(.75rem+env(safe-area-inset-bottom))] md:hidden",
        "transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
        // `invisible` rather than opacity alone, so a hidden pill is also out
        // of the tab order and out of the accessibility tree.
        clear ? "translate-y-0 opacity-100" : "invisible translate-y-4 opacity-0",
      )}
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
