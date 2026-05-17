// ─── PhotoBooth Pro: Core Types ─────────────────────────────────────────────

/** Represents a text overlay placed on the photo canvas */
export interface TextOverlay {
  id: string;
  content: string;
  x: number; // percentage (0–100) from left
  y: number; // percentage (0–100) from top
  fontSize: number;
  fontFamily: string;
  color: string;
  rotation: number; // degrees
  bold: boolean;
  italic: boolean;
}

/** Available visual effect filters */
export type EffectType =
  | "none"
  | "grayscale"
  | "sepia"
  | "vintage"
  | "warm"
  | "cool"
  | "dramatic"
  | "vignette";

/** Active tool in the editor bottom panel */
export type EditorTool = "background" | "text" | "effects" | null;

/** Background mode for the editor */
export type BackgroundMode = "original" | "removed" | "color" | "gradient" | "image";

/** Full editor state */
export interface PhotoState {
  originalImage: string | null;      // base64 data URL of the original photo
  processedImage: string | null;     // base64 data URL after background removal
  backgroundMode: BackgroundMode;
  backgroundColor: string;           // hex color for solid background
  backgroundGradient: string;        // CSS gradient string
  backgroundImage: string | null;    // base64 data URL of custom background
  texts: TextOverlay[];
  activeEffect: EffectType;
  isProcessingBg: boolean;           // true while bg removal is running
}

/** Actions dispatched to the editor reducer */
export type EditorAction =
  | { type: "SET_ORIGINAL_IMAGE"; payload: string }
  | { type: "SET_PROCESSED_IMAGE"; payload: string }
  | { type: "SET_BACKGROUND_MODE"; payload: BackgroundMode }
  | { type: "SET_BACKGROUND_COLOR"; payload: string }
  | { type: "SET_BACKGROUND_GRADIENT"; payload: string }
  | { type: "SET_BACKGROUND_IMAGE"; payload: string }
  | { type: "ADD_TEXT"; payload: TextOverlay }
  | { type: "UPDATE_TEXT"; payload: { id: string; updates: Partial<TextOverlay> } }
  | { type: "DELETE_TEXT"; payload: string }
  | { type: "SET_EFFECT"; payload: EffectType }
  | { type: "SET_PROCESSING_BG"; payload: boolean }
  | { type: "RESET" };

/** Export format options */
export type ExportFormat = "png" | "jpeg";

/** Preset gradient definition */
export interface GradientPreset {
  id: string;
  name: string;
  css: string;
}

/** Preset color definition */
export interface ColorPreset {
  id: string;
  name: string;
  hex: string;
}
