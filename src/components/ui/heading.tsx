import { cn } from "@/lib/utils";

type HeadingElement = "h1" | "h2" | "h3" | "h4";

type HeadingProps = React.ComponentProps<"h2"> & {
  /** Semantic tag to render. Defaults to `h2`. */
  as?: HeadingElement;
  /** Visual size preset, decoupled from the semantic level. Defaults to `h2`. */
  size?: "h1" | "h2" | "h3" | "h4";
};

const sizeMap: Record<NonNullable<HeadingProps["size"]>, string> = {
  // Fluid, mobile-first type. Balanced wrapping avoids awkward orphans.
  h1: "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance",
  h2: "text-3xl sm:text-4xl font-semibold tracking-tight text-balance",
  h3: "text-xl sm:text-2xl font-semibold tracking-tight",
  h4: "text-lg font-semibold tracking-tight",
};

/**
 * Heading with semantic level (`as`) decoupled from visual size (`size`).
 * Server Component. Lets you keep a correct document outline while choosing
 * the look independently.
 */
export function Heading({
  as: Tag = "h2",
  size,
  className,
  ...props
}: HeadingProps) {
  const resolvedSize = size ?? (Tag as NonNullable<HeadingProps["size"]>);
  return (
    <Tag
      className={cn("text-foreground", sizeMap[resolvedSize], className)}
      {...props}
    />
  );
}
