const LEGACY_LOCAL_COVER = /^(\/images\/blog\/[^/]+)\/cover\.(?:png|jpe?g)$/i

/**
 * Routes repository-backed legacy covers through their canonical WebP sibling.
 * Remote media and non-cover article images keep their original URL.
 */
export function getOptimizedArticleImageSrc(src: string | null | undefined): string | null {
  if (!src) return null
  return src.replace(LEGACY_LOCAL_COVER, '$1/cover.webp')
}
