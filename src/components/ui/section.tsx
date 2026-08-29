import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  /** Vertical rhythm. Defaults to `md`. */
  spacing?: "none" | "sm" | "md" | "lg";
};

/**
 * Mobile-first vertical rhythm.
 *
 * The old scale started at the desktop value and only grew: `lg` gave a phone
 * 80px of padding top and bottom before a single word, and stacked with
 * heading and card margins underneath it. Around nine in ten patients here are
 * on a phone, so the scale now starts from what a phone should have and opens
 * up as the canvas does.
 *
 *          phone   tablet   desktop
 *   sm       32       40        48
 *   md       44       56        80
 *   lg       56       72       104
 */
const spacingMap: Record<NonNullable<SectionProps["spacing"]>, string> = {
  none: "",
  sm: "py-8 sm:py-10 lg:py-12",
  md: "py-11 sm:py-14 lg:py-20",
  lg: "py-14 sm:py-18 lg:py-26",
};

/**
 * Full-width section wrapper providing consistent vertical spacing between
 * page sections. Server Component. Pair with `<Container>` inside for the
 * horizontal content column.
 */
export function Section({
  className,
  spacing = "md",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("w-full", spacingMap[spacing], className)}
      {...props}
    />
  );
}
