# SEO phase 2 QA — 2026-11-22

## Scope
Expanded the College, High School and Cumulative calculator pages using the phase prompt verbatim and in its specified order. Preserved calculator logic, leads, contextual links, retained sections, Load this example buttons, titles, descriptions, H1s and related calculator blocks. No routes added; no publish performed.

## Expected versus actual
| Check | Expected | Actual |
|---|---|---|
| Full unit suite | All tests pass | 63/63 pass across 9 files |
| Production build | Successful | Latest automatic build: build OK, 2026-11-22T19:53:53Z |
| Direct loads and refreshes | HTTP 200 on all three pages | All 6 requests return 200 |
| Titles, descriptions and H1s | Match approved phase 1 values | All three match exactly |
| Initial server HTML | Ordered H2s, verbatim added copy, numbered lists, table cells and FAQ text | All present before JavaScript |
| College FAQ | 5 visible questions and answers, identical FAQPage | Exact match |
| High School FAQ | 4 visible questions and answers, identical FAQPage | Exact match |
| Cumulative FAQ | 4 visible questions and answers, identical FAQPage | Exact match |
| BreadcrumbList | Home and page H1, positions 1/2, canonical destinations | Exact match to visible breadcrumbs on all three pages |
| Layout at 360×640 | First field visible; no horizontal page scrolling | Pass before and after refresh on all three pages |
| Tables at 360×640 | Semantic table and caption; scrolling inside their own box | College and High School tables scroll within their boxes, not the page |
| New College example | 12 + 13.2 + 3.7 + 6 = 34.9; 34.9 ÷ 11 = 3.17 | Calculator ledger and unit test show 34.9 ÷ 11 = 3.17 |
| New Cumulative example | 180 + 60 = 240; 240 ÷ 75 = 3.20 | Calculator ledger and unit test show 240 ÷ 75 = 3.20 |
| Weighted scale | A: 4/4.5/5; B: 3/3.5/4; C: 2/2.5/3 | Engine tests match for Regular, Honors, AP and IB |
| Retained College example | Both 15 ÷ 6 = 2.50; replacement 12 ÷ 3 = 4.00 | Both match through Load this example |
| Retained High School example | Unweighted 3.50; weighted 4.00 | Both match through Load this example |
| Retained Cumulative example | 78 ÷ 24 = 3.25 | Matches through Load this example |
| Browser errors | None | None observed |

## Conditions and remaining limits
HTTP checks used localhost:8080 and examined the initial response with no JavaScript. Browser checks used headless Chromium, fresh browser storage and a 360×640 CSS-pixel viewport; calculated results were read from the live result panels, not the static explanatory copy. Screenshots were inspected for first-field visibility and the new example results. Real phones, screen readers and the published domain were not checked. No failures remain in the requested checks.