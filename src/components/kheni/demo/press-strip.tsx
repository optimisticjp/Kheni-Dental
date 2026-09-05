import { BadgeCheck, Quote, Trophy } from "lucide-react";

import { PressWordmark, StockPortrait } from "@/components/kheni/demo/art";
import { Container } from "@/components/ui/container";
import { demoAccreditations, demoAwards, demoNotables, demoPress } from "@/content/demo";
import { cn } from "@/lib/utils";

/**
 * "As seen in", awards and notable patients.
 *
 * The mastheads, the award bodies and the public figures are all fictional.
 * No real publication has covered this clinic and nobody has endorsed it.
 */
export function PressStrip({ className }: { className?: string }) {
  return (
    <div className={cn("border-y border-line bg-white/70 py-5 sm:py-6", className)}>
      <Container width="7xl">
        <p className="t-eyebrow text-center text-ink-soft">Written about in</p>
        <div className="edge-fade -mx-4 mt-4 min-w-0 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          <ul className="flex items-center gap-6 overflow-x-auto pb-1 text-ink/45 sm:gap-10 lg:justify-center">
            {demoPress.map((item) => (
              <li key={item.id} className="shrink-0">
                <PressWordmark name={item.outlet} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}

/** The press quotes, set as a pull-quote row. */
export function PressQuotes({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {demoPress.slice(0, 3).map((item) => (
        <li key={item.id} className="rounded-[1.25rem] border border-line bg-white p-5">
          <Quote aria-hidden="true" className="size-5 text-cobalt/40" />
          <p className="t-card mt-2.5 leading-snug">{item.quote}</p>
          <p className="t-small mt-3 text-ink-soft">
            <PressWordmark name={item.outlet} className="text-ink" /> · {item.date}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function AwardsRow({ className }: { className?: string }) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="edge-fade -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:[mask-image:none]">
        <ul className="rail-snap flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible lg:gap-4">
          {demoAwards.map((award) => (
            <li key={award.id} className={`hue-${award.hue} w-[68vw] shrink-0 rounded-[1.25rem] border border-line bg-white p-5 sm:w-[40vw] lg:w-auto`}>
              <span className="grid size-10 place-items-center rounded-full bg-h-tint text-h-text">
                <Trophy className="size-5" aria-hidden="true" />
              </span>
              <p className="t-eyebrow mt-3 text-h-text">{award.year}</p>
              <p className="mt-1.5 text-[.9375rem] font-semibold leading-snug text-ink">{award.title}</p>
              <p className="t-small mt-2 text-ink-soft">{award.body}</p>
            </li>
          ))}
        </ul>
      </div>
      <ul className="mt-5 flex flex-wrap gap-2">
        {demoAccreditations.map((item) => (
          <li key={item} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[.78rem] font-semibold text-ink ring-1 ring-line">
            <BadgeCheck className="size-3.5 text-cobalt" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Notable patients. Fictional people, invented quotes. */
export function NotableStrip({ className }: { className?: string }) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="edge-fade -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:[mask-image:none]">
        <ul className="rail-snap flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible lg:gap-4">
          {demoNotables.map((person, index) => (
            <li key={person.id} className={`hue-${person.hue} w-[72vw] shrink-0 overflow-hidden rounded-[1.25rem] border border-line bg-white sm:w-[44vw] lg:w-auto`}>
              <div className="relative aspect-[4/3] overflow-hidden bg-h-tint">
                <StockPortrait seed={index} label={`Illustration standing in for a photograph of ${person.name}`} />
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-ink">{person.name}</p>
                <p className="t-small text-h-text">{person.role}</p>
                <p className="t-small mt-2.5 leading-snug text-ink-soft">&ldquo;{person.quote}&rdquo;</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
