import { HOME_FAQ, PAGE_FAQS, breadcrumbSchema, faqSchema } from "./seo-content";
import { GUIDE_CONTENT } from "./guides-content";
import { PAGE_META } from "./page-meta";

export const SITE_URL = "https://gpacalculatorlab.com";
export const SITE_NAME = "GPA Calculator Lab";

export interface PageInfo { path: string; h1: string; title: string; description: string; og: string; ogAlt: string; indexable: boolean; parent?: { path: string; h1: string }; article?: { published: string; updated: string }; updated?: string }

export const PAGES = {
  home: { path: "/", h1: "GPA Calculator", title: "GPA Calculator – Semester, Cumulative & Weighted GPA", description: "Free GPA calculator for high school and college. Add semesters, your GPA so far and Honors or AP classes to get your semester, cumulative and weighted GPA.", og: "home.png", ogAlt: "GPA calculator result showing a 3.43 GPA from 24 quality points and 7 credits", indexable: true, updated: "2026-11-23" },
  college: { path: "/college-gpa-calculator/", h1: "College GPA Calculator", title: "College GPA Calculator – Semester GPA, Plus/Minus & Retakes", description: "Free college GPA calculator: enter credit hours and plus/minus grades for your semester GPA, and compare counting both attempts of a retake with replacement.", og: "college.png", ogAlt: "College GPA calculator comparing a 2.50 and a 4.00 GPA for a retaken class", indexable: true , updated: "2026-11-23" },
  highSchool: { path: "/high-school-gpa-calculator/", h1: "High School GPA Calculator", title: "High School GPA Calculator – Weighted & Unweighted GPA", description: "Free high school GPA calculator. See your weighted and unweighted GPA side by side, set Honors, AP and IB bonus points, and see what each class adds.", og: "high-school.png", ogAlt: "High school GPA calculator showing a 3.50 unweighted and 4.00 weighted GPA", indexable: true , updated: "2026-11-23" },
  cumulative: { path: "/cumulative-gpa-calculator/", h1: "Cumulative GPA Calculator", title: "Cumulative GPA Calculator – How to Calculate Cumulative GPA", description: "Free cumulative GPA calculator: add new semesters to the GPA credits and quality points on your transcript for an exact cumulative GPA, or start from your GPA.", og: "cumulative.png", ogAlt: "Cumulative GPA calculator showing 78 quality points over 24 credits and a 3.25 GPA", indexable: true , updated: "2026-11-23" },
  grade: { path: "/grade-calculator/", h1: "Grade Calculator", title: "Grade Calculator – Weighted Grades, Points or Categories", description: "Free grade calculator: work out your class grade from assignment points or weighted categories like tests and homework. Blank scores stay out; zeros count.", og: "grade.png", ogAlt: "Grade calculator showing an 86% grade from two weighted categories", indexable: true , updated: "2026-11-23" },
  finalGrade: { path: "/final-grade-calculator/", h1: "Final Grade Calculator", title: "Final Grade Calculator – What Do I Need on My Final Exam?", description: "Free final grade calculator: find the score you need on your final exam for an A, B or C from your current grade and the exam's weight, with the math shown.", og: "final.png", ogAlt: "Final grade calculator showing a 97.5% score needed on the final to reach 90%", indexable: true , updated: "2026-11-23" },
  semester: { path: "/semester-grade-calculator/", h1: "Semester Grade Calculator", title: "Semester Grade Calculator – Quarter Grades + Semester Exam", description: "Free semester grade calculator: combine two quarter grades and your exam with 40/40/20, 45/45/10 or custom weights, and see the exam score you need.", og: "semester.png", ogAlt: "Semester grade calculator showing 82% from quarter grades of 90 and 80 and a 70 on the exam", indexable: true , updated: "2026-11-23" },
  percentage: { path: "/percentage-to-letter-grade/", h1: "Percentage to Letter Grade Calculator", title: "Percentage to Letter Grade Calculator + Grade Chart (A–F)", description: "Free percentage to letter grade calculator: convert any percentage to a letter grade, even 89.5, with the A–F chart and your distance to the next letter.", og: "percentage.png", ogAlt: "Percentage to letter grade calculator converting 89.99% to a B+", indexable: true , updated: "2026-11-23" },
  uc: { path: "/uc-gpa-calculator/", h1: "UC GPA Calculator", title: "UC GPA Calculator – How to Calculate Your UC GPA (Capped)", description: "Free UC GPA calculator: estimate your capped and unweighted UC GPA from 10th and 11th grade A-G courses and see which honors points count toward the cap.", og: "uc.png", ogAlt: "UC GPA calculator showing a 4.66 capped GPA with 8 of 12 honors points counted", indexable: true , updated: "2026-11-23" },
  law: { path: "/law-school-gpa-calculator/", h1: "Law School GPA Calculator (LSAC GPA)", title: "Law School GPA Calculator – Your LSAC GPA by Cycle", description: "Free law school GPA calculator: estimate your LSAC GPA with A+ at 4.33 and every retake counted. Pick your cycle to see how dual-enrollment grades count.", og: "law.png", ogAlt: "Law school GPA calculator showing a 3.50 LSAC GPA for the 2026–2027 cycle", indexable: true , updated: "2026-11-23" },
  converter: { path: "/gpa-converter/", h1: "GPA Converter", title: PAGE_META.converter.title, description: PAGE_META.converter.meta, og: "converter.png", ogAlt: "GPA converter turning a 4.1 on a 4.5 scale into a 3.64 on a 4.0 scale", indexable: true , updated: "2026-11-23" },
} satisfies Record<string, PageInfo>;

