"use client";

import { Play, Quote } from "lucide-react";
import { useState } from "react";

import { demoVideoStories, type DemoVideoStory } from "@/content/demo";
import { embedUrl, posterFallbackUrl, posterUrl } from "@/content/videos";
import { pushTrackingEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

/**
 * The video testimonial wall.
 *
 * Poster first, same discipline as the real Shorts rail: no iframe exists
 * until a tap, and the player runs on the privacy-enhanced domain.
 *
 * The names, places, treatments and quotes are invented. The video ids are
 * real clips from the clinic's own channel, used only so a poster frame
 * loads; they are not testimonials from the people named on the cards.
 */
function Card({ story, playing, onPlay }: { story: DemoVideoStory; playing: boolean; onPlay: () => void }) {
  return (
    <article className={cn(`hue-${story.hue} overflow-hidden rounded-[1.25rem] border border-line bg-white`, playing && "ring-2 ring-h-fill")}>
      <div className="relative bg-ink" style={{ aspectRatio: "9 / 16" }}>
        {playing ? (
          <iframe src={embedUrl(story.youtubeId)} title={`${story.name}, ${story.treatment}`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="absolute inset-0 size-full border-0" />
        ) : (
          <button type="button" onClick={onPlay} aria-label={`Play ${story.name}'s story`} className="group absolute inset-0 block text-left focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-sunshine">
            <picture>
              <source srcSet={posterUrl(story.youtubeId)} />
              <img src={posterFallbackUrl(story.youtubeId)} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-kheni group-hover:scale-[1.03]" />
            </picture>
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
            <span aria-hidden="true" className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[.68rem] font-bold uppercase tracking-[.1em] text-ink">{story.language}</span>
            <span aria-hidden="true" className="absolute left-1/2 top-1/2 grid size-13 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-[0_8px_24px_rgba(18,34,74,.4)] transition-transform duration-300 group-hover:scale-105">
              <Play className="ml-0.5 size-5 fill-current" />
            </span>
            <span className="absolute inset-x-0 bottom-0 p-3.5">
              <Quote aria-hidden="true" className="size-4 text-white/60" />
              <span className="mt-1 line-clamp-2 block text-[.9375rem] font-semibold leading-snug text-white">{story.quote}</span>
            </span>
          </button>
        )}
      </div>
      <div className="p-3.5">
        <p className="text-sm font-semibold text-ink">{story.name}</p>
        <p className="t-small text-ink-soft">{story.place}</p>
        <p className="mt-2 inline-flex rounded-full bg-h-tint px-2.5 py-1 text-[.72rem] font-semibold text-h-text">{story.treatment}</p>
      </div>
    </article>
  );
}

export function VideoWall({ limit = 8, className }: { limit?: number; className?: string }) {
  const [playing, setPlaying] = useState<string | null>(null);
  const stories = demoVideoStories.slice(0, limit);

  const play = (id: string) => {
    setPlaying(id);
    pushTrackingEvent({ event: "video_play", placement: "video_testimonials" });
  };

  return (
    <div className={cn("min-w-0", className)}>
      <div className="edge-fade -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:[mask-image:none]">
        <div className="rail-snap flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-4 lg:gap-4">
          {stories.map((story) => (
            <Card key={story.id} story={story} playing={playing === story.id} onPlay={() => play(story.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}
