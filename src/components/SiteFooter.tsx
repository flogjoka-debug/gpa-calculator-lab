import { PAGES, SUPPORT, TOOL_GROUPS } from "@/lib/site";

// Footer: support links plus all 10 calculators in their three groups.
const GROUPS = TOOL_GROUPS.map((g) => (g.label === "GPA" ? { ...g, items: [PAGES.home, ...g.items] } : g));
const linkName = (h1: string) => h1;

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-divider bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-text-muted">
        <nav aria-label="Calculators" className="grid gap-6 sm:grid-cols-3">
          {GROUPS.map((g) => (
            <div key={g.label}>
              <p className="font-semibold text-text">{g.label}</p>
              <ul className="mt-2 space-y-1.5">
                {g.items.map((p) => <li key={p.path}><a href={p.path}>{linkName(p.h1)}</a></li>)}
              </ul>
            </div>
          ))}
        </nav>
        <nav aria-label="Site" className="mt-6 border-t border-divider pt-4">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><a href={SUPPORT.about.path}>About</a></li>
            <li><a href={SUPPORT.methodology.path}>Methodology</a></li>
            <li><a href={SUPPORT.privacy.path}>Privacy</a></li>
            <li><a href={SUPPORT.contact.path}>Contact</a></li>
          </ul>
        </nav>
        <p className="mt-4">GPA Calculator Lab gives estimates. Your school's transcript is the official record.</p>
      </div>
    </footer>
  );
}
