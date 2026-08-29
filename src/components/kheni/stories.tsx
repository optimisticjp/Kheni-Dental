import { Play, Quote } from "lucide-react";

import { MediaFrame, PendingTag, gapBorder } from "@/components/kheni/pending";
import {
  PENDING_STORY_TILES,
  PENDING_VIDEO_TILES,
  patientStories,
  videoLanguagePlan,
  videoStories,
} from "@/content/patient-stories";
import { cn } from "@/lib/utils";

/**
 * Patient testimonials from the clinic, which are separate from Google
 * reviews. While none are on file the grid renders finished quote cards with
 * the content marked as pending, so the layout is already proven.
 */
export function PatientStoryGrid({ tone = "light" }: { tone?: "dark" | "light" }) {
  if (patientStories.length > 0) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {patientStories.map((story) => (
          <figure
            key={story.id}
            className={cn(
              "flex h-full flex-col rounded-2xl border p-6",
              tone === "dark" ? "border-white/10 bg-white/[.04] text-white" : "border-border bg-card",
            )}
          >
            <Quote className="size-5 text-gold" aria-hidden="true" />
            <blockquote className="mt-4 flex-1 text-sm leading-7">{story.quote}</blockquote>
            <figcaption className="mt-5 border-t border-border/60 pt-4 text-sm">
              <span className="font-semibold">{story.name}</span>
              <span className={cn("block text-xs", tone === "dark" ? "text-white/45" : "text-muted-foreground")}>
                {story.treatment}
                {story.city ? ` · ${story.city}` : ""}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Array.from({ length: PENDING_STORY_TILES }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "flex min-h-52 flex-col rounded-2xl border p-6", gapBorder,
            tone === "dark" ? "border-white/12" : "border-border",
          )}
        >
          <Quote className="size-5 text-gold/50" aria-hidden="true" />
          <div className="mt-4 flex-1 space-y-2.5" aria-hidden="true">
            <span className={cn("block h-2 w-full rounded-full", tone === "dark" ? "bg-white/8" : "bg-foreground/6")} />
            <span className={cn("block h-2 w-11/12 rounded-full", tone === "dark" ? "bg-white/8" : "bg-foreground/6")} />
            <span className={cn("block h-2 w-8/12 rounded-full", tone === "dark" ? "bg-white/8" : "bg-foreground/6")} />
          </div>
          <PendingTag className="mt-5 self-start" label="Patient quote needed" />
        </div>
      ))}
    </div>
  );
}

/**
 * Video testimonials. Never autoplayed: a thumbnail with a play control that
 * opens the video, which also keeps the page light.
 */
export function VideoStoryGrid({ tone = "dark" }: { tone?: "dark" | "light" }) {
  if (videoStories.length > 0) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videoStories.map((video) => (
          <a
            key={video.id}
            href={video.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-white/10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={video.thumbnail} alt="" className="aspect-video w-full object-cover" loading="lazy" />
            <span className="absolute inset-0 grid place-items-center bg-ink/35">
              <span className="grid size-12 place-items-center rounded-full bg-gold text-ink">
                <Play className="size-5 fill-current" aria-hidden="true" />
              </span>
            </span>
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 text-left">
              <span className="block text-sm font-semibold text-white">{video.patientName}</span>
              <span className="block text-xs text-white/60">
                {video.treatment} · {video.language}
                {video.duration ? ` · ${video.duration}` : ""}
              </span>
            </span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: PENDING_VIDEO_TILES }).map((_, index) => (
        <div key={index} className="relative">
          <MediaFrame
            shot={`Patient video in ${videoLanguagePlan[index % videoLanguagePlan.length]}`}
            kind="video"
            tone={tone}
            ratio="16 / 9"
          />
        </div>
      ))}
    </div>
  );
}
