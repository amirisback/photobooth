"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePhotoEditor } from "@/app/hooks/use-photo-editor";
import { ArrowLeft, Download } from "lucide-react";
import type { EditorTool } from "@/app/lib/types";
import { CanvasPreview } from "./components/CanvasPreview";
import { ToolBar } from "./components/ToolBar";
import { BackgroundPanel } from "./components/BackgroundPanel";
import { TextPanel } from "./components/TextPanel";
import { EffectsPanel } from "./components/EffectsPanel";
import { ExportDialog } from "./components/ExportDialog";

export default function EditorPage() {
  const router = useRouter();
  const editor = usePhotoEditor();
  const [activeTool, setActiveTool] = useState<EditorTool>(null);
  const [showExport, setShowExport] = useState(false);

  // Load image from sessionStorage on mount
  useEffect(() => {
    const img = sessionStorage.getItem("photobooth_image");
    if (img) {
      editor.setOriginalImage(img);
    } else {
      // No image — go back to home
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    sessionStorage.removeItem("photobooth_image");
    router.push("/");
  };

  const handleToolSelect = (tool: EditorTool) => {
    setActiveTool((prev) => (prev === tool ? null : tool));
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      {/* ── Top Bar ─────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-4 py-3 safe-top z-20">
        <button
          id="btn-editor-back"
          onClick={handleBack}
          className="btn-icon"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-lg font-bold gradient-text">PhotoBooth Pro</h1>

        <button
          id="btn-editor-export"
          onClick={() => setShowExport(true)}
          disabled={!editor.canExport}
          className="btn-icon disabled:opacity-30"
          aria-label="Export photo"
        >
          <Download className="w-5 h-5" />
        </button>
      </header>

      {/* ── Canvas Preview Area ─────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-4 py-2 overflow-hidden">
        <CanvasPreview
          state={editor.state}
          onUpdateText={editor.updateText}
        />
      </div>

      {/* ── Tool Panel (slides up when a tool is active) ────────────── */}
      {activeTool && (
        <div className="z-10 border-t border-glass-border">
          <div className="panel-sheet glass-sm">
            {activeTool === "background" && (
              <BackgroundPanel
                state={editor.state}
                onRemoveBg={async () => {
                  if (!editor.state.originalImage) return;
                  editor.setProcessingBg(true);
                  try {
                    const { removeBackground } = await import(
                      "@imgly/background-removal"
                    );
                    const blob = await removeBackground(editor.state.originalImage);
                    const reader = new FileReader();
                    reader.onload = () => {
                      editor.setProcessedImage(reader.result as string);
                      editor.setProcessingBg(false);
                    };
                    reader.readAsDataURL(blob);
                  } catch {
                    editor.setProcessingBg(false);
                    alert("Background removal failed. Please try again.");
                  }
                }}
                onSetColor={editor.setBackgroundColor}
                onSetGradient={editor.setBackgroundGradient}
                onSetImage={editor.setBackgroundImage}
                onSetMode={editor.setBackgroundMode}
              />
            )}
            {activeTool === "text" && (
              <TextPanel
                texts={editor.state.texts}
                onAdd={editor.addText}
                onUpdate={editor.updateText}
                onDelete={editor.deleteText}
              />
            )}
            {activeTool === "effects" && (
              <EffectsPanel
                activeEffect={editor.state.activeEffect}
                onSelect={editor.setEffect}
              />
            )}
          </div>
        </div>
      )}

      {/* ── Bottom Toolbar ──────────────────────────────────────────── */}
      <ToolBar activeTool={activeTool} onSelect={handleToolSelect} />

      {/* ── Export Dialog ────────────────────────────────────────────── */}
      {showExport && (
        <ExportDialog
          state={editor.state}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
}
