"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { RedBand } from "@/components/ui/RedBand";
import Link from "next/link";
import { FeatureSection } from "@/components/sections/FeatureSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-surface-charcoal overflow-hidden">
        {/* Hero Image - Using a dark atmospheric background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="Photobooth Atmospheric Background"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          {/* Subtle overlay for depth as per DESIGN.md */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-charcoal/20 to-surface-charcoal/60" />
        </div>
        
        <div className="container-content relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-display-xl text-white mb-8 tracking-tighter leading-[0.8]">
              MULAI.<br />PHOTOBOOTH.
            </h1>
            <p className="text-lead text-white/80 max-w-2xl mb-12 mx-auto">
              Ciptakan kenangan digital yang tak terlupakan dengan satu klik. Pengalaman photobooth premium kini hadir di perangkat Anda.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/booth" className="no-underline">
                <Button variant="primary-pill" className="px-10 py-5 h-auto text-lg">
                  Mulai Photobooth
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <RedBand />

      {/* Feature Highlights Section */}
      <FeatureSection />
      
      {/* Editorial Content Section - Asymmetric design as per DESIGN.md */}
      <section className="py-24 bg-surface-neutral/10">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-video rounded-tr-[40px] overflow-hidden border-4 border-white shadow-2xl"
              >
                <Image
                  src="/images/news-1.png"
                  alt="Quality Experience"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-h1-bold text-text-headline mb-6 tracking-tighter">PENGALAMAN PREMIUM.</h2>
                <p className="text-body-lg text-text-body mb-8">
                  Kami menggabungkan kemudahan teknologi digital dengan estetika photobooth klasik untuk memberikan hasil terbaik bagi setiap momen berharga Anda.
                </p>
                <Button variant="ghost-rect" className="px-8">Pelajari Selengkapnya</Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
