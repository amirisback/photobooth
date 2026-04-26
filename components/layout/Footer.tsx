import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

const FOOTER_SECTIONS = [
  {
    title: "Vodafone Websites",
    links: [
      { label: "Business", href: "/business" },
      { label: "Foundation", href: "/foundation" },
      { label: "Careers", href: "/careers" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Accessibility", href: "/accessibility" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms & conditions", href: "/terms" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

/**
 * Institutional Footer Component
 * Background: Charcoal Institutional Panel (#25282b)
 */
export function Footer() {
  return (
    <footer className="bg-surface-charcoal text-white pt-20 pb-12">
      <div className="container-content">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-8">
              <h4 className="text-label text-white tracking-wider border-b border-white/10 pb-4">
                {section.title}
              </h4>
              <nav className="flex flex-col gap-4">
                {section.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-body-base text-white/60 hover:text-white transition-colors w-fit no-underline hover:underline decoration-primary decoration-2 underline-offset-8"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Social Row */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-10">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption-upper font-bold text-white/50 hover:text-primary transition-colors tracking-widest"
              >
                {social.label}
              </a>
            ))}
          </div>
          
          {/* Copyright & Logo */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex flex-col md:items-end gap-1">
              <span className="text-caption text-white/40">
                © 2026 Vodafone Group. All rights reserved.
              </span>
              <div className="flex gap-4 text-[10px] text-white/30 uppercase tracking-[0.2em]">
                <span>Privacy</span>
                <span>Terms</span>
                <span>Cookies</span>
              </div>
            </div>
            <Logo size={40} className="opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </footer>
  );
}
