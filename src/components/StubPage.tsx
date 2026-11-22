export function StubPage({ h1 }: { h1: string }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl leading-tight">{h1}</h1>
      <p className="mt-3 text-text-muted">This calculator isn't available yet.</p>
    </main>
  );
}
