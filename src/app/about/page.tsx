import Link from 'next/link'
import { ArrowRight, Feather, Gem, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'

const pillars = [
  {
    title: 'Editorial integrity',
    body: 'Every feature is commissioned, fact-checked, and designed to reward close reading—not skim-and-scroll habits.',
    icon: Feather,
  },
  {
    title: 'Quiet luxury',
    body: 'We favour restraint in layout, typography, and motion so the work feels timeless rather than trend-chasing.',
    icon: Gem,
  },
  {
    title: 'Reader-first product',
    body: 'Technology exists to remove friction between curious readers and exceptional stories, never to hijack attention.',
    icon: Sparkles,
  },
]

const milestones = [
  { year: '2018', label: 'Founding essays', detail: 'A small circle of writers launches the first WINONAJ supplement.' },
  { year: '2021', label: 'Global bylines', detail: 'Correspondents join from London, Lagos, and Singapore.' },
  { year: '2024', label: 'Digital atelier', detail: 'The studio formalises art direction, audio, and print-adjacent layouts.' },
  { year: 'Today', label: 'Continuous issues', detail: 'Rolling publication with seasonal print-inspired themes online.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <NavbarShell />
      <main>
        <div className="border-b border-[#333F44]/10 bg-[#333F44]/[0.04]">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#4a5c5f]">About {SITE_CONFIG.name}</p>
          </div>
        </div>
        
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <div className="rounded-[2rem] border border-white/10 bg-[#1A1A1B] p-8 shadow-[0_36px_90px_rgba(0,0,0,0.2)]">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(55,170,156,0.07)_0%,transparent_45%,rgba(148,243,228,0.05)_100%)] rounded-[2rem]" />
              <div className="relative">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">Why we exist</h2>
                <p className="mt-4 text-sm leading-8 text-[#94F3E4]/75">
                  The feed era flattened nuance. We built {SITE_CONFIG.name} as a counterweight: slower headlines, richer
                  context, and design language borrowed from fine bookmaking—serif rhythm, warm paper tones, and gold used
                  as punctuation, not noise.
                </p>
                <p className="mt-4 text-sm leading-8 text-[#94F3E4]/75">
                  Our newsroom partners with independent photographers and illustrators so each story carries a distinct
                  visual signature. Sponsored sections are labelled clearly and never borrow the voice of our editors.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {pillars.map(({ title, body, icon: Icon }) => (
                <div
                  key={title}
                  className="rounded-[1.75rem] border border-white/10 bg-[#1A1A1B]/50 p-6 transition-colors hover:bg-[#1A1A1B]/70"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#1A1A1B] text-[#37AA9C]">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#94F3E4]/75">{body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#1A1A1B] p-8 sm:p-10 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10 shadow-[0_36px_90px_rgba(0,0,0,0.2)]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(55,170,156,0.07)_0%,transparent_45%,rgba(148,243,228,0.05)_100%)] rounded-[2rem]" />
            <div className="relative">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white">Visit the atelier</h2>
              <p className="mt-4 text-sm leading-8 text-[#94F3E4]/75">
                Private tours of our editorial floor are limited each quarter. Press, academic, and brand partners can
                request a walkthrough to see how stories move from pitch to published layout.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 lg:mt-0 lg:items-end">
              <Button asChild className="w-full rounded-full bg-[#37AA9C] text-[#0a1214] hover:bg-[#94F3E4] sm:w-auto">
                <Link href="/press">Press &amp; media kit</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-white/10 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
              >
                <Link href="/articles">Read the latest issue</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
