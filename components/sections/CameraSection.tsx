"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCamera } from "@/lib/hooks/useCamera";
import { useCapture } from "@/lib/hooks/useCapture";

import { CameraViewport } from "@/components/booth/CameraViewport";
import { CaptureControls } from "@/components/booth/CaptureControls";
import { FilterSelection } from "@/components/booth/FilterSelection";
import { FrameSelection } from "@/components/booth/FrameSelection";
import { ResultPreview } from "@/components/booth/ResultPreview";

export const CameraSection: React.FC = () => {
  const { 
    stream, 
    error, 
    isLoading, 
    startCamera, 
    stopCamera, 
    toggleFacingMode, 
    facingMode
  } = useCamera();

  const videoRef = useRef<HTMLVideoElement>(null);
  
  // States
  const [isMirrored, setIsMirrored] = useState(true);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [isMultiShot, setIsMultiShot] = useState(false);
  const [activeFilterId, setActiveFilterId] = useState("original");
  const [activeFrameId, setActiveFrameId] = useState("none");
  const [showResult, setShowResult] = useState(false);

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

  const { 
    takePhoto, 
    takeMultiShotSequence, 
    clearPhotos, 
    isCapturing, 
    countdown, 
    flash, 
    capturedPhotos 
  } = useCapture({
    videoRef,
    isMirrored,
    activeFilterId,
    activeFrameId,
    onSequenceComplete: () => setShowResult(true)
  });

  const handleCapture = () => {
    if (isMultiShot) {
      takeMultiShotSequence(4, isCountdownActive ? 3 : 1);
    } else {
      takePhoto(isCountdownActive);
    }
  };

  const handleRetake = () => {
    setShowResult(false);
    clearPhotos();
  };

  const handleContinue = () => {
    // Proceed to next step or save
    console.log("Proceeding with photos", capturedPhotos);
    alert("Saved! (Check console for data URL)");
  };

  const handleDownload = () => {
    if (capturedPhotos.length === 0) return;
    
    if (isMultiShot) {
      // In a real app we would composite the strip here, or just download all
      capturedPhotos.forEach((photo, i) => {
        const link = document.createElement('a');
        link.download = `photobooth_strip_${i+1}.png`;
        link.href = photo;
        link.click();
      });
    } else {
      const link = document.createElement('a');
      link.download = 'photobooth_capture.png';
      link.href = capturedPhotos[0];
      link.click();
    }
  };

  return (
    <section className="py-12 bg-white relative">
      <div className="container-content relative">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
          
          {/* Main Viewport Column */}
          <div className="flex-1">
            <div className="text-center mb-10">
              <h2 className="text-h2-bold text-text-headline mb-4 uppercase tracking-widest leading-snug">
                Live Preview
              </h2>
              <p className="text-body-lg text-text-body leading-loose tracking-wide">
                Siapkan gaya terbaikmu sebelum memotret.
              </p>
            </div>

            <div className="relative aspect-[3/4] max-w-md mx-auto">
              <CameraViewport 
                videoRef={videoRef}
                isLoading={isLoading}
                error={error}
                isMirrored={isMirrored}
                activeFilterId={activeFilterId}
                activeFrameId={activeFrameId}
                onRetry={startCamera}
              />
              
              {/* Flash Overlay */}
              <AnimatePresence>
                {flash && (
                  <motion.div 
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-white z-40 pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Countdown Overlay */}
              <AnimatePresence>
                {countdown !== null && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.5 }}
                    className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
                  >
                    <span className="text-[120px] font-bold text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                      {countdown}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Result Overlay */}
              <AnimatePresence>
                {showResult && (
                  <ResultPreview 
                    photos={capturedPhotos}
                    isMultiShot={isMultiShot}
                    onRetake={handleRetake}
                    onContinue={handleContinue}
                    onDownload={handleDownload}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Controls */}
            {!isLoading && !error && !showResult && (
              <CaptureControls 
                isMirrored={isMirrored}
                onToggleMirror={() => setIsMirrored(prev => !prev)}
                onToggleCamera={toggleFacingMode}
                onCapture={handleCapture}
                isCountdownActive={isCountdownActive}
                onToggleCountdown={() => setIsCountdownActive(prev => !prev)}
                isMultiShot={isMultiShot}
                onToggleMultiShot={() => setIsMultiShot(prev => !prev)}
                isDisabled={isCapturing}
              />
            )}
          </div>

          {/* Tools Sidebar */}
          {!isLoading && !error && !showResult && (
            <div className="md:w-72 flex flex-col gap-8 bg-surface-neutral/5 p-6 rounded-2xl border border-surface-neutral/20 shadow-inner">
              <div className="flex flex-col gap-2">
                <h3 className="text-h4-bold uppercase">Tools</h3>
                <p className="text-caption text-text-body">Kustomisasi foto Anda.</p>
              </div>
              
              <FilterSelection 
                activeFilterId={activeFilterId}
                onSelectFilter={setActiveFilterId}
                isDisabled={isCapturing}
              />

              <div className="w-full h-px bg-surface-neutral/20" />

              <FrameSelection 
                activeFrameId={activeFrameId}
                onSelectFrame={setActiveFrameId}
                isDisabled={isCapturing}
              />
              
              {/* Optional: Add multi-shot specific settings here if isMultiShot is true */}
              {isMultiShot && (
                <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-micro text-primary font-bold">Multi-shot Aktif</p>
                  <p className="text-caption mt-1">Sistem akan mengambil 4 foto berturut-turut.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
