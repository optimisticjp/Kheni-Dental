import Link from "next/link";
import { CalendarDays, MessageCircle, Phone } from "lucide-react";
import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/10 bg-ink text-white md:hidden">
      <a href={`tel:${site.primaryPhoneHref}`} data-track="phone_click" data-placement="mobile_sticky" className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs"><Phone className="size-4 text-gold" />Call</a>
      <a href={whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="mobile_sticky" className="flex min-h-16 flex-col items-center justify-center gap-1 border-x border-white/10 text-xs"><MessageCircle className="size-4 text-gold" />WhatsApp</a>
      <Link href="/contact#book" data-track="appointment_start" data-placement="mobile_sticky" className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs"><CalendarDays className="size-4 text-gold" />Book</Link>
    </div>
  );
}
