import Link from 'next/link'
import { ArrowRight, Clock, MapPin, Palmtree } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
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
    <div className="min-h-screen bg-[#fbf6ee] text-[#241711]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#dcc8b7]/80 bg-[linear-gradient(180deg,#fffdf9_0%,#fbf6ee_100%)]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#8a6f5e]">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#dcc8b7] bg-[#fffdfa] px-3 py-1">
                <Palmtree className="h-3.5 w-3.5" />
                Hiring thoughtfully
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Rolling applications
              </span>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Build the next chapter of {SITE_CONFIG.name} with us.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#6e5547]">
              We hire slowly and invest deeply. If you care about typographic detail, fair sourcing, and readers who finish
              what they start, you will feel at home here.
            </p>
            <div className="mt-10">
              <Button asChild className="rounded-full bg-[#241711] px-6 text-[#fff1e2] hover:bg-[#3a241b]">
                <Link href="/contact" className="inline-flex items-center gap-2">
                  Introduce yourself
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.26em] text-[#8a6f5e]">Open roles</h2>
              {openings.map((role) => (
                <article
                  key={role.title}
                  className="rounded-[1.75rem] border border-[#dcc8b7] bg-[#fffdfa] p-6 shadow-[0_18px_48px_rgba(77,47,27,0.06)] transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex flex-wrap gap-2">
                    <Badge className="rounded-full bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]">{role.level}</Badge>
                    <Badge variant="outline" className="rounded-full border-[#dcc8b7] bg-transparent text-[#241711]">
                      {role.type}
                    </Badge>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em]">{role.title}</h3>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-[#6e5547]">
                    <MapPin className="h-4 w-4 shrink-0 text-[#8a6f5e]" />
                    {role.location}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#6e5547]">{role.blurb}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-5 rounded-full border-[#dcc8b7] bg-white/90 text-[#241711] hover:bg-[#f5e7d7]"
                  >
                    <Link href="/contact">Apply via contact</Link>
                  </Button>
                </article>
              ))}
            </div>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-[#e6d6c8] bg-[#fff4e8]/90 p-7">
                <h2 className="text-lg font-semibold">How we interview</h2>
                <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-[#6e5547]">
                  <li>Portfolio or writing sample review with two editors.</li>
                  <li>Live edit or design exercise (paid) shaped like a real brief.</li>
                  <li>Conversation with leadership on values, pace, and craft.</li>
                </ol>
              </div>
              <div className="rounded-[2rem] border border-[#dcc8b7] bg-[#fffdfa] p-7">
                <h2 className="text-lg font-semibold">Perks &amp; rhythm</h2>
                <ul className="mt-4 space-y-4">
                  {perks.map((p) => (
                    <li key={p.title} className="border-b border-[#e6d6c8]/80 pb-4 last:border-b-0 last:pb-0">
                      <p className="font-semibold text-[#241711]">{p.title}</p>
                      <p className="mt-1 text-sm leading-7 text-[#6e5547]">{p.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
