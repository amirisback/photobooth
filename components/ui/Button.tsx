"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// Define the variants based on globals.css
type ButtonVariant = 
  | "primary-rect" 
  | "primary-pill" 
  | "ghost-rect" 
  | "glass-pill" 
  | "content-ghost-pill" 
  | "icon";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary-rect", isLoading, children, id, ...props }, ref) => {
    // Ensure unique ID
    const safeId = id || `btn-${variant}-${React.useId().replace(/:/g, "")}`;

    // Map variant to class names defined in globals.css
    const variantClasses = {
      "primary-rect": "btn-primary-rect",
      "primary-pill": "btn-primary-pill",
      "ghost-rect": "btn-ghost-rect",
      "glass-pill": "btn-glass-pill",
      "content-ghost-pill": "btn-content-ghost-pill",
      "icon": "btn-icon",
    };

    return (
      <motion.button
        id={safeId}
        ref={ref}
        whileTap={{ opacity: 0.9 }}
        transition={{ duration: 0.1 }}
        className={cn(
          "relative overflow-hidden cursor-pointer",
          variantClasses[variant],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center bg-inherit">
            <svg 
              className="animate-spin h-5 w-5 text-current" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        )}
        <span className={cn("flex items-center gap-2", isLoading && "invisible")}>
          {children}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
