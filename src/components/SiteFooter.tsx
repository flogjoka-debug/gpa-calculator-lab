import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-divider bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-text-muted">
        <nav aria-label="Site">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link to="/about/">About</Link></li>
            <li><Link to="/methodology/">Methodology</Link></li>
            <li><Link to="/privacy/">Privacy</Link></li>
            <li><Link to="/contact/">Contact</Link></li>
          </ul>
        </nav>
        <p className="mt-4">GPA Calculator Lab gives estimates. Your school's transcript is the official record.</p>
      </div>
    </footer>
  );
}
