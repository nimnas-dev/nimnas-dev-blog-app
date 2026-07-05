# NIMNAS-dev Blog Design System

## Design Direction

NIMNAS-dev Blog is a minimal developer writing space. The interface should stay neutral and quiet so code, prose, and navigation are easy to scan. The design language is grayscale-first, editorial, and functional rather than promotional.

Core qualities:

- Minimal: remove decoration that does not improve reading, scanning, or navigation.
- Clear: make hierarchy obvious with spacing, type scale, and contrast.
- Calm: avoid saturated color, heavy motion, and visually dense surfaces.
- Durable: use simple layouts and reusable primitives that can support many posts over time.

## Color

Use a neutral grayscale palette as the default. Accent colors should be rare and functional.

Recommended tokens:

- `background`: `#ffffff`
- `foreground`: `#171717`
- `muted-background`: `#f6f6f6`
- `subtle-background`: `#fafafa`
- `border`: `#e5e5e5`
- `border-strong`: `#d4d4d4`
- `muted-text`: `#737373`
- `soft-text`: `#525252`
- `code-background`: `#f4f4f5`
- `selection`: `#e5e5e5`
- `focus`: `#171717`

Dark mode may be supported, but the light theme is the primary design target. If dark mode is implemented, preserve the same neutral hierarchy instead of introducing a new color mood.

## Typography

Use Geist Sans for interface and article prose. Use Geist Mono for code, inline technical terms, dates, and compact metadata when appropriate.

Suggested scale:

- Page title: `40px` desktop, `32px` mobile, `1.1` line height.
- Post title: `36px` desktop, `30px` mobile, `1.15` line height.
- Section heading: `24px` to `28px`, `1.25` line height.
- Card title: `18px` to `20px`, `1.35` line height.
- Body: `16px` to `18px`, `1.75` line height.
- Small/meta: `13px` to `14px`, `1.5` line height.
- Code: `14px` to `15px`, `1.65` line height.

Typography rules:

- Keep letter spacing at `0`.
- Do not scale type directly with viewport width.
- Keep article prose between roughly `680px` and `760px` wide.
- Use font weight and spacing before adding color for hierarchy.
- Links inside prose should be visibly underlined or have an equally clear affordance.

## Layout

Use a centered content system with clear reading widths.

Recommended containers:

- Site shell: max width `1120px`, horizontal padding `24px` desktop and `16px` mobile.
- Article body: max width `720px`.
- Post index grid: one column on mobile, two columns on tablet and desktop when space allows.
- Detail page with quick navigation: main article plus a right rail between `220px` and `280px`.

Spacing rhythm:

- Page vertical padding: `48px` mobile, `72px` desktop.
- Section gap: `40px` to `64px`.
- Card padding: `20px` to `24px`.
- Inline metadata gap: `8px` to `12px`.
- Article block gap: `20px` to `32px`.

Avoid floating page sections as large cards. Use cards for repeated post previews, search results, and compact navigation modules only.

## Components

### Header

The header should be compact and predictable.

- Left: site name or wordmark text.
- Right: primary navigation links such as Posts, Tags, Search, and About if needed.
- Use a subtle bottom border only when it helps separate navigation from content.
- Keep mobile navigation simple; avoid complex menus unless the route count grows.

### Post Card

Post cards are previews, not promotional tiles.

- Border: `1px solid` using the neutral border token.
- Radius: `8px` maximum.
- Background: white or subtle background.
- Show title, description, date, and tags.
- Entire card may be clickable if focus and hover states remain accessible.
- Hover state should be restrained: border darkening, slight background shift, or underline title.

### Tags

Tags should be compact text chips.

- Use neutral borders and muted text.
- Radius may be pill-shaped for metadata chips.
- Avoid saturated tag colors by default.
- Tag pages should make the selected tag obvious through title and metadata, not color alone.

### Search

Search should be utility-first.

- Use a clear input with visible focus state.
- Results should look similar to post cards or compact list rows.
- Empty states should be brief and practical.
- Keep filtering behavior fast and predictable.

### Article

Article pages are the highest-priority experience.

- Use a clear title, description, date, and tags before the body.
- Keep prose readable with generous line height.
- Code blocks should have a quiet background, clear padding, and horizontal overflow handling.
- Inline code should be distinct but not visually loud.
- Images, if added, should align with the article width unless there is a strong reason for a wider figure.

### Quick Navigation

The right-side quick navigation is a table of contents for long posts.

- Show headings in a compact vertical list.
- Keep it sticky on desktop when the viewport has enough height.
- Use muted text by default and stronger text for the active or hovered item.
- Hide, collapse, or move it below the article header on small screens.

### Previous/Next Navigation

Place previous and next post links after the article body.

- Use two balanced cells or stacked links on small screens.
- Include direction labels such as Previous and Next.
- Show the target post title.
- Keep borders and spacing consistent with post cards.

## Interaction States

Every interactive element needs visible states:

- Hover: subtle background, border, or underline change.
- Focus: clear outline using the focus token.
- Active/current: stronger text and/or border weight.
- Disabled: lower contrast, no hover effect, and semantic disabled behavior where applicable.

Use motion sparingly. Prefer short transitions around `150ms` for color and border changes only.

## Accessibility

- Maintain strong contrast for body text, metadata, borders, and focus states.
- Preserve semantic structure for articles and navigation.
- Use descriptive link text, especially for post navigation.
- Do not rely on color alone for selected, active, or error states.
- Keep touch targets at least `44px` where practical.
- Respect reduced motion preferences if animation is introduced.

## Content Presentation

- Dates should be consistent across lists and detail pages.
- Descriptions should usually be one or two concise sentences.
- Tags should appear in stable order, preferably the order defined in frontmatter unless a page has a reason to sort them.
- Long technical titles should wrap cleanly without breaking layouts.
- Code-heavy posts should prioritize horizontal readability and copyable text over decorative syntax surfaces.

## Anti-Patterns

Avoid:

- Colorful gradient backgrounds.
- Oversized hero sections for routine blog pages.
- Decorative blobs, abstract shapes, or stock imagery.
- Dense nested cards.
- Center-aligned long-form article text.
- Low-contrast gray text for primary reading content.
- UI copy that explains obvious controls.
- Layouts that require hover to discover primary navigation.
