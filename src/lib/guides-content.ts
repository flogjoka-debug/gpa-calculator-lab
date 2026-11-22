// Generated from the approved guide copy (human-content-seo checked). Edit the copy, then regenerate.
import type { FaqItem } from "./seo-content";

export type GuideBlock =
  | { t: "h2"; text: string; id: string }
  | { t: "h3"; text: string }
  | { t: "img"; src: string; alt: string; caption: string; width: number; height: number }
  | { t: "p"; text: string }
  | { t: "ol" | "ul"; items: string[] }
  | { t: "table"; caption: string; columns: string[]; rows: string[][] };

export interface GuideContent { path: string; title: string; description: string; h1: string; lead: string; blocks: GuideBlock[]; faq: FaqItem[] }

export const GUIDE_CONTENT = {
  "goodGpa": {
    "path": "/guides/what-is-a-good-gpa/",
    "title": "What Is a Good GPA? 2.5, 3.0, 3.5, 3.7 and 4.0 Explained",
    "description": "A 3.0 is a B average, and the typical U.S. high school graduate finished with a 3.11 in 2019. See what your GPA means and when it counts as good.",
    "h1": "What Is a Good GPA?",
    "lead": "On the standard 4.0 scale, a 3.0 is a B average and a 3.5 sits between a B+ and an A−. The typical U.S. high school graduate in 2019 finished with a 3.11. Whether your GPA is good depends on what you need it for: keeping financial aid, meeting a college's minimum, or standing out in a competitive application.",
    "blocks": [
      {
        "t": "h2",
        "text": "What each GPA means on the 4.0 scale",
        "id": "what-each-gpa-means-on-the-4-0-scale"
      },
      {
        "t": "table",
        "caption": "What each GPA means on the 4.0 scale",
        "columns": [
          "GPA",
          "Average grade",
          "What it usually means"
        ],
        "rows": [
          [
            "4.0",
            "A",
            "Every class an A. The top of an unweighted scale."
          ],
          [
            "3.7",
            "A−",
            "Mostly A's with a few B's."
          ],
          [
            "3.5",
            "Between B+ and A−",
            "About as many A's as B's."
          ],
          [
            "3.3",
            "B+",
            "Mostly B's with some A's."
          ],
          [
            "3.0",
            "B",
            "A steady B average."
          ],
          [
            "2.5",
            "Between C+ and B−",
            "About as many B's as C's."
          ],
          [
            "2.0",
            "C",
            "The minimum many colleges set for good standing."
          ],
          [
            "Below 2.0",
            "C− or lower",
            "Below the C average federal aid requires by the end of a college student's second year."
          ]
        ]
      },
      {
        "t": "p",
        "text": "These are unweighted values. A weighted GPA adds points for Honors, AP and IB classes, so the same transcript can show a higher number. [Weighted vs unweighted GPA](/guides/weighted-vs-unweighted-gpa/) explains the difference."
      },
      {
        "t": "h2",
        "text": "The average GPA in the U.S.",
        "id": "the-average-gpa-in-the-u-s"
      },
      {
        "t": "p",
        "text": "The federal High School Transcript Study collects real transcripts from a national sample of graduates. In 2019 the average GPA was 3.11, up from 3.00 in 2009 and 2.68 in 1990. Grades have risen over time, so a 3.0 today is a little below the national average rather than above it."
      },
      {
        "t": "p",
        "text": "Source: [NCES High School Transcript Study](https://nces.ed.gov/nationsreportcard/hsts/)."
      },
      {
        "t": "img",
        "src": "/guides/average-gpa-1990-2019.webp",
        "alt": "Bar chart of the average U.S. high school graduate's GPA: 2.68 in 1990, 3.00 in 2009 and 3.11 in 2019",
        "caption": "Average GPA of U.S. high school graduates, from the NAEP High School Transcript Study.",
        "width": 1200,
        "height": 675
      },
      {
        "t": "h2",
        "text": "Is a 3.0 GPA good?",
        "id": "is-a-3-0-gpa-good"
      },
      {
        "t": "p",
        "text": "A 3.0 is a solid B average and just under the 3.11 national average. It meets the University of California's 3.0 minimum for California residents, but not the 3.4 it asks of nonresidents. In college, a 3.0 is well above the C average you need to keep federal financial aid."
      },
      {
        "t": "h2",
        "text": "Is a 3.5 GPA good?",
        "id": "is-a-3-5-gpa-good"
      },
      {
        "t": "p",
        "text": "Yes, for most purposes. A 3.5 is above the national average and clears both UC minimums. At highly selective colleges it can sit below the middle of the incoming class, so compare it with the GPA ranges each college publishes in its Common Data Set."
      },
      {
        "t": "h2",
        "text": "Is a 3.7 or 3.8 GPA good?",
        "id": "is-a-3-7-or-3-8-gpa-good"
      },
      {
        "t": "p",
        "text": "A 3.7 is an A− average and a 3.8 is close to it. Both are strong numbers almost anywhere. For the most selective schools, look at the GPA spread of the students they admitted rather than a general rule, and check whether they report weighted or unweighted GPAs."
      },
      {
        "t": "h2",
        "text": "Is a 4.0 GPA good?",
        "id": "is-a-4-0-gpa-good"
      },
      {
        "t": "p",
        "text": "An unweighted 4.0 means an A in every class, so it can't go higher. A weighted 4.0 is different: it can include B's that were lifted by AP or Honors bonus points. Know which one you have before you compare it with anyone else's."
      },
      {
        "t": "h2",
        "text": "Is a 2.5 GPA good?",
        "id": "is-a-2-5-gpa-good"
      },
      {
        "t": "p",
        "text": "A 2.5 sits between a C+ and a B− average. It is above the 2.0 floor for federal aid and good standing at many colleges, but below UC's 3.0 minimum and below many scholarship cutoffs. The good news is that a 2.5 early on moves quickly: see [how to raise your GPA](/guides/how-to-raise-your-gpa/) for the math."
      },
      {
        "t": "h2",
        "text": "Minimums that actually matter",
        "id": "minimums-that-actually-matter"
      },
      {
        "t": "ul",
        "items": [
          "Federal financial aid: in programs longer than two years, you need at least a C average (a 2.0) by the end of your second academic year, or academic standing your college accepts for graduation. Source: [34 CFR 668.34](https://www.law.cornell.edu/cfr/text/34/668.34).",
          "University of California: at least 3.0 for California residents and 3.4 for nonresidents, in A-G courses. UC calculates it its own way, so use the [UC GPA calculator](/uc-gpa-calculator/).",
          "Scholarships, honors programs and majors set their own minimums. Read the exact requirement, including whether it uses a weighted or unweighted GPA."
        ]
      },
      {
        "t": "h2",
        "text": "Check your own number",
        "id": "check-your-own-number"
      },
      {
        "t": "p",
        "text": "Your GPA depends on credits as well as grades, so two students with the same letters can end up with different numbers. Enter your classes in the [GPA calculator](/) for a quick answer, the [high school GPA calculator](/high-school-gpa-calculator/) to see weighted and unweighted side by side, or the [college GPA calculator](/college-gpa-calculator/) for credit hours and retakes."
      },
      {
        "t": "h2",
        "text": "What GPA do scholarships ask for?",
        "id": "what-gpa-do-scholarships-ask-for"
      },
      {
        "t": "p",
        "text": "Merit scholarships publish exact cutoffs, and they're often higher than college admission minimums. Florida's Bright Futures program is a clear example. The Florida Academic Scholars award requires a 3.5 weighted GPA in 16 college-prep credits, and renewing it in college takes a 3.0 cumulative GPA. The Florida Medallion Scholars award starts at a 3.0 weighted GPA. Bright Futures recalculates that GPA itself, adding 0.5 for Honors, AP, IB and dual enrollment courses."
      },
      {
        "t": "p",
        "text": "Sources: [Florida Statutes 1009.534](https://www.flsenate.gov/Laws/Statutes/2024/1009.534), [Collier County Public Schools: Bright Futures](https://www.collierschools.com/students-families/counseling/college-preparedness/bright-futures), [Broward County Public Schools: Bright Futures requirements](https://www.browardschools.com/cms/lib/FL01803656/Centricity/Domain/7831/BF%20Requirements%202020-2021.pdf)."
      },
      {
        "t": "p",
        "text": "Check whether a scholarship wants a weighted or an unweighted GPA, and whether it uses your school's number or recalculates it."
      },
      {
        "t": "h2",
        "text": "What GPA do you need for graduate school?",
        "id": "what-gpa-do-you-need-for-graduate-school"
      },
      {
        "t": "p",
        "text": "Many graduate programs list 3.0 as the floor. UC Berkeley's Graduate Division, for example, asks for a satisfactory average, usually at least a 3.0 (B) on a 4.0 scale. Individual departments can set higher bars, and a minimum is where a program starts reading, not the GPA most admitted students have. Source: [UC Berkeley Graduate Division: Admissions requirements](https://grad.berkeley.edu/admissions/requirements/)."
      },
      {
        "t": "p",
        "text": "For law school the number that matters is the LSAC GPA, which counts every attempt at a repeated class and gives an A+ 4.33. The [law school GPA calculator](/law-school-gpa-calculator/) shows how yours compares with your college GPA."
      },
      {
        "t": "h2",
        "text": "How to read a college's GPA profile",
        "id": "how-to-read-a-college-s-gpa-profile"
      },
      {
        "t": "p",
        "text": "Most colleges publish a Common Data Set each year. Section C11 shows what share of the incoming class had GPAs in each band, and C12 gives their average high school GPA. These are the best numbers to compare yourself with, but read them carefully. Colleges don't all report the same kind of GPA: Auburn University's 2024 Common Data Set lists an average of 4.09, which can only be a weighted figure. Source: [Auburn University Common Data Set 2024, Section C](https://auburn.edu/administration/ir/common-data-set/2024/section-c.html)."
      },
      {
        "t": "p",
        "text": "Before you compare, check whether the college's number is weighted, and compare it with the same kind of GPA from your own transcript."
      }
    ],
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
      }
    ]
  },
  "weighted": {
    "path": "/guides/weighted-vs-unweighted-gpa/",
    "title": "Weighted vs Unweighted GPA: What's the Difference?",
    "description": "An unweighted GPA treats every class the same on a 4.0 scale. A weighted GPA adds points for Honors, AP and IB. See how to calculate both, with examples.",
    "h1": "Weighted vs Unweighted GPA",
    "lead": "An unweighted GPA counts every class the same way: an A is 4.0 whether it's in AP Chemistry or in study hall. A weighted GPA adds bonus points for harder classes such as Honors, AP and IB, so it can go above 4.0. Most high schools report one or both, and colleges read them differently.",
    "blocks": [
      {
        "t": "h2",
        "text": "The difference at a glance",
        "id": "the-difference-at-a-glance"
      },
      {
        "t": "table",
        "caption": "The difference at a glance",
        "columns": [
          "Feature",
          "Unweighted GPA",
          "Weighted GPA"
        ],
        "rows": [
          [
            "Scale",
            "0 to 4.0",
            "Often 0 to 5.0"
          ],
          [
            "Class difficulty",
            "Not counted",
            "Honors, AP and IB earn extra points"
          ],
          [
            "An A in AP Biology",
            "4.0",
            "5.0 with a common +1.0 bonus"
          ],
          [
            "Best for",
            "Comparing students from different schools",
            "Showing that you took harder classes"
          ],
          [
            "Who sets the rules",
            "Mostly standard",
            "Your school, so it varies"
          ]
        ]
      },
      {
        "t": "h2",
        "text": "What is an unweighted GPA?",
        "id": "what-is-an-unweighted-gpa"
      },
      {
        "t": "p",
        "text": "It's the plain average of your grade points: A = 4, B = 3, C = 2, D = 1 and F = 0, with plus and minus grades in between if your school uses them. Class level doesn't matter."
      },
      {
        "t": "p",
        "text": "How to calculate an unweighted GPA:"
      },
      {
        "t": "ol",
        "items": [
          "Turn each final grade into its points on the 4.0 scale.",
          "If your classes carry different credits, multiply each grade's points by its credits.",
          "Add the points and divide by the number of classes, or by the total credits."
        ]
      },
      {
        "t": "p",
        "text": "Example: four one-credit classes with grades A, A, B and C give (4 + 4 + 3 + 2) ÷ 4 = 13 ÷ 4 = 3.25."
      },
      {
        "t": "h2",
        "text": "What is a weighted GPA?",
        "id": "what-is-a-weighted-gpa"
      },
      {
        "t": "p",
        "text": "A weighted GPA starts from the same points and adds a bonus for advanced classes. A common setup is +0.5 for Honors and +1.0 for AP and IB, which puts an A in an AP class at 5.0. Your school's handbook decides the exact bonus, which classes get it, and whether a D or an F still earns it."
      },
      {
        "t": "p",
        "text": "How to calculate a weighted GPA:"
      },
      {
        "t": "ol",
        "items": [
          "Find each class's base points on the 4.0 scale.",
          "Add your school's bonus to every Honors, AP or IB class.",
          "Average the results the same way, by class or by credits."
        ]
      },
      {
        "t": "p",
        "text": "Example: the same four grades, where both A's are in AP classes and the B is in an Honors class. With +1.0 for AP and +0.5 for Honors you get (5 + 5 + 3.5 + 2) ÷ 4 = 15.5 ÷ 4 = 3.875, which is a 3.88 weighted GPA next to a 3.25 unweighted one."
      },
      {
        "t": "img",
        "src": "/guides/weighted-vs-unweighted-example.webp",
        "alt": "Chart of four grades, two AP A's, an Honors B and a regular C, that give a 3.25 unweighted GPA and a 3.88 weighted GPA",
        "caption": "The example above: AP and Honors bonuses lift the same grades from 3.25 to 3.88.",
        "width": 1200,
        "height": 675
      },
      {
        "t": "p",
        "text": "To see both numbers for your own classes, use the [high school GPA calculator](/high-school-gpa-calculator/). You can set your school's bonus points there."
      },
      {
        "t": "h2",
        "text": "Which one do colleges use?",
        "id": "which-one-do-colleges-use"
      },
      {
        "t": "p",
        "text": "Colleges see the GPA your school puts on your transcript, and admissions readers also look at which courses you took. Because every high school weights classes its own way, some colleges recalculate GPAs with one set of rules for everyone. The University of California, for example, uses only A-G courses from 10th and 11th grade and caps honors points at 8. The [UC GPA calculator](/uc-gpa-calculator/) shows how that works."
      },
      {
        "t": "h2",
        "text": "Is weighted or unweighted GPA better?",
        "id": "is-weighted-or-unweighted-gpa-better"
      },
      {
        "t": "p",
        "text": "Neither is better. They answer different questions. The unweighted number shows how well you did in your classes. The weighted number also reflects how hard those classes were. When a form or application asks for one of them, give exactly that one."
      },
      {
        "t": "h2",
        "text": "How to convert a weighted GPA to unweighted",
        "id": "how-to-convert-a-weighted-gpa-to-unweighted"
      },
      {
        "t": "p",
        "text": "Take out the bonus points and average the base grades again. An A in AP goes back to 4.0 and a B in Honors to 3.0. You can't do it from the final weighted number alone, because you need to know which classes earned a bonus."
      },
      {
        "t": "h2",
        "text": "Which GPA goes on the Common App?",
        "id": "which-gpa-goes-on-the-common-app"
      },
      {
        "t": "p",
        "text": "The Common App asks for one cumulative GPA, its scale and whether it's weighted. Its guidance for schools says that when a school calculates both a weighted and an unweighted GPA, students should report the weighted one. The scale menu runs from 4 to 20, plus 100, so you can enter your school's real scale instead of converting. Source: [Common App: High school details information sheet](https://www.commonapp.org/static/b63899f072e0d59185516e46b40cd98a/Resource_FY_HighSchoolDetails_ENG_2025.06.24.pdf)."
      },
      {
        "t": "h2",
        "text": "Colleges often recalculate it anyway",
        "id": "colleges-often-recalculate-it-anyway"
      },
      {
        "t": "p",
        "text": "What you type isn't always what an admissions office uses. The University of Michigan tells applicants they can report either their cumulative or academic weighted GPA, and that it recalculates the GPA and uses its own number in review. Source: [University of Michigan Admissions: Self-reporting your GPA](https://teamdynamix.umich.edu/TDClient/154/Portal/KB/Article/7499/Self-reporting-Your-GPA). UC does the same with its own A-G rules, and Florida's Bright Futures scholarship recalculates a weighted GPA with a 0.5 bonus instead of a full point."
      },
      {
        "t": "p",
        "text": "That's why you shouldn't spend energy comparing weighted GPAs from different schools. Look at the unweighted number and the courses behind it, which is roughly what recalculation does."
      }
    ],
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
      }
    ]
  },
  "scale": {
    "path": "/guides/gpa-scale/",
    "title": "4.0 GPA Scale: Letter Grades, Percentages and Grade Points",
    "description": "The 4.0 GPA scale with every letter grade, its grade points and the usual percentage range. Plus how to turn a percentage into GPA and what a 3.5 GPA means.",
    "h1": "The 4.0 GPA Scale",
    "lead": "On the 4.0 scale most U.S. high schools and colleges use, an A is worth 4.0, a B 3.0, a C 2.0, a D 1.0 and an F 0. A plus or minus moves a grade by about 0.3. Your GPA is the average of those points, weighted by credits.",
    "blocks": [
      {
        "t": "h2",
        "text": "4.0 GPA scale chart",
        "id": "4-0-gpa-scale-chart"
      },
      {
        "t": "table",
        "caption": "4.0 GPA scale chart",
        "columns": [
          "Letter grade",
          "Percentage",
          "Grade points"
        ],
        "rows": [
          [
            "A",
            "93 to 100",
            "4.0"
          ],
          [
            "A−",
            "90 to under 93",
            "3.7"
          ],
          [
            "B+",
            "87 to under 90",
            "3.3"
          ],
          [
            "B",
            "83 to under 87",
            "3.0"
          ],
          [
            "B−",
            "80 to under 83",
            "2.7"
          ],
          [
            "C+",
            "77 to under 80",
            "2.3"
          ],
          [
            "C",
            "73 to under 77",
            "2.0"
          ],
          [
            "C−",
            "70 to under 73",
            "1.7"
          ],
          [
            "D+",
            "67 to under 70",
            "1.3"
          ],
          [
            "D",
            "63 to under 67",
            "1.0"
          ],
          [
            "D−",
            "60 to under 63",
            "0.7"
          ],
          [
            "F",
            "below 60",
            "0.0"
          ]
        ]
      },
      {
        "t": "p",
        "text": "The percentages are a common example, not a national rule. Many schools use 90/80/70/60 cutoffs instead, and your syllabus has the final say. An A+ is usually worth 4.0, though some colleges give it 4.33."
      },
      {
        "t": "img",
        "src": "/guides/gpa-scale-chart.webp",
        "alt": "4.0 GPA scale chart with each letter grade from A to F, its grade points and a common percentage range",
        "caption": "The same scale as a chart you can save. Your school's cutoffs may differ.",
        "width": 1200,
        "height": 675
      },
      {
        "t": "h2",
        "text": "How the scale turns grades into a GPA",
        "id": "how-the-scale-turns-grades-into-a-gpa"
      },
      {
        "t": "p",
        "text": "Each grade's points are multiplied by the class's credits to give quality points. Add up the quality points and divide by the total credits. An A in a 3-credit class (12 points) and a B in a 4-credit class (12 points) give 24 ÷ 7 = 3.43. The [GPA calculator](/) does this for you and shows which classes counted."
      },
      {
        "t": "h2",
        "text": "How to convert a percentage to GPA",
        "id": "how-to-convert-a-percentage-to-gpa"
      },
      {
        "t": "p",
        "text": "Don't put the percentage straight onto the 4.0 scale. Convert it to a letter grade first, using your school's cutoffs, then look up the points."
      },
      {
        "t": "ol",
        "items": [
          "Find the letter grade for each class's final percentage. 88% is a B+ on the chart above.",
          "Look up that letter's grade points. A B+ is 3.3.",
          "Average the points across your classes, weighted by credits."
        ]
      },
      {
        "t": "p",
        "text": "Averaging percentages first can give a different answer. Two equal-credit classes at 95% and 81% average 88%, which looks like a B+ and a 3.3. Converted one by one they are an A (4.0) and a B− (2.7), which average 3.35. Use the [percentage to letter grade calculator](/percentage-to-letter-grade/) to check each class against your own cutoffs."
      },
      {
        "t": "h2",
        "text": "What is a 3.5 GPA as a percentage?",
        "id": "what-is-a-3-5-gpa-as-a-percentage"
      },
      {
        "t": "p",
        "text": "There's no official conversion, because a GPA averages letter grades rather than percentages. A 3.5 sits between a B+ (3.3) and an A− (3.7). On the chart above that is roughly 89 to 90 percent, but on a 90/80/70/60 scale it would land elsewhere."
      },
      {
        "t": "table",
        "caption": "What is a 3.5 GPA as a percentage?",
        "columns": [
          "GPA",
          "Average letter grade",
          "Approximate percentage on the chart above"
        ],
        "rows": [
          [
            "4.0",
            "A",
            "93 or higher"
          ],
          [
            "3.7",
            "A−",
            "90 to 92"
          ],
          [
            "3.5",
            "Between B+ and A−",
            "About 89 to 90"
          ],
          [
            "3.3",
            "B+",
            "87 to 89"
          ],
          [
            "3.0",
            "B",
            "83 to 86"
          ],
          [
            "2.5",
            "Between C+ and B−",
            "About 79 to 80"
          ],
          [
            "2.0",
            "C",
            "73 to 76"
          ]
        ]
      },
      {
        "t": "h2",
        "text": "What is a 4.0 GPA?",
        "id": "what-is-a-4-0-gpa"
      },
      {
        "t": "p",
        "text": "A 4.0 is the highest unweighted GPA: an A in every class. On a weighted scale, Honors, AP and IB classes earn bonus points, so a weighted GPA can go above 4.0. [Weighted vs unweighted GPA](/guides/weighted-vs-unweighted-gpa/) explains how."
      },
      {
        "t": "h2",
        "text": "Other scales you might see",
        "id": "other-scales-you-might-see"
      },
      {
        "t": "ul",
        "items": [
          "Weighted 5.0 scale: high schools add up to one point for AP and IB classes.",
          "4.33 scale: some colleges give an A+ 4.33. LSAC uses it for every law school applicant, which you can try in the [law school GPA calculator](/law-school-gpa-calculator/).",
          "100-point scale: some schools report averages as percentages and never convert them."
        ]
      },
      {
        "t": "h2",
        "text": "Why your school's chart might differ",
        "id": "why-your-school-s-chart-might-differ"
      },
      {
        "t": "p",
        "text": "College Board's BigFuture uses the same pattern as the chart above: 93 to 96 is an A worth 4.0, and 90 to 92 is an A− worth 3.7. It also notes that the way letter grades convert to percentages can vary slightly between colleges, and even between departments in the same college. Source: [College Board BigFuture: How to convert your GPA to a 4.0 scale](https://bigfuture.collegeboard.org/help-center/what-average-gpa). Treat any chart, including ours, as a guide and your syllabus as the rule."
      },
      {
        "t": "h2",
        "text": "How to convert a GPA from another scale",
        "id": "how-to-convert-a-gpa-from-another-scale"
      },
      {
        "t": "p",
        "text": "If your school reports GPA on a 5.0, 6.0 or 10-point scale, the quick conversion is your GPA × 4 ÷ your school's scale. A 4.1 on a 4.5 scale becomes 4.1 × 4 ÷ 4.5 = 3.64. A 7.16 on a 10-point scale becomes 2.86. Universities use this formula as an estimate, not an official conversion. The [GPA converter](/gpa-converter/) does the math for any scale. Sources: [UT Arlington: GPA converter](https://uta.edu/student-success/resources/student-resources/gpa-converter), [University of Arizona Graduate College: GPA calculator](https://grad.arizona.edu/gpacalculator/)."
      },
      {
        "t": "p",
        "text": "For a weighted high school GPA, this shortcut doesn't give you an unweighted GPA. Remove the bonus points class by class instead."
      }
    ],
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
      }
    ]
  },
  "raise": {
    "path": "/guides/how-to-raise-your-gpa/",
    "title": "How to Raise Your GPA (and How Much It Can Go Up)",
    "description": "GPA moves by credits, not effort alone. See how much a semester of A's can raise a 2.8, when a retake helps, and what doesn't change your GPA at all.",
    "h1": "How to Raise Your GPA",
    "lead": "Your GPA is an average weighted by credits, so every new grade is diluted by all the credits you already have. That's why it moves quickly early on and slowly later. To raise it, earn your best grades in the classes with the most credits, use your school's retake policy when it replaces grades, and start as early as you can.",
    "blocks": [
      {
        "t": "h2",
        "text": "Why your GPA gets harder to move",
        "id": "why-your-gpa-gets-harder-to-move"
      },
      {
        "t": "p",
        "text": "Say you have a 3.0 after 15 credits and then earn a 4.0 in a 15-credit semester. Your GPA jumps to (45 + 60) ÷ 30 = 3.50. A student with the same 3.0 after 90 credits who earns the same 4.0 semester only reaches (270 + 60) ÷ 105 = 3.14. Same grades, very different results."
      },
      {
        "t": "h2",
        "text": "How much can one semester raise your GPA?",
        "id": "how-much-can-one-semester-raise-your-gpa"
      },
      {
        "t": "p",
        "text": "These examples start from a 2.8 GPA and add one 15-credit semester."
      },
      {
        "t": "table",
        "caption": "How much can one semester raise your GPA?",
        "columns": [
          "Credits so far",
          "New semester at 3.5",
          "New semester at 4.0"
        ],
        "rows": [
          [
            "30 credits",
            "3.03",
            "3.20"
          ],
          [
            "60 credits",
            "2.94",
            "3.04"
          ],
          [
            "90 credits",
            "2.90",
            "2.97"
          ]
        ]
      },
      {
        "t": "img",
        "src": "/guides/raise-gpa-by-credits.webp",
        "alt": "Bar chart of a 2.8 GPA after one 15-credit semester of A's: 3.40 with 15 credits already earned, falling to 2.93 with 120",
        "caption": "The more credits you already have, the less one strong semester moves your GPA.",
        "width": 1200,
        "height": 675
      },
      {
        "t": "p",
        "text": "To run your own numbers, enter your current GPA and credits in the [cumulative GPA calculator](/cumulative-gpa-calculator/) and add the semester you're planning."
      },
      {
        "t": "h2",
        "text": "Work backward from a target",
        "id": "work-backward-from-a-target"
      },
      {
        "t": "p",
        "text": "The semester GPA you need is: (target GPA × total credits after the semester − quality points you have now) ÷ credits this semester."
      },
      {
        "t": "p",
        "text": "Example: you have a 2.8 after 45 credits, which is 126 quality points, and you want a 3.0 after a 15-credit semester. You need (3.0 × 60 − 126) ÷ 15 = 54 ÷ 15 = 3.6 this semester. If the answer is above 4.0, the target isn't reachable in one term, and you'll need to spread it over two."
      },
      {
        "t": "h2",
        "text": "Put your effort where the credits are",
        "id": "put-your-effort-where-the-credits-are"
      },
      {
        "t": "p",
        "text": "A class's weight in your GPA depends on its credits. An A in a 4-credit class adds 16 quality points, while an A in a 1-credit class adds 4. When you're short on time, the bigger classes deserve it first. Inside each class, the [final grade calculator](/final-grade-calculator/) tells you what you need on the final to reach the next letter grade."
      },
      {
        "t": "h2",
        "text": "Retake a class if your school replaces the grade",
        "id": "retake-a-class-if-your-school-replaces-the-grade"
      },
      {
        "t": "p",
        "text": "Schools handle retakes in two ways. Some replace the old grade with the new one. Others average both attempts. Say you have a 2.6 over 30 credits, including an F in a 3-credit class, and you retake it for a B."
      },
      {
        "t": "ul",
        "items": [
          "With grade replacement, the F's zero points are swapped for the B's 9, giving 87 ÷ 30 = 2.90.",
          "With both attempts counted, you add 9 points and 3 credits, giving 87 ÷ 33 = 2.64."
        ]
      },
      {
        "t": "p",
        "text": "Check your college's policy before you register, and compare both outcomes in the [college GPA calculator](/college-gpa-calculator/). If you're headed to law school, LSAC counts every attempt either way."
      },
      {
        "t": "h2",
        "text": "What doesn't change your GPA",
        "id": "what-doesn-t-change-your-gpa"
      },
      {
        "t": "ul",
        "items": [
          "Withdrawals: at most schools a W stays on your transcript but adds no grade points or GPA credits. It also stops a failing grade from counting.",
          "Pass/fail classes: a passing grade usually adds credits but no grade points, so it can't raise your GPA. A failing grade in a pass/fail class counts as an F at some schools.",
          "Incompletes: they don't count until the final grade is posted."
        ]
      },
      {
        "t": "p",
        "text": "Your school's rules decide each of these, and withdrawals can affect financial aid progress even when they don't touch your GPA."
      },
      {
        "t": "h2",
        "text": "In high school: weighted classes",
        "id": "in-high-school-weighted-classes"
      },
      {
        "t": "p",
        "text": "On a weighted scale, an A in an AP or Honors class can lift your weighted GPA above what the same grade would do in a regular class. It doesn't change your unweighted GPA, and colleges such as the University of California cap how many honors points count. The [high school GPA calculator](/high-school-gpa-calculator/) shows both numbers."
      },
      {
        "t": "h2",
        "text": "How real colleges handle retakes",
        "id": "how-real-colleges-handle-retakes"
      },
      {
        "t": "p",
        "text": "Grade replacement always comes with limits. UCLA counts only the newest grade for the first 16 units you repeat, and only for classes where you earned a C− or lower. UC Berkeley allows a repeat after a D+ or lower and replaces the grade for the first 12 graded units. The University of Cincinnati requires a request and caps replacements at 18 semester credit hours."
      },
      {
        "t": "p",
        "text": "Sources: [UCLA Registrar](https://catalog.registrar.ucla.edu/Policies-and-Regulations/Academic-Policies/Repetition-of-Courses), [UC Berkeley Registrar](https://www.registrar.berkeley.edu/faculty-staff/grading/grading-policies-reports), [University of Cincinnati](https://www.uc.edu/about/registrar/record-updates/grade-replacements.html)."
      },
      {
        "t": "p",
        "text": "So a retake is worth the most when it removes an F or D in a class with many credits, and when you still have replacement units left."
      },
      {
        "t": "h2",
        "text": "W and WF are not the same",
        "id": "w-and-wf-are-not-the-same"
      },
      {
        "t": "p",
        "text": "At the University of Utah, a W is recorded on your transcript but isn't used to calculate your GPA. At USC Union, a University of South Carolina campus, a W isn't calculated either, but a WF after the deadline is treated as an F. Know your last day to withdraw before you decide. Sources: [University of Utah Registrar: Withdrawal policy](https://registrar.utah.edu/handbook/withdrawal.php), [USC Union Registrar: Withdrawal](https://www.union.sc.edu/about/offices_and_divisions/registrar/registration/withdrawal/index.php)."
      },
      {
        "t": "h2",
        "text": "Plan your next semester in two minutes",
        "id": "plan-your-next-semester-in-two-minutes"
      },
      {
        "t": "p",
        "text": "Open the [cumulative GPA calculator](/cumulative-gpa-calculator/) and enter the GPA credits and quality points from your transcript. Add next semester's classes with the grades you're aiming for. You'll see your new cumulative GPA right away, and you can change one grade at a time to find out which class moves it most."
      }
    ],
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
      }
    ]
  }
} satisfies Record<string, GuideContent>;
