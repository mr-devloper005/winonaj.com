export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'winonaj',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Winonaj',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Independent reading & publishing',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'An article-first publication for long-form stories, analysis, and guides—designed for calm reading and clear discovery.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'winonaj.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://winonaj.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

