import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TagList } from "@/components/tag-list";
import { formatDate } from "@/lib/format";
import {
  getAllPosts,
  getPost,
  getPostNavigation,
  normalizeSlug,
  type PostSummary,
} from "@/lib/posts";
import { siteCopy } from "@/lib/site-copy";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = normalizeSlug(rawSlug);
  const post = getPost(slug);

  if (!post) {
    return {
      title: siteCopy.article.notFoundTitle,
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

function AdjacentPostLink({
  label,
  post,
}: {
  label: string;
  post: PostSummary;
}) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group rounded-lg border border-neutral-200 p-5 transition-colors hover:border-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
    >
      <span className="text-xs text-neutral-500">{label}</span>
      <span className="mt-2 block font-medium leading-6 text-neutral-950 group-hover:underline">
        {post.title}
      </span>
    </Link>
  );
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug: rawSlug } = await params;
  const slug = normalizeSlug(rawSlug);
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const { default: PostContent } = await import(
    `../../../../content/posts/${slug}.mdx`
  );
  const navigation = getPostNavigation(slug);

  return (
    <main className="flex-1">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,720px)_240px] lg:py-18">
        <article>
          <header className="border-b border-neutral-200 pb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              <span aria-hidden="true">/</span>
              <span>
                {post.readingMinutes}
                {siteCopy.article.minuteRead}
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-semibold leading-tight text-neutral-950 sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-neutral-600">
              {post.description}
            </p>
            <div className="mt-6">
              <TagList tags={post.tags} />
            </div>
          </header>

          {post.headings.length > 0 ? (
            <nav
              aria-label="Table of contents"
              className="my-8 rounded-lg border border-neutral-200 bg-neutral-50 p-5 lg:hidden"
            >
              <p className="text-xs font-medium uppercase text-neutral-500">
                {siteCopy.article.contentsLabel}
              </p>
              <ol className="mt-3 space-y-2 text-sm">
                {post.headings.map((heading) => (
                  <li
                    key={heading.id}
                    className={heading.level === 3 ? "pl-4" : ""}
                  >
                    <a
                      href={`#${heading.id}`}
                      className="text-neutral-600 underline-offset-4 hover:text-neutral-950 hover:underline"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <div className="article-content">
            <PostContent />
          </div>

          <nav
            aria-label="Post navigation"
            className="mt-12 grid gap-4 border-t border-neutral-200 pt-8 sm:grid-cols-2"
          >
            {navigation.previous ? (
              <AdjacentPostLink
                label={siteCopy.article.previousLabel}
                post={navigation.previous}
              />
            ) : null}
            {navigation.next ? (
              <AdjacentPostLink
                label={siteCopy.article.nextLabel}
                post={navigation.next}
              />
            ) : null}
          </nav>
        </article>

        {post.headings.length > 0 ? (
          <aside className="hidden lg:block">
            <nav
              aria-label="Table of contents"
              className="sticky top-8 border-l border-neutral-200 pl-5"
            >
              <p className="text-xs font-medium uppercase text-neutral-500">
                {siteCopy.article.contentsLabel}
              </p>
              <ol className="mt-4 space-y-2 text-sm">
                {post.headings.map((heading) => (
                  <li
                    key={heading.id}
                    className={heading.level === 3 ? "pl-4" : ""}
                  >
                    <a
                      href={`#${heading.id}`}
                      className="text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-950 hover:underline"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        ) : null}
      </div>
    </main>
  );
}
