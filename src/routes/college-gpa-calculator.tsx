import { Breadcrumbs, CalculatorFooter } from "@/components/PageSeo";
import { createFileRoute } from "@tanstack/react-router";
import { CollegeCalculator } from "@/components/gpa/CollegeCalculator";
import { LoadExampleButton } from "@/components/gpa/shared";
import { PAGES, pageHead } from "@/lib/site";

const page = PAGES.college;

export const Route = createFileRoute("/college-gpa-calculator")({
  head: () => pageHead(page),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <Breadcrumbs page={page} />
      <h1 className="text-[2rem] leading-tight sm:text-4xl">College GPA Calculator</h1>
      <p className="mt-2 text-text-muted sm:text-lg">
        Add your classes with credit hours and plus/minus grades. You'll see your semester GPA, the quality points behind it, and what a retake would change.
      </p>
      <CollegeCalculator />
      <section className="mt-12" aria-labelledby="how">
        <h2 id="how" className="text-2xl">How we calculated this</h2>
        <p className="mt-2">
          Each grade has a point value on your school's scale. We multiply it by the class's credit hours to get quality points, add up the quality points, and divide by the credit hours that count toward GPA. A 4-credit class moves your GPA more than a 1-credit lab with the same grade.
        </p>
      </section>
      <section className="mt-12" aria-labelledby="example">
        <h2 id="example" className="text-2xl">Example: retaking a class</h2>
        <p className="mt-2">
          You earned a D in a 3-credit class, then retook it and earned an A. The D is 1.0 × 3 = 3 quality points. The A is 4.0 × 3 = 12.
        </p>
        <p className="mt-2">If your college counts both attempts: 15 ÷ 6 = 2.50.</p>
        <p className="mt-2">If your college replaces the earlier attempt: 12 ÷ 3 = 4.00.</p>
        <LoadExampleButton />
      </section>
      <section className="mt-12" aria-labelledby="retake">
        <h2 id="retake" className="text-2xl">Does retaking a class replace the old grade?</h2>
        <p className="mt-2">
          It depends on your college. Some replace the earlier grade in your GPA, some count every attempt, and many limit how many classes you can repeat. The earlier grade usually stays on your transcript either way. Read your registrar's repeat policy, then choose the option that matches it.
        </p>
        <p className="mt-2">
          One more thing if you plan to apply to law school: LSAC counts every attempt that appears on your transcript with a grade and credits, whatever your college does.
        </p>
      </section>
      <section className="mt-12" aria-labelledby="semester">
        <h2 id="semester" className="text-2xl">Semester GPA and cumulative GPA</h2>
        <p className="mt-2">
          A semester GPA covers one term. A cumulative GPA covers every graded term, weighted by credits. Add more semesters here to see both, or bring in a total from your transcript with the cumulative calculator.
        </p>
      </section>
      <section className="mt-12" aria-labelledby="counts">
        <h2 id="counts" className="text-2xl">What counts toward a college GPA</h2>
        <div className="mt-2 space-y-3">
          <p>An F counts as zero points, and its credits stay in the total.</p>
          <p>P, NP and W are left out here because they usually carry no grade points. Some colleges count a WF as an F, so check before you trust the number.</p>
          <p>An A+ is worth 4.0 at many colleges and more at others. Edit the scale if yours differs.</p>
          <p>On the quarter system, enter quarter units as your credits. The math is the same.</p>
        </div>
      </section>
      <CalculatorFooter page={page} />
    </main>
  );
}
