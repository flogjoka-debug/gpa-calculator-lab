// UC GPA rules. Source: docs/policy-uc-lsac.md (checked 2026-11-22). Never imported by gpa.ts.
export const UC_SOURCE = "https://admission.universityofcalifornia.edu/admission-requirements/first-year-requirements/gpa-requirement.html";

export type UcGrade = "A" | "B" | "C" | "D" | "F";
export type UcGradeLevel = 10 | 11 | "summer-after-9" | "summer-after-10" | "summer-after-11";
export type UcHonorsType = "none" | "AP" | "IB-HL" | "IB-SL-designated" | "college" | "UC-honors" | "school-honors";
export type Residency = "resident" | "nonresident";

export const UC_GRADE_OPTIONS = ["A+", "A", "A−", "B+", "B", "B−", "C+", "C", "C−", "D+", "D", "D−", "F"] as const;
export const UC_POINTS: Record<UcGrade, number> = { A: 4, B: 3, C: 2, D: 1, F: 0 };
export const UC_LEVELS: { value: UcGradeLevel; label: string }[] = [
  { value: 10, label: "10th grade" },
  { value: 11, label: "11th grade" },
  { value: "summer-after-9", label: "Summer after 9th" },
  { value: "summer-after-10", label: "Summer after 10th" },
  { value: "summer-after-11", label: "Summer after 11th" },
];
export const UC_HONORS: { value: UcHonorsType; label: string }[] = [
  { value: "none", label: "None" },
  { value: "AP", label: "AP" },
  { value: "IB-HL", label: "IB Higher Level" },
  { value: "IB-SL-designated", label: "IB Standard Level (designated)" },
  { value: "college", label: "College course (UC-transferable)" },
  { value: "UC-honors", label: "UC-certified honors" },
  { value: "school-honors", label: "School honors (not UC-certified)" },
];
export const UC_MINIMUM: Record<Residency, number> = { resident: 3.0, nonresident: 3.4 };

export type LostReason =
  | "Grade below C"
  | "Not eligible for nonresidents"
  | "Not UC-certified honors"
  | "Not an A-G course"
  | "10th-grade limit of 4 reached"
  | "8-point limit reached";

export interface UcRow { grade: string; gradeLevel: UcGradeLevel; honorsType: UcHonorsType; ag: boolean; name?: string }

/** Plus/minus are dropped: "A−", "B+" → plain letter. Returns null for anything else. */
export function normalizeUcGrade(raw: string): { grade: UcGrade; mapped: boolean } | null {
  const t = raw.trim().toUpperCase().replace(/[−–-]/g, "-");
  const m = /^([ABCDF])([+-])?$/.exec(t);
  if (!m || (m[1] === "F" && m[2])) return null;
  return { grade: m[1] as UcGrade, mapped: Boolean(m[2]) };
}

/** Summer after 9th or 10th → 10th grade; summer after 11th → 11th grade. */
export const ucYear = (l: UcGradeLevel): 10 | 11 => (l === 10 || l === "summer-after-9" || l === "summer-after-10" ? 10 : 11);

/** UC doesn't round: truncate to two decimals. */
export const truncate2 = (n: number) => Math.floor(n * 100 + 1e-9) / 100;
export const formatUc = (n: number) => truncate2(n).toFixed(2);

const NONRES_ELIGIBLE: UcHonorsType[] = ["AP", "IB-HL", "IB-SL-designated"];
const RES_ELIGIBLE: UcHonorsType[] = ["AP", "IB-HL", "IB-SL-designated", "college", "UC-honors"];

export interface UcRowOut {
  index: number;
  name: string;
  grade: UcGrade;
  mapped: boolean;
  gradeLevel: UcGradeLevel;
  year: 10 | 11;
  points: number;
  counted: boolean; // part of the GPA (A-G)
  honorsType: UcHonorsType;
  honors: "awarded" | "lost" | "none";
  reason?: LostReason;
}

export type UcOutput =
  | { kind: "empty" }
  | { kind: "error"; code: "residency" }
  | {
      kind: "result";
      rows: UcRowOut[];
      count: number;
      gradePoints: number;
      honorsPoints: number;
      unweighted: number;
      weighted: number;
      awarded: UcRowOut[];
      lost: UcRowOut[];
      hasF: boolean;
      repeated: boolean;
      minimum: number;
      meetsMinimum: boolean;
      minimumStatus: "above" | "meets" | "below";
    };

export function calculateUc(input: UcRow[], residency: Residency | ""): UcOutput {
  const rows: UcRowOut[] = [];
  input.forEach((r, i) => {
    const g = normalizeUcGrade(r.grade);
    if (!g) return;
    rows.push({
      index: i + 1, name: (r.name ?? "").trim(), grade: g.grade, mapped: g.mapped, gradeLevel: r.gradeLevel,
      year: ucYear(r.gradeLevel), points: UC_POINTS[g.grade], counted: r.ag, honorsType: r.honorsType, honors: "none",
    });
  });
  if (!residency) return { kind: "error", code: "residency" };
  const counted = rows.filter((r) => r.counted);
  if (!counted.length) return { kind: "empty" };

  const eligible = residency === "resident" ? RES_ELIGIBLE : NONRES_ELIGIBLE;
  const candidates: UcRowOut[] = [];
  for (const r of rows) {
    if (r.honorsType === "none") continue;
    if (!r.counted) { r.honors = "lost"; r.reason = "Not an A-G course"; continue; }
    if (!eligible.includes(r.honorsType)) {
      if (residency === "nonresident") { r.honors = "lost"; r.reason = "Not eligible for nonresidents"; continue; }
      r.honors = "lost"; r.reason = "Not UC-certified honors"; continue;
    }
    if (r.points < 2) { r.honors = "lost"; r.reason = "Grade below C"; continue; }
    candidates.push(r);
  }
  let total = 0;
  let tenth = 0;
  for (const r of candidates.filter((c) => c.year === 10)) {
    if (tenth < 4 && total < 8) { r.honors = "awarded"; tenth++; total++; }
    else { r.honors = "lost"; r.reason = "10th-grade limit of 4 reached"; }
  }
  for (const r of candidates.filter((c) => c.year === 11)) {
    if (total < 8) { r.honors = "awarded"; total++; }
    else { r.honors = "lost"; r.reason = "8-point limit reached"; }
  }

  const gradePoints = counted.reduce((s, r) => s + r.points, 0);
  const n = counted.length;
  const names = new Map<string, Set<number>>();
  const nameCount = new Map<string, number>();
  for (const r of rows) {
    if (!r.name) continue;
    const k = r.name.toLowerCase();
    names.set(k, (names.get(k) ?? new Set()).add(r.year));
    nameCount.set(k, (nameCount.get(k) ?? 0) + 1);
  }
  const repeated = [...names.values()].some((s) => s.size > 1) || [...nameCount.values()].some((c) => c > 2);
  const weighted = (gradePoints + total) / n;
  return {
    kind: "result", rows, count: n, gradePoints, honorsPoints: total,
    unweighted: gradePoints / n, weighted,
    awarded: rows.filter((r) => r.honors === "awarded"), lost: rows.filter((r) => r.honors === "lost"),
    hasF: counted.some((r) => r.grade === "F"), repeated,
    minimum: UC_MINIMUM[residency], meetsMinimum: truncate2(weighted) >= UC_MINIMUM[residency],
    minimumStatus: truncate2(weighted) > UC_MINIMUM[residency] ? "above" : truncate2(weighted) === UC_MINIMUM[residency] ? "meets" : "below",
  };
}
