import { locations, site, type Location } from "@/content/site";

/** Official click-to-chat URL. Nothing is sent until the patient taps send. */
export function whatsappUrl(message: string = site.consultationMessage, number: string = site.whatsappNumber) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** WhatsApp for a specific clinic, with a neutral prefilled line. Never health details. */
export function branchWhatsappUrl(location: Location, context?: string) {
  const suffix = context ? ` (${context})` : "";
  return whatsappUrl(
    `Hello Kheni Dental, I would like to book an appointment at ${location.shortName}, ${location.displayArea}${suffix}. Please let me know which days and times are open. Thank you.`,
    location.whatsappNumber,
  );
}

export const telHref = (location?: Location) => `tel:${location?.phoneHref ?? site.primaryPhoneHref}`;

/** The no-JavaScript destination of every Book button. With JS, the sheet opens instead. */
export const bookHref = "/contact/#book";

export const locationBySlug = (slug?: string) => locations.find((l) => l.slug === slug);
