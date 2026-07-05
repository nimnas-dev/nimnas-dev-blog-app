import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

export type PostFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  draft?: boolean;
};

export type PostHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type Post = PostFrontmatter & {
  slug: string;
  body: string;
  headings: PostHeading[];
  readingMinutes: number;
};

export type PostSummary = Omit<Post, "body">;

export type ContentOptions = {
  postsDirectory?: string;
  includeDrafts?: boolean;
};

const defaultPostsDirectory = join(process.cwd(), "content", "posts");

function getPostsDirectory(options?: ContentOptions) {
  return options?.postsDirectory ?? defaultPostsDirectory;
}

function normalizeTag(tag: string) {
  return tag.trim().toLowerCase();
}

export function normalizeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractHeadings(body: string): PostHeading[] {
  return body
    .split("\n")
    .map((line) => {
      const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());

      if (!match) {
        return null;
      }

      const text = match[2].replace(/\s+#*$/, "").trim();

      return {
        id: slugifyHeading(text),
        text,
        level: match[1].length as 2 | 3,
      };
    })
    .filter((heading): heading is PostHeading => heading !== null);
}

function countReadingMinutes(body: string) {
  const words = body
    .replace(/```[\s\S]*?```/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

function assertFrontmatter(data: Record<string, unknown>, slug: string) {
  const errors: string[] = [];
  const publishedAt =
    data.publishedAt instanceof Date
      ? data.publishedAt.toISOString().slice(0, 10)
      : data.publishedAt;
  const updatedAt =
    data.updatedAt instanceof Date
      ? data.updatedAt.toISOString().slice(0, 10)
      : data.updatedAt;
  const title = data.title;
  const description = data.description;
  const tags = data.tags;

  if (typeof title !== "string") errors.push("title");
  if (typeof description !== "string") errors.push("description");
  if (typeof publishedAt !== "string") errors.push("publishedAt");
  if (!Array.isArray(tags)) errors.push("tags");

  if (errors.length > 0) {
    throw new Error(`Invalid frontmatter for ${slug}: ${errors.join(", ")}`);
  }

  return {
    title: title as string,
    description: description as string,
    publishedAt: publishedAt as string,
    updatedAt: typeof updatedAt === "string" ? updatedAt : undefined,
    tags: (tags as unknown[]).map(String),
    draft: data.draft === true,
  } satisfies PostFrontmatter;
}

function readPostFile(slug: string, postsDirectory: string): Post {
  const source = readFileSync(join(postsDirectory, `${slug}.mdx`), "utf8");
  const { content, data } = matter(source);
  const frontmatter = assertFrontmatter(data, slug);

  return {
    slug,
    ...frontmatter,
    body: content.trim(),
    headings: extractHeadings(content),
    readingMinutes: countReadingMinutes(content),
  };
}

function getPostSlugs(postsDirectory: string) {
  if (!existsSync(postsDirectory)) {
    return [];
  }

  return readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function sortByPublishedAtDesc(posts: Post[]) {
  return posts.toSorted((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

function toPostSummary(post: Post): PostSummary {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    tags: post.tags,
    draft: post.draft,
    headings: post.headings,
    readingMinutes: post.readingMinutes,
  };
}

function getPublishedPosts(options?: ContentOptions) {
  const postsDirectory = getPostsDirectory(options);
  const posts = getPostSlugs(postsDirectory).map((slug) =>
    readPostFile(slug, postsDirectory),
  );

  return sortByPublishedAtDesc(
    options?.includeDrafts ? posts : posts.filter((post) => !post.draft),
  );
}

export function getAllPosts(options?: ContentOptions): PostSummary[] {
  return getPublishedPosts(options).map(toPostSummary);
}

export function getPost(slug: string, options?: ContentOptions): Post | null {
  const postsDirectory = getPostsDirectory(options);
  const normalizedSlug = normalizeSlug(slug);

  if (!existsSync(join(postsDirectory, `${normalizedSlug}.mdx`))) {
    return null;
  }

  const post = readPostFile(normalizedSlug, postsDirectory);

  if (post.draft && !options?.includeDrafts) {
    return null;
  }

  return post;
}

export function getAllTags(options?: ContentOptions) {
  const counts = new Map<string, number>();

  getAllPosts(options).forEach((post) => {
    post.tags.forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });

  return Array.from(counts, ([tag, count]) => ({ tag, count })).toSorted(
    (a, b) => a.tag.localeCompare(b.tag),
  );
}

export function getPostsByTag(tag: string, options?: ContentOptions) {
  const target = normalizeTag(tag);

  return getAllPosts(options).filter((post) =>
    post.tags.some((postTag) => normalizeTag(postTag) === target),
  );
}

export function searchPosts(query: string, options?: ContentOptions) {
  const terms = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (terms.length === 0) {
    return [];
  }

  return getPublishedPosts(options)
    .map((post) => {
      const weightedText = [
        post.title,
        post.title,
        post.description,
        post.description,
        post.tags.join(" "),
        post.tags.join(" "),
        post.headings.map((heading) => heading.text).join(" "),
        post.body,
      ]
        .join(" ")
        .toLowerCase();

      const matches = terms.filter((term) => weightedText.includes(term));

      return {
        post,
        score: matches.length,
      };
    })
    .filter((result) => result.score === terms.length)
    .toSorted((a, b) => b.score - a.score)
    .map(({ post }) => toPostSummary(post));
}

export function getPostNavigation(slug: string, options?: ContentOptions) {
  const normalizedSlug = normalizeSlug(slug);
  const posts = getPublishedPosts(options).toSorted((a, b) =>
    a.publishedAt.localeCompare(b.publishedAt),
  );
  const index = posts.findIndex((post) => post.slug === normalizedSlug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  const previous = posts[index - 1] ?? null;
  const next = posts[index + 1] ?? null;

  return {
    previous: previous ? toPostSummary(previous) : null,
    next: next ? toPostSummary(next) : null,
  };
}
