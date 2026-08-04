import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HSK Review',
  description: 'Chinese HSK vocabulary review, day by day.',
  manifest: '/manifest.webmanifest',
  applicationName: 'HSK Review',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'HSK Review',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon.svg' }],
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#b21414',
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
