"use client";

import React from "react";
import { motion } from "framer-motion";
import { RefreshCcw, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ResultPreviewProps {
  photos: string[];
  isMultiShot: boolean;
  onRetake: () => void;
  onContinue: () => void;
  onDownload: () => void;
}

export const ResultPreview: React.FC<ResultPreviewProps> = ({
  photos,
  isMultiShot,
  onRetake,
  onContinue,
  onDownload,
}) => {
  if (photos.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 z-40 bg-surface-charcoal flex flex-col"
    >
      <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
        {isMultiShot ? (
          <div className="grid gap-4 grid-cols-2 max-w-2xl mx-auto w-full">
            {photos.map((src, i) => (
              <div key={i} className="aspect-[3/4] relative bg-black rounded-lg overflow-hidden border-4 border-white shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Shot ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative w-full max-w-md aspect-[3/4] bg-black rounded-xl overflow-hidden border-4 border-white shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos[0]} alt="Captured result" className="w-full h-full object-contain" />
          </div>
        )}
      </div>

      <div className="bg-surface-charcoal border-t border-white/10 p-6 flex flex-wrap justify-center gap-4">
        <Button variant="ghost-rect" onClick={onRetake} className="gap-2 text-white border-white/20 hover:bg-white/10">
          <RefreshCcw className="w-4 h-4" />
          Retake
        </Button>
        <Button variant="ghost-rect" onClick={onDownload} className="gap-2 text-white border-white/20 hover:bg-white/10">
          <Download className="w-4 h-4" />
          Download
        </Button>
        <Button variant="primary-pill" onClick={onContinue} className="gap-2 px-8">
          Continue
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};
