'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, LayoutGrid, LogOut, Plus, User, FileText, Building2, Tag, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

export function NavbarAuthControls({
  compact = false,
  showSignOut = true,
}: {
  compact?: boolean
  showSignOut?: boolean
}) {
  const { logout } = useAuth()
  const pathname = usePathname()
  const isArticlePage =
    pathname?.startsWith('/articles') ||
    pathname?.startsWith('/blog')

  return (
    <div className="flex items-center gap-2">
      {!compact ? (
        <div
          className={`pointer-events-none fixed right-5 z-50 hidden md:block ${
            isArticlePage ? 'bottom-24' : 'top-1/2 -translate-y-1/2'
          }`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="pointer-events-auto h-11 gap-1 rounded-full bg-[#AE2448] px-5 text-white shadow-[0_18px_36px_rgba(174,36,72,0.35)] hover:bg-[#8e1b3b]">
                <Plus className="h-4 w-4" />
                Create
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border-[rgba(110,26,55,0.12)] bg-[rgba(255,250,244,0.98)]">
              {SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                return (
                  <DropdownMenuItem key={task.key} asChild>
                    <Link href={`/create/${task.key}`}>
                      <Icon className="mr-2 h-4 w-4" />
                      Create {task.label}
                    </Link>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : null}

      {showSignOut ? (
        <Button
          onClick={logout}
          variant="outline"
          size="sm"
          className="h-10 shrink-0 rounded-full border-[rgba(110,26,55,0.2)] bg-[rgba(255,250,244,0.92)] px-4 text-[#5f4750] hover:bg-[rgba(110,26,55,0.06)] hover:text-[#8f1f3f]"
        >
          <LogOut className={compact ? 'h-4 w-4' : 'mr-2 h-4 w-4'} />
          {!compact ? 'Sign Out' : null}
          <span className="sr-only">Sign Out</span>
        </Button>
      ) : null}
    </div>
  )
}
