import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { InstallPrompt } from "@/components/ui/InstallPrompt";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://photobooth.amirisback.com'),
  title: {
    template: '%s | Photobooth',
    default: 'Photobooth - Ambil Foto Seru Langsung dari Browser',
  },
  description: 'Ciptakan kenangan digital yang tak terlupakan dengan satu klik. Pengalaman photobooth premium kini hadir di perangkat Anda.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Photobooth - Ambil Foto Seru Langsung dari Browser',
    description: 'Ciptakan kenangan digital yang tak terlupakan dengan satu klik. Pengalaman photobooth premium kini hadir di perangkat Anda.',
    url: '/',
    siteName: 'Photobooth',
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Photobooth Preview',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Photobooth - Ambil Foto Seru Langsung dari Browser',
    description: 'Ciptakan kenangan digital yang tak terlupakan dengan satu klik.',
    images: ['/images/hero.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Photobooth",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#e60000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Photobooth",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Amirisback",
                "url": "https://photobooth.amirisback.com"
              }
            })
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <InstallPrompt />
      </body>
    </html>
  );
}
