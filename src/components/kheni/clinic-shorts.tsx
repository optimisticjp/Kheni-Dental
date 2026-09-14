"use client";

import { ArrowUpRight, Play } from "lucide-react";
import { useState } from "react";

import { YoutubeIcon } from "@/components/icons/youtube-icon";
import { clinicVideos, embedUrl, posterFallbackUrl, posterUrl, watchUrl, youtubeChannelUrl, type ClinicVideo } from "@/content/videos";
import { pushTrackingEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

/**
 * Two minutes with a dentist: real videos from the clinic's YouTube channel.
 *
 * Poster first. Each card is YouTube's own thumbnail with a play control;
 * the player (privacy-enhanced domain) is only created after a tap, and
 * only one plays at a time. Shorts are 9:16, longer videos 16:9, and a
 * rail can hold both.
 */
function VideoCard({ video, playing, onPlay, tone }: { video: ClinicVideo; playing: boolean; onPlay: () => void; tone: "dark" | "light" }) {
  const kindLabel = video.kind === "patient" ? "Patient" : video.kind === "education" ? "Dentist tip" : "Clinic";
  const short = video.format === "short";
  return (
    <article className={cn("relative shrink-0 overflow-hidden rounded-[1.25rem] bg-ink", short ? "w-[62vw] max-w-[16rem] sm:w-[36vw] lg:w-auto lg:max-w-none" : "w-[84vw] max-w-[26rem] sm:w-[56vw] lg:w-auto lg:max-w-none", playing && "ring-[3px] ring-butter")} style={{ aspectRatio: short ? "9 / 16" : "16 / 9" }}>
      {playing ? (
        <iframe src={embedUrl(video.id)} title={video.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="absolute inset-0 size-full border-0" />
      ) : (
        <button type="button" onClick={onPlay} aria-label={`Play video: ${video.title}`} className="group absolute inset-0 block text-left focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-butter">
          <picture>
            <source srcSet={posterUrl(video)} />
            <img src={posterFallbackUrl(video)} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          </picture>
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-ink/5" />
          <span aria-hidden="true" className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[.66rem] font-bold uppercase tracking-[.1em] text-ink">
            <YoutubeIcon className="size-3" />
            {kindLabel}
          </span>
          <span aria-hidden="true" className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-[0_10px_30px_rgba(11,22,51,.45)] transition-transform duration-300 group-hover:scale-105">
            <Play className="ml-0.5 size-6 fill-current" />
          </span>
          <span className="absolute inset-x-0 bottom-0 p-4">
            <span className="line-clamp-2 block font-display text-[1.05rem] font-extrabold leading-tight tracking-[-.02em] text-white">{video.title}</span>
            <span className={cn("mt-1 block text-xs text-white/75")}>{video.language}{short ? " · Short" : ""}</span>
          </span>
        </button>
      )}
      <span className="sr-only">{tone}</span>
    </article>
  );
}

export function ClinicShorts({ limit = 6, kind, format, className, videos: given, tone = "light", placement = "clinic_shorts", columns = 6 }: { limit?: number; kind?: ClinicVideo["kind"]; format?: ClinicVideo["format"]; className?: string; videos?: ClinicVideo[]; tone?: "dark" | "light"; placement?: string; columns?: 3 | 4 | 6 }) {
  const [playing, setPlaying] = useState<string | null>(null);
  const videos = (given ?? clinicVideos.filter((v) => (kind ? v.kind === kind : true)).filter((v) => (format ? v.format === format : true))).slice(0, limit);
  if (videos.length === 0) return null;

  const play = (id: string) => {
    setPlaying(id);
    pushTrackingEvent({ event: "video_play", placement });
  };
  const current = videos.find((v) => v.id === playing);
  const grid = columns === 3 ? "lg:grid-cols-3" : columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-6";

  return (
    <div className={className}>
      <div className="-mx-4 sm:-mx-6 lg:mx-0">
        <div className={cn("rail px-4 sm:px-6 lg:grid lg:gap-4 lg:overflow-visible lg:px-0", grid)}>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} playing={playing === video.id} onPlay={() => play(video.id)} tone={tone} />
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className={cn("t-small", tone === "dark" ? "text-white/70" : "text-ink-soft")}>Videos play here after a tap, from the clinic&rsquo;s own YouTube channel.</p>
        <a href={current ? watchUrl(current) : youtubeChannelUrl} target="_blank" rel="noreferrer" className={cn("inline-flex min-h-10 items-center gap-1.5 text-sm font-bold", tone === "dark" ? "text-butter" : "text-blue-deep")}>
          {current ? "Open on YouTube" : "All videos on YouTube"}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
