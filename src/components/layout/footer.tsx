import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { BrandMark } from "@/components/kheni/brand-mark";
import { Container } from "@/components/ui/container";
import { navLinks, site, treatments } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-white">
      <Container width="7xl" className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr_.8fr_.9fr]">
          <div><BrandMark /><p className="mt-5 max-w-sm text-sm leading-6 text-white/55">{site.description}</p><div className="mt-6 flex gap-3"><a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-10 place-items-center rounded-full border border-white/12 hover:border-gold/50 hover:text-gold"><InstagramIcon className="size-4" /></a><a href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="WhatsApp" data-track="whatsapp_click" data-placement="footer" className="grid size-10 place-items-center rounded-full border border-white/12 hover:border-gold/50 hover:text-gold"><MessageCircle className="size-4" /></a></div></div>
          <div><h3 className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Explore</h3><ul className="mt-5 space-y-3">{navLinks.slice(0,5).map(link => <li key={link.href}><Link className="text-sm text-white/60 hover:text-white" href={link.href}>{link.label}</Link></li>)}</ul></div>
          <div><h3 className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Treatments</h3><ul className="mt-5 space-y-3">{treatments.slice(0,5).map(t => <li key={t.slug}><Link className="text-sm text-white/60 hover:text-white" href={`/treatments/${t.slug}`}>{t.title}</Link></li>)}</ul></div>
          <div><h3 className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Visit</h3><div className="mt-5 space-y-4 text-sm text-white/60"><p className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" />{site.address}</p><a className="flex gap-3 hover:text-white" href={`tel:${site.phoneHref}`} data-track="phone_click" data-placement="footer"><Phone className="size-4 text-gold" />{site.phoneDisplay}</a><p>{site.hours}</p></div></div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between"><p>© {year} {site.name}. All rights reserved.</p><div className="flex gap-5"><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/terms" className="hover:text-white">Terms & medical disclaimer</Link></div></div>
      </Container>
    </footer>
  );
}
