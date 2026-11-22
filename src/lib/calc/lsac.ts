// LSAC GPA rules. Source: docs/policy-uc-lsac.md (checked 2026-11-22). Never imported by gpa.ts.
export const LSAC_SOURCE = "https://www.lsac.org/applying-law-school/jd-application-process/cas/requesting/transcript-summarization";
export const LSAC_DUAL_SOURCE = "https://www.lsac.org/blog/providing-more-time-adjust-lsac-gpa-changes";

export const LSAC_SCALE = {
  "A+": 4.33, A: 4.0, "A−": 3.67, AB: 3.5, "B+": 3.33, B: 3.0, "B−": 2.67, BC: 2.5, "C+": 2.33, C: 2.0, "C−": 1.67,
  CD: 1.5, "D+": 1.33, D: 1.0, "D−": 0.67, DE: 0.5, DF: 0.5, E: 0, F: 0,
} as const;
export type LsacLetter = keyof typeof LSAC_SCALE;
export const LSAC_LETTERS = Object.keys(LSAC_SCALE) as LsacLetter[];
export const LSAC_OTHER = ["W", "I", "P", "NP", "WF"] as const;
export type LsacGrade = LsacLetter | (typeof LSAC_OTHER)[number];
export type Cycle = "2026-27" | "2027-28";
export const QUARTER_TO_SEMESTER = 0.67;

export interface LsacRow {
  grade: LsacGrade | "";
  credits: string | number;
  units: "semester" | "quarter";
  dualEnrollment: boolean;
  afterFirstBachelors: boolean;
  /** For W, WF and I: the school treats it as a failing grade. */
  punitive: boolean;
}

export const EXCLUDE_REASON = {
  dual: "Dual enrollment: excluded from the LSAC GPA starting with the 2027–2028 cycle",
  after: "After the first bachelor's degree: not counted",
  nonpunitive: "Not treated as failing by your school: not counted",
  pass: "Passing grade in a pass/fail class: not counted",
} as const;

export interface LsacIncluded { index: number; grade: LsacGrade; value: number; hours: number; qualityPoints: number }
export interface LsacExcluded { index: number; grade: LsacGrade; reason: string }
export type LsacOutput =
  | { kind: "no-cycle"; message: "Choose your application cycle." }
  | { kind: "error"; index: number; code: "credits"; message: string }
  | { kind: "empty"; excluded: LsacExcluded[] }
  | { kind: "result"; gpa: number; qualityPoints: number; hours: number; included: LsacIncluded[]; excluded: LsacExcluded[] };

const r2 = (n: number) => Math.round(n * 100 + 1e-9) / 100;

export function calculateLsac(rows: LsacRow[], cycle: Cycle | ""): LsacOutput {
  if (!cycle) return { kind: "no-cycle", message: "Choose your application cycle." };
  const included: LsacIncluded[] = [];
  const excluded: LsacExcluded[] = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]!;
    const index = i + 1;
    if (!row.grade) continue;
    const c = typeof row.credits === "number" ? row.credits : Number(String(row.credits).trim());
    if (String(row.credits).trim() === "" || !Number.isFinite(c) || c <= 0)
      return { kind: "error", index, code: "credits", message: `Class ${index}: enter credits greater than 0.` };
    const g = row.grade;
    if (row.afterFirstBachelors) { excluded.push({ index, grade: g, reason: EXCLUDE_REASON.after }); continue; }
    if (row.dualEnrollment && cycle !== "2026-27") { excluded.push({ index, grade: g, reason: EXCLUDE_REASON.dual }); continue; }
    if (g === "P") { excluded.push({ index, grade: g, reason: EXCLUDE_REASON.pass }); continue; }
    if ((g === "W" || g === "WF" || g === "I") && !row.punitive) { excluded.push({ index, grade: g, reason: EXCLUDE_REASON.nonpunitive }); continue; }
    const value = g in LSAC_SCALE ? LSAC_SCALE[g as LsacLetter] : 0; // NP and punitive W/WF/I count as 0.00
    const hours = r2(row.units === "quarter" ? c * QUARTER_TO_SEMESTER : c);
    included.push({ index, grade: g, value, hours, qualityPoints: r2(value * hours) });
  }
  if (!included.length) return { kind: "empty", excluded };
  const qp = r2(included.reduce((s, r) => s + r.qualityPoints, 0));
  const hours = r2(included.reduce((s, r) => s + r.hours, 0));
  return { kind: "result", gpa: qp / hours, qualityPoints: qp, hours, included, excluded };
}
