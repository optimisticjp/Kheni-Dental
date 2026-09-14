import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

import type { Location } from "@/content/site";
import { site } from "@/content/site";
import { bookHref, branchWhatsappUrl, telHref, whatsappUrl } from "@/lib/links";
import { cn } from "@/lib/utils";

/**
 * The Kheni button system. Pills with a circular arrow that travels on
 * hover. One primary per section.
 *
 *   primary       electric blue, white text
 *   butter        butter yellow, ink text. The primary on blue or ink.
 *   ink           ink, white text, butter arrow
 *   white         white, ink text, blue arrow. On coloured fields.
 *   whatsapp      WhatsApp green
 *   outline       2px ink outline. The quieter partner on light fields.
 *   outlineLight  2px white outline. The quieter partner on dark fields.
 *
 * All are at least 52px tall, because most visitors are tapping.
 */
export type CtaVariant = "primary" | "butter" | "ink" | "white" | "whatsapp" | "outline" | "outlineLight";
export type CtaSize = "sm" | "md" | "lg";

const VARIANT: Record<CtaVariant, string> = {
  primary: "btn-primary",
  butter: "btn-butter",
  ink: "btn-ink",
  white: "btn-white",
  whatsapp: "btn-whatsapp",
  outline: "btn-outline",
  outlineLight: "btn-outline-light",
};

export function ctaClass(variant: CtaVariant = "primary", size: CtaSize = "md", className?: string) {
  return cn("btn", VARIANT[variant], size === "lg" && "btn-lg", size === "sm" && "btn-sm", className);
}

export function Arrow({ className }: { className?: string }) {
  return (
    <span className={cn("arrow", className)} aria-hidden="true">
      <ArrowRight />
    </span>
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
  size?: CtaSize;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link href={bookHref} data-book data-branch={branch} data-track="appointment_start" data-placement={placement} className={ctaClass(variant, size, className)}>
      {label}
      {arrow && <Arrow />}
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
  size?: CtaSize;
  className?: string;
  context?: string;
  track?: "whatsapp_click" | "international_patient_contact";
}) {
  const href = location && !message ? branchWhatsappUrl(location, context) : whatsappUrl(message, location?.whatsappNumber);
  return (
    <a href={href} target="_blank" rel="noreferrer" data-track={track} data-placement={placement} data-branch={location?.slug} className={ctaClass(variant, size, className)}>
      <MessageCircle className="size-[1.1rem]" aria-hidden="true" />
      {label}
    </a>
  );
}

export function CallButton({
  placement,
  location,
  label,
  variant = "outline",
  size = "md",
  className,
}: {
  placement: string;
  location?: Location;
  label?: string;
  variant?: CtaVariant;
  size?: CtaSize;
  className?: string;
}) {
  return (
    <a href={telHref(location)} data-track="phone_click" data-placement={placement} data-branch={location?.slug} className={ctaClass(variant, size, className)}>
      <Phone className="size-[1.05rem]" aria-hidden="true" />
      {label ?? (location ? `Call ${location.displayArea}` : `Call ${site.primaryPhoneDisplay}`)}
    </a>
  );
}

/** A text link with the travelling circle arrow. */
export function ArrowLink({ href, children, className, tone = "ink", ...rest }: { href: string; children: React.ReactNode; className?: string; tone?: "ink" | "white" | "blue" } & Record<`data-${string}`, string | undefined>) {
  const style =
    tone === "white"
      ? ({ ["--arrow-bg" as string]: "#ffffff", ["--arrow-fg" as string]: "var(--ink)" } as React.CSSProperties)
      : tone === "blue"
        ? ({ ["--arrow-bg" as string]: "var(--blue)", ["--arrow-fg" as string]: "#ffffff" } as React.CSSProperties)
        : undefined;
  return (
    <Link href={href} className={cn("link-arrow", tone === "white" && "text-white", className)} style={style} {...rest}>
      {children}
      <Arrow />
    </Link>
  );
}
