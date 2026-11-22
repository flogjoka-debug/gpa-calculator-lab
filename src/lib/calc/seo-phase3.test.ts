import { describe, expect, it } from "vitest";
import { calculateCategories, calculatePoints } from "./grade";
import { calculateFinal } from "./final";
import { calculateSemester } from "./semester";
import { COMMON_SCALE, TEN_POINT_SCALE, letterFor } from "./scale";

describe("SEO phase 3 example arithmetic", () => {
  it.each([
    ["A", 93, 125, false], ["B", 83, 75, true],
    ["C", 73, 25, true], ["D", 63, 0, true],
  ] as const)("approved Semester correction: %s at %s needs %s (reachable: %s)", (letter, target, needed, reachable) => {
    const out = calculateSemester([
      { name: "Quarter 1", grade: "90", weight: "40" },
      { name: "Quarter 2", grade: "80", weight: "40" },
      { name: "Final exam", grade: "", weight: "20" },
    ], 2, COMMON_SCALE);
    if (out.kind !== "needed") throw new Error(out.kind);
    const row = out.rows.find((r) => r.letter === letter);
    expect([row?.target, row?.needed, row?.reachable]).toEqual([target, needed, reachable]);
  });

  it("82/95/88 at 50/30/20 gives 41 + 28.5 + 17.6 = 87.1%, a B+", () => {
    const out = calculateCategories([
      { average: "82", weight: "50" },
      { average: "95", weight: "30" },
      { average: "88", weight: "20" },
    ]);
    if (out.kind !== "result") throw new Error(out.kind);
    expect(out.included.map((r) => r.a * r.b / 100)).toEqual([41, 28.5, 17.6]);
    expect(out.value).toBeCloseTo(87.1);
    expect(letterFor(out.value, COMMON_SCALE).letter).toBe("B+");
  });

  it("48/60 plus 10/20 gives 58/80 = 72.5%", () => {
    const out = calculatePoints([{ earned: "48", possible: "60" }, { earned: "10", possible: "20" }]);
    if (out.kind !== "result") throw new Error(out.kind);
    expect([out.numerator, out.denominator, out.value]).toEqual([58, 80, 72.5]);
  });

  it.each([[90, 97.5], [80, 72.5], [70, 47.5], [60, 22.5]])("85% current and 40% final: target %s needs %s", (target, needed) => {
    const out = calculateFinal("85", String(target), "40");
    if (out.kind !== "result") throw new Error(out.kind);
    expect(out.needed).toBe(needed);
  });

  it("a zero on a 40% final with 85% current leaves 51%", () => {
    const out = calculateFinal("85", "90", "40");
    if (out.kind !== "result") throw new Error(out.kind);
    expect(out.minCourse).toBe(51);
  });

  it.each([
    ["A", 93, 100, 4], ["A−", 90, 93, 3.7], ["B+", 87, 90, 3.3],
    ["B", 83, 87, 3], ["B−", 80, 83, 2.7], ["C+", 77, 80, 2.3],
    ["C", 73, 77, 2], ["C−", 70, 73, 1.7], ["D+", 67, 70, 1.3],
    ["D", 63, 67, 1], ["D−", 60, 63, 0.7], ["F", 0, 60, 0],
  ] as const)("common chart: %s has cutoff %s, upper bound %s, points %s", (letter, cutoff, upper, points) => {
    const result = letterFor(cutoff, COMMON_SCALE);
    expect([result.letter, result.min, result.upper, result.points]).toEqual([letter, cutoff, upper, points]);
    const belowUpper = letterFor(upper - 0.001, COMMON_SCALE);
    expect(belowUpper.letter).toBe(letter);
  });

  it.each([[85, "B"], [79.5, "C+"], [80, "B−"], [69, "D+"]] as const)("percentage FAQ: %s maps to %s on the common scale", (value, letter) => {
    expect(letterFor(value, COMMON_SCALE).letter).toBe(letter);
  });

  it("the 10-point scale gives B at 85 and D at 69", () => {
    expect(letterFor(85, TEN_POINT_SCALE).letter).toBe("B");
    expect(letterFor(69, TEN_POINT_SCALE).letter).toBe("D");
  });

  it("42/50 gives 84%, while 43.5/50 reaches the 87% B+ cutoff", () => {
    for (const [earned, percent, letter] of [["42", 84, "B"], ["43.5", 87, "B+"]] as const) {
      const out = calculatePoints([{ earned, possible: "50" }]);
      if (out.kind !== "result") throw new Error(out.kind);
      expect(out.value).toBe(percent);
      expect(letterFor(out.value, COMMON_SCALE).letter).toBe(letter);
    }
  });
});