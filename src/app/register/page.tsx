import Link from 'next/link'
import { Bookmark, Building2, FileText, Image as ImageIcon, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

function getRegisterConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      icon: Building2,
      title: 'Create a business-ready account',
      body: 'List services, manage locations, and activate trust signals with a directory workflow.',
    }
  }
  if (kind === 'editorial') {
    return {
      icon: FileText,
      title: 'Start your contributor workspace',
      body: 'Set up a profile for drafts, review, and publication scheduling.',
    }
  }
  if (kind === 'visual') {
    return {
      icon: ImageIcon,
      title: 'Set up your creator profile',
      body: 'Launch a visual-first account with gallery publishing and profile-led discovery.',
    }
  }
  return {
    icon: Bookmark,
    title: 'Create a curator account',
    body: 'Build shelves, save references, and connect collections to your profile.',
  }
}

export default function RegisterPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getRegisterConfig(productKind)
  const Icon = config.icon

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-25%,rgba(59,130,246,0.1),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(15,23,42,0.03),transparent_40%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Account</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-blue-950 sm:text-5xl">Create account</h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Join in a few steps — you can refine your profile after signing up.
            </p>
          </div>

          <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <div className="flex flex-col rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.07)] backdrop-blur-sm lg:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50/80 text-blue-700">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight text-blue-950 sm:text-3xl">{config.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{config.body}</p>
              <div className="mt-8 grid gap-3">
                {['Onboarding aligned with this site', 'No one-size-fits-all shell', 'Publishing and discovery in sync'].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200/70 bg-slate-50/50 px-4 py-3.5 text-sm font-medium text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Your details</p>
              <form className="mt-6 grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="register-name">Full name</Label>
                  <Input id="register-name" autoComplete="name" placeholder="Alex Morgan" className="h-11" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input id="register-email" type="email" autoComplete="email" placeholder="you@company.com" className="h-11" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input id="register-password" type="password" autoComplete="new-password" placeholder="••••••••" className="h-11" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="register-intent">What are you creating or publishing?</Label>
                  <Input id="register-intent" placeholder="e.g. essays, news, analysis" className="h-11" />
                </div>
                <Button type="submit" className="mt-2 h-12 rounded-full text-base shadow-[0_10px_28px_rgba(37,99,235,0.25)]">
                  Create account
                </Button>
              </form>
              <div className="mt-8 flex flex-col gap-2 border-t border-slate-200/80 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
                <span className="text-slate-600">Already have an account?</span>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  <Sparkles className="h-4 w-4" />
                  Sign in
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
