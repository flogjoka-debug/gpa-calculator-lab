// Generated page copy. Edit the copy in seo/v2, then regenerate.
import type { GuideBlock } from "../guides-content";

const blocks: GuideBlock[] = [
  {
    "t": "h2",
    "text": "The same GPA on different scales",
    "id": "the-same-gpa-on-different-scales"
  },
  {
    "t": "p",
    "text": "A proportional conversion keeps your position on the scale. Each row is one GPA shown on five scales:"
  },
  {
    "t": "table",
    "caption": "The same GPA on different scales",
    "columns": [
      "4.0 scale",
      "4.5 scale",
      "5.0 scale",
      "10-point scale",
      "20-point scale"
    ],
    "rows": [
      [
        "3.60",
        "4.05",
        "4.50",
        "9.00",
        "18.00"
      ],
      [
        "3.20",
        "3.60",
        "4.00",
        "8.00",
        "16.00"
      ],
      [
        "2.80",
        "3.15",
        "3.50",
        "7.00",
        "14.00"
      ]
    ]
  },
  {
    "t": "p",
    "text": "Read across a row to convert in either direction."
  },
  {
    "t": "img",
    "src": "/diagrams/converter-proportional.webp",
    "alt": "Three scales side by side, 4.0, 5.0 and 10, with the same position marked on each: 3.60 out of 4, 4.50 out of 5 and 9.00 out of 10",
    "caption": "A proportional conversion keeps the same place on each scale.",
    "width": 1200,
    "height": 675
  },
  {
    "t": "h2",
    "text": "When the converter can mislead you",
    "id": "when-the-converter-can-mislead-you"
  },
  {
    "t": "p",
    "text": "A 4.5 on a weighted 5.0 high school scale converts to 3.60, but that 4.5 already includes bonus points for Honors and AP classes. The student's unweighted GPA might be 3.8 or 3.4, depending on which classes earned the bonus. For a weighted GPA, recalculate from your grades in the [high school GPA calculator](/high-school-gpa-calculator/) instead of converting the total."
  },
  {
    "t": "img",
    "src": "/diagrams/converter-weighted-trap.webp",
    "alt": "Comparison of a 4.5 weighted GPA on a 5.0 scale: dividing gives 3.60, while recalculating from the grades without bonus points can give a different unweighted GPA",
    "caption": "Bonus points don't scale away, so recalculate a weighted GPA from your grades.",
    "width": 1200,
    "height": 675
  },
  {
    "t": "h2",
    "text": "Converting a GPA from a 4.33 scale",
    "id": "converting-a-gpa-from-a-4-33-scale"
  },
  {
    "t": "p",
    "text": "A 4.33 scale only differs from a 4.0 scale at the top: an A+ is worth 4.33 instead of 4.0, and every other grade keeps its usual value. That makes a proportional conversion misleading. A student with straight A's has a 4.00 on both scales, but 4.0 × 4 ÷ 4.33 = 3.70. For a 4.33 scale, count each A+ as 4.0 and recalculate instead, or simply use the GPA your school reports, which is usually close."
  },
  {
    "t": "img",
    "src": "/diagrams/converter-433-trap.webp",
    "alt": "Comparison for straight A's on a 4.33 scale: a proportional conversion gives 3.70, while the real 4.0-scale GPA is 4.00 because an A is worth 4.0 on both scales",
    "caption": "On a 4.33 scale only the A+ changes, so don't scale the whole GPA down.",
    "width": 1200,
    "height": 675
  },
  {
    "t": "h2",
    "text": "Converting a percentage average to a 4.0 GPA",
    "id": "converting-a-percentage-average-to-a-4-0-gpa"
  },
  {
    "t": "p",
    "text": "Dividing a percentage by 25 is a common shortcut, but it isn't how U.S. schools calculate GPA. They turn each class grade into a letter and each letter into grade points. Take three classes with final grades of 92, 85 and 78:"
  },
  {
    "t": "table",
    "caption": "Converting a percentage average to a 4.0 GPA",
    "columns": [
      "Class grade",
      "Letter on the common scale",
      "Grade points"
    ],
    "rows": [
      [
        "92%",
        "A−",
        "3.7"
      ],
      [
        "85%",
        "B",
        "3.0"
      ],
      [
        "78%",
        "C+",
        "2.3"
      ],
      [
        "GPA",
        "",
        "(3.7 + 3.0 + 2.3) ÷ 3 = 3.00"
      ]
    ]
  },
  {
    "t": "p",
    "text": "The percentage average is 85%, and 85 ÷ 25 = 3.40, well above the 3.00 the letters give. Use the [percentage to letter grade calculator](/percentage-to-letter-grade/) for each class first, then the [GPA calculator](/) for the average."
  },
  {
    "t": "h2",
    "text": "Transcripts from outside the U.S.",
    "id": "transcripts-from-outside-the-u-s"
  },
  {
    "t": "p",
    "text": "Universities in many countries report grades on scales that don't map neatly onto 4.0: a 10-point CGPA, a 20-point scale, percentages, or a scale where the lowest number is the best grade. U.S. colleges and graduate schools often ask applicants with these transcripts for an evaluation from a credential evaluation service, such as World Education Services (WES) or Educational Credential Evaluators (ECE), and use that result instead of a GPA you converted yourself. Check what each school asks for before you pay for an evaluation, because some programs name the service they accept."
  }
];
export default blocks;
