import { GUIDE_CONTENT } from "./guides-content";
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

export function breadcrumbSchema(page: { path: string; h1: string; parent?: { path: string; h1: string } }, origin: string) {
  const trail = [{ name: "Home", path: "/" }, ...(page.parent ? [{ name: page.parent.h1, path: page.parent.path }] : []), { name: page.h1, path: page.path }];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({ "@type": "ListItem", position: i + 1, name: crumb.name, item: `${origin}${crumb.path}` })),
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

export const GRADE_FAQ: FaqItem[] = [
  {
    "question": "How much will one assignment change my grade?",
    "answer": [
      "In a points-based class, it depends on how many points are already in the gradebook. With 48 out of 60 points (80%), scoring 10 out of 20 on a quiz brings you to 58 out of 80, which is 72.5%. Later in the term, the same quiz would move your grade less."
    ]
  },
  {
    "question": "What's the difference between points-based and weighted grading?",
    "answer": [
      "With points, a 100-point test counts five times as much as a 20-point quiz. With weighted categories, each category gets its share of the grade, so ten small quizzes can count as much as one big test."
    ]
  },
  {
    "question": "Can I use this for a college class?",
    "answer": [
      "Yes. Use the weights from your course syllabus. The math is the same in high school and college."
    ]
  },
  {
    "question": "What should I do next with my grade?",
    "answer": [
      "If a final exam is coming up, ",
      {
        "text": "use this grade to plan your final",
        "to": "/final-grade-calculator/"
      },
      ". To see the letter for a percentage on your teacher's scale, ",
      {
        "text": "convert a percentage to a letter grade",
        "to": "/percentage-to-letter-grade/"
      },
      "."
    ]
  }
];

export const FINAL_FAQ: FaqItem[] = [
  {
    "question": "What do I need on my final to pass?",
    "answer": [
      "Set the grade you want to your class's passing cutoff, often 60% or 70%. With an 85% current grade and a final worth 40%, passing at 60% takes a 22.5% on the final."
    ]
  },
  {
    "question": "What happens if I get a 0 on my final?",
    "answer": [
      "Your course grade becomes your current grade times 1 minus the final's weight. With 85% and a final worth 40%, that's 85 × 0.60 = 51%."
    ]
  },
  {
    "question": "How do I find my final exam's weight?",
    "answer": [
      "Your syllabus usually lists it. If the final counts as one of your tests instead of its own category, use the Grade Calculator to test a few possible final scores instead."
    ]
  },
  {
    "question": "Why is my teacher's number different from this result?",
    "answer": [
      "Teachers sometimes drop the lowest score, round, or weight the final differently. Use the exact weight and current grade from your gradebook, then check the syllabus for rounding rules."
    ]
  }
];

export const SEMESTER_FAQ: FaqItem[] = [
  {
    "question": "Is a semester grade the same as a final grade?",
    "answer": [
      "Often, yes. At many high schools the semester grade is the grade that goes on your transcript and into your GPA. The quarter grades are steps along the way."
    ]
  },
  {
    "question": "How much is a semester exam usually worth?",
    "answer": [
      "Many high schools on a quarter system count it as 10% to 20% of the semester grade. Your school's grading policy has the exact number."
    ]
  },
  {
    "question": "Can I use three grading periods?",
    "answer": [
      "Yes. Choose Custom, add a grading period, and enter each period's weight. The weights need to add up to 100%."
    ]
  },
  {
    "question": "What if my school doesn't have a semester exam?",
    "answer": [
      "Pick \"2 quarters, no exam (50/50)\" or set the exam weight to 0. The semester grade is then the weighted average of your quarters."
    ]
  }
];

