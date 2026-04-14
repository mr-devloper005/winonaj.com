'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Download, Newspaper } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <div className="min-h-screen bg-[#fbf6ee] text-[#241711]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#dcc8b7]/80 bg-[linear-gradient(180deg,#fffdf9_0%,#fbf6ee_100%)]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#8a6f5e]">
              <Newspaper className="h-4 w-4" />
              Press room
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Media resources for {SITE_CONFIG.name}.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#6e5547]">
              Download approved logos, product imagery, and leadership bios. For interview requests, route through our
              communications desk—we reply within two business days.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]">
                <a href="#press-kit" className="inline-flex items-center gap-2">
                  Jump to kit
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-[#dcc8b7] bg-transparent hover:bg-[#f5e7d7]"
              >
                <Link href="/contact">Talk to communications</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-[#dcc8b7]/50 bg-[#fffdfa]">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:px-8">
            {[
              ['Global bylines', '40+ contributing writers'],
              ['Average read time', '8.4 minutes per feature'],
              ['Newsletter', 'Weekly for members'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-[#e6d6c8] bg-[#fbf6ee] p-6 text-center sm:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c5a059]">{label}</p>
                <p className="mt-2 text-lg font-semibold text-[#241711]">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="press-kit" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="rounded-[2rem] border border-[#dcc8b7] bg-[#fffdfa] p-7 shadow-[0_24px_60px_rgba(77,47,27,0.07)]">
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">Press kit</h2>
              <p className="mt-3 text-sm leading-7 text-[#6e5547]">
                Assets below are cleared for editorial use with attribution. Need something bespoke? Email communications
                with your outlet, deadline, and intended crop.
              </p>
              <div className="mt-8 space-y-3">
                {mockPressAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="rounded-2xl border border-[#e6d6c8] bg-[#fff4e8]/60 p-4 transition-colors hover:border-[#c5a059]/45"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[#241711]">{asset.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-[#6e5547]">{asset.description}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="rounded-full bg-[#241711]/8 text-[#241711]">
                          {asset.fileType}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full border-[#dcc8b7] bg-white/90"
                          onClick={() => setActiveAssetId(asset.id)}
                        >
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          className="rounded-full bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]"
                          onClick={() =>
                            toast({
                              title: 'Download started',
                              description: `${asset.title} is downloading.`,
                            })
                          }
                        >
                          <Download className="mr-1.5 h-3.5 w-3.5" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.26em] text-[#8a6f5e]">Recent coverage</h2>
              {mockPressCoverage.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[1.5rem] border border-[#dcc8b7] bg-[#fffdfa] p-6 transition-transform hover:-translate-y-0.5"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a6f5e]">{item.outlet}</p>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-[#241711]">{item.headline}</p>
                  <p className="mt-2 text-xs text-[#6e5547]">{item.date}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl border-[#dcc8b7] bg-[#fffdfa]">
          <DialogHeader>
            <DialogTitle className="text-[#241711]">{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-[#e6d6c8] bg-[#fbf6ee]">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          )}
          <p className="text-sm leading-7 text-[#6e5547]">{activeAsset?.description}</p>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" className="rounded-full border-[#dcc8b7]" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              className="rounded-full bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]"
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
