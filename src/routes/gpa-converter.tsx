import { createFileRoute } from "@tanstack/react-router";
import { CopyBlocks, InlineText } from "@/components/Guide";
import { Breadcrumbs, CalculatorFooter, FaqSection } from "@/components/PageSeo";
import { ConverterTool } from "@/components/gpa/ConverterTool";
import { LoadExampleButton } from "@/components/gpa/shared";
import { PAGE_COPY } from "@/lib/page-copy";
import { CONVERTER_FAQ } from "@/lib/seo-content";
import { PAGES, pageHead } from "@/lib/site";

const page = PAGES.converter;
const copy = PAGE_COPY.converter;

export const Route = createFileRoute("/gpa-converter")({
  head: () => pageHead(page),
  component: Page,
});

function Page() {
  const [first, ...rest] = copy.blocks;
  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <Breadcrumbs page={page} />
      <h1 className="text-[2rem] leading-tight sm:text-4xl">{page.h1}</h1>
      <p className="mt-2 text-text-muted sm:text-lg"><InlineText text={copy.lead} /></p>
      <ConverterTool />
      {first ? <CopyBlocks blocks={[first]} /> : null}
      <LoadExampleButton />
      <CopyBlocks blocks={rest} />
      <FaqSection items={CONVERTER_FAQ} />
      <CalculatorFooter page={page} />
    </main>
  );
}
