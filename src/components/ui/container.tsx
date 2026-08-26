import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div"> & {
  /** Max width of the content column. Defaults to `6xl` (72rem). */
  width?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl" | "7xl" | "full";
};

const widthMap: Record<NonNullable<ContainerProps["width"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

/**
 * Responsive, centered content container with fluid horizontal padding.
 * Server Component. The padding scale (16px -> 24px -> 32px) keeps content
 * comfortably inset at 360px while widening on larger screens.
 */
export function Container({
  className,
  width = "6xl",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        widthMap[width],
        className,
      )}
      {...props}
    />
  );
}
