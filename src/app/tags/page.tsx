import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/posts";
import { siteCopy } from "@/lib/site-copy";

export const metadata: Metadata = {
  title: siteCopy.tags.title,
  description: siteCopy.tags.metadataDescription,
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-18">
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight text-neutral-950 sm:text-[40px]">
            {siteCopy.tags.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-neutral-600">
            {siteCopy.tags.description}
          </p>
        </header>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tags.map(({ tag, count }) => (
            <li key={tag}>
              <Link
                href={`/tags/${encodeURIComponent(tag)}`}
                className="flex min-h-16 items-center justify-between rounded-lg border border-neutral-200 bg-white px-5 transition-colors hover:border-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
              >
                <span className="font-medium text-neutral-950">{tag}</span>
                <span className="text-sm text-neutral-500">
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
