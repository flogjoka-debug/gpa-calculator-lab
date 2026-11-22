import { describe, expect, it } from "vitest";
import { formatGpa } from "./gpa";
import { calculateSemesters } from "./semesters";
import { calculateCumulative } from "./cumulative";
import { calculateHighSchool } from "./highschool";

describe("SEO phase 2 example arithmetic", () => {
  it("college: A×3, B+×4, A−×1 and C×3 yield 34.9/11 = 3.17", () => {
    const { overall } = calculateSemesters([{ name: "Semester 1", rows: [
      { grade: "A", credits: "3" }, { grade: "B+", credits: "4" },
      { grade: "A−", credits: "1" }, { grade: "C", credits: "3" },
    ] }]);
    if (overall.kind !== "result") throw new Error(overall.kind);
    expect(overall.included.map((row) => row.qualityPoints)).toEqual([12, 13.2, 3.7, 6]);
    expect(overall.numerator).toBeCloseTo(34.9);
    expect(overall.denominator).toBe(11);
    expect(formatGpa(overall.value)).toBe("3.17");
  });

  it("cumulative: 60 credits at 3.0 plus 15 at 4.0 yield 240/75 = 3.20", () => {
    const out = calculateCumulative({ mode: "gpa", gpa: "3.0", credits: "60" }, [{ mode: "summary", gpa: "4.0", credits: "15" }]);
    if (out.kind !== "result") throw new Error(out.kind);
    expect([out.numerator, out.denominator, formatGpa(out.value)]).toEqual([240, 75, "3.20"]);
  });

  it.each([
    ["A", 4, 4.5, 5], ["B", 3, 3.5, 4], ["C", 2, 2.5, 3],
  ] as const)("weighted scale for %s matches Regular, Honors and AP/IB", (grade, regular, honors, ap) => {
    for (const [level, expected] of [["Regular", regular], ["Honors", honors], ["AP", ap], ["IB", ap]] as const) {
      const out = calculateHighSchool([{ grade, level, credits: "1" }]);
      if (out.kind !== "result") throw new Error(out.kind);
      expect(out.weighted.value).toBe(expected);
    }
  });
});