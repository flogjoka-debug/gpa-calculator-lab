import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAGES, SUPPORT, type PageInfo } from "@/lib/site";

const GROUPS = [
  { id: "gpa", label: "GPA calculators", items: [PAGES.home, PAGES.college, PAGES.highSchool, PAGES.cumulative] },
  { id: "grade", label: "Grade calculators", items: [PAGES.grade, PAGES.finalGrade, PAGES.semester, PAGES.percentage] },
  { id: "admissions", label: "Admissions", items: [PAGES.uc, PAGES.law] },
];

export function SiteHeader() {
  const [open, setOpen] = useState<string | null>(null);
  const header = useRef<HTMLElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const { pathname } = useLocation();
  const currentPath = pathname === "/" ? "/" : `${pathname.replace(/\/$/, "")}/`;

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(null);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        event.preventDefault();
        triggers.current[open]?.focus();
        setOpen(null);
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 900px)");
    const close = () => setOpen(null);
    breakpoint.addEventListener("change", close);
    return () => breakpoint.removeEventListener("change", close);
  }, []);

  const navLink = (page: PageInfo) => (
    <Link key={page.path} to={page.path} aria-current={currentPath === page.path ? "page" : undefined}
      className="header-link" onClick={() => setOpen(null)}>{page.path === PAGES.law.path ? "Law School GPA Calculator (LSAC)" : page.path === PAGES.percentage.path ? "Percentage to Letter Grade" : page.h1}</Link>
  );

  return (
    <header ref={header} className="site-header border-b border-divider bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <Link
          to="/"
          aria-label="GPA Calculator Lab home"
          className="inline-flex min-h-11 items-center gap-2.5 text-[18px] font-semibold text-text no-underline hover:text-text"
        >
          <img src="/brand/logomark.svg" width={32} height={32} alt="" />
          <span>
            GPA Calculator <span className="text-primary">Lab</span>
          </span>
        </Link>
        <nav aria-label="Primary" className="header-desktop">
          {GROUPS.map((group) => (
            <div key={group.id} className="header-group">
              <Button ref={(element) => { triggers.current[group.id] = element; }} variant="ghost"
                className="header-trigger" aria-expanded={open === group.id} aria-controls={`nav-${group.id}`}
                onClick={() => setOpen(open === group.id ? null : group.id)}>
                {group.label}<ChevronDown aria-hidden="true" />
              </Button>
              <div id={`nav-${group.id}`} hidden={open !== group.id} className="header-panel header-dropdown">
                <ul>{group.items.map((page) => <li key={page.path}>{navLink(page)}</li>)}</ul>
              </div>
            </div>
          ))}
          <Link to={SUPPORT.methodology.path} className="header-link"
            aria-current={currentPath === SUPPORT.methodology.path ? "page" : undefined} onClick={() => setOpen(null)}>How it works</Link>
        </nav>
        <Button ref={(element) => { triggers.current["mobile"] = element; }} variant="ghost"
          className="header-trigger header-mobile-trigger" aria-expanded={open === "mobile"} aria-controls="nav-mobile"
          onClick={() => setOpen(open === "mobile" ? null : "mobile")}>
          {open === "mobile" ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}Menu
        </Button>
      </div>
      <nav id="nav-mobile" aria-label="Mobile primary" hidden={open !== "mobile"} className="header-panel header-mobile-panel">
        {GROUPS.map((group) => (
          <div key={group.id}>
            <h2 className="px-3 pt-3 text-sm text-text-muted">{group.label}</h2>
            <ul>{group.items.map((page) => <li key={page.path}>{navLink(page)}</li>)}</ul>
          </div>
        ))}
        <Link to={SUPPORT.methodology.path} className="header-link"
          aria-current={currentPath === SUPPORT.methodology.path ? "page" : undefined} onClick={() => setOpen(null)}>How it works</Link>
      </nav>
    </header>
  );
}
