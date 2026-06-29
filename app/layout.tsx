import './globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Kennedy Auto Sales — Trusted Car Dealership in Scarborough, Ontario | New & Used Vehicles',
  description: 'Kennedy Auto Sales in Scarborough, Ontario — your trusted dealership for new and certified pre-owned vehicles. Browse inventory, get instant financing, trade-in valuation, and drive home today.',
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://wehoware-saas-storage.s3.ca-central-1.amazonaws.com" />
        <link rel="dns-prefetch" href="https://www.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
