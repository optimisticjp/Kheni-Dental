import { CalendarDays, MessageCircle, Phone } from "lucide-react";
import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export function MobileCta() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-3 overflow-hidden rounded-2xl border border-gold/25 bg-ink/95 text-white shadow-2xl backdrop-blur md:hidden">
      <a href={`tel:${site.phoneHref}`} data-track="phone_click" data-placement="mobile_sticky" className="flex flex-col items-center gap-1 border-r border-white/10 px-2 py-2.5 text-[0.68rem] font-medium"><Phone className="size-4 text-gold" />Call</a>
      <a href={whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="mobile_sticky" className="flex flex-col items-center gap-1 border-r border-white/10 px-2 py-2.5 text-[0.68rem] font-medium"><MessageCircle className="size-4 text-gold" />WhatsApp</a>
      <a href="/contact#book" data-track="appointment_start" data-placement="mobile_sticky" className="flex flex-col items-center gap-1 px-2 py-2.5 text-[0.68rem] font-medium"><CalendarDays className="size-4 text-gold" />Book</a>
    </div>
  );
}
