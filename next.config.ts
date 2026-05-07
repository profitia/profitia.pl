import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cipsdistancelearning.com',
      },
      {
        protocol: 'https',
        hostname: 'profitia.pl',
      },
    ],
  },
}

export default nextConfig
