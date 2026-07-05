# NIMNAS-dev Blog Feature Ideas

이 문서는 현재 NIMNAS-dev Blog 프로젝트에 추가하면 좋을 기능 아이디어를 정리한다.
프로젝트의 방향성은 중립적이고 조용한 개인 개발 저널이므로, 장식적인 기능보다 읽기 경험, 콘텐츠 발견성, 작성 및 운영 편의성을 우선한다.

## Current Baseline

현재 프로젝트는 다음 기본 기능을 이미 갖추고 있다.

- MDX 파일 기반 포스트 작성
- 포스트 목록 페이지
- 포스트 상세 페이지
- 오른쪽 빠른 내비게이션/table of contents
- 이전/다음 글 내비게이션
- 검색 페이지
- 태그 목록 및 태그별 포스트 페이지
- draft 포스트 제외 처리
- frontmatter 기반 메타데이터

따라서 다음 단계의 기능은 블로그의 기본 골격을 다시 만드는 것보다, 글이 늘어났을 때 더 잘 읽히고 더 잘 찾아지는 방향이 적합하다.

## Short-Term Features

### About Page

- Route: `/about`
- 블로그 주제, 작성자 소개, 기술 스택, 관심사, 작성 기준을 간결하게 정리한다.
- 개인 개발 블로그에서 방문자가 사이트의 맥락을 빠르게 이해하는 데 도움이 된다.
- UI는 기존 페이지와 같은 조용한 텍스트 중심 레이아웃을 사용한다.

### Archive Page

- Route: `/archive`
- 공개 포스트를 연도/월 기준으로 묶어 보여준다.
- 글 수가 늘어나면 일반 포스트 목록보다 시간 흐름을 훑기 쉽다.
- 기본 정렬은 `publishedAt` 내림차순을 유지한다.

### Related Posts

- 포스트 상세 페이지 하단에 같은 태그를 공유하는 관련 글을 2-3개 보여준다.
- 현재 태그 모델이 이미 있으므로 구현 비용이 낮다.
- 관련 글은 draft를 제외하고, 현재 글은 결과에서 제외한다.

### Search Improvements

- 검색 결과 개수 표시
- 검색어 하이라이트
- 태그 필터 추가
- 빈 검색어 상태와 결과 없음 상태를 더 명확하게 구분
- 현재 검색 기능은 단순하고 빠르지만, 글이 많아지면 필터링과 결과 이해를 보강할 필요가 있다.

## Reading Experience Features

### Series Support

- frontmatter에 `series`와 `seriesOrder` 필드를 추가하는 방안을 검토한다.
- 예시 시리즈:
  - 블로그 만들기
  - Next.js 메모
  - React Server Components
- 포스트 상세 페이지에서 같은 시리즈의 이전/다음 글 또는 전체 시리즈 목록을 보여줄 수 있다.
- 개발 저널처럼 연속된 학습 기록을 남기는 블로그에 잘 맞는다.

### Active Table of Contents

- 스크롤 위치에 따라 오른쪽 목차에서 현재 섹션을 강조한다.
- 긴 기술 글에서 현재 위치를 파악하기 쉬워진다.
- Client Component가 필요하므로, 목차 전체를 과하게 클라이언트화하지 않고 활성 상태 계산만 작은 컴포넌트로 분리하는 것이 좋다.

### Heading Anchor Links

- `h2`, `h3` heading에 앵커 링크를 제공한다.
- 특정 섹션을 바로 공유하기 쉬워진다.
- hover 또는 focus 시에만 조용하게 표시하는 방식이 디자인 방향과 잘 맞는다.

### Code Block Enhancements

- 코드 블록 복사 버튼
- 선택적으로 파일명 표시
- 긴 줄의 가로 스크롤 처리 개선
- 기술 블로그에서는 체감 가치가 큰 기능이다.
- UI는 과한 색상이나 장식 없이, 기존 grayscale-first 디자인을 유지한다.

### Reading Progress

- 긴 글에서 읽기 진행률을 표시한다.
- 상단 고정 progress bar 또는 목차 영역 안의 미세한 표시를 고려할 수 있다.
- 사이트 분위기상 시각적으로 강한 progress bar는 피하고, 보조 정보 수준으로 유지한다.

## Content Operations And SEO

### Frontmatter Validation

- `title`, `description`, `publishedAt`, `tags`, `draft` 같은 필드를 더 엄격하게 검증한다.
- 현재 수동 검증 로직을 확장하거나 `zod` 같은 스키마 검증 도구를 도입할 수 있다.
- 잘못된 날짜, 빈 태그, 빈 설명, 중복 slug를 테스트에서 잡도록 한다.

### Content Quality Tests

- draft 포스트가 production 목록, 검색, 태그, 이전/다음 내비게이션에 노출되지 않는지 확인한다.
- 모든 공개 포스트에 필수 frontmatter가 있는지 확인한다.
- heading id가 중복되지 않는지 확인한다.
- 태그 normalize 규칙이 일관적인지 확인한다.

### RSS Feed

- Route: `/feed.xml`
- 공개 포스트 목록을 RSS로 제공한다.
- 개발 블로그 독자가 피드 리더로 구독할 수 있게 한다.
- SEO 목적보다는 장기 독자 경험에 가깝다.

### Sitemap

- Route: `/sitemap.xml`
- 정적 라우트, 포스트 상세 페이지, 태그 페이지를 포함한다.
- 검색 엔진이 사이트 구조를 더 잘 파악하게 한다.

### Open Graph Images

- 포스트 제목과 설명을 기반으로 공유용 OG 이미지를 생성한다.
- 디자인은 흑백 타이포그래피 중심으로 유지한다.
- 링크 공유 시 품질이 좋아지지만, 초기 필수 기능은 아니다.

## Recommended Priority

1. About page and archive page
2. Related posts and series support
3. RSS feed and sitemap
4. Code block copy button and heading anchor links
5. Active table of contents

## Implementation Notes

- 콘텐츠 조회, 정렬, 태그, 검색 관련 로직은 `src/lib/posts.ts` 같은 작은 콘텐츠 라이브러리에 계속 모은다.
- 정적 콘텐츠 페이지와 포스트 목록은 Server Component를 우선한다.
- 검색 입력, 활성 목차, 코드 복사 버튼처럼 상호작용이 필요한 부분만 Client Component로 분리한다.
- 새 route, metadata, MDX 처리, caching, App Router 규칙을 변경할 때는 `node_modules/next/dist/docs/`의 현재 Next.js 문서를 먼저 확인한다.
- UI는 `DESIGN.md`의 grayscale-first, quiet, readable 방향을 따른다.
