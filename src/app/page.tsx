import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { siteCopy } from "@/lib/site-copy";

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-18">
        <section className="max-w-3xl space-y-5">
          <p className="text-sm text-neutral-500">
            {siteCopy.home.eyebrow}
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-neutral-950 sm:text-[40px]">
            {siteCopy.brand}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-neutral-600">
            {siteCopy.home.description}
          </p>
        </section>

        <section className="mt-14 space-y-6" aria-labelledby="latest-posts">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2
                id="latest-posts"
                className="text-2xl font-semibold text-neutral-950"
              >
                {siteCopy.home.latestTitle}
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                {siteCopy.home.latestDescription}
              </p>
            </div>
            <Link
              href="/posts"
              className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
            >
              {siteCopy.home.viewAll}
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {posts.slice(0, 4).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <section className="mt-14 space-y-4" aria-labelledby="browse-tags">
          <h2
            id="browse-tags"
            className="text-2xl font-semibold text-neutral-950"
          >
            {siteCopy.home.browseTags}
          </h2>
          <div className="flex flex-wrap gap-2">
            {tags.map(({ tag, count }) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="inline-flex min-h-9 items-center rounded-full border border-neutral-200 px-3 text-xs text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
              >
                {tag} <span className="ml-2 text-neutral-400">{count}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
