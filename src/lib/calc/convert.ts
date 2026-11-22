// Linear GPA scale conversion: GPA × target scale ÷ source scale. An estimate, as UTA and the University of Arizona note.
import { parseNumber } from "./gpa";

export const COMMON_SCALES = [4, 4.33, 4.5, 5, 6, 7, 10, 20] as const;

export type ConvertField = "gpa" | "from" | "to";
export type ConvertOutcome =
  | { kind: "result"; value: number; gpa: number; from: number; to: number }
  | { kind: "error"; field: ConvertField; message: string }
  | { kind: "empty" };

export function convertGpa(gpaRaw: string, fromRaw: string, toRaw = "4"): ConvertOutcome {
  if (gpaRaw.trim() === "") return { kind: "empty" };
  const gpa = parseNumber(gpaRaw);
  const from = parseNumber(fromRaw);
  const to = parseNumber(toRaw);
  if (from === null || from <= 0) return { kind: "error", field: "from", message: "Your scale: enter the top of your scale, such as 5 or 10." };
  if (to === null || to <= 0) return { kind: "error", field: "to", message: "Convert to: enter the top of the scale you want, such as 4." };
  if (gpa === null || gpa < 0) return { kind: "error", field: "gpa", message: "Your GPA: enter a GPA of 0 or more." };
  if (gpa > from) return { kind: "error", field: "gpa", message: `Your GPA: a ${gpaRaw.trim()} can't be higher than the top of a ${fromRaw.trim()} scale.` };
  return { kind: "result", value: (gpa * to) / from, gpa, from, to };
}
