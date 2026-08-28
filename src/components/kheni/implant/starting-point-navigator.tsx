"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { startingPoints } from "@/content/implant-center";
import { whatsappUrl } from "@/lib/links";
import { pushTrackingEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

/**
 * "What are you trying to solve?" navigator.
 *
 * This is an orientation aid, not an assessment. It never asks for health
 * information, never scores an answer and never tells anyone whether they are
 * suitable for treatment. Each starting point simply shows the questions worth
 * raising, the options worth discussing and what a dentist would need to look
 * at.
 *
 * Pattern: a vertical tablist with a single panel, so the panel content exists
 * once in the DOM. Stacked full-width rows on mobile; an asymmetric two-column
 * composition from `lg` up, where CSS grid moves the panel beside the list.
 *
 * Accessibility: real tab semantics, roving tabindex, arrow/Home/End keys,
 * selection never signalled by colour alone (a gold rule and a filled marker
 * carry it too), and every control is a keyboard-reachable button or link.
 *
 * Privacy: the tracking call is deliberately coarse. It records that the
 * navigator was used and nothing about which situation was chosen, because a
 * selection here could reveal something about the visitor's own mouth. See
 * TRACKING_PLAN.md.
 */
export function StartingPointNavigator() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    setActive(index);
    pushTrackingEvent({
      event: "implant_navigator_interaction",
      placement: "implant_starting_points",
      interaction: "select",
    });
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
    tabRefs.current[next]?.focus();
  };

  const point = startingPoints[active];

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:gap-x-12">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Choose the situation closest to yours"
        className="flex flex-col gap-2 lg:gap-1.5"
      >
        {startingPoints.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`starting-point-tab-${item.id}`}
              aria-selected={selected}
              aria-controls="starting-point-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "group relative flex min-h-16 w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:px-5",
                selected
                  ? "border-gold/55 bg-white/[.07]"
                  : "border-white/10 bg-transparent hover:border-white/25",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-full border transition-colors",
                  selected ? "border-gold bg-gold" : "border-white/25",
                )}
              >
                <span className={cn("size-1.5 rounded-full", selected ? "bg-ink" : "bg-transparent")} />
              </span>
              <span className="min-w-0">
                <span
                  className={cn(
                    "block font-serif text-lg leading-tight sm:text-xl",
                    selected ? "text-white" : "text-white/85",
                  )}
                >
                  {item.label}
                </span>
                <span className="mt-1 block text-xs leading-5 text-white/45">{item.teaser}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="starting-point-panel"
        aria-labelledby={`starting-point-tab-${point.id}`}
        tabIndex={0}
        className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/[.03] p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:p-8 lg:mt-0"
      >
        <p className="font-serif text-2xl leading-tight text-white sm:text-3xl">{point.label}</p>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">{point.summary}</p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-[.68rem] font-semibold uppercase tracking-[.2em] text-gold">
              Questions worth asking
            </p>
            <ul className="mt-4 space-y-2.5">
              {point.questions.map((question) => (
                <li key={question} className="flex gap-3 text-sm leading-6 text-white/70">
                  <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-gold" />
                  {question}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[.68rem] font-semibold uppercase tracking-[.2em] text-gold">
              Options usually discussed
            </p>
            <ul className="mt-4 space-y-2.5">
              {point.options.map((option) => (
                <li key={option} className="flex gap-3 text-sm leading-6 text-white/70">
                  <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-gold" />
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/8 bg-ink/40 p-5 sm:p-6">
          <p className="text-[.68rem] font-semibold uppercase tracking-[.2em] text-gold">
            What the dentist would examine
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {point.examined.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-white/60">
                <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-white/30" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={whatsappUrl(point.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            data-track="whatsapp_click"
            data-placement="implant_starting_points"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full sm:whitespace-nowrap bg-gold px-5 text-sm font-semibold text-ink sm:px-6"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {point.ctaLabel}
          </a>
          <a
            href="/contact/#book"
            data-track="appointment_start"
            data-placement="implant_starting_points"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full sm:whitespace-nowrap border border-white/15 px-5 text-sm font-semibold text-white sm:px-6"
          >
            Book a consultation
            <ArrowUpRight className="size-4 text-gold" aria-hidden="true" />
          </a>
        </div>
        <p className="mt-4 text-xs leading-5 text-white/35">
          This is general information to help you prepare. It cannot tell you what is happening in
          your own mouth.
        </p>
      </div>
    </div>
  );
}
