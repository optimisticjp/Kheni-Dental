import { site } from "@/content/site";

export function whatsappUrl(message: string = site.consultationMessage, number = site.whatsappNumber) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
