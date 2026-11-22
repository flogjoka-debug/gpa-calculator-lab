// Homepage all-in-one GPA engine: several terms, optional GPA so far, high school levels and a target planner.
// Pure functions, no UI imports.
import {
  EXAMPLE_SCALE,
  buildResult,
  calculateItems,
  parseNumber,
  type ClassRow,
  type GpaResult,
  type GradeScale,
  type IncludedRow,
  type ExcludedRow,
  type RowError,
} from "./gpa";
import { EXAMPLE_BONUSES, type BonusProfile, type Level } from "./highschool";

export type HomeMode = "college" | "highschool";
export interface HomeRow extends ClassRow { level?: Level }
export interface HomeTerm { name: string; rows: HomeRow[] }
export interface HomePrior { gpa: string; credits: string }
export interface HomeOptions { mode: HomeMode; scale?: GradeScale; bonuses?: BonusProfile; equalWeight?: boolean }

export interface TermResult {
  term: number;
  name: string;
  unweighted: GpaResult;
  /** Same as unweighted in college mode. */
  weighted: GpaResult;
  bonusClasses: number;
}
export interface HomeResult {
  kind: "result";
  mode: HomeMode;
  terms: TermResult[];
  /** All entered terms together. */
  unweighted: GpaResult;
  weighted: GpaResult;
  /** Entered terms plus the GPA so far (null when no GPA so far was given). */
  cumulative: { value: number; numerator: number; denominator: number; priorGpa: number; priorCredits: number; change: number } | null;
  bonusClasses: number;
}
export type PriorFieldError = { field: "priorGpa" | "priorCredits"; message: string };
export type HomeOutcome =
  | HomeResult
  | { kind: "empty"; priorErrors: PriorFieldError[] }
  | { kind: "error"; rowErrors: RowError[]; priorErrors: PriorFieldError[] };

/** Parse the optional "GPA so far" pair. Both blank means no prior work. */
export function parsePrior(prior: HomePrior): { gpa: number; credits: number } | null | PriorFieldError[] {
  const g = prior.gpa.trim();
  const c = prior.credits.trim();
  if (g === "" && c === "") return null;
  const errs: PriorFieldError[] = [];
  const gv = parseNumber(g);
  const cv = parseNumber(c);
  if (gv === null || gv < 0) errs.push({ field: "priorGpa", message: "GPA so far: enter a GPA of 0 or more." });
  if (cv === null || cv <= 0) errs.push({ field: "priorCredits", message: "Credits so far: enter credits greater than 0." });
  if (errs.length || gv === null || cv === null) return errs;
  return { gpa: gv, credits: cv };
}

export function calculateHome(terms: HomeTerm[], prior: HomePrior, opts: HomeOptions): HomeOutcome {
  const scale = opts.scale ?? EXAMPLE_SCALE;
  const bonuses = opts.bonuses ?? EXAMPLE_BONUSES;
  const hs = opts.mode === "highschool";
  const rowErrors: RowError[] = [];
  const termResults: TermResult[] = [];
  const allIncluded: IncludedRow[] = [];
  const allWeighted: IncludedRow[] = [];
  const allExcluded: ExcludedRow[] = [];

  terms.forEach((t, ti) => {
    const semester = ti + 1;
    const out = calculateItems(
      t.rows.map((r, i) => ({ ...r, index: i + 1, semester })),
      { scale, equalWeight: opts.equalWeight ?? false },
    );
    if (out.kind === "error") return void rowErrors.push(...out.errors);
    if (out.kind !== "result") return;
    const weightedRows = out.included.map((inc) => {
      const level = t.rows[inc.index - 1]?.level ?? "Regular";
      const bonus = hs && level !== "Regular" ? bonuses[level] : 0;
      const points = inc.points + bonus;
      return { ...inc, points, qualityPoints: points * inc.credits };
    });
    const weighted = buildResult(weightedRows, out.excluded) as GpaResult;
    const bonusClasses = weightedRows.filter((w, i) => w.points > (out.included[i]?.points ?? 0)).length;
    termResults.push({ term: semester, name: t.name.trim() || `Term ${semester}`, unweighted: out, weighted, bonusClasses });
    allIncluded.push(...out.included);
    allWeighted.push(...weightedRows);
    allExcluded.push(...out.excluded);
  });

  const p = parsePrior(prior);
  const priorErrors = Array.isArray(p) ? p : [];
  if (rowErrors.length || priorErrors.length) return { kind: "error", rowErrors, priorErrors };

  const unweighted = buildResult(allIncluded, allExcluded);
  if (unweighted.kind !== "result") return { kind: "empty", priorErrors: [] };
  const weighted = buildResult(allWeighted, allExcluded) as GpaResult;
  const main = hs ? weighted : unweighted;

  let cumulative: HomeResult["cumulative"] = null;
  if (p && !Array.isArray(p)) {
    const numerator = p.gpa * p.credits + main.numerator;
    const denominator = p.credits + main.denominator;
    const value = numerator / denominator;
    cumulative = { value, numerator, denominator, priorGpa: p.gpa, priorCredits: p.credits, change: value - p.gpa };
  }
  return {
    kind: "result",
    mode: opts.mode,
    terms: termResults,
    unweighted,
    weighted,
    cumulative,
    bonusClasses: termResults.reduce((s, t) => s + t.bonusClasses, 0),
  };
}

export interface TargetPlan {
  kind: "plan";
  /** Average GPA needed over the next credits. */
  needed: number;
  reachable: boolean;
  /** The GPA right now already meets the target. */
  alreadyThere: boolean;
  /** Best GPA possible after the next credits, earning the top grade everywhere. */
  best: number;
  /** Terms of `nextCredits` at the top grade needed to reach the target (null when never reachable). */
  termsAtTop: number | null;
}
export type TargetOutcome = TargetPlan | { kind: "error"; field: "target" | "nextCredits"; message: string } | { kind: "empty" };

/**
 * Work backward from a target: needed = (target × (C + n) − QP) ÷ n.
 * `top` is the highest grade point a class can earn (4.0 on the example scale).
 */
export function planTarget(current: { numerator: number; denominator: number }, targetRaw: string, nextCreditsRaw: string, top = 4): TargetOutcome {
  if (targetRaw.trim() === "" && nextCreditsRaw.trim() === "") return { kind: "empty" };
  const target = parseNumber(targetRaw);
  const n = parseNumber(nextCreditsRaw);
  if (target === null || target < 0) return { kind: "error", field: "target", message: "Target GPA: enter a GPA of 0 or more." };
  if (n === null || n <= 0) return { kind: "error", field: "nextCredits", message: "Credits next term: enter credits greater than 0." };
  const { numerator: qp, denominator: c } = current;
  const needed = (target * (c + n) - qp) / n;
  const best = (qp + top * n) / (c + n);
  const current0 = c > 0 ? qp / c : 0;
  let termsAtTop: number | null = null;
  if (target <= top + 1e-9) {
    if (current0 >= target - 1e-9) termsAtTop = 0;
    else if (target < top - 1e-9) {
      // Smallest k with (qp + top·n·k) / (c + n·k) ≥ target  →  k ≥ (target·c − qp) / (n·(top − target))
      termsAtTop = Math.max(1, Math.ceil((target * c - qp) / (n * (top - target)) - 1e-9));
    }
  }
  return {
    kind: "plan",
    needed,
    reachable: needed <= top + 1e-9,
    alreadyThere: c > 0 && current0 >= target - 1e-9,
    best,
    termsAtTop,
  };
}
