"use client";

import { Button } from "@/components/ui/Button";
import { WifiOff } from "lucide-react";
import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="flex flex-col min-h-[70vh] items-center justify-center bg-surface-charcoal text-white px-4">
      <div className="text-center max-w-md mx-auto flex flex-col items-center">
        <div className="w-24 h-24 bg-surface-neutral/20 rounded-full flex items-center justify-center mb-8">
          <WifiOff className="w-12 h-12 text-white/50" />
        </div>
        
        <h1 className="text-display-sm tracking-tighter mb-4 text-white">
          KONEKSI<br/>TERPUTUS.
        </h1>
        
        <p className="text-lead text-white/70 mb-10">
          Sepertinya Anda sedang offline. Fitur aplikasi yang memerlukan internet tidak dapat diakses saat ini, namun Anda tetap dapat melihat galeri foto Anda.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button 
            variant="primary-pill" 
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto"
          >
            Coba Ulang
          </Button>
          <Link href="/gallery" className="w-full sm:w-auto">
            <Button variant="ghost-rect" className="w-full">
              Buka Galeri
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
