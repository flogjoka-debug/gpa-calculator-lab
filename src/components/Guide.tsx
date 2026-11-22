import { Fragment, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Breadcrumbs, ContentTable, FaqSection, LinkCardGrid } from "@/components/PageSeo";
import { GUIDE_LIST, SUPPORT, type PageInfo } from "@/lib/site";
import type { GuideBlock, GuideContent } from "@/lib/guides-content";

/** Renders inline [text](href) links: internal paths use the router, others open the source page. */
export function InlineText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const [, label = "", href = ""] = match;
    parts.push(href.startsWith("/")
      ? <Link key={match.index} to={href}>{label}</Link>
      : <a key={match.index} href={href} rel="noopener">{label}</a>);
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts.map((p, i) => <Fragment key={i}>{p}</Fragment>)}</>;
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.t) {
    case "h2":
      return <h2 id={block.id} className="mt-12 text-2xl">{block.text}</h2>;
    case "p":
      return <p className="mt-3"><InlineText text={block.text} /></p>;
    case "ol":
      return <ol className="mt-3 list-decimal space-y-2 pl-6">{block.items.map((item) => <li key={item}><InlineText text={item} /></li>)}</ol>;
    case "ul":
      return <ul className="mt-3 list-disc space-y-2 pl-6">{block.items.map((item) => <li key={item}><InlineText text={item} /></li>)}</ul>;
    case "table":
      return <ContentTable caption={block.caption} columns={block.columns} rows={block.rows} />;
  }
}

const formatDate = (iso?: string) =>
  iso ? new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }) : "";

export function GuideArticle({ page, content }: { page: PageInfo; content: GuideContent }) {
  const others = GUIDE_LIST.filter((g) => g.path !== page.path);
  return (
    <main className="mx-auto max-w-3xl px-4 pt-5 pb-4 sm:pt-8">
      <Breadcrumbs page={page} />
      <article>
        <h1 className="text-[2rem] leading-tight sm:text-4xl">{page.h1}</h1>
        <p className="mt-2 text-sm text-text-muted">
          By GPA Calculator Lab · Updated <time dateTime={page.article?.updated}>{formatDate(page.article?.updated)}</time>
        </p>
        <p className="mt-4 text-text-muted sm:text-lg">{content.lead}</p>
        {content.blocks.map((block, i) => <Block key={i} block={block} />)}
        <FaqSection items={content.faq} />
      </article>
      <div className="mt-12 border-t border-divider pt-5">
        <p className="text-sm text-text-muted">
          Policies change, so check your school's own rules. · <Link to={SUPPORT.methodology.path}>How our calculators work</Link>
        </p>
        <section className="mt-6" aria-labelledby="more-guides">
          <h2 id="more-guides" className="text-2xl">More GPA guides</h2>
          <LinkCardGrid items={others} />
        </section>
      </div>
    </main>
  );
}
