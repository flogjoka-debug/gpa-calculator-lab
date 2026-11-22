import { createFileRoute } from "@tanstack/react-router";
import { PercentageTool } from "@/components/gpa/PercentageTool";
import { LoadExampleButton } from "@/components/gpa/shared";
import { PAGES, toolHead } from "@/lib/site";

const page = PAGES.percentage;

export const Route = createFileRoute("/percentage-to-letter-grade")({
  head: () => toolHead(page, "percentage.png", "Percentage to letter grade calculator converting 89.99% to a B+"),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <h1 className="text-[2rem] leading-tight sm:text-4xl">Percentage to Letter Grade Calculator</h1>
      <p className="mt-2 text-text-muted sm:text-lg">
        Enter a percentage, or your points earned and possible, to get the letter grade, its range, and how far you are from the next one. Use the common scale or the cutoffs from your syllabus.
      </p>
      <PercentageTool />
      <section className="mt-12" aria-labelledby="a">
        <h2 id="a" className="text-2xl">Does 89.99% count as an A?</h2>
        <p className="mt-2">On the common scale, no. An A− starts at 90, so 89.99% is a B+. We don't round before looking up the letter, because many teachers don't either. If your syllabus says grades are rounded, or that an A− starts at 89.5, switch to Custom and enter that cutoff. Both the result and the table will follow your scale.</p>
      </section>
      <section className="mt-12" aria-labelledby="how">
        <h2 id="how" className="text-2xl">How we converted your percentage</h2>
        <p className="mt-2">We compare your exact percentage with the cutoffs of the scale you picked. Each letter covers everything from its own cutoff up to, but not including, the next one. So on the common scale a B+ is 87 to under 90, and 87.00 is already a B+.</p>
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
    </main>
  );
}
