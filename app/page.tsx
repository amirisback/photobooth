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
            className="flex flex-col items-center text-center w-full gap-8"
          >
            <h1 className="text-display-xl text-white tracking-widest leading-snug text-center">
              PHOTOBOOTH.
            </h1>

            <p className="text-lead text-white/80 max-w-2xl mb-12 mx-auto">
              Ciptakan kenangan digital yang tak terlupakan dengan satu klik. Pengalaman photobooth premium kini hadir di perangkat Anda.
            </p>

            <Link href="/booth" className="no-underline">
              <Button variant="primary-pill" className="px-10 py-5 h-auto text-lg">
                Mulai Photobooth
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
