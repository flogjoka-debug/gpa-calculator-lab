import { fmtNum } from "./format";

/** One letter: everything from `min` up to (not including) the next letter's min. `max` is optional (exclusive). */
export interface ScaleRow { letter: string; min: number; points: number; max?: number }
export interface ScaleProfile { id: "common" | "ten" | "custom"; name: string; rows: ScaleRow[] }

export const COMMON_SCALE: ScaleProfile = {
  id: "common",
  name: "Common US scale (example)",
  rows: [
    { letter: "A", min: 93, points: 4.0 },
    { letter: "A−", min: 90, points: 3.7 },
    { letter: "B+", min: 87, points: 3.3 },
    { letter: "B", min: 83, points: 3.0 },
    { letter: "B−", min: 80, points: 2.7 },
    { letter: "C+", min: 77, points: 2.3 },
    { letter: "C", min: 73, points: 2.0 },
    { letter: "C−", min: 70, points: 1.7 },
    { letter: "D+", min: 67, points: 1.3 },
    { letter: "D", min: 63, points: 1.0 },
    { letter: "D−", min: 60, points: 0.7 },
    { letter: "F", min: 0, points: 0.0 },
  ],
};
export const TEN_POINT_SCALE: ScaleProfile = {
  id: "ten",
  name: "10-point scale (example)",
  rows: [
    { letter: "A", min: 90, points: 4.0 },
    { letter: "B", min: 80, points: 3.0 },
    { letter: "C", min: 70, points: 2.0 },
    { letter: "D", min: 60, points: 1.0 },
    { letter: "F", min: 0, points: 0.0 },
  ],
};
export const customFrom = (p: ScaleProfile): ScaleProfile => ({
  id: "custom",
  name: "Custom",
  rows: p.rows.map((r) => ({ ...r })),
});

/** Exclusive upper bound of row i (rows ordered high → low). Top row runs to 100. */
export const upperOf = (rows: ScaleRow[], i: number): number => rows[i]?.max ?? (i === 0 ? 100 : (rows[i - 1]?.min ?? 100));

export interface ScaleError { row: number; letter: string; message: string }

/** Ranges must cover 0–100 with no gap or overlap. Returns the first row to fix. */
export function validateScale(profile: ScaleProfile): ScaleError | null {
  const rows = profile.rows;
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i]!;
    if (!Number.isFinite(r.min) || r.min < 0 || r.min > 100) {
      return { row: i, letter: r.letter, message: `${r.letter}: enter a cutoff from 0 to 100.` };
    }
    if (i > 0) {
      const above = rows[i - 1]!;
      if (r.min >= above.min) {
        return { row: i, letter: r.letter, message: `${r.letter}: this cutoff overlaps ${above.letter}. Enter a number below ${fmtNum(above.min)}.` };
      }
      const top = upperOf(rows, i);
      if (top !== above.min) {
        const [a, b] = top < above.min ? [top, above.min] : [above.min, top];
        return {
          row: i,
          letter: r.letter,
          message: top < above.min
            ? `${r.letter}: this range leaves a gap from ${fmtNum(a)} to ${fmtNum(b)}.`
            : `${r.letter}: this range overlaps ${above.letter}.`,
        };
      }
    }
  }
  const last = rows[rows.length - 1];
  if (last && last.min !== 0) return { row: rows.length - 1, letter: last.letter, message: `${last.letter}: the lowest letter must start at 0.` };
  return null;
}

export interface LetterResult {
  row: number;
  letter: string;
  points: number;
  min: number;
  upper: number;
  isTop: boolean;
  rangeText: string;
  next: { letter: string; min: number; away: number } | null;
}

/** Full-precision lookup. A value exactly on a cutoff gets the higher letter. */
export function letterFor(percent: number, profile: ScaleProfile): LetterResult {
  const rows = profile.rows;
  let i = rows.findIndex((r) => percent >= r.min);
  if (i === -1) i = rows.length - 1;
  const r = rows[i]!;
  const upper = upperOf(rows, i);
  const above = i > 0 ? rows[i - 1]! : null;
  return {
    row: i,
    letter: r.letter,
    points: r.points,
    min: r.min,
    upper,
    isTop: i === 0,
    rangeText: i === 0 ? `${fmtNum(r.min)} to ${fmtNum(upper)}` : `${fmtNum(r.min)} to under ${fmtNum(upper)}`,
    next: above ? { letter: above.letter, min: above.min, away: above.min - percent } : null,
  };
}
