import {
  PLUS_EXAMPLE_SCALE,
  buildResult,
  calculateItems,
  type ClassRow,
  type GpaEmpty,
  type GpaError,
  type GpaResult,
  type GradeScale,
  type IncludedRow,
} from "./gpa";

export type Level = "Regular" | "Honors" | "AP" | "IB" | "Dual enrollment";
export const LEVELS: Level[] = ["Regular", "Honors", "AP", "IB", "Dual enrollment"];
export type BonusProfile = Record<Exclude<Level, "Regular">, number>;
export const EXAMPLE_BONUSES: BonusProfile = { Honors: 0.5, AP: 1.0, IB: 1.0, "Dual enrollment": 1.0 };

export interface HsRow extends ClassRow { level: Level }
export interface HsOptions { scale?: GradeScale; bonuses?: BonusProfile; noBonusForDF?: boolean }

export interface HsClass extends IncludedRow {
  name: string;
  level: Level;
  base: number;
  bonus: number;
  weightedPoints: number;
  weightedQualityPoints: number;
}
export interface HsResult {
  kind: "result";
  unweighted: GpaResult;
  weighted: GpaResult;
  classes: HsClass[];
  bonusClasses: number;
}
export type HsOutcome = HsResult | GpaEmpty | GpaError;

const isDorF = (g: string) => g.startsWith("D") || g === "F";

export function calculateHighSchool(rows: HsRow[], opts: HsOptions = {}): HsOutcome {
  const scale = opts.scale ?? PLUS_EXAMPLE_SCALE;
  const bonuses = opts.bonuses ?? EXAMPLE_BONUSES;
  const unweighted = calculateItems(rows.map((r, i) => ({ ...r, index: i + 1 })), { scale });
  if (unweighted.kind !== "result") return unweighted;

  const classes: HsClass[] = unweighted.included.map((inc) => {
    const row = rows[inc.index - 1];
    const level: Level = row?.level ?? "Regular";
    let bonus = level === "Regular" ? 0 : bonuses[level];
    if (opts.noBonusForDF && isDorF(inc.grade)) bonus = 0;
    const weightedPoints = inc.points + bonus;
    return {
      ...inc,
      name: row?.name ?? "",
      level,
      base: inc.points,
      bonus,
      weightedPoints,
      weightedQualityPoints: weightedPoints * inc.credits,
    };
  });
  const weighted = buildResult(
    classes.map((c) => ({ index: c.index, grade: c.grade, points: c.weightedPoints, credits: c.credits, qualityPoints: c.weightedQualityPoints })),
    unweighted.excluded,
  ) as GpaResult;
  return { kind: "result", unweighted, weighted, classes, bonusClasses: classes.filter((c) => c.bonus > 0).length };
}
