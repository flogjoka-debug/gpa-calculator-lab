import { createFileRoute } from "@tanstack/react-router";
import { HomeCalculator } from "@/components/gpa/HomeCalculator";
import { SITE_URL } from "@/lib/site";

// Framable, noindex version of the homepage calculator for school websites (see /for-schools/).
export const Route = createFileRoute("/embed/gpa-calculator")({
  head: () => ({
    meta: [
      { title: "GPA Calculator – GPA Calculator Lab" },
      { name: "description", content: "Free GPA calculator by GPA Calculator Lab." },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Embed,
});

function Embed() {
  return (
    <main id="main" className="embed px-3 pb-4">
      <HomeCalculator />
      <p className="mt-4 text-center text-sm text-text-muted">
        <a href={`${SITE_URL}/`} target="_blank" rel="noopener">GPA Calculator</a> by GPA Calculator Lab ·{" "}
        <a href={`${SITE_URL}/privacy/`} target="_blank" rel="noopener">Privacy</a>
      </p>
    </main>
  );
}
