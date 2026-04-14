import Link from 'next/link'
import { ArrowRight, Feather, Gem, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
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
    <div className="min-h-screen bg-[#fbf6ee] text-[#241711]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#dcc8b7]/80 bg-[linear-gradient(180deg,#fffdf9_0%,#fbf6ee_100%)]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a6f5e]">About {SITE_CONFIG.name}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              An independent editorial house for the modern luxury reader.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#6e5547]">
              {SITE_CONFIG.name} publishes considered essays, market notes, and cultural reporting with the pacing of a
              private journal and the finish of a collector&apos;s annual.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-[#241711] px-6 text-[#fff1e2] hover:bg-[#3a241b]">
                <Link href="/team" className="inline-flex items-center gap-2">
                  Meet the team
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-[#dcc8b7] bg-transparent text-[#241711] hover:bg-[#f5e7d7]"
              >
                <Link href="/contact">Commission &amp; partnerships</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <div className="rounded-[2rem] border border-[#dcc8b7] bg-[#fffdfa] p-8 shadow-[0_24px_60px_rgba(77,47,27,0.08)]">
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">Why we exist</h2>
              <p className="mt-4 text-sm leading-8 text-[#6e5547]">
                The feed era flattened nuance. We built {SITE_CONFIG.name} as a counterweight: slower headlines, richer
                context, and design language borrowed from fine bookmaking—serif rhythm, warm paper tones, and gold used
                as punctuation, not noise.
              </p>
              <p className="mt-4 text-sm leading-8 text-[#6e5547]">
                Our newsroom partners with independent photographers and illustrators so each story carries a distinct
                visual signature. Sponsored sections are labelled clearly and never borrow the voice of our editors.
              </p>
            </div>
            <div className="space-y-4">
              {pillars.map(({ title, body, icon: Icon }) => (
                <div
                  key={title}
                  className="rounded-[1.75rem] border border-[#e6d6c8] bg-[#fff4e8]/80 p-6 transition-colors hover:border-[#c5a059]/50"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#dcc8b7] bg-[#fffdfa] text-[#8a6f5e]">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">{title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#6e5547]">{body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#dcc8b7]/60 bg-[#fffdfa]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-[#8a6f5e]">Milestones</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {milestones.map((m) => (
                <div key={m.year} className="rounded-2xl border border-[#e6d6c8] bg-[#fbf6ee] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a059]">{m.year}</p>
                  <p className="mt-2 text-base font-semibold">{m.label}</p>
                  <p className="mt-2 text-sm leading-7 text-[#6e5547]">{m.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-[#dcc8b7] bg-[linear-gradient(135deg,#fffdfa_0%,#fff4e8_100%)] p-8 sm:p-10 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.04em]">Visit the atelier</h2>
              <p className="mt-4 text-sm leading-8 text-[#6e5547]">
                Private tours of our editorial floor are limited each quarter. Press, academic, and brand partners can
                request a walkthrough to see how stories move from pitch to published layout.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 lg:mt-0 lg:items-end">
              <Button asChild className="w-full rounded-full bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b] sm:w-auto">
                <Link href="/press">Press &amp; media kit</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-[#dcc8b7] bg-white/80 sm:w-auto"
              >
                <Link href="/articles">Read the latest issue</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
