import { Link } from "@tanstack/react-router";
import { PAGES, SUPPORT, type PageInfo } from "@/lib/site";
import { type FaqItem } from "@/lib/seo-content";

export function Breadcrumbs({ page }: { page: PageInfo }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-3 text-sm text-text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li><Link to="/">Home</Link><span aria-hidden="true" className="ml-2">›</span></li>
        <li aria-current="page">{page.h1}</li>
      </ol>
    </nav>
  );
}

const RELATED: Record<string, PageInfo[]> = {
  [PAGES.college.path]: [PAGES.cumulative, PAGES.percentage, PAGES.law],
  [PAGES.highSchool.path]: [PAGES.home, PAGES.uc, PAGES.cumulative],
  [PAGES.cumulative.path]: [PAGES.college, PAGES.highSchool, PAGES.home],
  [PAGES.grade.path]: [PAGES.finalGrade, PAGES.percentage, PAGES.semester],
  [PAGES.finalGrade.path]: [PAGES.grade, PAGES.semester, PAGES.percentage],
  [PAGES.semester.path]: [PAGES.finalGrade, PAGES.percentage, PAGES.grade],
  [PAGES.percentage.path]: [PAGES.college, PAGES.grade, PAGES.home],
  [PAGES.uc.path]: [PAGES.highSchool, PAGES.college, PAGES.home],
  [PAGES.law.path]: [PAGES.college, PAGES.cumulative, PAGES.percentage],
};

export function CalculatorFooter({ page }: { page: PageInfo }) {
  const related = RELATED[page.path];
  return (
    <div className="mt-12 border-t border-divider pt-5">
      <p className="text-sm text-text-muted">Last updated November 22, 2026 · <Link to={SUPPORT.methodology.path}>How our calculators work</Link></p>
      {related ? (
        <section className="mt-6" aria-labelledby="related-calculators">
          <h2 id="related-calculators" className="text-2xl">Related calculators</h2>
          <ul className="mt-2 space-y-1">
            {related.map((item) => <li key={item.path}><Link to={item.path} className="inline-flex min-h-11 items-center">{item.h1}</Link></li>)}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section className="mt-12" aria-labelledby="faq">
      <h2 id="faq" className="text-2xl">Frequently asked questions</h2>
      <div className="mt-4 space-y-6">
        {items.map((item) => (
          <div key={item.question}>
            <h3 className="text-lg">{item.question}</h3>
            <p className="mt-2">{item.answer.map((part, i) => typeof part === "string" ? part : <Link key={i} to={part.to}>{part.text}</Link>)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ContentTable({ caption, columns, rows }: { caption: string; columns: string[]; rows: string[][] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-[12px] border border-divider bg-surface">
      <table className="w-full min-w-[420px] text-left tabular">
        <caption className="sr-only">{caption}</caption>
        <thead><tr>{columns.map((column) => <th key={column} scope="col" className="border-b border-divider px-4 py-3">{column}</th>)}</tr></thead>
        <tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th key={i} scope="row" className="border-b border-divider px-4 py-3 font-medium">{cell}</th> : <td key={i} className="border-b border-divider px-4 py-3">{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
