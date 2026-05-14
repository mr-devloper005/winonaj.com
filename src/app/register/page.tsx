'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bookmark, Building2, FileText, Image as ImageIcon, Sparkles, Wand2 } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'

function getRegisterConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#f8fbff] text-slate-950',
      panel: 'border border-slate-200 bg-white',
      side: 'border border-slate-200 bg-slate-50',
      glow: 'from-slate-100/90 via-white to-slate-50/90',
      muted: 'text-slate-600',
      action: 'bg-slate-950 text-white hover:bg-slate-800',
      icon: Building2,
      eyebrow: 'Business onboarding',
      title: 'Create your business account in minutes',
      body: 'Set up your public profile, connect local trust signals, and publish your first listing fast.',
      highlights: ['One profile for every location', 'Easy verification-ready fields', 'Discovery-friendly defaults'],
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#fbf6ee] text-[#241711]',
      panel: 'border border-[#dcc8b7] bg-[#fffdfa]',
      side: 'border border-[#e6d6c8] bg-[#fff4e8]',
      glow: 'from-[#f8eadb] via-[#fffaf4] to-[#fff4e8]',
      muted: 'text-[#6e5547]',
      action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
      icon: FileText,
      eyebrow: 'Writer onboarding',
      title: 'Create your contributor workspace',
      body: 'Launch your profile, set your voice, and start drafting with an editorial-first layout.',
      highlights: ['Contributor profile builder', 'Issue and draft organization', 'Publication role setup'],
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6',
      side: 'border border-white/10 bg-white/5',
      glow: 'from-[#132542] via-[#0a162a] to-[#07101f]',
      muted: 'text-slate-300',
      action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
      icon: ImageIcon,
      eyebrow: 'Creator onboarding',
      title: 'Build your visual creator account',
      body: 'Open your portfolio workspace, define your style, and start publishing high-impact visuals.',
      highlights: ['Style-first creator profile', 'Gallery publishing pipeline', 'Share-ready identity surfaces'],
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    side: 'border border-[#e8dbce] bg-[#f3e8db]',
    glow: 'from-[#f3e8db] via-[#fff7ef] to-[#f9efe3]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    icon: Bookmark,
    eyebrow: 'Curator onboarding',
    title: 'Create your collection-focused account',
    body: 'Organize saved links, build themed collections, and make your research easy to revisit.',
    highlights: ['Collection-first dashboard', 'Readable board structure', 'Sharable curations'],
  }
}

export default function RegisterPage() {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = useMemo(() => getRegisterConfig(productKind), [productKind])
  const Icon = config.icon
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [focus, setFocus] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await signup(name, email, password)
    router.push('/')
  }

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className={`relative overflow-hidden rounded-[2.25rem] border border-current/10 bg-gradient-to-br ${config.glow}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.42),transparent_46%)]" />
          <div className="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_1fr] lg:p-10">
            <div className={`rounded-[1.8rem] border border-current/10 p-7 backdrop-blur-sm ${config.side}`}>
              <div className="inline-flex items-center gap-2 rounded-full border border-current/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
                <Icon className="h-3.5 w-3.5" />
                {config.eyebrow}
              </div>
              <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{config.title}</h1>
              <p className={`mt-4 text-sm leading-7 ${config.muted}`}>{config.body}</p>
              <div className="mt-8 grid gap-3">
                {config.highlights.map((item) => (
                  <div key={item} className="rounded-2xl border border-current/10 bg-white/40 px-4 py-3 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-[1.8rem] p-7 sm:p-8 ${config.panel}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Create account</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">Start with a clean workspace</h2>
              <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
                <input
                  className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm outline-none ring-[#AE2448]/20 transition focus:ring-2"
                  placeholder="Full name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
                <input
                  className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm outline-none ring-[#AE2448]/20 transition focus:ring-2"
                  placeholder="Email address"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <input
                  className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm outline-none ring-[#AE2448]/20 transition focus:ring-2"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <input
                  className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm outline-none ring-[#AE2448]/20 transition focus:ring-2"
                  placeholder="What will you create first?"
                  value={focus}
                  onChange={(event) => setFocus(event.target.value)}
                />
                <Button type="submit" disabled={isLoading} className={`mt-2 inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold ${config.action}`}>
                  {isLoading ? 'Creating account...' : 'Create account'}
                </Button>
              </form>
              <div className={`mt-6 flex items-center justify-between text-sm ${config.muted}`}>
                <span>Already have an account?</span>
                <Link href="/login" className="inline-flex items-center gap-2 font-semibold hover:underline">
                  <Sparkles className="h-4 w-4" />
                  Sign in
                </Link>
              </div>
              <div className="mt-6 flex items-start gap-2 rounded-2xl border border-current/10 bg-white/45 p-4">
                <Wand2 className="mt-0.5 h-4 w-4 shrink-0" />
                <p className={`text-xs leading-6 ${config.muted}`}>Your account opens with fresh starter content and guided setup blocks so you can publish faster from day one.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
