"use client";

import { useEffect } from "react";
import { pushTrackingEvent, type TrackingEventName } from "@/lib/tracking";

export function TrackLinks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const tracked = target?.closest<HTMLElement>("[data-track]");
      if (!tracked) return;
      const eventName = tracked.dataset.track as TrackingEventName | undefined;
      if (!eventName) return;
      pushTrackingEvent({
        event: eventName,
        placement: tracked.dataset.placement || "unspecified",
        interaction: tracked.dataset.interaction || "click",
        branch: tracked.dataset.branch,
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
