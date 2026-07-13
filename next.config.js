/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'wehoware-saas-storage.s3.ca-central-1.amazonaws.com' },
      { protocol: 'https', hostname: 'dealerpull.blob.core.windows.net' },
    ],
  },
};

export default nextConfig;
