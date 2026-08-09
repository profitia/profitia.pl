import type { NextConfig } from 'next'

function configuredMediaPattern(): URL[] {
  const baseUrl = process.env.R2_PUBLIC_BASE_URL
  if (!baseUrl) return []
  try {
    const url = new URL(baseUrl)
    if (url.protocol !== 'https:') return []
    return [new URL(`${url.toString().replace(/\/$/, '')}/**`)]
  } catch {
    return []
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...configuredMediaPattern(),
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
