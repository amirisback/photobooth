export interface FilterOption {
  id: string;
  name: string;
  cssString: string;
}

export const FILTER_OPTIONS: FilterOption[] = [
  { id: 'original', name: 'Original', cssString: 'none' },
  { id: 'grayscale', name: 'Grayscale', cssString: 'grayscale(100%)' },
  { id: 'sepia', name: 'Sepia', cssString: 'sepia(100%)' },
  { id: 'vintage', name: 'Vintage', cssString: 'sepia(50%) hue-rotate(-30deg) saturate(140%) contrast(110%)' },
  { id: 'warm', name: 'Warm', cssString: 'sepia(30%) saturate(150%) hue-rotate(-15deg)' },
  { id: 'cool', name: 'Cool', cssString: 'saturate(110%) hue-rotate(180deg) brightness(110%)' },
  { id: 'high-contrast', name: 'Contrast', cssString: 'contrast(150%) brightness(110%) saturate(120%)' },
  { id: 'vivid', name: 'Vivid', cssString: 'saturate(200%) contrast(110%)' },
];

export interface FrameOption {
  id: string;
  name: string;
  url: string | null; // null means no frame
  // Frame layout padding could be added here if needed, e.g., how much space it takes
}

export const FRAME_OPTIONS: FrameOption[] = [
  { id: 'none', name: 'No Frame', url: null },
  { id: 'classic', name: 'Classic', url: '/frames/classic.svg' }, // We'll create simple SVGs
  { id: 'polaroid', name: 'Polaroid', url: '/frames/polaroid.svg' },
  { id: 'filmstrip', name: 'Filmstrip', url: '/frames/filmstrip.svg' },
  { id: 'vintage', name: 'Vintage', url: '/frames/vintage.svg' },
  { id: 'minimal', name: 'Minimal', url: '/frames/minimal.svg' },
  { id: 'celebration', name: 'Party', url: '/frames/celebration.svg' },
];
