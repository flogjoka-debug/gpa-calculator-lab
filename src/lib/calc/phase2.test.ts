import { describe, expect, it } from "vitest";
import { formatGpa, type ClassRow } from "./gpa";
import { calculateSemesters } from "./semesters";
import { compareRetakePolicies, type RetakeItem } from "./retake";
import { calculateHighSchool, type HsRow } from "./highschool";
import { calculateCumulative } from "./cumulative";

const r = (grade: ClassRow["grade"], credits: string): ClassRow => ({ grade, credits });

describe("college (semesters)", () => {
  it("A x 3 + B x 4 → 24 / 7 → 3.43", () => {
    const { overall, semesters } = calculateSemesters([{ name: "Semester 1", rows: [r("A", "3"), r("B", "4")] }]);
    if (overall.kind !== "result") throw new Error(overall.kind);
    expect([overall.numerator, overall.denominator, formatGpa(overall.value)]).toEqual([24, 7, "3.43"]);
    expect(semesters[0]?.kind).toBe("result");
  });
  it("overall spans semesters", () => {
    const { overall } = calculateSemesters([
      { name: "Fall", rows: [r("A", "3")] },
      { name: "Spring", rows: [r("F", "3")] },
    ]);
    expect(overall.kind === "result" && formatGpa(overall.value)).toBe("2.00");
  });
  it("decimal credits, blank rows and a P row behave as in gpa.ts", () => {
    const { overall } = calculateSemesters([{ name: "S", rows: [r("A", "1.5"), r("B", "0.5"), r("", ""), r("P", "3")] }]);
    if (overall.kind !== "result") throw new Error(overall.kind);
    expect([overall.numerator, overall.denominator, formatGpa(overall.value)]).toEqual([7.5, 2, "3.75"]);
    expect(overall.excluded[0]?.reason).toBe("pass");
  });
});

describe("retake", () => {
  it("D then A, 3 credits each → both 15/6 = 2.50, replace 12/3 = 4.00, input unchanged", () => {
    const rows: RetakeItem[] = [
      { id: "a", index: 1, grade: "D", credits: "3" },
      { id: "b", index: 2, grade: "A", credits: "3", retakeOf: "a" },
    ];
    const snapshot = JSON.parse(JSON.stringify(rows));
    const out = compareRetakePolicies(rows);
    if (out.countBoth.kind !== "result" || out.replaceEarlier.kind !== "result") throw new Error("no result");
    expect([out.countBoth.numerator, out.countBoth.denominator, formatGpa(out.countBoth.value)]).toEqual([15, 6, "2.50"]);
    expect([out.replaceEarlier.numerator, out.replaceEarlier.denominator, formatGpa(out.replaceEarlier.value)]).toEqual([12, 3, "4.00"]);
    expect(out.replaceEarlier.excluded).toEqual([{ index: 1, grade: "D", credits: 3, reason: "replaced" }]);
    expect(rows).toEqual(snapshot);
  });
});

describe("high school", () => {
  const h = (grade: HsRow["grade"], level: HsRow["level"], credits = "1"): HsRow => ({ grade, level, credits });
  it("A Regular + B AP → unweighted 3.50, weighted 4.00", () => {
    const out = calculateHighSchool([h("A", "Regular"), h("B", "AP")]);
    if (out.kind !== "result") throw new Error(out.kind);
    expect(formatGpa(out.unweighted.value)).toBe("3.50");
    expect(formatGpa(out.weighted.value)).toBe("4.00");
    expect(out.bonusClasses).toBe(1);
  });
  it("noBonusForDF: D in AP → weighted points 1.0", () => {
    const on = calculateHighSchool([h("D", "AP")], { noBonusForDF: true });
    const off = calculateHighSchool([h("D", "AP")]);
    expect(on.kind === "result" && on.classes[0]?.weightedPoints).toBe(1.0);
    expect(off.kind === "result" && off.classes[0]?.weightedPoints).toBe(2.0);
  });
});

describe("cumulative", () => {
  it("exact: 54 over 18, then 24 over 6 → 78/24 = 3.25, estimate false", () => {
    const out = calculateCumulative({ mode: "exact", qualityPoints: "54", credits: "18" }, [{ mode: "summary", gpa: "4.0", credits: "6" }]);
    if (out.kind !== "result") throw new Error(out.kind);
    expect([out.numerator, out.denominator, formatGpa(out.value), out.estimate]).toEqual([78, 24, "3.25", false]);
    expect(formatGpa(out.change ?? NaN)).toBe("0.25");
  });
  it("exact with class rows for the new semester", () => {
    const out = calculateCumulative({ mode: "exact", qualityPoints: "54", credits: "18" }, [{ mode: "rows", rows: [r("A", "3"), r("A", "3")] }]);
    expect(out.kind === "result" && formatGpa(out.value)).toBe("3.25");
  });
  it("rounded GPA: 3.0 x 18 then 4.0 x 6 → 3.25, estimate true", () => {
    const out = calculateCumulative({ mode: "gpa", gpa: "3.0", credits: "18" }, [{ mode: "summary", gpa: "4.0", credits: "6" }]);
    if (out.kind !== "result") throw new Error(out.kind);
    expect([formatGpa(out.value), out.estimate]).toEqual(["3.25", true]);
  });
  it("zero prior credits with a prior GPA → error naming the field", () => {
    const out = calculateCumulative({ mode: "gpa", gpa: "3.0", credits: "0" }, [{ mode: "summary", gpa: "4.0", credits: "6" }]);
    if (out.kind !== "error") throw new Error(out.kind);
    expect(out.fieldErrors[0]).toEqual({ field: "priorCredits", message: "GPA credits so far: enter credits greater than 0." });
  });
});
