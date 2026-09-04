import { Quote, Star } from "lucide-react";

import { demoRatingSummary, demoTestimonials, type DemoTestimonial } from "@/content/demo";
import { locations } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The testimonial wall.
 *
 * Names, cities, quotes and dates are invented. It is laid out as a masonry
 * column set on desktop and a scroll-snap rail on a phone, because a
 * sixteen-card vertical stack is 4,000px of scrolling nobody does.
 */
function Rating({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("size-3.5", i < value ? "fill-sunshine text-sunshine" : "fill-line text-line")} aria-hidden="true" />
      ))}
    </span>
  );
}

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

export function TestimonialCard({ story, className }: { story: DemoTestimonial; className?: string }) {
  const branch = locations.find((l) => l.slug === story.branchSlug);
  return (
    <figure className={cn(`hue-${story.hue} relative overflow-hidden rounded-[1.25rem] border border-line bg-white p-5`, className)}>
      <Quote aria-hidden="true" className="absolute -right-2 -top-2 size-16 text-h-tint" />
      <div className="relative flex items-center gap-3">
        <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-h-fill text-sm font-bold text-h-on-fill">{initials(story.name)}</span>
        <div className="min-w-0">
          <figcaption className="truncate text-sm font-semibold text-ink">{story.name}</figcaption>
          <p className="truncate text-[.75rem] text-ink-soft">{story.city}</p>
        </div>
      </div>
      <div className="mt-3">
        <Rating value={story.rating} />
      </div>
      <blockquote className="relative mt-2 text-[.9375rem] leading-relaxed text-ink">{story.quote}</blockquote>
      <div className="relative mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-3">
        <span className="rounded-full bg-h-tint px-2.5 py-1 text-[.72rem] font-semibold text-h-text">{story.treatment}</span>
        {branch && <span className="t-small text-ink-soft">{branch.displayArea}</span>}
        <span className="t-small ml-auto text-ink-soft/80">{story.date}</span>
      </div>
    </figure>
  );
}

/** The headline rating block: average, total and the star breakdown. */
export function RatingSummary({ className }: { className?: string }) {
  const { average, total, breakdown } = demoRatingSummary;
  return (
    <div className={cn("rounded-[1.25rem] border border-line bg-white p-5", className)}>
      <div className="flex items-center gap-4">
        <p className="font-serif text-[3rem] font-semibold leading-none text-ink">{average}</p>
        <div>
          <Rating value={5} />
          <p className="t-small mt-1.5 text-ink-soft">{total.toLocaleString("en-IN")} patient reviews</p>
        </div>
      </div>
      <ul className="mt-4 space-y-1.5">
        {breakdown.map((row) => (
          <li key={row.stars} className="flex items-center gap-2.5">
            <span className="w-3 text-[.75rem] tabular-nums text-ink-soft">{row.stars}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
              <span className="block h-full rounded-full bg-sunshine" style={{ width: `${(row.count / total) * 100}%` }} />
            </span>
            <span className="w-10 text-right text-[.75rem] tabular-nums text-ink-soft">{row.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TestimonialWall({ limit = 16, className }: { limit?: number; className?: string }) {
  const stories = demoTestimonials.slice(0, limit);
  return (
    // min-w-0: as a grid item this would otherwise size to the rail's full
    // content width and push the whole page sideways.
    <div className={cn("min-w-0", className)}>
      {/* Phone: a snap rail, so sixteen cards cost one thumb sweep rather than a scroll marathon. */}
      <div className="edge-fade -mx-4 px-4 sm:-mx-6 sm:px-6 lg:hidden">
        <div className="rail-snap flex gap-3 overflow-x-auto pb-2">
          {stories.map((story) => (
            <TestimonialCard key={story.id} story={story} className="w-[80vw] shrink-0 sm:w-[52vw]" />
          ))}
        </div>
      </div>
      {/* Desktop: three balanced columns. */}
      <div className="hidden gap-4 lg:block lg:columns-3 [&>figure]:mb-4 [&>figure]:break-inside-avoid">
        {stories.map((story) => (
          <TestimonialCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}
