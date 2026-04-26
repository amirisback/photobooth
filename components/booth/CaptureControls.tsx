"use client";

import React from "react";
import { FlipHorizontal, RefreshCcw, Timer, Layers } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface CaptureControlsProps {
  isMirrored: boolean;
  onToggleMirror: () => void;
  onToggleCamera: () => void;
  onCapture: () => void;
  isCountdownActive: boolean;
  onToggleCountdown: () => void;
  isMultiShot: boolean;
  onToggleMultiShot: () => void;
  isDisabled?: boolean;
}

export const CaptureControls: React.FC<CaptureControlsProps> = ({
  isMirrored,
  onToggleMirror,
  onToggleCamera,
  onCapture,
  isCountdownActive,
  onToggleCountdown,
  isMultiShot,
  onToggleMultiShot,
  isDisabled = false,
}) => {
  return (
    <div className="mt-8 flex justify-center items-center gap-6">
      <div className="flex flex-col gap-4">
        <Button 
          variant="icon" 
          onClick={onToggleMirror}
          title="Toggle Mirror"
          aria-label="Toggle Mirror Camera"
          aria-pressed={isMirrored}
          disabled={isDisabled}
          className={cn(isMirrored && "bg-primary text-white border-primary")}
        >
          <FlipHorizontal className="w-5 h-5" />
        </Button>
        <Button 
          variant="icon" 
          onClick={onToggleCountdown}
          title="Toggle Timer"
          aria-label="Toggle Countdown Timer"
          aria-pressed={isCountdownActive}
          disabled={isDisabled}
          className={cn(isCountdownActive && "bg-primary text-white border-primary")}
        >
          <Timer className="w-5 h-5" />
        </Button>
      </div>

      <Button 
        variant="primary-pill" 
        onClick={onCapture}
        disabled={isDisabled}
        className="w-24 h-24 rounded-full flex items-center justify-center shadow-xl border-4 border-white transition-transform active:scale-95"
        title="Ambil Foto"
        aria-label="Ambil Foto"
      >
        <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white" />
        </div>
      </Button>

      <div className="flex flex-col gap-4">
        <Button 
          variant="icon" 
          onClick={onToggleCamera}
          title="Ganti Kamera"
          aria-label="Ganti Kamera"
          disabled={isDisabled}
        >
          <RefreshCcw className="w-5 h-5" />
        </Button>
        <Button 
          variant="icon" 
          onClick={onToggleMultiShot}
          title="Multi-shot Mode"
          aria-label="Toggle Multi-shot Mode"
          aria-pressed={isMultiShot}
          disabled={isDisabled}
          className={cn(isMultiShot && "bg-primary text-white border-primary")}
        >
          <Layers className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
