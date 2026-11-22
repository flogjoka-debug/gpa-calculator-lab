import copyGradeIntro from "@/lib/copy/gradeIntro";
import copyGradeMore from "@/lib/copy/gradeMore";
import { CopyBlocks } from "@/components/Guide";
import copyGrade from "@/lib/copy/grade";
import { Breadcrumbs, CalculatorFooter, FaqSection, UpdatedLine, PageToc } from "@/components/PageSeo";
import { createFileRoute } from "@tanstack/react-router";
import { GradeTool } from "@/components/gpa/GradeTool";
import { LoadExampleButton } from "@/components/gpa/shared";
import { PAGES, pageHead } from "@/lib/site";

import { GRADE_FAQ } from "@/lib/seo-content";

const page = PAGES.grade;

const TOC: (readonly [string, string])[] = [
  ["when-to-use-a-grade-calculator", "When to use a grade calculator"],
  ["how-to-use-the-grade-calculator", "How to use the grade calculator"],
  ["how", "How we calculated this"],
  ["how-to-calculate-your-grade-in-a-class", "How to calculate your grade in a class"],
  ["example", "Example: points and weighted categories"],
  ["weighted-grades-explained", "Weighted grades explained"],
  ["blank", "A blank isn't a zero"],
  ["weights", "When your weights don't add up to 100%"],
  ["example-a-syllabus-with-three-weighted-categories", "Example: a syllabus with three weighted categories"],
  ["grade-calculator-for-college-classes", "Grade calculator for college classes"],
  ["what-if-the-score-you-need-on-what-s-left", "What-if: the score you need on what's left"],
  ["how-one-test-score-changes-your-grade", "How one test score changes your grade"],
  ["why-your-gradebook-may-disagree", "Why your gradebook may disagree"],
  ["how-to-raise-your-grade", "How to raise your grade"],
  ["faq", "FAQ"],
];

export const Route = createFileRoute("/grade-calculator")({
  head: () => pageHead(page),
  component: Page,
});

function Page() {
  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <Breadcrumbs page={page} />
      <h1 className="text-[2rem] leading-tight sm:text-4xl">Grade Calculator</h1>
      <p className="mt-2 text-text-muted sm:text-lg">
        Add your assignment scores, or your category averages and their weights, and this grade calculator shows your current grade in the class. Blank scores stay out of the math; a zero counts as a real score.
      </p>
      <UpdatedLine page={page} />
      <GradeTool />
      <PageToc items={TOC} />
      <CopyBlocks blocks={copyGradeIntro} />
      <section className="mt-12" aria-labelledby="how">
        <h2 id="how" className="text-2xl">How we calculated this</h2>
        <p className="mt-2">In Points mode we add up the points you earned and divide by the points possible. In Weighted categories mode each category average is multiplied by its weight, and the results are added together. If some categories don't have a score yet, we divide by the weight that's been graded so far.</p>
      </section>
      <section className="mt-12" aria-labelledby="how-to-calculate-your-grade-in-a-class">
        <h2 id="how-to-calculate-your-grade-in-a-class" className="text-2xl">How to calculate your grade in a class</h2>
        <p className="mt-2">If your teacher grades by total points:</p>
        <ol className="mt-3 list-decimal space-y-2 pl-6">
          <li>Add up the points you earned.</li>
          <li>Add up the points possible for the same assignments.</li>
          <li>Divide earned by possible and multiply by 100.</li>
        </ol>
        <p className="mt-2">If your syllabus uses weighted categories:</p>
        <ol className="mt-3 list-decimal space-y-2 pl-6">
          <li>Find each category's average, such as tests, homework and quizzes.</li>
          <li>Multiply each average by the category's weight written as a decimal (30% is 0.30).</li>
          <li>Add the results. If some categories have no grades yet, divide by the total weight you've used.</li>
        </ol>
      </section>
      <section className="mt-12" aria-labelledby="example">
        <h2 id="example" className="text-2xl">Example: points and weighted categories</h2>
        <p className="mt-2">Points: 18 out of 20 and 30 out of 40 add up to 48 out of 60, which is 80%.</p>
        <p className="mt-2">Categories: an 80% average in a category worth 40% and a 90% average in a category worth 60% give 0.40 × 80 + 0.60 × 90 = 86%.</p>
        <LoadExampleButton />
      </section>
      <section className="mt-12" aria-labelledby="weighted-grades-explained">
        <h2 id="weighted-grades-explained" className="text-2xl">Weighted grades explained</h2>
        <p className="mt-2">A weighted category counts for a fixed share of your grade no matter how many assignments it holds. Say your syllabus gives tests 50%, homework 30% and quizzes 20%, and your averages are 82, 95 and 88.</p>
        <p className="mt-2">0.50 × 82 = 41. 0.30 × 95 = 28.5. 0.20 × 88 = 17.6.</p>
        <p className="mt-2">41 + 28.5 + 17.6 = 87.1%, a B+ on the common scale. Your high homework average helps, but the tests still decide most of the grade.</p>
      </section>
      <section className="mt-12" aria-labelledby="blank">
        <h2 id="blank" className="text-2xl">A blank isn't a zero</h2>
        <p className="mt-2">Leave a score blank if the assignment hasn't been graded yet. We'll leave it out and tell you how much of the course your grade is based on. Enter 0 only if you really got a zero, because it pulls your grade down like any other score.</p>
      </section>
      <section className="mt-12" aria-labelledby="weights">
        <h2 id="weights" className="text-2xl">When your weights don't add up to 100%</h2>
        <p className="mt-2">If the categories you entered add up to less than 100%, the result is your grade so far. If they add up to more than 100%, check your syllabus. One of the weights is probably wrong.</p>
      </section>
      <CopyBlocks blocks={copyGrade} />
      <CopyBlocks blocks={copyGradeMore} />
      <FaqSection items={GRADE_FAQ} />
      <CalculatorFooter page={page} />
    </main>
  );
}
