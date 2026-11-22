import { createFileRoute } from "@tanstack/react-router";
import { FinalTool } from "@/components/gpa/FinalTool";
import { LoadExampleButton } from "@/components/gpa/shared";
import { PAGES, pageHead } from "@/lib/site";

const page = PAGES.finalGrade;

export const Route = createFileRoute("/final-grade-calculator")({
  head: () => pageHead(page),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <h1 className="text-[2rem] leading-tight sm:text-4xl">Final Grade Calculator</h1>
      <p className="mt-2 text-text-muted sm:text-lg">
        Enter your current grade, the grade you want, and how much the final counts. You'll see the score you need on the final and the highest grade you can still get.
      </p>
      <FinalTool />
      <section className="mt-12" aria-labelledby="how">
        <h2 id="how" className="text-2xl">How we calculated this</h2>
        <p className="mt-2">"Current grade" means your grade before the final. If the final is worth w of your grade, everything else is worth 1 − w. The score you need is (target − current × (1 − w)) ÷ w. We round it up to one decimal, so the number we show is always enough.</p>
      </section>
      <section className="mt-12" aria-labelledby="example">
        <h2 id="example" className="text-2xl">Example: 85% now, aiming for 90%, final worth 40%</h2>
        <p className="mt-2">(90 − 85 × 0.60) ÷ 0.40 = (90 − 51) ÷ 0.40 = 97.5.</p>
        <p className="mt-2">You need 97.5% on the final. With a perfect 100% you'd finish with 91%.</p>
        <LoadExampleButton />
      </section>
      <section className="mt-12" aria-labelledby="over">
        <h2 id="over" className="text-2xl">What if I need more than 100%?</h2>
        <p className="mt-2">Then that target is out of reach, unless your teacher offers extra credit. Say you have 80%, want 90%, and the final is worth 20%. You'd need 130%. Even a perfect final only brings you to 80 × 0.80 + 20 = 84%. We show that highest possible grade, so you can pick a target you can still reach.</p>
      </section>
      <section className="mt-12" aria-labelledby="before">
        <h2 id="before" className="text-2xl">Is my current grade really "before the final"?</h2>
        <p className="mt-2">Most online gradebooks show your grade with the work that's been graded so far, which usually doesn't include the final. If your final is in the same category as your tests, your teacher may weight it differently. Check the syllabus before you rely on the number.</p>
      </section>
    </main>
  );
}
