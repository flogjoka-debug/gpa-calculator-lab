# SEO phase 3 QA — 2026-11-22

## Scope and approved correction
Expanded the Grade, Final Grade, Semester Grade and Percentage to Letter pages with the approved content in the requested order. Retained existing calculator logic, leads, contextual links, example buttons and retained sections. Added real tables with captions and local horizontal scrolling, and visible H3 FAQs backed by the same answer data as FAQPage JSON-LD. Existing page titles, descriptions and H1s match the phase prompt exactly. No new routes and no publish.

The original Semester table assumed A/B/C/D cutoffs of 90/80/70/60, while the existing calculator uses 93/83/73/63. The user chose **Keep the current calculator**. The explanatory table now uses A (93%), B (83%), C (73%) and D (63%), with Not reachable (125%), 75%, 25% and Already reached. Calculator logic and defaults are unchanged.

## Expected versus actual
| Check | Expected | Actual |
|---|---|---|
| Full unit suite | All pass | 92/92 pass across 10 files |
| Production build | Successful | Latest automatic build: build OK at 2026-11-22T20:00:49Z |
| Direct loads and refreshes | HTTP 200 | All 8 requests return 200 |
| Metadata | Approved titles, descriptions, H1s and canonical destinations | Exact match on all four pages |
| Initial server HTML | New H2s in order, verbatim copy, numbered lists, table rows and FAQ answers | All present before JavaScript, including the user-approved Semester correction |
| FAQPage | 4 visible H3 questions/answers per page | All 16 questions/answers exactly match their schema; Grade FAQ links have exact text and destinations |
| BreadcrumbList | Visible Home and page H1; ordered positions; canonical destinations | Exact match on all four pages |
| 360×640 layout | First field visible; no sideways page scrolling | Pass on all four pages, before and after refresh |
| Tables | Caption and semantic header cells, horizontal scrolling within their own box | Final, Semester and Percentage tables pass |
| Grade weighted example | 41 + 28.5 + 17.6 = 87.1%, B+ | 87.1%, B+ through the calculator and engine tests |
| Grade assignment FAQ | 48/60 plus 10/20 = 58/80 = 72.5% | 72.5% through the calculator and engine test |
| Final table: A (90%) | Need 97.5% | 97.5% |
| Final table: B (80%) | Need 72.5% | 72.5% |
| Final table: C (70%) | Need 47.5% | 47.5% |
| Final table: D (60%) | Need 22.5% | 22.5% |
| Zero final with current 85% and final 40% | Course grade 51% | 51.0% |
| Corrected Semester table: A (93%) | Not reachable; would need 125% | Not reachable; engine confirms 125% |
| Corrected Semester table: B (83%) | Need 75% | 75.0% |
| Corrected Semester table: C (73%) | Need 25% | 25.0% |
| Corrected Semester table: D (63%) | Already reached | Already reached; engine returns needed 0 |
| Percentage chart | All 12 cutoffs, upper bounds and GPA points match common scale | Engine tests validate all boundaries/points; calculator verifies every cutoff and point value |
| Percentage FAQ examples | 85→B, 79.5→C+, 80→B−, 69→D+ | Match common scale; 85→B and 69→D also match 10-point scale in engine tests |
| Retained Load this example | Grade 86%, Final 97.5%, Semester 82%, Percentage 84%→B | 86.0%, 97.5%, 82.0%, 84%→B through the UI |
| Browser errors | None | None observed |

## Conditions and remaining limits
HTTP checks examined initial responses at localhost:8080 without JavaScript. Browser checks used headless Chromium, fresh storage and 360×640 CSS pixels. New examples were entered into the live calculators and results read from their result panels, not the explanatory copy. Screenshots of the first fields, new Grade result and corrected Semester table/result were inspected. Real phones, screen readers and the published domain were not checked. No failures or unanswered decisions remain in the requested checks.