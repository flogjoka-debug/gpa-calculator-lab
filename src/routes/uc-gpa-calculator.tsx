import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/StubPage";
import { PAGES, stubHead } from "@/lib/site";

const page = PAGES.uc;

export const Route = createFileRoute("/uc-gpa-calculator")({
  head: () => stubHead(page.title, page.path, page.description),
  component: () => <StubPage h1={page.h1} />,
});
