"use client";

// ─── PhotoBooth Pro: Camera Hook ─────────────────────────────────────────────

import { useCallback, useRef, useState } from "react";

export interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isActive: boolean;
  facingMode: "user" | "environment";
  error: string | null;
  startCamera: (facing?: "user" | "environment") => Promise<void>;
  stopCamera: () => void;
  switchCamera: () => Promise<void>;
  captureFrame: (filter?: string) => string | null;
}

/**
 * Custom hook for accessing the device camera via MediaDevices API.
 * Handles iOS Safari quirks (playsinline) and permission errors gracefully.
 */
export function useCamera(): UseCameraReturn {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [error, setError] = useState<string | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
  }, []);

  const startCamera = useCallback(
    async (facing: "user" | "environment" = facingMode) => {
      setError(null);

      // Stop any existing stream first
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facing,
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });

        streamRef.current = stream;
        setFacingMode(facing);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // iOS Safari requires these attributes
          videoRef.current.setAttribute("playsinline", "true");
          videoRef.current.setAttribute("autoplay", "true");
          videoRef.current.muted = true;
          try {
            await videoRef.current.play();
          } catch (playErr) {
            // AbortError happens when play() is interrupted by a new load —
            // this is harmless (e.g. React strict mode double-mount) so ignore it.
            if (playErr instanceof DOMException && playErr.name === "AbortError") {
              // Camera stream is still valid, just let it auto-play
            } else {
              throw playErr;
            }
          }
        }

        setIsActive(true);
      } catch (err) {
        // Skip AbortError at the outer level too (safety net)
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        const message =
          err instanceof DOMException
            ? err.name === "NotAllowedError"
              ? "Camera permission denied. Please allow camera access in your browser settings."
              : err.name === "NotFoundError"
                ? "No camera found on this device."
                : `Camera error: ${err.message}`
            : "Failed to access camera.";
        setError(message);
        setIsActive(false);
      }
    },
    [facingMode]
  );

  const switchCamera = useCallback(async () => {
    const newFacing = facingMode === "user" ? "environment" : "user";
    await startCamera(newFacing);
  }, [facingMode, startCamera]);

  const captureFrame = useCallback((filter?: string): string | null => {
    const video = videoRef.current;
    if (!video || !isActive) return null;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Mirror the image if using front camera
    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    // Apply CSS filter if provided
    if (filter && filter !== "none") {
      ctx.filter = filter;
    }

    ctx.drawImage(video, 0, 0);

    return canvas.toDataURL("image/jpeg", 0.92);
  }, [isActive, facingMode]);

  return {
    videoRef,
    isActive,
    facingMode,
    error,
    startCamera,
    stopCamera,
    switchCamera,
    captureFrame,
  };
}
