import { describe, expect, it } from "vitest";
import { calculateGpa, formatGpa, type ClassRow } from "./gpa";

const r = (grade: ClassRow["grade"], credits: string): ClassRow => ({ grade, credits });

describe("calculateGpa", () => {
  it("A x 3 + B x 4 → 24 / 7 → 3.43", () => {
    const out = calculateGpa([r("A", "3"), r("B", "4")]);
    if (out.kind !== "result") throw new Error(out.kind);
    expect(out.numerator).toBe(24);
    expect(out.denominator).toBe(7);
    expect(formatGpa(out.value)).toBe("3.43");
  });

  it("A and F at 3, one P, one blank → 12 / 6 = 2.00", () => {
    const out = calculateGpa([r("A", "3"), r("F", "3"), r("P", "3"), r("", "")]);
    if (out.kind !== "result") throw new Error(out.kind);
    expect(out.numerator).toBe(12);
    expect(out.denominator).toBe(6);
    expect(formatGpa(out.value)).toBe("2.00");
    expect(out.excluded).toEqual([{ index: 3, grade: "P", credits: 3, reason: "pass" }]);
  });

  it("a single F → 0.00", () => {
    const out = calculateGpa([r("F", "3")]);
    if (out.kind !== "result") throw new Error(out.kind);
    expect(formatGpa(out.value)).toBe("0.00");
  });

  it("no classes → empty state", () => {
    expect(calculateGpa([r("", ""), r("", ""), r("", "")])).toEqual({ kind: "empty" });
    expect(calculateGpa([])).toEqual({ kind: "empty" });
  });

  it("decimal credits: A x 1.5 + B x 0.5 → 7.5 / 2 = 3.75", () => {
    const out = calculateGpa([r("A", "1.5"), r("B", "0.5")]);
    if (out.kind !== "result") throw new Error(out.kind);
    expect(out.numerator).toBe(7.5);
    expect(out.denominator).toBe(2);
    expect(formatGpa(out.value)).toBe("3.75");
  });

  it("zero or negative credits → error naming the row", () => {
    expect(calculateGpa([r("A", "3"), r("B", "0")])).toEqual({
      kind: "error",
      errors: [{ index: 2, code: "credits", message: "Class 2: enter credits greater than 0." }],
    });
    const neg = calculateGpa([r("A", "-1")]);
    expect(neg.kind === "error" && neg.errors[0]?.message).toBe("Class 1: enter credits greater than 0.");
  });

  it("credits with no grade → choose a grade", () => {
    const out = calculateGpa([r("A", "3"), r("", "4")]);
    expect(out.kind === "error" && out.errors[0]?.message).toBe("Class 2: choose a grade.");
  });

  it('"All classes count equally" with A, B, C → 3.00', () => {
    const out = calculateGpa([r("A", ""), r("B", ""), r("C", "")], { equalWeight: true });
    if (out.kind !== "result") throw new Error(out.kind);
    expect(formatGpa(out.value)).toBe("3.00");
  });
});
