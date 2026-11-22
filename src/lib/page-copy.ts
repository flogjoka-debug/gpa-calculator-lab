// Generated from approved copy (human-content-seo checked) in seo/v2/*.md. Edit the copy, then regenerate.
import type { GuideBlock } from "./guides-content";

export interface PageCopy { title?: string; meta?: string; lead?: string; blocks: GuideBlock[] }

export const PAGE_COPY = {
  "homeDefinition": {
    "lead": "GPA stands for grade point average. Each letter grade is worth a set number of points, usually 4.0 for an A down to 0 for an F. Multiply each class's points by its credits to get quality points, then divide the total by the credits that count. The result is your GPA.",
    "blocks": []
  },
  "college": {
    "blocks": [
      {
        "t": "h2",
        "text": "Retake rules at real colleges",
        "id": "retake-rules-at-real-colleges"
      },
      {
        "t": "p",
        "text": "Grade replacement is common, but every college puts limits on it. Here's how three registrars describe theirs:"
      },
      {
        "t": "ul",
        "items": [
          "UCLA lets undergraduates repeat a class to raise their GPA only after a C− or lower. For the first 16 repeated units only the newest grade counts; after that, every grade is averaged in. Source: [UCLA Registrar: Repetition of Courses](https://catalog.registrar.ucla.edu/Policies-and-Regulations/Academic-Policies/Repetition-of-Courses).",
          "UC Berkeley allows a repeat after a D+, D, D−, F or NP. Both grades stay on the transcript, but only the most recent one counts, for the first 12 graded units of repeats. Source: [Berkeley Office of the Registrar: Grading policies](https://www.registrar.berkeley.edu/faculty-staff/grading/grading-policies-reports).",
          "The University of Cincinnati asks students to request a grade replacement and caps it at 18 semester credit hours. Source: [University of Cincinnati: Grade Replacements](https://www.uc.edu/about/registrar/record-updates/grade-replacements.html)."
        ]
      },
      {
        "t": "p",
        "text": "Your college's catalog has its own version. Look up the grade you need before a retake counts, and how many repeats are allowed, then pick \"Replace the earlier grade\" or \"Count both attempts\" above to match. Policies checked November 22, 2026."
      }
    ]
  },
  "highschoolWeighted": {
    "blocks": [
      {
        "t": "h2",
        "text": "Weighted and unweighted GPA on one screen",
        "id": "weighted-and-unweighted-gpa-on-one-screen"
      },
      {
        "t": "p",
        "text": "An unweighted GPA treats every class the same: an A is 4.0 in a regular class and in AP. A weighted GPA adds bonus points for harder classes, so it can go above 4.0. This calculator shows both numbers for the same classes. For a full explanation with worked examples, read [weighted vs unweighted GPA](/guides/weighted-vs-unweighted-gpa/)."
      }
    ]
  },
  "highschool": {
    "blocks": [
      {
        "t": "h2",
        "text": "Where the bonus values come from",
        "id": "where-the-bonus-values-come-from"
      },
      {
        "t": "p",
        "text": "There's no national rule for weighting. Each school or program sets its own, and two common ones disagree:"
      },
      {
        "t": "ul",
        "items": [
          "The University of California adds one honors point for each semester of an approved honors course with an A, B or C, and caps the total at 8. See the [UC GPA calculator](/uc-gpa-calculator/).",
          "Florida's Bright Futures scholarship recalculates a weighted GPA in 16 college-prep credits, adding 0.5 for Honors, AP, IB, AICE and dual enrollment courses, not a full point. Source: [Broward County Public Schools: Bright Futures requirements](https://www.browardschools.com/cms/lib/FL01803656/Centricity/Domain/7831/BF%20Requirements%202020-2021.pdf)."
        ]
      },
      {
        "t": "p",
        "text": "So the same transcript can produce three different weighted GPAs: your school's, UC's and a scholarship's. Set the bonus fields above to your school's values to see the number on your report card, and use the program's own rules when you're checking an application."
      }
    ]
  },
  "cumulative": {
    "blocks": [
      {
        "t": "h2",
        "text": "The example as a table",
        "id": "the-example-as-a-table"
      },
      {
        "t": "table",
        "caption": "The example as a table",
        "columns": [
          "Part",
          "Credits",
          "Quality points",
          "GPA"
        ],
        "rows": [
          [
            "Earlier semesters",
            "18",
            "54",
            "3.00"
          ],
          [
            "New semester",
            "6",
            "24",
            "4.00"
          ],
          [
            "Cumulative",
            "24",
            "78",
            "3.25"
          ]
        ]
      },
      {
        "t": "h2",
        "text": "How a semester of A's moves your cumulative GPA",
        "id": "how-a-semester-of-a-s-moves-your-cumulative-gpa"
      },
      {
        "t": "p",
        "text": "The more credits you already have, the less one semester can change your GPA. These rows start from a 3.0 and add 15 credits of straight A's."
      },
      {
        "t": "table",
        "caption": "How a semester of A's moves your cumulative GPA",
        "columns": [
          "Credits so far",
          "Quality points so far",
          "Cumulative GPA after 15 credits of A's"
        ],
        "rows": [
          [
            "15 credits",
            "45",
            "3.50"
          ],
          [
            "30 credits",
            "90",
            "3.33"
          ],
          [
            "60 credits",
            "180",
            "3.20"
          ],
          [
            "90 credits",
            "270",
            "3.14"
          ],
          [
            "120 credits",
            "360",
            "3.11"
          ]
        ]
      },
      {
        "t": "p",
        "text": "For strategy, such as which classes to put first or when a retake helps, see [how to raise your GPA](/guides/how-to-raise-your-gpa/)."
      },
      {
        "t": "h2",
        "text": "Transfer credits and your cumulative GPA",
        "id": "transfer-credits-and-your-cumulative-gpa"
      },
      {
        "t": "p",
        "text": "Many colleges list transfer credits on your transcript without counting their grades in your GPA there. If that's how your school works, leave transfer classes out of this calculator, or your result will be higher or lower than the one your registrar shows. Law school is different: LSAC combines grades from every college you attended, so use the [law school GPA calculator](/law-school-gpa-calculator/) for that number."
      },
      {
        "t": "h2",
        "text": "Quarter and semester units",
        "id": "quarter-and-semester-units"
      },
      {
        "t": "p",
        "text": "The math works the same on the quarter system: quality points ÷ GPA units. Just don't mix the two. If some of your credits are quarter units and some are semester units, convert first. LSAC, for example, multiplies quarter hours by 0.67 to get semester hours."
      }
    ]
  },
  "grade": {
    "blocks": [
      {
        "t": "h2",
        "text": "Example: a syllabus with three weighted categories",
        "id": "example-a-syllabus-with-three-weighted-categories"
      },
      {
        "t": "p",
        "text": "A common syllabus split is homework 20%, quizzes 30% and tests 50%. Here's how a student with averages of 95, 84 and 78 ends up:"
      },
      {
        "t": "table",
        "caption": "Example: a syllabus with three weighted categories",
        "columns": [
          "Category",
          "Weight",
          "Your average",
          "Points toward your grade"
        ],
        "rows": [
          [
            "Homework",
            "20%",
            "95%",
            "19.0"
          ],
          [
            "Quizzes",
            "30%",
            "84%",
            "25.2"
          ],
          [
            "Tests",
            "50%",
            "78%",
            "39.0"
          ],
          [
            "Total",
            "100%",
            "—",
            "83.2%"
          ]
        ]
      },
      {
        "t": "p",
        "text": "That's a B on the common scale. Raising the homework average to 100 would only add 1 point; raising the test average to 88 would add 5."
      },
      {
        "t": "h2",
        "text": "Grade calculator for college classes",
        "id": "grade-calculator-for-college-classes"
      },
      {
        "t": "p",
        "text": "College syllabi often mix both systems: a points total inside each category, then category weights on top. Work out each category's average from its points first, then use Weighted categories mode. Watch for three things college courses often do:"
      },
      {
        "t": "ul",
        "items": [
          "They drop the lowest quiz or homework score. Leave that score out before you average the category.",
          "They count participation or attendance as its own category. Give it the weight the syllabus lists.",
          "They set a minimum score on the final to pass the course. That rule isn't part of the average, so check it separately."
        ]
      },
      {
        "t": "h2",
        "text": "What-if: the score you need on what's left",
        "id": "what-if-the-score-you-need-on-what-s-left"
      },
      {
        "t": "p",
        "text": "If a category isn't graded yet, you can test scores for it. Say homework (20%) and quizzes (30%) are done at 95 and 84, and the test category (50%) is still open. You have 19 + 25.2 = 44.2 points so far. To finish with a 90, the tests have to bring 45.8 points, which means a test average of 91.6. For one final exam, the [final grade calculator](/final-grade-calculator/) does this for you."
      }
    ]
  },
  "final": {
    "blocks": [
      {
        "t": "h2",
        "text": "How the final's weight changes the score you need",
        "id": "how-the-final-s-weight-changes-the-score-you-need"
      },
      {
        "t": "p",
        "text": "Starting from 85% and aiming for 90%, a heavier final gives you more room:"
      },
      {
        "t": "table",
        "caption": "How the final's weight changes the score you need",
        "columns": [
          "Final worth",
          "Score you need for 90%"
        ],
        "rows": [
          [
            "10%",
            "135% (not reachable)"
          ],
          [
            "20%",
            "110% (not reachable)"
          ],
          [
            "30%",
            "101.7% (not reachable)"
          ],
          [
            "40%",
            "97.5%"
          ],
          [
            "50%",
            "95%"
          ]
        ]
      },
      {
        "t": "p",
        "text": "If the final is worth little, the grade you have now decides almost everything. That's why the calculator also shows the highest grade you can still reach."
      },
      {
        "t": "h2",
        "text": "When the final is part of a category",
        "id": "when-the-final-is-part-of-a-category"
      },
      {
        "t": "p",
        "text": "Some syllabi don't give the final its own weight. Instead it sits in the test category with your other tests. Say tests are 60% of your grade, you've taken three tests worth 100 points each and scored 255, and the final is worth 200 points in the same category. Your other categories average 90 and make up the remaining 40%."
      },
      {
        "t": "p",
        "text": "To finish with an 85, the test category needs (85 − 0.40 × 90) ÷ 0.60 = 81.7%. Across 500 test points that's about 408.3 points, so you need 154 out of 200 on the final, or 77%."
      },
      {
        "t": "p",
        "text": "In this setup the final is really worth 60% × 200 ÷ 500 = 24% of your grade, not the 60% the test category carries."
      },
      {
        "t": "h2",
        "text": "When the final replaces your lowest test",
        "id": "when-the-final-replaces-your-lowest-test"
      },
      {
        "t": "p",
        "text": "Some teachers swap your lowest test score for your final exam score if the final is higher. The final then counts twice: once as the final and once in place of the weak test. Work it out in two steps. First find the score you need with the normal formula. Then check what that score does when it also replaces your lowest test. With a 60 on one test, any final above 60 raises your test average too, so the score you need is lower than the calculator shows. Ask your teacher exactly how the swap works before you plan around it."
      }
    ]
  },
  "semester": {
    "blocks": [
      {
        "t": "h2",
        "text": "Weightings schools actually use",
        "id": "weightings-schools-actually-use"
      },
      {
        "t": "p",
        "text": "Here are real policies from four districts. Your school's handbook or syllabus has the split that applies to you."
      },
      {
        "t": "table",
        "caption": "Weightings schools actually use",
        "columns": [
          "District",
          "Quarter 1",
          "Quarter 2",
          "Semester exam"
        ],
        "rows": [
          [
            "Plano ISD (Texas)",
            "40%",
            "40%",
            "20%"
          ],
          [
            "Broward County (Florida)",
            "37.5%",
            "37.5%",
            "25%"
          ],
          [
            "Hillsborough County (Florida)",
            "Rest of the grade",
            "Rest of the grade",
            "25% or 30%"
          ],
          [
            "Fairfax County (Virginia)",
            "Rest of the grade",
            "Rest of the grade",
            "Up to 20%"
          ]
        ]
      },
      {
        "t": "p",
        "text": "Sources: [Plano ISD](https://www.pisd.edu/Page/32402), [Broward County Public Schools](https://www.browardschools.com/cms/lib/FL01803656/Centricity/Domain/6890/figuregrade.pdf), [Hillsborough County Public Schools](https://www.hillsboroughschools.org//cms/lib/FL50000635/Centricity/Domain/6571/Grade%20Calculation.pdf), [Fairfax County Public Schools](https://fcps.edu/academics/grading-and-reporting/secondary/determining-quarter-and-final-grades). Checked November 22, 2026."
      },
      {
        "t": "h2",
        "text": "Three grading periods and an exam",
        "id": "three-grading-periods-and-an-exam"
      },
      {
        "t": "p",
        "text": "Schools on trimesters or six-week terms often split a semester into three periods. Pick Custom above and add a period for each one. Example: three periods worth 25% each and an exam worth 25%, with grades of 88, 92 and 85 and a 78 on the exam:"
      },
      {
        "t": "p",
        "text": "0.25 × 88 + 0.25 × 92 + 0.25 × 85 + 0.25 × 78 = 22 + 23 + 21.25 + 19.5 = 85.75%."
      },
      {
        "t": "h2",
        "text": "Semester grades without quarters",
        "id": "semester-grades-without-quarters"
      },
      {
        "t": "p",
        "text": "Some districts no longer average quarter grades. One Illinois district switched to a semester grade built from the full 18 weeks of work, weighted at 80%, plus the final exam at 20% ([district comparison chart](https://il49000007.schoolwires.net/cms/lib/IL49000007/Centricity/Domain/52/Grading-Improvement-Comparison-Chart.pdf)). To use this calculator that way, enter your semester average as one period worth 80% and the exam as 20%."
      },
      {
        "t": "h2",
        "text": "Passing two of three",
        "id": "passing-two-of-three"
      },
      {
        "t": "p",
        "text": "Some schools add a rule on top of the average. Hillsborough County, for example, requires a passing grade on at least two of the three grades (two quarters and the exam) to earn credit. If you failed one quarter, check this rule even when your semester average is passing."
      },
      {
        "t": "h2",
        "text": "From semester grade to transcript",
        "id": "from-semester-grade-to-transcript"
      },
      {
        "t": "p",
        "text": "In many high schools, a yearlong course appears on the transcript as two semester grades, each worth half a credit. Your GPA then counts each semester on its own, so a B in the fall and an A in the spring add a 3.0 and a 4.0 instead of one averaged year grade. Other schools post a single grade for the whole year. Your transcript or student portal shows which way your school does it."
      },
      {
        "t": "p",
        "text": "Once you have your semester letter grades, the [high school GPA calculator](/high-school-gpa-calculator/) turns them into a GPA, with the honors and AP bonus your school uses."
      },
      {
        "t": "h2",
        "text": "When the exam can't get you there",
        "id": "when-the-exam-can-t-get-you-there"
      },
      {
        "t": "p",
        "text": "Leave the exam blank and the table also shows when a grade is out of reach. With a 40/40/20 split and quarter grades of 70 and 72, the A and B rows read \"Not reachable\": even a 100 on the exam brings the semester to 76.8. Knowing that early helps: your time may be better spent on a missing assignment, or on asking your teacher what can still change."
      }
    ]
  },
  "percentage": {
    "blocks": [
      {
        "t": "h2",
        "text": "Does 89.5% round up to an A?",
        "id": "does-89-5-round-up-to-an-a"
      },
      {
        "t": "p",
        "text": "Only if your teacher or school rounds, and many don't. Some gradebooks round to the nearest whole number, some round only at the end of the term, and some never round. Your syllabus usually says which. This calculator uses your exact percentage, so 89.5% is a B+ on the common scale and a B on the 10-point scale. If your teacher rounds, enter the rounded number. When in doubt, ask your teacher before the last assignment, not after grades are posted."
      },
      {
        "t": "h2",
        "text": "Letter grade cutoffs vary by school",
        "id": "letter-grade-cutoffs-vary-by-school"
      },
      {
        "t": "p",
        "text": "The chart above is one common example. College Board's BigFuture shows the same pattern of 93 for an A and 90 for an A−, and notes that the way letter grades convert to percentages can vary from college to college, and even between departments. Source: [College Board BigFuture: How to convert your GPA to a 4.0 scale](https://bigfuture.collegeboard.org/help-center/what-average-gpa). Pick the 10-point scale or Custom above if your syllabus uses different cutoffs."
      },
      {
        "t": "h2",
        "text": "From letter grade to GPA",
        "id": "from-letter-grade-to-gpa"
      },
      {
        "t": "p",
        "text": "Once you have the letter, the 4.0 scale gives its grade points: A 4.0, B 3.0, C 2.0, D 1.0, F 0, with plus and minus grades in between. The full chart is in [the 4.0 GPA scale guide](/guides/gpa-scale/). To combine several letter grades into a GPA, use the [college GPA calculator](/college-gpa-calculator/)."
      }
    ]
  },
  "uc": {
    "blocks": [
      {
        "t": "h2",
        "text": "UC GPA rules at a glance",
        "id": "uc-gpa-rules-at-a-glance"
      },
      {
        "t": "table",
        "caption": "UC GPA rules at a glance",
        "columns": [
          "Rule",
          "What UC does"
        ],
        "rows": [
          [
            "Grades that count",
            "A-G courses from the summer after 9th grade through the summer after 11th grade"
          ],
          [
            "Grade points",
            "A = 4, B = 3, C = 2, D = 1; no plus or minus"
          ],
          [
            "Honors points",
            "+1 per semester of a UC-approved honors course with an A, B or C"
          ],
          [
            "Honors cap",
            "8 points in total, no more than 4 from 10th grade"
          ],
          [
            "Nonresidents",
            "Honors points only for AP and IB courses"
          ],
          [
            "Rounding",
            "None: the GPA is cut off, not rounded"
          ],
          [
            "Minimum GPA",
            "3.0 for California residents, 3.4 for nonresidents"
          ]
        ]
      },
      {
        "t": "p",
        "text": "Source: [UC Admissions: GPA requirement](https://admission.universityofcalifornia.edu/admission-requirements/first-year-requirements/gpa-requirement.html), checked November 22, 2026."
      }
    ]
  },
  "law": {
    "blocks": [
      {
        "t": "h2",
        "text": "What changes for the 2027–2028 cycle",
        "id": "what-changes-for-the-2027-2028-cycle"
      },
      {
        "t": "p",
        "text": "On August 18, 2026, LSAC announced that college courses taken while you were still in high school will leave the LSAC GPA starting with the 2027–2028 application cycle. Until then, in the 2026–2027 cycle, those grades are included. The change applies to everyone who applies in 2027–2028 or later, including people who applied before. Law schools still see those transcripts in your CAS report. Source: [LSAC: Providing more time to adjust to LSAC GPA changes](https://www.lsac.org/blog/providing-more-time-adjust-lsac-gpa-changes). Pick your cycle above, and you'll see which classes count."
      },
      {
        "t": "h2",
        "text": "Quarter hours, converted",
        "id": "quarter-hours-converted"
      },
      {
        "t": "table",
        "caption": "Quarter hours, converted",
        "columns": [
          "Quarter hours",
          "Semester hours used by LSAC"
        ],
        "rows": [
          [
            "3",
            "2.01"
          ],
          [
            "4",
            "2.68"
          ],
          [
            "5",
            "3.35"
          ]
        ]
      },
      {
        "t": "p",
        "text": "LSAC multiplies quarter hours by 0.67, so a 4-unit quarter class with an A adds 4.00 × 2.68 = 10.72 quality points."
      }
    ]
  },
  "hub": {
    "lead": "Plain answers to the GPA questions students ask most, with the math shown and a calculator for each one.",
    "blocks": [
      {
        "t": "h2",
        "text": "Start here",
        "id": "start-here"
      },
      {
        "t": "p",
        "text": "A GPA can mean three different numbers for the same student: the one your school prints, the one a college recalculates, and the one a scholarship or LSAC uses. These guides explain where the numbers come from, which rules change them, and what you can still do about yours. Each one cites the official source for every rule, such as UC Admissions, LSAC, the Common App or a university registrar, and shows the arithmetic step by step so you can check it with your own grades."
      },
      {
        "t": "h2",
        "text": "For high school students",
        "id": "for-high-school-students"
      },
      {
        "t": "p",
        "text": "[Weighted vs unweighted GPA](/guides/weighted-vs-unweighted-gpa/) explains bonus points for Honors, AP and IB, and which number the Common App asks for. [What is a good GPA?](/guides/what-is-a-good-gpa/) puts 2.5, 3.0, 3.5 and 4.0 in context, from the national average to scholarship cutoffs."
      },
      {
        "t": "h2",
        "text": "For college students",
        "id": "for-college-students"
      },
      {
        "t": "p",
        "text": "[How to raise your GPA](/guides/how-to-raise-your-gpa/) shows how much one semester can move a cumulative GPA, when a retake helps, and what a W does. [The 4.0 GPA scale](/guides/gpa-scale/) lists every letter grade with its points and percentage range, and shows how to convert a GPA from another scale."
      },
      {
        "t": "h2",
        "text": "For applicants",
        "id": "for-applicants"
      },
      {
        "t": "p",
        "text": "College, graduate school and law school applications all use GPA differently. Start with the guide on what counts as a good GPA, then use the [UC GPA calculator](/uc-gpa-calculator/) or the [law school GPA calculator](/law-school-gpa-calculator/) for the exact rules those applications follow."
      },
      {
        "t": "h2",
        "text": "Find the right page for your question",
        "id": "find-the-right-page-for-your-question"
      },
      {
        "t": "ul",
        "items": [
          "\"Is a 3.5 GPA good?\" Read [what is a good GPA](/guides/what-is-a-good-gpa/).",
          "\"What letter grade is an 87?\" Use the [percentage to letter grade calculator](/percentage-to-letter-grade/).",
          "\"What do I need on my final?\" Use the [final grade calculator](/final-grade-calculator/).",
          "\"Will colleges look at my weighted GPA?\" Read [weighted vs unweighted GPA](/guides/weighted-vs-unweighted-gpa/).",
          "\"Can one good semester fix my GPA?\" Read [how to raise your GPA](/guides/how-to-raise-your-gpa/), then try your numbers in the [cumulative GPA calculator](/cumulative-gpa-calculator/).",
          "\"What is a 3.5 as a percentage?\" Read [the 4.0 GPA scale](/guides/gpa-scale/)."
        ]
      },
      {
        "t": "h2",
        "text": "How we write these guides",
        "id": "how-we-write-these-guides"
      },
      {
        "t": "p",
        "text": "Every guide is written and maintained by FloPixels, the studio that builds GPA Calculator Lab. We take rules from the organizations that set them, link the source next to the rule, and date each check. When a policy changes, such as LSAC's dual enrollment rule, we update the guide and the matching calculator together. Found something out of date? [Tell us](/contact/)."
      }
    ]
  },
  "about": {
    "title": "About GPA Calculator Lab – Who Builds Our Free GPA Tools",
    "meta": "GPA Calculator Lab is built and maintained by FloPixels. Free GPA and grade calculators that show their math and cite the official rules they follow.",
    "lead": "GPA Calculator Lab is a set of free calculators for U.S. high school students, college students and applicants. Each one shows its math: which grades counted, which didn't, and why.",
    "blocks": [
      {
        "t": "h2",
        "text": "Who we are",
        "id": "who-we-are"
      },
      {
        "t": "p",
        "text": "GPA Calculator Lab is built and maintained by [FloPixels](https://flopixels.net/), a web design and SEO studio. We launched the site in November 2026. We're not a school, a counseling service or an admissions office. Our job is to turn published grading rules into calculators that get the arithmetic right and explain every step."
      },
      {
        "t": "h2",
        "text": "Who the calculators are for",
        "id": "who-the-calculators-are-for"
      },
      {
        "t": "p",
        "text": "We built the site for four kinds of visitors: high school students comparing their weighted and unweighted GPA before applications, college students planning a semester or a retake, applicants checking the UC or LSAC number before they submit, and parents or counselors who want to double-check a figure. If you're none of these and the site still helped, we'd like to hear what you used it for."
      },
      {
        "t": "h2",
        "text": "Why we built it",
        "id": "why-we-built-it"
      },
      {
        "t": "p",
        "text": "Most GPA calculators give you one number and stop. But the same grades can produce several GPAs: your school's weighted GPA, an unweighted GPA, a UC GPA capped at 8 honors points, and an LSAC GPA that counts every retake. Students run into the difference at the worst moment, on an application or a scholarship form. So we built a separate calculator for each set of rules, and every result lists the classes that counted and the ones that didn't."
      },
      {
        "t": "h2",
        "text": "How we check our math",
        "id": "how-we-check-our-math"
      },
      {
        "t": "ul",
        "items": [
          "Rules come from the organizations that set them: UC Admissions, LSAC, and the registrars and school districts we cite on each page. We link the source next to the rule and note the date we checked it.",
          "Every calculator has automated tests built from worked examples, such as an A in a 3-credit class and a B in a 4-credit class giving 3.43, or 12 honors A's giving a capped UC GPA of 4.66. The site doesn't go live unless those tests pass.",
          "Where schools differ, we say so and let you change the scale or the bonus points instead of guessing."
        ]
      },
      {
        "t": "p",
        "text": "The formulas and sources for every calculator are on [how our calculators work](/methodology/), along with a log of each change."
      },
      {
        "t": "h2",
        "text": "The calculators at a glance",
        "id": "the-calculators-at-a-glance"
      },
      {
        "t": "ul",
        "items": [
          "[High school GPA calculator](/high-school-gpa-calculator/): weighted and unweighted GPA, with your school's honors and AP bonus.",
          "[College GPA calculator](/college-gpa-calculator/): semester GPA by credit hours, with retakes handled the way your college handles them.",
          "[Cumulative GPA calculator](/cumulative-gpa-calculator/): adds a new semester to the GPA and credits you already have.",
          "[UC GPA calculator](/uc-gpa-calculator/): the University of California's capped and unweighted GPA from 10th and 11th grade.",
          "[LSAC GPA calculator](/law-school-gpa-calculator/): the GPA law schools see, with every attempt counted.",
          "[Grade](/grade-calculator/), [final grade](/final-grade-calculator/) and [semester grade](/semester-grade-calculator/) calculators: your grade in one class and the score you need on what's left.",
          "[Percentage to letter grade](/percentage-to-letter-grade/): where a percentage lands on the A–F scale."
        ]
      },
      {
        "t": "h2",
        "text": "What we cover, and what we don't",
        "id": "what-we-cover-and-what-we-don-t"
      },
      {
        "t": "p",
        "text": "We cover U.S. grading: the 4.0 scale, high school weighting, and the UC and LSAC rules. We don't convert international grades such as IB scores or UK degree classifications. For those, the school you're applying to, or a credential evaluation service it names, gives the official number."
      },
      {
        "t": "h2",
        "text": "What we don't do",
        "id": "what-we-don-t-do"
      },
      {
        "t": "ul",
        "items": [
          "We don't ask for an account, and we don't send the grades you type to our servers. The calculators run in your browser.",
          "We don't publish ratings, reviews or user counts we can't back up.",
          "We don't give admissions advice or promise what a GPA will get you. A result here is an estimate. Your school's transcript, or the official calculation by UC or LSAC, is the number that counts."
        ]
      },
      {
        "t": "h2",
        "text": "Get in touch",
        "id": "get-in-touch"
      },
      {
        "t": "p",
        "text": "Found a mistake or a rule that's out of date? [Contact us](/contact/) with the calculator name and the numbers you entered. We fix confirmed errors and note them in the changelog."
      }
    ]
  },
  "privacy": {
    "title": "Privacy Policy – GPA Calculator Lab",
    "meta": "How GPA Calculator Lab handles your data: calculators run in your browser, grades are never sent, and Google Analytics loads only if you accept.",
    "lead": "Effective November 22, 2026. This policy explains what GPA Calculator Lab collects, what it doesn't, and the choices you have.",
    "blocks": [
      {
        "t": "h2",
        "text": "The short version",
        "id": "the-short-version"
      },
      {
        "t": "ul",
        "items": [
          "The grades, classes and credits you type stay in your browser. We never send them to our servers or to analytics.",
          "Google Analytics runs only if you click Accept on the cookie notice. You can change your choice at any time with \"Cookie settings\" at the bottom of every page.",
          "If you email us, we use your message only to reply."
        ]
      },
      {
        "t": "h2",
        "text": "Who we are",
        "id": "who-we-are"
      },
      {
        "t": "p",
        "text": "GPA Calculator Lab (gpacalculatorlab.com) is responsible for this website. It's built and maintained by FloPixels. For any privacy question, email [info@gpacalculatorlab.com](mailto:info@gpacalculatorlab.com)."
      },
      {
        "t": "h2",
        "text": "What stays on your device",
        "id": "what-stays-on-your-device"
      },
      {
        "t": "p",
        "text": "The calculators work entirely in your browser. Nothing you enter is saved unless you click \"Save on this device\", which stores your entries in this browser's local storage. \"Clear saved data\" removes them, and so does clearing your browser data."
      },
      {
        "t": "p",
        "text": "When you follow a link such as \"use this grade to plan your final\", we keep that one percentage in your browser so the next page can fill it in. It's deleted after it's used or after 30 minutes."
      },
      {
        "t": "p",
        "text": "We also store your cookie choice in local storage, so we don't ask again on every page."
      },
      {
        "t": "p",
        "text": "We don't put grades in page addresses, so they don't end up in browser history, server logs or analytics."
      },
      {
        "t": "h2",
        "text": "Google Analytics",
        "id": "google-analytics"
      },
      {
        "t": "p",
        "text": "If you accept, we load Google Analytics 4 to count visits and see which pages and calculators people use. Google Analytics sets first-party cookies (named _ga and _ga_ followed by an ID) and collects information such as the pages you view, how you reached the site, your browser and device type, and your approximate location. We turn off Google signals and ad personalization, and we don't send Google any grades, names or other details you type."
      },
      {
        "t": "p",
        "text": "Google processes this data on our behalf. You can read how in [Google's privacy policy](https://policies.google.com/privacy) and opt out across sites with the [Google Analytics opt-out add-on](https://tools.google.com/dlpage/gaoptout)."
      },
      {
        "t": "p",
        "text": "If you decline, Google Analytics doesn't load at all."
      },
      {
        "t": "h2",
        "text": "Server logs",
        "id": "server-logs"
      },
      {
        "t": "p",
        "text": "Like every website, our hosting provider's servers record standard request logs, such as the address a request came from, the page requested, the time and the browser. These logs are used to keep the site running and secure. They don't contain the grades you type, because those never leave your browser."
      },
      {
        "t": "h2",
        "text": "Email",
        "id": "email"
      },
      {
        "t": "p",
        "text": "If you write to us, we receive your email address and whatever you include in the message. We use it to reply and to fix any error you report, and we don't add you to a mailing list. Please don't send full transcripts, student ID numbers or other personal records."
      },
      {
        "t": "h2",
        "text": "Children's privacy",
        "id": "children-s-privacy"
      },
      {
        "t": "p",
        "text": "The calculators don't ask for names, email addresses or any other personal information, so you can use them at any age without telling us who you are. We don't knowingly collect personal information from children under 13. If you believe a child under 13 has emailed us personal information, contact us and we'll delete it."
      },
      {
        "t": "h2",
        "text": "Your choices and rights",
        "id": "your-choices-and-rights"
      },
      {
        "t": "ul",
        "items": [
          "Withdraw or change your analytics consent at any time with \"Cookie settings\".",
          "Delete anything saved in your browser with \"Clear saved data\" or your browser settings.",
          "Ask us to access or delete an email you sent us, by writing to [info@gpacalculatorlab.com](mailto:info@gpacalculatorlab.com)."
        ]
      },
      {
        "t": "p",
        "text": "We don't sell or share personal information for advertising. Depending on where you live, laws such as the GDPR or the California Consumer Privacy Act may give you further rights, and you can use them by contacting us."
      },
      {
        "t": "h2",
        "text": "Changes to this policy",
        "id": "changes-to-this-policy"
      },
      {
        "t": "p",
        "text": "If we add a new tool that handles data differently, we'll update this page before the change goes live and change the effective date above."
      }
    ]
  },
  "contact": {
    "title": "Contact GPA Calculator Lab – Report an Error or Ask a Question",
    "meta": "Report a wrong result or an outdated rule, or ask a question about GPA Calculator Lab. Email us with the calculator name and the numbers you entered.",
    "lead": "Spotted a wrong result or a rule that's out of date? Email [info@gpacalculatorlab.com](mailto:info@gpacalculatorlab.com). Every message is read by the FloPixels team that builds and maintains the calculators.",
    "blocks": [
      {
        "t": "h2",
        "text": "What you can write to us about",
        "id": "what-you-can-write-to-us-about"
      },
      {
        "t": "ul",
        "items": [
          "A result that looks wrong. Tell us which calculator, the grades and credits you entered, and the number you expected.",
          "A rule that has changed, such as a new UC or LSAC policy or a different grading scale at your school. A link to the official source helps us confirm it quickly.",
          "Something that's hard to use on your phone or with a screen reader.",
          "Questions about privacy, or a request to delete an email you sent us.",
          "Press, partnership or classroom-use questions."
        ]
      },
      {
        "t": "h2",
        "text": "What to leave out",
        "id": "what-to-leave-out"
      },
      {
        "t": "p",
        "text": "Please don't send full transcripts, student ID numbers, Social Security numbers or other personal records. We only need the numbers that went into the calculator."
      },
      {
        "t": "h2",
        "text": "Before you write",
        "id": "before-you-write"
      },
      {
        "t": "p",
        "text": "Many questions about why a result differs from your school's number are answered on [how our calculators work](/methodology/), which lists the formula and source for every calculator. If you're comparing GPAs for an application, the [GPA guides](/guides/) explain why the same grades can produce different numbers."
      },
      {
        "t": "h2",
        "text": "If your school's number is different",
        "id": "if-your-school-s-number-is-different"
      },
      {
        "t": "p",
        "text": "A different result isn't always an error. Your school may round each semester grade before averaging, use a 90/80/70/60 scale, or give a different bonus for honors classes. Check the scale and bonus settings in the calculator first. If the numbers still don't match, send us both results and we'll look at where they split."
      },
      {
        "t": "h2",
        "text": "What happens next",
        "id": "what-happens-next"
      },
      {
        "t": "p",
        "text": "We check reported errors against the calculator's tests and the official source. When we fix something, we update the calculator and add the change to the changelog on the methodology page."
      }
    ]
  },
  "methodology": {
    "lead": "This page lists the formula behind each calculator, a worked example you can check, and the source for every outside rule. When a rule changes, we update the calculator, this page and the changelog at the bottom.",
    "blocks": [
      {
        "t": "h2",
        "text": "Principles every calculator follows",
        "id": "principles-every-calculator-follows"
      },
      {
        "t": "ul",
        "items": [
          "Every result shows its numerator and denominator, the rows that counted and the rows that didn't, with the reason.",
          "Grade scales and bonus points marked \"example\" are starting values you can edit. Your school's own scale always wins.",
          "Calculations run in your browser. Blank fields are left out; a zero is counted as a zero.",
          "Each calculator has automated tests built from the worked examples below. A change can't go live if one fails."
        ]
      },
      {
        "t": "h2",
        "text": "GPA calculator",
        "id": "gpa-calculator"
      },
      {
        "t": "h3",
        "text": "Formula"
      },
      {
        "t": "p",
        "text": "GPA = total quality points ÷ total GPA credits. Quality points are grade points × credits. An F counts as 0 points with its credits included. P, NP and W are left out by default. With \"All classes count equally\" on, every class gets one credit."
      },
      {
        "t": "h3",
        "text": "Example"
      },
      {
        "t": "p",
        "text": "An A in a 3-credit class (4.0 × 3 = 12) and a B in a 4-credit class (3.0 × 4 = 12) give 24 ÷ 7 = 3.43."
      },
      {
        "t": "h3",
        "text": "Source"
      },
      {
        "t": "p",
        "text": "The default 4.0 scale is a common example (A 4.0, A− 3.7, B+ 3.3 and so on), editable on the page. [Open the GPA calculator](/)."
      },
      {
        "t": "h2",
        "text": "College GPA calculator",
        "id": "college-gpa-calculator"
      },
      {
        "t": "h3",
        "text": "Formula"
      },
      {
        "t": "p",
        "text": "The same quality-points formula, with plus and minus grades and an A+ worth 4.0 by default. For a retaken class you can count both attempts or let the later grade replace the earlier one, and the calculator shows both GPAs."
      },
      {
        "t": "h3",
        "text": "Example"
      },
      {
        "t": "p",
        "text": "An F and then an A in the same 3-credit class: counting both gives (0 + 12) ÷ 6 = 2.00; replacing the F gives 12 ÷ 3 = 4.00."
      },
      {
        "t": "h3",
        "text": "Source"
      },
      {
        "t": "p",
        "text": "Retake rules differ by college. The page links examples from UCLA, UC Berkeley and the University of Cincinnati. [Open the college GPA calculator](/college-gpa-calculator/)."
      },
      {
        "t": "h2",
        "text": "High school GPA calculator",
        "id": "high-school-gpa-calculator"
      },
      {
        "t": "h3",
        "text": "Formula"
      },
      {
        "t": "p",
        "text": "Unweighted GPA uses base grade points. Weighted GPA adds the bonus you set for Honors, AP, IB or dual enrollment before dividing by credits. The example bonuses are +0.5 for Honors and +1.0 for AP, IB and dual enrollment, and you can give no bonus for a D or F."
      },
      {
        "t": "h3",
        "text": "Example"
      },
      {
        "t": "p",
        "text": "A regular A and an AP B: unweighted (4.0 + 3.0) ÷ 2 = 3.50; weighted (4.0 + 4.0) ÷ 2 = 4.00."
      },
      {
        "t": "h3",
        "text": "Source"
      },
      {
        "t": "p",
        "text": "Weighting is set by each school. The page compares UC's honors points with Florida Bright Futures' 0.5 bonus. [Open the high school GPA calculator](/high-school-gpa-calculator/)."
      },
      {
        "t": "h2",
        "text": "Cumulative GPA calculator",
        "id": "cumulative-gpa-calculator"
      },
      {
        "t": "h3",
        "text": "Formula"
      },
      {
        "t": "p",
        "text": "Cumulative GPA = (quality points so far + new quality points) ÷ (GPA credits so far + new GPA credits). If you only know your GPA, we estimate quality points as GPA × credits and label the result an estimate."
      },
      {
        "t": "h3",
        "text": "Example"
      },
      {
        "t": "p",
        "text": "18 credits at 3.0 (54 quality points) plus 6 credits at 4.0 (24) give 78 ÷ 24 = 3.25."
      },
      {
        "t": "h3",
        "text": "Source"
      },
      {
        "t": "p",
        "text": "Your transcript's GPA hours and quality points. [Open the cumulative GPA calculator](/cumulative-gpa-calculator/)."
      },
      {
        "t": "h2",
        "text": "Grade calculator",
        "id": "grade-calculator"
      },
      {
        "t": "h3",
        "text": "Formula"
      },
      {
        "t": "p",
        "text": "Points mode: total earned ÷ total possible × 100. Weighted categories mode: each category average × its weight, added up and divided by the weight graded so far."
      },
      {
        "t": "h3",
        "text": "Example"
      },
      {
        "t": "p",
        "text": "18/20 and 30/40 give 48/60 = 80%. Categories at 80% (40% weight) and 90% (60% weight) give 0.40 × 80 + 0.60 × 90 = 86%."
      },
      {
        "t": "h3",
        "text": "Source"
      },
      {
        "t": "p",
        "text": "Your syllabus. [Open the grade calculator](/grade-calculator/)."
      },
      {
        "t": "h2",
        "text": "Final grade calculator",
        "id": "final-grade-calculator"
      },
      {
        "t": "h3",
        "text": "Formula"
      },
      {
        "t": "p",
        "text": "Score needed = (target − current × (1 − w)) ÷ w, where w is the final's weight as a decimal. We round up to one decimal, so the number shown is always enough, and we also show the highest grade you can still reach."
      },
      {
        "t": "h3",
        "text": "Example"
      },
      {
        "t": "p",
        "text": "85% now, aiming for 90%, final worth 40%: (90 − 51) ÷ 0.40 = 97.5%."
      },
      {
        "t": "h3",
        "text": "Source"
      },
      {
        "t": "p",
        "text": "Your syllabus. [Open the final grade calculator](/final-grade-calculator/)."
      },
      {
        "t": "h2",
        "text": "Semester grade calculator",
        "id": "semester-grade-calculator"
      },
      {
        "t": "h3",
        "text": "Formula"
      },
      {
        "t": "p",
        "text": "Semester grade = each grading period × its weight + exam × its weight. Presets are 40/40/20, 45/45/10 and two quarters with no exam; Custom accepts any weights that add up to 100%."
      },
      {
        "t": "h3",
        "text": "Example"
      },
      {
        "t": "p",
        "text": "Quarters of 90 and 80 and a 70 on the exam at 40/40/20: 36 + 32 + 14 = 82%."
      },
      {
        "t": "h3",
        "text": "Source"
      },
      {
        "t": "p",
        "text": "Your school's grading policy. The page lists real district splits from Plano, Broward, Hillsborough and Fairfax. [Open the semester grade calculator](/semester-grade-calculator/)."
      },
      {
        "t": "h2",
        "text": "Percentage to letter grade",
        "id": "percentage-to-letter-grade"
      },
      {
        "t": "h3",
        "text": "Formula"
      },
      {
        "t": "p",
        "text": "The letter comes from the exact percentage and the cutoffs of the scale you choose. Each letter runs from its cutoff up to, but not including, the next one. Nothing is rounded."
      },
      {
        "t": "h3",
        "text": "Example"
      },
      {
        "t": "p",
        "text": "89.99% is a B+ on the common scale (A− starts at 90) and a B on the 10-point scale."
      },
      {
        "t": "h3",
        "text": "Source"
      },
      {
        "t": "p",
        "text": "Common scale example; College Board's BigFuture shows the same cutoffs and notes that they vary. [Open the percentage to letter grade calculator](/percentage-to-letter-grade/)."
      },
      {
        "t": "h2",
        "text": "UC GPA calculator",
        "id": "uc-gpa-calculator"
      },
      {
        "t": "h3",
        "text": "Formula"
      },
      {
        "t": "p",
        "text": "A-G grades from the summer after 9th grade through the summer after 11th grade, A = 4 to D = 1 with no plus or minus. One honors point per semester of a UC-approved honors course with an A, B or C, capped at 8 in total and 4 from 10th grade; nonresidents get honors points for AP and IB only. The GPA is cut off at two decimals, never rounded up."
      },
      {
        "t": "h3",
        "text": "Example"
      },
      {
        "t": "p",
        "text": "12 honors A's: unweighted 48 ÷ 12 = 4.00; capped (48 + 8) ÷ 12 = 4.66."
      },
      {
        "t": "h3",
        "text": "Source"
      },
      {
        "t": "p",
        "text": "[UC Admissions: GPA requirement](https://admission.universityofcalifornia.edu/admission-requirements/first-year-requirements/gpa-requirement.html), checked November 22, 2026. [Open the UC GPA calculator](/uc-gpa-calculator/)."
      },
      {
        "t": "h2",
        "text": "LSAC GPA (law school) calculator",
        "id": "lsac-gpa-law-school-calculator"
      },
      {
        "t": "h3",
        "text": "Formula"
      },
      {
        "t": "p",
        "text": "Every graded undergraduate class on LSAC's 4.33 scale (A+ 4.33, A 4.00, A− 3.67 and so on), every attempt at a repeated class included, quarter hours × 0.67. Dual enrollment classes count in the 2026–2027 cycle and are left out from 2027–2028."
      },
      {
        "t": "h3",
        "text": "Example"
      },
      {
        "t": "p",
        "text": "An A and a dual enrollment B, 3 credits each: 2026–2027 cycle (12 + 9) ÷ 6 = 3.50; 2027–2028 cycle 12 ÷ 3 = 4.00."
      },
      {
        "t": "h3",
        "text": "Source"
      },
      {
        "t": "p",
        "text": "[LSAC: Transcript summarization](https://www.lsac.org/applying-law-school/jd-application-process/cas/requesting/transcript-summarization) and [LSAC's announcement of August 18, 2026](https://www.lsac.org/blog/providing-more-time-adjust-lsac-gpa-changes), checked November 22, 2026. [Open the law school GPA calculator](/law-school-gpa-calculator/)."
      },
      {
        "t": "h2",
        "text": "Changelog",
        "id": "changelog"
      },
      {
        "t": "table",
        "caption": "Changelog",
        "columns": [
          "Date",
          "Calculator",
          "What changed",
          "Source"
        ],
        "rows": [
          [
            "November 22, 2026",
            "All",
            "Added district, registrar and scholarship policy examples to the calculator pages and guides",
            "Linked on each page"
          ],
          [
            "November 22, 2026",
            "Law School GPA",
            "Added a summary of the dual enrollment change for the 2027–2028 cycle",
            "LSAC, August 18, 2026"
          ],
          [
            "November 22, 2026",
            "All",
            "Launched ten calculators with rules checked against UC and LSAC sources",
            "UC Admissions, LSAC"
          ]
        ]
      }
    ]
  }
} satisfies Record<string, PageCopy>;
