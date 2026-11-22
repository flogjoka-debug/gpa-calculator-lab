// Generated page copy. Edit the copy in seo/v2, then regenerate.
import type { GuideBlock } from "../guides-content";

const blocks: GuideBlock[] = [
  {
    "t": "h2",
    "text": "Semester vs. cumulative GPA",
    "id": "semester-vs-cumulative-gpa"
  },
  {
    "t": "p",
    "text": "Your semester GPA covers one term. Your cumulative GPA covers every graded class you've taken, so each new semester moves it less than the one before. Add a term for each semester above, and the calculator shows both: a GPA for each term and one for all of them together."
  },
  {
    "t": "table",
    "caption": "Semester vs. cumulative GPA",
    "columns": [
      "Term",
      "Grades and credits",
      "Quality points",
      "GPA"
    ],
    "rows": [
      [
        "Fall",
        "A (3), C (3)",
        "12 + 6 = 18",
        "18 ÷ 6 = 3.00"
      ],
      [
        "Spring",
        "B (4)",
        "12",
        "12 ÷ 4 = 3.00"
      ],
      [
        "Both terms",
        "10 credits",
        "30",
        "30 ÷ 10 = 3.00"
      ],
      [
        "With a 2.8 GPA over 45 earlier credits",
        "55 credits",
        "126 + 30 = 156",
        "156 ÷ 55 = 2.84"
      ]
    ]
  },
  {
    "t": "p",
    "text": "The last row is what \"Add your GPA so far\" does. It turns your old GPA back into quality points (2.8 × 45 = 126), adds the new ones, and divides by all the credits. For an exact match with your transcript, use the [cumulative GPA calculator](/cumulative-gpa-calculator/), which takes the quality points printed on it."
  }
];
export default blocks;
