import sanitizeHtml from 'sanitize-html'

const allowedTags = [
  'p',
  'h2',
  'h3',
  'strong',
  'em',
  'a',
  'ul',
  'ol',
  'li',
  'blockquote',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td',
  'br',
  'hr',
  'pre',
  'code',
  'img',
  'figure',
  'figcaption',
]

function isAllowedImageSource(source: string | undefined): boolean {
  if (!source) return false
  if (/^\/images\//.test(source)) return true

  const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL
  if (!publicBaseUrl) return false
  try {
    const sourceUrl = new URL(source)
    const mediaUrl = new URL(publicBaseUrl)
    return sourceUrl.protocol === 'https:' && sourceUrl.origin === mediaUrl.origin
  } catch {
    return false
  }
}

export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags,
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      h2: ['id'],
      h3: ['id'],
      th: ['colspan', 'rowspan', 'scope'],
      td: ['colspan', 'rowspan'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: {
      img: ['http', 'https'],
    },
    allowProtocolRelative: false,
    disallowedTagsMode: 'discard',
    enforceHtmlBoundary: true,
    exclusiveFilter: (frame) => frame.tag === 'img' && !isAllowedImageSource(frame.attribs.src?.trim()),
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          ...(attribs.target === '_blank' && { rel: 'noopener noreferrer' }),
        },
      }),
      img: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, loading: attribs.loading || 'lazy' },
      }),
    },
  })
}

export function hasMeaningfulArticleContent(html: string): boolean {
  const sanitized = sanitizeArticleHtml(html)
  const text = sanitizeHtml(sanitized, {
    allowedTags: [],
    allowedAttributes: {},
  }).replace(/[\p{Cf}\p{M}\u00a0]/gu, ' ').trim()

  return text.length > 0 || /<img\b[^>]*\bsrc=["'][^"'\s][^"']*["']/.test(sanitized)
}