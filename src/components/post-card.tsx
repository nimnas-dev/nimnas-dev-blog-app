import Link from "next/link";
import type { PostSummary } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { TagList } from "./tag-list";

type PostCardProps = {
  post: PostSummary;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group rounded-lg border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-400 sm:p-6">
      <div className="flex flex-col gap-4">
        <div className="space-y-3">
          <time
            dateTime={post.publishedAt}
            className="text-xs text-neutral-500"
          >
            {formatDate(post.publishedAt)}
          </time>
          <h2 className="text-xl font-semibold leading-snug text-neutral-950">
            <Link
              href={`/posts/${post.slug}`}
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 group-hover:underline"
            >
              {post.title}
            </Link>
          </h2>
          <p className="leading-7 text-neutral-600">{post.description}</p>
        </div>
        <TagList tags={post.tags} />
      </div>
    </article>
  );
}
