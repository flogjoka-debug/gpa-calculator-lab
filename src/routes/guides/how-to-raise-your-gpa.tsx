import { createFileRoute } from "@tanstack/react-router";
import { GuideArticle } from "@/components/Guide";
import { GUIDE_CONTENT } from "@/lib/guides-content";
import body from "@/lib/guides/raise";
import { GUIDES, pageHead } from "@/lib/site";

const page = GUIDES.raise;

export const Route = createFileRoute("/guides/how-to-raise-your-gpa")({
  head: () => pageHead(page),
  component: () => <GuideArticle page={page} content={{ ...GUIDE_CONTENT.raise, ...body }} />,
});
