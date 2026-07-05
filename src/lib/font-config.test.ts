import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = process.cwd();

describe("font configuration", () => {
  it("uses only Noto Sans KR and leaves no Geist references in app font config", () => {
    const layout = readFileSync(join(projectRoot, "src/app/layout.tsx"), "utf8");
    const globals = readFileSync(
      join(projectRoot, "src/app/globals.css"),
      "utf8",
    );
    const fontConfig = `${layout}\n${globals}`;

    expect(fontConfig).toContain("Noto_Sans_KR");
    expect(fontConfig).toContain("Noto Sans KR");
    expect(fontConfig).not.toMatch(/Geist|geist|font-geist/);
  });

  it("does not use mono font utility classes in the app UI", () => {
    const files = [
      "src/app/page.tsx",
      "src/app/posts/[slug]/page.tsx",
      "src/app/not-found.tsx",
      "src/app/tags/page.tsx",
      "src/app/tags/[tag]/page.tsx",
      "src/components/post-card.tsx",
      "src/components/site-footer.tsx",
      "src/components/site-header.tsx",
      "src/components/tag-list.tsx",
    ];

    const uiSource = files
      .map((file) => readFileSync(join(projectRoot, file), "utf8"))
      .join("\n");

    expect(uiSource).not.toContain("font-mono");
  });
});
