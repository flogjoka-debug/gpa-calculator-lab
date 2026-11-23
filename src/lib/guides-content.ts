// Generated from the approved guide copy (human-content-seo checked). Edit the copy, then regenerate.
// Light metadata only: each guide's body lives in ./guides/<key>.ts so it loads with its own page.
import type { FaqItem } from "./seo-content";

export type GuideBlock =
  | { t: "h2"; text: string; id: string }
  | { t: "h3"; text: string }
  | { t: "img"; src: string; alt: string; caption: string; width: number; height: number }
  | { t: "p"; text: string }
  | { t: "ol" | "ul"; items: string[] }
  | { t: "table"; caption: string; columns: string[]; rows: string[][] };

export interface GuideMeta { path: string; title: string; description: string; h1: string; faq: FaqItem[] }
export interface GuideBody { lead: string; blocks: GuideBlock[] }
export type GuideContent = GuideMeta & GuideBody;

export const GUIDE_CONTENT = {
  "goodGpa": {
    "path": "/guides/what-is-a-good-gpa/",
    "title": "What Is a Good GPA? 2.5, 3.0, 3.5, 3.7 and 4.0 Explained",
    "description": "A 3.0 is a B average, and the typical U.S. high school graduate finished with a 3.11 in 2019. See what your GPA means and when it counts as good.",
    "h1": "What Is a Good GPA?",
    "faq": [
      {
        "question": "What is the average high school GPA?",
        "answer": [
          "3.11, according to the 2019 High School Transcript Study, which used transcripts from a national sample of graduates. It was 3.00 in 2009."
        ]
      },
      {
        "question": "Can a GPA be higher than 4.0?",
        "answer": [
          "A weighted GPA can, because Honors, AP and IB classes earn bonus points. An unweighted GPA stops at 4.0 on the standard scale."
        ]
      },
      {
        "question": "Do colleges look at weighted or unweighted GPA?",
        "answer": [
          "It depends on the college. Many read the GPA your school reports and also look at which classes you took. Some, including the University of California, recalculate your GPA with their own rules."
        ]
      },
      {
        "question": "Is a 3.3 GPA good?",
        "answer": [
          "A 3.3 is a B+ average, above the 3.11 national average for 2019 graduates. Like a 3.2, it meets UC's minimum for residents but falls short of the 3.4 asked of nonresidents."
        ]
      },
      {
        "question": "What GPA do you need to stay in good standing in college?",
        "answer": [
          "Many colleges set 2.0 as the minimum, and federal aid rules require a C average by the end of the second year in programs longer than two years. Your college's catalog has the exact rule."
        ]
      }
    ]
  },
  "weighted": {
    "path": "/guides/weighted-vs-unweighted-gpa/",
    "title": "Weighted vs Unweighted GPA: What's the Difference?",
    "description": "An unweighted GPA treats every class the same on a 4.0 scale. A weighted GPA adds points for Honors, AP and IB. See how to calculate both, with examples.",
    "h1": "Weighted vs Unweighted GPA",
    "faq": [
      {
        "question": "Is a 4.0 weighted GPA good?",
        "answer": [
          "It can be, but it isn't the same as an unweighted 4.0. With bonus points, a weighted 4.0 can include B's. Check your unweighted GPA too before you compare it with a college's requirements."
        ]
      },
      {
        "question": "Can an unweighted GPA be higher than 4.0?",
        "answer": [
          "On the standard scale, no. A few schools count an A+ as more than 4.0, and LSAC counts an A+ as 4.33 for law school applicants. You can see how in the ",
          {
            "text": "law school GPA calculator",
            "to": "/law-school-gpa-calculator/"
          },
          "."
        ]
      },
      {
        "question": "What does a 5.0 GPA mean?",
        "answer": [
          "It usually means straight A's in classes that all earned a full one-point bonus, on a weighted 5.0 scale. Schools that weight differently can top out higher or lower."
        ]
      },
      {
        "question": "Do colleges prefer a weighted or an unweighted GPA?",
        "answer": [
          "Neither by default. Admissions readers look at the GPA your school reports and at the courses behind it, and some colleges, such as the University of California and the University of Michigan, recalculate a GPA with their own rules."
        ]
      },
      {
        "question": "How do I know if my GPA is weighted?",
        "answer": [
          "Check your transcript or report card. A GPA above 4.0, or one labeled weighted, includes bonus points. If it isn't labeled, your school's course catalog or your counselor can tell you."
        ]
      }
    ]
  },
  "scale": {
    "path": "/guides/gpa-scale/",
    "title": "4.0 GPA Scale: Letter Grades, Percentages and Grade Points",
    "description": "The 4.0 GPA scale with every letter grade, its grade points and the usual percentage range. Plus how to turn a percentage into GPA and what a 3.5 GPA means.",
    "h1": "The 4.0 GPA Scale",
    "faq": [
      {
        "question": "What GPA is a B average?",
        "answer": [
          "A 3.0. A B+ average is a 3.3 and a B− average is a 2.7."
        ]
      },
      {
        "question": "Is an A+ worth more than an A?",
        "answer": [
          "Usually not. Most schools count an A+ as 4.0, the same as an A. Some colleges and LSAC count it as 4.33."
        ]
      },
      {
        "question": "What is a 3.0 GPA in percentage?",
        "answer": [
          "A 3.0 is a B, which is 83 to 86 percent on the chart above and 80 to 89 percent on a 90/80/70/60 scale."
        ]
      },
      {
        "question": "Is the 4.0 scale the same in high school and college?",
        "answer": [
          "The letter values are usually the same, from A = 4.0 down to F = 0. The differences are weighting, which many high schools use and colleges usually don't, and whether plus and minus grades are recorded."
        ]
      },
      {
        "question": "Do pass/fail classes count in your GPA?",
        "answer": [
          "Usually not. A pass earns credit without grade points, so it stays out of the average. Some schools do count a failing grade in a pass/fail class as an F, so check your registrar's policy."
        ]
      }
    ]
  },
  "raise": {
    "path": "/guides/how-to-raise-your-gpa/",
    "title": "How to Raise Your GPA (and How Much It Can Go Up)",
    "description": "GPA moves by credits, not effort alone. See how much a semester of A's can raise a 2.8, when a retake helps, and what doesn't change your GPA at all.",
    "h1": "How to Raise Your GPA",
    "faq": [
      {
        "question": "Can you raise a 2.0 to a 3.0 in one semester?",
        "answer": [
          "Only if you have few credits so far. With 15 credits at 2.0 (30 quality points), a 15-credit semester of straight A's gives (30 + 60) ÷ 30 = 3.0. With 60 credits behind you, the same semester would reach 2.4."
        ]
      },
      {
        "question": "Does retaking a class replace the grade?",
        "answer": [
          "It depends on your school. Some replace the earlier grade, some average both, and some only replace a D or an F. Your registrar or course catalog explains the rule."
        ]
      },
      {
        "question": "Does a W hurt your GPA?",
        "answer": [
          "Usually not. Most schools don't count a W in GPA, though it stays on your transcript. A withdrawal your school treats as failing counts like an F."
        ]
      },
      {
        "question": "How long does it take to raise a GPA from 2.5 to 3.0?",
        "answer": [
          "It depends on how many credits you already have. With 30 credits at 2.5, one 15-credit semester of straight A's reaches exactly 3.0: (75 + 60) ÷ 45. With 60 credits, you'd need 30 credits of A's, about two full semesters."
        ]
      },
      {
        "question": "Does summer school raise your GPA?",
        "answer": [
          "Only if your school records the grade. Summer classes at your own college usually count like any other term. Classes taken elsewhere often transfer as credit only and leave your GPA unchanged."
        ]
      }
    ]
  }
} satisfies Record<string, GuideMeta>;
