import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');

export const metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: 'Anuj — Full-Stack Developer & Data Scientist',
    template: '%s — Anuj',
  },
  description:
    'I build thoughtful digital products and turn complex data into clear decisions. Explore the work, experiments, and ideas of Anuj.',
  openGraph: {
    title: 'Anuj — Full-Stack Developer & Data Scientist',
    description: 'Thoughtful products. Useful data. A little bit of play.',
    ...(siteUrl ? { url: siteUrl } : {}),
    siteName: 'Anuj — Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anuj — Full-Stack Developer & Data Scientist',
    description: 'Thoughtful products. Useful data. A little bit of play.',
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#111110',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
