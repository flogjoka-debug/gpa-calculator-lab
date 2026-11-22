import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/StubPage";
import { PAGES, stubHead } from "@/lib/site";

const page = PAGES.law;

export const Route = createFileRoute("/law-school-gpa-calculator")({
  head: () => stubHead(page.title, page.path, page.description),
  component: () => <StubPage h1={page.h1} />,
});
