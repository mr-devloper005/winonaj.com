"use client";

import { useMemo } from "react";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { buildPostUrl } from "@/lib/task-data";
import { normalizeCategory, isValidCategory } from "@/lib/categories";
import type { TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { getLocalPostsForTask } from "@/lib/local-posts";

type Props = {
  task: TaskKey;
  initialPosts: SitePost[];
  category?: string;
};

function getContentValue(post: SitePost, key: string) {
  const content = post.content && typeof post.content === "object" ? (post.content as Record<string, unknown>) : {};
  return typeof content[key] === "string" ? (content[key] as string) : "";
}

export function TaskListClient({ task, initialPosts, category }: Props) {
  const localPosts = getLocalPostsForTask(task);

  const merged = useMemo(() => {
    const bySlug = new Set<string>();
    const combined: Array<SitePost & { localOnly?: boolean; task?: TaskKey }> = [];

    localPosts.forEach((post) => {
      if (post.slug) {
        bySlug.add(post.slug);
      }
      combined.push(post);
    });

    initialPosts.forEach((post) => {
      if (post.slug && bySlug.has(post.slug)) return;
      combined.push(post);
    });

    const normalizedCategory = category ? normalizeCategory(category) : "all";
    if (normalizedCategory === "all") {
      return combined.filter((post) => {
        const value = getContentValue(post, "category");
        return !value || isValidCategory(value);
      });
    }

    return combined.filter((post) => normalizeCategory(getContentValue(post, "category")) === normalizedCategory);
  }, [category, initialPosts, localPosts]);

  if (!merged.length) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-[#37AA9C]/35 bg-[#ecf7f4]/80 p-12 text-center text-[#4a5c5f] shadow-inner">
        <p className="text-base font-medium text-[#1A1A1B]">Nothing published here yet</p>
        <p className="mt-2 text-sm text-muted-foreground">Check back soon for new stories in this section.</p>
      </div>
    );
  }

  if (task === "listing") {
    const [featured, secondary, ...rest] = merged;
    const featuredHref = (featured as any)?.localOnly ? `/local/${task}/${featured.slug}` : buildPostUrl(task, featured.slug);
    const secondaryHref = secondary
      ? ((secondary as any).localOnly ? `/local/${task}/${secondary.slug}` : buildPostUrl(task, secondary.slug))
      : null;

    return (
      <div className="space-y-8">
        {featured ? (
          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <TaskPostCard post={featured} href={featuredHref} taskKey={task} />
            <div className="grid gap-6">
              {secondary ? <TaskPostCard post={secondary} href={secondaryHref!} taskKey={task} /> : null}
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                  Discovery cues
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950">A list page that feels closer to a guided showcase than a flat directory.</h3>
                <div className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                  <p className="rounded-[1.25rem] bg-slate-50 px-4 py-3">Large lead card for the strongest listing.</p>
                  <p className="rounded-[1.25rem] bg-slate-50 px-4 py-3">Shorter card rhythm below for easy comparison.</p>
                  <p className="rounded-[1.25rem] bg-slate-50 px-4 py-3">Metadata stays visible without turning the page into a spreadsheet.</p>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {rest.length ? (
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((post) => {
              const localOnly = (post as any).localOnly;
              const href = localOnly ? `/local/${task}/${post.slug}` : buildPostUrl(task, post.slug);
              return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} />;
            })}
          </section>
        ) : null}

        <section className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)] lg:grid-cols-3">
          {merged.slice(0, 3).map((post) => (
            <div key={`meta-${post.id}`} className="rounded-[1.4rem] bg-slate-50 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Quick look</p>
              <p className="mt-2 text-base font-semibold text-slate-950">{post.title}</p>
              {getContentValue(post, "location") ? (
                <p className="mt-2 inline-flex items-center gap-1 text-sm text-slate-600">
                  <MapPin className="h-3.5 w-3.5" />
                  {getContentValue(post, "location")}
                </p>
              ) : null}
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
                Open details
                <ArrowRight className="h-4 w-4" />
              </p>
            </div>
          ))}
        </section>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {merged.map((post) => {
        const localOnly = (post as any).localOnly;
        const href = localOnly
          ? `/local/${task}/${post.slug}`
          : buildPostUrl(task, post.slug);
        return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} />;
      })}
    </div>
  );
}
