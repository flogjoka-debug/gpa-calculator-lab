// Generated page copy. Edit the copy in seo/v2, then regenerate.
import type { GuideBlock } from "../guides-content";

const blocks: GuideBlock[] = [
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
        "November 23, 2026",
        "GPA Calculator (home)",
        "Added several terms, a GPA so far, high school levels, a target GPA planner, what-if, biggest boost and share links. Added the GPA converter",
        "Same formulas as the college, high school and cumulative calculators"
      ],
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
];
export default blocks;
