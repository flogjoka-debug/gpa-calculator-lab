import { Breadcrumbs, CalculatorFooter } from "@/components/PageSeo";
import { createFileRoute } from "@tanstack/react-router";
import { GradeTool } from "@/components/gpa/GradeTool";
import { LoadExampleButton } from "@/components/gpa/shared";
import { PAGES, pageHead } from "@/lib/site";

const page = PAGES.grade;

export const Route = createFileRoute("/grade-calculator")({
  head: () => pageHead(page),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <Breadcrumbs page={page} />
      <h1 className="text-[2rem] leading-tight sm:text-4xl">Grade Calculator</h1>
      <p className="mt-2 text-text-muted sm:text-lg">
        Add your assignment scores, or your category averages and their weights, to see your current grade in a class. Blank scores stay out of the math; a zero counts as a real score.
      </p>
      <GradeTool />
      <section className="mt-12" aria-labelledby="how">
        <h2 id="how" className="text-2xl">How we calculated this</h2>
        <p className="mt-2">In Points mode we add up the points you earned and divide by the points possible. In Weighted categories mode each category average is multiplied by its weight, and the results are added together. If some categories don't have a score yet, we divide by the weight that's been graded so far.</p>
      </section>
      <section className="mt-12" aria-labelledby="example">
        <h2 id="example" className="text-2xl">Example: points and weighted categories</h2>
        <p className="mt-2">Points: 18 out of 20 and 30 out of 40 add up to 48 out of 60, which is 80%.</p>
        <p className="mt-2">Categories: an 80% average in a category worth 40% and a 90% average in a category worth 60% give 0.40 × 80 + 0.60 × 90 = 86%.</p>
        <LoadExampleButton />
      </section>
      <section className="mt-12" aria-labelledby="blank">
        <h2 id="blank" className="text-2xl">A blank isn't a zero</h2>
        <p className="mt-2">Leave a score blank if the assignment hasn't been graded yet. We'll leave it out and tell you how much of the course your grade is based on. Enter 0 only if you really got a zero, because it pulls your grade down like any other score.</p>
      </section>
      <section className="mt-12" aria-labelledby="weights">
        <h2 id="weights" className="text-2xl">When your weights don't add up to 100%</h2>
        <p className="mt-2">If the categories you entered add up to less than 100%, the result is your grade so far. If they add up to more than 100%, check your syllabus. One of the weights is probably wrong.</p>
      </section>
      <CalculatorFooter page={page} />
    </main>
  );
}
