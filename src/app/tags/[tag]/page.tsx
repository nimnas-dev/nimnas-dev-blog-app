import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/post-card";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { siteCopy } from "@/lib/site-copy";

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `${siteCopy.tags.label}: ${decodedTag}`,
    description: `${decodedTag} 태그가 달린 ${siteCopy.brand} 공개 글입니다.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-18">
        <header className="max-w-3xl">
          <p className="text-sm text-neutral-500">
            {siteCopy.tags.label}
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-neutral-950 sm:text-[40px]">
            {decodedTag}
          </h1>
          <p className="mt-4 text-lg leading-8 text-neutral-600">
            {posts.length}
            {posts.length === 1
              ? siteCopy.tags.postSingular
              : siteCopy.tags.postPlural}
            이 {siteCopy.tags.topicSuffix}
          </p>
        </header>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
