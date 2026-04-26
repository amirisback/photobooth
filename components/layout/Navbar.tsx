"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Company", href: "/company" },
  { label: "Investors", href: "/investors" },
  { label: "Sustainable Business", href: "/sustainability" },
  { label: "News", href: "/news" },
];

/**
 * Responsive Navigation Bar
 * Features: Scroll-based transparency, Mobile overlay menu
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex items-center",
          isScrolled 
            ? "bg-white h-[var(--nav-height-desktop)] shadow-md" 
            : "bg-transparent h-[80px]"
        )}
      >
        <div className="container-content w-full flex items-center justify-between">
          <Link href="/" className="flex items-center group transition-transform hover:scale-105">
            <Logo size={40} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-body-base font-bold transition-colors hover:text-primary relative py-1 no-underline",
                  isScrolled ? "text-text-headline" : "text-white",
                  pathname === link.href && "text-primary"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            ))}
            <Button 
              variant={isScrolled ? "primary-pill" : "glass-pill"}
              className="px-6 py-2 h-auto"
            >
              Contact Us
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden relative z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span 
                className={cn(
                  "block h-0.5 w-full transition-all duration-300 origin-left",
                  (isScrolled || isMobileMenuOpen) ? "bg-text-headline" : "bg-white",
                  isMobileMenuOpen && "rotate-45 translate-x-1"
                )} 
              />
              <span 
                className={cn(
                  "block h-0.5 w-full transition-all duration-300",
                  (isScrolled || isMobileMenuOpen) ? "bg-text-headline" : "bg-white",
                  isMobileMenuOpen && "opacity-0"
                )} 
              />
              <span 
                className={cn(
                  "block h-0.5 w-full transition-all duration-300 origin-left",
                  (isScrolled || isMobileMenuOpen) ? "bg-text-headline" : "bg-white",
                  isMobileMenuOpen && "-rotate-45 translate-x-1"
                )} 
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white lg:hidden overflow-hidden"
          >
            <nav className="h-full flex flex-col justify-center px-8 sm:px-12 gap-8">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[2rem] sm:text-[3rem] font-extrabold transition-colors hover:text-primary leading-tight no-underline"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <Button variant="primary-pill" className="w-full text-lg py-4">
                  Contact Us
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
