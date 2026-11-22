import { calculateItems, parseNumber, type ClassRow, type GpaOptions, type IncludedRow, type ExcludedRow, type RowError } from "./gpa";

export type PriorInput =
  | { mode: "exact"; qualityPoints: string; credits: string }
  | { mode: "gpa"; gpa: string; credits: string };
export type NewSemester =
  | { mode: "rows"; rows: ClassRow[] }
  | { mode: "summary"; gpa: string; credits: string };

export type CumFieldName = "priorCredits" | "priorQualityPoints" | "priorGpa" | "semesterGpa" | "semesterCredits";
export interface CumFieldError { field: CumFieldName; semester?: number; message: string }

export interface CumSemesterSummary { semester: number; qualityPoints: number; credits: number }
export interface CumulativeResult {
  kind: "result";
  value: number;
  numerator: number;
  denominator: number;
  prior: { qualityPoints: number; credits: number; gpa: number | null };
  added: { qualityPoints: number; credits: number };
  semesters: CumSemesterSummary[];
  /** Change from the prior GPA (null when there was no prior GPA). */
  change: number | null;
  estimate: boolean;
  included: IncludedRow[];
  excluded: ExcludedRow[];
  warnings: string[];
}
export type CumulativeOutcome =
  | CumulativeResult
  | { kind: "empty" }
  | { kind: "error"; fieldErrors: CumFieldError[]; rowErrors: RowError[] };

export function calculateCumulative(prior: PriorInput, semesters: NewSemester[], opts: GpaOptions = {}): CumulativeOutcome {
  const fieldErrors: CumFieldError[] = [];
  const rowErrors: RowError[] = [];

  // Prior work
  let priorQp = 0;
  let priorCredits = 0;
  const credits = parseNumber(prior.credits);
  const second = prior.mode === "exact" ? prior.qualityPoints : prior.gpa;
  const secondVal = parseNumber(second);
  const priorTouched = prior.credits.trim() !== "" || second.trim() !== "";
  if (priorTouched) {
    if (credits === null || credits <= 0) {
      fieldErrors.push({ field: "priorCredits", message: "GPA credits so far: enter credits greater than 0." });
    }
    if (secondVal === null || secondVal < 0) {
      fieldErrors.push(
        prior.mode === "exact"
          ? { field: "priorQualityPoints", message: "Quality points so far: enter 0 or more." }
          : { field: "priorGpa", message: "Current GPA: enter 0 or more." },
      );
    }
    if (credits !== null && credits > 0 && secondVal !== null && secondVal >= 0) {
      priorCredits = credits;
      priorQp = prior.mode === "exact" ? secondVal : secondVal * credits;
    }
  }

  // New semesters
  const summaries: CumSemesterSummary[] = [];
  const included: IncludedRow[] = [];
  const excluded: ExcludedRow[] = [];
  semesters.forEach((s, si) => {
    const semester = si + 1;
    if (s.mode === "rows") {
      const o = calculateItems(s.rows.map((r, i) => ({ ...r, index: i + 1, semester })), opts);
      if (o.kind === "error") rowErrors.push(...o.errors);
      if (o.kind === "result") {
        included.push(...o.included);
        excluded.push(...o.excluded);
        summaries.push({ semester, qualityPoints: o.numerator, credits: o.denominator });
      }
      return;
    }
    if (s.gpa.trim() === "" && s.credits.trim() === "") return;
    const g = parseNumber(s.gpa);
    const c = parseNumber(s.credits);
    let bad = false;
    if (g === null || g < 0) {
      fieldErrors.push({ field: "semesterGpa", semester, message: `Semester ${semester} GPA: enter 0 or more.` });
      bad = true;
    }
    if (c === null || c <= 0) {
      fieldErrors.push({ field: "semesterCredits", semester, message: `Semester ${semester} credits: enter credits greater than 0.` });
      bad = true;
    }
    if (!bad && g !== null && c !== null) summaries.push({ semester, qualityPoints: g * c, credits: c });
  });

  if (fieldErrors.length || rowErrors.length) return { kind: "error", fieldErrors, rowErrors };

  const addedQp = summaries.reduce((a, s) => a + s.qualityPoints, 0);
  const addedCredits = summaries.reduce((a, s) => a + s.credits, 0);
  const denominator = priorCredits + addedCredits;
  if (denominator === 0) return { kind: "empty" };
  const numerator = priorQp + addedQp;
  const value = numerator / denominator;
  const priorGpa = priorCredits > 0 ? priorQp / priorCredits : null;
  return {
    kind: "result",
    value,
    numerator,
    denominator,
    prior: { qualityPoints: priorQp, credits: priorCredits, gpa: priorGpa },
    added: { qualityPoints: addedQp, credits: addedCredits },
    semesters: summaries,
    change: priorGpa === null ? null : value - priorGpa,
    estimate: prior.mode === "gpa" && priorCredits > 0,
    included,
    excluded,
    warnings: [],
  };
}
