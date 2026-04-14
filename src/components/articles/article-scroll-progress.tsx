'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Fixed top reading progress bar driven by window scroll (CSS width only).
 */
export function ArticleScrollProgress({ useRailOffset = false }: { useRailOffset?: boolean }) {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const next = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0
      setPercent(next)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      className={cn(
        'article-scroll-progress pointer-events-none fixed left-0 top-0 z-[60] h-[3px] w-full',
        useRailOffset && 'md:left-[var(--site-nav-rail-width,5.5rem)] md:w-[calc(100%-var(--site-nav-rail-width,5.5rem))]'
      )}
      role="progressbar"
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full rounded-r-full bg-gradient-to-r from-[#37AA9C] to-[#94F3E4] shadow-[0_0_12px_rgba(55,170,156,0.35)] transition-[width] duration-150 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
