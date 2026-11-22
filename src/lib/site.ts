export const SITE_URL = "https://gpacalculatorlab.com";
export const SITE_NAME = "GPA Calculator Lab";

export interface PageInfo { path: string; h1: string; title: string; description: string }

export const PAGES = {
  home: { path: "/", h1: "GPA Calculator", title: "GPA Calculator – See Your GPA and the Math Behind It", description: "Enter your grades and credits to get your GPA, total quality points, and the credits that counted. Free, works on your phone, no account needed." },
  college: { path: "/college-gpa-calculator/", h1: "College GPA Calculator", title: "College GPA Calculator – Credits, Plus/Minus, Retakes", description: "Calculate your college GPA with credit hours and plus/minus grades. Compare counting both attempts of a retake with replacing the earlier grade." },
  highSchool: { path: "/high-school-gpa-calculator/", h1: "High School GPA Calculator", title: "High School GPA Calculator – Weighted and Unweighted", description: "See your weighted and unweighted high school GPA side by side. Set your school's Honors, AP, and IB bonus points and check what each class adds." },
  cumulative: { path: "/cumulative-gpa-calculator/", h1: "Cumulative GPA Calculator", title: "Cumulative GPA Calculator – Add New Semesters to Your GPA", description: "Combine your prior GPA and credits with new semesters. Use exact quality points from your transcript, or get a labeled estimate from a rounded GPA." },
  grade: { path: "/grade-calculator/", h1: "Grade Calculator", title: "Grade Calculator – Points or Weighted Categories", description: "Find your current class grade from assignment points or weighted categories. Blank scores stay out of the math, and zeros count as real grades." },
  finalGrade: { path: "/final-grade-calculator/", h1: "Final Grade Calculator", title: "Final Grade Calculator – What Do I Need on My Final?", description: "Enter your current grade, target grade, and exam weight to see the score you need on your final and the highest course grade you can still earn." },
  semester: { path: "/semester-grade-calculator/", h1: "Semester Grade Calculator", title: "Semester Grade Calculator – Quarters Plus Final Exam", description: "Combine two quarter grades and a final exam into your semester grade. Use 40/40/20, no exam, or your own weights, and see the math step by step." },
  percentage: { path: "/percentage-to-letter-grade/", h1: "Percentage to Letter Grade Calculator", title: "Percentage to Letter Grade Calculator (With Your Scale)", description: "Convert any percentage, including decimals like 89.5, to a letter grade. See the range, how far you are from the next grade, and use your syllabus cutoffs." },
  uc: { path: "/uc-gpa-calculator/", h1: "UC GPA Calculator", title: "UC GPA Calculator – Capped Weighted and Unweighted", description: "Enter your A-G courses from 10th and 11th grade to estimate your UC GPA. See which honors points count, which ones hit the 8-semester cap, and why." },
  law: { path: "/law-school-gpa-calculator/", h1: "Law School GPA Calculator", title: "Law School GPA Calculator – LSAC GPA by Application Cycle", description: "Estimate your LSAC undergraduate GPA with A+ at 4.33 and every attempt counted. Pick your application cycle to see how dual-enrollment grades are treated." },
} satisfies Record<string, PageInfo>;

/** Support pages: the brief gives no title/description copy yet, so the H1 doubles as the title. */
export const SUPPORT = {
  about: { path: "/about/", h1: "About" },
  methodology: { path: "/methodology/", h1: "Methodology" },
  privacy: { path: "/privacy/", h1: "Privacy" },
  contact: { path: "/contact/", h1: "Contact" },
} as const;

export const TOOL_GROUPS: { label: string; items: PageInfo[] }[] = [
  { label: "GPA", items: [PAGES.college, PAGES.highSchool, PAGES.cumulative] },
  { label: "Grades", items: [PAGES.grade, PAGES.finalGrade, PAGES.semester, PAGES.percentage] },
  { label: "Admissions", items: [PAGES.uc, PAGES.law] },
];

export const canonical = (path: string) => `${SITE_URL}${path}`;

/** head() for not-yet-built pages: own title + H1, noindex. */
export function stubHead(title: string, path: string, description?: string) {
  return {
    meta: [
      { title },
      ...(description ? [{ name: "description", content: description }, { property: "og:description", content: description }] : []),
      { property: "og:title", content: title },
      { property: "og:url", content: canonical(path) },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: canonical(path) }],
  };
}
