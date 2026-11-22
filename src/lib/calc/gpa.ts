// Pure GPA engine (brief section 4). No UI imports. Full precision internally; format at display.

export type LetterGrade = "A+" | "A" | "A−" | "B+" | "B" | "B−" | "C+" | "C" | "C−" | "D+" | "D" | "D−" | "F";
export type NonGpaGrade = "P" | "NP" | "W";
export type GradeOption = LetterGrade | NonGpaGrade;
/** Points per letter grade. Missing letters are treated as not on the scale. */
export type GradeScale = Partial<Record<LetterGrade, number>>;

/** Homepage letters (no A+). */
export const LETTER_GRADES: LetterGrade[] = ["A", "A−", "B+", "B", "B−", "C+", "C", "C−", "D+", "D", "D−", "F"];
export const GRADE_OPTIONS: GradeOption[] = [...LETTER_GRADES, "P", "W"];
/** College / high school letters (with A+). */
export const PLUS_LETTER_GRADES: LetterGrade[] = ["A+", ...LETTER_GRADES];
export const COLLEGE_GRADE_OPTIONS: GradeOption[] = [...PLUS_LETTER_GRADES, "P", "NP", "W"];

/** Default example scale (editable, labeled "example"). */
export const EXAMPLE_SCALE: GradeScale = {
  A: 4.0, "A−": 3.7, "B+": 3.3, B: 3.0, "B−": 2.7, "C+": 2.3,
  C: 2.0, "C−": 1.7, "D+": 1.3, D: 1.0, "D−": 0.7, F: 0.0,
};
/** Example scale with A+ = 4.0 (college and high school pages). */
export const PLUS_EXAMPLE_SCALE: GradeScale = { "A+": 4.0, ...EXAMPLE_SCALE };

export const isNonGpa = (g: string): g is NonGpaGrade => g === "P" || g === "NP" || g === "W";

export interface ClassRow {
  name?: string;
  grade: GradeOption | "";
  /** Raw credits text as typed. */
  credits: string;
}

/** Where a row lives: class number (1-based) and optional semester number. */
export interface RowRef {
  index: number;
  semester?: number;
}

export interface IncludedRow extends RowRef {
  grade: LetterGrade;
  points: number;
  credits: number;
  qualityPoints: number;
}

export type ExcludeReason = "pass" | "nopass" | "withdrawal" | "replaced";
export interface ExcludedRow extends RowRef {
  grade: GradeOption;
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
  /** Credits on all non-blank rows (counted + not counted). */
  totalCredits: number;
}
export interface GpaEmpty { kind: "empty" }
export type RowErrorCode = "credits" | "grade";
export interface RowError extends RowRef { code: RowErrorCode; message: string }
export interface GpaError { kind: "error"; errors: RowError[] }
export type GpaOutcome = GpaResult | GpaEmpty | GpaError;

export interface GpaOptions {
  scale?: GradeScale;
  equalWeight?: boolean;
}

/** A row plus its reference and an optional forced exclusion (e.g. replaced retake). */
export interface CalcItem extends ClassRow, RowRef {
  forceExclude?: ExcludeReason;
}

export function parseNumber(raw: string): number | null {
  const t = raw.trim();
  if (t === "" || !/^-?(\d+\.?\d*|\.\d+)$/.test(t)) return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}
export const parseCredits = parseNumber;

const NON_GPA_REASON: Record<NonGpaGrade, ExcludeReason> = { P: "pass", NP: "nopass", W: "withdrawal" };

type ValidItem =
  | { kind: "skip" }
  | { kind: "error"; error: RowError }
  | { kind: "ok"; item: CalcItem; credits: number };

/** Validate one row. Blank rows are skipped. */
export function validateItem(item: CalcItem, equal: boolean): ValidItem {
  const ref: RowRef = item.semester === undefined ? { index: item.index } : { index: item.index, semester: item.semester };
  const hasGrade = item.grade !== "";
  const hasCredits = item.credits.trim() !== "";
  if (!hasGrade && (equal || !hasCredits)) return { kind: "skip" };
  if (!hasGrade) return { kind: "error", error: { ...ref, code: "grade", message: `Class ${item.index}: choose a grade.` } };
  if (equal) return { kind: "ok", item, credits: 1 };
  const c = parseNumber(item.credits);
  if (c === null || c <= 0) {
    return { kind: "error", error: { ...ref, code: "credits", message: `Class ${item.index}: enter credits greater than 0.` } };
  }
  return { kind: "ok", item, credits: c };
}

/** Core: compute a GPA result from referenced items. */
export function calculateItems(items: CalcItem[], opts: GpaOptions = {}): GpaOutcome {
  const scale = opts.scale ?? EXAMPLE_SCALE;
  const equal = opts.equalWeight ?? false;
  const included: IncludedRow[] = [];
  const excluded: ExcludedRow[] = [];
  const errors: RowError[] = [];

  for (const it of items) {
    const v = validateItem(it, equal);
    if (v.kind === "skip") continue;
    if (v.kind === "error") {
      errors.push(v.error);
      continue;
    }
    const ref: RowRef = it.semester === undefined ? { index: it.index } : { index: it.index, semester: it.semester };
    const g = it.grade as GradeOption;
    if (it.forceExclude) {
      excluded.push({ ...ref, grade: g, credits: v.credits, reason: it.forceExclude });
      continue;
    }
    if (isNonGpa(g)) {
      excluded.push({ ...ref, grade: g, credits: v.credits, reason: NON_GPA_REASON[g] });
      continue;
    }
    const points = scale[g] ?? 0;
    included.push({ ...ref, grade: g, points, credits: v.credits, qualityPoints: points * v.credits });
  }

  if (errors.length) return { kind: "error", errors };
  return buildResult(included, excluded);
}

export function buildResult(included: IncludedRow[], excluded: ExcludedRow[]): GpaResult | GpaEmpty {
  const numerator = included.reduce((s, r) => s + r.qualityPoints, 0);
  const denominator = included.reduce((s, r) => s + r.credits, 0);
  if (denominator === 0) return { kind: "empty" };
  const totalCredits = denominator + excluded.reduce((s, r) => s + r.credits, 0);
  return { kind: "result", value: numerator / denominator, numerator, denominator, included, excluded, warnings: [], totalCredits };
}

export function calculateGpa(rows: ClassRow[], opts: GpaOptions = {}): GpaOutcome {
  return calculateItems(rows.map((r, i) => ({ ...r, index: i + 1 })), opts);
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
