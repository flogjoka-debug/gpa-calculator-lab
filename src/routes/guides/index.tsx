import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, LinkCardGrid } from "@/components/PageSeo";
import { GUIDE_LIST, GUIDES, PAGES, pageHead } from "@/lib/site";

const page = GUIDES.hub;

export const Route = createFileRoute("/guides/")({
  head: () => pageHead(page),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <Breadcrumbs page={page} />
      <h1 className="text-[2rem] leading-tight sm:text-4xl">{page.h1}</h1>
      <p className="mt-2 text-text-muted sm:text-lg">
        Plain answers to the GPA questions students ask most, with the math shown and a calculator for each one.
      </p>
      <h2 className="sr-only">All guides</h2>
      <div className="mt-6"><LinkCardGrid items={GUIDE_LIST} notes /></div>
      <p className="mt-10">Ready to run your own numbers? Start with the <Link to={PAGES.home.path}>GPA calculator</Link>.</p>
    </main>
  );
}
