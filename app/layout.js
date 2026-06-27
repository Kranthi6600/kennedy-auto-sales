import './globals.css';

export const metadata = {
  title: 'Kennedy Auto Sales — Trusted Car Dealership in Scarborough, Ontario | New & Used Vehicles',
  description: 'Kennedy Auto Sales in Scarborough, Ontario — your trusted dealership for new and certified pre-owned vehicles. Browse inventory, get instant financing, trade-in valuation, and drive home today.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
