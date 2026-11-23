// Generated page copy. Edit the copy in seo/v2, then regenerate.
import type { GuideBlock } from "../guides-content";

const blocks: GuideBlock[] = [
  {
    "t": "h2",
    "text": "Can I still get an A, B or C?",
    "id": "can-i-still-get-an-a-b-or-c"
  },
  {
    "t": "p",
    "text": "Here's the score needed for each letter with an 85% now and a final worth 30%, using 90, 80, 70 and 60 as the cutoffs:"
  },
  {
    "t": "table",
    "caption": "Can I still get an A, B or C?",
    "columns": [
      "Grade you want",
      "Score needed on the final",
      "Possible?"
    ],
    "rows": [
      [
        "A (90%)",
        "101.7%",
        "Only with extra credit"
      ],
      [
        "B (80%)",
        "68.3%",
        "Yes"
      ],
      [
        "C (70%)",
        "35.0%",
        "Yes"
      ],
      [
        "D (60%)",
        "1.7%",
        "Yes"
      ]
    ]
  },
  {
    "t": "p",
    "text": "Run your own numbers above to see the same breakdown for your class and your school's cutoffs. If your school builds the semester grade from two quarters and an exam, the [semester grade calculator](/semester-grade-calculator/) handles that split for you."
  },
  {
    "t": "img",
    "src": "/diagrams/final-needed-by-target.webp",
    "alt": "Bar chart of the final exam score needed with an 85% grade and a final worth 30%: 101.7% for an A, 68.3% for a B, 35% for a C and 1.7% for a D",
    "caption": "The A bar passes 100%, so an A isn't reachable on the exam alone.",
    "width": 1200,
    "height": 675
  },
  {
    "t": "h2",
    "text": "If I fail the final, what will my grade be?",
    "id": "if-i-fail-the-final-what-will-my-grade-be"
  },
  {
    "t": "p",
    "text": "Your final grade is your current grade times the part of the course it covers, plus the final score times its weight: current × (1 − weight) + final × weight. With an 85% now and a final worth 30%:"
  },
  {
    "t": "table",
    "caption": "If I fail the final, what will my grade be?",
    "columns": [
      "Score on the final",
      "Final grade"
    ],
    "rows": [
      [
        "0%",
        "59.5%"
      ],
      [
        "50%",
        "74.5%"
      ],
      [
        "70%",
        "80.5%"
      ],
      [
        "100%",
        "89.5%"
      ]
    ]
  },
  {
    "t": "p",
    "text": "A zero on a 30% final drops an 85 below 60. Even a weak score keeps a lot more of your grade than skipping the exam."
  },
  {
    "t": "h2",
    "text": "How much does the final exam affect your grade?",
    "id": "how-much-does-the-final-exam-affect-your-grade"
  },
  {
    "t": "p",
    "text": "The heavier the final, the more one exam moves your grade. Here's what a 60% on the final does to a class where you have an 85% now:"
  },
  {
    "t": "table",
    "caption": "How much does the final exam affect your grade?",
    "columns": [
      "Final exam weight",
      "Final grade after a 60%"
    ],
    "rows": [
      [
        "10%",
        "82.5%"
      ],
      [
        "20%",
        "80.0%"
      ],
      [
        "30%",
        "77.5%"
      ],
      [
        "40%",
        "75.0%"
      ]
    ]
  },
  {
    "t": "p",
    "text": "At 10%, a bad final costs you a few points. At 40%, it can cost you a whole letter grade."
  },
  {
    "t": "img",
    "src": "/diagrams/final-weight-effect.webp",
    "alt": "Bar chart of the final grade after a 60% on the final with an 85% current grade: 82.5% when the final is worth 10%, 80% at 20%, 77.5% at 30% and 75% at 40%",
    "caption": "The same exam score costs more as the final's weight grows.",
    "width": 1200,
    "height": 675
  },
  {
    "t": "h2",
    "text": "What if my class uses points instead of percentages?",
    "id": "what-if-my-class-uses-points-instead-of-percentages"
  },
  {
    "t": "p",
    "text": "Then work in points. Multiply the percentage you want by the total points in the course, and subtract the points you already have. With 425 of 500 points so far and a 200-point final, a 90% needs 630 of 700 points: 205 on the final, which isn't possible. An 80% needs 560 points, so 135 of 200, or 67.5%. Converting to percentages first and entering them above gives the same answer, as long as the final's weight is its share of the total points, here 200 ÷ 700 = 28.6%."
  }
];
export default blocks;
