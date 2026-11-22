import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/StubPage";
import { SUPPORT, stubHead } from "@/lib/site";

const page = SUPPORT.privacy;

export const Route = createFileRoute("/privacy")({
  head: () => stubHead(page.h1, page.path),
  component: () => <StubPage h1={page.h1} />,
});
