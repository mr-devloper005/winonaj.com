import Link from 'next/link'
import { ArrowRight, Clock, MapPin, Palmtree } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'

const openings = [
  {
    title: 'Senior Editor, Markets & Culture',
    location: 'London / hybrid',
    type: 'Full-time',
    level: 'Senior',
    blurb: 'Lead a mixed portfolio of essays and briefing memos; mentor two associate editors.',
  },
  {
    title: 'Art Director',
    location: 'New York',
    type: 'Full-time',
    level: 'Lead',
    blurb: 'Own visual systems for digital issues and limited print drops; brief illustrators globally.',
  },
  {
    title: 'Audience & Partnerships Lead',
    location: 'Remote (EU/US)',
    type: 'Full-time',
    level: 'Mid',
    blurb: 'Shape tasteful sponsor narratives and steward the member newsletter.',
  },
  {
    title: 'Editorial Operations Coordinator',
    location: 'Remote',
    type: 'Contract',
    level: 'Entry',
    blurb: 'Coordinate freelance contracts, rights, and production calendars across time zones.',
  },
]

const perks = [
  { title: 'Quiet Fridays', body: 'No standing meetings after noon—deep work protected for writers and designers.' },
  { title: 'Learning stipend', body: 'Annual allowance for courses, archives, museum memberships, and research travel.' },
  { title: 'Health & rest', body: 'Comprehensive medical where applicable, plus a winter closure week on the house.' },
  { title: 'Hardware & studio', body: 'Top-tier laptops, calibrated displays, and optional co-working passes in partner cities.' },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <NavbarShell />
      <main>
        <div className="border-b border-[#333F44]/10 bg-[#333F44]/[0.04]">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#4a5c5f]">Careers at {SITE_CONFIG.name}</p>
          </div>
        </div>
        <section className="border-b border-white/10 bg-[#1A1A1B]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#4a5c5f]">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3 py-1">
                <Palmtree className="h-3.5 w-3.5" />
                Hiring thoughtfully
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Rolling applications
              </span>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl text-white">
              Build the next chapter of {SITE_CONFIG.name} with us.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#94F3E4]/75">
              We hire slowly and invest deeply. If you care about typographic detail, fair sourcing, and readers who finish
              what they start, you will feel at home here.
            </p>
            <div className="mt-10">
              <Button asChild className="rounded-full bg-[#37AA9C] px-6 text-[#0a1214] hover:bg-[#94F3E4]">
                <Link href="/contact" className="inline-flex items-center gap-2">
                  Introduce yourself
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.4fr] lg:items-start">
            <div className="space-y-8">
              {openings.map((role) => (
                <article key={role.title} className="rounded-[2rem] border border-white/10 bg-[#1A1A1B]/50 p-8 shadow-[0_36px_90px_rgba(0,0,0,0.2)]">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="rounded-full bg-[#37AA9C] text-[#0a1214] hover:bg-[#94F3E4]">{role.level}</Badge>
                    <Badge variant="outline" className="rounded-full border-white/10 bg-transparent text-white">
                      {role.type}
                    </Badge>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-white">{role.title}</h3>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-[#94F3E4]/75">
                    <MapPin className="h-4 w-4 shrink-0 text-[#37AA9C]" />
                    {role.location}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#94F3E4]/75">{role.blurb}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-5 rounded-full border-white/10 bg-white/10 text-white hover:bg-white/20"
                  >
                    <Link href="/contact">Apply via contact</Link>
                  </Button>
                </article>
              ))}
            </div>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-[#1A1A1B]/50 p-7">
                <h2 className="text-lg font-semibold text-white">How we interview</h2>
                <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-[#94F3E4]/75">
                  <li>Portfolio or writing sample review with two editors.</li>
                  <li>Live edit or design exercise (paid) shaped like a real brief.</li>
                  <li>Conversation with leadership on values, pace, and craft.</li>
                </ol>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-[#1A1A1B]/50 p-7">
                <h2 className="text-lg font-semibold text-white">Perks &amp; rhythm</h2>
                <ul className="mt-4 space-y-4">
                  {perks.map((p) => (
                    <li key={p.title} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                      <p className="font-semibold text-white">{p.title}</p>
                      <p className="mt-1 text-sm leading-7 text-[#94F3E4]/75">{p.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  )
}
