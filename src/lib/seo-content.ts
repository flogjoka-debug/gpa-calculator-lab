import { GUIDE_CONTENT } from "./guides-content";
export interface FaqLink { text: string; to: string }
export interface FaqItem { question: string; answer: (string | FaqLink)[] }

export const HOME_FAQ: FaqItem[] = [
  { question: "What is a GPA?", answer: ["A grade point average turns your letter grades into one number, usually on a 4.0 scale. Each class is weighted by its credits, so a class that meets more often or carries more credit counts more."] },
  { question: "Does an F count in my GPA?", answer: ["Yes. An F adds zero quality points, but its credits stay in the total, so it pulls the GPA down. An A and an F in two 3-credit classes give 12 ÷ 6 = 2.00."] },
  { question: "Do pass/fail classes affect my GPA?", answer: ["Usually not. A passing grade in a pass/fail class adds credits to your transcript but no grade points. Some schools count a failed pass/fail class as an F, so check your school's policy."] },
  {"question": "What's my GPA with all A's and one B?", "answer": ["If every class carries the same credits, four A's and one B give (4 × 4.0 + 3.0) ÷ 5 = 3.80. If the B is in a class with more credits than the others, it pulls the GPA down further, so enter your real credits above."]},
  {"question": "What grades do I need for a 3.5 GPA?", "answer": ["A 3.5 sits halfway between a B (3.0) and an A (4.0). With equal credits, half A's and half B's give exactly 3.5, and so do an A− and a B+ (3.7 and 3.3). To raise a cumulative GPA to 3.5, use the target planner above."]},
  {"question": "Can I check my GPA before final grades are in?", "answer": ["Yes. Enter the grades you expect and the calculator gives you an estimate. To see what you need on a final exam to keep a grade, use the ", {"text": "final grade calculator", "to": "/final-grade-calculator/"}, "."]},
  {"question": "Does this work for quarters or trimesters?", "answer": ["It does. Add one term for each quarter or trimester. The math is the same: quality points divided by credits, whatever the length of the term."]},
];