/** Support pages (phase 5). They use the home social image as an approved fallback. */
const SUPPORT_OG = { og: "home.png", ogAlt: "GPA calculator result showing a 3.43 GPA from 24 quality points and 7 credits", indexable: true };
export const SUPPORT = {
  about: { path: "/about/", h1: "About GPA Calculator Lab", title: PAGE_META.about.title, description: PAGE_META.about.meta, ...SUPPORT_OG, og: "about.png", ogAlt: "About GPA Calculator Lab: free GPA tools that show their math" },
  methodology: { path: "/methodology/", h1: "How our calculators work", title: "How Our Calculators Work – GPA Calculator Lab", description: "The formulas, grade scales and policy sources, including UC and LSAC rules, behind every GPA Calculator Lab calculator, with the date each rule was checked.", ...SUPPORT_OG, og: "methodology.png", ogAlt: "How our calculators work: a UC capped GPA of 4.66 from (48 + 8) ÷ 12" , updated: "2026-11-23" },
  privacy: { path: "/privacy/", h1: "Privacy Policy", title: PAGE_META.privacy.title, description: PAGE_META.privacy.meta, ...SUPPORT_OG, og: "privacy.png", ogAlt: "GPA Calculator Lab privacy policy: your grades stay in your browser" , updated: "2026-11-23" },
  forSchools: { path: "/for-schools/", h1: "Free GPA Calculator for Your School Website", title: PAGE_META.forSchools.title, description: PAGE_META.forSchools.meta, ...SUPPORT_OG, og: "for-schools.png", ogAlt: "Embed the free GPA Calculator Lab calculator on your school website", updated: "2026-11-23" },
  terms: { path: "/terms/", h1: "Terms of Use", title: PAGE_META.terms.title, description: PAGE_META.terms.meta, ...SUPPORT_OG, og: "terms.png", ogAlt: "GPA Calculator Lab terms of use: free calculators that give estimates", updated: "2026-11-22" },
  contact: { path: "/contact/", h1: "Contact GPA Calculator Lab", title: PAGE_META.contact.title, description: PAGE_META.contact.meta, ...SUPPORT_OG, og: "contact.png", ogAlt: "Contact GPA Calculator Lab to report an error or an outdated rule", updated: "2026-11-23" },
} satisfies Record<string, PageInfo>;

