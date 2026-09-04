"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { ConcernGlyph } from "@/components/kheni/art/treatment-art";
import { demoProblemPanels, type DemoPanel } from "@/content/demo";
import { pushTrackingEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

/**
 * The horizontal expanding accordion, fourteen panels.
 *
 * Desktop is the familiar version: collapsed panels are vertical spines,
 * the open one takes the remaining width. Below `lg` the same fourteen
 * panels run as a horizontal rail of expanding cards, which is the phone
 * behaviour the reference sites ship and the one the clinic asked to see.
 *
 * Two things keep it usable rather than merely impressive: every panel is a
 * real button with `aria-expanded`, so a keyboard walks it left to right and
 * a screen reader is told what opened; and the open panel's link is a normal
 * anchor, so the panel is not a dead end.
 */
const GLYPH_BY_ID: Record<string, string> = {
  pain: "pain", gap: "gap", crooked: "crooked", smile: "smile", child: "child",
  gums: "gums", wisdom: "wisdom", broken: "broken", denture: "gap", stain: "smile",
  "bad-breath": "gums", grinding: "broken", checkup: "checkup", nri: "checkup",
};

function Panel({ panel, open, onOpen }: { panel: DemoPanel; open: boolean; onOpen: () => void }) {
  return (
    <div
      className={cn(
        "hacc-panel", `hue-${panel.hue}`,
        open ? "hacc-open bg-h-tint" : "bg-white hover:bg-h-tint/60",
      )}
      data-open={open || undefined}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-expanded={open}
        className="hacc-spine focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-h-fill"
      >
        <span className="hacc-spine-inner">
          <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full bg-h-fill text-h-on-fill lg:size-8">
            <ConcernGlyph icon={GLYPH_BY_ID[panel.id] ?? "checkup"} className="size-4" />
          </span>
          <span className="hacc-label">{panel.label}</span>
        </span>
      </button>

      <div className="hacc-body" hidden={!open}>
        <div className="hacc-body-inner">
          <p className="t-eyebrow text-h-text">{panel.stat}</p>
          <p className="t-card mt-2 leading-snug">{panel.heading}</p>
          <p className="t-small mt-2.5 text-ink-soft">{panel.copy}</p>
          <Link
            href={panel.href}
            data-track="treatment_view"
            data-placement="horizontal_accordion"
            className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-h-text"
          >
            What we do about it
            <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function HorizontalAccordion({ panels = demoProblemPanels, className }: { panels?: DemoPanel[]; className?: string }) {
  const [openId, setOpenId] = useState(panels[0]?.id);

  const open = (panel: DemoPanel) => {
    setOpenId(panel.id);
    pushTrackingEvent({ event: "concern_interaction", placement: "horizontal_accordion", interaction: panel.id });
  };

  return (
    <div className={cn("edge-fade -mx-4 min-w-0 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:[mask-image:none]", className)}>
      <div className="hacc rail-snap" role="group" aria-label="Problems we treat">
        {panels.map((panel) => (
          <Panel key={panel.id} panel={panel} open={openId === panel.id} onOpen={() => open(panel)} />
        ))}
      </div>
    </div>
  );
}
