import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  /** Vertical rhythm. Defaults to `md`. */
  spacing?: "none" | "sm" | "md" | "lg";
};

const spacingMap: Record<NonNullable<SectionProps["spacing"]>, string> = {
  none: "",
  sm: "py-10 sm:py-12",
  md: "py-16 sm:py-20 lg:py-24",
  lg: "py-20 sm:py-28 lg:py-32",
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
