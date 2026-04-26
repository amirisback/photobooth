import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mulai Photobooth - Capture & Edit Foto',
  description: 'Mulai sesi photobooth Anda sekarang. Ambil foto dengan kualitas premium langsung dari browser Anda tanpa perlu install aplikasi tambahan.',
  alternates: {
    canonical: '/booth',
  },
  openGraph: {
    title: 'Mulai Photobooth - Capture & Edit Foto',
    description: 'Mulai sesi photobooth Anda sekarang. Ambil foto dengan kualitas premium langsung dari browser Anda.',
    url: '/booth',
  },
  twitter: {
    title: 'Mulai Photobooth - Capture & Edit Foto',
    description: 'Mulai sesi photobooth Anda sekarang. Ambil foto dengan kualitas premium langsung dari browser Anda.',
  }
};

export default function BoothLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