export const PERCENTAGE_FAQ: FaqItem[] = [
  {
    "question": "What letter grade is an 85?",
    "answer": [
      "On the common scale an 85 is a B, because a B runs from 83 to under 87. On a 10-point scale it's also a B."
    ]
  },
  {
    "question": "What letter grade is a 79.5?",
    "answer": [
      "On the common scale a 79.5 is a C+, because a C+ runs from 77 to under 80. If your teacher rounds to the nearest whole number, it becomes an 80, which is a B−."
    ]
  },
  {
    "question": "Is a 69 a D?",
    "answer": [
      "On the common scale a 69 is a D+, which runs from 67 to under 70. On a 10-point scale it's a D."
    ]
  },
  {
    "question": "What percentage is a passing grade?",
    "answer": [
      "Many schools treat 60% as the lowest passing grade, but some courses and programs require 70% or more. Check your syllabus."
    ]
  }
];

export const UC_FAQ: FaqItem[] = [
  {
    "question": "Does UC count 9th grade?",
    "answer": [
      "No. UC's GPA starts with the summer after 9th grade, and a class taken that summer counts as 10th grade. Classes taken during 9th grade still count for meeting A-G subject requirements, but not toward the GPA."
    ]
  },
  {
    "question": "Does UC count plus and minus grades?",
    "answer": [
      "No. A B+ and a B− both count as a B, worth 3 points."
    ]
  },
  {
    "question": "What's the difference between a capped and an uncapped UC GPA?",
    "answer": [
      "The capped GPA limits honors points to 8, with no more than 4 from 10th grade. Some counselors and websites also mention an uncapped or fully weighted GPA that counts every honors point. UC's GPA requirement page describes the capped calculation, so that's what this calculator shows."
    ]
  },
  {
    "question": "Do summer classes count toward the UC GPA?",
    "answer": [
      "Yes, if they're A-G courses. A class in the summer after 9th or 10th grade counts as 10th grade, and a class in the summer after 11th grade counts as 11th grade."
    ]
  },
  {
    "question": "Does a D count in the UC GPA?",
    "answer": [
      "Yes. A D is worth 1 point, but a D in an honors course doesn't earn an honors point."
    ]
  }
];

export const LAW_FAQ: FaqItem[] = [
  {
    "question": "Does LSAC count community college grades?",
    "answer": [
      "Yes. LSAC includes undergraduate work from every school you attended before your first bachelor's degree, each with its own transcript."
    ]
  },
  {
    "question": "Does a W affect my LSAC GPA?",
    "answer": [
      "Not if your school treats it as nonpunitive. A withdrawal your school treats as failing counts as 0.00."
    ]
  },
  {
    "question": "Do graduate school grades count in the LSAC GPA?",
    "answer": [
      "No. Anything after your first bachelor's degree is left out, although law schools still receive those transcripts."
    ]
  },
  {
    "question": "How does LSAC convert quarter hours?",
    "answer": [
      "It multiplies quarter hours by 0.67 to get semester hours. A 4-unit quarter class counts as 2.68 semester hours."
    ]
  },
  {
    "question": "Is this my official LSAC GPA?",
    "answer": [
      "No. LSAC calculates the official number from your transcripts after you register for the Credential Assembly Service. Use this estimate to check your math before you apply."
    ]
  }
];

export const PAGE_FAQS: Record<string, FaqItem[]> = {
  "/": HOME_FAQ,
  ...Object.fromEntries(Object.values(GUIDE_CONTENT).map((g) => [g.path, g.faq as FaqItem[]])),
  "/uc-gpa-calculator/": UC_FAQ,
  "/law-school-gpa-calculator/": LAW_FAQ,

  "/grade-calculator/": GRADE_FAQ,
  "/final-grade-calculator/": FINAL_FAQ,
  "/semester-grade-calculator/": SEMESTER_FAQ,
  "/percentage-to-letter-grade/": PERCENTAGE_FAQ,

  "/college-gpa-calculator/": COLLEGE_FAQ,
  "/high-school-gpa-calculator/": HIGH_SCHOOL_FAQ,
  "/cumulative-gpa-calculator/": CUMULATIVE_FAQ,
};
