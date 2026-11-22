import { createFileRoute } from "@tanstack/react-router";
import { LawCalculator } from "@/components/gpa/LawCalculator";
import { LoadExampleButton } from "@/components/gpa/shared";
import { PAGES, toolHead } from "@/lib/site";

const page = PAGES.law;

export const Route = createFileRoute("/law-school-gpa-calculator")({
  head: () => toolHead(page, "law.png", "Law school GPA calculator showing a 3.50 LSAC GPA for the 2026–2027 cycle"),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <h1 className="text-[2rem] leading-tight sm:text-4xl">Law School GPA Calculator</h1>
      <p className="mt-2 text-text-muted sm:text-lg">
        Choose your application cycle, then enter your undergraduate grades. You'll see an estimate of your LSAC GPA, the GPA law schools see on your CAS report, with every included and excluded class listed.
      </p>
      <LawCalculator />
      <section className="mt-12" aria-labelledby="already">
        <h2 id="already" className="text-2xl">Already in law school?</h2>
        <p className="mt-2">Your law school grades don't count toward the LSAC GPA. Law schools set their own grading scales, often with a curve, so this calculator won't match your JD GPA. Your school's registrar or student handbook explains how it's calculated.</p>
      </section>
      <section className="mt-12" aria-labelledby="how">
        <h2 id="how" className="text-2xl">How LSAC calculates your GPA</h2>
        <p className="mt-2">LSAC converts every graded undergraduate class to its own 4.33 scale: A+ is 4.33, A is 4.00 and A− is 3.67. It counts every attempt at a repeated class that shows a grade and credits, even if your college replaced the old grade. Quarter hours are converted to semester hours by multiplying by 0.67. Work after your first bachelor's degree is left out.</p>
      </section>
      <section className="mt-12" aria-labelledby="dual">
        <h2 id="dual" className="text-2xl">Dual enrollment and your application cycle</h2>
        <p className="mt-2">In the 2026–2027 cycle, grades from college courses you took while in high school are part of your LSAC GPA. Starting with the 2027–2028 cycle, LSAC leaves them out for every applicant, including people who applied before. Law schools still see those transcripts in your CAS report.</p>
      </section>
      <section className="mt-12" aria-labelledby="example">
        <h2 id="example" className="text-2xl">Example: one class from high school</h2>
        <p className="mt-2">An A in a 3-credit undergraduate class and a B in a 3-credit class taken through dual enrollment.</p>
        <p className="mt-2">2026–2027 cycle: (4.00 × 3 + 3.00 × 3) ÷ 6 = 21 ÷ 6 = 3.50.</p>
        <p className="mt-2">2027–2028 cycle: the B is left out, so 12 ÷ 3 = 4.00.</p>
        <LoadExampleButton />
      </section>
      <section className="mt-12" aria-labelledby="left-out">
        <h2 id="left-out" className="text-2xl">What LSAC leaves out</h2>
        <p className="mt-2">Withdrawals and incompletes your school doesn't treat as failing, passing grades in pass/fail classes, remedial classes, AP test credit, and anything after your first bachelor's degree. A failing grade counts as 0.00, and so does a withdrawal your school treats as failing.</p>
      </section>
    </main>
  );
}
