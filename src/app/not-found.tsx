import Link from "next/link";
import { siteCopy } from "@/lib/site-copy";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm text-neutral-500">
          {siteCopy.notFound.code}
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight text-neutral-950">
          {siteCopy.notFound.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-neutral-600">
          {siteCopy.notFound.description}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center rounded-lg border border-neutral-300 px-4 text-sm font-medium text-neutral-950 transition-colors hover:border-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
        >
          {siteCopy.notFound.backHome}
        </Link>
      </div>
    </main>
  );
}
