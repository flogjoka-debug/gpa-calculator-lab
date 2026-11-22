import { formatCredits, formatGpa, formatPoints, formatQp, type ExcludeReason, type ExcludedRow, type GpaResult } from "@/lib/calc/gpa";

const REASON: Record<ExcludeReason, string> = {
  pass: "Pass grades add no grade points on this scale.",
  withdrawal: "Withdrawals add no grade points on this scale.",
  nopass: "[COPY NEEDED: NP reason]",
  replaced: "Replaced by a later attempt.",
};

export const rowName = (r: { index: number; semester?: number }, semesterNames?: string[]) =>
  r.semester !== undefined && semesterNames && semesterNames.length > 1
    ? `${semesterNames[r.semester - 1] ?? `Semester ${r.semester}`}, Class ${r.index}`
    : `Class ${r.index}`;

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
          <tr key={`${r.semester ?? 0}-${r.index}`} className="border-b border-divider">
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

export function ExcludedLine({ excluded, semesterNames }: { excluded: ExcludedRow[]; semesterNames?: string[] | undefined }) {
  if (!excluded.length) return null;
  const reasons = Array.from(new Set(excluded.map((e) => e.reason)));
  return (
    <p className="mt-1 text-[15px]">
      Not counted:{" "}
      {excluded.map((e) => `${rowName(e, semesterNames)} (${e.grade}, ${formatCredits(e.credits)} credits)`).join(", ")}.{" "}
      {reasons.map((t) => REASON[t]).join(" ")}
    </p>
  );
}

export function CountedStrip({ result, semesterNames }: { result: GpaResult; semesterNames?: string[] | undefined }) {
  return (
    <div className="rounded-[10px] bg-accent px-4 py-3 text-accent-foreground">
      <p className="font-semibold">
        <span aria-hidden="true">✓ </span>
        {formatCredits(result.denominator)} of {formatCredits(result.totalCredits)} credits counted toward GPA
      </p>
      <ExcludedLine excluded={result.excluded} semesterNames={semesterNames} />
    </div>
  );
}

export function FormulaLine({ result, prefix }: { result: { numerator: number; denominator: number; value: number }; prefix?: string }) {
  return (
    <p className="tabular">
      {prefix ? <span className="font-semibold">{prefix} </span> : null}
      {formatQp(result.numerator)} quality points ÷ {formatCredits(result.denominator)} GPA credits ={" "}
      {formatGpa(result.value)}
    </p>
  );
}
