import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
          { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
          { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
            { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-25%,rgba(59,130,246,0.1),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(15,23,42,0.03),transparent_40%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-12 max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Contact</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-blue-950 sm:text-5xl">
              Talk to {SITE_CONFIG.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Tell us what you are trying to publish, fix, or launch. We&apos;ll route it through the right lane instead of a generic support bucket.
            </p>
          </div>

          <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-4">
              {lanes.map((lane) => (
                <div
                  key={lane.title}
                  className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] backdrop-blur-sm sm:p-7"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50/80 text-blue-700">
                    <lane.icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold tracking-tight text-blue-950">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{lane.body}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] lg:p-10">
              <h2 className="text-xl font-semibold tracking-tight text-blue-950 sm:text-2xl">Send a message</h2>
              <p className="mt-2 text-sm text-slate-600">We typically reply within two business days.</p>
              <form className="mt-8 grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="contact-name">Your name</Label>
                  <Input id="contact-name" autoComplete="name" placeholder="Alex Morgan" className="h-11" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" type="email" autoComplete="email" placeholder="you@company.com" className="h-11" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-subject">What do you need help with?</Label>
                  <Input id="contact-subject" placeholder="Subject or topic" className="h-11" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-body">Message</Label>
                  <Textarea
                    id="contact-body"
                    className="min-h-[160px] resize-y"
                    placeholder="Share the full context so we can respond with the right next step."
                  />
                </div>
                <Button type="submit" className="h-12 rounded-full text-base shadow-[0_10px_28px_rgba(37,99,235,0.25)]">
                  Send message
                </Button>
              </form>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
