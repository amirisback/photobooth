"use client";

import { useEffect, useRef, useCallback } from "react";
import type { PhotoState, TextOverlay } from "@/app/lib/types";
import { renderComposite } from "@/app/lib/canvas-utils";

interface CanvasPreviewProps {
  state: PhotoState;
  onUpdateText: (id: string, updates: Partial<TextOverlay>) => void;
}

export function CanvasPreview({ state, onUpdateText }: CanvasPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    textId: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  // Render composite whenever state changes
  const render = useCallback(async () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !state.originalImage) return;

    const containerW = container.clientWidth;
    const compositeCanvas = await renderComposite(state, Math.min(containerW * 2, 1920));
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = compositeCanvas.width;
    canvas.height = compositeCanvas.height;
    ctx.drawImage(compositeCanvas, 0, 0);
  }, [state]);

  useEffect(() => {
    render();
  }, [render]);

  // Touch/mouse drag for text overlays
  const getCanvasPosition = (
    clientX: number,
    clientY: number
  ): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
    };
  };

  const findTextAtPosition = (x: number, y: number): TextOverlay | null => {
    // Check from last (topmost) to first
    for (let i = state.texts.length - 1; i >= 0; i--) {
      const t = state.texts[i];
      const dx = Math.abs(x - t.x);
      const dy = Math.abs(y - t.y);
      // Hit area ~10% of canvas size
      if (dx < 10 && dy < 6) return t;
    }
    return null;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const pos = getCanvasPosition(e.clientX, e.clientY);
    if (!pos) return;

    const text = findTextAtPosition(pos.x, pos.y);
    if (text) {
      dragRef.current = {
        textId: text.id,
        startX: e.clientX,
        startY: e.clientY,
        origX: text.x,
        origY: text.y,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const deltaX = ((e.clientX - dragRef.current.startX) / rect.width) * 100;
    const deltaY = ((e.clientY - dragRef.current.startY) / rect.height) * 100;

    onUpdateText(dragRef.current.textId, {
      x: Math.max(0, Math.min(100, dragRef.current.origX + deltaX)),
      y: Math.max(0, Math.min(100, dragRef.current.origY + deltaY)),
    });
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  if (!state.originalImage) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="w-10 h-10 border-2 border-accent-1 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-lg flex items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-2xl shadow-2xl touch-none"
        style={{ maxHeight: "55vh" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />

      {/* Processing overlay */}
      {state.isProcessingBg && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-2xl gap-3">
          <div className="w-10 h-10 border-2 border-accent-1 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-white/80 font-medium">
            Removing background...
          </p>
        </div>
      )}
    </div>
  );
}
