import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = React.ComponentProps<"div"> & {
  items: readonly AccordionItem[];
};

/**
 * FAQ accordion built on native `<details>`/`<summary>`.
 *
 * Server Component — zero JavaScript. It is keyboard accessible and works
 * without hydration out of the box (native disclosure semantics). The chevron
 * rotation is a CSS transition driven by the `[open]` state and is disabled
 * under `prefers-reduced-motion` via the global rule in `globals.css`.
 *
 * Multiple panels may be open at once. For single-open ("exclusive") behavior,
 * give every `<details>` the same `name` attribute (native accordion grouping).
 */
export function Accordion({ items, className, ...props }: AccordionProps) {
  return (
    <div
      className={cn("divide-y divide-border rounded-xl border border-border", className)}
      {...props}
    >
      {items.map((item, index) => (
        <details key={index} className="group px-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-medium marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            <span>{item.question}</span>
            <ChevronDown
              aria-hidden="true"
              className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <div className="pb-4 pr-8 text-sm leading-relaxed text-muted-foreground">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
