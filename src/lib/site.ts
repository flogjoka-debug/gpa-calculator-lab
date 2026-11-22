import { HOME_FAQ, PAGE_FAQS, breadcrumbSchema, faqSchema } from "./seo-content";
import { GUIDE_CONTENT } from "./guides-content";

export const SITE_URL = "https://gpacalculatorlab.com";
export const SITE_NAME = "GPA Calculator Lab";

export interface PageInfo { path: string; h1: string; title: string; description: string; og: string; ogAlt: string; indexable: boolean; parent?: { path: string; h1: string }; article?: { published: string; updated: string } }

export const PAGES = {
  home: { path: "/", h1: "GPA Calculator", title: "GPA Calculator – Calculate Your GPA With or Without Credits", description: "Free GPA calculator for high school and college. Enter grades and credits to get your GPA on a 4.0 scale, your quality points, and which classes counted.", og: "home.png", ogAlt: "GPA calculator result showing a 3.43 GPA from 24 quality points and 7 credits", indexable: true },
  college: { path: "/college-gpa-calculator/", h1: "College GPA Calculator", title: "College GPA Calculator – Semester GPA, Plus/Minus & Retakes", description: "Calculate your college or semester GPA from credit hours and plus/minus grades. Compare counting both attempts of a retaken class with grade replacement.", og: "college.png", ogAlt: "College GPA calculator comparing a 2.50 and a 4.00 GPA for a retaken class", indexable: true },
  highSchool: { path: "/high-school-gpa-calculator/", h1: "High School GPA Calculator", title: "High School GPA Calculator – Weighted & Unweighted GPA", description: "Free high school GPA calculator. See your weighted and unweighted GPA side by side, set Honors, AP and IB bonus points, and see what each class adds.", og: "high-school.png", ogAlt: "High school GPA calculator showing a 3.50 unweighted and 4.00 weighted GPA", indexable: true },
  cumulative: { path: "/cumulative-gpa-calculator/", h1: "Cumulative GPA Calculator", title: "Cumulative GPA Calculator – How to Calculate Cumulative GPA", description: "Add new semesters to your current GPA. Use GPA credits and quality points from your transcript for an exact cumulative GPA, or a rounded GPA for an estimate.", og: "cumulative.png", ogAlt: "Cumulative GPA calculator showing 78 quality points over 24 credits and a 3.25 GPA", indexable: true },
  grade: { path: "/grade-calculator/", h1: "Grade Calculator", title: "Grade Calculator – Calculate Your Class Grade (Weighted)", description: "Calculate your current grade in a class from assignment points or weighted categories like tests and homework. Blank scores stay out; zeros count.", og: "grade.png", ogAlt: "Grade calculator showing an 86% grade from two weighted categories", indexable: true },
  finalGrade: { path: "/final-grade-calculator/", h1: "Final Grade Calculator", title: "Final Grade Calculator – What Do I Need on My Final Exam?", description: "Enter your current grade, target grade, and exam weight to see the score you need on your final and the highest course grade you can still earn.", og: "final.png", ogAlt: "Final grade calculator showing a 97.5% score needed on the final to reach 90%", indexable: true },
  semester: { path: "/semester-grade-calculator/", h1: "Semester Grade Calculator", title: "Semester Grade Calculator – Quarter Grades + Semester Exam", description: "Combine two quarter grades and your semester exam into one semester grade. Use 40/40/20, 45/45/10, no exam or custom weights, and see what you need on the exam.", og: "semester.png", ogAlt: "Semester grade calculator showing 82% from quarter grades of 90 and 80 and a 70 on the exam", indexable: true },
  percentage: { path: "/percentage-to-letter-grade/", h1: "Percentage to Letter Grade Calculator", title: "Percentage to Letter Grade Calculator + Grade Chart", description: "Convert any percentage, even decimals like 89.5, to a letter grade. See the full grade chart, your grade's range, and how far you are from the next one.", og: "percentage.png", ogAlt: "Percentage to letter grade calculator converting 89.99% to a B+", indexable: true },
  uc: { path: "/uc-gpa-calculator/", h1: "UC GPA Calculator", title: "UC GPA Calculator – How to Calculate Your UC GPA (Capped)", description: "Enter your A-G grades from 10th and 11th grade to estimate your UC GPA. See your capped and unweighted GPA and which honors points count toward the 8-point cap.", og: "uc.png", ogAlt: "UC GPA calculator showing a 4.66 capped GPA with 8 of 12 honors points counted", indexable: true },
  law: { path: "/law-school-gpa-calculator/", h1: "Law School GPA Calculator (LSAC GPA)", title: "LSAC GPA Calculator – Law School GPA by Application Cycle", description: "Estimate your LSAC GPA, the GPA law schools see, with A+ at 4.33 and every repeated class counted. Pick your cycle to see how dual-enrollment grades count.", og: "law.png", ogAlt: "Law school GPA calculator showing a 3.50 LSAC GPA for the 2026–2027 cycle", indexable: true },
} satisfies Record<string, PageInfo>;

