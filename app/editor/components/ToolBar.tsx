"use client";

import type { EditorTool } from "@/app/lib/types";
import { Image, Type, Sparkles } from "lucide-react";

interface ToolBarProps {
  activeTool: EditorTool;
  onSelect: (tool: EditorTool) => void;
}

export function ToolBar({ activeTool, onSelect }: ToolBarProps) {
  const tools = [
    { id: "background" as const, label: "Background", icon: Image },
    { id: "text" as const, label: "Text", icon: Type },
    { id: "effects" as const, label: "Effects", icon: Sparkles },
  ];

  return (
    <div className="glass-sm mx-4 mb-4 safe-bottom flex items-center justify-between p-2">
      {tools.map((t) => (
        <button
          key={t.id}
          id={`btn-tool-${t.id}`}
          onClick={() => onSelect(t.id)}
          className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl transition-all relative ${
            activeTool === t.id
              ? "text-accent-1"
              : "text-text-muted hover:text-foreground hover:bg-surface-hover"
          }`}
        >
          <t.icon className={`w-6 h-6 ${activeTool === t.id ? "drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" : ""}`} />
          <span className="text-[11px] font-medium tracking-wide">{t.label}</span>
          
          {/* Active indicator dot */}
          {activeTool === t.id && (
            <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-accent-1 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          )}
        </button>
      ))}
    </div>
  );
}
