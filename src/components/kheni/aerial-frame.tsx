"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { Location } from "@/content/site";
import { aerialEmbedSrc, placeUrl } from "@/lib/maps";

/**
 * The aerial photograph over a branch, and the one thing it is allowed to do.
 *
 * WHY THIS MEASURES ITSELF
 * Bing's embed takes its map size from the `w` and `h` it is given, not from
 * the iframe it lands in. Hand it the wrong numbers and it draws the map at
 * the size it was told and leaves the rest of the frame white — verified in a
 * real browser at 596x334 with a 356x270 request. The card is fluid, so the
 * only honest source for those numbers is the rendered frame itself. Hence a
 * client component: this is measurement, not decoration.
 *
 * WHY IT DOES NOT PAN
 * The marker is ours, drawn in the DOM at the centre of the frame, because
 * Bing's embed ignores a pushpin parameter (`sp=point.lat_lng_Title` was
 * tested and dropped) and only sometimes carries the clinic in its own label
 * layer. A DOM marker is only truthful while the map underneath it cannot
 * move, so the imagery is deliberately inert: no drag, no wheel zoom, no
 * keyboard pan. It is a photograph of a place, and the whole of it is a link
 * to that place on Google.
 *
 * WHERE OUR CHROME SITS
 * Top left, and only top left. Bing puts its zoom control top right and its
 * scale bar and copyright along the bottom; the first draft placed the
 * open-in-Google chip bottom left and it ran straight into "© Maxar, ©
 * Microsoft Corporation". The provider's attribution has the whole bottom
 * strip to itself.
 *
 * WHAT HAPPENS WHEN BING DOES NOT LOAD
 * `children` is the branch's exact-location panel, server-rendered underneath
 * and always present. The photograph starts transparent and only fades in
 * once the frame reports `load`. Blocked, offline, or rendered without
 * JavaScript, the patient keeps a real panel with the address, the rating and
 * a way through to the listing — never an empty grey box and never a map
 * pointing somewhere approximate. The marker and the chip are held back by
 * the same flag, so they never end up floating over that panel's text.
 */
export function AerialFrame({
  location,
  className,
  children,
}: {
  location: Location;
  className?: string;
  children: React.ReactNode;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;

    // The exact rendered size, not a snapped approximation. Asking for less
    // than the frame leaves a white sliver down one edge; asking for more
    // pushes the map's centre off the frame's centre, and the marker is drawn
    // at the frame's centre. Either way the pin stops telling the truth, so
    // the debounce below is what keeps this from thrashing, not rounding.
    let timer: ReturnType<typeof setTimeout>;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const next = { w: Math.round(rect.width), h: Math.round(rect.height) };
      setSize((prev) => (prev && prev.w === next.w && prev.h === next.h ? prev : next));
    };

    measure();
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(measure, 250);
    });
    observer.observe(el);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={frame} className={className}>
      {/*
        The panel is the frame's resting state, not a spinner: while the
        photograph is on its way a patient reads the address rather than
        watching a grey box. Once Bing reports a page it fades out, so the
        tiles paint onto the frame's own surface instead of over type.
      */}
      <div
        className={`ease-kheni absolute inset-0 z-0 transition-opacity duration-500 ${
          shown ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>

      {size && (
        <iframe
          key={`${size.w}x${size.h}`}
          src={aerialEmbedSrc(location, size.w, size.h)}
          title=""
          aria-hidden="true"
          tabIndex={-1}
          loading="lazy"
          scrolling="no"
          onLoad={() => setShown(true)}
          className={`ease-kheni pointer-events-none absolute inset-0 z-10 size-full border-0 transition-opacity duration-500 ${
            shown ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/*
        Ours, above the photograph. None of it takes the pointer, and none of
        it appears until the photograph has actually arrived — a marker
        reading "K" floating over the fallback panel's address would be
        pointing at a paragraph rather than at a building.
      */}
      {shown && (
        <>
          <span
            aria-hidden="true"
            className="ease-kheni pointer-events-none absolute inset-0 z-20 bg-ink/0 transition-colors duration-300 group-hover/map:bg-ink/25"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-gold bg-ink font-serif text-base text-gold shadow-[0_3px_12px_rgba(0,0,0,.6)] ring-1 ring-white/45"
          >
            K
          </span>
          <span
            aria-hidden="true"
            className="ease-kheni pointer-events-none absolute left-2 top-2 z-20 inline-flex items-center gap-1 rounded-full bg-ink/70 px-2.5 py-1 text-[.68rem] font-semibold text-white transition-colors duration-300 group-hover/map:bg-ink/90"
          >
            Open in Google Maps
            <ArrowUpRight className="size-3 text-gold" />
          </span>
        </>
      )}

      {/* The only interactive thing in the frame. */}
      <a
        href={placeUrl(location)}
        target="_blank"
        rel="noreferrer"
        data-track="review_click"
        data-placement={`aerial_map_${location.slug}`}
        data-branch={location.slug}
        className="absolute inset-0 z-30 rounded-[inherit] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <span className="sr-only">
          {`Open ${location.shortName}, ${location.areaLabel} on Google Maps`}
        </span>
      </a>
    </div>
  );
}
