import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Brand Logo Component (Vodafone-inspired speech-mark)
 */
export function Logo({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <div 
      className={cn("relative flex items-center justify-center shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="20" fill="#E60000" />
        {/* Stylized speech mark approximation */}
        <path
          d="M23.5 15.5C21.5 15.5 20 17 20 19C20 21 21.5 22.5 23.5 22.5C25.5 22.5 27 21 27 19C27 17 25.5 15.5 23.5 15.5Z"
          fill="white"
        />
        <path
          d="M23.5 22.5C23.5 22.5 21.5 26.5 17.5 26.5C15.5 26.5 14.5 25 14.5 23C14.5 21 16 19 18 19"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
