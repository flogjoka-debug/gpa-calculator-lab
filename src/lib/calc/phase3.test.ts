import { describe, expect, it } from "vitest";
import { COMMON_SCALE, customFrom, letterFor, validateScale, type ScaleProfile } from "./scale";
import { calculateCategories, calculatePoints } from "./grade";
import { calculateSemester } from "./semester";
import { calculateFinal } from "./final";
import { fmtNum } from "./format";

describe("percentage to letter", () => {
  it("87.00 → B+, 89.99 → B+, 90.00 → A−", () => {
    expect(letterFor(87.0, COMMON_SCALE).letter).toBe("B+");
    expect(letterFor(89.99, COMMON_SCALE).letter).toBe("B+");
    expect(letterFor(90.0, COMMON_SCALE).letter).toBe("A−");
    const r = letterFor(89.99, COMMON_SCALE);
    expect(r.rangeText).toBe("87 to under 90");
    expect(r.next?.letter).toBe("A−");
    expect(fmtNum(r.next?.away ?? 0)).toBe("0.01");
  });
  it("A− cutoff 89.5 makes 89.99 → A− (table row and result use the same profile)", () => {
    const custom = customFrom(COMMON_SCALE);
    custom.rows[1]!.min = 89.5;
    expect(validateScale(custom)).toBeNull();
    const res = letterFor(89.99, custom);
    expect(res.letter).toBe("A−");
    expect(custom.rows[res.row]?.letter).toBe("A−");
    expect(letterFor(89.99, COMMON_SCALE).letter).toBe("B+");
  });
  it("gap: B ends at 83, B− starts at 81.9 → error naming the row", () => {
    const gap: ScaleProfile = customFrom(COMMON_SCALE);
    gap.rows[4] = { letter: "B−", min: 80, points: 2.7, max: 81.9 };
    const err = validateScale(gap);
    expect(err?.letter).toBe("B−");
    expect(err?.row).toBe(4);
  });
});

describe("grade calculator", () => {
  it("points 18/20 and 30/40 → 48/60 = 80%", () => {
    const out = calculatePoints([{ earned: "18", possible: "20" }, { earned: "30", possible: "40" }]);
    if (out.kind !== "result") throw new Error(out.kind);
    expect([out.numerator, out.denominator, out.value]).toEqual([48, 60, 80]);
  });
  it("categories 80% at 40 + 90% at 60 → 86%", () => {
    const out = calculateCategories([{ average: "80", weight: "40" }, { average: "90", weight: "60" }]);
    expect(out.kind === "result" && Math.round(out.value * 1e9) / 1e9).toBe(86);
  });
  it("blank category: 80% at 40, 60 blank → 80%, coveredWeight 40", () => {
    const out = calculateCategories([{ average: "80", weight: "40" }, { average: "", weight: "60" }]);
    if (out.kind !== "result") throw new Error(out.kind);
    expect(Math.round(out.value * 1e9) / 1e9).toBe(80);
    expect(out.coveredWeight).toBe(40);
  });
  it("identical scores with different weights give the same average", () => {
    const out = calculateCategories([{ average: "80", weight: "30" }, { average: "80", weight: "70" }]);
    expect(out.kind === "result" && Math.round(out.value * 1e9) / 1e9).toBe(80);
  });
  it("weights over 100% → error naming the category; a 0 is a real score", () => {
    const out = calculateCategories([{ average: "80", weight: "60" }, { average: "90", weight: "50" }]);
    expect(out.kind === "error" && out.errors[0]?.message).toBe("Category 2: weights add up to more than 100%.");
    const zero = calculatePoints([{ earned: "0", possible: "10" }, { earned: "10", possible: "10" }]);
    expect(zero.kind === "result" && zero.value).toBe(50);
  });
});

describe("semester grade", () => {
  it("90, 80, exam 70 at 40/40/20 → 82%", () => {
    const out = calculateSemester(
      [{ name: "Q1", grade: "90", weight: "40" }, { name: "Q2", grade: "80", weight: "40" }, { name: "Exam", grade: "70", weight: "20" }],
      2,
      COMMON_SCALE,
    );
    expect(out.kind === "result" && Math.round(out.value * 1e9) / 1e9).toBe(82);
  });
  it("blank exam → needed score per letter", () => {
    const out = calculateSemester(
      [{ name: "Q1", grade: "90", weight: "40" }, { name: "Q2", grade: "80", weight: "40" }, { name: "Exam", grade: "", weight: "20" }],
      2,
      COMMON_SCALE,
    );
    if (out.kind !== "needed") throw new Error(out.kind);
    expect(out.rows.map((r) => [r.letter, r.needed, r.reachable])).toEqual([
      ["A", 125, false], ["B", 75, true], ["C", 25, true], ["D", 0, true],
    ]);
  });
});

describe("final grade", () => {
  it("85 → 90 with 40% final → 97.5", () => {
    const out = calculateFinal("85", "90", "40");
    if (out.kind !== "result") throw new Error(out.kind);
    expect([out.needed, out.state, Math.round(out.maxCourse * 1e9) / 1e9, Math.round(out.minCourse * 1e9) / 1e9]).toEqual([97.5, "normal", 91, 51]);
  });
  it("80 → 90 with 20% final → 130, unreachable, max 84", () => {
    const out = calculateFinal("80", "90", "20");
    if (out.kind !== "result") throw new Error(out.kind);
    expect([out.needed, out.state, Math.round(out.maxCourse * 1e9) / 1e9]).toEqual([130, "unreachable", 84]);
  });
  it("w = 0, w = 1 and already reached", () => {
    expect(calculateFinal("85", "90", "0").kind === "result" && (calculateFinal("85", "90", "0") as { state: string }).state).toBe("noEffect");
    const one = calculateFinal("85", "90", "100");
    expect(one.kind === "result" && [one.needed, one.state]).toEqual([90, "normal"]);
    const done = calculateFinal("95", "70", "20");
    expect(done.kind === "result" && done.state).toBe("reached");
  });
  it("rounding: 85 → 90 with 30% → 101.666… shown as 101.7, unreachable", () => {
    const out = calculateFinal("85", "90", "30");
    if (out.kind !== "result") throw new Error(out.kind);
    expect(out.neededExact).toBeCloseTo(101.6667, 3);
    expect([out.needed, out.state]).toEqual([101.7, "unreachable"]);
  });
});
