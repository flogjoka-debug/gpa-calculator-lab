export interface FaqLink { text: string; to: string }
export interface FaqItem { question: string; answer: (string | FaqLink)[] }

export const HOME_FAQ: FaqItem[] = [
  { question: "What is a GPA?", answer: ["A grade point average turns your letter grades into one number, usually on a 4.0 scale. Each class is weighted by its credits, so a class that meets more often or carries more credit counts more."] },
  { question: "Can a GPA be higher than 4.0?", answer: ["An unweighted GPA tops out at 4.0. A weighted GPA can go higher because Honors, AP and IB classes earn bonus points. You can ", { text: "compare weighted and unweighted GPA", to: "/high-school-gpa-calculator/" }, " for your own classes."] },
  { question: "Is a 3.0 GPA good?", answer: ["A 3.0 is a B average on the 4.0 scale. Whether it's good enough depends on the goal: scholarships, honor societies and college programs each set their own minimums. Check the exact requirement for the one you care about."] },
  { question: "Does an F count in my GPA?", answer: ["Yes. An F adds zero quality points, but its credits stay in the total, so it pulls the GPA down. An A and an F in two 3-credit classes give 12 ÷ 6 = 2.00."] },
  { question: "Do pass/fail classes affect my GPA?", answer: ["Usually not. A passing grade in a pass/fail class adds credits to your transcript but no grade points. Some schools count a failed pass/fail class as an F, so check your school's policy."] },
];

export const faqAnswerText = (item: FaqItem) => item.answer.map((part) => typeof part === "string" ? part : part.text).join("");

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: faqAnswerText(item) } })),
  };
}

export function breadcrumbSchema(page: { path: string; h1: string }, origin: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
      { "@type": "ListItem", position: 2, name: page.h1, item: `${origin}${page.path}` },
    ],
  };
}

export const HOME_SCALE_ROWS = [
  ["A", "93 to 100", "4.0"], ["A−", "90 to under 93", "3.7"],
  ["B+", "87 to under 90", "3.3"], ["B", "83 to under 87", "3.0"],
  ["B−", "80 to under 83", "2.7"], ["C+", "77 to under 80", "2.3"],
  ["C", "73 to under 77", "2.0"], ["C−", "70 to under 73", "1.7"],
  ["D+", "67 to under 70", "1.3"], ["D", "63 to under 67", "1.0"],
  ["D−", "60 to under 63", "0.7"], ["F", "below 60", "0.0"],
];