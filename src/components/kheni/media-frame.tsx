import { KheniMonogram } from "@/components/kheni/brand-mark";
import { cn } from "@/lib/utils";

/**
 * A photograph slot that looks finished before the photograph exists.
 *
 * With `src`, it renders the image, art-directed by `ratio`, `shape` and
 * `objectPosition`. Without one, it renders a colour field in the
 * surrounding mood with the monogram, and never a "photo needed" note.
 *
 * `shape` is where the Kheni motif lives: "smile" is the flat-top,
 * round-bottom window used for people; "arch" its mirror; "rounded" a
 * plain 28px frame for objects and interiors.
 */
export function photoSrcSet(src?: string) {
  if (!src || !src.endsWith(".jpg")) return undefined;
  const stem = src.slice(0, -4);
  // Instagram posters are saved at 540px with one 360px variant beside them
  // (see src/content/instagram.ts); the clinic photographs get 640 and 1024.
  if (src.includes("/images/instagram/")) return `${stem}-360w.jpg 360w, ${src} 540w`;
  return `${stem}-640w.jpg 640w, ${stem}-1024w.jpg 1024w, ${src} 1536w`;
}

const SHAPE = {
  rounded: "rounded-[1.75rem]",
  smile: "smile",
  "smile-lg": "smile-lg",
  arch: "arch",
  none: "",
} as const;

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
  shape = "rounded",
  reveal = false,
}: {
  src?: string;
  alt?: string;
  ratio?: string;
  mobileRatio?: string;
  objectPosition?: string;
  className?: string;
  children?: React.ReactNode;
  priority?: boolean;
  from?: "sm" | "lg";
  sizes?: string;
  shape?: keyof typeof SHAPE;
  /** Play the smile-window reveal once on load. Hero only. */
  reveal?: boolean;
}) {
  const style = { ["--ratio" as string]: ratio, ["--ratio-m" as string]: mobileRatio ?? ratio } as React.CSSProperties;

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-m-tint [aspect-ratio:var(--ratio-m)]",
        from === "sm" ? "sm:[aspect-ratio:var(--ratio)]" : "lg:[aspect-ratio:var(--ratio)]",
        SHAPE[shape],
        reveal && "reveal-smile",
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
        <div className="absolute inset-0 bg-m-fill">
          <div aria-hidden="true" className="absolute -right-10 -top-10 size-40 rounded-full bg-white/25" />
          <div aria-hidden="true" className="absolute -bottom-12 -left-8 size-44 rounded-full bg-ink/10" />
          <KheniMonogram className="absolute bottom-5 left-5 size-10" tone="butter" />
        </div>
      )}
    </div>
  );
}
