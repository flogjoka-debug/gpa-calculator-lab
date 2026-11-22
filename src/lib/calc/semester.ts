import { parseNumber } from "./gpa";
import { MAX_PERCENT, PERCENT_RANGE_MESSAGE, ceil1 } from "./format";
import type { ScaleProfile } from "./scale";

export interface PeriodRow { name: string; grade: string; weight: string }
export interface SemesterError { index: number; field: "grade" | "weight" | "total"; message: string }
export interface NeededRow { letter: string; target: number; needed: number; reachable: boolean }

export type SemesterOutcome =
  | { kind: "result"; value: number; numerator: number; denominator: number; included: { index: number; grade: number; weight: number }[]; excluded: never[]; warnings: string[] }
  | { kind: "needed"; examIndex: number; others: number; examWeight: number; rows: NeededRow[] }
  | { kind: "empty" }
  | { kind: "error"; errors: SemesterError[] };

const TOL = 0.01;

/**
 * Σ(grade × weight/100). `examIndex` marks the exam row: if only its grade is blank,
 * solve for the exam score needed for the A, B, C and D cutoffs of `profile`.
 */
export function calculateSemester(rows: PeriodRow[], examIndex: number | null, profile: ScaleProfile): SemesterOutcome {
  const errors: SemesterError[] = [];
  const items: { index: number; grade: number | null; weight: number }[] = [];
  rows.forEach((r, i) => {
    const index = i + 1;
    const label = r.name.trim() || `Grading period ${index}`;
    const w = parseNumber(r.weight);
    if (w === null || w < 0) {
      errors.push({ index, field: "weight", message: `${label}: enter a weight of 0 or more.` });
      return;
    }
    if (r.grade.trim() === "") {
      items.push({ index, grade: null, weight: w });
      return;
    }
    const g = parseNumber(r.grade);
    if (g === null || g < 0) {
      errors.push({ index, field: "grade", message: `${label}: enter a grade of 0 or more.` });
      return;
    }
    if (g > MAX_PERCENT) {
      errors.push({ index, field: "grade", message: PERCENT_RANGE_MESSAGE });
      return;
    }
    items.push({ index, grade: g, weight: w });
  });
  if (errors.length) return { kind: "error", errors };
  const total = items.reduce((s, it) => s + it.weight, 0);
  if (items.every((it) => it.grade === null)) return { kind: "empty" };
  if (Math.abs(total - 100) > TOL) {
    return { kind: "error", errors: [{ index: 0, field: "total", message: `Weights add up to ${Math.round(total * 100) / 100}%. Make them add up to 100%.` }] };
  }
  const blanks = items.filter((it) => it.grade === null && it.weight > 0);
  const exam = examIndex === null ? undefined : items[examIndex];
  if (blanks.length === 1 && exam && blanks[0] === exam && exam.weight > 0) {
    const others = items.reduce((s, it) => s + (it.grade ?? 0) * (it.weight / 100), 0);
    const w = exam.weight / 100;
    const rowsOut = ["A", "B", "C", "D"].flatMap((letter) => {
      const r = profile.rows.find((x) => x.letter === letter);
      if (!r) return [];
      const needed = ceil1((r.min - others) / w);
      return [{ letter, target: r.min, needed: Math.max(0, needed), reachable: needed <= 100 }];
    });
    return { kind: "needed", examIndex: examIndex ?? 0, others, examWeight: exam.weight, rows: rowsOut };
  }
  const missing = items.find((it) => it.grade === null && it.weight > 0);
  if (missing) {
    const label = rows[missing.index - 1]?.name.trim() || `Grading period ${missing.index}`;
    return { kind: "error", errors: [{ index: missing.index, field: "grade", message: `${label}: enter a grade.` }] };
  }
  const included = items.map((it) => ({ index: it.index, grade: it.grade ?? 0, weight: it.weight }));
  const value = included.reduce((s, it) => s + it.grade * (it.weight / 100), 0);
  return { kind: "result", value, numerator: value, denominator: 1, included, excluded: [], warnings: [] };
}
