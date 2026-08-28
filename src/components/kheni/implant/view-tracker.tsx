"use client";

import { useEffect, useRef } from "react";
import { pushTrackingEvent, type TrackingEventName } from "@/lib/tracking";

/**
 * Fires a single non-sensitive "this section was actually seen" event.
 *
 * Renders nothing and observes its own marker element, so it adds no layout and
 * no wrapper around the content it measures. The observer disconnects after the
 * first hit, so the event cannot fire twice in a session.
 *
 * Only ever used for section-level engagement. Never send anything here that
 * describes a visitor's mouth, symptoms or choices.
 */
export function ViewTracker({
  event,
  placement,
}: {
  event: TrackingEventName;
  placement: string;
}) {
  const marker = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const node = marker.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          pushTrackingEvent({ event, placement, interaction: "view" });
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [event, placement]);

  return <span ref={marker} aria-hidden="true" className="block h-px w-full" />;
}
