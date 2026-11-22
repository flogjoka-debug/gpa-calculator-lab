import { describe, expect, it } from "vitest";
import { calculateLsac, type LsacLetter } from "./lsac";

describe("SEO phase 4 LSAC conversion values", () => {
  it.each([
    ["A+", 4.33], ["A", 4], ["A−", 3.67], ["AB", 3.5],
    ["B+", 3.33], ["B", 3], ["B−", 2.67], ["BC", 2.5],
    ["C+", 2.33], ["C", 2], ["C−", 1.67], ["CD", 1.5],
    ["D+", 1.33], ["D", 1], ["D−", 0.67],
    ["DE", 0.5], ["DF", 0.5], ["E", 0], ["F", 0],
  ] satisfies [LsacLetter, number][])("%s contributes %s points per semester hour", (grade, value) => {
    const out = calculateLsac([{
      grade, credits: "1", units: "semester", dualEnrollment: false,
      afterFirstBachelors: false, punitive: false,
    }], "2026-27");
    if (out.kind !== "result") throw new Error(out.kind);
    expect(out.gpa).toBe(value);
    expect(out.qualityPoints).toBe(value);
    expect(out.hours).toBe(1);
  });

  it("4 quarter units convert to 2.68 semester hours", () => {
    const out = calculateLsac([{
      grade: "A", credits: "4", units: "quarter", dualEnrollment: false,
      afterFirstBachelors: false, punitive: false,
    }], "2026-27");
    if (out.kind !== "result") throw new Error(out.kind);
    expect(out.hours).toBe(2.68);
  });
});