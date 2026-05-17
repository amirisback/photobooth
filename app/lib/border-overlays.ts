// ─── PhotoBooth Pro: Decorative Border Overlays ──────────────────────────────
// Each border is an SVG viewBox="0 0 100 100" rendered as overlay + baked into capture.

export interface BorderDef {
  id: string;
  label: string;
  category: "basic" | "decorative" | "fun";
  /** Inline SVG content (viewBox 0 0 100 100, no <svg> wrapper) */
  svg: string;
  /** Preview color for the mini swatch */
  previewBg: string;
}

export const borders: BorderDef[] = [
  // ── None ──
  { id: "none", label: "None", category: "basic", svg: "", previewBg: "transparent" },

  // ── Basic ──
  {
    id: "white-classic",
    label: "Classic",
    category: "basic",
    previewBg: "#ffffff",
    svg: `<rect x="0" y="0" width="100" height="100" fill="none" stroke="#ffffff" stroke-width="6"/>`,
  },
  {
    id: "black-frame",
    label: "Dark",
    category: "basic",
    previewBg: "#1a1a1a",
    svg: `<rect x="0" y="0" width="100" height="100" fill="none" stroke="#1a1a1a" stroke-width="6"/>`,
  },
  {
    id: "gold",
    label: "Gold",
    category: "basic",
    previewBg: "#d4a853",
    svg: `<rect x="2" y="2" width="96" height="96" fill="none" stroke="#d4a853" stroke-width="4"/>
          <rect x="5" y="5" width="90" height="90" fill="none" stroke="#d4a853" stroke-width="1.5"/>`,
  },
  {
    id: "rounded-white",
    label: "Rounded",
    category: "basic",
    previewBg: "#ffffff",
    svg: `<rect x="2" y="2" width="96" height="96" rx="8" ry="8" fill="none" stroke="#ffffff" stroke-width="5"/>`,
  },
  {
    id: "gradient-border",
    label: "Gradient",
    category: "basic",
    previewBg: "#a855f7",
    svg: `<defs><linearGradient id="gb" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#a855f7"/>
            <stop offset="50%" stop-color="#ec4899"/>
            <stop offset="100%" stop-color="#f97316"/>
          </linearGradient></defs>
          <rect x="2" y="2" width="96" height="96" rx="6" fill="none" stroke="url(#gb)" stroke-width="5"/>`,
  },
  {
    id: "neon-pink",
    label: "Neon",
    category: "basic",
    previewBg: "#ec4899",
    svg: `<defs><filter id="nf"><feGaussianBlur stdDeviation="1.2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter></defs>
          <rect x="3" y="3" width="94" height="94" rx="5" fill="none" stroke="#ec4899" stroke-width="2.5" filter="url(#nf)"/>`,
  },

  // ── Decorative ──
  {
    id: "floral-corners",
    label: "Floral",
    category: "decorative",
    previewBg: "#f9a8d4",
    svg: `<!-- Top-left flower cluster -->
      <g transform="translate(4,4) scale(0.22)">
        <circle cx="12" cy="0" r="8" fill="#f9a8d4" opacity="0.85"/>
        <circle cx="0" cy="12" r="8" fill="#f9a8d4" opacity="0.85"/>
        <circle cx="20" cy="8" r="7" fill="#fda4af" opacity="0.8"/>
        <circle cx="8" cy="20" r="7" fill="#fda4af" opacity="0.8"/>
        <circle cx="10" cy="10" r="5" fill="#fbbf24" opacity="0.9"/>
        <ellipse cx="24" cy="22" rx="10" ry="4" fill="#4ade80" opacity="0.6" transform="rotate(40,24,22)"/>
        <ellipse cx="28" cy="18" rx="9" ry="3.5" fill="#4ade80" opacity="0.5" transform="rotate(20,28,18)"/>
      </g>
      <!-- Top-right -->
      <g transform="translate(96,4) scale(-0.22,0.22)">
        <circle cx="12" cy="0" r="8" fill="#f9a8d4" opacity="0.85"/>
        <circle cx="0" cy="12" r="8" fill="#f9a8d4" opacity="0.85"/>
        <circle cx="20" cy="8" r="7" fill="#fda4af" opacity="0.8"/>
        <circle cx="8" cy="20" r="7" fill="#fda4af" opacity="0.8"/>
        <circle cx="10" cy="10" r="5" fill="#fbbf24" opacity="0.9"/>
        <ellipse cx="24" cy="22" rx="10" ry="4" fill="#4ade80" opacity="0.6" transform="rotate(40,24,22)"/>
      </g>
      <!-- Bottom-left -->
      <g transform="translate(4,96) scale(0.22,-0.22)">
        <circle cx="12" cy="0" r="8" fill="#c084fc" opacity="0.85"/>
        <circle cx="0" cy="12" r="8" fill="#c084fc" opacity="0.85"/>
        <circle cx="20" cy="8" r="7" fill="#e879f9" opacity="0.8"/>
        <circle cx="8" cy="20" r="7" fill="#e879f9" opacity="0.8"/>
        <circle cx="10" cy="10" r="5" fill="#fbbf24" opacity="0.9"/>
        <ellipse cx="24" cy="22" rx="10" ry="4" fill="#4ade80" opacity="0.6" transform="rotate(40,24,22)"/>
      </g>
      <!-- Bottom-right -->
      <g transform="translate(96,96) scale(-0.22,-0.22)">
        <circle cx="12" cy="0" r="8" fill="#c084fc" opacity="0.85"/>
        <circle cx="0" cy="12" r="8" fill="#c084fc" opacity="0.85"/>
        <circle cx="20" cy="8" r="7" fill="#e879f9" opacity="0.8"/>
        <circle cx="10" cy="10" r="5" fill="#fbbf24" opacity="0.9"/>
        <ellipse cx="24" cy="22" rx="10" ry="4" fill="#4ade80" opacity="0.6" transform="rotate(40,24,22)"/>
      </g>`,
  },
  {
    id: "leaf-vine",
    label: "Leaves",
    category: "decorative",
    previewBg: "#4ade80",
    svg: `<defs><g id="leaf"><ellipse cx="0" cy="0" rx="5" ry="2.5" fill="#4ade80" opacity="0.7"/>
        <line x1="-4" y1="0" x2="4" y2="0" stroke="#22c55e" stroke-width="0.5"/></g></defs>
      <!-- Top vine -->
      <line x1="10" y1="5" x2="90" y2="5" stroke="#22c55e" stroke-width="0.8" opacity="0.5"/>
      <use href="#leaf" x="15" y="4" transform="rotate(-20,15,4)"/>
      <use href="#leaf" x="28" y="6" transform="rotate(15,28,6)"/>
      <use href="#leaf" x="42" y="4" transform="rotate(-25,42,4)"/>
      <use href="#leaf" x="58" y="6" transform="rotate(20,58,6)"/>
      <use href="#leaf" x="72" y="4" transform="rotate(-15,72,4)"/>
      <use href="#leaf" x="85" y="6" transform="rotate(10,85,6)"/>
      <!-- Bottom vine -->
      <line x1="10" y1="95" x2="90" y2="95" stroke="#22c55e" stroke-width="0.8" opacity="0.5"/>
      <use href="#leaf" x="18" y="96" transform="rotate(160,18,96)"/>
      <use href="#leaf" x="35" y="94" transform="rotate(-160,35,94)"/>
      <use href="#leaf" x="50" y="96" transform="rotate(170,50,96)"/>
      <use href="#leaf" x="65" y="94" transform="rotate(-170,65,94)"/>
      <use href="#leaf" x="82" y="96" transform="rotate(155,82,96)"/>
      <!-- Left vine -->
      <line x1="5" y1="10" x2="5" y2="90" stroke="#22c55e" stroke-width="0.8" opacity="0.5"/>
      <use href="#leaf" x="4" y="20" transform="rotate(-70,4,20)"/>
      <use href="#leaf" x="6" y="40" transform="rotate(70,6,40)"/>
      <use href="#leaf" x="4" y="60" transform="rotate(-70,4,60)"/>
      <use href="#leaf" x="6" y="80" transform="rotate(70,6,80)"/>
      <!-- Right vine -->
      <line x1="95" y1="10" x2="95" y2="90" stroke="#22c55e" stroke-width="0.8" opacity="0.5"/>
      <use href="#leaf" x="96" y="25" transform="rotate(110,96,25)"/>
      <use href="#leaf" x="94" y="50" transform="rotate(-110,94,50)"/>
      <use href="#leaf" x="96" y="75" transform="rotate(110,96,75)"/>`,
  },
  {
    id: "vintage-ornament",
    label: "Vintage",
    category: "decorative",
    previewBg: "#d4a853",
    svg: `<rect x="3" y="3" width="94" height="94" fill="none" stroke="#d4a853" stroke-width="1.5" opacity="0.7"/>
      <rect x="5.5" y="5.5" width="89" height="89" fill="none" stroke="#d4a853" stroke-width="0.7" opacity="0.5"/>
      <!-- Corner ornaments -->
      <g fill="#d4a853" opacity="0.8">
        <circle cx="3" cy="3" r="2"/><circle cx="97" cy="3" r="2"/>
        <circle cx="3" cy="97" r="2"/><circle cx="97" cy="97" r="2"/>
        <!-- Swirls TL -->
        <path d="M8,3 Q12,3 12,7 Q12,3 16,3" fill="none" stroke="#d4a853" stroke-width="0.8"/>
        <path d="M3,8 Q3,12 7,12 Q3,12 3,16" fill="none" stroke="#d4a853" stroke-width="0.8"/>
        <!-- TR -->
        <path d="M92,3 Q88,3 88,7 Q88,3 84,3" fill="none" stroke="#d4a853" stroke-width="0.8"/>
        <path d="M97,8 Q97,12 93,12 Q97,12 97,16" fill="none" stroke="#d4a853" stroke-width="0.8"/>
        <!-- BL -->
        <path d="M8,97 Q12,97 12,93 Q12,97 16,97" fill="none" stroke="#d4a853" stroke-width="0.8"/>
        <path d="M3,92 Q3,88 7,88 Q3,88 3,84" fill="none" stroke="#d4a853" stroke-width="0.8"/>
        <!-- BR -->
        <path d="M92,97 Q88,97 88,93 Q88,97 84,97" fill="none" stroke="#d4a853" stroke-width="0.8"/>
        <path d="M97,92 Q97,88 93,88 Q97,88 97,84" fill="none" stroke="#d4a853" stroke-width="0.8"/>
      </g>`,
  },
  {
    id: "polaroid",
    label: "Polaroid",
    category: "decorative",
    previewBg: "#ffffff",
    svg: `<rect x="0" y="0" width="100" height="100" fill="#fff" opacity="0.95"/>
      <rect x="4" y="3" width="92" height="78" fill="none" stroke="#e5e5e5" stroke-width="0.3"/>
      <!-- "cut out" the photo area by covering the border area -->
      <rect x="4" y="3" width="92" height="78" fill="black" opacity="1"/>`,
  },

  // ── Fun ──
  {
    id: "hearts",
    label: "Hearts",
    category: "fun",
    previewBg: "#ef4444",
    svg: `<defs><path id="h" d="M0,-3 C-1.5,-6 -6,-6 -6,-2 C-6,1.5 0,5 0,5 C0,5 6,1.5 6,-2 C6,-6 1.5,-6 0,-3Z" fill="#ef4444"/></defs>
      <use href="#h" x="8" y="7" transform="scale(0.5)" opacity="0.8"/>
      <use href="#h" x="25" y="4" transform="scale(0.4)" opacity="0.7"/>
      <use href="#h" x="50" y="5" transform="scale(0.55)" opacity="0.85"/>
      <use href="#h" x="75" y="4" transform="scale(0.4)" opacity="0.7"/>
      <use href="#h" x="92" y="7" transform="scale(0.5)" opacity="0.8"/>
      <use href="#h" x="5" y="50" transform="scale(0.35)" opacity="0.6"/>
      <use href="#h" x="95" y="45" transform="scale(0.35)" opacity="0.6"/>
      <use href="#h" x="5" y="70" transform="scale(0.35)" opacity="0.6"/>
      <use href="#h" x="95" y="70" transform="scale(0.35)" opacity="0.6"/>
      <use href="#h" x="10" y="93" transform="scale(0.5)" opacity="0.8"/>
      <use href="#h" x="30" y="95" transform="scale(0.4)" opacity="0.7"/>
      <use href="#h" x="50" y="94" transform="scale(0.5)" opacity="0.85"/>
      <use href="#h" x="70" y="95" transform="scale(0.4)" opacity="0.7"/>
      <use href="#h" x="90" y="93" transform="scale(0.5)" opacity="0.8"/>`,
  },
  {
    id: "stars",
    label: "Stars",
    category: "fun",
    previewBg: "#fbbf24",
    svg: `<defs><polygon id="s" points="0,-4 1.2,-1.2 4,-1.5 2,0.8 2.5,4 0,2.5 -2.5,4 -2,0.8 -4,-1.5 -1.2,-1.2" fill="#fbbf24"/></defs>
      <use href="#s" x="8" y="8" opacity="0.9"/>
      <use href="#s" x="25" y="5" opacity="0.7" transform="scale(0.7)"/>
      <use href="#s" x="50" y="6" opacity="0.85"/>
      <use href="#s" x="75" y="5" opacity="0.7" transform="scale(0.7)"/>
      <use href="#s" x="92" y="8" opacity="0.9"/>
      <use href="#s" x="4" y="30" opacity="0.6" transform="scale(0.6)"/>
      <use href="#s" x="96" y="35" opacity="0.6" transform="scale(0.6)"/>
      <use href="#s" x="4" y="65" opacity="0.6" transform="scale(0.6)"/>
      <use href="#s" x="96" y="70" opacity="0.6" transform="scale(0.6)"/>
      <use href="#s" x="8" y="92" opacity="0.9"/>
      <use href="#s" x="35" y="95" opacity="0.7" transform="scale(0.7)"/>
      <use href="#s" x="55" y="93" opacity="0.85"/>
      <use href="#s" x="75" y="95" opacity="0.7" transform="scale(0.7)"/>
      <use href="#s" x="92" y="92" opacity="0.9"/>`,
  },
  {
    id: "confetti",
    label: "Confetti",
    category: "fun",
    previewBg: "#818cf8",
    svg: `<rect x="8" y="3" width="3" height="1.5" rx="0.5" fill="#ef4444" opacity="0.8" transform="rotate(25,9,3)"/>
      <rect x="20" y="5" width="2.5" height="1.2" rx="0.5" fill="#fbbf24" opacity="0.75" transform="rotate(-15,21,5)"/>
      <rect x="35" y="2" width="3" height="1.5" rx="0.5" fill="#22c55e" opacity="0.8" transform="rotate(40,36,2)"/>
      <rect x="52" y="4" width="2.5" height="1.2" rx="0.5" fill="#818cf8" opacity="0.75" transform="rotate(-30,53,4)"/>
      <rect x="68" y="3" width="3" height="1.5" rx="0.5" fill="#ec4899" opacity="0.8" transform="rotate(20,69,3)"/>
      <rect x="82" y="5" width="2.5" height="1.2" rx="0.5" fill="#0ea5e9" opacity="0.75" transform="rotate(-25,83,5)"/>
      <circle cx="15" cy="4" r="1" fill="#f97316" opacity="0.7"/>
      <circle cx="45" cy="3" r="1.2" fill="#a855f7" opacity="0.7"/>
      <circle cx="75" cy="4" r="1" fill="#22c55e" opacity="0.7"/>
      <circle cx="90" cy="3" r="0.8" fill="#ef4444" opacity="0.65"/>
      <!-- Bottom confetti -->
      <rect x="12" y="95" width="3" height="1.5" rx="0.5" fill="#0ea5e9" opacity="0.8" transform="rotate(-20,13,95)"/>
      <rect x="28" y="97" width="2.5" height="1.2" rx="0.5" fill="#ef4444" opacity="0.75" transform="rotate(30,29,97)"/>
      <rect x="45" y="96" width="3" height="1.5" rx="0.5" fill="#fbbf24" opacity="0.8" transform="rotate(-35,46,96)"/>
      <rect x="60" y="97" width="2.5" height="1.2" rx="0.5" fill="#22c55e" opacity="0.75" transform="rotate(15,61,97)"/>
      <rect x="78" y="96" width="3" height="1.5" rx="0.5" fill="#ec4899" opacity="0.8" transform="rotate(-25,79,96)"/>
      <rect x="92" y="97" width="2.5" height="1.2" rx="0.5" fill="#818cf8" opacity="0.75" transform="rotate(20,93,97)"/>
      <circle cx="5" cy="96" r="1" fill="#fbbf24" opacity="0.7"/>
      <circle cx="38" cy="97" r="1.2" fill="#ec4899" opacity="0.7"/>
      <circle cx="70" cy="96" r="1" fill="#a855f7" opacity="0.7"/>
      <!-- Side confetti -->
      <rect x="2" y="20" width="2" height="1" rx="0.4" fill="#ef4444" opacity="0.6" transform="rotate(45,3,20)"/>
      <rect x="2" y="50" width="2" height="1" rx="0.4" fill="#22c55e" opacity="0.6" transform="rotate(-30,3,50)"/>
      <rect x="2" y="80" width="2" height="1" rx="0.4" fill="#818cf8" opacity="0.6" transform="rotate(35,3,80)"/>
      <rect x="97" y="25" width="2" height="1" rx="0.4" fill="#fbbf24" opacity="0.6" transform="rotate(-40,98,25)"/>
      <rect x="97" y="55" width="2" height="1" rx="0.4" fill="#ec4899" opacity="0.6" transform="rotate(25,98,55)"/>
      <rect x="97" y="82" width="2" height="1" rx="0.4" fill="#0ea5e9" opacity="0.6" transform="rotate(-35,98,82)"/>`,
  },
  {
    id: "film-strip",
    label: "Film",
    category: "fun",
    previewBg: "#333",
    svg: `<rect x="0" y="0" width="100" height="8" fill="#1a1a1a"/>
      <rect x="0" y="92" width="100" height="8" fill="#1a1a1a"/>
      ${Array.from({length:10},(_,i)=>`<rect x="${4+i*10}" y="2" width="5" height="4" rx="0.8" fill="#444"/>`).join("")}
      ${Array.from({length:10},(_,i)=>`<rect x="${4+i*10}" y="94" width="5" height="4" rx="0.8" fill="#444"/>`).join("")}`,
  },
  {
    id: "sparkle",
    label: "Sparkle",
    category: "fun",
    previewBg: "#fde68a",
    svg: `<defs><g id="sp"><path d="M0,-3 L0.6,-0.6 L3,0 L0.6,0.6 L0,3 L-0.6,0.6 L-3,0 L-0.6,-0.6Z" fill="#fde68a"/></g></defs>
      <use href="#sp" x="6" y="6" opacity="0.9"/>
      <use href="#sp" x="20" y="3" opacity="0.6" transform="scale(0.6)"/>
      <use href="#sp" x="40" y="5" opacity="0.8" transform="scale(0.8)"/>
      <use href="#sp" x="65" y="3" opacity="0.6" transform="scale(0.7)"/>
      <use href="#sp" x="85" y="6" opacity="0.9" transform="scale(0.9)"/>
      <use href="#sp" x="94" y="4" opacity="0.7" transform="scale(0.5)"/>
      <use href="#sp" x="3" y="25" opacity="0.5" transform="scale(0.5)"/>
      <use href="#sp" x="97" y="30" opacity="0.5" transform="scale(0.5)"/>
      <use href="#sp" x="3" y="55" opacity="0.5" transform="scale(0.6)"/>
      <use href="#sp" x="97" y="60" opacity="0.5" transform="scale(0.5)"/>
      <use href="#sp" x="3" y="80" opacity="0.5" transform="scale(0.5)"/>
      <use href="#sp" x="97" y="85" opacity="0.5" transform="scale(0.6)"/>
      <use href="#sp" x="8" y="94" opacity="0.9"/>
      <use href="#sp" x="30" y="96" opacity="0.7" transform="scale(0.7)"/>
      <use href="#sp" x="50" y="94" opacity="0.8" transform="scale(0.8)"/>
      <use href="#sp" x="70" y="96" opacity="0.7" transform="scale(0.6)"/>
      <use href="#sp" x="92" y="94" opacity="0.9"/>`,
  },
];

/**
 * Wraps SVG inner content into a full SVG string at the given pixel dimensions.
 */
export function buildSvgString(border: BorderDef, w: number, h: number): string {
  if (!border.svg) return "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${w}" height="${h}" preserveAspectRatio="none">${border.svg}</svg>`;
}

/**
 * Converts an SVG string into an HTMLImageElement for canvas drawing.
 */
export function svgToImage(svgStr: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = reject;
    img.src = url;
  });
}
