"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCamera } from "@/app/hooks/use-camera";
import { SwitchCamera, X, ImagePlus, Circle, Sparkles, Frame, Sticker, ChevronLeft, ChevronRight } from "lucide-react";
import { borders, buildSvgString, svgToImage, type BorderDef } from "@/app/lib/border-overlays";
import { stickers, stickerCategories, type StickerDef, type StickerCategoryKey } from "@/app/lib/sticker-defs";

// ── Filters ───────────────────────────────────────────────────────────────────
const cameraFilters = [
  { id: "normal", label: "Normal", css: "none" },
  { id: "bw", label: "B&W", css: "grayscale(100%)" },
  { id: "sepia", label: "Sepia", css: "sepia(80%)" },
  { id: "vintage", label: "Vintage", css: "sepia(40%) contrast(90%) brightness(110%) saturate(80%)" },
  { id: "warm", label: "Warm", css: "saturate(130%) hue-rotate(-10deg) brightness(105%)" },
  { id: "cool", label: "Cool", css: "saturate(90%) hue-rotate(15deg)" },
  { id: "dramatic", label: "Dramatic", css: "contrast(140%) brightness(90%) saturate(120%)" },
  { id: "bright", label: "Bright", css: "brightness(120%) saturate(110%)" },
  { id: "fade", label: "Fade", css: "brightness(110%) saturate(70%) contrast(90%)" },
  { id: "noir", label: "Noir", css: "grayscale(100%) contrast(130%) brightness(90%)" },
  { id: "vivid", label: "Vivid", css: "saturate(180%) contrast(110%)" },
  { id: "soft", label: "Soft", css: "brightness(108%) contrast(92%) saturate(90%)" },
  { id: "retro", label: "Retro", css: "sepia(30%) saturate(120%) hue-rotate(-15deg) brightness(105%)" },
  { id: "cinema", label: "Cinema", css: "contrast(115%) saturate(85%) brightness(95%) sepia(10%)" },
];

// ── Placed sticker instance ───────────────────────────────────────────────────
interface PlacedSticker {
  id: string;
  sticker: StickerDef;
  x: number; // percent
  y: number; // percent
  size: number; // px
}

type TabMode = "filters" | "borders" | "stickers";

