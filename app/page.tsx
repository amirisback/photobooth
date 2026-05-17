"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  Upload,
  Wand2,
  Type,
  Sparkles,
  ImageOff,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: ImageOff,
    title: "Background Removal",
    desc: "AI-powered background removal right in your browser. No uploads needed.",
    color: "#a855f7",
  },
  {
    icon: Type,
    title: "Text Overlays",
    desc: "Add custom text with fonts, colors, and drag-to-position.",
    color: "#ec4899",
  },
  {
    icon: Sparkles,
    title: "Photo Effects",
    desc: "Vintage, dramatic, warm, cool — one tap to transform your photo.",
    color: "#f97316",
  },
];

export default function HomePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTakePhoto = () => {
    router.push("/camera");
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result as string;
      sessionStorage.setItem("photobooth_image", dataURL);
      router.push("/editor");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-1 flex-col items-center relative overflow-hidden">
      {/* ── Animated Background ──────────────────────────────────────── */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-spin-slow"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(168,85,247,0.08) 25%, transparent 50%, rgba(236,72,153,0.08) 75%, transparent 100%)",
          }}
        />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-accent-1/10 blur-[100px] animate-float" />
        <div
          className="absolute bottom-40 left-10 w-56 h-56 rounded-full bg-accent-2/10 blur-[80px] animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full bg-accent-3/8 blur-[60px] animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <main className="flex flex-1 flex-col items-center justify-center w-full max-w-xl px-6 py-12 gap-8 animate-fadeIn">
        {/* Logo / Title */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-1 via-accent-2 to-accent-3 shadow-lg animate-pulseGlow">
            <Wand2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight gradient-text mt-4">
            PhotoBooth Pro
          </h1>
          <p className="text-text-muted text-lg max-w-xs">
            Remove backgrounds, add text & effects — all in your browser.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <button
            id="btn-take-photo"
            onClick={handleTakePhoto}
            className="btn-primary flex-1"
          >
            <Camera className="w-5 h-5" />
            Take a Photo
          </button>
          <button
            id="btn-upload"
            onClick={handleUpload}
            className="btn-secondary flex-1"
          >
            <Upload className="w-5 h-5" />
            Upload Photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-input"
          />
        </div>

        {/* Feature Cards */}
        <div className="flex flex-col gap-4 w-full mt-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass flex items-center gap-4 p-5 group cursor-default animate-fadeInUp"
              style={{ animationDelay: `${0.15 * (i + 1)}s`, animationFillMode: "both" }}
            >
              <div
                className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                style={{ background: `${f.color}22` }}
              >
                <f.icon className="w-6 h-6" style={{ color: f.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base">{f.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-foreground transition-colors shrink-0" />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-text-muted text-xs safe-bottom">
        Built with Next.js • Works on Android & iOS
      </footer>
    </div>
  );
}
