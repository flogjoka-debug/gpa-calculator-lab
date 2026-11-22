import { createFileRoute } from "@tanstack/react-router";
import { SUPPORT, pageHead } from "@/lib/site";

const page = SUPPORT.privacy;

export const Route = createFileRoute("/privacy")({
  head: () => pageHead(page),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <h1 className="text-[2rem] leading-tight sm:text-4xl">Privacy</h1>
      <p className="mt-3">The calculators work entirely in your browser. The grades, classes and credits you type aren't sent to our servers.</p>
      <p className="mt-3">Nothing is saved unless you click "Save on this device". That stores your entries in this browser only. "Clear saved data" removes them. Clearing your browser data removes them too.</p>
      <p className="mt-3">When you click a link such as "use this grade to plan your final", we keep just that one percentage in your browser so the next page can fill it in. It's deleted after it's used or after 30 minutes.</p>
      <p className="mt-3">We don't put your grades in page addresses, and we don't send them to analytics.</p>
      <p className="mt-3">Questions about privacy? <a href="/contact/">Contact us</a>.</p>
    </main>
  );
}
