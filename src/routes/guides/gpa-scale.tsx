import { createFileRoute } from "@tanstack/react-router";
import { GuideArticle } from "@/components/Guide";
import { GUIDE_CONTENT } from "@/lib/guides-content";
import body from "@/lib/guides/scale";
import { GUIDES, pageHead } from "@/lib/site";

const page = GUIDES.scale;

export const Route = createFileRoute("/guides/gpa-scale")({
  head: () => pageHead(page),
  component: () => <GuideArticle page={page} content={{ ...GUIDE_CONTENT.scale, ...body }} />,
});
