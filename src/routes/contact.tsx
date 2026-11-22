import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/StubPage";
import { SUPPORT, stubHead } from "@/lib/site";

const page = SUPPORT.contact;

export const Route = createFileRoute("/contact")({
  head: () => stubHead(page.title, page.path),
  component: () => <StubPage h1={page.h1} />,
});
