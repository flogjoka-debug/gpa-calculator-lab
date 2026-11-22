// Pure GPA engine (brief section 4). No UI imports. Full precision internally; format at display.

export type LetterGrade = "A" | "A−" | "B+" | "B" | "B−" | "C+" | "C" | "C−" | "D+" | "D" | "D−" | "F";
export type GradeOption = LetterGrade | "P" | "W";
export type GradeScale = Record<LetterGrade, number>;

export const LETTER_GRADES: LetterGrade[] = ["A", "A−", "B+", "B", "B−", "C+", "C", "C−", "D+", "D", "D−", "F"];
export const GRADE_OPTIONS: GradeOption[] = [...LETTER_GRADES, "P", "W"];

/** Default example scale (editable, labeled "example"). */
export const EXAMPLE_SCALE: GradeScale = {
  A: 4.0, "A−": 3.7, "B+": 3.3, B: 3.0, "B−": 2.7, "C+": 2.3,
  C: 2.0, "C−": 1.7, "D+": 1.3, D: 1.0, "D−": 0.7, F: 0.0,
};

export interface ClassRow {
  name?: string;
  grade: GradeOption | "";
  /** Raw credits text as typed. */
  credits: string;
}

export interface IncludedRow {
  index: number; // 1-based class number
  grade: LetterGrade;
  points: number;
  credits: number;
  qualityPoints: number;
}

export type ExcludeReason = "pass" | "withdrawal";
export interface ExcludedRow {
  index: number;
  grade: "P" | "W";
  credits: number;
  reason: ExcludeReason;
}

export interface GpaResult {
  kind: "result";
  value: number;
  numerator: number;
  denominator: number;
  included: IncludedRow[];
  excluded: ExcludedRow[];
  warnings: string[];
  /** Credits entered on all non-blank rows (counted + not counted). */
  totalCredits: number;
}
export interface GpaEmpty { kind: "empty" }
export type RowErrorCode = "credits" | "grade";
export interface RowError { index: number; code: RowErrorCode; message: string }
export interface GpaError { kind: "error"; errors: RowError[] }
export type GpaOutcome = GpaResult | GpaEmpty | GpaError;

export interface GpaOptions {
  scale?: GradeScale;
  equalWeight?: boolean;
}

export function parseCredits(raw: string): number | null {
  const t = raw.trim();
  if (t === "" || !/^-?\d*\.?\d+$|^-?\d+\.$/.test(t)) return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

export function calculateGpa(rows: ClassRow[], opts: GpaOptions = {}): GpaOutcome {
  const scale = opts.scale ?? EXAMPLE_SCALE;
  const equal = opts.equalWeight ?? false;
  const included: IncludedRow[] = [];
  const excluded: ExcludedRow[] = [];
  const errors: RowError[] = [];

  rows.forEach((row, i) => {
    const index = i + 1;
    const hasGrade = row.grade !== "";
    const hasCredits = row.credits.trim() !== "";
    if (!hasGrade && (equal || !hasCredits)) return; // blank row: skipped
    if (!hasGrade) {
      errors.push({ index, code: "grade", message: `Class ${index}: choose a grade.` });
      return;
    }
    let credits: number;
    if (equal) credits = 1;
    else {
      const c = parseCredits(row.credits);
      if (c === null || c <= 0) {
        errors.push({ index, code: "credits", message: `Class ${index}: enter credits greater than 0.` });
        return;
      }
      credits = c;
    }
    const g = row.grade as GradeOption;
    if (g === "P" || g === "W") {
      excluded.push({ index, grade: g, credits, reason: g === "P" ? "pass" : "withdrawal" });
      return;
    }
    const points = scale[g];
    included.push({ index, grade: g, points, credits, qualityPoints: points * credits });
  });

  if (errors.length) return { kind: "error", errors };
  if (included.length === 0 && excluded.length === 0) return { kind: "empty" };

  const numerator = included.reduce((s, r) => s + r.qualityPoints, 0);
  const denominator = included.reduce((s, r) => s + r.credits, 0);
  const totalCredits = denominator + excluded.reduce((s, r) => s + r.credits, 0);
  if (denominator === 0) return { kind: "empty" };
  return {
    kind: "result",
    value: numerator / denominator,
    numerator,
    denominator,
    included,
    excluded,
    warnings: [],
    totalCredits,
  };
}

/** Display helpers */
export const formatGpa = (n: number) => n.toFixed(2);
/** Quality points / grade points: one decimal when exact ("24.0", "7.5"), otherwise two ("5.55"). */
export function formatQp(n: number): string {
  const v = Math.round(n * 100) / 100;
  return Math.abs(v * 10 - Math.round(v * 10)) < 1e-9 ? v.toFixed(1) : v.toFixed(2);
}
export const formatPoints = formatQp;
export const formatCredits = (n: number) => String(Math.round(n * 100) / 100);
