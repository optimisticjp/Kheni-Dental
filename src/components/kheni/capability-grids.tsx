import { Check } from "lucide-react";

import { MediaFrame, PendingTag } from "@/components/kheni/pending";
import { implantSystems, implantWorkflowPending, technologies } from "@/content/capabilities";
import { finance, priceList, costNote } from "@/content/pricing";
import { cn } from "@/lib/utils";

/**
 * Equipment. Treated as visual proof rather than a specification list: each
 * card is a photograph of the actual machine plus the one line a patient cares
 * about, which is what it lets the dentist see.
 */
export function TechnologyGrid({ tone = "light" }: { tone?: "dark" | "light" }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {technologies.map((tech, index) => (
        <article
          key={tech.id}
          className={cn(
            "group overflow-hidden rounded-2xl border",
            tech.status === "pending" && "border-dashed",
            tone === "dark" ? "border-white/12 bg-white/[.03]" : "border-border bg-card",
          )}
        >
          <MediaFrame
            shot={tech.name ? `${tech.name} in the clinic` : "Equipment photo"}
            tone={tone}
            ratio="4 / 3"
            className="rounded-none border-0 border-b border-dashed"
          />
          <div className="p-5">
            <span aria-hidden="true" className="font-mono text-[.6rem] text-gold">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className={cn("mt-2 font-serif text-xl leading-snug", !tech.name && "text-muted-foreground/60")}>
              {tech.name ?? "[ Equipment name ]"}
            </p>
            <p className={cn("mt-2 text-sm leading-6", tone === "dark" ? "text-white/55" : "text-muted-foreground")}>
              {tech.purpose ?? "What it lets the dentist assess or plan."}
            </p>
            {tech.experience && (
              <p className={cn("mt-2 text-xs leading-5", tone === "dark" ? "text-white/40" : "text-muted-foreground/80")}>
                {tech.experience}
              </p>
            )}
            {tech.status === "pending" && <PendingTag className="mt-4" label="Name and photo needed" />}
          </div>
        </article>
      ))}
    </div>
  );
}

/**
 * Implant systems.
 *
 * The strongest implant clinics use the system brands themselves as proof, so
 * the rail is built at full weight now: a logo plate and a name per system.
 * Brand names stay blank until the clinic confirms which systems it uses and
 * at which branch. Never fill these in from a guess.
 */
export function ImplantSystemRail({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {implantSystems.map((system, index) => (
        <div
          key={system.id}
          className={cn(
            "flex flex-col items-center gap-4 rounded-2xl border p-5 text-center",
            system.status === "pending" && "border-dashed",
            dark ? "border-white/12 bg-white/[.03]" : "border-border bg-card",
          )}
        >
          {/* Logo plate. A real logo drops in at exactly this size. */}
          <div
            className={cn(
              "grid h-14 w-full place-items-center rounded-lg border border-dashed",
              dark ? "border-white/12 bg-ink/40" : "border-border bg-[#f4f1ea]",
            )}
          >
            <span aria-hidden="true" className="font-mono text-[.6rem] tracking-[.2em] text-gold/70">
              {system.logo ? "" : "LOGO"}
            </span>
          </div>
          <div>
            <p className={cn("font-serif text-base leading-tight", !system.name && "text-muted-foreground/70")}>
              {system.name ?? `Implant system ${String(index + 1).padStart(2, "0")}`}
            </p>
            {system.origin && (
              <p className={cn("mt-1 text-xs", dark ? "text-white/40" : "text-muted-foreground")}>{system.origin}</p>
            )}
          </div>
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
