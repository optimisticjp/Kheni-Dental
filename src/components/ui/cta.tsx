import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

import type { Location } from "@/content/site";
import { site } from "@/content/site";
import { bookHref, branchWhatsappUrl, telHref, whatsappUrl } from "@/lib/links";
import { cn } from "@/lib/utils";

/**
 * The site's buttons. Four looks, used consistently:
 *
 *   primary    cobalt, white text. The one action a section is built around.
 *   whatsapp   deep WhatsApp green, white text. Recognisable at a glance.
 *   secondary  white with a navy hairline. The quieter partner.
 *   ghost      text only, for "see all" links.
 *
 * All are at least 48px tall, because most of our visitors are tapping.
 */
export type CtaVariant = "primary" | "whatsapp" | "secondary" | "ghost" | "onDark";

export function ctaClass(variant: CtaVariant = "primary", size: "md" | "lg" = "md", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full text-center font-semibold whitespace-nowrap transition-[transform,background-color,border-color,box-shadow] duration-300 ease-kheni focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-cobalt focus-visible:ring-offset-2",
    size === "lg" ? "min-h-14 px-7 text-base" : "min-h-12 px-5 text-[.9375rem]",
    variant === "primary" && "bg-cobalt text-white shadow-[0_10px_24px_-12px_rgba(31,91,216,.7)] hover:bg-cobalt-deep",
    variant === "whatsapp" && "bg-whatsapp text-white hover:brightness-95",
    variant === "secondary" && "border border-line-strong bg-white text-ink hover:border-ink/40",
    variant === "onDark" && "border border-white/30 bg-white/10 text-white hover:bg-white/15",
    variant === "ghost" && "min-h-11 px-1 text-cobalt-deep hover:underline underline-offset-4",
    className,
  );
}

/**
 * Book Appointment. Renders a real link to the contact form, so it works
 * with JavaScript unavailable; with JavaScript, `data-book` opens the
 * appointment sheet instead.
 */
export function BookButton({
  placement,
  branch,
  label = "Book Appointment",
  variant = "primary",
  size = "md",
  className,
  arrow = true,
}: {
  placement: string;
  branch?: string;
  label?: string;
  variant?: CtaVariant;
  size?: "md" | "lg";
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link
      href={bookHref}
      data-book
      data-branch={branch}
      data-track="appointment_start"
      data-placement={placement}
      className={ctaClass(variant, size, className)}
    >
      {label}
      {arrow && <ArrowRight className="cta-arrow size-4" aria-hidden="true" />}
    </Link>
  );
}

export function WhatsAppButton({
  placement,
  location,
  message,
  label = "WhatsApp",
  variant = "whatsapp",
  size = "md",
  className,
  context,
  track = "whatsapp_click",
}: {
  placement: string;
  location?: Location;
  message?: string;
  label?: string;
  variant?: CtaVariant;
  size?: "md" | "lg";
  className?: string;
  context?: string;
  track?: "whatsapp_click" | "international_patient_contact";
}) {
  const href = location && !message ? branchWhatsappUrl(location, context) : whatsappUrl(message, location?.whatsappNumber);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-track={track}
      data-placement={placement}
      data-branch={location?.slug}
      className={ctaClass(variant, size, className)}
    >
      <MessageCircle className="size-[1.1rem]" aria-hidden="true" />
      {label}
    </a>
  );
}

export function CallButton({
  placement,
  location,
  label,
  variant = "secondary",
  size = "md",
  className,
}: {
  placement: string;
  location?: Location;
  label?: string;
  variant?: CtaVariant;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <a
      href={telHref(location)}
      data-track="phone_click"
      data-placement={placement}
      data-branch={location?.slug}
      className={ctaClass(variant, size, className)}
    >
      <Phone className="size-[1.05rem]" aria-hidden="true" />
      {label ?? (location ? `Call ${location.displayArea}` : `Call ${site.primaryPhoneDisplay}`)}
    </a>
  );
}
