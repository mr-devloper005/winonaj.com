import { ContentImage } from '@/components/shared/content-image'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink, FileText, Mail, MapPin, Tag } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import type { TaskKey } from '@/lib/site-config'
import { SITE_THEME } from '@/config/site.theme'
import { getFactoryState } from '@/design/factory/get-factory-state'

type ListingContent = {
  location?: string
  category?: string
  description?: string
  email?: string
}

const stripHtml = (value?: string | null) =>
  (value || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getExcerpt = (value?: string | null, maxLength = 140) => {
  const text = stripHtml(value)
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}…`
}

const getContent = (post: SitePost): ListingContent => {
  const content = post.content && typeof post.content === 'object' ? post.content : {}
  return content as ListingContent
}

const getImageUrl = (post: SitePost, content: ListingContent) => {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media[0]?.url
  if (mediaUrl) return mediaUrl

  const contentAny = content as Record<string, unknown>
  const contentImage = typeof contentAny.image === 'string' ? contentAny.image : null
  if (contentImage) return contentImage

  const contentImages = Array.isArray(contentAny.images) ? contentAny.images : []
  const firstImage = contentImages.find((value) => typeof value === 'string')
  if (firstImage) return firstImage as string

  const contentLogo = typeof contentAny.logo === 'string' ? contentAny.logo : null
  if (contentLogo) return contentLogo

  return '/placeholder.svg?height=640&width=960'
}

const cardStyles = {
  'listing-elevated': {
    frame: 'rounded-2xl border-0 bg-gradient-to-br from-white to-gray-50 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300',
    muted: 'text-gray-600',
    title: 'text-gray-900',
    badge: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
  },
  'editorial-feature': {
    frame: 'rounded-2xl border-0 bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ring-1 ring-gray-100 hover:ring-gray-200',
    muted: 'text-gray-500',
    title: 'text-gray-900',
    badge: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white',
  },
  'studio-panel': {
    frame: 'rounded-2xl border-0 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300',
    muted: 'text-slate-300',
    title: 'text-white',
    badge: 'bg-gradient-to-r from-pink-500 to-rose-600 text-white',
  },
  'catalog-grid': {
    frame: 'rounded-2xl border-0 bg-gradient-to-br from-amber-50 to-orange-50 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
    muted: 'text-amber-700',
    title: 'text-amber-900',
    badge: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white',
  },
} as const

const getVariantForTask = (taskKey: TaskKey) => SITE_THEME.cards[taskKey] || 'listing-elevated'

export function TaskPostCard({
  post,
  href,
  taskKey,
  compact,
}: {
  post: SitePost
  href: string
  taskKey?: TaskKey
  compact?: boolean
}) {
  const content = getContent(post)
  const image = getImageUrl(post, content)
  const rawCategory = content.category || post.tags?.[0] || 'Post'
  const normalizedCategory = normalizeCategory(rawCategory)
  const category = CATEGORY_OPTIONS.find((item) => item.slug === normalizedCategory)?.name || rawCategory
  const variant = taskKey || 'listing'
  const visualVariant = cardStyles[getVariantForTask(variant)]
  const isBookmarkVariant = variant === 'sbm' || variant === 'social'
  const imageAspect = variant === 'image' ? 'aspect-[4/5]' : variant === 'article' ? 'aspect-[16/10]' : variant === 'pdf' ? 'aspect-[4/5]' : variant === 'classified' ? 'aspect-[16/11]' : 'aspect-[4/3]'
  const altText = `${post.title} ${category} ${variant === 'listing' ? 'business listing' : variant} image`
  const imageSizes = variant === 'article' ? '(max-width: 640px) 90vw, (max-width: 1024px) 48vw, 420px' : variant === 'image' ? '(max-width: 640px) 82vw, (max-width: 1024px) 34vw, 320px' : '(max-width: 640px) 85vw, (max-width: 1024px) 42vw, 340px'

  const { recipe } = getFactoryState()
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'
  const isDirectorySurface = isDirectoryProduct && (variant === 'listing' || variant === 'classified' || variant === 'profile')

  if (isDirectorySurface) {
    const cardTone = recipe.brandPack === 'market-utility'
      ? {
          frame: 'rounded-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300',
          badge: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white',
          muted: 'text-green-700',
          title: 'text-green-900',
          cta: 'text-green-700',
        }
      : {
          frame: 'rounded-2xl border-0 bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300',
          badge: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white',
          muted: 'text-gray-600',
          title: 'text-gray-900',
          cta: 'text-gray-700',
        }

    return (
      <Link href={href} className={`group flex h-full flex-col overflow-hidden transition duration-300 ${cardTone.frame}`}>
        <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
          <ContentImage src={image} alt={altText} fill sizes={imageSizes} quality={75} className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" intrinsicWidth={960} intrinsicHeight={720} />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <span className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold shadow-md ${cardTone.badge}`}>
              <Tag className="h-3.5 w-3.5" />
              {category}
            </span>
            <span className="rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 text-xs font-semibold shadow-md text-gray-700">
              {variant === 'classified' ? 'Open now' : 'Verified'}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className={`line-clamp-2 text-xl font-semibold leading-snug ${cardTone.title}`}>{post.title}</h3>
            <ArrowUpRight className={`h-5 w-5 shrink-0 ${cardTone.muted}`} />
          </div>
          <p className={`mt-3 line-clamp-3 text-sm leading-7 ${cardTone.muted}`}>{getExcerpt(content.description || post.summary) || 'Explore this local listing.'}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs">
            {content.location ? <span className={`inline-flex items-center gap-1 ${cardTone.muted}`}><MapPin className="h-3.5 w-3.5" />{content.location}</span> : null}
            {content.email ? <span className={`inline-flex items-center gap-1 ${cardTone.muted}`}><Mail className="h-3.5 w-3.5" />{content.email}</span> : null}
          </div>
          <div className={`mt-auto pt-5 text-sm font-semibold ${cardTone.cta}`}>{variant === 'classified' ? 'View offer' : 'View details'}</div>
        </div>
      </Link>
    )
  }

  if (isBookmarkVariant) {
    return (
      <Link href={href} className={`group flex h-full flex-row items-start gap-4 overflow-hidden p-5 transition duration-300 ${visualVariant.frame}`}>
        <div className="mt-1 rounded-full bg-white/10 p-2.5 text-current transition group-hover:scale-105">
          <ExternalLink className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${visualVariant.badge}`}>
              <Tag className="h-3.5 w-3.5" />
              {category}
            </span>
            {content.location ? <span className={`inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><MapPin className="h-3.5 w-3.5" />{content.location}</span> : null}
          </div>
          <h3 className={`mt-3 line-clamp-2 text-lg font-semibold leading-snug group-hover:opacity-85 ${visualVariant.title}`}>{post.title}</h3>
          <p className={`mt-2 line-clamp-3 text-sm leading-7 ${visualVariant.muted}`}>{getExcerpt(content.description || post.summary, compact ? 120 : 180) || 'Explore this bookmark.'}</p>
          {content.email ? <div className={`mt-3 inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><Mail className="h-3.5 w-3.5" />{content.email}</div> : null}
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className={`group flex h-full flex-col overflow-hidden transition duration-300 ${visualVariant.frame}`}>
      <div className={`relative ${imageAspect} overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200`}>
        <ContentImage src={image} alt={altText} fill sizes={imageSizes} quality={75} className="object-cover transition-transform duration-500 group-hover:scale-[1.06]" intrinsicWidth={960} intrinsicHeight={720} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        <span className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold shadow-lg backdrop-blur-sm ${visualVariant.badge}`}>
          <Tag className="h-3.5 w-3.5" />
          {category}
        </span>
        {variant === 'pdf' && <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-4 py-2 text-xs font-semibold shadow-lg text-slate-900"><FileText className="h-3.5 w-3.5" />PDF</span>}
      </div>
      <div className={`flex flex-1 flex-col p-5 ${compact ? 'py-4' : ''}`}>
        <h3 className={`line-clamp-2 font-semibold leading-snug ${variant === 'article' ? 'text-[1.35rem]' : 'text-lg'} ${visualVariant.title}`}>{post.title}</h3>
        <p className={`mt-3 text-sm leading-7 ${variant === 'article' ? 'line-clamp-4' : 'line-clamp-3'} ${visualVariant.muted}`}>{getExcerpt(content.description || post.summary) || 'Explore this post.'}</p>
        <div className="mt-auto pt-4">
          {content.location && <div className={`inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><MapPin className="h-3.5 w-3.5" />{content.location}</div>}
          {content.email && <div className={`mt-2 inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><Mail className="h-3.5 w-3.5" />{content.email}</div>}
        </div>
      </div>
    </Link>
  )
}
