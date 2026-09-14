"use client";

import { useState } from "react";

import type { ResourceCategory } from "@/content/patient-resources";
import { cn } from "@/lib/utils";

/**
 * The patient library, with one-tap filters. Every category is on the
 * page for a reader without JavaScript; the filters only hide the rest.
 * Numbered points sit on dividers, not in cards, so a guide reads like a
 * page from a leaflet.
 */
export function ResourceLibrary({ categories }: { categories: ResourceCategory[] }) {
  const [active, setActive] = useState<string>("all");
  const shown = categories.filter((c) => active === "all" || c.id === active);

  return (
    <div>
      <div role="group" aria-label="Filter guides" className="-mx-4 sm:mx-0">
        <div className="rail px-4 sm:flex-wrap sm:px-0">
          {[{ id: "all", label: "All guides" }, ...categories.map((c) => ({ id: c.id, label: c.label }))].map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={active === f.id}
              onClick={() => setActive(f.id)}
              className={cn("inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-4 text-sm font-bold transition-colors", active === f.id ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-line hover:bg-ink/5")}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-12">
        {shown.map((category, index) => (
          <section key={category.id} id={category.id} className={cn(`mood-${category.hue} anchor grid gap-6 lg:grid-cols-[.6fr_1.4fr] lg:gap-14`)}>
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="t-eyebrow text-m-text">0{index + 1}</p>
              <h2 className="t-h2 mt-2">{category.label}</h2>
              <p className="t-lead mt-3 text-ink-soft">{category.intro}</p>
            </div>
            <div className="grid gap-8">
              {category.guides.map((guide) =>
                guide.status === "published" ? (
                  <article key={guide.id} id={guide.id} className="anchor">
                    <h3 className="font-display text-2xl font-extrabold tracking-[-.03em]">{guide.title}</h3>
                    <p className="t-small mt-1 text-ink-soft">{guide.summary}</p>
                    <ol className="mt-4 divide-y divide-line border-y border-line">
                      {guide.points.map((point, i) => (
                        <li key={point} className="flex gap-4 py-4 text-[1.02rem] leading-6">
                          <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-m-fill text-xs font-extrabold text-m-on">{i + 1}</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ol>
                  </article>
                ) : null,
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
