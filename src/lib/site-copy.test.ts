import { describe, expect, it } from "vitest";
import { siteCopy } from "./site-copy";

describe("siteCopy", () => {
  it("uses the uppercase brand spelling", () => {
    expect(siteCopy.brand).toBe("NIMNAS-DEV");
    expect(siteCopy.footer.description).toContain("NIMNAS-DEV");
    expect(siteCopy.footer.copyright).toContain("NIMNAS-DEV");
  });

  it("keeps primary navigation and footer copy in Korean", () => {
    expect(siteCopy.navigation).toEqual([
      { href: "/posts", label: "글" },
      { href: "/tags", label: "태그" },
      { href: "/search", label: "검색" },
    ]);

    expect(siteCopy.footer.description).toContain("개발 기록");
    expect(siteCopy.footer.links).toEqual([
      { href: "/posts", label: "전체 글" },
      { href: "/tags", label: "태그" },
      { href: "/search", label: "검색" },
    ]);
  });

  it("uses Korean labels for article chrome and empty states", () => {
    expect(siteCopy.article.contentsLabel).toBe("목차");
    expect(siteCopy.article.previousLabel).toBe("이전 글");
    expect(siteCopy.article.nextLabel).toBe("다음 글");
    expect(siteCopy.search.empty).toBe("검색어와 일치하는 공개 글이 없습니다.");
  });
});
