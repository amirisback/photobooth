"use client";

import type { EffectType } from "@/app/lib/types";

const effects: { type: EffectType; label: string; filter: string }[] = [
  { type: "none", label: "Original", filter: "none" },
  { type: "grayscale", label: "B&W", filter: "grayscale(100%)" },
  { type: "sepia", label: "Sepia", filter: "sepia(80%)" },
  { type: "vintage", label: "Vintage", filter: "sepia(40%) contrast(90%) brightness(110%)" },
  { type: "warm", label: "Warm", filter: "saturate(130%) hue-rotate(-10deg) brightness(105%)" },
  { type: "cool", label: "Cool", filter: "saturate(90%) hue-rotate(15deg)" },
  { type: "dramatic", label: "Dramatic", filter: "contrast(140%) brightness(90%) saturate(120%)" },
  { type: "vignette", label: "Vignette", filter: "contrast(110%) brightness(95%)" },
];

interface EffectsPanelProps {
  activeEffect: EffectType;
  onSelect: (effect: EffectType) => void;
}

export function EffectsPanel({ activeEffect, onSelect }: EffectsPanelProps) {
  return (
    <div className="p-4">
      <h3 className="text-xs uppercase tracking-wider text-text-muted font-semibold mb-3">Effects</h3>
      <div className="grid grid-cols-4 gap-3">
        {effects.map((e) => (
          <button
            key={e.type}
            onClick={() => onSelect(e.type)}
            className={`flex flex-col items-center gap-2 p-2 rounded-xl border transition-all ${
              activeEffect === e.type
                ? "border-accent-1 bg-accent-1/15 ring-1 ring-accent-1/30"
                : "border-glass-border bg-surface hover:bg-surface-hover"
            }`}
          >
            <div
              className="w-full aspect-square rounded-lg bg-gradient-to-br from-accent-1/30 to-accent-2/30 overflow-hidden"
              style={{ filter: e.filter }}
            >
              <div className="w-full h-full bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300" />
            </div>
            <span className="text-[11px] font-medium truncate w-full text-center">{e.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
