"use client";

import { useState } from "react";
import type { TextOverlay } from "@/app/lib/types";
import { Plus, Trash2, Bold, Italic } from "lucide-react";

const fontFamilies = ["Inter", "Georgia", "Courier New", "Comic Sans MS", "Impact", "Arial Black"];
const textColors = ["#ffffff", "#000000", "#ef4444", "#f97316", "#eab308", "#22c55e", "#0ea5e9", "#a855f7", "#ec4899"];

interface TextPanelProps {
  texts: TextOverlay[];
  onAdd: (text: TextOverlay) => void;
  onUpdate: (id: string, updates: Partial<TextOverlay>) => void;
  onDelete: (id: string) => void;
}

export function TextPanel({ texts, onAdd, onUpdate, onDelete }: TextPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const editingText = texts.find((t) => t.id === editingId);

  const handleAddText = () => {
    const t: TextOverlay = {
      id: `text_${Date.now()}`, content: "Your Text", x: 50, y: 50,
      fontSize: 32, fontFamily: "Inter", color: "#ffffff", rotation: 0, bold: false, italic: false,
    };
    onAdd(t);
    setEditingId(t.id);
  };

  return (
    <div className="p-4 space-y-4">
      <button id="btn-add-text" onClick={handleAddText} className="btn-primary w-full text-sm py-3">
        <Plus className="w-4 h-4" /> Add Text
      </button>

      {texts.map((t) => (
        <div key={t.id} onClick={() => setEditingId(editingId === t.id ? null : t.id)}
          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${editingId === t.id ? "bg-accent-1/15 border border-accent-1/30" : "bg-surface border border-glass-border hover:bg-surface-hover"}`}>
          <span className="flex-1 truncate text-sm" style={{ fontFamily: t.fontFamily, color: t.color, fontWeight: t.bold ? 700 : 400, fontStyle: t.italic ? "italic" : "normal" }}>{t.content}</span>
          <button onClick={(e) => { e.stopPropagation(); onDelete(t.id); if (editingId === t.id) setEditingId(null); }}
            className="text-red-400 hover:text-red-300 p-1.5" aria-label="Delete"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}

      {editingText && (
        <div className="space-y-4 pt-2 border-t border-glass-border animate-fadeIn">
          <input type="text" value={editingText.content} onChange={(e) => onUpdate(editingText.id, { content: e.target.value })}
            className="w-full bg-surface border border-glass-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-1" placeholder="Enter text..." />

          <div>
            <label className="text-xs text-text-muted font-semibold uppercase tracking-wider block mb-2">Font</label>
            <div className="grid grid-cols-3 gap-2">
              {fontFamilies.map((f) => (
                <button key={f} onClick={() => onUpdate(editingText.id, { fontFamily: f })}
                  className={`text-xs py-2 px-3 rounded-lg border truncate ${editingText.fontFamily === f ? "border-accent-1 bg-accent-1/15 text-accent-1" : "border-glass-border bg-surface"}`}
                  style={{ fontFamily: f }}>{f}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-text-muted font-semibold uppercase tracking-wider block mb-2">Size: {editingText.fontSize}px</label>
            <input type="range" min={12} max={120} value={editingText.fontSize}
              onChange={(e) => onUpdate(editingText.id, { fontSize: Number(e.target.value) })} className="w-full" />
          </div>

          <div className="flex gap-2">
            <button onClick={() => onUpdate(editingText.id, { bold: !editingText.bold })}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm ${editingText.bold ? "border-accent-1 bg-accent-1/15 text-accent-1" : "border-glass-border bg-surface"}`}>
              <Bold className="w-4 h-4" /> Bold</button>
            <button onClick={() => onUpdate(editingText.id, { italic: !editingText.italic })}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm ${editingText.italic ? "border-accent-1 bg-accent-1/15 text-accent-1" : "border-glass-border bg-surface"}`}>
              <Italic className="w-4 h-4" /> Italic</button>
          </div>

          <div>
            <label className="text-xs text-text-muted font-semibold uppercase tracking-wider block mb-2">Color</label>
            <div className="flex gap-2 flex-wrap">
              {textColors.map((c) => (
                <button key={c} onClick={() => onUpdate(editingText.id, { color: c })}
                  className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-all ${editingText.color === c ? "border-accent-1 ring-2 ring-accent-1/40" : "border-glass-border"}`}
                  style={{ background: c }} aria-label={`Color ${c}`} />
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-text-muted font-semibold uppercase tracking-wider block mb-2">Rotation: {editingText.rotation}°</label>
            <input type="range" min={-180} max={180} value={editingText.rotation}
              onChange={(e) => onUpdate(editingText.id, { rotation: Number(e.target.value) })} className="w-full" />
          </div>
        </div>
      )}

      {texts.length > 0 && <p className="text-xs text-text-muted text-center">💡 Drag text on the canvas to reposition</p>}
    </div>
  );
}
