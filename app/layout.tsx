import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PhotoBooth Pro — Photo Editor",
  description:
    "Premium photobooth web app with background removal, text overlays, and stunning effects. Works on Android & iOS.",
  keywords: ["photobooth", "photo editor", "background removal", "photo effects"],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PhotoBooth Pro",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground no-select">
        {children}
      </body>
    </html>
  );
}
