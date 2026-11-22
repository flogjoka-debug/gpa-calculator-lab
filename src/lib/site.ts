export const SITE_URL = "https://gpacalculatorlab.com";
export const SITE_NAME = "GPA Calculator Lab";

export interface PageInfo { path: string; h1: string; title: string; description: string; og: string; ogAlt: string; indexable: boolean }

export const PAGES = {
  home: { path: "/", h1: "GPA Calculator", title: "GPA Calculator – See Your GPA and the Math Behind It", description: "Enter your grades and credits to get your GPA, total quality points, and the credits that counted. Free, works on your phone, no account needed.", og: "home.png", ogAlt: "GPA calculator result showing a 3.43 GPA from 24 quality points and 7 credits", indexable: true },
  college: { path: "/college-gpa-calculator/", h1: "College GPA Calculator", title: "College GPA Calculator – Credits, Plus/Minus, Retakes", description: "Calculate your college GPA with credit hours and plus/minus grades. Compare counting both attempts of a retake with replacing the earlier grade.", og: "college.png", ogAlt: "College GPA calculator comparing a 2.50 and a 4.00 GPA for a retaken class", indexable: true },
  highSchool: { path: "/high-school-gpa-calculator/", h1: "High School GPA Calculator", title: "High School GPA Calculator – Weighted and Unweighted", description: "See your weighted and unweighted high school GPA side by side. Set your school's Honors, AP, and IB bonus points and check what each class adds.", og: "high-school.png", ogAlt: "High school GPA calculator showing a 3.50 unweighted and 4.00 weighted GPA", indexable: true },
  cumulative: { path: "/cumulative-gpa-calculator/", h1: "Cumulative GPA Calculator", title: "Cumulative GPA Calculator – Add New Semesters to Your GPA", description: "Combine your prior GPA and credits with new semesters. Use exact quality points from your transcript, or get a labeled estimate from a rounded GPA.", og: "cumulative.png", ogAlt: "Cumulative GPA calculator showing 78 quality points over 24 credits and a 3.25 GPA", indexable: true },
  grade: { path: "/grade-calculator/", h1: "Grade Calculator", title: "Grade Calculator – Points or Weighted Categories", description: "Find your current class grade from assignment points or weighted categories. Blank scores stay out of the math, and zeros count as real grades.", og: "grade.png", ogAlt: "Grade calculator showing an 86% grade from two weighted categories", indexable: true },
  finalGrade: { path: "/final-grade-calculator/", h1: "Final Grade Calculator", title: "Final Grade Calculator – What Do I Need on My Final?", description: "Enter your current grade, target grade, and exam weight to see the score you need on your final and the highest course grade you can still earn.", og: "final.png", ogAlt: "Final grade calculator showing a 97.5% score needed on the final to reach 90%", indexable: true },
  semester: { path: "/semester-grade-calculator/", h1: "Semester Grade Calculator", title: "Semester Grade Calculator – Quarters Plus Final Exam", description: "Combine two quarter grades and a final exam into your semester grade. Use 40/40/20, no exam, or your own weights, and see the math step by step.", og: "semester.png", ogAlt: "Semester grade calculator showing 82% from quarter grades of 90 and 80 and a 70 on the exam", indexable: true },
  percentage: { path: "/percentage-to-letter-grade/", h1: "Percentage to Letter Grade Calculator", title: "Percentage to Letter Grade Calculator (With Your Scale)", description: "Convert any percentage, including decimals like 89.5, to a letter grade. See the range, how far you are from the next grade, and use your syllabus cutoffs.", og: "percentage.png", ogAlt: "Percentage to letter grade calculator converting 89.99% to a B+", indexable: true },
  uc: { path: "/uc-gpa-calculator/", h1: "UC GPA Calculator", title: "UC GPA Calculator – Capped Weighted and Unweighted", description: "Enter your A-G courses from 10th and 11th grade to estimate your UC GPA. See which honors points count, which ones hit the 8-semester cap, and why.", og: "uc.png", ogAlt: "UC GPA calculator showing a 4.66 capped GPA with 8 of 12 honors points counted", indexable: true },
  law: { path: "/law-school-gpa-calculator/", h1: "Law School GPA Calculator", title: "Law School GPA Calculator – LSAC GPA by Application Cycle", description: "Estimate your LSAC undergraduate GPA with A+ at 4.33 and every attempt counted. Pick your application cycle to see how dual-enrollment grades are treated.", og: "law.png", ogAlt: "Law school GPA calculator showing a 3.50 LSAC GPA for the 2026–2027 cycle", indexable: true },
} satisfies Record<string, PageInfo>;

/** Support pages (phase 5). They use the home social image as an approved fallback. */
const SUPPORT_OG = { og: "home.png", ogAlt: "GPA calculator result showing a 3.43 GPA from 24 quality points and 7 credits", indexable: true };
export const SUPPORT = {
  about: { path: "/about/", h1: "About GPA Calculator Lab", title: "About GPA Calculator Lab", description: "What GPA Calculator Lab is, who it's for, and how the calculators handle your grades.", ...SUPPORT_OG },
  methodology: { path: "/methodology/", h1: "How our calculators work", title: "How Our Calculators Work – GPA Calculator Lab", description: "The formulas, grade scales and policy sources behind every GPA Calculator Lab calculator, with the date each rule was checked.", ...SUPPORT_OG },
  privacy: { path: "/privacy/", h1: "Privacy", title: "Privacy – GPA Calculator Lab", description: "Your grades stay in your browser. What GPA Calculator Lab stores, what it doesn't, and how to clear it.", ...SUPPORT_OG },
  contact: { path: "/contact/", h1: "Contact", title: "Contact GPA Calculator Lab", description: "Report a wrong result or an outdated rule, or send a question about GPA Calculator Lab.", ...SUPPORT_OG },
} satisfies Record<string, PageInfo>;

/** Single public route registry: sitemap, canonicals and Open Graph tags all come from here. */
export const ROUTES: PageInfo[] = [...Object.values(PAGES), ...Object.values(SUPPORT)];
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
