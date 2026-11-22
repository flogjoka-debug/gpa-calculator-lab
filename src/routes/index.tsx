import copyHomeDefinition from "@/lib/copy/homeDefinition";
import copyHomeGood from "@/lib/copy/homeGood";
import copyHomeHowto from "@/lib/copy/homeHowto";
import copyHomeOfficial from "@/lib/copy/homeOfficial";
import copyHomeWeighted from "@/lib/copy/homeWeighted";
import copyHomeTarget from "@/lib/copy/homeTarget";
import copyHomeTerms from "@/lib/copy/homeTerms";
import copyHomeTranscript from "@/lib/copy/homeTranscript";
import { PAGE_META } from "@/lib/page-meta";
import { CopyBlocks } from "@/components/Guide";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { EXAMPLE_RESULT } from "@/components/gpa/GpaCalculator";
import { HomeCalculator } from "@/components/gpa/HomeCalculator";
import { FormulaLine, LedgerTable } from "@/components/gpa/Ledger";
import type { GpaResult } from "@/lib/calc/gpa";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CalculatorFooter, ContentTable, Eyebrow, FaqSection, UpdatedLine, EducatorsBanner } from "@/components/PageSeo";
import type { GuideBlock } from "@/lib/guides-content";
import { iconFor } from "@/lib/icons";
import { HOME_FAQ } from "@/lib/seo-content";
import { PAGES, TOOL_GROUPS, pageHead } from "@/lib/site";

const page = PAGES.home;

export const Route = createFileRoute("/")({
  head: () => pageHead(page),
  component: Home,
});

const fig = (name: string, alt: string, caption: string): GuideBlock[] => [
  { t: "img", src: `/guides/${name}.webp`, alt, caption, width: 1200, height: 675 },
];

const TOC: [string, string][] = [
  ["what-gpa-means", "What GPA means"],
  ["how-to-use-the-gpa-calculator", "How to use the calculator"],
  ["example", "Example: an A and a B"],
  ["by-hand", "Calculate your GPA by hand"],
  ["semester-vs-cumulative-gpa", "Semester vs. cumulative GPA"],
  ["how-the-target-gpa-planner-works", "The target GPA planner"],
  ["weighted-vs-unweighted-gpa", "Weighted vs. unweighted GPA"],
  ["gpa-scale", "The grade scale"],
  ["counts", "What counts and what doesn't"],
  ["why-your-result-might-not-match-your-transcript", "If your transcript differs"],
  ["how-to-find-your-official-gpa", "Find your official GPA"],
  ["faq", "FAQ"],
];

function Home() {
  const [live, setLive] = useState<GpaResult | null>(null);
  const onResult = useCallback((r: GpaResult | null) => setLive(r), []);
  const shown = live ?? EXAMPLE_RESULT;

  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <Eyebrow path={page.path} />
      <h1 className="text-[2rem] leading-tight sm:text-4xl">GPA Calculator</h1>
      <p className="mt-2 text-text-muted sm:text-lg">
        Enter each grade and its credits for one term or several. Add your GPA so far for a cumulative GPA, or switch to high school for weighted and unweighted GPA.
      </p>
      <UpdatedLine page={page} />

      <HomeCalculator onResult={onResult} />
      <EducatorsBanner />
      <nav aria-labelledby="toc-title" className="mt-8 card p-4 sm:p-5">
        <h2 id="toc-title" className="text-sm tracking-wide text-text-muted uppercase">On this page</h2>
        <ol className="mt-2 grid gap-x-6 gap-y-1 sm:grid-cols-2">
          {TOC.map(([id, label]) => (
            <li key={id}><a href={`#${id}`} className="picker-link">{label}</a></li>
          ))}
        </ol>
      </nav>
      <section className="mt-10" aria-labelledby="what-gpa-means">
        <h2 id="what-gpa-means" className="text-2xl">What GPA means</h2>
        <p className="mt-2">{PAGE_META.homeDefinition.lead}</p>
      </section>

      <CopyBlocks blocks={copyHomeHowto} />

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
        <CopyBlocks blocks={fig("home-credits-weight", "Diagram of seven credit squares, three for an A worth 4.0 and four for a B worth 3.0, showing a plain average of 3.50 but a credit-weighted GPA of 3.43", "Each credit counts once, so the 4-credit B outweighs the 3-credit A.")} />
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

      <CopyBlocks blocks={copyHomeTerms} />
      <CopyBlocks blocks={fig("home-cumulative-weight", "Bar chart comparing 45 earlier credits at a 2.80 GPA with two new terms of 6 and 4 credits at 3.00, which give a cumulative GPA of 2.84", "Earlier credits are most of the total, so new terms move a cumulative GPA slowly.")} />
      <CopyBlocks blocks={copyHomeTarget} />
      <CopyBlocks blocks={copyHomeWeighted} />

      <section className="mt-12" aria-labelledby="gpa-scale">
        <h2 id="gpa-scale" className="text-2xl">The grade scale this calculator uses</h2>
        <p className="mt-2">The calculator starts with the common 4.0 scale: A = 4.0, A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7, C+ = 2.3, C = 2.0, C− = 1.7, D+ = 1.3, D = 1.0, D− = 0.7 and F = 0. Your school may use other values, so edit the grade scale above if yours differs.</p>
        <p className="mt-2">For the percentage range behind each letter, see the full chart in <Link to="/guides/gpa-scale/">the 4.0 GPA scale guide</Link>, or <Link to="/percentage-to-letter-grade/">convert a percentage to a letter grade</Link>.</p>
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
        <ContentTable caption="Example: what counts toward GPA" columns={["Grade", "Credits", "Counts toward GPA?", "Quality points"]} rows={[["A", "3", "Yes", "4.0 × 3 = 12"], ["F", "3", "Yes", "0 × 3 = 0"], ["P", "3", "No", "—"], ["W", "3", "No", "—"], ["GPA", "6 counted", "", "12 ÷ 6 = 2.00"]]} />
        <CopyBlocks blocks={fig("home-what-counts", "Four 3-credit classes: an A and an F counted toward GPA, a Pass and a Withdrawal not counted, giving 12 quality points over 6 credits for a 2.00 GPA", "The F counts and pulls the GPA down; P and W stay out of both totals.")} />
      </section>

      <CopyBlocks blocks={copyHomeTranscript} />
      <CopyBlocks blocks={copyHomeOfficial} />
      <CopyBlocks blocks={copyHomeGood} />

      <FaqSection items={HOME_FAQ} />

      <section className="mt-12" aria-labelledby="picker">
        <h2 id="picker" className="text-2xl">Pick the calculator that fits</h2>
        <p className="mt-2">
          This page covers most GPAs. The tools below handle the cases that need more: A+ grades and retakes, exact
          transcript quality points, a single class grade, or an admissions formula.
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
