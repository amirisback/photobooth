"use client";

import React from "react";
import { FRAME_OPTIONS } from "@/lib/booth-config";
import { cn } from "@/lib/utils";

interface FrameSelectionProps {
  activeFrameId: string;
  onSelectFrame: (id: string) => void;
  isDisabled?: boolean;
}

export const FrameSelection: React.FC<FrameSelectionProps> = ({
  activeFrameId,
  onSelectFrame,
  isDisabled = false,
}) => {
  return (
    <div className="w-full mt-4">
      <h4 className="text-label mb-3 text-text-headline">Frame</h4>
      <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
        {FRAME_OPTIONS.map((frame) => (
          <button
            key={frame.id}
            onClick={() => onSelectFrame(frame.id)}
            disabled={isDisabled}
            className={cn(
              "flex flex-col items-center gap-2 min-w-[72px] transition-transform",
              isDisabled && "opacity-50 cursor-not-allowed",
              !isDisabled && "hover:scale-105"
            )}
          >
            <div 
              className={cn(
                "w-16 h-24 rounded-lg border-2 overflow-hidden bg-surface-neutral/10 shadow-sm flex items-center justify-center relative",
                activeFrameId === frame.id ? "border-primary" : "border-transparent"
              )}
            >
              {frame.url ? (
                <div 
                  className="absolute inset-0 bg-no-repeat bg-center bg-contain"
                  style={{ backgroundImage: `url(${frame.url})` }}
                />
              ) : (
                <div className="w-8 h-8 border-2 border-dashed border-text-body/30 rounded" />
              )}
            </div>
            <span className={cn(
              "text-micro font-medium",
              activeFrameId === frame.id ? "text-primary" : "text-text-body"
            )}>
              {frame.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
