import Link from 'next/link'
import { Bookmark, Building2, FileText, Image as ImageIcon, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

function getLoginConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      icon: Building2,
      title: 'Access your business dashboard',
      body: 'Manage listings, verification details, contact info, and local discovery surfaces from one place.',
    }
  }
  if (kind === 'editorial') {
    return {
      icon: FileText,
      title: 'Sign in to your workspace',
      body: 'Draft, review, and publish with the same calm reading system as the rest of the site.',
    }
  }
  if (kind === 'visual') {
    return {
      icon: ImageIcon,
      title: 'Enter the creator workspace',
      body: 'Open your visual feed, creator profile, and publishing tools in one place.',
    }
  }
  return {
    icon: Bookmark,
    title: 'Open your curated workspace',
    body: 'Manage saved resources, collection notes, and curator identity without a generic admin shell.',
  }
}

export default function LoginPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getLoginConfig(productKind)
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
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-blue-950 sm:text-5xl">Sign in</h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Welcome back — use your email and password to continue.
            </p>
          </div>

          <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
            <div className="flex flex-col rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.07)] backdrop-blur-sm lg:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50/80 text-blue-700">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight text-blue-950 sm:text-3xl">{config.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{config.body}</p>
              <div className="mt-8 grid gap-3">
                {['Workflows matched to this product', 'Consistent layout with the public site', 'Fewer generic admin patterns'].map((item) => (
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
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Credentials</p>
              <form className="mt-6 grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" type="email" autoComplete="email" placeholder="you@company.com" className="h-11" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" type="password" autoComplete="current-password" placeholder="••••••••" className="h-11" />
                </div>
                <Button type="submit" className="mt-2 h-12 rounded-full text-base shadow-[0_10px_28px_rgba(37,99,235,0.25)]">
                  Sign in
                </Button>
              </form>
              <div className="mt-8 flex flex-col gap-4 border-t border-slate-200/80 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
                <Link href="/forgot-password" className="font-medium text-slate-600 transition hover:text-blue-600">
                  Forgot password?
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  <Sparkles className="h-4 w-4" />
                  Create account
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
