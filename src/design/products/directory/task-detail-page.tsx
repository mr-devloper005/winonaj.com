import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from 'lucide-react'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { PhotoLightbox } from '@/components/shared/photo-lightbox'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const descriptionHtml = formatRichHtml(description, 'Details coming soon.')
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950">
          ← Back to {taskLabel}
        </Link>

        <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div>
            <div className="overflow-hidden rounded-[2.4rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
              <div className="relative h-[460px] overflow-hidden bg-slate-100">
                <PhotoLightbox
                  images={images}
                  title={post.title}
                  triggerClassName="absolute inset-0 block cursor-zoom-in"
                  imageClassName="object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent px-6 py-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">{category || taskLabel}</p>
                  <h1 className="mt-2 max-w-2xl text-4xl font-semibold tracking-[-0.05em]">{post.title}</h1>
                  <p className="mt-3 text-sm font-medium text-white/80">Click the photos to open the full gallery.</p>
                </div>
              </div>
              {images.length > 1 ? (
                <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
                  {images.slice(1, 5).map((image, index) => (
                    <div key={image} className="relative h-24 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                      <PhotoLightbox
                        images={images}
                        title={post.title}
                        initialIndex={index + 1}
                        triggerClassName="absolute inset-0 block cursor-zoom-in"
                        imageClassName="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Overview</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">A calmer, more visual detail page for trust-first browsing.</h2>
              <RichContent html={descriptionHtml} className="mt-4 text-slate-700 prose-p:text-slate-600 prose-li:text-slate-600" />
              {highlights.length ? (
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {highlights.slice(0, 4).map((item) => (
                    <div key={item} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Contact and details</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">{post.title}</h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                {location ? <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><MapPin className="h-4 w-4" /> {location}</div> : null}
                {phone ? <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><Phone className="h-4 w-4" /> {phone}</div> : null}
                {email ? <a href={`mailto:${email}`} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100"><Mail className="h-4 w-4" /> {email}</a> : null}
                {website ? <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><Globe className="h-4 w-4" /> {website}</div> : null}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {website ? <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">Visit website <ArrowRight className="h-4 w-4" /></a> : null}
                {email ? <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100">Email now</a> : null}
                <Link href={taskRoute} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100">Browse more</Link>
              </div>
            </div>

            {mapEmbedUrl ? (
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
                <div className="border-b border-slate-200 px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Location</p>
                </div>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[320px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Why this layout works</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {['Visual hero with fast scanning', 'Parsed rich description content', 'One-click image popup gallery', 'Contact actions grouped together'].map((item) => (
                  <div key={item} className="rounded-[1.3rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Related surfaces</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Keep browsing nearby matches.</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
