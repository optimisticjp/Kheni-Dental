import { KheniMonogram } from "@/components/kheni/brand-mark";
import { cn } from "@/lib/utils";

/**
 * The responsive set for a photograph.
 *
 * `scripts/resize-images.mjs` writes a 640w and a 1024w variant beside every
 * source. Instagram posters are the exception: they are 540px frames with a
 * 360w variant beside them (see src/content/instagram.ts).
 */
export function photoSrcSet(src?: string) {
  if (!src || !src.endsWith(".jpg")) return undefined;
  const stem = src.slice(0, -4);
  if (src.startsWith("/images/instagram/")) return `${stem}-360w.jpg 360w, ${src} 540w`;
  return `${stem}-640w.jpg 640w, ${stem}-1024w.jpg 1024w, ${src} 1536w`;
}

/**
 * A photograph slot that looks finished before the photograph exists.
 *
 * With `src`, it renders the image, art-directed by `ratio` and
 * `objectPosition`. Without one, it renders a quiet designed field (sand
 * on light, ink on dark) with the monogram, and never a "photo needed"
 * note: those belong in docs/CLINIC-CONTENT-NEEDED.md, not in front of a
 * patient. `children` lets an illustration sit in the frame instead.
 */
export function MediaFrame({
  src,
  alt,
  ratio = "4 / 3",
  mobileRatio,
  objectPosition = "center",
  className,
  children,
  priority = false,
  from = "sm",
  sizes = "(min-width: 1024px) 640px, 100vw",
  tone = "light",
}: {
  src?: string;
  alt?: string;
  ratio?: string;
  /** A different crop below sm, e.g. "3 / 2" for a wide phone frame. */
  mobileRatio?: string;
  objectPosition?: string;
  className?: string;
  children?: React.ReactNode;
  priority?: boolean;
  /** The breakpoint at which `ratio` replaces `mobileRatio`. "md" switches on a tablet, "lg" keeps the wide crop until a laptop. */
  from?: "sm" | "md" | "lg";
  /** How wide the frame renders, so the browser can pick a variant. */
  sizes?: string;
  tone?: "light" | "dark";
}) {
  const style = {
    ["--ratio" as string]: ratio,
    ["--ratio-m" as string]: mobileRatio ?? ratio,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[1.25rem] [aspect-ratio:var(--ratio-m)]",
        tone === "dark" ? "bg-ink-2" : "bg-sand",
        from === "sm" ? "sm:[aspect-ratio:var(--ratio)]" : from === "md" ? "md:[aspect-ratio:var(--ratio)]" : "lg:[aspect-ratio:var(--ratio)]",
        className,
      )}
      style={style}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- images are unoptimized site-wide
        <img
          src={src}
          srcSet={photoSrcSet(src)}
          sizes={sizes}
          alt={alt ?? ""}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          className="absolute inset-0 size-full object-cover"
          style={{ objectPosition }}
        />
      ) : children ? (
        <div className="absolute inset-0">{children}</div>
      ) : (
        <div className={cn("absolute inset-0", tone === "dark" && "grain")}>
          <div aria-hidden="true" className={cn("absolute inset-0", tone === "dark" ? "bloom-gold-soft" : "dots opacity-60")} />
          <KheniMonogram tone={tone === "dark" ? "dark" : "light"} className="absolute bottom-4 left-4 size-9" />
        </div>
      )}
    </div>
  );
}
