import { site } from "@/content/site";

export function whatsappUrl(message: string = site.consultationMessage, number: string = site.whatsappNumber) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
