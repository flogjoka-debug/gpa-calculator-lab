import { Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap } from "lucide-react";
import { eyebrowFor, iconFor } from "@/lib/icons";
import { GUIDES, PAGES, SUPPORT, lastModified, type PageInfo } from "@/lib/site";
import { type FaqItem } from "@/lib/seo-content";

export function Eyebrow({ path }: { path: string }) {
  const { label, icon: Icon } = eyebrowFor(path);
  return <p className="eyebrow"><span className="icon-chip" aria-hidden="true"><Icon /></span>{label}</p>;
}

/** Card link with the page's icon, its name and an optional one-line note. */
export function LinkCard({ page, note }: { page: PageInfo; note?: string }) {
  const Icon = iconFor(page.path);
  return (
    <Link to={page.path} className="link-card">
      <span className="icon-chip" aria-hidden="true"><Icon /></span>
      <span>{page.h1}{note ? <small>{note}</small> : null}</span>
      <ArrowRight className="arrow" aria-hidden="true" />
    </Link>
  );
}

export function LinkCardGrid({ items, notes = false }: { items: PageInfo[]; notes?: boolean }) {
  return (
    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
      {items.map((item) => <li key={item.path}>{notes ? <LinkCard page={item} note={item.description} /> : <LinkCard page={item} />}</li>)}
    </ul>
  );
}

export function Breadcrumbs({ page }: { page: PageInfo }) {
  return (
    <>
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li><Link to="/">Home</Link><span aria-hidden="true" className="ml-2">›</span></li>
        {page.parent ? <li><Link to={page.parent.path}>{page.parent.h1}</Link><span aria-hidden="true" className="ml-2">›</span></li> : null}
        <li aria-current="page">{page.h1}</li>
      </ol>
    </nav>
    <Eyebrow path={page.path} />
    </>
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

/** Guides that answer the questions people ask around each calculator. */
export const RELATED_GUIDES: Record<string, PageInfo[]> = {
  [PAGES.home.path]: [GUIDES.goodGpa, GUIDES.scale],
  [PAGES.college.path]: [GUIDES.raise, GUIDES.goodGpa],
  [PAGES.highSchool.path]: [GUIDES.weighted, GUIDES.goodGpa],
  [PAGES.cumulative.path]: [GUIDES.raise],
  [PAGES.finalGrade.path]: [GUIDES.raise],
  [PAGES.percentage.path]: [GUIDES.scale],
  [PAGES.uc.path]: [GUIDES.weighted],
};

export function RelatedGuides({ items }: { items: PageInfo[] | undefined }) {
  if (!items?.length) return null;
  return (
    <section className="mt-8" aria-labelledby="related-guides">
      <h2 id="related-guides" className="text-2xl">Related guides</h2>
      <LinkCardGrid items={items} />
    </section>
  );
}

export function CalculatorFooter({ page }: { page: PageInfo }) {
  const related = RELATED[page.path];
  return (
    <div className="mt-12 border-t border-divider pt-5">
      <p className="text-sm text-text-muted">Last updated November 22, 2026 · <Link to={SUPPORT.methodology.path}>How our calculators work</Link></p>
      {related ? (
        <section className="mt-6" aria-labelledby="related-calculators">
          <h2 id="related-calculators" className="text-2xl">Related calculators</h2>
          <LinkCardGrid items={related} />
        </section>
      ) : null}
      <RelatedGuides items={RELATED_GUIDES[page.path]} />
    </div>
  );
}

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section className="mt-12" aria-labelledby="faq">
      <h2 id="faq" className="text-2xl">Frequently asked questions</h2>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.question} className="faq-item">
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
    <div className="mt-4 overflow-x-auto content-table">
      <table className="w-full min-w-[420px] text-left tabular">
        <caption className="sr-only">{caption}</caption>
        <thead><tr>{columns.map((column, i) => <th key={i} scope="col" className="border-b border-divider px-4 py-3">{column}</th>)}</tr></thead>
        <tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th key={i} scope="row" className="border-b border-divider px-4 py-3 font-medium">{cell}</th> : <td key={i} className="border-b border-divider px-4 py-3">{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

const longDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

/** Visible "last checked" line under a calculator's H1, matching dateModified in its schema. */
export function UpdatedLine({ page }: { page: PageInfo }) {
  const d = lastModified(page);
  return (
    <p className="mt-2 text-sm text-text-muted">
      Updated <time dateTime={d}>{longDate(d)}</time> · <a href="/methodology/">How we calculate</a>
    </p>
  );
}

/** "For educators" call-out under a GPA calculator, linking to the embed page. */
export function EducatorsBanner() {
  return (
    <a href="/for-schools/" className="educators-banner">
      <span className="icon-chip icon-chip-sm" aria-hidden="true"><GraduationCap /></span>
      <span className="educators-badge">For educators</span>
      <span className="educators-text">Add this calculator to your website for free</span>
      <span className="educators-arrow" aria-hidden="true"><ArrowRight /></span>
    </a>
  );
}
