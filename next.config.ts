import type { NextConfig } from 'next'
import { getRedirectEntries } from './lib/routing/public-routes'

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
  async redirects() {
    return getRedirectEntries().map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    }))
  },
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
