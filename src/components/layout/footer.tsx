import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { BrandMark } from "@/components/kheni/brand-mark";
import { Container } from "@/components/ui/container";
import { locations, navLinks, site, treatments } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-white">
      <Container width="7xl" className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_.7fr_.8fr_1.15fr]">
          <div>
            <BrandMark />
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/55">{site.description}</p>
            <a href={`mailto:${site.email}`} className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm text-gold"><Mail className="size-4" />{site.email}</a>
            <div className="mt-6 flex gap-3">
              <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-10 place-items-center rounded-full border border-white/12 hover:border-gold/50 hover:text-gold"><InstagramIcon className="size-4" /></a>
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="WhatsApp" data-track="whatsapp_click" data-placement="footer" className="grid size-10 place-items-center rounded-full border border-white/12 hover:border-gold/50 hover:text-gold"><MessageCircle className="size-4" /></a>
            </div>
          </div>
          <div>
            <h3 className="t-eyebrow text-gold">Explore</h3>
            <ul className="mt-3 space-y-0.5">{navLinks.map(link => <li key={link.href}><Link className="inline-flex min-h-11 items-center text-sm text-white/60 hover:text-white" href={link.href}>{link.label}</Link></li>)}<li><Link className="inline-flex min-h-11 items-center text-sm text-white/60 hover:text-white" href="/contact/">Contact</Link></li></ul>
          </div>
          <div>
            <h3 className="t-eyebrow text-gold">Treatments</h3>
            <ul className="mt-3 space-y-0.5">{treatments.slice(0,6).map(t => <li key={t.slug}><Link className="inline-flex min-h-11 items-center text-sm text-white/60 hover:text-white" href={`/treatments/${t.slug}/`}>{t.title}</Link></li>)}</ul>
          </div>
          <div>
            <h3 className="t-eyebrow text-gold">Visit in Surat</h3>
            <div className="mt-5 space-y-5">
              {locations.map((location) => (
                <div key={location.slug} className="border-b border-white/10 pb-5 last:border-0 last:pb-0">
                  <Link href={`/locations/${location.slug}/`} className="inline-flex min-h-11 items-center font-medium text-white hover:text-gold">{location.shortName}</Link>
                  <p className="mt-2 flex gap-2 text-xs leading-5 text-white/50"><MapPin className="mt-0.5 size-3.5 shrink-0 text-gold" />{location.address}</p>
                  <a className="mt-1 inline-flex min-h-11 items-center gap-2 text-sm text-white/60 hover:text-white" href={`tel:${location.phoneHref}`} data-track="phone_click" data-placement="footer"><Phone className="size-4 text-gold" />{location.phoneDisplay}</a>
                  <a className="mt-1 inline-flex min-h-11 items-center text-xs font-semibold text-gold hover:text-gold-soft" href={location.googleProfileUrl} target="_blank" rel="noreferrer" data-track="review_click" data-placement={`footer_${location.slug}`}>See this clinic on Google ↗</a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5"><Link href="/privacy/" className="inline-flex min-h-11 items-center hover:text-white">Privacy</Link><Link href="/terms/" className="inline-flex min-h-11 items-center hover:text-white">Terms &amp; medical disclaimer</Link></div>
        </div>
      </Container>
    </footer>
  );
}
