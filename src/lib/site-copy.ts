export const siteCopy = {
  brand: "NIMNAS-DEV",
  navigation: [
    { href: "/posts", label: "글" },
    { href: "/tags", label: "태그" },
    { href: "/search", label: "검색" },
  ],
  home: {
    eyebrow: "개발 기록",
    description:
      "소프트웨어를 만들고, 읽기 좋은 인터페이스를 다듬고, 배운 것을 기록합니다.",
    latestTitle: "최근 글",
    latestDescription: "공개된 글을 최신순으로 모았습니다.",
    viewAll: "전체 보기",
    browseTags: "태그로 보기",
  },
  posts: {
    title: "글",
    description: "공개된 기록을 최신순으로 모은 목록입니다.",
    metadataDescription: "NIMNAS-DEV의 공개 글 목록입니다.",
  },
  tags: {
    title: "태그",
    description: "관련된 글을 주제별 태그로 찾아봅니다.",
    metadataDescription: "NIMNAS-DEV 글을 태그별로 찾아봅니다.",
    label: "태그",
    postSingular: "개 글",
    postPlural: "개 글",
    topicSuffix: "이 주제에 있습니다.",
  },
  search: {
    title: "검색",
    description: "제목, 설명, 태그, 목차를 기준으로 공개 글을 필터링합니다.",
    label: "글 검색",
    placeholder: "제목, 태그, 목차",
    empty: "검색어와 일치하는 공개 글이 없습니다.",
    metadataDescription: "NIMNAS-DEV의 공개 글을 검색합니다.",
  },
  article: {
    contentsLabel: "목차",
    previousLabel: "이전 글",
    nextLabel: "다음 글",
    minuteRead: "분 읽기",
    notFoundTitle: "글을 찾을 수 없습니다",
  },
  notFound: {
    code: "404",
    title: "페이지를 찾을 수 없습니다",
    description: "요청한 페이지는 공개된 경로로 제공되지 않습니다.",
    backHome: "홈으로 돌아가기",
  },
  footer: {
    description:
      "NIMNAS-DEV는 개발 과정과 배운 점을 차분히 정리하는 개인 개발 기록입니다.",
    copyright: "NIMNAS-DEV. 모든 권리 보유.",
    links: [
      { href: "/posts", label: "전체 글" },
      { href: "/tags", label: "태그" },
      { href: "/search", label: "검색" },
    ],
  },
} as const;
