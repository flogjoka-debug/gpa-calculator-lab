import { createFileRoute } from "@tanstack/react-router";
import { SUPPORT, pageHead } from "@/lib/site";

const page = SUPPORT.contact;

export const Route = createFileRoute("/contact")({
  head: () => pageHead(page),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <h1 className="text-[2rem] leading-tight sm:text-4xl">Contact</h1>
      <p className="mt-3">Spotted a wrong result or a rule that's out of date? Email [OWNER EMAIL NEEDED] with the calculator name and the numbers you entered. Please don't send full transcripts or personal details.</p>
    </main>
  );
}
