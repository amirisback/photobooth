"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CameraOff, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { FILTER_OPTIONS, FRAME_OPTIONS } from "@/lib/booth-config";

interface CameraViewportProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isLoading: boolean;
  error: string | null;
  isMirrored: boolean;
  activeFilterId: string;
  activeFrameId: string;
  onRetry: () => void;
}

export const CameraViewport: React.FC<CameraViewportProps> = ({
  videoRef,
  isLoading,
  error,
  isMirrored,
  activeFilterId,
  activeFrameId,
  onRetry,
}) => {
  const activeFilter = FILTER_OPTIONS.find(f => f.id === activeFilterId);
  const activeFrame = FRAME_OPTIONS.find(f => f.id === activeFrameId);

  return (
    <div className="relative group">
      <div className="video-container shadow-2xl border-4 border-surface-neutral/20 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-surface-charcoal text-white gap-4"
            >
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <p className="text-label">Menginisialisasi Kamera...</p>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-surface-neutral/10 p-8 text-center gap-6"
            >
              <div className="bg-primary/10 p-4 rounded-full">
                <CameraOff className="w-12 h-12 text-primary" />
              </div>
              <div>
                <h3 className="text-h4-bold text-text-headline mb-2 uppercase">Kamera Tidak Tersedia</h3>
                <p className="text-text-body max-w-md mx-auto">{error}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="primary-rect" onClick={onRetry}>
                  Coba Lagi
                </Button>
                <Button variant="ghost-rect" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Foto
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full relative"
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={cn(
                  "video-feed absolute inset-0 w-full h-full object-cover transition-all duration-300",
                  isMirrored && "mirror-x"
                )}
                style={{
                  filter: activeFilter?.cssString || "none",
                }}
              />
              {/* Frame Overlay */}
              {activeFrame && activeFrame.url && (
                <div 
                  className="absolute inset-0 pointer-events-none bg-no-repeat bg-center bg-contain"
                  style={{ backgroundImage: `url(${activeFrame.url})` }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Badge */}
        {!isLoading && !error && (
          <div className="absolute top-4 left-4 z-20">
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-micro text-white">Live</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
