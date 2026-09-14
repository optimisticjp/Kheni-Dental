import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

export type AccordionItem = { question: string; answer: string };

/**
 * FAQ on native `<details>`/`<summary>`. No JavaScript, keyboard accessible,
 * works before hydration. Questions are set in the display face and the
 * rows are divided by hairlines rather than boxed, so a list of eight reads
 * as one piece of writing.
 */
export function Accordion({ items, className, exclusive = false, name = "faq", tone = "light" }: { items: readonly AccordionItem[]; className?: string; exclusive?: boolean; name?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className={cn("divide-y border-y", dark ? "divide-white/15 border-white/15" : "divide-line border-line", className)}>
      {items.map((item, index) => (
        <details key={index} className="group" name={exclusive ? name : undefined}>
          <summary
            className={cn(
              "flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-display text-[1.15rem] font-bold leading-tight tracking-[-.02em] marker:hidden [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset",
              dark ? "focus-visible:ring-butter" : "focus-visible:ring-blue",
            )}
          >
            <span>{item.question}</span>
            <span aria-hidden="true" className={cn("grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-300 group-open:rotate-45", dark ? "bg-butter text-ink" : "bg-ink text-white")}>
              <Plus className="size-4" />
            </span>
          </summary>
          <div className={cn("t-body pb-6 pr-12", dark ? "text-white/80" : "text-ink-soft")}>{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
