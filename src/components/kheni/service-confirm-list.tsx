import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * A list of services split into what is confirmed and what is not.
 *
 * Built for the NRI page, where the clinic left every service on form p55
 * unticked. The honest options were to delete the section or to show it with
 * the truth attached, and deleting it would leave the clinic nothing to react
 * to. So confirmed items read as ordinary service cards, and unconfirmed ones
 * are visibly held back: a dashed edge, a quieter surface, and a small
 * champagne label.
 *
 * The distinction has to survive at a glance and in greyscale, so it is
 * carried by border style and weight as well as by colour. A reader skimming
 * on a phone should never mistake the second group for an offer.
 */

export type ConfirmItem = {
  id: string;
  label: string;
  copy: string;
};

function ConfirmedCard({ item }: { item: ConfirmItem }) {
  return (
    <li className="flex gap-3 rounded-2xl border border-line bg-white p-4 sm:p-5">
      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-rose-strong text-ink">
        <Check className="size-3.5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="t-card">{item.label}</p>
        <p className="t-small mt-1 text-ink-soft">{item.copy}</p>
      </div>
    </li>
  );
}

function AwaitingCard({ item }: { item: ConfirmItem }) {
  return (
    <li className="rounded-2xl border border-dashed border-champagne-soft bg-champagne-tint/60 p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <p className="t-card text-ink-soft">{item.label}</p>
        <span className="rounded-full border border-champagne-soft px-2 py-0.5 text-[.625rem] font-semibold uppercase tracking-[.08em] text-champagne-text">
          To confirm
        </span>
      </div>
      <p className="t-small mt-1 text-ink-soft">{item.copy}</p>
    </li>
  );
}

export function ServiceConfirmList({
  confirmed,
  awaiting,
  confirmedTitle = "Confirmed by the clinic",
  awaitingTitle = "Not confirmed yet",
  awaitingNote,
  className,
}: {
  confirmed: ConfirmItem[];
  awaiting: ConfirmItem[];
  confirmedTitle?: string;
  awaitingTitle?: string;
  awaitingNote?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-6", className)}>
      {confirmed.length > 0 && (
        <div>
          <p className="t-eyebrow text-rose-text">{confirmedTitle}</p>
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {confirmed.map((item) => (
              <ConfirmedCard key={item.id} item={item} />
            ))}
          </ul>
        </div>
      )}

      {awaiting.length > 0 && (
        <div>
          <p className="t-eyebrow text-champagne-text">{awaitingTitle}</p>
          {awaitingNote && <p className="t-small mt-2 max-w-2xl text-ink-soft">{awaitingNote}</p>}
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {awaiting.map((item) => (
              <AwaitingCard key={item.id} item={item} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
