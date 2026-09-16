import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { treatments } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Everything the clinic ticked, on one page.
 *
 * Sections 11 to 17 of the clinic information form are a long list of
 * individual services, ticked treatment by treatment. Each treatment page
 * already shows its own list, but nowhere did the whole inventory appear at
 * once, and a patient who wants to know "do they do X" should not have to
 * open eleven pages to find out. Neither should the clinic, reviewing it.
 *
 * So this is a directory rather than a sales section: every treatment that
 * carries an `offer` list, with every item under it, linked to the page that
 * explains it. Items are plain text because they are facts, not features.
 *
 * It reads as one continuous index on a phone and settles into columns from
 * the medium breakpoint, which keeps the scan line short at every width.
 */
export function ServiceDirectory({ className }: { className?: string }) {
  const withOffers = treatments.filter((t) => t.offer && t.offer.items.length > 0);
  const total = withOffers.reduce((sum, t) => sum + (t.offer?.items.length ?? 0), 0);

  return (
    <div className={cn(className)}>
      <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
        {withOffers.map((t) => (
          <section key={t.slug} className={`hue-${t.hue} mb-5 break-inside-avoid rounded-[1.25rem] border border-line bg-white p-5`}>
            <Link
              href={`/treatments/${t.slug}/`}
              data-track="treatment_click"
              data-placement="service_directory"
              data-treatment={t.slug}
              className="group inline-flex items-start gap-1.5"
            >
              <h3 className="t-card underline-offset-4 group-hover:underline">{t.title}</h3>
              <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-h-text" aria-hidden="true" />
            </Link>
            <ul className="mt-3 grid gap-1.5">
              {t.offer?.items.map((item) => (
                <li key={item} className="flex gap-2 text-[.875rem] leading-snug text-ink-soft">
                  <span className="mt-[.45rem] size-1 shrink-0 rounded-full bg-h-fill" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="t-small mt-2 text-ink-soft">
        {total} services across {withOffers.length} treatments, exactly as the clinic confirmed them. Anything not listed here, ask us.
      </p>
    </div>
  );
}
