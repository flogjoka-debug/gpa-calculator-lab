import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs, UpdatedLine } from "@/components/PageSeo";
import { CopyBlocks, InlineText } from "@/components/Guide";
import copyAbout from "@/lib/copy/about";
import { PAGE_META } from "@/lib/page-meta";
import blocks from "@/lib/copy/about";
import { SUPPORT, pageHead } from "@/lib/site";

const page = SUPPORT.about;
const copy = PAGE_META.about;

export const Route = createFileRoute("/about")({
  head: () => pageHead(page),
  component: Page,
});

function Page() {
  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <Breadcrumbs page={page} />
      <h1 className="text-[2rem] leading-tight sm:text-4xl">{page.h1}</h1>
      <UpdatedLine page={page} />
      <p className="mt-2 text-text-muted sm:text-lg"><InlineText text={copy.lead} /></p>
      <CopyBlocks blocks={blocks} />
    </main>
  );
}
