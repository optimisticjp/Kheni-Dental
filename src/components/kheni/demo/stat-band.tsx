"use client";

import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { demoStats, type DemoStat } from "@/content/demo";
import { cn } from "@/lib/utils";

/**
 * The volume counter band.
 *
 * Numbers count up once, when the band first scrolls into view, and hold.
 * `prefers-reduced-motion` skips straight to the final figure. Every value
 * here is invented; see `src/content/demo/index.ts`.
 */
function useCountUp(target: number, run: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    // Reduced motion gets duration 0, so the first frame lands on the final
    // figure. Same code path, no synchronous setState in the effect body.
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
      // easeOutExpo, so it lands rather than stopping dead.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, run]);

  return value;
}

function StatCell({ stat, run, compact }: { stat: DemoStat; run: boolean; compact?: boolean }) {
  const value = useCountUp(stat.value, run);
  return (
    <div className={cn(`hue-${stat.hue} relative overflow-hidden rounded-2xl bg-white/[.06] p-4 ring-1 ring-white/10`, compact && "p-3.5")}>
      <span aria-hidden="true" className="absolute -right-6 -top-8 size-20 rounded-full bg-h-fill opacity-25 blur-xl" />
      <p className="relative font-serif text-[1.75rem] font-semibold leading-none tabular-nums text-white sm:text-[2.15rem]">
        {stat.prefix}
        {value.toLocaleString("en-IN")}
        {stat.suffix}
      </p>
      <p className="relative mt-1.5 text-[.8125rem] font-semibold leading-tight text-white sm:text-sm">{stat.label}</p>
      {!compact && <p className="relative mt-1 text-[.75rem] leading-snug text-white/55">{stat.detail}</p>}
    </div>
  );
}

export function StatBand({ stats = demoStats, className, eyebrow = "By the numbers", title = "Fifteen years, added up." }: { stats?: DemoStat[]; className?: string; eyebrow?: string; title?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRun(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={cn("relative isolate overflow-hidden bg-ink py-10 text-white sm:py-14 lg:py-16", className)}>
      <div aria-hidden="true" className="absolute -left-20 top-0 size-72 rounded-full bg-cobalt opacity-40 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-20 bottom-0 size-72 rounded-full bg-coral opacity-25 blur-3xl" />
      <Container width="7xl" className="relative">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="t-eyebrow text-sunshine">{eyebrow}</p>
            <h2 className="t-h2 mt-2 text-white">{title}</h2>
          </div>
          <p className="t-small max-w-xs text-white/55">Both clinics, every year since 2011.</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:grid-cols-4 sm:gap-3 lg:gap-4">
          {stats.map((stat) => (
            <StatCell key={stat.id} stat={stat} run={run} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/** The tight four-up strip that sits directly under a hero. */
export function StatStrip({ stats, className }: { stats: DemoStat[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setRun(true);
        observer.disconnect();
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("grid grid-cols-2 gap-2 sm:grid-cols-4", className)}>
      {stats.map((stat) => (
        <StatCell key={stat.id} stat={stat} run={run} compact />
      ))}
    </div>
  );
}
