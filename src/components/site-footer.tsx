import Link from "next/link";
import { siteCopy } from "@/lib/site-copy";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl space-y-3">
          <p className="text-sm font-semibold text-neutral-950">
            {siteCopy.brand}
          </p>
          <p className="text-sm leading-6 text-neutral-600">
            {siteCopy.footer.description}
          </p>
          <p className="text-xs text-neutral-500">
            © {year} {siteCopy.footer.copyright}
          </p>
        </div>
        <nav aria-label="푸터 탐색">
          <ul className="flex flex-wrap gap-2 text-sm">
            {siteCopy.footer.links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-neutral-600 transition-colors hover:bg-white hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
