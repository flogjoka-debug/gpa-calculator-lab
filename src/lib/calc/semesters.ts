import { buildResult, calculateItems, type ClassRow, type GpaOptions, type GpaOutcome, type RowError } from "./gpa";

export interface SemesterInput { name: string; rows: ClassRow[] }
export interface SemestersOutcome {
  semesters: GpaOutcome[];
  overall: GpaOutcome;
}

/** Per-semester GPA plus one overall GPA across every entered semester. */
export function calculateSemesters(semesters: SemesterInput[], opts: GpaOptions = {}): SemestersOutcome {
  const per = semesters.map((s, si) =>
    calculateItems(s.rows.map((r, i) => ({ ...r, index: i + 1, semester: si + 1 })), opts),
  );
  const errors: RowError[] = per.flatMap((o) => (o.kind === "error" ? o.errors : []));
  if (errors.length) return { semesters: per, overall: { kind: "error", errors } };
  const ok = per.filter((o) => o.kind === "result");
  return {
    semesters: per,
    overall: buildResult(ok.flatMap((o) => o.included), ok.flatMap((o) => o.excluded)),
  };
}
