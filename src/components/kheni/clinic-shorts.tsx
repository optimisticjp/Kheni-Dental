"use client";

import { ArrowUpRight, Play } from "lucide-react";
import { useState } from "react";

import { clinicVideos, embedUrl, posterFallbackUrl, posterUrl, watchUrl, youtubeChannelUrl, type ClinicVideo } from "@/content/videos";
import { pushTrackingEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

/**
 * From the clinic: real Shorts from the clinic's own YouTube channel.
 *
 * Poster first. Each card is YouTube's own thumbnail at 9:16 with a play
 * control; the player (privacy-enhanced domain) is only created after a
 * tap, and only one plays at a time. No iframes at page load, no autoplay.
 *
 * On a phone the rail scroll-snaps. On desktop it is a grid.
 */
function VideoCard({ video, playing, onPlay }: { video: ClinicVideo; playing: boolean; onPlay: () => void }) {
  const kindLabel = video.kind === "patient" ? "Patient" : video.kind === "education" ? "Dentist tip" : "Clinic";
  return (
    <article className={cn("relative w-[62vw] shrink-0 overflow-hidden rounded-[1.25rem] bg-ink sm:w-[40vw] md:w-auto", playing && "ring-2 ring-sunshine")} style={{ aspectRatio: "9 / 16" }}>
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
          className="group absolute inset-0 block text-left focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-sunshine"
        >
          <picture>
            <source srcSet={posterUrl(video.id)} />
            { }
            <img src={posterFallbackUrl(video.id)} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-kheni group-hover:scale-[1.03]" />
          </picture>
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
          <span aria-hidden="true" className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[.68rem] font-bold uppercase tracking-[.1em] text-ink">
            {kindLabel}
          </span>
          <span aria-hidden="true" className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-[0_8px_24px_rgba(18,34,74,.4)] transition-transform duration-300 group-hover:scale-105">
            <Play className="ml-0.5 size-6 fill-current" />
          </span>
          <span className="absolute inset-x-0 bottom-0 p-3.5">
            <span className="line-clamp-2 block text-[.9375rem] font-semibold leading-snug text-white">{video.title}</span>
            <span className="mt-1 block text-xs text-white/70">{video.language} · Short</span>
          </span>
        </button>
      )}
    </article>
  );
}

export function ClinicShorts({ limit = 6, kind, className }: { limit?: number; kind?: ClinicVideo["kind"]; className?: string }) {
  const [playing, setPlaying] = useState<string | null>(null);
  const videos = (kind ? clinicVideos.filter((v) => v.kind === kind) : clinicVideos).slice(0, limit);
  if (videos.length === 0) return null;

  const play = (id: string) => {
    setPlaying(id);
    pushTrackingEvent({ event: "video_play", placement: "clinic_shorts" });
  };

  return (
    <div className={className}>
      <div className="edge-fade -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:[mask-image:none]">
        <div className="rail-snap flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6 lg:gap-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} playing={playing === video.id} onPlay={() => play(video.id)} />
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="t-small text-ink-soft">Videos play here after a tap, from the clinic&rsquo;s YouTube channel.</p>
        <a
          href={playing ? watchUrl(playing) : youtubeChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-cobalt-deep"
        >
          {playing ? "Open on YouTube" : "All videos on YouTube"}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
