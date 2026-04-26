"use client";

import { useState, useEffect } from "react";
import { X, Download } from "lucide-react";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if prompt was dismissed in the last 24 hours
    const lastDismissed = localStorage.getItem("installPromptDismissed");
    if (lastDismissed) {
      const timeSinceDismissed = Date.now() - parseInt(lastDismissed, 10);
      if (timeSinceDismissed < 24 * 60 * 60 * 1000) {
        return; // Don't show if dismissed within 24 hours
      }
    }

    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("installPromptDismissed", Date.now().toString());
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-auto md:right-8 md:w-96 z-50 bg-surface-charcoal border border-white/20 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 text-white"
        >
          <button 
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div>
            <h3 className="text-h4-bold tracking-tight mb-2 pr-6">Install Photobooth</h3>
            <p className="text-body-sm text-white/70">
              Install aplikasi ini di perangkat Anda untuk akses cepat, pengalaman offline, dan performa yang lebih baik.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="primary-pill" 
              onClick={handleInstall}
              className="flex-1 flex justify-center items-center gap-2"
            >
              <Download className="w-4 h-4" /> Install
            </Button>
            <Button 
              variant="ghost-rect" 
              onClick={handleDismiss}
              className="px-4"
            >
              Nanti
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
