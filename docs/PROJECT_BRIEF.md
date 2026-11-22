# GPA Calculator Lab — Project Brief (source of truth)

Read this file at the start of every phase. If a prompt conflicts with it, stop and ask.
Last updated: 2026-11-22. Production domain: https://gpacalculatorlab.com/ (apex, HTTPS, trailing slash).

## 1. Product
Free GPA and grade calculators in US English for US high school students, college students and applicants. A student lands from Google on the right tool, calculates on a phone, sees which grades counted and why, and moves to the next calculation without retyping.

Non-negotiables
- Every result shows numerator, denominator, included rows, excluded rows and the reason.
- Calculators run in the browser. No account, no backend required.
- Never put grades, course names or transcripts in URLs, logs or analytics.
- No invented ratings, reviews, user counts, credentials or authors.
- School scales are labeled "example" and stay editable unless they cite a source with a verification date.
- All user-facing text is US English and comes from the approved copy in the phase prompt. Do not write new marketing copy; if text is missing, use a visible "[COPY NEEDED]" marker and report it.

## 2. Routes (canonical, trailing slash, no www)
| Route | Primary keyword | H1 | Title | Meta description |
|---|---|---|---|---|
| / | GPA calculator | GPA Calculator | GPA Calculator – See Your GPA and the Math Behind It | Enter your grades and credits to get your GPA, total quality points, and the credits that counted. Free, works on your phone, no account needed. |
| /college-gpa-calculator/ | college GPA calculator | College GPA Calculator | College GPA Calculator – Credits, Plus/Minus, Retakes | Calculate your college GPA with credit hours and plus/minus grades. Compare counting both attempts of a retake with replacing the earlier grade. |
| /high-school-gpa-calculator/ | high school GPA calculator | High School GPA Calculator | High School GPA Calculator – Weighted and Unweighted | See your weighted and unweighted high school GPA side by side. Set your school's Honors, AP, and IB bonus points and check what each class adds. |
| /cumulative-gpa-calculator/ | cumulative GPA calculator | Cumulative GPA Calculator | Cumulative GPA Calculator – Add New Semesters to Your GPA | Combine your prior GPA and credits with new semesters. Use exact quality points from your transcript, or get a labeled estimate from a rounded GPA. |
| /grade-calculator/ | grade calculator | Grade Calculator | Grade Calculator – Points or Weighted Categories | Find your current class grade from assignment points or weighted categories. Blank scores stay out of the math, and zeros count as real grades. |
| /final-grade-calculator/ | final grade calculator | Final Grade Calculator | Final Grade Calculator – What Do I Need on My Final? | Enter your current grade, target grade, and exam weight to see the score you need on your final and the highest course grade you can still earn. |
| /semester-grade-calculator/ | semester grade calculator | Semester Grade Calculator | Semester Grade Calculator – Quarters Plus Final Exam | Combine two quarter grades and a final exam into your semester grade. Use 40/40/20, no exam, or your own weights, and see the math step by step. |
| /percentage-to-letter-grade/ | percentage to letter grade | Percentage to Letter Grade Calculator | Percentage to Letter Grade Calculator (With Your Scale) | Convert any percentage, including decimals like 89.5, to a letter grade. See the range, how far you are from the next grade, and use your syllabus cutoffs. |
| /uc-gpa-calculator/ | UC GPA calculator | UC GPA Calculator | UC GPA Calculator – Capped Weighted and Unweighted | Enter your A-G courses from 10th and 11th grade to estimate your UC GPA. See which honors points count, which ones hit the 8-semester cap, and why. |
| /law-school-gpa-calculator/ | law school GPA calculator | Law School GPA Calculator | Law School GPA Calculator – LSAC GPA by Application Cycle | Estimate your LSAC undergraduate GPA with A+ at 4.33 and every attempt counted. Pick your application cycle to see how dual-enrollment grades are treated. |

Support routes: /about/, /methodology/, /privacy/, /contact/. Unknown routes return a real HTTP 404. Do NOT create /gpa-calculator/ (the homepage is the GPA calculator). Brand experiments live under /_brand/ with noindex and are never linked from navigation or the sitemap.

Navigation groups: GPA (/, College, High School, Cumulative) · Grades (Grade, Final Grade, Semester Grade, Percentage to Letter) · Admissions (UC, Law School).

## 3. Identity: Campus Ledger (one identity only on the public site)
Public name: "GPA Calculator Lab". Logo links to / with accessible name "GPA Calculator Lab home".

