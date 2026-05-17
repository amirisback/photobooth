"use client";

// ─── PhotoBooth Pro: Editor State Hook ───────────────────────────────────────

import { useCallback, useReducer } from "react";
import type { PhotoState, EditorAction, TextOverlay, EffectType, BackgroundMode } from "../lib/types";

const initialState: PhotoState = {
  originalImage: null,
  processedImage: null,
  backgroundMode: "original",
  backgroundColor: "#1a1a2e",
  backgroundGradient: "linear-gradient(135deg, #667eea, #764ba2)",
  backgroundImage: null,
  texts: [],
  activeEffect: "none",
  isProcessingBg: false,
};

function editorReducer(state: PhotoState, action: EditorAction): PhotoState {
  switch (action.type) {
    case "SET_ORIGINAL_IMAGE":
      return {
        ...state,
        originalImage: action.payload,
        processedImage: null,
        backgroundMode: "original",
      };
    case "SET_PROCESSED_IMAGE":
      return {
        ...state,
        processedImage: action.payload,
        backgroundMode: "removed",
      };
    case "SET_BACKGROUND_MODE":
      return { ...state, backgroundMode: action.payload };
    case "SET_BACKGROUND_COLOR":
      return { ...state, backgroundColor: action.payload, backgroundMode: "color" };
    case "SET_BACKGROUND_GRADIENT":
      return { ...state, backgroundGradient: action.payload, backgroundMode: "gradient" };
    case "SET_BACKGROUND_IMAGE":
      return { ...state, backgroundImage: action.payload, backgroundMode: "image" };
    case "ADD_TEXT":
      return { ...state, texts: [...state.texts, action.payload] };
    case "UPDATE_TEXT":
      return {
        ...state,
        texts: state.texts.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload.updates } : t
        ),
      };
    case "DELETE_TEXT":
      return {
        ...state,
        texts: state.texts.filter((t) => t.id !== action.payload),
      };
    case "SET_EFFECT":
      return { ...state, activeEffect: action.payload };
    case "SET_PROCESSING_BG":
      return { ...state, isProcessingBg: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function usePhotoEditor() {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  const setOriginalImage = useCallback(
    (src: string) => dispatch({ type: "SET_ORIGINAL_IMAGE", payload: src }),
    []
  );

  const setProcessedImage = useCallback(
    (src: string) => dispatch({ type: "SET_PROCESSED_IMAGE", payload: src }),
    []
  );

  const setBackgroundMode = useCallback(
    (mode: BackgroundMode) => dispatch({ type: "SET_BACKGROUND_MODE", payload: mode }),
    []
  );

  const setBackgroundColor = useCallback(
    (color: string) => dispatch({ type: "SET_BACKGROUND_COLOR", payload: color }),
    []
  );

  const setBackgroundGradient = useCallback(
    (gradient: string) => dispatch({ type: "SET_BACKGROUND_GRADIENT", payload: gradient }),
    []
  );

  const setBackgroundImage = useCallback(
    (src: string) => dispatch({ type: "SET_BACKGROUND_IMAGE", payload: src }),
    []
  );

  const addText = useCallback(
    (text: TextOverlay) => dispatch({ type: "ADD_TEXT", payload: text }),
    []
  );

  const updateText = useCallback(
    (id: string, updates: Partial<TextOverlay>) =>
      dispatch({ type: "UPDATE_TEXT", payload: { id, updates } }),
    []
  );

  const deleteText = useCallback(
    (id: string) => dispatch({ type: "DELETE_TEXT", payload: id }),
    []
  );

  const setEffect = useCallback(
    (effect: EffectType) => dispatch({ type: "SET_EFFECT", payload: effect }),
    []
  );

  const setProcessingBg = useCallback(
    (v: boolean) => dispatch({ type: "SET_PROCESSING_BG", payload: v }),
    []
  );

  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  // Derived state
  const canExport = !!state.originalImage;
  const hasChanges =
    state.backgroundMode !== "original" ||
    state.texts.length > 0 ||
    state.activeEffect !== "none";

  return {
    state,
    canExport,
    hasChanges,
    setOriginalImage,
    setProcessedImage,
    setBackgroundMode,
    setBackgroundColor,
    setBackgroundGradient,
    setBackgroundImage,
    addText,
    updateText,
    deleteText,
    setEffect,
    setProcessingBg,
    reset,
  };
}
