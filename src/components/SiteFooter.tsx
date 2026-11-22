import { GUIDES, GUIDE_LIST, PAGES, SUPPORT, TOOL_GROUPS } from "@/lib/site";
import { GROUP_ICONS } from "@/lib/icons";
import { OPEN_CONSENT_EVENT } from "@/components/ConsentBanner";

const GROUP_ICON = { GPA: GROUP_ICONS.gpa, Grades: GROUP_ICONS.grade, Admissions: GROUP_ICONS.admissions } as Record<string, typeof GROUP_ICONS.gpa>;

// Footer: all 10 calculators in their three groups, the guides, and support links.
const GROUPS = TOOL_GROUPS.map((g) => (g.label === "GPA" ? { ...g, items: [PAGES.home, ...g.items] } : g));
const linkName = (h1: string) => h1;

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-divider bg-surface shadow-[0_-12px_32px_-24px_rgba(19,43,56,0.18)]">
      <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-text-muted">
        <nav aria-label="Calculators" className="grid gap-6 sm:grid-cols-3">
          {GROUPS.map((g) => (
            <div key={g.label}>
              <p className="flex items-center gap-2 font-semibold text-text">{(() => { const Icon = GROUP_ICON[g.label]; return Icon ? <span className="icon-chip icon-chip-sm" aria-hidden="true"><Icon /></span> : null; })()}{g.label}</p>
              <ul className="mt-2 space-y-1.5">
                {g.items.map((p) => <li key={p.path}><a href={p.path}>{linkName(p.h1)}</a></li>)}
              </ul>
            </div>
          ))}
        </nav>
        <nav aria-label="Guides" className="mt-6 border-t border-divider pt-4">
          <p className="flex items-center gap-2 font-semibold text-text"><span className="icon-chip icon-chip-sm" aria-hidden="true"><GROUP_ICONS.guides /></span><a href={GUIDES.hub.path}>GPA guides</a></p>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
            {GUIDE_LIST.map((g) => <li key={g.path}><a href={g.path}>{g.h1}</a></li>)}
          </ul>
        </nav>
        <nav aria-label="Site" className="mt-6 border-t border-divider pt-4">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><a href={SUPPORT.about.path}>About</a></li>
            <li><a href={SUPPORT.methodology.path}>Methodology</a></li>
            <li><a href={SUPPORT.privacy.path}>Privacy</a></li>
            <li><a href={SUPPORT.contact.path}>Contact</a></li>
            <li><button type="button" className="footer-link-button" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>Cookie settings</button></li>
          </ul>
        </nav>
        <p className="mt-4">GPA Calculator Lab gives estimates. Your school's transcript is the official record.</p>
      </div>
    </footer>
  );
}
