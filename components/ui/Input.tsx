import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, id, ...props }, ref) => {
    const safeId = id || `input-${React.useId().replace(/:/g, "")}`;
    const errorId = `${safeId}-error`;

    return (
      <div className="flex w-full flex-col gap-1.5">
        <input
          id={safeId}
          type={type}
          className={cn(
            "flex w-full bg-white px-[10px] py-[12px] text-body-base transition-colors",
            "border border-text-form focus:outline-none focus:ring-2 focus:ring-primary/20",
            // Use card radius as per globals.css token
            "rounded-[var(--radius-card)]",
            // Error state
            error && "border-primary",
            className
          )}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
        {error && (
          <span
            id={errorId}
            className="text-micro font-semibold text-primary animate-in fade-in slide-in-from-top-1"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
