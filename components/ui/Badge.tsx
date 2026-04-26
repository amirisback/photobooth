import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "outlined" | "filled";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "outlined", id, ...props }: BadgeProps) {
  const safeId = id || `badge-${variant}-${React.useId().replace(/:/g, "")}`;
  
  return (
    <div
      id={safeId}
      className={cn(
        variant === "outlined" ? "tag-outlined" : "tag-filled",
        className
      )}
      {...props}
    />
  );
}