Design tokens (CSS variables; keep the palette swappable)
- --bg #F5F8F7 · --surface #FFFFFF · --text #132B38 (13.7:1 on bg) · --text-muted #4A6470 (5.9:1 on bg, 6.3:1 on surface)
- --primary #075F57 with --primary-fg #FFFFFF (7.5:1) · --primary-hover #064E48
- --accent #B8ECDD: fill only, always with --text on top (11.2:1). Never use accent for text or borders on light backgrounds (1.2:1).
- --border-input #4A6470 (5.9:1, functional) · --divider #C9D6D3 (decorative only)
- --error #B42318 (6.2:1) · --success #075F57. Errors and successes always carry an icon and text, never color alone.
- --focus: 3px solid #132B38 outline, 2px offset, on every interactive element.
- Radius 10–14px. Touch targets at least 44px. Input font size 16px.
Type: Instrument Sans (OFL), weights 500 and 650 only, self-hosted, font-display: swap, fallback: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif. Numbers use font-variant-numeric: tabular-nums.
Result pattern: big GPA number; a ledger table (Grade · Points × credits · Quality pts) ending in a total row with a 2px top rule and double bottom rule; a mint strip "✓ 7 of 7 credits counted toward GPA"; one formula line with the student's numbers.

## 4. Calculation engine contract
Math lives in pure TypeScript functions under src/lib/calc/, with no UI imports. The main result, the loadable example and the print view call the same functions. Each function returns { value, numerator, denominator, included[], excluded[] with reason, warnings[] } or a typed error naming the row to fix. Keep full precision internally; format only at display. Never show a stale result for changed input.

