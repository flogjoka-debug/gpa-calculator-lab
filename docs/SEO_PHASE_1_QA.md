# SEO phase 1 — verification

Checked November 22, 2026 against the local preview. Nothing published; no routes added and no calculator rules changed.

| Check | Expected | Actual |
|---|---|---|
| Full unit suite | All tests pass | 58/58 pass across 8 files |
| Production build | Clean build | Automatic production build reports `build OK` at 19:48:13 UTC |
| Ten calculator titles and descriptions | Exact phase table; OG titles match | All ten match verbatim; all 14 public-page titles unique |
| Direct load and refresh | HTTP 200 on all existing public pages | All 14 pages return 200; checked direct loading and refreshing at both screen sizes |
| Desktop navigation, 1280×800 | Three dropdowns, mouse and Tab/Enter, Escape restores trigger focus, outside click closes | All three groups pass; destination link and current-page indication checked |
| Phone navigation, 360×640 | Full-width Menu panel, touch and keyboard, Escape restores focus, outside click closes | Pass; actual touch-enabled browser used; destination link and current-page indication checked |
| Mobile header | At most 64px | 61px; no change to document height when panel opens |
| First field at 360×640 | Homepage and College field visible without scrolling | Both visible; first College grade and credits also visible |
| Horizontal overflow | No page-wide sideways scrolling | None on all 14 public pages at either size; homepage grade chart scrolls within its own box |
| Server HTML before JavaScript | All header links, approved H2 order, grade chart, full visible FAQ | All present in initial HTTP response; all ten calculator header destinations included with panels closed |
| Breadcrumbs | Home and current H1 above each non-home H1; matching two-item schema | All 13 non-home public pages match; absolute production URLs with trailing slash |
| FAQPage | Exactly the visible questions and answers | Five homepage questions; each answer matches visible text character for character; shared source data |
| WebSite and Organization | Homepage only; approved name, URL, logo and email | Match; no ratings, reviews or SoftwareApplication markup added |
| Related calculators | Approved three links on nine non-home calculator pages | All nine blocks present; use registry H1 names; homepage retains its nine-tool picker and gets only update line |
| Homepage example | A × 3 plus B × 4 → 3.43 | Load this example → 3.43 |
| Browser runtime | No page errors | None across checked navigation and page loads |

Structured data was checked by parsing every JSON-LD block and verifying schema types, required properties, breadcrumb positions and URLs, and visible FAQ equality; no external rich-result validator was run.

Not checked: real phone hardware, screen-reader output, and published-domain responses. The requested checks were performed in Chromium on the local preview. The changes reach the live site only after publishing.