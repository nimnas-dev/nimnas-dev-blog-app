<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# NIMNAS-dev Blog Project Instructions

## Project Context

NIMNAS-dev Blog is a personal developer journal built with Next.js and MDX. The site should feel neutral, minimal, readable, and intentionally quiet. Favor clarity, stable navigation, and excellent long-form reading ergonomics over decorative presentation.

## Language Rules

- Project context files such as `AGENTS.md`, `DESIGN.md`, and future architecture notes must be written in English.
- User-facing blog content may be written in the language chosen for that post.
- Keep UI copy concise and direct.

## Technical Baseline

- Framework: Next.js 16 with the App Router.
- UI stack: React 19, TypeScript, Tailwind CSS 4.
- Package manager: npm, using `package-lock.json`.
- Before changing Next.js APIs, routing conventions, metadata, MDX integration, caching, server components, or file structure, read the relevant local guide under `node_modules/next/dist/docs/`.
- For any Next.js development work, actively use the available official/Vercel Next.js Skills before implementing changes. Start with `vercel:nextjs` for App Router architecture, routing, rendering, Server Components, Server Actions, Cache Components, and deployment-sensitive behavior.
- Use `next-best-practices` alongside `vercel:nextjs` when writing or reviewing Next.js code for file conventions, RSC boundaries, async APIs, metadata, route handlers, images, fonts, and bundling.
- Use `next-cache-components` whenever work touches Next.js 16 Cache Components, Partial Prerendering, `use cache`, `cacheLife`, `cacheTag`, or `updateTag`.
- Use `next-upgrade` for framework upgrades, codemods, breaking-change review, or version migration planning.
- Treat Skill guidance and the local `node_modules/next/dist/docs/` guides as complementary requirements. If they appear to disagree, verify against the local Next.js version and document the decision.
- Prefer Server Components for static content, post lists, post detail pages, tag pages, and search index preparation unless interactivity requires a Client Component.
- Keep client-side JavaScript small. Use Client Components only for interactive search inputs, filters, menus, or similar UI.

## Product Scope

The blog must support:

- Publishing posts from MDX files.
- A post list page with card-style previews.
- A post detail page with a right-side quick navigation/table of contents.
- Previous and next post navigation at the bottom of each post.
- A post search page.
- Tag/category support for browsing related posts.

## Content Model Guidelines

Each MDX post should have structured frontmatter. Use a consistent shape before adding new fields:

- `title`: Human-readable post title.
- `description`: Short preview and SEO description.
- `publishedAt`: ISO-style date string.
- `updatedAt`: Optional ISO-style date string.
- `tags`: Array of tags/categories.
- `draft`: Optional boolean.
- `slug`: Prefer deriving from the file path unless there is a clear reason to store it explicitly.

Posts should be sorted by `publishedAt` descending by default. Draft content must not appear in production lists, search results, tag pages, or next/previous navigation.

## Route Expectations

Use route names that are simple and durable:

- `/` for the primary post index or a concise home/index hybrid.
- `/posts` for the full post list if the home page becomes more curated.
- `/posts/[slug]` for post detail pages.
- `/search` for post search.
- `/tags` for tag discovery.
- `/tags/[tag]` for posts filtered by tag.

## Implementation Preferences

- Keep MDX loading, frontmatter parsing, sorting, and navigation helpers in a small content library rather than scattering filesystem logic across routes.
- Generate metadata from post frontmatter on detail pages.
- Generate static params for MDX-backed post and tag routes where appropriate.
- Preserve accessible semantic HTML for articles: use `article`, `header`, `nav`, meaningful headings, and descriptive link text.
- Right-side quick navigation should be secondary and unobtrusive on desktop. On small screens, collapse it or place it inline without blocking reading.
- Previous/next navigation should use chronological post order and omit draft posts.
- Search should prioritize title, description, tags, and headings before full body text.

## Design Expectations

Follow `DESIGN.md` for visual decisions. In summary:

- Use a grayscale-first palette with restrained accents only when they clarify state or interaction.
- Optimize for reading: comfortable line length, generous paragraph rhythm, strong heading hierarchy, and high contrast.
- Keep cards compact, quiet, and scannable.
- Avoid heavy gradients, ornate decoration, oversized marketing hero sections, and visual noise.

## Quality Checks

Before considering work complete, run the smallest relevant verification:

- `npm run lint` for TypeScript/React changes.
- `npm run build` for routing, MDX, metadata, or content pipeline changes.
- Manual browser verification for layout, responsive reading pages, search behavior, and tag navigation.

Document any verification that could not be run.
