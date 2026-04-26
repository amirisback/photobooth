"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  RefreshCcw, 
  FlipHorizontal, 
  AlertCircle, 
  Loader2, 
  Upload,
  CameraOff
} from "lucide-react";
import { useCamera } from "@/lib/hooks/useCamera";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const CameraSection: React.FC = () => {
  const { 
    stream, 
    error, 
    isLoading, 
    startCamera, 
    stopCamera, 
    toggleFacingMode, 
    facingMode,
    isPermissionDenied 
  } = useCamera();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMirrored, setIsMirrored] = useState(true);

  // Initialize camera on mount
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  // Connect stream to video element
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleToggleMirror = () => {
    setIsMirrored(prev => !prev);
  };

  return (
    <section className="py-12 bg-white">
      <div className="container-content">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-h2-bold text-text-headline mb-4 uppercase tracking-tighter">
              Live Preview
            </h2>
            <p className="text-body-lg text-text-body">
              Siapkan gaya terbaikmu sebelum memotret.
            </p>
          </div>

          {/* Camera Viewport */}
          <div className="relative group">
            <div className="video-container shadow-2xl border-4 border-surface-neutral/20">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-surface-charcoal text-white gap-4"
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
                    className="absolute inset-0 flex flex-col items-center justify-center bg-surface-neutral/10 p-8 text-center gap-6"
                  >
                    <div className="bg-primary/10 p-4 rounded-full">
                      <CameraOff className="w-12 h-12 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-h4-bold text-text-headline mb-2 uppercase">Kamera Tidak Tersedia</h3>
                      <p className="text-text-body max-w-md mx-auto">{error}</p>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-4">
                      <Button variant="primary-rect" onClick={() => startCamera()}>
                        Coba Lagi
                      </Button>
                      <Button variant="ghost-rect" className="gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Foto
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.video
                    key="video"
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cn(
                      "video-feed",
                      isMirrored && "mirror-x"
                    )}
                  />
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

            {/* Controls Overlay (Only visible when camera is active) */}
            {!isLoading && !error && (
              <div className="mt-8 flex justify-center items-center gap-6">
                <Button 
                  variant="icon" 
                  onClick={handleToggleMirror}
                  title="Toggle Mirror"
                  className={cn(isMirrored && "bg-primary text-white border-primary")}
                >
                  <FlipHorizontal className="w-5 h-5" />
                </Button>

                <Button 
                  variant="primary-pill" 
                  className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl border-4 border-white"
                  title="Ambil Foto"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white" />
                  </div>
                </Button>

                <Button 
                  variant="icon" 
                  onClick={toggleFacingMode}
                  title="Ganti Kamera"
                >
                  <RefreshCcw className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>

          {/* Guidelines */}
          {!error && (
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-surface-neutral pt-12">
              <div className="text-center">
                <div className="text-h3 text-primary mb-2">01</div>
                <h4 className="text-label mb-2">Pencahayaan</h4>
                <p className="text-caption text-text-body">Pastikan wajah Anda mendapat cahaya yang cukup.</p>
              </div>
              <div className="text-center">
                <div className="text-h3 text-primary mb-2">02</div>
                <h4 className="text-label mb-2">Posisi</h4>
                <p className="text-caption text-text-body">Posisikan wajah Anda di tengah layar.</p>
              </div>
              <div className="text-center">
                <div className="text-h3 text-primary mb-2">03</div>
                <h4 className="text-label mb-2">Gaya</h4>
                <p className="text-caption text-text-body">Tersenyumlah dan ambil momen terbaikmu!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
