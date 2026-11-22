import copyCumulativeIntro from "@/lib/copy/cumulativeIntro";
import copyCumulativeMore from "@/lib/copy/cumulativeMore";
import { CopyBlocks } from "@/components/Guide";
import copyCumulative from "@/lib/copy/cumulative";
import { Breadcrumbs, CalculatorFooter, FaqSection, UpdatedLine, EducatorsBanner, PageToc } from "@/components/PageSeo";
import { createFileRoute } from "@tanstack/react-router";
import { CumulativeCalculator } from "@/components/gpa/CumulativeCalculator";
import { LoadExampleButton } from "@/components/gpa/shared";
import { PAGES, pageHead } from "@/lib/site";

import { CUMULATIVE_FAQ } from "@/lib/seo-content";

const page = PAGES.cumulative;

const TOC: (readonly [string, string])[] = [
  ["how-to-use-the-cumulative-gpa-calculator", "How to use the cumulative GPA calculator"],
  ["what-is-a-cumulative-gpa", "What is a cumulative GPA?"],
  ["how", "How we calculated this"],
  ["how-to-calculate-cumulative-gpa", "How to calculate cumulative GPA"],
  ["example", "Example: 18 credits at 3.0, then 6 credits at 4.0"],
  ["how-much-can-one-semester-raise-your-gpa", "How much can one semester raise your GPA?"],
  ["where", "Where to find GPA credits on your transcript"],
  ["twice", "Don't count a semester twice"],
  ["the-example-as-a-table", "The example as a table"],
  ["how-a-semester-of-a-s-moves-your-cumulative-gpa", "How a semester of A's moves your cumulative GPA"],
  ["transfer-credits-and-your-cumulative-gpa", "Transfer credits and your cumulative GPA"],
  ["quarter-and-semester-units", "Quarter and semester units"],
  ["cumulative-gpa-from-semester-gpas", "Cumulative GPA from semester GPAs"],
  ["is-cumulative-gpa-weighted-or-unweighted", "Is cumulative GPA weighted or unweighted?"],
  ["mistakes-that-throw-off-a-cumulative-gpa", "Mistakes that throw off a cumulative GPA"],
  ["cgpa-and-cumulative-gpa", "CGPA and cumulative GPA"],
  ["how-to-plan-a-target-cumulative-gpa", "How to plan a target cumulative GPA"],
  ["cumulative-gpa-in-high-school", "Cumulative GPA in high school"],
  ["faq", "FAQ"],
];

export const Route = createFileRoute("/cumulative-gpa-calculator")({
  head: () => pageHead(page),
  component: Page,
});

function Page() {
  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <Breadcrumbs page={page} />
      <h1 className="text-[2rem] leading-tight sm:text-4xl">Cumulative GPA Calculator</h1>
      <p className="mt-2 text-text-muted sm:text-lg">
        Start this cumulative GPA calculator with the GPA credits and quality points you already have, then add your new semester. You'll see your updated cumulative GPA and how far the new grades moved it.
      </p>
      <UpdatedLine page={page} />
      <CumulativeCalculator />
      <EducatorsBanner />
      <PageToc items={TOC} />
      <CopyBlocks blocks={copyCumulativeIntro} />
      <section className="mt-12" aria-labelledby="what-is-a-cumulative-gpa">
        <h2 id="what-is-a-cumulative-gpa" className="text-2xl">What is a cumulative GPA?</h2>
        <p className="mt-2">Your cumulative GPA is the average of every graded class you've taken at a school, weighted by credits. A semester GPA covers one term; the cumulative GPA covers all of them together.</p>
      </section>
      <section className="mt-12" aria-labelledby="how">
        <h2 id="how" className="text-2xl">How we calculated this</h2>
        <p className="mt-2">
          A cumulative GPA is total quality points divided by total GPA credits. We add the quality points you had to the new ones, add the credits the same way, and divide. Averaging two GPAs only works when both cover the same number of credits.
        </p>
      </section>
      <section className="mt-12" aria-labelledby="how-to-calculate-cumulative-gpa">
        <h2 id="how-to-calculate-cumulative-gpa" className="text-2xl">How to calculate cumulative GPA</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6">
          <li>Find the GPA credits and quality points you have so far on your transcript. If it only shows your GPA, multiply that GPA by your GPA credits to estimate the quality points.</li>
          <li>Work out the quality points for your new semester: grade points × credits for each class, added up.</li>
          <li>Add the old and new quality points together.</li>
          <li>Add the old and new GPA credits together.</li>
          <li>Divide total quality points by total GPA credits.</li>
        </ol>
      </section>
      <section className="mt-12" aria-labelledby="example">
        <h2 id="example" className="text-2xl">Example: 18 credits at 3.0, then 6 credits at 4.0</h2>
        <p className="mt-2">So far: 3.0 × 18 = 54 quality points. New semester: 4.0 × 6 = 24.</p>
        <p className="mt-2">Together: 78 ÷ 24 = 3.25.</p>
        <p className="mt-2">Averaging 3.0 and 4.0 would give 3.5. That's too high, because the first 18 credits weigh three times as much as the new 6.</p>
        <LoadExampleButton />
      </section>
      <section className="mt-12" aria-labelledby="how-much-can-one-semester-raise-your-gpa">
        <h2 id="how-much-can-one-semester-raise-your-gpa" className="text-2xl">How much can one semester raise your GPA?</h2>
        <p className="mt-2">It depends on how many credits you already have. Say you have a 3.0 over 60 credits and earn straight A's in 15 credits. That's 3.0 × 60 = 180 quality points plus 4.0 × 15 = 60, so (180 + 60) ÷ 75 = 3.20. The same semester after only 15 earlier credits would move you much further. The more credits behind you, the slower your GPA changes.</p>
      </section>
      <section className="mt-12" aria-labelledby="where">
        <h2 id="where" className="text-2xl">Where to find GPA credits on your transcript</h2>
        <p className="mt-2">
          Look for "GPA hours", "GPA credits" or "quality hours". That's the number of credits that carry a letter grade. It can be lower than "earned hours", which may also include pass/fail and transfer credit. Use the GPA number.
        </p>
        <p className="mt-2">If your transcript lists quality points, enter them. You'll get an exact result instead of an estimate.</p>
      </section>
      <section className="mt-12" aria-labelledby="twice">
        <h2 id="twice" className="text-2xl">Don't count a semester twice</h2>
        <p className="mt-2">If a semester is already part of the GPA and credits you entered, leave it out of the new semesters.</p>
      </section>
      <CopyBlocks blocks={copyCumulative} />
      <CopyBlocks blocks={copyCumulativeMore} />
      <FaqSection items={CUMULATIVE_FAQ} />
      <CalculatorFooter page={page} />
    </main>
  );
}