/** Support pages (phase 5). They use the home social image as an approved fallback. */
const SUPPORT_OG = { og: "home.png", ogAlt: "GPA calculator result showing a 3.43 GPA from 24 quality points and 7 credits", indexable: true };
export const SUPPORT = {
  about: { path: "/about/", h1: "About GPA Calculator Lab", title: "About GPA Calculator Lab", description: "What GPA Calculator Lab is, who it's for, and how the calculators handle your grades.", ...SUPPORT_OG },
  methodology: { path: "/methodology/", h1: "How our calculators work", title: "How Our Calculators Work – GPA Calculator Lab", description: "The formulas, grade scales and policy sources behind every GPA Calculator Lab calculator, with the date each rule was checked.", ...SUPPORT_OG },
  privacy: { path: "/privacy/", h1: "Privacy", title: "Privacy – GPA Calculator Lab", description: "Your grades stay in your browser. What GPA Calculator Lab stores, what it doesn't, and how to clear it.", ...SUPPORT_OG },
  contact: { path: "/contact/", h1: "Contact", title: "Contact GPA Calculator Lab", description: "Report a wrong result or an outdated rule, or send a question about GPA Calculator Lab.", ...SUPPORT_OG },
} satisfies Record<string, PageInfo>;

/** Guides: long-form answers to common GPA questions, each linked to the matching calculators. */
const GUIDE_DATES = { published: "2026-11-22", updated: "2026-11-22" };
const GUIDES_HUB = { path: "/guides/", h1: "GPA Guides" };
const guide = (key: keyof typeof GUIDE_CONTENT, og: string, ogAlt: string): PageInfo => {
  const c = GUIDE_CONTENT[key];
  return { path: c.path, h1: c.h1, title: c.title, description: c.description, og, ogAlt, indexable: true, parent: GUIDES_HUB, article: GUIDE_DATES };
};
export const GUIDES = {
  hub: { ...GUIDES_HUB, title: "GPA Guides – Good GPA, GPA Scale and Raising Your GPA", description: "Short, sourced guides to GPA: what counts as a good GPA, weighted vs unweighted, the 4.0 scale with percentages, and how to raise your GPA.", og: "guides.png", ogAlt: "GPA Calculator Lab guides to good GPAs, the 4.0 scale and raising your GPA", indexable: true },
  goodGpa: guide("goodGpa", "guide-good-gpa.png", "What is a good GPA: the average U.S. high school GPA was 3.11 in 2019"),
  weighted: guide("weighted", "guide-weighted.png", "Weighted vs unweighted GPA example: 3.88 weighted next to 3.25 unweighted"),
  scale: guide("scale", "guide-gpa-scale.png", "4.0 GPA scale: an A from 93 to 100 percent is worth 4.0 grade points"),
  raise: guide("raise", "guide-raise-gpa.png", "How to raise your GPA: a 3.6 semester takes a 2.8 GPA to 3.0"),
} satisfies Record<string, PageInfo>;
export const GUIDE_LIST: PageInfo[] = [GUIDES.goodGpa, GUIDES.weighted, GUIDES.scale, GUIDES.raise];

/** Single public route registry: sitemap, canonicals and Open Graph tags all come from here. */
export const ROUTES: PageInfo[] = [...Object.values(PAGES), GUIDES.hub, ...GUIDE_LIST, ...Object.values(SUPPORT)];
export const INDEXABLE_ROUTES = ROUTES.filter((r) => r.indexable);

export const TOOL_GROUPS: { label: string; items: PageInfo[] }[] = [
  { label: "GPA", items: [PAGES.college, PAGES.highSchool, PAGES.cumulative] },
  { label: "Grades", items: [PAGES.grade, PAGES.finalGrade, PAGES.semester, PAGES.percentage] },
  { label: "Admissions", items: [PAGES.uc, PAGES.law] },
];

export const canonical = (path: string) => `${SITE_URL}${path}`;


/** Full head for a registry page (title, description, canonical, one og:image). */
export function pageHead(page: PageInfo) {
  const img = `${SITE_URL}/og/${page.og}`;
  const ogAlt = page.ogAlt;
  const faq = PAGE_FAQS[page.path];
  return {
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:url", content: canonical(page.path) },
      { property: "og:image", content: img },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:alt", content: ogAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: page.title },
      { name: "twitter:description", content: page.description },
      { name: "twitter:image", content: img },
      { name: "twitter:image:alt", content: ogAlt },
      ...(page.indexable ? [] : [{ name: "robots", content: "noindex" }]),
    ],
    links: [{ rel: "canonical", href: canonical(page.path) }],
    scripts: (page.path === "/" ? [
      { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/` },
      { "@context": "https://schema.org", "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/`, logo: `${SITE_URL}/icon-512.png`, email: "info@gpacalculatorlab.com" },
      faqSchema(HOME_FAQ),
    ] : [...(page.article ? [articleSchema(page)] : []), breadcrumbSchema(page, SITE_URL), ...(faq ? [faqSchema(faq)] : [])]).map((schema) => ({ type: "application/ld+json", children: JSON.stringify(schema) })),
  };
}

/** Article schema for guides: the publisher is the site itself; no invented authors. */
export function articleSchema(page: PageInfo) {
  const org = { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/`, logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-512.png` } };
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.description,
    image: `${SITE_URL}/og/${page.og}`,
    datePublished: page.article?.published,
    dateModified: page.article?.updated,
    author: org,
    publisher: org,
    mainEntityOfPage: canonical(page.path),
  };
}

/** Head for the 404 page: noindex, home social image, no canonical. */
export const NOT_FOUND_TITLE = "Page not found – GPA Calculator Lab";
export function notFoundHead() {
  const img = `${SITE_URL}/og/home.png`;
  return {
    meta: [
      { title: NOT_FOUND_TITLE },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Page not found – GPA Calculator Lab" },
      { property: "og:image", content: img },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:alt", content: PAGES.home.ogAlt },
      { name: "twitter:image", content: img },
    ],
  };
}
