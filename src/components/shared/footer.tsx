import Link from 'next/link'
import { FileText, Building2, LayoutGrid, Tag, Github, Twitter, Linkedin, Image as ImageIcon, User, ArrowRight, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'

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

const footerLinks = {
  platform: SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  })),
  company: [
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press', href: '/press' },
  ],
  resources: [
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
    { name: 'Developers', href: '/developers' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Licenses', href: '/licenses' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

export function Footer() {
  const { recipe } = getFactoryState()
  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]

  if (recipe.footer === 'minimal-footer') {
    return (
      <footer className="border-t border-slate-200/70 bg-slate-50/80 text-blue-950 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-lg font-semibold tracking-tight">{SITE_CONFIG.name}</p>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-600">{SITE_CONFIG.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {enabledTasks.slice(0, 5).map((task) => (
              <Link key={task.key} href={task.route} className="rounded-full border border-slate-200/90 bg-white px-4 py-2 text-sm font-medium text-blue-950 shadow-sm transition hover:border-slate-300 hover:shadow-md">
                {task.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'dense-footer') {
    return (
      <footer className="border-t border-slate-800/80 bg-gradient-to-b from-blue-950 via-blue-950 to-blue-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_1fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 p-1.5">
                  <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="text-lg font-semibold tracking-tight">{SITE_CONFIG.name}</p>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{siteContent.footer.tagline}</p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">{SITE_CONFIG.description}</p>
              {primaryTask ? (
                <Link href={primaryTask.route} className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-950 shadow-lg transition hover:bg-slate-100">
                  Explore {primaryTask.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Product</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  {footerLinks.platform.map((item: any) => (
                    <li key={item.name}><Link href={item.href} className="flex items-center gap-2 transition hover:text-white">{item.icon ? <item.icon className="h-4 w-4 opacity-70" /> : null}{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Resources</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  {footerLinks.resources.map((item) => (
                    <li key={item.name}><Link href={item.href} className="transition hover:text-white">{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Connect</h3>
                <div className="mt-4 flex gap-2">
                  {socialLinks.map((item) => (
                    <Link key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white">
                      <item.icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-500">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'editorial-footer') {
    return (
      <footer className="border-t border-slate-200/70 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/80 text-blue-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr_0.85fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                Platform
              </div>
              <h3 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">{SITE_CONFIG.name}</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">{SITE_CONFIG.description}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Product</h4>
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                {footerLinks.platform.map((item: any) => (
                  <li key={item.name}><Link href={item.href} className="transition hover:text-blue-950">{item.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Company</h4>
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                {footerLinks.company.map((item) => (
                  <li key={item.name}><Link href={item.href} className="transition hover:text-blue-950">{item.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-14 border-t border-slate-200/80 pt-6 text-center text-sm text-slate-500">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t border-slate-200/70 bg-gradient-to-b from-white to-slate-50/90 text-blue-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.25fr_0.75fr_0.75fr_0.75fr_0.75fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="h-11 w-11 overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-1 shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
                <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="44" height="44" className="h-full w-full object-contain" />
              </div>
              <div>
                <span className="block text-lg font-semibold tracking-tight">{SITE_CONFIG.name}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{siteContent.footer.tagline}</span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">{SITE_CONFIG.description}</p>
          </div>
          {(['platform', 'company', 'resources', 'legal'] as const).map((section) => (
            <div key={section}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{section}</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                {footerLinks[section].map((item: any) => (
                  <li key={item.name}><Link href={item.href} className="flex items-center gap-2 transition hover:text-blue-950">{item.icon ? <item.icon className="h-4 w-4 opacity-70" /> : null}{item.name}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 border-t border-slate-200/80 pt-6 text-center text-sm text-slate-500">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
      </div>
    </footer>
  )
}
