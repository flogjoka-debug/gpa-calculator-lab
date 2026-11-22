import { parseNumber } from "./gpa";
import { MAX_PERCENT, PERCENT_RANGE_MESSAGE, ceil1 } from "./format";

export type FinalField = "current" | "target" | "weight";
export interface FinalError { field: FinalField; message: string }
export type FinalState = "normal" | "unreachable" | "reached" | "noEffect";
export interface FinalResult {
  kind: "result";
  state: FinalState;
  current: number;
  target: number;
  /** Weight as a fraction 0–1. */
  w: number;
  neededExact: number;
  /** Rounded UP at one decimal. */
  needed: number;
  maxCourse: number;
  minCourse: number;
}
export type FinalOutcome = FinalResult | { kind: "empty" } | { kind: "error"; errors: FinalError[] };

export function calculateFinal(currentRaw: string, targetRaw: string, weightRaw: string): FinalOutcome {
  if (!currentRaw.trim() && !targetRaw.trim() && !weightRaw.trim()) return { kind: "empty" };
  const errors: FinalError[] = [];
  const current = parseNumber(currentRaw);
  const target = parseNumber(targetRaw);
  const weight = parseNumber(weightRaw);
  if (current === null || current < 0) errors.push({ field: "current", message: "Current grade: enter 0 or more." });
  else if (current > MAX_PERCENT) errors.push({ field: "current", message: PERCENT_RANGE_MESSAGE });
  if (target === null || target < 0) errors.push({ field: "target", message: "Grade you want: enter 0 or more." });
  else if (target > MAX_PERCENT) errors.push({ field: "target", message: PERCENT_RANGE_MESSAGE });
  if (weight === null || weight < 0 || weight > 100) errors.push({ field: "weight", message: "Final exam weight: enter a number from 0 to 100." });
  if (errors.length || current === null || target === null || weight === null) return { kind: "error", errors };

  const w = weight / 100;
  const minCourse = current * (1 - w);
  const maxCourse = current * (1 - w) + 100 * w;
  if (w === 0) {
    return { kind: "result", state: "noEffect", current, target, w, neededExact: NaN, needed: NaN, maxCourse: current, minCourse: current };
  }
  const neededExact = (target - current * (1 - w)) / w;
  const needed = ceil1(neededExact);
  const state: FinalState = neededExact <= 0 ? "reached" : neededExact > 100 ? "unreachable" : "normal";
  return { kind: "result", state, current, target, w, neededExact, needed, maxCourse, minCourse };
}
