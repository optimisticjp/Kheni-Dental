import { KheniMonogram } from "@/components/kheni/brand-mark";
import { cn } from "@/lib/utils";

/**
 * A photograph slot that looks finished before the photograph exists.
 *
 * With `src`, it renders the image, art-directed by `ratio` and
 * `objectPosition`. Without one, it renders a designed colour field in the
 * surrounding hue with the monogram, and never a "photo needed" note: those
 * belong in docs/CLINIC-CONTENT-NEEDED.md, not in front of a patient.
 *
 * `children` lets a poster illustration sit in the frame instead, so a real
 * photograph replaces it later without any layout change.
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
  /** The breakpoint at which `ratio` replaces `mobileRatio`. Tablets keep the wide crop with "lg". */
  from?: "sm" | "lg";
}) {
  const style = {
    ["--ratio" as string]: ratio,
    ["--ratio-m" as string]: mobileRatio ?? ratio,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[1.25rem] bg-h-tint [aspect-ratio:var(--ratio-m)]",
        from === "sm" ? "sm:[aspect-ratio:var(--ratio)]" : "lg:[aspect-ratio:var(--ratio)]",
        className,
      )}
      style={style}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- images are unoptimized site-wide
        <img
          src={src}
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
        <div className="absolute inset-0">
          <div aria-hidden="true" className="absolute -right-10 -top-10 size-40 rounded-full bg-h-soft opacity-80" />
          <div aria-hidden="true" className="absolute -bottom-12 -left-8 size-44 rounded-full bg-h-fill opacity-20" />
          <KheniMonogram className="absolute bottom-4 left-4 size-9 opacity-90" />
        </div>
      )}
    </div>
  );
}