/** Guides: long-form answers to common GPA questions, each linked to the matching calculators. */
const GUIDE_DATES = { published: "2026-11-22", updated: "2026-11-23" };
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
  { label: "GPA", items: [PAGES.college, PAGES.highSchool, PAGES.cumulative, PAGES.converter] },
  { label: "Grades", items: [PAGES.grade, PAGES.finalGrade, PAGES.semester, PAGES.percentage] },
  { label: "Admissions", items: [PAGES.uc, PAGES.law] },
];

export const canonical = (path: string) => `${SITE_URL}${path}`;


/** Entities shared across pages: the site (publisher) and FloPixels (the studio that builds and maintains it). */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const FLOPIXELS = { "@type": "Organization", "@id": "https://flopixels.net/#organization", name: "FloPixels", url: "https://flopixels.net/" };
export const ORGANIZATION = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
  email: "info@gpacalculatorlab.com",
  foundingDate: "2026-11",
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: "info@gpacalculatorlab.com", availableLanguage: "English" },
};
const ORG_REF = { "@id": ORG_ID };
/** Date each page's content last changed; used for sitemap lastmod and article dates. */
/** Date of the last content change. Bump a page's own `updated` (or a guide's article.updated) when its copy or rules change; never tie it to the build. */
export const SITE_UPDATED = "2026-11-22";
export const lastModified = (page: PageInfo) => page.article?.updated ?? page.updated ?? SITE_UPDATED;

const CALCULATOR_PATHS = new Set<string>(Object.values(PAGES).map((p) => p.path));
const ld = (schema: Record<string, unknown>) => ({ "@context": "https://schema.org", ...schema });

/** WebApplication for the 10 calculators: free, runs in the browser, published by the site. */
export function webAppSchema(page: PageInfo) {
  return ld({
    "@type": "WebApplication",
    "@id": `${canonical(page.path)}#app`,
    name: page.h1,
    url: canonical(page.path),
    description: page.description,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    inLanguage: "en-US",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: ORG_REF,
    creator: FLOPIXELS,
    dateModified: lastModified(page),
  });
}

/** Extra page-type schema for the hub and support pages. */
function pageTypeSchema(page: PageInfo): Record<string, unknown>[] {
  if (page.path === GUIDES.hub.path) {
    return [ld({
      "@type": "CollectionPage", "@id": `${canonical(page.path)}#page`, name: page.h1, url: canonical(page.path), description: page.description, publisher: ORG_REF,
      mainEntity: { "@type": "ItemList", itemListElement: GUIDE_LIST.map((g, i) => ({ "@type": "ListItem", position: i + 1, url: canonical(g.path), name: g.h1 })) },
    })];
  }
  if (page.path === SUPPORT.about.path) return [ld({ "@type": "AboutPage", name: page.h1, url: canonical(page.path), mainEntity: { ...ORGANIZATION, creator: FLOPIXELS } })];
  if (page.path === SUPPORT.contact.path) return [ld({ "@type": "ContactPage", name: page.h1, url: canonical(page.path), mainEntity: ORGANIZATION })];
  if ([SUPPORT.privacy.path, SUPPORT.terms.path, SUPPORT.forSchools.path].includes(page.path)) {
    return [ld({
      "@type": "WebPage", "@id": `${canonical(page.path)}#webpage`, url: canonical(page.path), name: page.title, description: page.description,
      inLanguage: "en-US", isPartOf: { "@id": WEBSITE_ID }, publisher: ORG_REF, dateModified: lastModified(page),
    })];
  }
  if (page.path === SUPPORT.methodology.path) {
    return [ld({
      "@type": "TechArticle", headline: page.h1, description: page.description, url: canonical(page.path), dateModified: lastModified(page),
      author: FLOPIXELS, publisher: ORGANIZATION, citation: METHODOLOGY_SOURCES,
    })];
  }
  return [];
}

