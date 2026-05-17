import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PhotoBooth Pro",
    short_name: "PhotoBooth",
    description: "Premium photo editor with background removal, text overlays, and effects",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a0a12",
    theme_color: "#0a0a12",
    icons: [
      {
        src: "/icon-192x192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        src: "/icon-512x512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
  };
}
