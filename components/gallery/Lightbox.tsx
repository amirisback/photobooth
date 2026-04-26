"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share2, Trash2, Copy, QrCode } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import { PhotoData } from "@/app/gallery/page";

interface LightboxProps {
  photo: PhotoData;
  onClose: () => void;
  onDelete: () => void;
}

export function Lightbox({ photo, onClose, onDelete }: LightboxProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  const getFilename = (ext: string) => {
    const d = new Date(photo.timestamp);
    const dateStr = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}_${d.getHours().toString().padStart(2, '0')}${d.getMinutes().toString().padStart(2, '0')}${d.getSeconds().toString().padStart(2, '0')}`;
    return `photobooth_${dateStr}.${ext}`;
  };

  const handleDownload = (format: 'png' | 'jpeg', quality?: number) => {
    if (format === 'png') {
      const a = document.createElement("a");
      a.href = photo.url;
      a.download = getFilename('png');
      a.click();
    } else {
      // Need to convert to JPEG
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg", quality || 0.8);
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = getFilename('jpeg');
        a.click();
      };
      img.src = photo.url;
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const file = new File([photo.blob], getFilename('png'), { type: 'image/png' });
        await navigator.share({
          title: 'My Photobooth Shot',
          text: 'Check out my awesome photo from Photobooth!',
          files: [file]
        });
      } catch (err) {
        console.log("Error sharing or cancelled", err);
        setShowShareModal(true); // Fallback
      }
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': photo.blob })
      ]);
      alert("Image copied to clipboard!");
    } catch (e) {
      alert("Failed to copy image.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full max-w-4xl max-h-[90vh] p-4 flex flex-col md:flex-row gap-8 items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative max-h-[80vh] flex-1 flex justify-center"
        >
          <Image 
            src={photo.url} 
            alt="Full screen view" 
            unoptimized
            fill
            className="object-contain rounded-lg shadow-2xl"
          />
        </motion.div>

        <div className="flex flex-col gap-4 w-full md:w-64">
          <div className="relative">
            <Button 
              variant="primary-pill" 
              className="w-full flex items-center justify-center gap-2 mb-2"
              onClick={() => setShowDownloadOptions(!showDownloadOptions)}
            >
              <Download className="w-4 h-4" /> Download
            </Button>
            
            <AnimatePresence>
              {showDownloadOptions && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 bg-white/10 border border-white/20 rounded-xl p-2 flex flex-col gap-1 z-20 backdrop-blur-md"
                >
                  <button onClick={() => handleDownload('png')} className="text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg">
                    PNG (Lossless, High Quality)
                  </button>
                  <button onClick={() => handleDownload('jpeg', 1.0)} className="text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg">
                    JPEG (100% Quality)
                  </button>
                  <button onClick={() => handleDownload('jpeg', 0.8)} className="text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg">
                    JPEG (80% Quality)
                  </button>
                  <button onClick={() => handleDownload('jpeg', 0.6)} className="text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg">
                    JPEG (60% Quality)
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button 
            variant="glass-pill" 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" /> Share
          </Button>

          <Button 
            variant="glass-pill" 
            className="w-full flex items-center justify-center gap-2 text-red-400 border-red-500/30 hover:text-red-300 hover:border-red-500/50"
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4" /> Delete
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showShareModal && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-charcoal p-6 rounded-2xl border border-white/20 shadow-2xl max-w-sm w-[90%] z-50"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-h4-bold text-white">Share Photo</h3>
              <button onClick={() => setShowShareModal(false)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <a 
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Check out my photobooth shot!')}`}
                target="_blank" rel="noreferrer"
                className="flex items-center gap-3 p-3 bg-[#25D366]/10 text-[#25D366] rounded-xl hover:bg-[#25D366]/20 transition-colors"
              >
                <Share2 className="w-5 h-5" /> WhatsApp
              </a>
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out my photobooth shot!')}`}
                target="_blank" rel="noreferrer"
                className="flex items-center gap-3 p-3 bg-[#1DA1F2]/10 text-[#1DA1F2] rounded-xl hover:bg-[#1DA1F2]/20 transition-colors"
              >
                <Share2 className="w-5 h-5" /> Twitter / X
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank" rel="noreferrer"
                className="flex items-center gap-3 p-3 bg-[#1877F2]/10 text-[#1877F2] rounded-xl hover:bg-[#1877F2]/20 transition-colors"
              >
                <Share2 className="w-5 h-5" /> Facebook
              </a>
              
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-3 p-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors"
              >
                <Copy className="w-5 h-5" /> Copy Image to Clipboard
              </button>

              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col items-center">
                <p className="text-sm text-white/60 mb-4">Scan QR to View Link</p>
                <div className="bg-white p-2 rounded-xl">
                  <QRCodeSVG value={window.location.href} size={150} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
