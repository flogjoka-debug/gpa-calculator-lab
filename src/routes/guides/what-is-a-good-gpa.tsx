import { createFileRoute } from "@tanstack/react-router";
import { GuideArticle } from "@/components/Guide";
import { GUIDE_CONTENT } from "@/lib/guides-content";
import body from "@/lib/guides/goodGpa";
import { GUIDES, pageHead } from "@/lib/site";

const page = GUIDES.goodGpa;

export const Route = createFileRoute("/guides/what-is-a-good-gpa")({
  head: () => pageHead(page),
  component: () => <GuideArticle page={page} content={{ ...GUIDE_CONTENT.goodGpa, ...body }} />,
});
