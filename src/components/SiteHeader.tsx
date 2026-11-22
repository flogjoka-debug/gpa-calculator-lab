export function SiteHeader() {
  return (
    <header className="border-b border-divider bg-surface">
      <div className="mx-auto flex max-w-3xl items-center px-4 py-2">
        <a
          href="/"
          aria-label="GPA Calculator Lab home"
          className="inline-flex min-h-11 items-center gap-2.5 text-[18px] font-semibold text-text no-underline hover:text-text"
        >
          <img src="/brand/logomark.svg" width={32} height={32} alt="" />
          <span>
            GPA Calculator <span className="text-primary">Lab</span>
          </span>
        </a>
      </div>
    </header>
  );
}
