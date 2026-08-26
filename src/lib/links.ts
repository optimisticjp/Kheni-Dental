import { site } from "@/content/site";

export function whatsappUrl(message = site.consultationMessage) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
