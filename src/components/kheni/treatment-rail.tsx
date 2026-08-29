"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCallback, useId, useRef, useState } from "react";

import { MediaFrame, PendingTag } from "@/components/kheni/pending";
import { pendingTreatmentAreas, railPanels } from "@/content/problems-rail";
import { pushTrackingEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

/**
 * "Problems we treat" — the site's signature interaction.
 *
 * One selection model, two layouts, because the desktop and phone versions of
 * this idea want genuinely different shapes:
 *
 *   lg and up   a cinematic rail. Collapsed treatments stay as narrow columns
 *               with their name set vertically; the selected one opens into a
 *               full editorial panel with photography, the patient's question,
 *               the explanation and its call to action.
 *
 *   below lg    a scroll-snapping selector of real, thumb-sized chips above a
 *               single large panel. Nothing is rotated, nothing is narrow, and
 *               nothing depends on hover.
 *
 * ACCESSIBILITY
 * This is a disclosure set, not a tab set: the open panel physically contains
 * its content in the desktop layout, so `aria-expanded` plus `aria-controls`
 * describes it honestly. Every control is a real button, selection is
 * exclusive, and left/right (or up/down) arrows plus Home and End move through
 * the set. Expansion is driven by state rather than `:hover`, so keyboard and
 * touch reach every panel; pointer hover is an extra affordance on top.
 */

const EASING = "cubic-bezier(.16,1,.3,1)";

export function TreatmentRail() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const desktopButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const chipButtons = useRef<(HTMLButtonElement | null)[]>([]);

  const select = useCallback((index: number) => {
    setActive(index);
    // Deliberately records only that the rail was used. The selected panel can
    // reveal a symptom ("gums bleeding", "tooth pain"), so the value itself is
    // never sent to analytics. Same rule as the implant navigator.
    pushTrackingEvent({
      event: "problem_interaction",
      placement: "problems_we_treat",
      interaction: "select",
    });
  }, []);

  const onKeyDown = (event: React.KeyboardEvent, index: number, refs: React.RefObject<(HTMLButtonElement | null)[]>) => {
    const last = railPanels.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    select(next);
    refs.current[next]?.focus();
  };

  const panel = railPanels[active];

  return (
    <div>
      {/* ---------------------------------------------------------------- */}
      {/* Desktop: the expanding rail                                       */}
      {/* ---------------------------------------------------------------- */}
      <div className="hidden gap-2.5 lg:flex lg:h-[30rem]">
        {railPanels.map((item, index) => {
          const open = index === active;
          const panelId = `${baseId}-panel-${index}`;
          return (
            <div
              key={item.slug}
              className={cn(
                "ease-kheni relative isolate overflow-hidden rounded-[1.4rem] border transition-[flex-grow,border-color,background-color,box-shadow] duration-700",
                open
                  ? "grain border-gold/45 bg-[#141311] shadow-[0_28px_70px_-20px_rgba(0,0,0,.75)]"
                  : "border-white/10 bg-[#0f0f0e] hover:border-gold/25",
              )}
              style={{ flexGrow: open ? 9 : 0.5, flexBasis: 0, transitionTimingFunction: EASING }}
              onMouseEnter={() => !open && select(index)}
            >
              {/*
                The control stays mounted whether the panel is open or shut.
                Unmounting it on open destroyed the element that had keyboard
                focus, which silently killed arrow-key navigation after the
                first move. Open, it goes transparent and stops taking pointer
                events so the panel's own CTA is clickable, but it keeps focus
                and keeps answering the keyboard.
              */}
              <button
                type="button"
                ref={(node) => { desktopButtons.current[index] = node; }}
                onClick={() => select(index)}
                onFocus={() => select(index)}
                onKeyDown={(event) => onKeyDown(event, index, desktopButtons)}
                aria-expanded={open}
                aria-controls={panelId}
                className={cn(
                  "absolute inset-0 z-20 flex flex-col items-center justify-between py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold",
                  open && "pointer-events-none",
                )}
              >
                <span
                  className={cn(
                    "ease-kheni flex h-full w-full flex-col items-center justify-between transition-opacity duration-300",
                    open ? "opacity-0" : "opacity-100",
                  )}
                >
                  <span aria-hidden="true" className="font-mono text-[.65rem] text-gold/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-lg leading-none tracking-[-.01em] text-white/70 [writing-mode:vertical-rl] rotate-180">
                    {item.label}
                  </span>
                  <span aria-hidden="true" className="h-8 w-px bg-gradient-to-b from-gold/45 to-transparent" />
                </span>
                {/* The open panel repeats the treatment name visually, so the
                    control keeps an accessible name without doubling it up. */}
                {open && <span className="sr-only">{item.label}</span>}
              </button>

              <div
                id={panelId}
                className={cn(
                  "ease-kheni h-full transition-opacity duration-500",
                  open ? "opacity-100 delay-150" : "pointer-events-none opacity-0",
                )}
                inert={!open}
              >
                {open && (
                  <div className="grid h-full grid-cols-[1.05fr_.95fr]">
                    <div className="flex flex-col p-8 xl:p-10">
                      <div className="flex items-center gap-3">
                        <span aria-hidden="true" className="font-mono text-[.65rem] text-gold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span aria-hidden="true" className="rule-gold h-px w-14" />
                      </div>
                      <p className="mt-7 max-w-md font-serif text-[1.45rem] leading-snug text-gold">{item.question}</p>
                      <h3 className="mt-4 font-serif text-[clamp(1.9rem,2.3vw,2.6rem)] leading-[1.05] tracking-[-.035em] text-white">
                        {item.title}
                      </h3>
                      <p className="mt-4 max-w-md text-sm leading-6 text-white/55">{item.body}</p>
                      <div className="mt-auto pt-7">
                        {item.doctorName && (
                          <p className="mb-4 text-[.7rem] uppercase tracking-[.16em] text-white/35">
                            Led by {item.doctorName}
                          </p>
                        )}
                        <Link
                          href={item.href}
                          data-track="treatment_view"
                          data-placement="problems_rail"
                          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gold/40 bg-gold/[.08] px-5 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-ink"
                        >
                          {item.cta}
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                    <MediaFrame shot={item.shot} className="m-2.5 rounded-[1.05rem]" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Touch: selector chips above one large panel                       */}
      {/* ---------------------------------------------------------------- */}
      <div className="lg:hidden">
        <div className="edge-fade-dark -mx-4 px-4 sm:-mx-6 sm:px-6">
          <div className="rail-snap flex gap-2 overflow-x-auto pb-1">
            {railPanels.map((item, index) => {
              const open = index === active;
              return (
                <button
                  key={item.slug}
                  type="button"
                  ref={(node) => { chipButtons.current[index] = node; }}
                  onClick={() => select(index)}
                  onKeyDown={(event) => onKeyDown(event, index, chipButtons)}
                  aria-expanded={open}
                  aria-controls={`${baseId}-touch-panel`}
                  className={cn(
                    "ease-kheni inline-flex min-h-12 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors duration-300",
                    open
                      ? "border-gold bg-gold text-ink"
                      : "border-white/15 bg-white/[.04] text-white/65",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id={`${baseId}-touch-panel`}
          className="grain relative mt-4 overflow-hidden rounded-[1.4rem] border border-gold/35 bg-[#141311]"
        >
          <MediaFrame shot={panel.shot} ratio="16 / 10" className="m-2.5 rounded-[1.05rem]" />
          <div className="p-6 pt-2 sm:p-7 sm:pt-3">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="font-mono text-[.65rem] text-gold">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true" className="rule-gold h-px w-12" />
            </div>
            <p className="mt-4 font-serif text-lg leading-snug text-gold">{panel.question}</p>
            <h3 className="mt-3 font-serif text-[clamp(1.7rem,7vw,2.2rem)] leading-[1.05] tracking-[-.035em] text-white">
              {panel.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/55">{panel.body}</p>
            {panel.doctorName && (
              <p className="mt-4 text-[.7rem] uppercase tracking-[.16em] text-white/35">Led by {panel.doctorName}</p>
            )}
            <Link
              href={panel.href}
              data-track="treatment_view"
              data-placement="problems_rail_mobile"
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border border-gold/40 bg-gold/[.08] px-5 text-sm font-semibold text-gold"
            >
              {panel.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Treatment areas patients ask for that the clinic has not confirmed
          as separate services yet. Shown honestly rather than guessed at. */}
      <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2.5">
        <span className="w-full text-[.7rem] uppercase tracking-[.16em] text-white/35 sm:w-auto">
          Also asked for
        </span>
        {pendingTreatmentAreas.map((area) => (
          <span
            key={area}
            className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/15 px-3 py-1.5 text-xs text-white/45"
          >
            {area}
            <PendingTag label="Confirm" />
          </span>
        ))}
      </div>
    </div>
  );
}
