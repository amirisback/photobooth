"use client";

import { useState, useRef, useEffect } from "react";
import type { PhotoState } from "@/app/lib/types";
import { renderComposite, downloadCanvas, shareCanvas } from "@/app/lib/canvas-utils";
import { X, Download, Share2 } from "lucide-react";

interface ExportDialogProps {
  state: PhotoState;
  onClose: () => void;
}

export function ExportDialog({ state, onClose }: ExportDialogProps) {
  const [format, setFormat] = useState<"png" | "jpeg">("png");
  const [quality, setQuality] = useState(90);
  const [isProcessing, setIsProcessing] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let mounted = true;
    
    const generatePreview = async () => {
      setIsProcessing(true);
      try {
        // Render full res canvas for export
        const fullCanvas = await renderComposite(state);
        if (!mounted) return;
        canvasRef.current = fullCanvas;
        
        // Draw to preview canvas (scaled down)
        const preview = previewRef.current;
        if (preview) {
          const ctx = preview.getContext("2d");
          if (ctx) {
            // Calculate scale to fit in max 300x300 area
            const maxW = 300, maxH = 300;
            const aspect = fullCanvas.width / fullCanvas.height;
            
            let pw = maxW;
            let ph = maxW / aspect;
            if (ph > maxH) {
              ph = maxH;
              pw = maxH * aspect;
            }
            
            preview.width = pw;
            preview.height = ph;
            ctx.drawImage(fullCanvas, 0, 0, pw, ph);
          }
        }
      } finally {
        if (mounted) setIsProcessing(false);
      }
    };
    
    generatePreview();
    return () => { mounted = false; };
  }, [state]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    downloadCanvas(canvasRef.current, `photobooth_${dateStr}`, format, format === "jpeg" ? quality / 100 : undefined);
    onClose();
  };

  const handleShare = async () => {
    if (!canvasRef.current) return;
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    await shareCanvas(canvasRef.current, `photobooth_${dateStr}`, format, format === "jpeg" ? quality / 100 : undefined);
    onClose();
  };

  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="glass w-full max-w-sm rounded-2xl overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-glass-border">
          <h2 className="text-lg font-bold">Export Photo</h2>
          <button onClick={onClose} className="btn-icon w-8 h-8">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preview */}
        <div className="p-6 flex flex-col items-center justify-center bg-black/40 min-h-[250px]">
          {isProcessing ? (
            <div className="w-8 h-8 border-2 border-accent-1 border-t-transparent rounded-full animate-spin" />
          ) : (
            <canvas ref={previewRef} className="rounded-lg shadow-lg max-w-full max-h-[250px] object-contain" />
          )}
        </div>

        {/* Options */}
        <div className="p-5 space-y-5">
          {/* Format Toggle */}
          <div className="flex bg-surface p-1 rounded-xl">
            <button
              onClick={() => setFormat("png")}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                format === "png" ? "bg-accent-1 text-white shadow-md" : "text-text-muted hover:text-white"
              }`}
            >
              PNG (Lossless)
            </button>
            <button
              onClick={() => setFormat("jpeg")}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                format === "jpeg" ? "bg-accent-1 text-white shadow-md" : "text-text-muted hover:text-white"
              }`}
            >
              JPEG (Smaller)
            </button>
          </div>

          {/* Quality Slider (JPEG only) */}
          {format === "jpeg" && (
            <div className="animate-fadeIn">
              <label className="text-xs text-text-muted font-semibold uppercase tracking-wider flex justify-between mb-2">
                <span>Quality</span>
                <span>{quality}%</span>
              </label>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleDownload}
              disabled={isProcessing}
              className="btn-secondary flex-1 py-3 text-sm disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            
            {canNativeShare && (
              <button
                onClick={handleShare}
                disabled={isProcessing}
                className="btn-primary flex-1 py-3 text-sm disabled:opacity-50"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
