import type { Metadata } from "next";
import { SearchPosts } from "@/components/search-posts";
import { getAllPosts } from "@/lib/posts";
import { siteCopy } from "@/lib/site-copy";

export const metadata: Metadata = {
  title: siteCopy.search.title,
  description: siteCopy.search.metadataDescription,
};

export default function SearchPage() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-18">
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight text-neutral-950 sm:text-[40px]">
            {siteCopy.search.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-neutral-600">
            {siteCopy.search.description}
          </p>
        </header>
        <div className="mt-10">
          <SearchPosts posts={getAllPosts()} />
        </div>
      </div>
    </main>
  );
}
