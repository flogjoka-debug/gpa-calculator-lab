import { Breadcrumbs, CalculatorFooter, FaqSection, ContentTable } from "@/components/PageSeo";
import { createFileRoute } from "@tanstack/react-router";
import { SemesterTool } from "@/components/gpa/SemesterTool";
import { LoadExampleButton } from "@/components/gpa/shared";
import { PAGES, pageHead } from "@/lib/site";

import { SEMESTER_FAQ } from "@/lib/seo-content";

const page = PAGES.semester;

export const Route = createFileRoute("/semester-grade-calculator")({
  head: () => pageHead(page),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <Breadcrumbs page={page} />
      <h1 className="text-[2rem] leading-tight sm:text-4xl">Semester Grade Calculator</h1>
      <p className="mt-2 text-text-muted sm:text-lg">
        Enter your quarter grades, your final exam score, and how much each one counts. You'll get your semester grade and the math behind it.
      </p>
      <SemesterTool />
      <section className="mt-12" aria-labelledby="how">
        <h2 id="how" className="text-2xl">How we calculated this</h2>
        <p className="mt-2">Each grading period and the exam has a weight. We multiply every grade by its weight, written as a decimal, and add the results. With 40/40/20, each quarter counts 0.40 and the exam 0.20.</p>
      </section>
      <section className="mt-12" aria-labelledby="how-to-calculate-your-semester-grade">
        <h2 id="how-to-calculate-your-semester-grade" className="text-2xl">How to calculate your semester grade</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6">
          <li>Write down your grade for each quarter or grading period.</li>
          <li>Find how much each one counts, plus the semester exam. Your school's grading policy lists the split, such as 40/40/20.</li>
          <li>Multiply each grade by its weight written as a decimal.</li>
          <li>Add the results. That's your semester grade.</li>
        </ol>
      </section>
      <section className="mt-12" aria-labelledby="example">
        <h2 id="example" className="text-2xl">Example: 90, 80 and a 70 on the exam</h2>
        <p className="mt-2">0.40 × 90 = 36. 0.40 × 80 = 32. 0.20 × 70 = 14.</p>
        <p className="mt-2">36 + 32 + 14 = 82, so the semester grade is 82%.</p>
        <LoadExampleButton />
      </section>
      <section className="mt-12" aria-labelledby="semester-exam-calculator-what-you-need-on-the-exam">
        <h2 id="semester-exam-calculator-what-you-need-on-the-exam" className="text-2xl">Semester exam calculator: what you need on the exam</h2>
        <p className="mt-2">Leave the exam blank above and the calculator shows the score you need for each letter grade. For quarters of 90 and 80 at 40/40/20, the quarters already add up to 36 + 32 = 68 points.</p>
        <ContentTable caption="Semester exam calculator: what you need on the exam" columns={["Semester grade you want", "Score you need on the exam"]} rows={[["A (93%)", "Not reachable (you'd need 125%)"], ["B (83%)", "75%"], ["C (73%)", "25%"], ["D (63%)", "Already reached"]]} />
      </section>
      <section className="mt-12" aria-labelledby="gpa">
        <h2 id="gpa" className="text-2xl">Looking for your semester GPA?</h2>
        <p className="mt-2">This page works out a grade for one class. If you want the GPA for all your classes this semester, use the <a href="/college-gpa-calculator/">College GPA Calculator</a> or the <a href="/high-school-gpa-calculator/">High School GPA Calculator</a>.</p>
      </section>
      <section className="mt-12" aria-labelledby="weightings">
        <h2 id="weightings" className="text-2xl">Common weightings</h2>
        <p className="mt-2">Many high schools use 40/40/20: two quarters worth 40% each and a final worth 20%. Some use 45/45/10, and some have no semester exam at all. Use Custom if your school splits the term into three grading periods or weights the exam differently.</p>
      </section>
      <FaqSection items={SEMESTER_FAQ} />
      <CalculatorFooter page={page} />
    </main>
  );
}
