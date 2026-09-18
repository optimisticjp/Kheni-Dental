"use client";

import { ArrowUpRight, Play } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { clinicVideos, embedUrl, posterCandidates, watchUrl, youtubeChannelUrl, type ClinicVideo } from "@/content/videos";
import { pushTrackingEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

/**
 * From the clinic's YouTube channel: education and longer patient stories.
 *
 * Poster first. Each card is YouTube's own thumbnail with a play control;
 * the player (privacy-enhanced domain) is only created after a tap, and
 * only one plays at a time. No iframes at page load, no autoplay.
 *
 * Instagram carries the living clinic (Reels). YouTube carries what needs
 * two minutes: a dentist explaining something, a patient telling a story.
 */
function VideoCard({ video, playing, onPlay, tone, uniform }: { video: ClinicVideo; playing: boolean; onPlay: () => void; tone: "light" | "dark"; uniform?: boolean }) {
  const kindLabel = video.kind === "patient" ? "Patient story" : video.kind === "education" ? "Dentist explains" : "Clinic";
  const wide = video.format === "video" && !uniform;
  /**
   * Step down the poster list as each candidate fails to load.
   *
   * Two things have to be caught, and only one of them is an event.
   *
   * These pages are prerendered, so the HTML ships with the first candidate
   * already in `src`. The browser starts fetching it immediately and can have
   * the 404 back long before React hydrates, which means the `error` event
   * fires with no handler attached and is gone. React then hydrates, writes
   * the same `src`, the browser does not re-request, and the card sits on a
   * broken image forever. That is why the ref below checks the image's state
   * the moment React gets hold of it: `complete` with a zero `naturalWidth`
   * is an image that already failed.
   *
   * `onError` covers the other half, the candidates that fail after hydration.
   *
   * Advancing is by index rather than by increment so it is idempotent. The
   * same failure reported twice lands on the same step, which matters because
   * a ref can be attached more than once.
   */
  // Memoised so the ref callback below keeps a stable identity. Without it
  // React would detach and reattach the ref on every render.
  const posters = useMemo(() => posterCandidates(video), [video]);
  const [posterStep, setPosterStep] = useState(0);
  const poster = posters[Math.min(posterStep, posters.length - 1)];
  const failed = useCallback(
    (src: string) => setPosterStep((step) => {
      const i = posters.indexOf(src);
      return i < 0 ? step : Math.max(step, i + 1);
    }),
    [posters],
  );
  const checkAlreadyFailed = useCallback(
    (node: HTMLImageElement | null) => {
      if (node && node.complete && node.naturalWidth === 0) failed(node.src);
    },
    [failed],
  );
  return (
    <article
      className={cn(
        "relative shrink-0 overflow-hidden rounded-[1.25rem] border bg-ink-2",
        tone === "dark" ? "border-ivory/10" : "border-ink/80",
        wide ? "w-[82vw] sm:w-[54vw] md:w-auto" : uniform ? "w-[66vw] sm:w-[40vw] md:w-auto" : "w-[58vw] sm:w-[36vw] md:w-auto",
        playing && "ring-2 ring-gold",
      )}
      style={{ aspectRatio: wide ? "16 / 9" : uniform ? "4 / 5" : "9 / 16" }}
    >
      {playing ? (
        <iframe
          src={embedUrl(video.id)}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={onPlay}
          aria-label={`Play video: ${video.title}`}
          className="group absolute inset-0 block text-left focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-gold"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- images are unoptimized site-wide */}
          <img
            ref={checkAlreadyFailed}
            src={poster}
            onError={(e) => failed(e.currentTarget.src)}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-kheni group-hover:scale-[1.03]"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/10" />
          <span aria-hidden="true" className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[.62rem] font-semibold uppercase tracking-[.14em] text-gold backdrop-blur-sm">
            {kindLabel}
          </span>
          <span aria-hidden="true" className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ivory/60 bg-ink/40 text-ivory backdrop-blur-sm transition-[transform,background-color,color] duration-300 group-hover:scale-105 group-hover:bg-gold group-hover:text-ink">
            <Play className="ml-0.5 size-5 fill-current" />
          </span>
          <span className="absolute inset-x-0 bottom-0 p-3.5">
            <span className="line-clamp-2 block font-serif text-[1rem] leading-snug text-ivory">{video.title}</span>
            <span className="mt-1 block text-[.72rem] text-ivory/65">{video.language} · YouTube</span>
          </span>
        </button>
      )}
    </article>
  );
}

export function ClinicShorts({
  limit = 6,
  kind,
  format,
  className,
  tone = "light",
  videos: override,
  columns = 6,
  uniform = false,
}: {
  limit?: number;
  kind?: ClinicVideo["kind"];
  format?: ClinicVideo["format"];
  className?: string;
  tone?: "light" | "dark";
  videos?: ClinicVideo[];
  columns?: 2 | 3 | 4 | 6;
  /** Force every card to the same 4:5 frame, for a mixed pair of a Short and a video. */
  uniform?: boolean;
}) {
  const [playing, setPlaying] = useState<string | null>(null);
  const videos = (override ?? clinicVideos)
    .filter((v) => (kind ? v.kind === kind : true))
    .filter((v) => (format ? v.format === format : true))
    .slice(0, limit);
  if (videos.length === 0) return null;
  const current = videos.find((v) => v.id === playing);

  const play = (id: string) => {
    setPlaying(id);
    pushTrackingEvent({ event: "video_play", placement: "clinic_shorts" });
  };

  return (
    <div className={className}>
      <div className="edge-fade -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:[mask-image:none]">
        <div className={cn("rail-snap flex gap-3 overflow-x-auto pb-2 md:grid md:overflow-visible lg:gap-4", columns === 6 && "md:grid-cols-3 lg:grid-cols-6", columns === 4 && "md:grid-cols-2 lg:grid-cols-4", columns === 3 && "md:grid-cols-3", columns === 2 && "md:grid-cols-2")}>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} tone={tone} uniform={uniform} playing={playing === video.id} onPlay={() => play(video.id)} />
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className={cn("t-small", tone === "dark" ? "text-ivory/65" : "text-ink-soft")}>Videos play here after a tap, from the clinic&rsquo;s YouTube channel.</p>
        <a
          href={current ? watchUrl(current) : youtubeChannelUrl}
          target="_blank"
          rel="noreferrer"
          className={cn("inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold", tone === "dark" ? "text-gold" : "text-gold-text")}
        >
          {current ? "Open on YouTube" : "All videos on YouTube"}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
