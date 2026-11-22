import { PAGE_COPY } from "@/lib/page-copy";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { EXAMPLE_RESULT, GpaCalculator } from "@/components/gpa/GpaCalculator";
import { FormulaLine, LedgerTable } from "@/components/gpa/Ledger";
import type { GpaResult } from "@/lib/calc/gpa";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CalculatorFooter, Eyebrow, FaqSection } from "@/components/PageSeo";
import { iconFor } from "@/lib/icons";
import { HOME_FAQ, HOME_SCALE_ROWS } from "@/lib/seo-content";
import { PAGES, TOOL_GROUPS, pageHead } from "@/lib/site";

const page = PAGES.home;

export const Route = createFileRoute("/")({
  head: () => pageHead(page),
  component: Home,
});

function Home() {
  const [live, setLive] = useState<GpaResult | null>(null);
  const onResult = useCallback((r: GpaResult | null) => setLive(r), []);
  const shown = live ?? EXAMPLE_RESULT;

  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <Eyebrow path={page.path} />
      <h1 className="text-[2rem] leading-tight sm:text-4xl">GPA Calculator</h1>
      <p className="mt-2 text-text-muted sm:text-lg">
        Enter each grade and its credits. You'll get your GPA, your total quality points, and the credits that counted.
      </p>

      <GpaCalculator onResult={onResult} />
      <section className="mt-10" aria-labelledby="what-gpa-means">
        <h2 id="what-gpa-means" className="text-2xl">What GPA means</h2>
        <p className="mt-2">{PAGE_COPY.homeDefinition.lead}</p>
      </section>

      <section className="mt-12" aria-labelledby="how">
        <h2 id="how" className="text-2xl">How we calculated this</h2>
        <p className="mt-2">
          Every letter grade is worth a set number of grade points. We multiply those points by the class's credits to
          get quality points, add them up, and divide by the credits that count toward your GPA.
        </p>
        <div className="mt-4 card p-4">
          <LedgerTable result={shown} caption={live ? undefined : "Example"} />
          <div className="mt-3"><FormulaLine result={shown} /></div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="example">
        <h2 id="example" className="text-2xl">Example: an A and a B</h2>
        <p className="mt-2">
          An A in a 3-credit class is 4.0 × 3 = 12 quality points. A B in a 4-credit class is 3.0 × 4 = 12. That's 24
          quality points over 7 credits, and 24 ÷ 7 = 3.43.
        </p>
        <p className="mt-2">
          The answer isn't 3.5. The B carries more credits, so it pulls the GPA down more than the A lifts it.
        </p>
        <Button variant="outline"
          type="button"
          className="btn mt-4"
          onClick={() => {
            window.dispatchEvent(new Event("gpacl:load-example"));
          }}
        >
          Load this example
        </Button>
      </section>

      <section className="mt-12" aria-labelledby="by-hand">
        <h2 id="by-hand" className="text-2xl">How to calculate your GPA by hand</h2>
        <p className="mt-2">To calculate a GPA, turn each letter grade into grade points, multiply by the class's credits, and divide the total by the credits that count.</p>
        <ol className="mt-3 list-decimal space-y-2 pl-6">
          <li>Convert each grade to grade points. On the common 4.0 scale an A is 4.0, a B is 3.0, a C is 2.0, a D is 1.0 and an F is 0.</li>
          <li>Multiply each class's grade points by its credits. That gives the class's quality points.</li>
          <li>Add up the quality points for all your classes.</li>
          <li>Add up the credits of the classes that count toward GPA.</li>
          <li>Divide the quality points by the credits. The result is your GPA.</li>
        </ol>
        <p className="mt-3">With an A in a 3-credit class and a B in a 4-credit class, that's 12 + 12 = 24 quality points over 7 credits, so 24 ÷ 7 = 3.43.</p>
      </section>

      <section className="mt-12" aria-labelledby="gpa-scale">
        <h2 id="gpa-scale" className="text-2xl">GPA scale: letter grades, percentages and grade points</h2>
        <p className="mt-2">This is the scale the calculator starts with. Your school may use different cutoffs or point values, so treat it as an example and edit the scale above if yours differs.</p>
        <div className="mt-4 overflow-x-auto content-table">
          <table className="w-full min-w-[420px] text-left tabular">
            <caption className="sr-only">GPA scale: letter grades, percentages and grade points</caption>
            <thead className="border-b border-divider bg-background"><tr>
              <th scope="col" className="px-4 py-3">Letter grade</th>
              <th scope="col" className="px-4 py-3">Percentage</th>
              <th scope="col" className="px-4 py-3">Grade points</th>
            </tr></thead>
            <tbody>{HOME_SCALE_ROWS.map(([letter, percentage, points]) => <tr key={letter} className="border-b border-divider last:border-0">
              <td className="px-4 py-2">{letter}</td><td className="px-4 py-2">{percentage}</td><td className="px-4 py-2">{points}</td>
            </tr>)}</tbody>
          </table>
        </div>
        <p className="mt-3">Have a percentage and need the letter? <Link to="/percentage-to-letter-grade/">Convert a percentage to a letter grade</Link>.</p>
      </section>

      <section className="mt-12" aria-labelledby="without-credits">
        <h2 id="without-credits" className="text-2xl">GPA calculator without credits</h2>
        <p className="mt-2">Some report cards don't list credits. Turn on "All classes count equally" and every class gets the same weight. Your GPA is then the plain average of your grade points: an A, a B and a C give (4 + 3 + 2) ÷ 3 = 3.00.</p>
        <p className="mt-2">If your classes do carry different credits, leave the option off. A plain average gives a 1-credit elective the same pull as a 4-credit core class.</p>
      </section>

      <section className="mt-12" aria-labelledby="counts">
        <h2 id="counts" className="text-2xl">What counts and what doesn't</h2>
        <div className="mt-2 space-y-3">
          <p><strong>An F counts.</strong> It adds zero quality points, but its credits stay in the total. An A and an F at 3 credits each come to 12 ÷ 6 = 2.00.</p>
          <p><strong>P and W usually don't count.</strong> On most transcripts they add no grade points and no GPA credits. If your school records a failing withdrawal as WF, check how it's treated before you rely on this number.</p>
          <p><strong>Blank rows are skipped.</strong> A class with no grade stays out of the math until you fill it in.</p>
          <p><strong>The scale here is an example.</strong> Many schools use A− = 3.7 and B+ = 3.3. Others use 3.67 and 3.33, and some give an A+ more than 4.0. Edit the scale so it matches your transcript.</p>
          <p>If your report card has no credits, turn on "All classes count equally" and each class gets the same weight.</p>
        </div>
      </section>

      <FaqSection items={HOME_FAQ} />

      <section className="mt-12" aria-labelledby="picker">
        <h2 id="picker" className="text-2xl">Pick the calculator that fits</h2>
        <p className="mt-2">
          This page handles a quick GPA. The tools below handle the cases that need more: plus/minus scales and retakes,
          honors bonuses, a full transcript, a single class grade, or an admissions formula.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {TOOL_GROUPS.map((g) => (
            <nav key={g.label} aria-label={g.label} className="card p-4">
              <h3 className="text-sm tracking-wide text-text-muted uppercase">{g.label}</h3>
              <ul className="mt-2 space-y-1">
                {g.items.map((p) => {
                  const Icon = iconFor(p.path);
                  return (
                    <li key={p.path}>
                      <a href={p.path} className="picker-link"><span className="icon-chip icon-chip-sm" aria-hidden="true"><Icon /></span>{p.h1}</a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>
      </section>
      <CalculatorFooter page={page} />
    </main>
  );
}
