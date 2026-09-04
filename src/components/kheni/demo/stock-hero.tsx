import Link from "next/link";
import { ArrowRight, BadgeCheck, Check, Star } from "lucide-react";

import { StockPortrait } from "@/components/kheni/demo/art";
import { StatStrip } from "@/components/kheni/demo/stat-band";
import { Container } from "@/components/ui/container";
import { BookButton, WhatsAppButton } from "@/components/ui/cta";
import { demoHeroStats, demoRatingSummary, demoSuperHero } from "@/content/demo";
import { cn } from "@/lib/utils";

/**
 * The stock photographic hero, with the superlative copy layer.
 *
 * Every claim in it is invented: the rating badge, the "#1", the "painless",
 * the guarantee and the free consultation. The photograph slot is filled by
 * drawn artwork at the exact crop a real photograph would take, so a
 * shoot drops straight in.
 */
export function StockHero({ className }: { className?: string }) {
  return (
    <section
      className={cn("hue-cobalt field relative isolate overflow-hidden", className)}
      style={{ ["--f1" as string]: "var(--cobalt-tint)", ["--f2" as string]: "var(--coral-tint)", ["--f3" as string]: "var(--sunshine-tint)" }}
    >
      <Container width="7xl" className="relative grid gap-7 py-7 sm:py-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14 lg:py-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-[.8rem] font-semibold text-white">
            <BadgeCheck className="size-3.5 text-sunshine" aria-hidden="true" />
            {demoSuperHero.badge}
          </p>
          <h1 className="t-display measure-display mt-4">
            {demoSuperHero.title.split(demoSuperHero.highlight)[0]}
            <span className="hl">{demoSuperHero.highlight}</span>
            {demoSuperHero.title.split(demoSuperHero.highlight)[1]}
          </h1>
          <p className="t-stand measure-stand mt-4 text-ink-soft">{demoSuperHero.copy}</p>

          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {demoSuperHero.points.map((point) => (
              <li key={point} className="flex gap-2 text-[.875rem] font-medium leading-snug text-ink">
                <Check className="mt-0.5 size-4 shrink-0 text-cobalt" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-3 ring-1 ring-line">
              <span className="font-serif text-xl font-semibold leading-none">{demoRatingSummary.average}</span>
              <span className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-sunshine text-sunshine" />
                ))}
              </span>
              <span className="t-small text-ink-soft">{demoRatingSummary.total.toLocaleString("en-IN")} patient reviews</span>
            </span>
          </div>

          {/* Stacked, not two-up: the primary label is long enough that a
              half-width pill clips it at 390px. */}
          <div className="mt-6 grid gap-2.5 sm:flex sm:flex-wrap">
            <BookButton placement="demo_hero" size="lg" label={demoSuperHero.primaryCta} className="px-4 sm:px-7" />
            <WhatsAppButton placement="demo_hero" size="lg" className="px-4 sm:px-7" />
          </div>
          <Link href="/smile-gallery/" className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-cobalt-deep">
            {demoSuperHero.secondaryCta}
            <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-line [aspect-ratio:4/3.4] lg:[aspect-ratio:5/5.4]">
            <StockPortrait seed={0} label="Illustration standing in for the clinic's hero photograph" />
            <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white/90 p-3 backdrop-blur sm:bottom-4 sm:left-4 sm:right-4 sm:p-4">
              <p className="text-[.8125rem] font-semibold text-ink sm:text-sm">Dr. Mayur Kheni, Elite Implant Center</p>
              <p className="t-small mt-0.5 text-ink-soft">Placeholder image. Replace with clinic photography.</p>
            </div>
          </div>
          <StatStrip stats={demoHeroStats} className="mt-3 [&>div]:bg-ink [&>div]:ring-ink/10" />
        </div>
      </Container>
    </section>
  );
}
