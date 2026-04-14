'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Search,
  Menu,
  X,
  Home,
  FileText,
  LayoutGrid,
  Plus,
  LogIn,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'

const NavbarAuthControls = dynamic(
  () => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls),
  { ssr: false, loading: () => null }
)

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: FileText,
  sbm: LayoutGrid,
  classified: FileText,
  image: FileText,
  profile: FileText,
  social: LayoutGrid,
  pdf: FileText,
  org: FileText,
  comment: FileText,
}

const railLinkBase =
  'group flex flex-col items-center gap-1 rounded-2xl px-2 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors md:px-1'

export function NavbarArticleHome() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  const navigation = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile'),
    []
  )
  const primaryNavigation = navigation.slice(0, 6)
  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))
  const primaryTask = SITE_CONFIG.tasks.find((t) => t.enabled) || primaryNavigation[0]

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <>
      {/* Desktop / tablet: left rail */}
      <aside
        className="fixed inset-y-0 left-0 z-50 hidden w-[var(--site-nav-rail-width,5.5rem)] flex-col border-r border-[#333F44]/80 bg-[#1A1A1B] py-5 shadow-[4px_0_24px_rgba(0,0,0,0.12)] md:flex"
        aria-label="Primary navigation"
      >
        <Link href="/" className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#333F44]/60 p-1.5 transition hover:border-[#37AA9C]/50">
          <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} home`} width="40" height="40" className="h-full w-full object-contain" />
        </Link>
        <p className="mx-auto mt-2 hidden max-w-[4.5rem] text-center text-[9px] font-semibold uppercase leading-tight tracking-[0.14em] text-[#94F3E4]/90 xl:block">
          {SITE_CONFIG.name}
        </p>

        <nav className="mt-8 flex flex-1 flex-col gap-1 overflow-y-auto px-1.5">
          <Link
            href="/"
            className={cn(
              railLinkBase,
              pathname === '/'
                ? 'bg-[#37AA9C]/25 text-[#94F3E4]'
                : 'text-[#94F3E4]/75 hover:bg-white/5 hover:text-[#94F3E4]'
            )}
          >
            <Home className="h-5 w-5 shrink-0" />
            <span className="leading-none">Home</span>
          </Link>
          {primaryNavigation.map((task) => {
            const Icon = taskIcons[task.key] || LayoutGrid
            const active = isActive(task.route)
            return (
              <Link
                key={task.key}
                href={task.route}
                className={cn(
                  railLinkBase,
                  active ? 'bg-[#37AA9C]/25 text-[#94F3E4]' : 'text-[#94F3E4]/75 hover:bg-white/5 hover:text-[#94F3E4]'
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="max-w-[4.25rem] text-center leading-tight">{task.label}</span>
              </Link>
            )
          })}
          <Link
            href="/search"
            className={cn(
              railLinkBase,
              pathname.startsWith('/search')
                ? 'bg-[#37AA9C]/25 text-[#94F3E4]'
                : 'text-[#94F3E4]/75 hover:bg-white/5 hover:text-[#94F3E4]'
            )}
          >
            <Search className="h-5 w-5 shrink-0" />
            <span className="leading-none">Search</span>
          </Link>
        </nav>

        <div className="mt-auto flex flex-col gap-2 border-t border-white/10 px-1.5 pt-4">
          {isAuthenticated ? (
            <div className="flex justify-center">
              <NavbarAuthControls />
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="h-auto rounded-2xl py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#94F3E4]/85 hover:bg-white/5 hover:text-[#94F3E4]"
              >
                <Link href="/login" className="flex flex-col items-center gap-1">
                  <LogIn className="h-5 w-5" />
                  Sign in
                </Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="rounded-2xl bg-[#37AA9C] py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#1A1A1B] hover:bg-[#94F3E4]"
              >
                <Link href="/register" className="flex flex-col items-center gap-1">
                  <Plus className="h-5 w-5" />
                  Join
                </Link>
              </Button>
            </>
          )}
        </div>
      </aside>

      {/* Mobile: bottom dock */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex h-[4rem] items-center justify-between gap-1 border-t border-[#333F44]/90 bg-[#1A1A1B]/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md md:hidden"
        aria-label="Mobile navigation"
      >
        <Link
          href="/"
          className={cn(
            'flex flex-1 flex-col items-center gap-0.5 text-[10px] font-semibold uppercase tracking-wide',
            pathname === '/' ? 'text-[#94F3E4]' : 'text-[#94F3E4]/55'
          )}
        >
          <Home className="h-5 w-5" />
          Home
        </Link>
        {primaryNavigation.slice(0, 2).map((task) => {
          const Icon = taskIcons[task.key] || LayoutGrid
          const active = isActive(task.route)
          return (
            <Link
              key={task.key}
              href={task.route}
              className={cn(
                'flex flex-1 flex-col items-center gap-0.5 text-[10px] font-semibold uppercase tracking-wide',
                active ? 'text-[#94F3E4]' : 'text-[#94F3E4]/55'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="line-clamp-1">{task.label}</span>
            </Link>
          )
        })}
        <Link
          href="/search"
          className={cn(
            'flex flex-1 flex-col items-center gap-0.5 text-[10px] font-semibold uppercase tracking-wide',
            pathname.startsWith('/search') ? 'text-[#94F3E4]' : 'text-[#94F3E4]/55'
          )}
        >
          <Search className="h-5 w-5" />
          Search
        </Link>
        <button
          type="button"
          className="flex flex-1 flex-col items-center gap-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#94F3E4]/55"
          onClick={() => setMobileOpen(true)}
          aria-expanded={mobileOpen}
        >
          <Menu className="h-5 w-5" />
          Menu
        </button>
      </nav>

      {/* Mobile full menu */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl border border-[#333F44] bg-[#1A1A1B] p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#37AA9C]">{siteContent.navbar.tagline}</p>
                <p className="mt-1 text-lg font-semibold text-[#94F3E4]">{SITE_CONFIG.name}</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full text-[#94F3E4]" onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-1">
              {mobileNavigation.map((item) => {
                const active = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors',
                      active ? 'bg-[#37AA9C]/20 text-[#94F3E4]' : 'text-[#94F3E4]/80 hover:bg-white/5'
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {item.name}
                  </Link>
                )
              })}
              <Link
                href="/search"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-[#94F3E4]/80 hover:bg-white/5"
              >
                <Search className="h-5 w-5" />
                Search the site
              </Link>
            </div>
            {!isAuthenticated ? (
              <div className="mt-6 flex gap-3 border-t border-white/10 pt-6">
                <Button variant="outline" className="flex-1 border-[#333F44] bg-transparent text-[#94F3E4]" asChild>
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    Sign in
                  </Link>
                </Button>
                <Button className="flex-1 bg-[#37AA9C] text-[#1A1A1B] hover:bg-[#94F3E4]" asChild>
                  <Link href="/register" onClick={() => setMobileOpen(false)}>
                    Get started
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="mt-6 border-t border-white/10 pt-6">
                <NavbarAuthControls />
              </div>
            )}
            {primaryTask ? (
              <Link
                href={primaryTask.route}
                onClick={() => setMobileOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-[#37AA9C]/40 py-3 text-sm font-semibold text-[#94F3E4]"
              >
                Open {primaryTask.label}
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
