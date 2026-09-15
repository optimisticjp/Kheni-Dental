import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

import type { Location } from "@/content/site";
import { site } from "@/content/site";
import { bookHref, branchWhatsappUrl, telHref, whatsappUrl } from "@/lib/links";
import { cn } from "@/lib/utils";

/**
 * The site's buttons. Five looks, used consistently:
 *
 *   primary    the logo's rose, at the weight that carries an ink label at
 *              5.39:1. The one action a section is built around, and the
 *              same on ivory and on ink.
 *   secondary  charcoal hairline on a light surface. The quieter partner.
 *   onDark     ivory hairline and text, for a secondary action on ink.
 *   whatsapp   WhatsApp green, white text, only where recognition matters.
 *   ghost      text only, for "see all" links.
 *
 * The primary fill is rose-strong rather than the logo's own #9B6665: that
 * value fails AA with an ink label (4.05:1) and with an ivory one (4.35:1),
 * so the button uses the lifted sibling and the logo rose stays for marks
 * and fills. All are at least 48px tall, because most visitors are tapping.
 */
export type CtaVariant = "primary" | "whatsapp" | "secondary" | "ghost" | "onDark";

export function ctaClass(variant: CtaVariant = "primary", size: "md" | "lg" = "md", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full text-center font-semibold transition-[transform,background-color,border-color,box-shadow,color] duration-300 ease-kheni focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
    size === "lg" ? "min-h-14 px-7 text-base" : "min-h-12 px-5 text-[.9375rem]",
    variant === "primary" && "bg-rose-strong text-ink shadow-[0_10px_24px_-14px_rgba(155,102,101,.85)] hover:bg-rose",
    variant === "whatsapp" && "bg-whatsapp text-white hover:brightness-95",
    variant === "secondary" && "border border-charcoal/30 bg-transparent text-charcoal hover:border-charcoal hover:bg-white",
    variant === "onDark" && "border border-ivory/30 bg-transparent text-ivory hover:border-rose-soft hover:text-rose-soft",
    variant === "ghost" && "min-h-11 px-1 text-gold-text hover:underline underline-offset-4",
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
      <Phone className={cn("size-[1.05rem]", variant === "onDark" && "text-gold")} aria-hidden="true" />
      {label ?? (location ? `Call ${location.displayArea}` : `Call ${site.primaryPhoneDisplay}`)}
    </a>
  );
}
