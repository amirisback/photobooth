"use client";

import { useRef } from "react";
import type { PhotoState, BackgroundMode, GradientPreset, ColorPreset } from "@/app/lib/types";
import { ImageOff, Palette, Upload, Undo2 } from "lucide-react";

const colorPresets: ColorPreset[] = [
  { id: "c1", name: "White", hex: "#ffffff" },
  { id: "c2", name: "Snow", hex: "#f8f9fa" },
  { id: "c3", name: "Slate", hex: "#334155" },
  { id: "c4", name: "Midnight", hex: "#1a1a2e" },
  { id: "c5", name: "Black", hex: "#000000" },
  { id: "c6", name: "Rose", hex: "#fda4af" },
  { id: "c7", name: "Sky", hex: "#7dd3fc" },
  { id: "c8", name: "Mint", hex: "#6ee7b7" },
  { id: "c9", name: "Lavender", hex: "#c4b5fd" },
  { id: "c10", name: "Peach", hex: "#fdba74" },
  { id: "c11", name: "Crimson", hex: "#ef4444" },
  { id: "c12", name: "Ocean", hex: "#0ea5e9" },
];

const gradientPresets: GradientPreset[] = [
  { id: "g1", name: "Sunset", css: "linear-gradient(135deg, #f97316, #ec4899)" },
  { id: "g2", name: "Purple Haze", css: "linear-gradient(135deg, #667eea, #764ba2)" },
  { id: "g3", name: "Ocean", css: "linear-gradient(135deg, #0ea5e9, #06b6d4)" },
  { id: "g4", name: "Forest", css: "linear-gradient(135deg, #22c55e, #16a34a)" },
  { id: "g5", name: "Dawn", css: "linear-gradient(135deg, #fbbf24, #f97316, #ef4444)" },
  { id: "g6", name: "Aurora", css: "linear-gradient(135deg, #a855f7, #06b6d4, #22c55e)" },
  { id: "g7", name: "Night", css: "linear-gradient(135deg, #1e1b4b, #312e81)" },
  { id: "g8", name: "Cotton Candy", css: "linear-gradient(135deg, #f9a8d4, #c4b5fd, #93c5fd)" },
];

interface BackgroundPanelProps {
  state: PhotoState;
  onRemoveBg: () => Promise<void>;
  onSetColor: (color: string) => void;
  onSetGradient: (gradient: string) => void;
  onSetImage: (src: string) => void;
  onSetMode: (mode: BackgroundMode) => void;
}

export function BackgroundPanel({
  state,
  onRemoveBg,
  onSetColor,
  onSetGradient,
  onSetImage,
  onSetMode,
}: BackgroundPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onSetImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 space-y-5">
      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          id="btn-remove-bg"
          onClick={onRemoveBg}
          disabled={state.isProcessingBg || !!state.processedImage}
          className="btn-primary flex-1 text-sm py-3 disabled:opacity-50"
        >
          <ImageOff className="w-4 h-4" />
          {state.isProcessingBg
            ? "Processing..."
            : state.processedImage
              ? "BG Removed ✓"
              : "Remove Background"}
        </button>
        <button
          id="btn-restore-bg"
          onClick={() => onSetMode("original")}
          className="btn-secondary text-sm py-3"
          title="Restore original"
        >
          <Undo2 className="w-4 h-4" />
        </button>
      </div>

      {/* Solid Colors */}
      <div>
        <h3 className="text-xs uppercase tracking-wider text-text-muted font-semibold mb-3 flex items-center gap-2">
          <Palette className="w-3.5 h-3.5" /> Solid Colors
        </h3>
        <div className="grid grid-cols-6 gap-2">
          {colorPresets.map((c) => (
            <button
              key={c.id}
              onClick={() => onSetColor(c.hex)}
              className={`w-full aspect-square rounded-xl border-2 transition-all hover:scale-110 active:scale-95 ${
                state.backgroundMode === "color" && state.backgroundColor === c.hex
                  ? "border-accent-1 ring-2 ring-accent-1/40"
                  : "border-glass-border"
              }`}
              style={{ background: c.hex }}
              title={c.name}
              aria-label={`Set background to ${c.name}`}
            />
          ))}
        </div>
      </div>

      {/* Gradients */}
      <div>
        <h3 className="text-xs uppercase tracking-wider text-text-muted font-semibold mb-3">
          Gradients
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {gradientPresets.map((g) => (
            <button
              key={g.id}
              onClick={() => onSetGradient(g.css)}
              className={`w-full aspect-[3/2] rounded-xl border-2 transition-all hover:scale-105 active:scale-95 ${
                state.backgroundMode === "gradient" && state.backgroundGradient === g.css
                  ? "border-accent-1 ring-2 ring-accent-1/40"
                  : "border-glass-border"
              }`}
              style={{ background: g.css }}
              title={g.name}
              aria-label={`Set gradient to ${g.name}`}
            />
          ))}
        </div>
      </div>

      {/* Custom Image */}
      <div>
        <button
          id="btn-bg-upload"
          onClick={() => fileInputRef.current?.click()}
          className="btn-secondary w-full text-sm py-3"
        >
          <Upload className="w-4 h-4" />
          Upload Background Image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}
