import { createFileRoute } from "@tanstack/react-router";
import { CumulativeCalculator } from "@/components/gpa/CumulativeCalculator";
import { LoadExampleButton } from "@/components/gpa/shared";
import { PAGES, pageHead } from "@/lib/site";

const page = PAGES.cumulative;

export const Route = createFileRoute("/cumulative-gpa-calculator")({
  head: () => pageHead(page),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <h1 className="text-[2rem] leading-tight sm:text-4xl">Cumulative GPA Calculator</h1>
      <p className="mt-2 text-text-muted sm:text-lg">
        Enter the GPA credits and quality points you already have, then add your new semester. You'll see your updated cumulative GPA and how far the new grades moved it.
      </p>
      <CumulativeCalculator />
      <section className="mt-12" aria-labelledby="how">
        <h2 id="how" className="text-2xl">How we calculated this</h2>
        <p className="mt-2">
          A cumulative GPA is total quality points divided by total GPA credits. We add the quality points you had to the new ones, add the credits the same way, and divide. Averaging two GPAs only works when both cover the same number of credits.
        </p>
      </section>
      <section className="mt-12" aria-labelledby="example">
        <h2 id="example" className="text-2xl">Example: 18 credits at 3.0, then 6 credits at 4.0</h2>
        <p className="mt-2">So far: 3.0 × 18 = 54 quality points. New semester: 4.0 × 6 = 24.</p>
        <p className="mt-2">Together: 78 ÷ 24 = 3.25.</p>
        <p className="mt-2">Averaging 3.0 and 4.0 would give 3.5. That's too high, because the first 18 credits weigh three times as much as the new 6.</p>
        <LoadExampleButton />
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
    </main>
  );
}
