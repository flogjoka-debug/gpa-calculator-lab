import copyUcIntro from "@/lib/copy/ucIntro";
import copyUcMore from "@/lib/copy/ucMore";
import { CopyBlocks } from "@/components/Guide";
import copyUc from "@/lib/copy/uc";
import { Breadcrumbs, CalculatorFooter, FaqSection, UpdatedLine, PageToc } from "@/components/PageSeo";
import { createFileRoute } from "@tanstack/react-router";
import { UcCalculator } from "@/components/gpa/UcCalculator";
import { LoadExampleButton } from "@/components/gpa/shared";
import { PAGES, pageHead } from "@/lib/site";

import { UC_FAQ } from "@/lib/seo-content";

const page = PAGES.uc;

const TOC: (readonly [string, string])[] = [
  ["how-to-use-the-uc-gpa-calculator", "How to use the UC GPA calculator"],
  ["how", "How UC calculates your GPA"],
  ["how-to-calculate-your-uc-gpa-step-by-step", "How to calculate your UC GPA step by step"],
  ["example", "Example: 12 A's, all honors"],
  ["honors", "Which classes earn honors points"],
  ["minimum-gpa-for-the-university-of-california", "Minimum GPA for the University of California"],
  ["official", "Why this isn't your official UC GPA"],
  ["uc-gpa-rules-at-a-glance", "UC GPA rules at a glance"],
  ["example-a-full-10th-and-11th-grade-transcript", "Example: a full 10th and 11th grade transcript"],
  ["why-your-school-gpa-and-your-uc-gpa-differ", "Why your school GPA and your UC GPA differ"],
  ["report-your-grades-exactly-as-they-appear", "Report your grades exactly as they appear"],
  ["faq", "FAQ"],
];

export const Route = createFileRoute("/uc-gpa-calculator")({
  head: () => pageHead(page),
  component: Page,
});

function Page() {
  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <Breadcrumbs page={page} />
      <h1 className="text-[2rem] leading-tight sm:text-4xl">UC GPA Calculator</h1>
      <p className="mt-2 text-text-muted sm:text-lg">
        Enter your A-G semester grades from 10th and 11th grade and pick your residency. You'll get your unweighted and capped UC GPA, plus a list of which honors points counted and why.
      </p>
      <UpdatedLine page={page} />
      <UcCalculator />
      <PageToc items={TOC} />
      <CopyBlocks blocks={copyUcIntro} />
      <section className="mt-12" aria-labelledby="how">
        <h2 id="how" className="text-2xl">How UC calculates your GPA</h2>
        <p className="mt-2">
          UC uses only A-G courses taken from the summer after 9th grade through the summer after 11th grade. Each semester grade is worth A = 4, B = 3, C = 2 and D = 1, and pluses and minuses are dropped. Then UC adds one extra point for each semester of an approved honors course with an A, B or C, up to 8 points in total and no more than 4 from 10th grade. UC doesn't round the result, so we don't either.
        </p>
      </section>
      <section className="mt-12" aria-labelledby="how-to-calculate-your-uc-gpa-step-by-step">
        <h2 id="how-to-calculate-your-uc-gpa-step-by-step" className="text-2xl">How to calculate your UC GPA step by step</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6">
          <li>List every A-G course you took from the summer after 9th grade through the summer after 11th grade, one row per semester.</li>
          <li>Give each semester grade its points: A = 4, B = 3, C = 2, D = 1. Drop pluses and minuses.</li>
          <li>Add one honors point for each semester of a UC-approved honors course with an A, B or C. Stop at 8 points in total, and count no more than 4 from 10th grade.</li>
          <li>Add the grade points and honors points, then divide by the number of semester grades. Don't round the result.</li>
        </ol>
      </section>
      <section className="mt-12" aria-labelledby="example">
        <h2 id="example" className="text-2xl">Example: 12 A's, all honors</h2>
        <p className="mt-2">A California resident has six honors A's in 10th grade and six in 11th. The 12 grades add up to 48 points, so the unweighted GPA is 48 ÷ 12 = 4.00.</p>
        <p className="mt-2">All 12 classes could earn an honors point, but only 8 count. Four come from 10th grade, the most UC allows, and four from 11th. The capped GPA is 56 ÷ 12 = 4.66.</p>
        <p className="mt-2">If the same student had only the six 10th-grade A's, just 4 honors points would count.</p>
        <LoadExampleButton />
      </section>
      <section className="mt-12" aria-labelledby="honors">
        <h2 id="honors" className="text-2xl">Which classes earn honors points</h2>
        <p className="mt-2">For California residents: AP, IB Higher Level, designated IB Standard Level, UC-transferable college courses, and honors courses certified by UC on your school's course list.</p>
        <p className="mt-2">For nonresidents: only AP and IB courses, with an A, B or C. School-designated honors classes don't earn UC honors points, though they can still be considered in the rest of your application.</p>
        <p className="mt-2">Your school weights classes its own way. You can <a href="/high-school-gpa-calculator/">compare your school's weighted GPA</a> with this one.</p>
      </section>
      <section className="mt-12" aria-labelledby="minimum-gpa-for-the-university-of-california">
        <h2 id="minimum-gpa-for-the-university-of-california" className="text-2xl">Minimum GPA for the University of California</h2>
        <p className="mt-2">California residents need at least a 3.0 GPA in A-G courses, and nonresidents need at least a 3.4. UC calculates the GPA you're measured against from the grades you report on your application. Source: <a href="https://admission.universityofcalifornia.edu/admission-requirements/first-year-requirements/gpa-requirement.html" rel="noopener">UC Admissions: GPA requirement</a>.</p>
      </section>
      <section className="mt-12" aria-labelledby="official">
        <h2 id="official" className="text-2xl">Why this isn't your official UC GPA</h2>
        <p className="mt-2">UC calculates the official number from the grades you report in your application. Use this result to check your math and to see which honors points are being cut by the limits.</p>
      </section>
      <CopyBlocks blocks={copyUc} />
      <CopyBlocks blocks={copyUcMore} />
      <FaqSection items={UC_FAQ} />
      <CalculatorFooter page={page} />
    </main>
  );
}
