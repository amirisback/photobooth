"use client";

import { motion } from "framer-motion";
import { CameraSection } from "@/components/sections/CameraSection";
import { RedBand } from "@/components/ui/RedBand";
import { Badge } from "@/components/ui/Badge";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function BoothPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Booth Header */}
      <section className="bg-surface-charcoal pt-32 pb-16 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 translate-x-1/2" />
        
        <div className="container-content relative z-10">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-micro">Kembali ke Beranda</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outlined" className="mb-4 border-white/30 text-white/80">
              MILESTONE 2
            </Badge>
            <h1 className="text-display-lg text-white tracking-tighter leading-none mb-6">
              PHOTO.<br />STUDIO.
            </h1>
            <p className="text-lead text-white/70 max-w-xl">
              Abadikan momen spesial Anda dengan kualitas premium. Pastikan pencahayaan Anda optimal untuk hasil terbaik.
            </p>
          </motion.div>
        </div>
      </section>

      <RedBand />

      {/* Camera Preview Section */}
      <CameraSection />

      {/* Footer Info */}
      <section className="py-20 bg-surface-neutral/5 border-t border-surface-neutral">
        <div className="container-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-h2-bold text-text-headline mb-6 tracking-tighter uppercase">
                Siap Beraksi?
              </h2>
              <p className="text-body-lg text-text-body mb-8">
                Gunakan tombol rana di layar untuk mengambil foto. Anda dapat beralih antara kamera depan dan belakang jika menggunakan perangkat seluler.
              </p>
            </div>
            <div className="bg-surface-charcoal p-8 rounded-tr-[40px] text-white">
              <h3 className="text-h4-bold mb-4 uppercase">Status Sistem</h3>
              <ul className="space-y-4">
                <li className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-caption text-white/60">Akses Kamera</span>
                  <span className="text-micro text-green-500 font-bold">Aktif</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-caption text-white/60">Resolusi</span>
                  <span className="text-micro text-white">Full HD (1080p)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-caption text-white/60">Mode</span>
                  <span className="text-micro text-white">Live Stream</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
