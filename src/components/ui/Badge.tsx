import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {}

export const Badge = ({ className, children, ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-white/20 bg-white/5 px-2.5 py-0.5 text-xs font-semibold font-montserrat text-white/80 transition-colors uppercase tracking-wider",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
