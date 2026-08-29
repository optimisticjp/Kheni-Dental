import { Check } from "lucide-react";

import { MediaFrame, PendingTag, gapBorder, showContentGaps } from "@/components/kheni/pending";
import { implantSystems, implantWorkflowPending, technologies } from "@/content/capabilities";
import { finance, priceList, costNote } from "@/content/pricing";
import { cn } from "@/lib/utils";

/**
 * Equipment. Treated as visual proof rather than a specification list: each
 * card is a photograph of the actual machine plus the one line a patient cares
 * about, which is what it lets the dentist see.
 */
export function TechnologyGrid({ tone = "light" }: { tone?: "dark" | "light" }) {
  // Four cards reading "[ Equipment name ]" over an empty photo plate told a
  // patient nothing and made the page look broken. A machine we cannot name
  // is not proof of anything, so it is not shown.
  const shown = technologies.filter((tech) => tech.name);
  if (shown.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {shown.map((tech, index) => (
        <article
          key={tech.id}
          className={cn(
            "group overflow-hidden rounded-2xl border",
            tech.status === "pending" && gapBorder,
            tone === "dark" ? "border-white/12 bg-white/[.03]" : "border-border bg-card",
          )}
        >
          <MediaFrame
            shot={tech.name ? `${tech.name} in the clinic` : "Equipment photo"}
            tone={tone}
            ratio="4 / 3"
            className={cn("rounded-none border-0 border-b", gapBorder)}
          />
          <div className="p-5">
            <span aria-hidden="true" className="font-mono text-[.6rem] text-gold">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 font-serif text-xl leading-snug">
              {tech.name}
            </p>
            <p className={cn("mt-2 text-sm leading-6", tone === "dark" ? "text-white/55" : "text-muted-foreground")}>
              {tech.purpose}
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
  // "Implant system 01" beside a box reading LOGO is not a brand, and naming a
  // system the clinic has not confirmed would be worse than naming none.
  const shown = implantSystems.filter((system) => system.name);
  if (shown.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {shown.map((system) => (
        <div
          key={system.id}
          className={cn(
            "flex flex-col items-center gap-4 rounded-2xl border p-5 text-center",
            system.status === "pending" && gapBorder,
            dark ? "border-white/12 bg-white/[.03]" : "border-border bg-card",
          )}
        >
          {/* Logo plate. A real logo drops in at exactly this size. */}
          <div
            className={cn(
              "grid h-14 w-full place-items-center rounded-lg border", gapBorder,
              dark ? "border-white/12 bg-ink/40" : "border-border bg-[#f4f1ea]",
            )}
          >
            <span aria-hidden="true" className="font-mono text-[.6rem] tracking-[.2em] text-gold/70">
              {system.logo ? "" : "LOGO"}
            </span>
          </div>
          <div>
            <p className="font-serif text-base leading-tight">{system.name}</p>
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

/**
 * Workflow capabilities that are each a clinical claim, so all still pending.
 *
 * This one must never render to a patient. With the "to confirm" tags visible
 * it read as a list of open questions; with them hidden the same four rows —
 * digital planning, bone procedures, immediate loading, implant warranty —
 * read as a list of things the clinic offers. None is confirmed, so the list
 * only exists while the clinic is reviewing its own gaps.
 */
export function ImplantWorkflowPending({ tone = "dark" }: { tone?: "dark" | "light" }) {
  if (!showContentGaps) return null;
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {implantWorkflowPending.map((item) => (
        <li
          key={item}
          className={cn(
            "flex min-h-12 items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-sm", gapBorder,
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
  const priced = priceList.filter((row) => row.from.status === "verified");

  // Every figure is still a placeholder, so the table would read "₹XX,XXX" down
  // the whole column. Indian patients ask about cost early and being evasive
  // reads worse than saying it depends, so this is the honest version of the
  // same answer: what the figure actually turns on, and how to get one.
  if (priced.length === 0) {
    return (
      <div
        className={cn(
          "rounded-2xl border p-6 sm:p-7",
          tone === "dark" ? "border-white/10 bg-white/[.03] text-white" : "border-border bg-card",
        )}
      >
        <p className="t-card">What it costs depends on the case</p>
        <p className={cn("t-small measure-narrow mt-3", tone === "dark" ? "text-white/55" : "text-muted-foreground")}>
          An implant with healthy bone and one with a graft are not the same treatment, and neither are a
          front tooth root canal and a back molar. We would rather look first and quote you properly than put a
          number on a page that turns out to be wrong for you.
        </p>
        <p className={cn("t-small mt-4", tone === "dark" ? "text-white/45" : "text-muted-foreground/85")}>
          Send a photo on WhatsApp or call the clinic and we will tell you what your case is likely to involve,
          including whether it needs more than one visit.
        </p>
        <p
          className={cn(
            "mt-5 border-t pt-4 text-xs leading-5",
            tone === "dark" ? "border-white/10 text-white/40" : "border-border text-muted-foreground/80",
          )}
        >
          {costNote}
        </p>
      </div>
    );
  }

  const rows = limit ? priced.slice(0, limit) : priced;
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
            </span>
          </li>
        ))}
      </ul>

      {/* Finance is a promise, and no part of it is confirmed. Until it is,
          the site does not imply that EMI exists. */}
      {showContentGaps && (
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
      )}

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
