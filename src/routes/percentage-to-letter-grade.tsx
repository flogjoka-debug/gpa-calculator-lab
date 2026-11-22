import copyPercentageIntro from "@/lib/copy/percentageIntro";
import copyPercentageMore from "@/lib/copy/percentageMore";
import { CopyBlocks } from "@/components/Guide";
import copyPercentage from "@/lib/copy/percentage";
import { Breadcrumbs, CalculatorFooter, FaqSection, ContentTable, UpdatedLine, PageToc } from "@/components/PageSeo";
import { createFileRoute } from "@tanstack/react-router";
import { PercentageTool } from "@/components/gpa/PercentageTool";
import { LoadExampleButton } from "@/components/gpa/shared";
import { PAGES, pageHead } from "@/lib/site";

import { PERCENTAGE_FAQ } from "@/lib/seo-content";

const page = PAGES.percentage;

const TOC: (readonly [string, string])[] = [
  ["how-to-use-the-percentage-to-letter-grade-calculator", "How to use the percentage to letter grade calculator"],
  ["a", "Does 89.99% count as an A?"],
  ["letter-grade-percentage-chart", "Letter grade percentage chart"],
  ["how", "How we converted your percentage"],
  ["how-to-turn-points-into-a-percentage", "How to turn points into a percentage"],
  ["example", "Example: 42 out of 50"],
  ["scales", "Common scale vs. 10-point scale"],
  ["does-89-5-round-up-to-an-a", "Does 89.5% round up to an A?"],
  ["letter-grade-cutoffs-vary-by-school", "Letter grade cutoffs vary by school"],
  ["from-letter-grade-to-gpa", "From letter grade to GPA"],
  ["common-test-scores-as-percentages-and-letters", "Common test scores as percentages and letters"],
  ["how-plus-and-minus-grades-work", "How plus and minus grades work"],
  ["from-a-score-to-a-letter-to-gpa-points", "From a score to a letter to GPA points"],
  ["why-your-teacher-s-letter-might-differ", "Why your teacher's letter might differ"],
  ["faq", "FAQ"],
];

export const Route = createFileRoute("/percentage-to-letter-grade")({
  head: () => pageHead(page),
  component: Page,
});

function Page() {
  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <Breadcrumbs page={page} />
      <h1 className="text-[2rem] leading-tight sm:text-4xl">Percentage to Letter Grade Calculator</h1>
      <p className="mt-2 text-text-muted sm:text-lg">
        Enter a percentage, or your points earned and possible, to get the letter grade, its range, and how far you are from the next one. Use the common scale or the cutoffs from your syllabus.
      </p>
      <UpdatedLine page={page} />
      <PercentageTool />
      <PageToc items={TOC} />
      <CopyBlocks blocks={copyPercentageIntro} />
      <section className="mt-12" aria-labelledby="a">
        <h2 id="a" className="text-2xl">Does 89.99% count as an A?</h2>
        <p className="mt-2">On the common scale, no. An A− starts at 90, so 89.99% is a B+. We don't round before looking up the letter, because many teachers don't either. If your syllabus says grades are rounded, or that an A− starts at 89.5, switch to Custom and enter that cutoff. Both the result and the table will follow your scale.</p>
      </section>
      <section className="mt-12" aria-labelledby="letter-grade-percentage-chart">
        <h2 id="letter-grade-percentage-chart" className="text-2xl">Letter grade percentage chart</h2>
        <p className="mt-2">The common US scale below is what the calculator starts with. The full table under the calculator follows whichever scale you pick, including your own cutoffs.</p>
        <ContentTable caption="Letter grade percentage chart" columns={["Letter grade", "Percentage", "GPA points"]} rows={[["A", "93 to 100", "4.0"], ["A−", "90 to under 93", "3.7"], ["B+", "87 to under 90", "3.3"], ["B", "83 to under 87", "3.0"], ["B−", "80 to under 83", "2.7"], ["C+", "77 to under 80", "2.3"], ["C", "73 to under 77", "2.0"], ["C−", "70 to under 73", "1.7"], ["D+", "67 to under 70", "1.3"], ["D", "63 to under 67", "1.0"], ["D−", "60 to under 63", "0.7"], ["F", "below 60", "0.0"]]} />
      </section>
      <section className="mt-12" aria-labelledby="how">
        <h2 id="how" className="text-2xl">How we converted your percentage</h2>
        <p className="mt-2">We compare your exact percentage with the cutoffs of the scale you picked. Each letter covers everything from its own cutoff up to, but not including, the next one. So on the common scale a B+ is 87 to under 90, and 87.00 is already a B+.</p>
      </section>
      <section className="mt-12" aria-labelledby="how-to-turn-points-into-a-percentage">
        <h2 id="how-to-turn-points-into-a-percentage" className="text-2xl">How to turn points into a percentage</h2>
        <p className="mt-2">Divide the points you earned by the points possible, then multiply by 100. 42 out of 50 is 42 ÷ 50 = 0.84, or 84%. Switch the calculator to points and it does this step for you.</p>
      </section>
      <section className="mt-12" aria-labelledby="example">
        <h2 id="example" className="text-2xl">Example: 42 out of 50</h2>
        <p className="mt-2">42 ÷ 50 = 0.84, which is 84%. On the common scale that's a B, because a B runs from 83 to under 87. A B+ starts at 87%, which on this test means 43.5 out of 50.</p>
        <LoadExampleButton />
      </section>
      <section className="mt-12" aria-labelledby="scales">
        <h2 id="scales" className="text-2xl">Common scale vs. 10-point scale</h2>
        <p className="mt-2">Many US schools split each letter into plus, plain and minus, with an A at 93 and above. Others use a straight 10-point scale where 90 to 100 is an A and there are no pluses or minuses. Your syllabus decides. The scale you choose here controls both the table and the result.</p>
      </section>
      <CopyBlocks blocks={copyPercentage} />
      <CopyBlocks blocks={copyPercentageMore} />
      <FaqSection items={PERCENTAGE_FAQ} />
      <CalculatorFooter page={page} />
    </main>
  );
}
