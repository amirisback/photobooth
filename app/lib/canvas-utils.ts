// ─── PhotoBooth Pro: Canvas Utilities ────────────────────────────────────────

import type { EffectType, TextOverlay, PhotoState } from "./types";

/**
 * Returns a CSS filter string for the given effect type.
 */
export function getEffectFilter(effect: EffectType): string {
  switch (effect) {
    case "grayscale":
      return "grayscale(100%)";
    case "sepia":
      return "sepia(80%)";
    case "vintage":
      return "sepia(40%) contrast(90%) brightness(110%) saturate(80%)";
    case "warm":
      return "saturate(130%) hue-rotate(-10deg) brightness(105%)";
    case "cool":
      return "saturate(90%) hue-rotate(15deg) brightness(100%)";
    case "dramatic":
      return "contrast(140%) brightness(90%) saturate(120%)";
    case "vignette":
      return "contrast(110%) brightness(95%)";
    case "none":
    default:
      return "none";
  }
}

/**
 * Draws a vignette overlay on the canvas for the "vignette" effect.
 */
export function drawVignette(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.max(width, height) * 0.5;

  const gradient = ctx.createRadialGradient(cx, cy, radius * 0.3, cx, cy, radius);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(1, "rgba(0,0,0,0.55)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

/**
 * Draws a single text overlay on the canvas.
 */
export function drawTextOverlay(
  ctx: CanvasRenderingContext2D,
  text: TextOverlay,
  canvasWidth: number,
  canvasHeight: number
): void {
  const x = (text.x / 100) * canvasWidth;
  const y = (text.y / 100) * canvasHeight;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((text.rotation * Math.PI) / 180);

  const fontWeight = text.bold ? "bold" : "normal";
  const fontStyle = text.italic ? "italic" : "normal";
  ctx.font = `${fontStyle} ${fontWeight} ${text.fontSize}px ${text.fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Text shadow for readability
  ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  // White outline
  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
  ctx.lineWidth = 3;
  ctx.strokeText(text.content, 0, 0);

  // Fill text
  ctx.fillStyle = text.color;
  ctx.fillText(text.content, 0, 0);

  ctx.restore();
}

/**
 * Loads an image from a data URL or src string.
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Draws a CSS gradient string onto a canvas context.
 * Supports linear-gradient with simple color stops.
 */
export function drawGradientBackground(
  ctx: CanvasRenderingContext2D,
  gradientCSS: string,
  width: number,
  height: number
): void {
  // Parse simple linear-gradient(Xdeg, color1, color2, ...)
  const match = gradientCSS.match(/linear-gradient\(\s*(\d+)deg\s*,\s*(.+)\)/);
  if (!match) {
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, width, height);
    return;
  }

  const angle = parseInt(match[1]) || 135;
  const colors = match[2].split(",").map((c) => c.trim());

  // Convert angle to canvas coordinates
  const rad = ((angle - 90) * Math.PI) / 180;
  const len = Math.max(width, height);
  const cx = width / 2;
  const cy = height / 2;
  const x0 = cx - Math.cos(rad) * len;
  const y0 = cy - Math.sin(rad) * len;
  const x1 = cx + Math.cos(rad) * len;
  const y1 = cy + Math.sin(rad) * len;

  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  colors.forEach((color, i) => {
    gradient.addColorStop(i / (colors.length - 1), color);
  });

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

/**
 * Renders the full composite onto a canvas and returns it.
 * Pipeline: background → subject image → effect filter → vignette → text overlays
 */
export async function renderComposite(
  state: PhotoState,
  targetWidth?: number
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  // Determine the base image (processed or original)
  const imgSrc =
    state.backgroundMode === "original"
      ? state.originalImage
      : state.processedImage || state.originalImage;

  if (!imgSrc) {
    canvas.width = 800;
    canvas.height = 600;
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, 800, 600);
    return canvas;
  }

  const subjectImg = await loadImage(imgSrc);
  const aspectRatio = subjectImg.naturalWidth / subjectImg.naturalHeight;
  const w = targetWidth || subjectImg.naturalWidth;
  const h = w / aspectRatio;

  canvas.width = w;
  canvas.height = h;

  // Step 1: Draw background
  if (state.backgroundMode === "original") {
    // No background replacement — original photo is the background
  } else if (state.backgroundMode === "color") {
    ctx.fillStyle = state.backgroundColor;
    ctx.fillRect(0, 0, w, h);
  } else if (state.backgroundMode === "gradient") {
    drawGradientBackground(ctx, state.backgroundGradient, w, h);
  } else if (state.backgroundMode === "image" && state.backgroundImage) {
    const bgImg = await loadImage(state.backgroundImage);
    // Cover fill
    const bgAspect = bgImg.naturalWidth / bgImg.naturalHeight;
    let drawW = w,
      drawH = h;
    if (bgAspect > aspectRatio) {
      drawH = h;
      drawW = h * bgAspect;
    } else {
      drawW = w;
      drawH = w / bgAspect;
    }
    ctx.drawImage(bgImg, (w - drawW) / 2, (h - drawH) / 2, drawW, drawH);
  }

  // Step 2: Apply effect filter to subject
  const filter = getEffectFilter(state.activeEffect);
  if (filter !== "none") {
    ctx.filter = filter;
  }

  // Step 3: Draw subject image
  ctx.drawImage(subjectImg, 0, 0, w, h);
  ctx.filter = "none"; // Reset filter after subject

  // Step 4: Vignette overlay
  if (state.activeEffect === "vignette") {
    drawVignette(ctx, w, h);
  }

  // Step 5: Draw text overlays
  for (const text of state.texts) {
    drawTextOverlay(ctx, text, w, h);
  }

  return canvas;
}

/**
 * Exports a canvas as a data URL in the specified format.
 */
export function exportAsDataURL(
  canvas: HTMLCanvasElement,
  format: "png" | "jpeg" = "png",
  quality: number = 0.92
): string {
  const mimeType = format === "png" ? "image/png" : "image/jpeg";
  return canvas.toDataURL(mimeType, quality);
}

/**
 * Triggers a browser download of the canvas content.
 */
export function downloadCanvas(
  canvas: HTMLCanvasElement,
  filename: string,
  format: "png" | "jpeg" = "png",
  quality: number = 0.92
): void {
  const dataURL = exportAsDataURL(canvas, format, quality);
  const link = document.createElement("a");
  link.download = `${filename}.${format}`;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Uses Web Share API to share the canvas image (mobile native share).
 * Falls back to download if Share API is unavailable.
 */
export async function shareCanvas(
  canvas: HTMLCanvasElement,
  filename: string,
  format: "png" | "jpeg" = "png",
  quality: number = 0.92
): Promise<void> {
  const mimeType = format === "png" ? "image/png" : "image/jpeg";

  if (navigator.share && typeof navigator.canShare === "function") {
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, mimeType, quality)
    );
    if (!blob) {
      downloadCanvas(canvas, filename, format, quality);
      return;
    }

    const file = new File([blob], `${filename}.${format}`, { type: mimeType });

    try {
      await navigator.share({
        title: "PhotoBooth Pro",
        text: "Check out my photo!",
        files: [file],
      });
    } catch {
      // User cancelled or share failed — fall back to download
      downloadCanvas(canvas, filename, format, quality);
    }
  } else {
    downloadCanvas(canvas, filename, format, quality);
  }
}
