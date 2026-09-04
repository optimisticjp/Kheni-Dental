import { Info } from "lucide-react";

import { Container } from "@/components/ui/container";
import { demoNotice } from "@/content/demo";

/**
 * One line, once, at the foot of every page while the demo layer is live.
 *
 * It is deliberately quiet rather than a banner across the top: the point of
 * this build is to judge how the marketing patterns look, and a red bar
 * above the hero would sit in every screenshot. It disappears with the demo
 * layer.
 */
export function DemoNotice() {
  return (
    <div className="border-t border-line bg-amber-tint/60 py-3">
      <Container width="7xl">
        <p className="flex items-start gap-2 text-[.75rem] leading-snug text-ink-soft">
          <Info className="mt-0.5 size-3.5 shrink-0 text-amber-text" aria-hidden="true" />
          {demoNotice}
        </p>
      </Container>
    </div>
  );
}
