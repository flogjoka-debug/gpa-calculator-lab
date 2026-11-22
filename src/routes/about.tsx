import { Breadcrumbs } from "@/components/PageSeo";
import { createFileRoute } from "@tanstack/react-router";
import { SUPPORT, pageHead } from "@/lib/site";

const page = SUPPORT.about;

export const Route = createFileRoute("/about")({
  head: () => pageHead(page),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <Breadcrumbs page={page} />
      <h1 className="text-[2rem] leading-tight sm:text-4xl">About GPA Calculator Lab</h1>
      <p className="mt-3">GPA Calculator Lab is a set of free calculators for US high school students, college students and applicants. Each one shows its math: which grades counted, which didn't, and why.</p>
      <p className="mt-3">The calculators run in your browser. You don't need an account, and your grades aren't sent to us.</p>
      <p className="mt-3">We built separate tools because the rules differ. A college GPA, a weighted high school GPA, a UC GPA and an LSAC GPA can all come from the same grades and still give different numbers.</p>
      <p className="mt-3">Every result here is an estimate. Your school's transcript, or the official calculation by UC or LSAC, is the number that counts.</p>
      <p className="mt-3">Found a mistake? <a href="/contact/">Tell us</a>, and include the numbers you entered.</p>
    </main>
  );
}
