"use client";

import { useState, useCallback, useRef } from 'react';
import { FILTER_OPTIONS, FRAME_OPTIONS } from '../booth-config';

interface UseCaptureProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isMirrored: boolean;
  activeFilterId: string;
  activeFrameId: string;
  onPhotoTaken?: (photoUrl: string) => void;
  onSequenceComplete?: (photos: string[]) => void;
}

export const useCapture = ({
  videoRef,
  isMirrored,
  activeFilterId,
  activeFrameId,
  onPhotoTaken,
  onSequenceComplete
}: UseCaptureProps) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  
  // Sound effect
  const playBeep = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      console.log("Audio not supported or allowed yet");
    }
  }, []);

  const captureSingleFrame = useCallback(async (): Promise<string | null> => {
    if (!videoRef.current) return null;
    const video = videoRef.current;
    
    // Create an offscreen canvas
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Apply mirror if needed
    if (isMirrored) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    // Apply Filter
    const activeFilter = FILTER_OPTIONS.find(f => f.id === activeFilterId);
    if (activeFilter && activeFilter.cssString !== 'none') {
      ctx.filter = activeFilter.cssString;
    }

    // Draw video
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Reset transform and filter before drawing the frame overlay
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.filter = 'none';

    // Draw frame overlay
    const activeFrame = FRAME_OPTIONS.find(f => f.id === activeFrameId);
    if (activeFrame && activeFrame.url) {
      try {
        const img = new Image();
        img.src = activeFrame.url;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      } catch (e) {
        console.error("Failed to load frame for compositing", e);
      }
    }

    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          resolve(null);
          return;
        }
        
        // Save to IndexedDB
        try {
          const { savePhoto } = await import('../idb');
          await savePhoto(blob, activeFilterId, activeFrameId);
        } catch (e) {
          console.error("Failed to save photo to IndexedDB", e);
        }

        const objectUrl = URL.createObjectURL(blob);
        resolve(objectUrl);
      }, 'image/png', 1.0);
    });
  }, [videoRef, isMirrored, activeFilterId, activeFrameId]);

  const triggerFlash = useCallback(() => {
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
  }, []);

  const takePhoto = useCallback(async (useTimer = false) => {
    if (isCapturing) return;
    setIsCapturing(true);

    if (useTimer) {
      for (let i = 3; i > 0; i--) {
        setCountdown(i);
        playBeep();
        await new Promise(r => setTimeout(r, 1000));
      }
      setCountdown(null);
    }

    triggerFlash();
    
    // Small delay to let flash render
    await new Promise(r => setTimeout(r, 50));
    
    const photo = await captureSingleFrame();
    if (photo) {
      setCapturedPhotos([photo]);
      if (onPhotoTaken) onPhotoTaken(photo);
      if (onSequenceComplete) onSequenceComplete([photo]);
    }
    
    setIsCapturing(false);
  }, [isCapturing, captureSingleFrame, triggerFlash, playBeep, onPhotoTaken, onSequenceComplete]);

  const takeMultiShotSequence = useCallback(async (count = 4, delay = 3) => {
    if (isCapturing) return;
    setIsCapturing(true);
    setCapturedPhotos([]);
    const sequencePhotos: string[] = [];

    for (let shot = 0; shot < count; shot++) {
      // Countdown
      for (let i = delay; i > 0; i--) {
        setCountdown(i);
        playBeep();
        await new Promise(r => setTimeout(r, 1000));
      }
      setCountdown(null);

      triggerFlash();
      await new Promise(r => setTimeout(r, 50));
      
      const photo = await captureSingleFrame();
      if (photo) {
        sequencePhotos.push(photo);
        setCapturedPhotos([...sequencePhotos]);
        if (onPhotoTaken) onPhotoTaken(photo);
      }
    }

    if (onSequenceComplete) onSequenceComplete(sequencePhotos);
    setIsCapturing(false);
  }, [isCapturing, captureSingleFrame, triggerFlash, playBeep, onPhotoTaken, onSequenceComplete]);

  const clearPhotos = useCallback(() => {
    capturedPhotos.forEach(url => URL.revokeObjectURL(url));
    setCapturedPhotos([]);
  }, [capturedPhotos]);

  return {
    takePhoto,
    takeMultiShotSequence,
    clearPhotos,
    isCapturing,
    countdown,
    flash,
    capturedPhotos
  };
};