export default function CameraPage() {
  const router = useRouter();
  const { videoRef, isActive, error, startCamera, stopCamera, switchCamera, captureFrame } = useCamera();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const viewfinderRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  // ── Desktop scroll arrows for strip ──
  const scrollStrip = useCallback((dir: "left" | "right") => {
    if (!stripRef.current) return;
    const amount = dir === "left" ? -200 : 200;
    stripRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }, []);

  const [activeFilter, setActiveFilter] = useState(cameraFilters[0]);
  const [activeBorder, setActiveBorder] = useState<BorderDef>(borders[0]);
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [tabMode, setTabMode] = useState<TabMode>("filters");
  const [stickerCat, setStickerCat] = useState<StickerCategoryKey>("all");

  const filteredStickers = stickerCat === "all" ? stickers : stickers.filter((s) => s.category === stickerCat);

  // Drag state for stickers
  const dragRef = useRef<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);

  useEffect(() => {
    startCamera("user");
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Add sticker at center ──
  const addSticker = useCallback((s: StickerDef) => {
    setPlacedStickers((prev) => [
      ...prev,
      { id: `${s.id}_${Date.now()}`, sticker: s, x: 50, y: 50, size: 80 },
    ]);
  }, []);

  const removeSticker = useCallback((id: string) => {
    setPlacedStickers((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // ── Sticker drag handlers ──
  const onStickerPointerDown = (e: React.PointerEvent, ps: PlacedSticker) => {
    e.stopPropagation();
    dragRef.current = { id: ps.id, startX: e.clientX, startY: e.clientY, origX: ps.x, origY: ps.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onStickerPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current || !viewfinderRef.current) return;
    const rect = viewfinderRef.current.getBoundingClientRect();
    const dx = ((e.clientX - dragRef.current.startX) / rect.width) * 100;
    const dy = ((e.clientY - dragRef.current.startY) / rect.height) * 100;
    const newX = Math.max(0, Math.min(100, dragRef.current.origX + dx));
    const newY = Math.max(0, Math.min(100, dragRef.current.origY + dy));
    const dragId = dragRef.current.id;
    setPlacedStickers((prev) =>
      prev.map((s) => (s.id === dragId ? { ...s, x: newX, y: newY } : s))
    );
  };

  const onStickerPointerUp = () => { dragRef.current = null; };

  // ── Capture ──
  const handleCapture = async () => {
    const dataURL = captureFrame(activeFilter.css);
    if (!dataURL) return;

    const img = new Image();
    img.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);

      // Draw border
      if (activeBorder.id !== "none" && activeBorder.svg) {
        try {
          const svgStr = buildSvgString(activeBorder, img.width, img.height);
          const bImg = await svgToImage(svgStr);
          ctx.drawImage(bImg, 0, 0, img.width, img.height);
        } catch { /* ignore */ }
      }

      // Draw stickers
      for (const ps of placedStickers) {
        try {
          const sImg = await loadImg(ps.sticker.src);
          const sx = (ps.x / 100) * img.width - ps.size / 2;
          const sy = (ps.y / 100) * img.height - ps.size / 2;
          ctx.drawImage(sImg, sx, sy, ps.size * (img.width / 400), ps.size * (img.width / 400));
        } catch { /* ignore */ }
      }

      stopCamera();
      sessionStorage.setItem("photobooth_image", canvas.toDataURL("image/jpeg", 0.92));
      router.push("/editor");
    };
    img.src = dataURL;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      stopCamera();
      sessionStorage.setItem("photobooth_image", reader.result as string);
      router.push("/editor");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col overflow-hidden">
      {/* ── Viewfinder (fills all available space) ──────────────────── */}
      <div
        ref={viewfinderRef}
        className="absolute inset-0 overflow-hidden"
        onPointerMove={onStickerPointerMove}
        onPointerUp={onStickerPointerUp}
        onPointerCancel={onStickerPointerUp}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover transition-[filter] duration-300"
          autoPlay playsInline muted
          style={{ transform: "scaleX(-1)", filter: activeFilter.css }}
        />

        {/* Border overlay */}
        {activeBorder.id !== "none" && activeBorder.svg && (
          <div className="absolute inset-0 pointer-events-none z-10"
            dangerouslySetInnerHTML={{
              __html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none">${activeBorder.svg}</svg>`,
            }}
          />
        )}

        {/* Placed stickers */}
        {placedStickers.map((ps) => (
          <div
            key={ps.id}
            className="absolute z-20 touch-none cursor-grab active:cursor-grabbing"
            style={{
              left: `${ps.x}%`,
              top: `${ps.y}%`,
              transform: "translate(-50%, -50%)",
              width: ps.size,
              height: ps.size,
            }}
            onPointerDown={(e) => onStickerPointerDown(e, ps)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ps.sticker.src} alt={ps.sticker.label} className="w-full h-full object-contain pointer-events-none" />
            <button
              onClick={(e) => { e.stopPropagation(); removeSticker(ps.id); }}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold shadow-md"
            >×</button>
          </div>
        ))}

        {/* Error */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 p-6 z-30">
            <div className="glass p-6 text-center max-w-sm">
              <p className="text-red-400 font-medium mb-4">{error}</p>
              <button onClick={() => startCamera()} className="btn-primary text-sm">Try Again</button>
            </div>
          </div>
        )}

        {/* Loading */}
        {!isActive && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="w-10 h-10 border-2 border-accent-1 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* ── Close button ──────────────────────────────────────────── */}
      <button onClick={() => { stopCamera(); router.push("/"); }}
        className="absolute top-4 left-4 safe-top btn-icon bg-black/50 border-white/10 z-30">
        <X className="w-5 h-5 text-white" />
      </button>

      {/* ── Bottom overlay (transparent, over the viewfinder) ─────── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <div className="pointer-events-auto flex flex-col items-center gap-2 pb-2">

          {/* Tab toggle */}
          <div className="flex bg-black/50 backdrop-blur-md rounded-full p-1 gap-0.5">
            {([["filters", Sparkles, "Filters"], ["borders", Frame, "Borders"], ["stickers", Sticker, "Stickers"]] as const).map(
              ([key, Icon, label]) => (
                <button key={key} onClick={() => setTabMode(key)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${tabMode === key ? "bg-accent-1 text-white" : "text-white/60"}`}>
                  <Icon className="w-3.5 h-3.5" /> {label}
                </button>
              )
            )}
          </div>

          {/* Category sub-tabs for stickers */}
          {tabMode === "stickers" && (
            <div className="flex gap-1 overflow-x-auto px-4 max-w-full" style={{ scrollbarWidth: "none" }}>
              {stickerCategories.map((cat) => (
                <button key={cat.key} onClick={() => setStickerCat(cat.key)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap transition-all ${
                    stickerCat === cat.key ? "bg-white/20 text-white" : "text-white/40 hover:text-white/60"
                  }`}>
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          {/* Strip with desktop scroll arrows */}
          <div className="relative group/strip w-full">
            {/* Left arrow — desktop only */}
            <button
              onClick={() => scrollStrip("left")}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover/strip:opacity-100 shadow-lg"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right arrow — desktop only */}
            <button
              onClick={() => scrollStrip("right")}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover/strip:opacity-100 shadow-lg"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          <div ref={stripRef} className={`flex gap-2.5 overflow-x-auto px-4 md:px-10 py-1 max-w-full ${tabMode !== "stickers" ? "justify-center" : ""}`} style={{ scrollbarWidth: "none" }}>
            {tabMode === "filters" && cameraFilters.map((f) => (
              <button key={f.id} onClick={() => setActiveFilter(f)}
                className={`flex flex-col items-center gap-1 shrink-0 transition-all ${activeFilter.id === f.id ? "scale-110" : "opacity-60"}`}>
                <div className={`w-12 h-12 rounded-full border-2 overflow-hidden ${activeFilter.id === f.id ? "border-accent-1 shadow-[0_0_10px_rgba(168,85,247,0.5)]" : "border-white/20"}`}>
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300" style={{ filter: f.css }} />
                </div>
                <span className={`text-[9px] font-semibold ${activeFilter.id === f.id ? "text-white" : "text-white/50"}`}>{f.label}</span>
              </button>
            ))}
            {tabMode === "borders" && borders.map((b) => (
              <button key={b.id} onClick={() => setActiveBorder(b)}
                className={`flex flex-col items-center gap-1 shrink-0 transition-all ${activeBorder.id === b.id ? "scale-110" : "opacity-60"}`}>
                <div className={`w-12 h-12 rounded-lg overflow-hidden relative ${activeBorder.id === b.id ? "ring-2 ring-accent-1 shadow-[0_0_10px_rgba(168,85,247,0.5)]" : ""}`}>
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300" />
                  {b.svg && <div className="absolute inset-0" dangerouslySetInnerHTML={{ __html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none">${b.svg}</svg>` }} />}
                </div>
                <span className={`text-[9px] font-semibold ${activeBorder.id === b.id ? "text-white" : "text-white/50"}`}>{b.label}</span>
              </button>
            ))}
            {tabMode === "stickers" && filteredStickers.map((s) => (
              <button key={s.id} onClick={() => addSticker(s)}
                className="flex flex-col items-center gap-1 shrink-0 transition-all hover:scale-110 active:scale-95">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center p-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt={s.label} className="w-full h-full object-contain" loading="lazy" />
                </div>
                <span className="text-[9px] font-semibold text-white/70 max-w-[48px] truncate">{s.label}</span>
              </button>
            ))}
          </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between w-full px-8 py-3 safe-bottom">
            <button onClick={() => fileInputRef.current?.click()} className="btn-icon bg-white/10 border-white/20">
              <ImagePlus className="w-5 h-5 text-white" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

            <button onClick={handleCapture} disabled={!isActive}
              className="w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center transition-transform active:scale-90 disabled:opacity-40 ring-4 ring-white/30">
              <Circle className="w-14 h-14 text-white fill-white" />
            </button>

            <button onClick={switchCamera} className="btn-icon bg-white/10 border-white/20">
              <SwitchCamera className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
