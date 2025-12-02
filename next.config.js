/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [],
  },
  // Enable React strict mode for better development
  reactStrictMode: true,
  // Optimize for production
  swcMinify: true,
  // Compress responses
  compress: true,
  // Generate standalone output for Vercel
  output: 'standalone',
}

module.exports = nextConfig
