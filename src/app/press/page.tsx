'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Download, Newspaper } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
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
    <div className="min-h-screen bg-transparent">
      <NavbarShell />
      <main>
        <div className="border-b border-[#333F44]/10 bg-[#333F44]/[0.04]">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#4a5c5f]">
              <Newspaper className="h-4 w-4" />
              Press room
            </p>
          </div>
        </div>
        <section className="border-b border-white/10 bg-[#1A1A1B]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl text-white">
              Media resources for {SITE_CONFIG.name}.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#94F3E4]/75">
              Download approved logos, product imagery, and leadership bios. For interview requests, route through our
              communications desk—we reply within two business days.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-[#37AA9C] text-[#0a1214] hover:bg-[#94F3E4]">
                <a href="#press-kit" className="inline-flex items-center gap-2">
                  Jump to kit
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/10 bg-white/10 text-white hover:bg-white/20"
              >
                <Link href="/contact">Talk to communications</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#1A1A1B]/50">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:px-8">
            {[
              ['Global bylines', '40+ contributing writers'],
              ['Average read time', '8.4 minutes per feature'],
              ['Newsletter', 'Weekly for members'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-[#1A1A1B]/50 p-6 text-center sm:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#37AA9C]">{label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="press-kit" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="rounded-[2rem] border border-white/10 bg-[#1A1A1B] p-7 shadow-[0_36px_90px_rgba(0,0,0,0.2)]">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(55,170,156,0.07)_0%,transparent_45%,rgba(148,243,228,0.05)_100%)] rounded-[2rem]" />
              <div className="relative">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">Press kit</h2>
                <p className="mt-3 text-sm leading-7 text-[#94F3E4]/75">
                  Assets below are cleared for editorial use with attribution. Need something bespoke? Email communications
                  with your outlet, deadline, and intended crop.
                </p>
                <div className="mt-8 space-y-3">
                  {mockPressAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className="rounded-2xl border border-white/10 bg-[#1A1A1B]/50 p-4 transition-colors hover:border-[#37AA9C]/45"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white">{asset.title}</p>
                          <p className="mt-1 text-xs leading-relaxed text-[#94F3E4]/75">{asset.description}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary" className="rounded-full bg-white/8 text-white">
                            {asset.fileType}
                          </Badge>
                          <Button
                            size="sm"
                            className="rounded-full bg-[#37AA9C] text-[#0a1214] hover:bg-[#94F3E4]"
                            onClick={() => setActiveAssetId(asset.id)}
                          >
                            Preview
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-[#1A1A1B]/50 p-7">
                <h3 className="text-lg font-semibold text-white">Contact</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-white">Media inquiries</p>
                    <p className="text-[#94F3E4]/75">communications@{SITE_CONFIG.name.toLowerCase()}.com</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Response time</p>
                    <p className="text-[#94F3E4]/75">Within 2 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-[#1A1A1B] p-8 shadow-[0_36px_90px_rgba(0,0,0,0.2)]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(55,170,156,0.07)_0%,transparent_45%,rgba(148,243,228,0.05)_100%)] rounded-[2rem]" />
            <div className="relative">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">Recent coverage</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {mockPressCoverage.map((item) => (
                  <article
                    key={item.outlet}
                    className="rounded-2xl border border-white/10 bg-[#1A1A1B]/50 p-6 transition-colors hover:border-[#37AA9C]/45"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#37AA9C]">{item.outlet}</p>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-white">{item.headline}</p>
                    <p className="mt-2 text-xs text-[#94F3E4]/75">{item.date}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

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