/** Policy sources cited on the methodology page. */
export const METHODOLOGY_SOURCES = [
  "https://admission.universityofcalifornia.edu/admission-requirements/first-year-requirements/gpa-requirement.html",
  "https://www.lsac.org/applying-law-school/jd-application-process/cas/requesting/transcript-summarization",
  "https://www.lsac.org/blog/providing-more-time-adjust-lsac-gpa-changes",
];

/** WebPage node for calculator pages: who wrote and checked the page, and when it last changed. */
function webPageSchema(page: PageInfo) {
  return ld({
    "@type": "WebPage",
    "@id": `${canonical(page.path)}#webpage`,
    url: canonical(page.path),
    name: page.title,
    description: page.description,
    inLanguage: "en-US",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": `${canonical(page.path)}#app` },
    primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/og/${page.og}`, width: 1200, height: 630 },
    dateModified: lastModified(page),
    author: FLOPIXELS,
    reviewedBy: FLOPIXELS,
    publisher: ORG_REF,
  });
}

/** Full head for a registry page (title, description, canonical, one og:image). */
export function pageHead(page: PageInfo) {
  const img = `${SITE_URL}/og/${page.og}`;
  const ogAlt = page.ogAlt;
  const faq = PAGE_FAQS[page.path];
  const isHome = page.path === "/";
  const schemas: Record<string, unknown>[] = isHome
    ? [
        ld({ "@type": "WebSite", "@id": WEBSITE_ID, name: SITE_NAME, url: `${SITE_URL}/`, inLanguage: "en-US", publisher: ORG_REF }),
        ld({ ...ORGANIZATION, creator: FLOPIXELS }),
        webPageSchema(page),
        webAppSchema(page),
        faqSchema(HOME_FAQ),
      ]
    : [
        ...(page.article ? [articleSchema(page)] : []),
        ...(CALCULATOR_PATHS.has(page.path) ? [webPageSchema(page), webAppSchema(page)] : []),
        ...pageTypeSchema(page),
        breadcrumbSchema(page, SITE_URL),
        ...(faq ? [faqSchema(faq)] : []),
      ];
  return {
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { property: "og:type", content: page.article ? "article" : "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:url", content: canonical(page.path) },
      { property: "og:image", content: img },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:alt", content: ogAlt },
      ...(page.article ? [
        { property: "article:published_time", content: page.article.published },
        { property: "article:modified_time", content: page.article.updated },
      ] : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: page.title },
      { name: "twitter:description", content: page.description },
      { name: "twitter:image", content: img },
      { name: "twitter:image:alt", content: ogAlt },
      ...(page.indexable ? [] : [{ name: "robots", content: "noindex" }]),
    ],
    links: [{ rel: "canonical", href: canonical(page.path) }],
    scripts: schemas.map((schema) => ({ type: "application/ld+json", children: JSON.stringify(schema) })),
  };
}

/** Article schema for guides: written and maintained by FloPixels, published by the site. */
export function articleSchema(page: PageInfo) {
  return ld({
    "@type": "Article",
    headline: page.h1,
    description: page.description,
    image: `${SITE_URL}/og/${page.og}`,
    datePublished: page.article?.published,
    dateModified: page.article?.updated,
    inLanguage: "en-US",
    author: FLOPIXELS,
    publisher: ORGANIZATION,
    mainEntityOfPage: canonical(page.path),
  });
}

/** Head for the 404 page: noindex, home social image, no canonical. */
export const NOT_FOUND_TITLE = "Page not found – GPA Calculator Lab";
export function notFoundHead() {
  const img = `${SITE_URL}/og/home.png`;
  return {
    meta: [
      { title: NOT_FOUND_TITLE },
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
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
