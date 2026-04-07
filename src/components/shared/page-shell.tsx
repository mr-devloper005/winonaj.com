'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-br from-white via-slate-50/80 to-blue-50/30">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                'radial-gradient(ellipse 80% 50% at 100% 0%, rgba(59, 130, 246, 0.12), transparent), radial-gradient(circle at 0% 100%, rgba(15, 23, 42, 0.04), transparent)',
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <h1 className="text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">{title}</h1>
                {description && (
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>
                )}
              </div>
              {actions && <div className="flex flex-shrink-0 flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  )
}
