import { MAX_PERCENT, PERCENT_RANGE_MESSAGE } from "./format";
import { parseNumber } from "./gpa";

export interface PointsRow { name?: string; earned: string; possible: string }
export interface CategoryRow { name?: string; average: string; weight: string }
export interface GradeError { index: number; field: "earned" | "possible" | "average" | "weight"; message: string }

export interface GradeIncluded { index: number; a: number; b: number }
export interface GradeResult {
  kind: "result";
  mode: "points" | "categories";
  value: number;
  numerator: number;
  denominator: number;
  /** Graded weight in percent (categories) or 100 (points). */
  coveredWeight: number;
  totalWeight: number;
  included: GradeIncluded[];
  excluded: { index: number; reason: "blank" }[];
  warnings: string[];
}
export type GradeOutcome = GradeResult | { kind: "empty" } | { kind: "error"; errors: GradeError[] };

const TOL = 0.01;

export function calculatePoints(rows: PointsRow[]): GradeOutcome {
  const errors: GradeError[] = [];
  const included: GradeIncluded[] = [];
  const excluded: GradeResult["excluded"] = [];
  rows.forEach((r, i) => {
    const index = i + 1;
    const hasE = r.earned.trim() !== "";
    const hasP = r.possible.trim() !== "";
    if (!hasE && !hasP) return;
    const p = parseNumber(r.possible);
    if (!hasP || p === null || p <= 0) {
      errors.push({ index, field: "possible", message: `Assignment ${index}: enter points possible greater than 0.` });
      return;
    }
    if (!hasE) {
      excluded.push({ index, reason: "blank" });
      return;
    }
    const e = parseNumber(r.earned);
    if (e === null || e < 0) {
      errors.push({ index, field: "earned", message: `Assignment ${index}: enter points earned of 0 or more.` });
      return;
    }
    included.push({ index, a: e, b: p });
  });
  if (errors.length) return { kind: "error", errors };
  const num = included.reduce((s, r) => s + r.a, 0);
  const den = included.reduce((s, r) => s + r.b, 0);
  if (den === 0) return { kind: "empty" };
  return { kind: "result", mode: "points", value: (100 * num) / den, numerator: num, denominator: den, coveredWeight: 100, totalWeight: 100, included, excluded, warnings: [] };
}

export function calculateCategories(rows: CategoryRow[]): GradeOutcome {
  const errors: GradeError[] = [];
  const included: GradeIncluded[] = [];
  const excluded: GradeResult["excluded"] = [];
  let total = 0;
  rows.forEach((r, i) => {
    const index = i + 1;
    const hasA = r.average.trim() !== "";
    const hasW = r.weight.trim() !== "";
    if (!hasA && !hasW) return;
    const w = parseNumber(r.weight);
    if (!hasW || w === null || w <= 0) {
      errors.push({ index, field: "weight", message: `Category ${index}: enter a weight greater than 0.` });
      return;
    }
    total += w;
    if (total > 100 + TOL) {
      errors.push({ index, field: "weight", message: `Category ${index}: weights add up to more than 100%.` });
      return;
    }
    if (!hasA) {
      excluded.push({ index, reason: "blank" });
      return;
    }
    const a = parseNumber(r.average);
    if (a === null || a < 0) {
      errors.push({ index, field: "average", message: `Category ${index}: enter an average of 0 or more.` });
      return;
    }
    if (a > MAX_PERCENT) {
      errors.push({ index, field: "average", message: PERCENT_RANGE_MESSAGE });
      return;
    }
    included.push({ index, a, b: w });
  });
  if (errors.length) return { kind: "error", errors };
  const covered = included.reduce((s, r) => s + r.b, 0);
  if (covered === 0) return { kind: "empty" };
  const num = included.reduce((s, r) => s + r.a * (r.b / 100), 0);
  const den = covered / 100;
  return { kind: "result", mode: "categories", value: num / den, numerator: num, denominator: den, coveredWeight: covered, totalWeight: total, included, excluded, warnings: [] };
}

export const isFullCoverage = (r: GradeResult) => r.coveredWeight >= 100 - TOL;
