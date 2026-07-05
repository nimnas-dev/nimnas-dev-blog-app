import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  getAllPosts,
  getAllTags,
  getPost,
  getPostNavigation,
  getPostsByTag,
  searchPosts,
} from "./posts";

let postsDirectory: string;

function writePost(slug: string, source: string) {
  writeFileSync(join(postsDirectory, `${slug}.mdx`), source);
}

beforeEach(() => {
  postsDirectory = mkdtempSync(join(tmpdir(), "nimnas-posts-"));

  writePost(
    "older-post",
    `---
title: Older Post
description: Notes on MDX loading.
publishedAt: 2026-01-10
tags:
  - mdx
  - nextjs
---

## Loading MDX

Body content.
`,
  );

  writePost(
    "middle-post",
    `---
title: Middle Post
description: Server component journal entry.
publishedAt: 2026-02-10
tags:
  - nextjs
---

## Server Components

Searchable body text.
`,
  );

  writePost(
    "newer-post",
    `---
title: Newer Post
description: Quiet interface notes.
publishedAt: 2026-03-10
tags:
  - design
---

## Reading Systems

Body content.
`,
  );

  writePost(
    "draft-post",
    `---
title: Draft Post
description: Hidden draft content.
publishedAt: 2026-04-10
tags:
  - nextjs
draft: true
---

## Draft Heading

Unpublished content.
`,
  );
});

afterEach(() => {
  rmSync(postsDirectory, { recursive: true, force: true });
});

describe("post content helpers", () => {
  it("returns published posts sorted by published date descending", () => {
    const posts = getAllPosts({ postsDirectory });

    expect(posts.map((post) => post.slug)).toEqual([
      "newer-post",
      "middle-post",
      "older-post",
    ]);
  });

  it("excludes drafts from lists, tags, search, and navigation by default", () => {
    expect(getAllPosts({ postsDirectory }).map((post) => post.slug)).not.toContain(
      "draft-post",
    );
    expect(getAllTags({ postsDirectory })).toEqual([
      { tag: "design", count: 1 },
      { tag: "mdx", count: 1 },
      { tag: "nextjs", count: 2 },
    ]);
    expect(searchPosts("draft", { postsDirectory })).toEqual([]);
    expect(getPostNavigation("newer-post", { postsDirectory })).toEqual({
      previous: expect.objectContaining({ slug: "middle-post" }),
      next: null,
    });
  });

  it("can include drafts for authoring contexts", () => {
    expect(
      getAllPosts({ postsDirectory, includeDrafts: true }).map(
        (post) => post.slug,
      ),
    ).toEqual(["draft-post", "newer-post", "middle-post", "older-post"]);
  });

  it("filters posts by tag case-insensitively", () => {
    expect(
      getPostsByTag("NEXTJS", { postsDirectory }).map((post) => post.slug),
    ).toEqual(["middle-post", "older-post"]);
  });

  it("searches title, description, tags, headings, and body content", () => {
    expect(searchPosts("server components", { postsDirectory })[0]?.slug).toBe(
      "middle-post",
    );
    expect(searchPosts("reading systems", { postsDirectory })[0]?.slug).toBe(
      "newer-post",
    );
    expect(searchPosts("searchable body", { postsDirectory })[0]?.slug).toBe(
      "middle-post",
    );
  });

  it("returns chronological previous and next posts for a slug", () => {
    expect(getPostNavigation("middle-post", { postsDirectory })).toEqual({
      previous: expect.objectContaining({ slug: "older-post" }),
      next: expect.objectContaining({ slug: "newer-post" }),
    });
  });

  it("loads a post when the requested slug is URL encoded", () => {
    writePost(
      "테스트",
      `---
title: 테스트
description: 한글 slug 테스트입니다.
publishedAt: 2026-05-10
tags:
  - 테스트
---

## 한글 제목

본문입니다.
`,
    );

    expect(
      getPost(encodeURIComponent("테스트"), { postsDirectory })?.title,
    ).toBe("테스트");
  });
});
