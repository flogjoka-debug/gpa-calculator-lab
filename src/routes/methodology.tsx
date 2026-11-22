import { createFileRoute } from "@tanstack/react-router";
import { SUPPORT, pageHead } from "@/lib/site";

const page = SUPPORT.methodology;

export const Route = createFileRoute("/methodology")({
  head: () => pageHead(page),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <h1 className="text-[2rem] leading-tight sm:text-4xl">How our calculators work</h1>
      <p className="mt-3">This page lists the formula behind each calculator and the source for every outside rule. When a rule changes, we update the calculator and the date below.</p>
      <section className="mt-10" aria-labelledby="gpa">
        <h2 id="gpa" className="text-2xl">GPA, College GPA and Cumulative GPA</h2>
        <p className="mt-2">GPA = total quality points ÷ total GPA credits. Quality points are grade points × credits. F counts as 0 points with its credits included. P, NP and W are left out by default. The default 4.0 scale is an example and can be edited.</p>
      </section>
      <section className="mt-10" aria-labelledby="hs">
        <h2 id="hs" className="text-2xl">High School GPA</h2>
        <p className="mt-2">Unweighted uses base grade points. Weighted adds the bonus you set for Honors, AP, IB or dual enrollment classes before dividing by credits. The default bonuses are examples.</p>
      </section>
      <section className="mt-10" aria-labelledby="grades">
        <h2 id="grades" className="text-2xl">Grade, Semester Grade and Final Grade</h2>
        <p className="mt-2">Points: total earned ÷ total possible. Categories: each average × its weight, divided by the weight graded so far. Semester grade: each period grade × its weight. Final exam needed: (target − current × (1 − w)) ÷ w, rounded up to one decimal.</p>
      </section>
      <section className="mt-10" aria-labelledby="pct">
        <h2 id="pct" className="text-2xl">Percentage to Letter Grade</h2>
        <p className="mt-2">The letter comes from the exact percentage and the cutoffs of the scale you choose. Each letter runs from its cutoff up to, but not including, the next one.</p>
      </section>
      <section className="mt-10" aria-labelledby="uc">
        <h2 id="uc" className="text-2xl">UC GPA</h2>
        <p className="mt-2">Rules from UC Admissions, checked November 22, 2026: <a href="https://admission.universityofcalifornia.edu/admission-requirements/first-year-requirements/gpa-requirement.html" rel="noopener">UC GPA requirement</a>.</p>
      </section>
      <section className="mt-10" aria-labelledby="lsac">
        <h2 id="lsac" className="text-2xl">LSAC GPA</h2>
        <p className="mt-2">Rules from LSAC, checked November 22, 2026: <a href="https://www.lsac.org/applying-law-school/jd-application-process/cas/requesting/transcript-summarization" rel="noopener">Transcript summarization</a> and the <a href="https://www.lsac.org/blog/providing-more-time-adjust-lsac-gpa-changes" rel="noopener">dual enrollment announcement of August 18, 2026</a>.</p>
      </section>
    </main>
  );
}
