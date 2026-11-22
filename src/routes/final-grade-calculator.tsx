import copyFinalIntro from "@/lib/copy/finalIntro";
import copyFinalMore from "@/lib/copy/finalMore";
import { CopyBlocks } from "@/components/Guide";
import copyFinal from "@/lib/copy/final";
import { Breadcrumbs, CalculatorFooter, FaqSection, ContentTable, UpdatedLine, PageToc } from "@/components/PageSeo";
import { createFileRoute } from "@tanstack/react-router";
import { FinalTool } from "@/components/gpa/FinalTool";
import { LoadExampleButton } from "@/components/gpa/shared";
import { PAGES, pageHead } from "@/lib/site";

import { FINAL_FAQ } from "@/lib/seo-content";

const page = PAGES.finalGrade;

const TOC: (readonly [string, string])[] = [
  ["what-grade-do-i-need-on-my-final", "What grade do I need on my final?"],
  ["how-to-use-the-final-grade-calculator", "How to use the final grade calculator"],
  ["how", "How we calculated this"],
  ["how-to-calculate-what-you-need-on-your-final", "How to calculate what you need on your final"],
  ["example", "Example: 85% now, aiming for 90%, final worth 40%"],
  ["final-exam-calculator-the-score-you-need-for-each-grade", "Final exam calculator: the score you need for each grade"],
  ["over", "What if I need more than 100%?"],
  ["before", "Is my current grade really \"before the final\"?"],
  ["how-the-final-s-weight-changes-the-score-you-need", "How the final's weight changes the score you need"],
  ["when-the-final-is-part-of-a-category", "When the final is part of a category"],
  ["when-the-final-replaces-your-lowest-test", "When the final replaces your lowest test"],
  ["can-i-still-get-an-a-b-or-c", "Can I still get an A, B or C?"],
  ["if-i-fail-the-final-what-will-my-grade-be", "If I fail the final, what will my grade be?"],
  ["how-much-does-the-final-exam-affect-your-grade", "How much does the final exam affect your grade?"],
  ["faq", "FAQ"],
];

export const Route = createFileRoute("/final-grade-calculator")({
  head: () => pageHead(page),
  component: Page,
});

function Page() {
  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <Breadcrumbs page={page} />
      <h1 className="text-[2rem] leading-tight sm:text-4xl">Final Grade Calculator</h1>
      <p className="mt-2 text-text-muted sm:text-lg">
        Enter your current grade, the grade you want, and how much the final counts. You'll see the score you need on the final and the highest grade you can still get.
      </p>
      <UpdatedLine page={page} />
      <FinalTool />
      <PageToc items={TOC} />
      <CopyBlocks blocks={copyFinalIntro} />
      <section className="mt-12" aria-labelledby="how">
        <h2 id="how" className="text-2xl">How we calculated this</h2>
        <p className="mt-2">"Current grade" means your grade before the final. If the final is worth w of your grade, everything else is worth 1 − w. The score you need is (target − current × (1 − w)) ÷ w. We round it up to one decimal, so the number we show is always enough.</p>
      </section>
      <section className="mt-12" aria-labelledby="how-to-calculate-what-you-need-on-your-final">
        <h2 id="how-to-calculate-what-you-need-on-your-final" className="text-2xl">How to calculate what you need on your final</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6">
          <li>Find your current grade, meaning your grade before the final.</li>
          <li>Find the final exam's weight in your syllabus and write it as a decimal (40% is 0.40).</li>
          <li>Multiply your current grade by 1 minus the weight. That's what the rest of the class contributes.</li>
          <li>Subtract that from the grade you want.</li>
          <li>Divide by the final's weight. The result is the score you need on the final.</li>
        </ol>
      </section>
      <section className="mt-12" aria-labelledby="example">
        <h2 id="example" className="text-2xl">Example: 85% now, aiming for 90%, final worth 40%</h2>
        <p className="mt-2">(90 − 85 × 0.60) ÷ 0.40 = (90 − 51) ÷ 0.40 = 97.5.</p>
        <p className="mt-2">You need 97.5% on the final. With a perfect 100% you'd finish with 91%.</p>
        <LoadExampleButton />
      </section>
      <section className="mt-12" aria-labelledby="final-exam-calculator-the-score-you-need-for-each-grade">
        <h2 id="final-exam-calculator-the-score-you-need-for-each-grade" className="text-2xl">Final exam calculator: the score you need for each grade</h2>
        <p className="mt-2">With an 85% current grade and a final worth 40%, here's what each target takes. The calculator above does the same for your own numbers.</p>
        <ContentTable caption="Final exam calculator: the score you need for each grade" columns={["Grade you want", "Score you need on the final"]} rows={[["A (90%)", "97.5%"], ["B (80%)", "72.5%"], ["C (70%)", "47.5%"], ["D (60%)", "22.5%"]]} />
        <p className="mt-2">A 0 on the final would leave this student with 51%.</p>
      </section>
      <section className="mt-12" aria-labelledby="over">
        <h2 id="over" className="text-2xl">What if I need more than 100%?</h2>
        <p className="mt-2">Then that target is out of reach, unless your teacher offers extra credit. Say you have 80%, want 90%, and the final is worth 20%. You'd need 130%. Even a perfect final only brings you to 80 × 0.80 + 20 = 84%. We show that highest possible grade, so you can pick a target you can still reach.</p>
      </section>
      <section className="mt-12" aria-labelledby="before">
        <h2 id="before" className="text-2xl">Is my current grade really "before the final"?</h2>
        <p className="mt-2">Most online gradebooks show your grade with the work that's been graded so far, which usually doesn't include the final. If your final is in the same category as your tests, your teacher may weight it differently. Check the syllabus before you rely on the number.</p>
      </section>
      <CopyBlocks blocks={copyFinal} />
      <CopyBlocks blocks={copyFinalMore} />
      <FaqSection items={FINAL_FAQ} />
      <CalculatorFooter page={page} />
    </main>
  );
}
