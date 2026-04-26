import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Signature Red Band Divider
 * Height: 80px (desktop) / 40px (mobile)
 */
export function RedBand({ className, id }: { className?: string; id?: string }) {
  const safeId = id || "red-band-divider";
  
  return (
    <div 
      id={safeId} 
      className={cn("red-band w-full", className)} 
      role="presentation"
    />
  );
}
