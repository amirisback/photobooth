"use client";

import * as React from "react";
import { Camera, Wand2, Share2 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Camera & Capture",
    description: "Ambil foto berkualitas tinggi langsung dari browser Anda dengan kontrol kamera yang intuitif.",
    icon: Camera,
  },
  {
    title: "Filters & Effects",
    description: "Tingkatkan hasil foto Anda dengan berbagai filter estetik dan efek visual yang menarik.",
    icon: Wand2,
  },
  {
    title: "Download & Share",
    description: "Simpan kenangan Anda dalam sekejap atau bagikan langsung ke media sosial favorit Anda.",
    icon: Share2,
  },
];

export function FeatureSection() {
  return (
    <section className="section-spacing bg-surface-white">
      <div className="container-content">
        <div className="text-center mb-16">
          <h2 className="text-h1-light text-text-headline mb-4 uppercase tracking-tight">
            Fitur Utama Kami
          </h2>
          <p className="text-body-lg text-text-body max-w-2xl mx-auto">
            Temukan kemudahan dalam setiap jepretan dengan teknologi photobooth digital tercanggih.
          </p>
        </div>

        <div className="card-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center p-8 bg-surface-neutral/30 rounded-lg border border-surface-neutral hover:border-primary/20 transition-colors"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-primary text-white rounded-full mb-6">
                <feature.icon size={32} />
              </div>
              <h3 className="text-h3 text-text-headline mb-4">{feature.title}</h3>
              <p className="text-body-base text-text-body">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
