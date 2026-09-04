import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import { BookButton, WhatsAppButton } from "@/components/ui/cta";
import { demoPriceBySlug, demoPricing, demoPricingNote, inr, type DemoPrice } from "@/content/demo";
import { treatmentBySlug } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The price table.
 *
 * The clinic's standing instruction is that no rates are published. This
 * exists so the layout can be judged; every figure is invented and the
 * build refuses to enable indexing while it is live.
 *
 * On a phone it is cards, not a table: a rate table with four columns is
 * unreadable at 360px and horizontal scroll on pricing is where patients
 * give up.
 */
export function PriceCard({ price, className }: { price: DemoPrice; className?: string }) {
  const treatment = treatmentBySlug(price.treatmentSlug);
  const hue = treatment?.hue ?? "cobalt";
  return (
    <article className={cn(`hue-${hue} relative flex flex-col overflow-hidden rounded-[1.25rem] border bg-white p-5`, price.popular ? "border-h-fill ring-1 ring-h-fill" : "border-line", className)}>
      {price.popular && (
        <span className="absolute right-4 top-4 rounded-full bg-h-fill px-2.5 py-1 text-[.68rem] font-bold uppercase tracking-[.1em] text-h-on-fill">Most asked</span>
      )}
      <p className="t-eyebrow text-h-text">{treatment?.category ?? "Treatment"}</p>
      <h3 className="t-card mt-2">{price.label}</h3>
      <p className="mt-3 font-serif text-[1.6rem] font-semibold leading-none text-ink">
        {inr(price.from)}
        <span className="t-small font-sans font-normal text-ink-soft"> to {inr(price.to)}</span>
      </p>
      <p className="t-small mt-1 text-ink-soft">{price.unit}</p>
      {price.emiFrom && <p className="mt-2 inline-flex w-fit rounded-full bg-h-tint px-2.5 py-1 text-[.75rem] font-semibold text-h-text">EMI from {inr(price.emiFrom)} a month</p>}
      <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
        {price.includes.map((item) => (
          <li key={item} className="flex gap-2 text-[.8125rem] leading-snug text-ink-soft">
            <Check className="mt-0.5 size-3.5 shrink-0 text-h-fill" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-col gap-2 pt-1">
        <BookButton placement={`price_${price.treatmentSlug}`} label="Book a consultation" arrow={false} />
        {treatment && (
          <Link href={`/treatments/${treatment.slug}/`} data-track="treatment_view" data-placement="price_table" className="inline-flex min-h-11 items-center justify-center gap-1.5 text-sm font-semibold text-h-text">
            About this treatment
            <ArrowUpRight className="cta-arrow size-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}

export function PriceTable({ slugs, className }: { slugs?: string[]; className?: string }) {
  const rows = slugs ? slugs.map((s) => demoPriceBySlug[s]).filter(Boolean) : demoPricing;
  return (
    <div className={className}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {rows.map((price) => (
          <PriceCard key={price.treatmentSlug} price={price} />
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-cobalt-tint p-4 sm:p-5">
        <p className="t-small max-w-xl text-ink-soft">{demoPricingNote}</p>
        <WhatsAppButton placement="price_table" label="Ask about your case" />
      </div>
    </div>
  );
}

/** A single "from" anchor, for a treatment page hero. */
export function PriceAnchor({ slug, className }: { slug: string; className?: string }) {
  const price = demoPriceBySlug[slug];
  if (!price) return null;
  return (
    <p className={cn("inline-flex items-baseline gap-1.5 rounded-full bg-white px-3.5 py-2 ring-1 ring-line", className)}>
      <span className="t-small text-ink-soft">From</span>
      <span className="font-serif text-lg font-semibold leading-none text-ink">{inr(price.from)}</span>
      <span className="t-small text-ink-soft">{price.unit}</span>
      {price.emiFrom && <span className="t-small text-cobalt-deep">· EMI {inr(price.emiFrom)}/mo</span>}
    </p>
  );
}
