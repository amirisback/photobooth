import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galeri Foto - Photobooth',
  description: 'Lihat dan kelola semua foto yang telah Anda ambil di Photobooth. Unduh, edit, atau bagikan momen spesial Anda dengan mudah.',
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Galeri Foto - Photobooth',
    description: 'Lihat dan kelola semua foto yang telah Anda ambil di Photobooth. Unduh, edit, atau bagikan momen spesial Anda.',
    url: '/gallery',
  },
  twitter: {
    title: 'Galeri Foto - Photobooth',
    description: 'Lihat dan kelola semua foto yang telah Anda ambil di Photobooth. Unduh, edit, atau bagikan momen spesial Anda.',
  }
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
