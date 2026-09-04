"use client";

import { MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

import { demoQuoteTab } from "@/content/demo";
import { whatsappUrl } from "@/lib/links";
import { pushTrackingEvent } from "@/lib/tracking";

/**
 * The rotated side tab.
 *
 * Fixed to the right edge, vertical label, opens a small panel. It appears
 * only once the visitor has scrolled past the first screen, sits above the
 * mobile dock rather than on top of it, and can be dismissed for the
 * session. Escape closes it and focus returns to the tab.
 */
export function QuoteTab() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (dismissed) return null;

  return (
    <div className={`quote-tab ${shown ? "quote-tab-in" : ""}`} data-open={open || undefined}>
      {open && (
        <div role="dialog" aria-label={demoQuoteTab.title} className="quote-tab-panel rounded-2xl border border-line bg-white p-4 shadow-[0_18px_44px_-18px_rgba(18,34,74,.45)]">
          <div className="flex items-start justify-between gap-3">
            <p className="t-card">{demoQuoteTab.title}</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="grid size-8 shrink-0 place-items-center rounded-full text-ink-soft hover:bg-porcelain">
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
          <p className="t-small mt-2 text-ink-soft">{demoQuoteTab.copy}</p>
          <a
            href={whatsappUrl(demoQuoteTab.message)}
            target="_blank"
            rel="noreferrer"
            onClick={() => pushTrackingEvent({ event: "whatsapp_click", placement: "quote_tab" })}
            className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-4 text-[.9375rem] font-semibold text-white"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {demoQuoteTab.cta}
          </a>
          <button type="button" onClick={() => setDismissed(true)} className="mt-2 block w-full text-center text-[.75rem] text-ink-soft underline underline-offset-4">
            Do not show this again
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="quote-tab-handle bg-cobalt text-white"
      >
        {open ? "Close" : demoQuoteTab.label}
      </button>
    </div>
  );
}
