import { describe, expect, it } from "vitest";
import { COMMON_SCALE, letterFor } from "./scale";
import { calculateCategories } from "./grade";
import { calculateSemester } from "./semester";
import { calculateFinal } from "./final";

const MSG = "Enter a percentage from 0 to 150.";
const msgs = (o: { kind: string }) => ("errors" in o ? (o.errors as { message: string }[]).map((e) => e.message) : []);

describe("percentages up to 150 (extra credit)", () => {
  it("Percentage to Letter: 100.5 → top letter with the extra-credit range line", () => {
    const r = letterFor(100.5, COMMON_SCALE);
    expect(r.letter).toBe("A");
    expect(r.overTop).toBe(true);
    expect(r.rangeText).toBe("A covers 93 and above. Scores over 100 usually mean extra credit.");
  });
  it("Percentage to Letter: exactly 100 keeps the normal range", () => {
    expect(letterFor(100, COMMON_SCALE).rangeText).toBe("93 to 100");
  });
  it("Grade: category average 100.5 accepted, 151 rejected", () => {
    expect(calculateCategories([{ average: "100.5", weight: "100" }]).kind).toBe("result");
    expect(msgs(calculateCategories([{ average: "151", weight: "100" }]))).toEqual([MSG]);
  });
  it("Semester: grade 100.5 accepted, 151 rejected", () => {
    const rows = (g: string) => [{ name: "Q1", grade: g, weight: "50" }, { name: "Q2", grade: "90", weight: "50" }];
    expect(calculateSemester(rows("100.5"), null, COMMON_SCALE).kind).toBe("result");
    expect(msgs(calculateSemester(rows("151"), null, COMMON_SCALE))).toEqual([MSG]);
  });
  it("Final: current and target 100.5 accepted, 151 rejected", () => {
    expect(calculateFinal("100.5", "100.5", "20").kind).toBe("result");
    expect(msgs(calculateFinal("151", "90", "20"))).toEqual([MSG]);
    expect(msgs(calculateFinal("90", "151", "20"))).toEqual([MSG]);
  });
});
