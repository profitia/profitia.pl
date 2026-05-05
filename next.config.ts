import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Serwuj landing page pod root /
      { source: '/', destination: '/landing/index.html' },
    ]
  },

  images: {
    remotePatterns: [],
  },
}

export default nextConfig
