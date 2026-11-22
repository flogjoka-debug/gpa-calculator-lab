import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Breadcrumbs } from "@/components/PageSeo";
import { CopyBlocks, InlineText } from "@/components/Guide";
import { PAGE_COPY } from "@/lib/page-copy";
import { SITE_URL, SUPPORT, pageHead } from "@/lib/site";

const page = SUPPORT.forSchools;
const copy = PAGE_COPY.forSchools;

export const EMBED_CODE = `<iframe src="${SITE_URL}/embed/gpa-calculator/" title="GPA calculator" width="100%" height="1100" style="border:0;max-width:760px" loading="lazy"></iframe>
<p><a href="${SITE_URL}/">GPA Calculator</a> by GPA Calculator Lab</p>`;

export const Route = createFileRoute("/for-schools")({
  head: () => pageHead(page),
  component: Page,
});

function EmbedCode() {
  const [copied, setCopied] = useState(false);
  return (
    <div className="mt-4 card p-4">
      <label htmlFor="embed-code" className="mb-2 block text-sm font-semibold">Embed code</label>
      <textarea id="embed-code" readOnly rows={5} className="field font-mono text-sm" value={EMBED_CODE}
        onFocus={(e) => e.currentTarget.select()} />
      <button type="button" className="btn btn-primary mt-3" onClick={async () => {
        try {
          await navigator.clipboard.writeText(EMBED_CODE);
          setCopied(true);
        } catch {
          (document.getElementById("embed-code") as HTMLTextAreaElement | null)?.select();
        }
      }}>
        {copied ? <Check aria-hidden="true" size={18} /> : <Copy aria-hidden="true" size={18} />}
        {copied ? "Copied" : "Copy code"}
      </button>
      <p role="status" className="sr-only">{copied ? "Embed code copied" : ""}</p>
    </div>
  );
}

function Page() {
  const split = copy.blocks.findIndex((b) => b.t === "h2" && b.text === "Prefer a link?");
  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <Breadcrumbs page={page} />
      <h1 className="text-[2rem] leading-tight sm:text-4xl">{page.h1}</h1>
      <p className="mt-2 text-text-muted sm:text-lg"><InlineText text={copy.lead} /></p>
      <CopyBlocks blocks={copy.blocks.slice(0, split)} />
      <EmbedCode />
      <h2 className="mt-12 text-2xl">Preview</h2>
      <iframe src="/embed/gpa-calculator/" title="GPA calculator preview" width="100%" height="1100" loading="lazy" className="mt-4 card w-full" />
      <CopyBlocks blocks={copy.blocks.slice(split)} />
    </main>
  );
}
