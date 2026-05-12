import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-sm font-medium font-montserrat transition-colors focus:outline-none focus:ring-2 focus:ring-lilac focus:ring-offset-2 focus:ring-offset-obsidian disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-lilac text-obsidian hover:bg-lilac-light": variant === "primary",
            "bg-white/10 text-white hover:bg-white/20": variant === "secondary",
            "border border-white/20 text-white hover:bg-white/10": variant === "outline",
            "text-white hover:bg-white/10": variant === "ghost",
          },
          "h-10 py-2 px-4",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
