/** Percentages may go up to 150 (extra credit). */
export const MAX_PERCENT = 150;
export const PERCENT_RANGE_MESSAGE = "Enter a percentage from 0 to 150.";
/** Round to at most `max` decimals and drop trailing zeros: 87 → "87", 89.5 → "89.5". */
export function fmtNum(n: number, max = 2): string {
  const f = 10 ** max;
  const v = Math.round(n * f) / f;
  return String(Object.is(v, -0) ? 0 : v);
}
export const fmtPct1 = (n: number) => n.toFixed(1);
/** Round UP at one decimal so the shown "needed" score is always enough. */
export const ceil1 = (n: number) => Math.ceil(n * 10 - 1e-9) / 10;
