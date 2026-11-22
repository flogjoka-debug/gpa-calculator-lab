import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { EXAMPLE_RESULT, GpaCalculator } from "@/components/gpa/GpaCalculator";
import { FormulaLine, LedgerTable } from "@/components/gpa/Ledger";
import type { GpaResult } from "@/lib/calc/gpa";
import { PAGES, SITE_NAME, SITE_URL, TOOL_GROUPS, pageHead } from "@/lib/site";

const page = PAGES.home;

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead(page),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/` }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [live, setLive] = useState<GpaResult | null>(null);
  const onResult = useCallback((r: GpaResult | null) => setLive(r), []);
  const shown = live ?? EXAMPLE_RESULT;

  return (
    <main className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <h1 className="text-[2rem] leading-tight sm:text-4xl">GPA Calculator</h1>
      <p className="mt-2 text-text-muted sm:text-lg">
        Enter each grade and its credits. You'll get your GPA, your total quality points, and the credits that counted.
      </p>

      <GpaCalculator onResult={onResult} />

      <section className="mt-12" aria-labelledby="how">
        <h2 id="how" className="text-2xl">How we calculated this</h2>
        <p className="mt-2">
          Every letter grade is worth a set number of grade points. We multiply those points by the class's credits to
          get quality points, add them up, and divide by the credits that count toward your GPA.
        </p>
        <div className="mt-4 rounded-[14px] border border-divider bg-surface p-4">
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
        <button
          type="button"
          className="btn mt-4"
          onClick={() => {
            window.dispatchEvent(new Event("gpacl:load-example"));
          }}
        >
          Load this example
        </button>
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

      <section className="mt-12" aria-labelledby="picker">
        <h2 id="picker" className="text-2xl">Pick the calculator that fits</h2>
        <p className="mt-2">
          This page handles a quick GPA. The tools below handle the cases that need more: plus/minus scales and retakes,
          honors bonuses, a full transcript, a single class grade, or an admissions formula.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {TOOL_GROUPS.map((g) => (
            <nav key={g.label} aria-label={g.label} className="rounded-[14px] border border-divider bg-surface p-4">
              <h3 className="text-sm tracking-wide text-text-muted uppercase">{g.label}</h3>
              <ul className="mt-2 space-y-1">
                {g.items.map((p) => (
                  <li key={p.path}>
                    <a href={p.path} className="inline-flex min-h-11 items-center">{p.h1}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </section>
    </main>
  );
}
