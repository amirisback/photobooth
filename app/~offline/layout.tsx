import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offline | Photobooth',
  description: 'Anda sedang offline. Silakan periksa koneksi internet Anda.',
};

export default function OfflineLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
