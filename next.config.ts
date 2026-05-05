import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // i18n handled via [lang] dynamic segment (App Router)
  // Middleware redirects / → /pl

  images: {
    remotePatterns: [],
  },

  // Future: enable when needed
  // experimental: {
  //   serverActions: true,
  // },
}

export default nextConfig