export const CONVERTER_FAQ: FaqItem[] = [
  {"question": "How do I convert a 5.0 GPA to a 4.0 scale?", "answer": ["Multiply by 4 and divide by 5. A 4.5 out of 5.0 becomes 3.60. If your 5.0 scale is a weighted high school scale, recalculate from your grades instead, because the bonus points stay in the number."]},
  {"question": "What is a 3.5 out of 5 on a 4.0 scale?", "answer": ["3.5 × 4 ÷ 5 = 2.80."]},
  {"question": "How do I convert a 10-point CGPA to a 4.0 GPA?", "answer": ["Multiply by 4 and divide by 10, so an 8.0 becomes 3.20. Treat it as an estimate: universities that admit students from 10-point systems usually ask for the transcript or an evaluation and convert it themselves."]},
  {"question": "Is a converted GPA official?", "answer": ["No. It's a proportional estimate. The official number is the one your school, or the receiving school's evaluator, calculates."]},
  {"question": "How do I convert a GPA from a 4.5 scale?", "answer": ["Multiply by 4 and divide by 4.5. A 4.1 on a 4.5 scale is 3.64 on a 4.0 scale. If the 4.5 scale is a weighted high school scale, recalculate from your grades instead."]},
  {"question": "Can I convert a percentage average to a 4.0 GPA?", "answer": ["Not with this formula. Find the letter first with the ", {"text": "percentage to letter grade calculator", "to": "/percentage-to-letter-grade/"}, ", then use that letter's grade points."]},
  {"question": "What is a 9.0 CGPA on a 4.0 scale?", "answer": ["A proportional conversion gives 9.0 × 4 ÷ 10 = 3.60. Treat it as an estimate; the school you apply to may use a credential evaluation instead."]},
  {"question": "How do I convert a GPA on a 4.33 scale?", "answer": ["Don't scale it down. Only an A+ is worth more than 4.0 on that scale, so count each A+ as 4.0 and recalculate, or use the GPA your school reports."]}
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
  },
  {"question": "Is college GPA weighted?", "answer": ["Usually not. Colleges grade every class on the same scale and weight each grade by credit hours, not by difficulty. An A in an honors seminar and an A in an intro class are both 4.0."]},
  {"question": "Do pass/fail classes count in my college GPA?", "answer": ["A passing grade usually adds credits to your transcript but no grade points, so it doesn't change your GPA. Some colleges count a failing grade in a pass/fail class as an F, so check your catalog."]},
  {"question": "What if a grade isn't posted yet?", "answer": ["Enter the grade you expect to get an estimate, or leave that row blank and calculate without it. Blank rows stay out of the math until you fill them in."]},
  {"question": "Can I round my GPA up on an application?", "answer": ["Report it the way your transcript shows it unless the application says how to round. Turning a 3.47 into a 3.5 can read as a misstatement when the school checks your transcript."]}
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
  },
  {"question": "Do AP exam scores count toward my GPA?", "answer": ["No. Your GPA uses the grade you earned in the class. AP exam scores are reported separately and don't change your transcript grade."]},
  {"question": "Do electives and PE count in my GPA?", "answer": ["At many schools they do, but some leave out PE, pass/fail or non-academic classes. Your student handbook lists which classes your school counts."]},
  {"question": "Does dual enrollment get extra GPA points?", "answer": ["At some schools. Many weight a dual enrollment class like an AP class, others give no bonus. Set the \"Dual enrollment\" bonus above to match your school."]},
  {"question": "Can my GPA be higher than 4.0?", "answer": ["Your weighted GPA can, because Honors, AP and IB classes earn bonus points. Your unweighted GPA tops out at 4.0."]}
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
  },
  {"question": "Is CGPA the same as cumulative GPA?", "answer": ["Yes. CGPA is short for cumulative grade point average. Some countries report it on a 10-point scale, which the ", {"text": "GPA converter", "to": "/gpa-converter/"}, " can estimate on a 4.0 scale."]},
  {"question": "How do I find my cumulative GPA?", "answer": ["Your unofficial transcript or student portal shows it, usually with your GPA hours and quality points. Those two numbers give the exact starting point for this calculator."]},
  {"question": "What is a good cumulative GPA?", "answer": ["It depends on the goal: keeping financial aid, getting into a major or applying to graduate school each come with their own minimum. Our guide to ", {"text": "what counts as a good GPA", "to": "/guides/what-is-a-good-gpa/"}, " has examples."]}
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
  },
  {"question": "What grade is 12 out of 15?", "answer": ["12 ÷ 15 = 0.80, or 80%. On the common scale that's a B−, and on a 10-point scale it's a B. Use the ", {"text": "percentage to letter grade calculator", "to": "/percentage-to-letter-grade/"}, " to check your school's cutoffs."]},
  {"question": "How do I calculate my grade if I don't know the weights?", "answer": ["Check the syllabus or your school's online gradebook first; most list the categories and their weights. If the class simply adds up points, use the Points tab. Guessing equal weights can be far off when tests count much more than homework."]},
  {"question": "Does extra credit count?", "answer": ["Extra credit usually adds to the points you earned without adding to the points possible. In the Points tab, add it to a score's earned points and leave its possible points as they were."]},
  {"question": "Is a D a passing grade?", "answer": ["At many schools a D passes the class and earns credit. Some majors and prerequisites require a C or better, so check your program's rules before you count on it."]}
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
  },
  {"question": "How do I calculate my grade after the final?", "answer": ["Multiply your current grade by the part of the course it covers, then add your final score times the final's weight. With an 85% before a final worth 30% and a 78% on it: 85 × 0.7 + 78 × 0.3 = 82.9%."]},
  {"question": "Is 20% of your grade a lot for a final?", "answer": ["It's common, and it's enough to move you up to about a letter grade. With an 85% now, scores from 35% to 85% on a 20% final leave you anywhere from 75% to 85%."]},
  {"question": "If I have a 95 and fail the final, what will my grade be?", "answer": ["It depends on the final's weight. With a 95 and a final worth 20%, a 50% on the final gives 95 × 0.8 + 50 × 0.2 = 86%, and a zero gives 76%."]},
  {"question": "Can I get an A if I need more than 100% on the final?", "answer": ["Not on the exam alone. Ask whether there's extra credit, a curve or a way to replace a low score, and set a realistic target with the calculator."]}
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
  },
  {"question": "How do you calculate a semester grade without the final?", "answer": ["Use your quarter grades alone: multiply each by its weight, add them and divide by the weights you used. Quarters of 90 and 80 at 40% each give (36 + 32) ÷ 0.8 = 85."]},
  {"question": "What is a semester average?", "answer": ["It's your grade for the whole semester: the weighted average of your grading periods and, if your school has one, the semester exam."]},
  {"question": "How do I calculate a year grade from two semesters?", "answer": ["If both semesters count equally, average them: an 88 and an 82 make an 85. If your school posts each semester separately, your transcript keeps two grades instead of one."]}
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
  },
  {"question": "What percentage is a B?", "answer": ["On the common scale, a B is 83 to under 87, a B+ is 87 to under 90 and a B− is 80 to under 83. On a straight 10-point scale, any score from 80 to 89.99 is a B."]},
  {"question": "What percentage is an A?", "answer": ["On the common scale, an A is 93 and above and an A− is 90 to under 93. On a 10-point scale, 90 and above is an A."]},
  {"question": "What letter grade is an 87?", "answer": ["A B+ on the common scale and a B on a 10-point scale."]},

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
  },
  {"question": "Does UC count 12th grade?", "answer": ["Not in the GPA. UC's GPA covers A-G courses from the summer after 9th grade through the summer after 11th grade. Your senior-year courses still matter in the rest of your application."]},
  {"question": "How many honors points can count in the UC GPA?", "answer": ["Up to 8 in total, with no more than 4 from 10th grade. Each semester of an honors course UC accepts, with an A, B or C, earns one point."]},
  {"question": "Is a 4.0 UC GPA good?", "answer": ["It clears the 3.0 minimum for California residents and the 3.4 for nonresidents. Admission is competitive at many campuses, so treat the minimum as the starting line, not the target."]},

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
  },
  {"question": "Does an A+ help my LSAC GPA?", "answer": ["Yes. LSAC counts an A+ as 4.33, even if your college caps it at 4.0, so each A+ raises the LSAC GPA a little above your college GPA."]},
  {"question": "Do retaken classes count twice for LSAC?", "answer": ["Each graded attempt counts once, so a class you took twice adds two grades. LSAC counts the earlier grade even when your college replaced it."]},
  {"question": "Do AP credits count in the LSAC GPA?", "answer": ["No. AP test credit has no grade, so LSAC leaves it out."]},
  {"question": "Does LSAC use my school's plus and minus values?", "answer": ["LSAC applies its own chart to every school instead, so an A− is 3.67 and a B+ is 3.33 even if your college uses 3.7 and 3.3."]},
  {"question": "Do community college grades raise or lower my LSAC GPA?", "answer": ["Either, depending on the grades. LSAC averages every undergraduate school by credits, so strong community college grades can lift your LSAC GPA above your university GPA."]}
];

export const FOR_SCHOOLS_FAQ: FaqItem[] = [
  {
    "question": "Is the GPA calculator widget really free?",
    "answer": [
      "Yes. There's no sign-up, no fee and no ads. Keep the credit link under the calculator so students know where the tool comes from."
    ]
  },
  {
    "question": "Does the embedded calculator collect student data?",
    "answer": [
      "No. Grades are calculated in the student's browser and aren't sent to us or to your school, and the embedded version doesn't load analytics."
    ]
  },
  {
    "question": "Will it match our school's weighting?",
    "answer": [
      "Students can set the Honors, AP and IB bonus points your school uses. If your school uses a scale or rule the calculator doesn't cover, ",
      {
        "text": "tell us",
        "to": "/contact/"
      },
      " and we'll look at adding it."
    ]
  },
  {
    "question": "Can we link to a calculator instead of embedding it?",
    "answer": [
      "Of course. You can link to any page on the site without asking, including the calculator that fits your students best."
    ]
  }
];

export const PAGE_FAQS: Record<string, FaqItem[]> = {
  "/for-schools/": FOR_SCHOOLS_FAQ,
  "/": HOME_FAQ,
  "/gpa-converter/": CONVERTER_FAQ,
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
