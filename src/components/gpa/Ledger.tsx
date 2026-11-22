import { formatCredits, formatGpa, formatPoints, formatQp, type GpaResult } from "@/lib/calc/gpa";

const REASON: Record<"P" | "W", string> = {
  P: "Pass grades add no grade points on this scale.",
  W: "Withdrawals add no grade points on this scale.",
};

export function LedgerTable({ result, caption }: { result: GpaResult; caption?: string | undefined }) {
  return (
    <table className="tabular w-full border-collapse text-left text-[15px]">
      {caption ? <caption className="mb-2 text-left text-sm font-semibold text-text-muted">{caption}</caption> : null}
      <thead>
        <tr className="border-b border-divider text-sm text-text-muted">
          <th scope="col" className="py-2 pr-3 font-semibold">Grade</th>
          <th scope="col" className="py-2 pr-3 font-semibold">Points × credits</th>
          <th scope="col" className="py-2 text-right font-semibold">Quality pts</th>
        </tr>
      </thead>
      <tbody>
        {result.included.map((r) => (
          <tr key={r.index} className="border-b border-divider">
            <td className="py-2 pr-3">{r.grade}</td>
            <td className="py-2 pr-3">{formatPoints(r.points)} × {formatCredits(r.credits)}</td>
            <td className="py-2 text-right">{formatQp(r.qualityPoints)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="ledger-total font-semibold">
          <th scope="row" className="py-2 pr-3">Total</th>
          <td className="py-2 pr-3">{formatCredits(result.denominator)} GPA credits</td>
          <td className="py-2 text-right">{formatQp(result.numerator)}</td>
        </tr>
      </tfoot>
    </table>
  );
}

export function CountedStrip({ result }: { result: GpaResult }) {
  const ex = result.excluded;
  const types = Array.from(new Set(ex.map((e) => e.grade)));
  return (
    <div className="rounded-[10px] bg-accent px-4 py-3 text-accent-foreground">
      <p className="font-semibold">
        <span aria-hidden="true">✓ </span>
        {formatCredits(result.denominator)} of {formatCredits(result.totalCredits)} credits counted toward GPA
      </p>
      {ex.length > 0 ? (
        <p className="mt-1 text-[15px]">
          Not counted:{" "}
          {ex.map((e) => `Class ${e.index} (${e.grade}, ${formatCredits(e.credits)} credits)`).join(", ")}.{" "}
          {types.map((t) => REASON[t]).join(" ")}
        </p>
      ) : null}
    </div>
  );
}

export function FormulaLine({ result }: { result: GpaResult }) {
  return (
    <p className="tabular">
      {formatQp(result.numerator)} quality points ÷ {formatCredits(result.denominator)} GPA credits ={" "}
      {formatGpa(result.value)}
    </p>
  );
}
