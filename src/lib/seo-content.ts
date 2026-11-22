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

export const COLLEGE_FAQ: FaqItem[] = [
  {
    "question": "How many credits is a typical college class?",
    "answer": [
      "Many lecture classes carry 3 or 4 credit hours, and labs often carry 1. Your course schedule or transcript lists the exact number for each class."
    ]
  },
  {
    "question": "Does a W hurt my GPA?",
    "answer": [
      "A W usually carries no grade points and isn't counted in your GPA. It still stays on your transcript, and withdrawals can matter for financial aid progress rules, so talk to your advisor before you drop."
    ]
  },
  {
    "question": "Is an A+ worth more than 4.0 in college?",
    "answer": [
      "At many colleges an A+ is capped at 4.0. Some give it 4.33. Set the A+ value in the scale above so it matches your transcript."
    ]
  },
  {
    "question": "Do transfer credits count in my college GPA?",
    "answer": [
      "At many colleges, transfer credits count toward your degree but not toward the GPA at your new school. Your registrar's GPA policy says how yours handles them."
    ]
  },
  {
    "question": "How do I calculate GPA on the quarter system?",
    "answer": [
      "The same way. Enter quarter units as your credits. If you need semester hours, for example for a law school application, multiply quarter units by 0.67."
    ]
  }
];

export const HIGH_SCHOOL_FAQ: FaqItem[] = [
  {
    "question": "Is a weighted GPA out of 5.0?",
    "answer": [
      "Often, when AP and IB classes add a full point. But the maximum depends on your school's bonuses, so a weighted GPA might top out at 4.5, 5.0 or something else."
    ]
  },
  {
    "question": "Do all four years of high school count?",
    "answer": [
      "For your school's cumulative GPA, usually yes. Some colleges recalculate with only certain years. UC, for example, uses grades from the summer after 9th grade through the summer after 11th grade."
    ]
  },
  {
    "question": "How do I calculate my high school GPA without credits?",
    "answer": [
      "Leave every class at 1 credit. Each class then counts the same, which is how many report cards without credits work."
    ]
  },
  {
    "question": "Does a weighted GPA look better to colleges?",
    "answer": [
      "Colleges see the classes you took, not just the number. Many recalculate GPAs with their own rules, so a higher weighted GPA only helps when it reflects harder classes that the college also credits."
    ]
  }
];

export const CUMULATIVE_FAQ: FaqItem[] = [
  {
    "question": "Is cumulative GPA the same as overall GPA?",
    "answer": [
      "Usually, yes. Both mean the GPA across all graded terms at one school. Some transcripts also show a separate GPA for your major."
    ]
  },
  {
    "question": "Why isn't my cumulative GPA the average of my semester GPAs?",
    "answer": [
      "Because semesters carry different numbers of credits. A 12-credit semester and an 18-credit semester don't count equally, so averaging the two GPAs gives the wrong answer."
    ]
  },
  {
    "question": "Does my cumulative GPA include transfer credits?",
    "answer": [
      "At many colleges it doesn't. Transfer credits count toward your degree, but only grades earned at your current school go into its GPA. Check your registrar's policy."
    ]
  },
  {
    "question": "Do high schools have a cumulative GPA too?",
    "answer": [
      "Yes. The math is the same: total quality points across all your semesters divided by total credits."
    ]
  }
];

export const PAGE_FAQS: Record<string, FaqItem[]> = {
  "/": HOME_FAQ,
  "/college-gpa-calculator/": COLLEGE_FAQ,
  "/high-school-gpa-calculator/": HIGH_SCHOOL_FAQ,
  "/cumulative-gpa-calculator/": CUMULATIVE_FAQ,
};
