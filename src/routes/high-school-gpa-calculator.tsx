import { Breadcrumbs, CalculatorFooter, FaqSection, ContentTable } from "@/components/PageSeo";
import { createFileRoute } from "@tanstack/react-router";
import { HighSchoolCalculator } from "@/components/gpa/HighSchoolCalculator";
import { LoadExampleButton } from "@/components/gpa/shared";
import { PAGES, pageHead } from "@/lib/site";

import { HIGH_SCHOOL_FAQ } from "@/lib/seo-content";

const page = PAGES.highSchool;

export const Route = createFileRoute("/high-school-gpa-calculator")({
  head: () => pageHead(page),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <Breadcrumbs page={page} />
      <h1 className="text-[2rem] leading-tight sm:text-4xl">High School GPA Calculator</h1>
      <p className="mt-2 text-text-muted sm:text-lg">
        Enter your classes and mark each one Regular, Honors, AP, or IB. You'll see your unweighted and weighted GPA side by side.
      </p>
      <HighSchoolCalculator />
      <section className="mt-12" aria-labelledby="weighted">
        <h2 id="weighted" className="text-2xl">Weighted vs. unweighted GPA</h2>
        <p className="mt-2">
          An unweighted GPA treats every class the same. An A is 4.0 whether the class is regular or AP. A weighted GPA adds bonus points for harder classes, which is how it can go above 4.0.
        </p>
        <p className="mt-2">
          Schools choose their own bonuses. Adding 0.5 for Honors and 1.0 for AP or IB is common, but it isn't a rule. Your school profile or student handbook has the real numbers.
        </p>
      </section>
      <section className="mt-12" aria-labelledby="how">
        <h2 id="how" className="text-2xl">How we calculated this</h2>
        <p className="mt-2">
          For the unweighted GPA we use each grade's base points. For the weighted GPA we add the bonus to each Honors, AP, IB or dual enrollment class first. Then both are weighted by credits and divided by total credits.
        </p>
      </section>
      <section className="mt-12" aria-labelledby="how-to-calculate-a-weighted-gpa">
        <h2 id="how-to-calculate-a-weighted-gpa" className="text-2xl">How to calculate a weighted GPA</h2>
        <p className="mt-2">A weighted GPA adds bonus points for harder classes before averaging.</p>
        <ol className="mt-3 list-decimal space-y-2 pl-6">
          <li>Convert each grade to base points: A = 4, B = 3, C = 2, D = 1, F = 0.</li>
          <li>Add your school's bonus to each Honors, AP, IB or dual enrollment class. A common setup is +0.5 for Honors and +1.0 for AP and IB.</li>
          <li>Multiply each class's points by its credits.</li>
          <li>Add the results and divide by your total credits.</li>
        </ol>
        <p className="mt-2">For the unweighted GPA, skip step 2.</p>
      </section>
      <section className="mt-12" aria-labelledby="weighted-gpa-scale">
        <h2 id="weighted-gpa-scale" className="text-2xl">Weighted GPA scale</h2>
        <p className="mt-2">With the example bonuses this calculator starts with, the points work out like this. Your school's handbook has the real values.</p>
        <ContentTable caption="Weighted GPA scale" columns={["Grade", "Regular", "Honors (+0.5)", "AP or IB (+1.0)"]} rows={[["A", "4.0", "4.5", "5.0"], ["B", "3.0", "3.5", "4.0"], ["C", "2.0", "2.5", "3.0"]]} />
        <p className="mt-2">Many schools give no bonus for a D or an F. Turn on "No bonus for a D or F" if yours works that way.</p>
      </section>
      <section className="mt-12" aria-labelledby="example">
        <h2 id="example" className="text-2xl">Example: a regular A and an AP B</h2>
        <p className="mt-2">Unweighted: (4.0 + 3.0) ÷ 2 = 3.50.</p>
        <p className="mt-2">Weighted, with 1.0 added for AP: the B counts as 4.0, so (4.0 + 4.0) ÷ 2 = 4.00.</p>
        <LoadExampleButton />
      </section>
      <section className="mt-12" aria-labelledby="how-much-is-an-ap-class-worth-on-a-gpa">
        <h2 id="how-much-is-an-ap-class-worth-on-a-gpa" className="text-2xl">How much is an AP class worth on a GPA?</h2>
        <p className="mt-2">At schools that weight AP classes, an AP class usually adds 1.0 point, so an A in AP counts as 5.0 instead of 4.0. Honors classes often add 0.5. Some schools add less, cap the number of weighted classes, or don't weight at all. Set the bonus fields above to match your school and the weighted GPA updates.</p>
      </section>
      <section className="mt-12" aria-labelledby="colleges">
        <h2 id="colleges" className="text-2xl">Which number do colleges use?</h2>
        <p className="mt-2">
          Many colleges recalculate your GPA with their own rules, so the number on your transcript may not be the one an admissions office works from. Report the GPA your school prints, and use both numbers here to understand where you stand.
        </p>
      </section>
      <section className="mt-12" aria-labelledby="details">
        <h2 id="details" className="text-2xl">Details that change the result</h2>
        <div className="mt-2 space-y-3">
          <p>Some schools give no bonus for a D or F in a weighted class. Turn on "No bonus for a D or F" if yours does.</p>
          <p>If your classes have different credit values, enter them. A full-year class often carries twice the credit of a semester class.</p>
          <p>Plus and minus grades use the example scale unless you edit it.</p>
        </div>
      </section>
      <FaqSection items={HIGH_SCHOOL_FAQ} />
      <CalculatorFooter page={page} />
    </main>
  );
}
