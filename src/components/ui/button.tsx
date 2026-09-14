import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "sm" | "default";

const variantClasses: Record<ButtonVariant, string> = {
  default: "btn-primary",
  outline: "btn-outline-light",
  ghost: "bg-transparent text-current hover:underline",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "btn-sm",
  default: "",
};

/** Class generator for the rare plain `<button>`; the site's links use `ctaClass`. */
export function buttonVariants({ variant = "default", size = "default", className }: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn("btn", variantClasses[variant], sizeClasses[size], className);
}

type ButtonProps = React.ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize };

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonVariants({ variant, size, className })} {...props} />;
}
