"use client";

import { useEffect, useState, useMemo } from "react";
import { getAllPhotos, deletePhoto, clearAllPhotos } from "@/lib/idb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Download, Share2, Trash2, Image as ImageIcon, Film } from "lucide-react";
import Link from "next/link";
import JSZip from "jszip";
import Image from "next/image";
import { Lightbox } from "@/components/gallery/Lightbox";

export interface PhotoData {
  id: string;
  blob: Blob;
  timestamp: number;
  filterId: string;
  frameId: string;
  url: string;
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [isBatchDownloading, setIsBatchDownloading] = useState(false);
  const [activePhoto, setActivePhoto] = useState<PhotoData | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      const data = await getAllPhotos();
      const photosWithUrls = data.map((p) => ({
        ...p,
        url: URL.createObjectURL(p.blob),
      }));
      setPhotos(photosWithUrls);
    };
    loadPhotos();

    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, []);

  const sortedPhotos = useMemo(() => {
    return [...photos].sort((a, b) => {
      if (sortOrder === "newest") return b.timestamp - a.timestamp;
      return a.timestamp - b.timestamp;
    });
  }, [photos, sortOrder]);

  const handleClearAll = async () => {
    if (confirm("Are you sure you want to delete all photos? This cannot be undone.")) {
      await clearAllPhotos();
      setPhotos([]);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this photo?")) {
      await deletePhoto(id);
      setPhotos(photos.filter((p) => p.id !== id));
      if (activePhoto?.id === id) setActivePhoto(null);
    }
  };

  const handleBatchDownload = async () => {
    if (photos.length === 0) return;
    setIsBatchDownloading(true);
    try {
      const zip = new JSZip();
      photos.forEach((photo, i) => {
        const date = new Date(photo.timestamp);
        const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}_${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}`;
        const filename = `photobooth_${dateString}_${i}.png`;
        zip.file(filename, photo.blob);
      });
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "photobooth_batch.zip";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Failed to batch download", e);
    }
    setIsBatchDownloading(false);
  };

  const handleGenerateStrip = async () => {
    if (photos.length === 0) return;
    const stripPhotos = sortedPhotos.slice(0, Math.min(4, sortedPhotos.length));
    
    // Load images
    const images = await Promise.all(stripPhotos.map(photo => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = photo.url;
      });
    }));

    if (images.length === 0) return;

    const width = images[0].width;
    const height = images[0].height;
    
    // Create canvas for strip: width + padding, total height + padding
    const padding = 20;
    const canvas = document.createElement('canvas');
    canvas.width = width + padding * 2;
    canvas.height = (height * images.length) + (padding * (images.length + 1));
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill background (white for strip)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw images
    images.forEach((img, i) => {
      ctx.drawImage(img, padding, padding + (i * (height + padding)), width, height);
    });

    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `photobooth_strip_${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface-charcoal text-white pt-24 pb-20">
      <div className="container-content">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <Badge variant="outlined" className="mb-4 border-white/30 text-white/80">
              MILESTONE 3
            </Badge>
            <h1 className="text-display-lg tracking-tighter leading-none mb-4">
              PHOTO.<br />GALLERY.
            </h1>
            <p className="text-lead text-white/70">
              Your captured moments, ready to download and share.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            {photos.length > 0 && (
              <>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                  className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-sm outline-none focus:border-primary"
                >
                  <option value="newest" className="text-black">Newest First</option>
                  <option value="oldest" className="text-black">Oldest First</option>
                </select>
                
                <Button 
                  variant="primary-pill" 
                  onClick={handleBatchDownload}
                  disabled={isBatchDownloading}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {isBatchDownloading ? "Zipping..." : "Download All"}
                </Button>

                <Button 
                  variant="primary-pill" 
                  onClick={handleGenerateStrip}
                  className="flex items-center gap-2 bg-black/50 text-white border-white/20 hover:bg-black/70"
                >
                  <Film className="w-4 h-4" />
                  Photo Strip
                </Button>

                <Button 
                  variant="glass-pill" 
                  onClick={handleClearAll}
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 border-red-500/30"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </Button>
              </>
            )}
          </div>
        </div>

        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-white/10 rounded-[40px] bg-white/5">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6">
              <ImageIcon className="w-12 h-12 text-white/40" />
            </div>
            <h2 className="text-h3-bold mb-4">Gallery is Empty</h2>
            <p className="text-text-body text-white/60 max-w-md mb-8">
              You haven't captured any photos yet. Head over to the booth to start taking some amazing shots!
            </p>
            <Link href="/booth">
              <Button variant="primary-pill">
                Mulai Photobooth
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedPhotos.map((photo) => (
              <div 
                key={photo.id} 
                className="group relative aspect-[3/4] bg-black/50 rounded-2xl overflow-hidden border border-white/10 cursor-pointer"
                onClick={() => setActivePhoto(photo)}
              >
                <Image 
                  src={photo.url} 
                  alt={`Captured at ${new Date(photo.timestamp).toLocaleString()}`} 
                  unoptimized
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-xs text-white/80 mb-2">
                    {new Date(photo.timestamp).toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="primary-pill" 
                      className="px-3 py-1.5 h-auto text-xs flex-1 flex items-center justify-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        const a = document.createElement("a");
                        a.href = photo.url;
                        const dateString = new Date(photo.timestamp).toISOString().replace(/[:.]/g, '-');
                        a.download = `photobooth_${dateString}.png`;
                        a.click();
                      }}
                    >
                      <Download className="w-3 h-3" /> Get
                    </Button>
                    <Button 
                      variant="glass-pill" 
                      className="px-3 py-1.5 h-auto text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePhoto(photo); // Lightbox will open share modal if we want
                      }}
                    >
                      <Share2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {activePhoto && (
        <Lightbox 
          photo={activePhoto} 
          onClose={() => setActivePhoto(null)} 
          onDelete={() => handleDelete(activePhoto.id)}
        />
      )}
    </div>
  );
}
