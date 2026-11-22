import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/PageSeo";
import { CopyBlocks, InlineText } from "@/components/Guide";
import copyContact from "@/lib/copy/contact";
import { PAGE_META } from "@/lib/page-meta";
import blocks from "@/lib/copy/contact";
import { SUPPORT, pageHead } from "@/lib/site";

const page = SUPPORT.contact;
const copy = PAGE_META.contact;

export const Route = createFileRoute("/contact")({
  head: () => pageHead(page),
  component: Page,
});

function Page() {
  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <Breadcrumbs page={page} />
      <h1 className="text-[2rem] leading-tight sm:text-4xl">{page.h1}</h1>
      <p className="mt-2 text-text-muted sm:text-lg"><InlineText text={copy.lead} /></p>
      <CopyBlocks blocks={blocks} />
    </main>
  );
}
