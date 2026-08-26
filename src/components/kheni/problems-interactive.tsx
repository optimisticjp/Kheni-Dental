"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { problems } from "@/content/site";
import { pushTrackingEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

export function ProblemsInteractive({ limit }: { limit?: number }) {
  const items = limit ? problems.slice(0, limit) : problems;
  const [active, setActive] = useState(0);

  const activate = (index: number) => {
    setActive(index);
    pushTrackingEvent({ event: "problem_interaction", placement: "problems_we_treat", interaction: "expand" });
  };

  return (
    <div className="grid gap-3 lg:grid-cols-12">
      {items.map((problem, index) => {
        const selected = active === index;
        return (
          <article
            key={problem.title}
            onMouseEnter={() => setActive(index)}
            className={cn(
              "relative flex min-h-48 flex-col overflow-hidden rounded-[1.5rem] border transition-[grid-column,background-color,border-color] duration-500 lg:min-h-72",
              selected ? "border-gold/50 bg-[#171714] text-white lg:col-span-5" : "border-white/10 bg-[#121211] text-white lg:col-span-1",
            )}
          >
            <button type="button" onClick={() => activate(index)} aria-expanded={selected} className="flex w-full flex-1 flex-col p-5 text-left">
              <div className="flex items-start justify-between gap-3"><span className="font-mono text-xs text-gold">0{index + 1}</span><ArrowUpRight className={cn("size-4 transition-transform", selected ? "rotate-0 text-gold" : "-rotate-45 text-white/35")} /></div>
              <div className="mt-auto">
                <h3 className={cn("font-serif transition-all duration-500", selected ? "text-3xl" : "text-xl lg:[writing-mode:vertical-rl] lg:rotate-180")}>{problem.title}</h3>
                <div className={cn("grid transition-all duration-500", selected ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}><div className="overflow-hidden"><p className="max-w-md text-sm leading-6 text-white/60">{problem.detail}</p></div></div>
              </div>
            </button>
            {selected && <Link href={problem.href} className="mx-5 mb-5 inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-[.18em] text-gold">Explore options <ArrowUpRight className="size-3.5" /></Link>}
          </article>
        );
      })}
    </div>
  );
}
