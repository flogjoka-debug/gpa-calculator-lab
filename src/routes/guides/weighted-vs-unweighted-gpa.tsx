import { createFileRoute } from "@tanstack/react-router";
import { GuideArticle } from "@/components/Guide";
import { GUIDE_CONTENT } from "@/lib/guides-content";
import { GUIDES, pageHead } from "@/lib/site";

const page = GUIDES.weighted;

export const Route = createFileRoute("/guides/weighted-vs-unweighted-gpa")({
  head: () => pageHead(page),
  component: () => <GuideArticle page={page} content={GUIDE_CONTENT.weighted} />,
});
