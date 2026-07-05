"use client";

import { useMemo, useState } from "react";
import type { PostSummary } from "@/lib/posts";
import { siteCopy } from "@/lib/site-copy";
import { PostCard } from "./post-card";

type SearchPostsProps = {
  posts: PostSummary[];
};

function matchesPost(post: PostSummary, query: string) {
  const terms = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (terms.length === 0) {
    return true;
  }

  const searchable = [
    post.title,
    post.description,
    post.tags.join(" "),
    post.headings.map((heading) => heading.text).join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return terms.every((term) => searchable.includes(term));
}

export function SearchPosts({ posts }: SearchPostsProps) {
  const [query, setQuery] = useState("");
  const results = useMemo(
    () => posts.filter((post) => matchesPost(post, query)),
    [posts, query],
  );

  return (
    <div className="space-y-8">
      <label className="block">
        <span className="mb-3 block text-sm font-medium text-neutral-700">
          {siteCopy.search.label}
        </span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="search"
          placeholder={siteCopy.search.placeholder}
          className="h-12 w-full rounded-lg border border-neutral-300 bg-white px-4 text-base text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950"
        />
      </label>
      {results.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 text-neutral-600">
          {siteCopy.search.empty}
        </p>
      )}
    </div>
  );
}