- GPA = Σ(grade points × GPA credits) ÷ Σ(GPA credits). "All classes count equally" mode sets every credit to 1. F = 0 points and its credits count. P and W are excluded under the default policy. Never infer a policy from a course name.
- Default example scale (editable, labeled "example"): A 4.0, A− 3.7, B+ 3.3, B 3.0, B− 2.7, C+ 2.3, C 2.0, C− 1.7, D+ 1.3, D 1.0, D− 0.7, F 0.0.
- Cumulative = (prior quality points + new quality points) ÷ (prior GPA credits + new GPA credits). With only a rounded prior GPA, use GPA × credits and label the result "estimate". Never double count semesters.
- High School: unweighted uses base points. Weighted adds the profile's bonus (example default Honors +0.5, AP/IB +1.0, editable, with optional caps) per eligible class before credit weighting. Show each class's contribution and the difference.
- College retakes: "Count both attempts" vs "Replace earlier attempt" shown side by side for the same course; baseline data is never mutated; one action restores it.
- Grade (points): 100 × Σ earned ÷ Σ possible. Grade (categories): Σ(category average × weight). Blank = unknown (excluded, show covered weight); 0 = real grade. A final course grade needs weights totaling 100% (tolerance 0.01).
- Semester Grade = Σ(period grade × weight), weights as fractions summing to 1 (UI shows 20%, formula uses 0.20). Presets: 40/40/20, 50/50 no exam, custom.
- Final Grade: needed = (target − current × (1 − w)) ÷ w. Max course grade = current × (1 − w) + 100 × w. "Current grade" excludes the final. Handle w = 0, w = 1, target already reached, and needed > 100 (show the max reachable grade and the formula with the student's numbers). Round the needed score UP at the displayed precision.
- Percentage to Letter: the active scale profile is the only source for both the table and the result. Ranges cover 0–100 with no gaps or overlaps. Look up the letter from the full-precision value before formatting.
- UC and LSAC rules live in their own modules (src/lib/calc/uc.ts, lsac.ts), never in the generic GPA functions. Rules: docs/policy-uc-lsac.md (dated policy brief, phase 4).

## 5. Acceptance tests (automated + checked through the UI)
| Case | Input | Expected |
|---|---|---|
| Basic / College | A × 3 credits, B × 4 credits | 24 ÷ 7 → 3.43 |
| Cumulative | 18 credits at 3.0, then 6 at 4.0 | 78 ÷ 24 = 3.25 |
| High School | A regular + B AP, 1 credit each, AP +1 | Unweighted 3.50, weighted 4.00 |
| F, P, blank | A and F at 3 credits, one P, one blank row | 12 ÷ 6 = 2.00; a single F → 0.00; no classes → empty state |
| Retake | D then A, same course, 3 credits each | Both: 15 ÷ 6 = 2.50; Replace: 12 ÷ 3 = 4.00 |
| Percentage | Profile with B+ from 87, A− from 90 | 87.00 → B+, 89.99 → B+, 90.00 → A−; editing a cutoff updates table and result |
| Grade | 18/20 and 30/40 (points); 80% at 40% + 90% at 60% (categories) | 80% and 86% |
| Semester | Q1 90, Q2 80, exam 70, weights 40/40/20 | 82% |
| Final | Current 85, target 90, exam 40% | Need 97.5%. Current 80, target 90, exam 20% → need 130%, max course grade 84% |
| UC caps | 12 semester A grades, all A-G and honors-eligible, CA resident, 6 in 10th + 6 in 11th | Unweighted 48 ÷ 12; capped 56 ÷ 12 (8 bonus points, max 4 from 10th). Only the six 10th-grade A's → 4 bonus points |
| LSAC cycle | A (3 credits, undergraduate) + B (3 credits, dual enrollment) | 2026–27 → 3.50; 2027–28 → 4.00 with the exclusion reason shown |
Also test: decimal credits, negative values, blank input, incomplete weights, zero denominator, identical grades with different weights, page refresh, profile change.

## 6. Internal links (real <a href>, anchor text must make sense alone)
- Home → "calculate a college GPA" (College), "compare weighted and unweighted GPA" (High School); tool picker lists all 10 routes in the three groups.
- College → "add your previous college credits" (Cumulative); "convert a percentage to a letter grade" (Percentage).
- High School → "estimate your University of California GPA" (UC); "calculate a basic GPA" (Home).
- Cumulative → "calculate this semester's college GPA" (College).
- Grade → "use this grade to plan your final" (Final Grade; opt-in local handoff of the percentage).
- Final Grade → "calculate your current class grade" (Grade); "combine quarter grades and an exam" (Semester Grade).
- Semester Grade → "find the final exam score you need" (Final Grade); "see the letter grade for this percentage" (Percentage).
- Percentage → "use this letter grade in your college GPA" (College).
- UC → "compare your school's weighted GPA" (High School).
- Law School → "compare your college GPA" (College) + official LSAC source for the active cycle.
Handoffs use a normal link plus opt-in local state. If the destination already holds work, ask before replacing and offer Cancel. Only compatible values transfer (a percentage is never a GPA).

## 7. Technical SEO
- TanStack Start with SSR. The first HTML response of every public route contains the title, H1, meta description, canonical, intro sentence, formula/example text and all internal hrefs, before hydration and without interaction. localStorage only on the client.
- One absolute canonical per page on https://gpacalculatorlab.com with trailing slash. Unique title and description per route (table above).
- Per-route Open Graph and Twitter tags: exactly one og:image per page, absolute URL, 1200×630, under 300 KB, with og:image:width, og:image:height, og:image:type, og:image:alt and twitter:image. Each route gets its own image (brand template + that page's H1).
- sitemap.xml lists only public, canonical, indexable, 200 URLs and is referenced from robots.txt. Preview hosts and /_brand/ are noindex. Staging protection must not ship to production.
- Structured data: WebSite on the homepage; BreadcrumbList only where a breadcrumb is visible. No ratings, no FAQPage unless the questions are visible on the page.
- Mobile first: 360, 390, tablet, desktop. Visible labels above inputs, inputmode="decimal" for numbers, keyboard operable, focus moves to the new row after "Add class" and to a sensible target after "Remove", results announced via aria-live="polite". On tool pages the first input is visible without scrolling past a hero at 360×640.
- Targets (field p75): LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.
- Storage: "Save on this device" and "Clear saved data" are explicit. Blocked storage must not break calculation.
- Analytics (only if connected): calculator_started, valid_result, next_tool_click with tool_id and action type. No grade values. One valid_result per deliberate calculation, not per keystroke.

## 8. Source registry
| Policy | Source | Verified |
|---|---|---|
| UC GPA requirement and honors caps | https://admission.universityofcalifornia.edu/admission-requirements/first-year-requirements/gpa-requirement.html | 2026-11-22 |
| LSAC transcript summarization | https://www.lsac.org/applying-law-school/jd-application-process/cas/requesting/transcript-summarization | 2026-11-22 |
| LSAC dual-enrollment change by cycle (announced 2026-08-18) | https://www.lsac.org/blog/providing-more-time-adjust-lsac-gpa-changes | 2026-11-22 |

## 9. Build phases (work order, not a ranking)
0–1 Brief, identity, homepage · 2 GPA engine, College, High School, Cumulative · 3 Percentage, Grade, Semester Grade, Final Grade · 4 UC and Law School · 5 Copy, links, indexability · 6 QA · 7 Domain, launch, measurement.
Done (phase 2, 2026-11-22): /college-gpa-calculator/, /high-school-gpa-calculator/, /cumulative-gpa-calculator/.
Done (phase 3, 2026-11-22): /percentage-to-letter-grade/, /grade-calculator/, /semester-grade-calculator/, /final-grade-calculator/.
After each phase report: what changed, test results as expected vs actual, and anything left open.
