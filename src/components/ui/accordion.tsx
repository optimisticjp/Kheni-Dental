import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

export type AccordionItem = {
  question: string;
  answer: string;
};

/**
 * FAQ accordion on native `<details>`/`<summary>`. Zero JavaScript,
 * keyboard accessible, works before hydration.
 *
 * `exclusive` gives every item the same `name`, so opening one closes the
 * others. Used on phones where scanning matters more than comparing.
 */
export function Accordion({
  items,
  className,
  exclusive = false,
  name = "faq",
}: {
  items: readonly AccordionItem[];
  className?: string;
  exclusive?: boolean;
  name?: string;
}) {
  return (
    <div className={cn("divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white", className)}>
      {items.map((item, index) => (
        <details key={index} className="group" name={exclusive ? name : undefined}>
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-[1.0625rem] font-semibold leading-snug marker:hidden [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-cobalt">
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="grid size-8 shrink-0 place-items-center rounded-full bg-h-tint text-h-text transition-transform duration-300 group-open:rotate-45"
            >
              <Plus className="size-4" />
            </span>
          </summary>
          <div className="t-body px-5 pb-5 pr-14 text-ink-soft">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
