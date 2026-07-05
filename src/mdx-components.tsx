import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { slugifyHeading } from "@/lib/posts";

function textFromChildren(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(textFromChildren).join("");
  }

  return "";
}

const components = {
  a: ({ href = "", children }) => {
    if (href.startsWith("/")) {
      return <Link href={href}>{children}</Link>;
    }

    return (
      <a href={href} rel="noreferrer" target="_blank">
        {children}
      </a>
    );
  },
  h2: ({ children }) => {
    const text = textFromChildren(children);
    return <h2 id={slugifyHeading(text)}>{children}</h2>;
  },
  h3: ({ children }) => {
    const text = textFromChildren(children);
    return <h3 id={slugifyHeading(text)}>{children}</h3>;
  },
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
