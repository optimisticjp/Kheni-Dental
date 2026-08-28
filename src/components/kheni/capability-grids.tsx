import { Check } from "lucide-react";

import { MediaFrame, PendingTag } from "@/components/kheni/pending";
import { implantSystems, implantWorkflowPending, technologies } from "@/content/capabilities";
import { finance, priceList, costNote } from "@/content/pricing";
import { cn } from "@/lib/utils";

/** Equipment grid. Each card answers "what does this let the dentist see?". */
export function TechnologyGrid({ tone = "light" }: { tone?: "dark" | "light" }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {technologies.map((tech) => (
        <article
          key={tech.id}
          className={cn(
            "overflow-hidden rounded-2xl border",
            tech.status === "pending" ? "border-dashed" : "",
            tone === "dark" ? "border-white/12" : "border-border bg-card",
          )}
        >
          <MediaFrame shot="Equipment photo" tone={tone} ratio="4 / 3" className="rounded-none border-0 border-b border-dashed" />
          <div className="p-5">
            <p className={cn("font-serif text-xl", tech.name ? "" : "text-muted-foreground/70")}>
              {tech.name ?? "Equipment name"}
            </p>
            <p className={cn("mt-2 text-sm leading-6", tone === "dark" ? "text-white/55" : "text-muted-foreground")}>
              {tech.purpose ?? "What it helps the dentist assess."}
            </p>
            {tech.status === "pending" && <PendingTag className="mt-3" />}
          </div>
        </article>
      ))}
    </div>
  );
}

/** Implant system rail. Brand names stay blank until the clinic confirms them. */
export function ImplantSystemRail({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {implantSystems.map((system, index) => (
        <div
          key={system.id}
          className={cn(
            "flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-3 py-4 text-center",
            tone === "dark" ? "border-white/12" : "border-border",
          )}
        >
          <p className={cn("text-sm font-semibold", tone === "dark" ? "text-white/70" : "text-foreground")}>
            {system.name ?? `Implant system ${String(index + 1).padStart(2, "0")}`}
          </p>
          {system.status === "pending" && <PendingTag label="Brand to confirm" />}
        </div>
      ))}
    </div>
  );
}

/** Workflow capabilities that are each a clinical claim, so all still pending. */
export function ImplantWorkflowPending({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {implantWorkflowPending.map((item) => (
        <li
          key={item}
          className={cn(
            "flex min-h-12 items-center justify-between gap-3 rounded-xl border border-dashed px-4 py-2.5 text-sm",
            tone === "dark" ? "border-white/12 text-white/70" : "border-border",
          )}
        >
          {item}
          <PendingTag label="To confirm" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Price and finance.
 *
 * Indian patients ask what it costs before they ask anything else, so the
 * table exists and looks finished. Every figure is masked until the clinic
 * approves a real one.
 */
export function PriceTable({ limit, tone = "light" }: { limit?: number; tone?: "dark" | "light" }) {
  const rows = limit ? priceList.slice(0, limit) : priceList;
  return (
    <div className={cn("overflow-hidden rounded-2xl border", tone === "dark" ? "border-white/10" : "border-border bg-card")}>
      <ul className={cn("divide-y", tone === "dark" ? "divide-white/10" : "divide-border")}>
        {rows.map((row) => (
          <li key={row.id} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4">
            <span className="text-sm font-medium">{row.treatment}</span>
            <span className="flex items-center gap-3">
              <span className={cn("font-serif text-lg", row.from.status === "pending" ? "text-gold/45" : "text-gold")}>
                {row.from.status === "verified" ? row.from.value : row.from.placeholder}
                {row.to && (
                  <span className="text-muted-foreground">
                    {" – "}
                    {row.to.status === "verified" ? row.to.value : row.to.placeholder}
                  </span>
                )}
              </span>
              {row.from.status === "pending" && <PendingTag label="Price needed" />}
            </span>
          </li>
        ))}
      </ul>

      <div className={cn("border-t px-5 py-5", tone === "dark" ? "border-white/10 bg-white/[.03]" : "border-border bg-[#f6f3ec]")}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">EMI and payment plans</p>
            <p className={cn("mt-1 text-sm", tone === "dark" ? "text-white/55" : "text-muted-foreground")}>
              {finance.emiAvailable === "yes"
                ? `From ${finance.monthlyFrom.placeholder} a month`
                : "Monthly payment options"}
            </p>
          </div>
          <PendingTag label="Finance details to confirm" />
        </div>
      </div>

      <p className={cn("border-t px-5 py-4 text-xs leading-5", tone === "dark" ? "border-white/10 text-white/45" : "border-border text-muted-foreground")}>
        {costNote}
      </p>
    </div>
  );
}

/** Small tick list used for "what is included" style content. */
export function TickList({ items, tone = "light" }: { items: readonly string[]; tone?: "dark" | "light" }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-6">
          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
            <Check className="size-3" aria-hidden="true" />
          </span>
          <span className={tone === "dark" ? "text-white/70" : ""}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
