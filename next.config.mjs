/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Keep `next dev` output separate so a production build cannot replace
  // the webpack chunks currently being served to a development browser.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  images: { formats: ['image/avif', 'image/webp'] },
};

export default nextConfig;
