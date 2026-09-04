"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { BookButton, WhatsAppButton } from "@/components/ui/cta";
import { startingPoints } from "@/content/implant-center";
import { locations } from "@/content/site";
import { pushTrackingEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

/**
 * "Which of these is closest to you?"
 *
 * An orientation aid, not an assessment. Real tab semantics with a roving
 * tabindex and arrow keys. Selection is shown by a filled marker and a
 * border as well as colour. Tracking is deliberately coarse: it records
 * that the navigator was used, never which situation was chosen.
 */
export function StartingPoints() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const hirabaug = locations.find((l) => l.implantCentre) ?? locations[1];

  const select = (index: number) => {
    setActive(index);
    pushTrackingEvent({ event: "implant_navigator_interaction", placement: "implant_starting_points", interaction: "select" });
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = startingPoints.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  };

  const point = startingPoints[active];

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-6">
      <div role="tablist" aria-orientation="vertical" aria-label="Choose the situation closest to yours" className="grid grid-cols-2 gap-2 lg:grid-cols-1">
        {startingPoints.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`sp-tab-${item.id}`}
              aria-selected={selected}
              aria-controls="sp-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "ease-kheni flex min-h-16 items-start gap-3 rounded-2xl border p-3 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-cobalt sm:p-4",
                selected ? "border-cobalt bg-cobalt-tint" : "border-line bg-white hover:border-line-strong",
              )}
            >
              <span aria-hidden="true" className={cn("mt-1 grid size-5 shrink-0 place-items-center rounded-full border-2", selected ? "border-cobalt bg-cobalt" : "border-line-strong")}>
                <span className={cn("size-1.5 rounded-full", selected ? "bg-white" : "bg-transparent")} />
              </span>
              <span className="min-w-0">
                <span className="block text-[.9375rem] font-semibold leading-tight">{item.label}</span>
                <span className="t-small mt-1 hidden text-ink-soft sm:block">{item.teaser}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id="sp-panel" aria-labelledby={`sp-tab-${point.id}`} tabIndex={0} className="min-w-0 rounded-[1.5rem] border border-line bg-white p-5 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-cobalt sm:p-7">
        <h3 className="t-h3">{point.label}</h3>
        <p className="t-body mt-3 max-w-2xl text-ink-soft">{point.summary}</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="t-eyebrow text-cobalt-deep">Questions worth asking</p>
            <ul className="mt-3 space-y-2">
              {point.questions.map((q) => (
                <li key={q} className="flex gap-2.5 text-[.9375rem] leading-6">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-cobalt" />
                  {q}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t-eyebrow text-cobalt-deep">Options usually discussed</p>
            <ul className="mt-3 space-y-2">
              {point.options.map((o) => (
                <li key={o} className="flex gap-2.5 text-[.9375rem] leading-6">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-teal" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <WhatsAppButton placement="implant_starting_points" location={hirabaug} message={point.whatsappMessage} label={point.ctaLabel} className="whitespace-normal" />
          <BookButton placement="implant_starting_points" branch={hirabaug.slug} variant="secondary" />
        </div>
        <p className="t-small mt-4 flex items-center gap-1.5 text-ink-soft">
          <ArrowRight className="size-3.5" aria-hidden="true" />
          General information to help you prepare. It cannot tell you what is happening in your own mouth.
        </p>
      </div>
    </div>
  );
}
