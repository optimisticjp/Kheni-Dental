"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Before/after comparison on a native range input.
 *
 * The browser already ships a control that does what a comparison slider
 * needs: it drags with a finger, moves with arrow keys, jumps with Home and
 * End, and announces itself to a screen reader. So the range input is the
 * whole interaction. Its value drives a CSS custom property that clips the
 * "after" layer; nothing is measured, no pointer maths, no library.
 *
 * Both images carry explicit alt text and the wrapper a fixed aspect ratio,
 * so nothing shifts as they load. Before and After are printed on the frame
 * as well as in the alt text, so the labels never rely on position alone.
 *
 * Without JavaScript the input still renders and the images stack at 50/50,
 * which is a readable comparison.
 */
export function BeforeAfterSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  ratio = "4 / 3",
  className,
  caption,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  ratio?: string;
  className?: string;
  caption?: string;
}) {
  const [split, setSplit] = useState(50);
  const id = useId();

  return (
    <figure className={cn("ba relative isolate select-none overflow-hidden rounded-[1.25rem] bg-navy-tint", className)} style={{ ["--split" as string]: `${split}%`, aspectRatio: ratio }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={before} alt={beforeAlt} className="absolute inset-0 size-full object-cover" draggable={false} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt={afterAlt} className="ba-after absolute inset-0 size-full object-cover" draggable={false} />

      <span aria-hidden="true" className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-[.7rem] font-bold uppercase tracking-[.1em] text-white">
        Before
      </span>
      <span aria-hidden="true" className="absolute right-3 top-3 rounded-full bg-cobalt px-2.5 py-1 text-[.7rem] font-bold uppercase tracking-[.1em] text-white">
        After
      </span>

      {/* divider and knob, positioned by the same variable */}
      <span aria-hidden="true" className="ba-handle pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(18,34,74,.25)]" />
      <span aria-hidden="true" className="ba-handle ba-knob pointer-events-none absolute top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-[0_6px_18px_rgba(18,34,74,.35)]">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" />
        </svg>
      </span>

      <label htmlFor={id} className="sr-only">
        Show more of the after photograph
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={split}
        onChange={(event) => setSplit(Number(event.target.value))}
        aria-valuetext={`${split}% after`}
        className="ba-range absolute inset-0 z-10 m-0 h-full w-full"
      />
      {caption && <figcaption className="sr-only">{caption}</figcaption>}
    </figure>
  );
}
