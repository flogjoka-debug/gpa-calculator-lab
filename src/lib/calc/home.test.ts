import { describe, expect, it } from "vitest";
import { calculateHome, planTarget } from "./home";

const none = { gpa: "", credits: "" };

describe("calculateHome", () => {
  it("matches the single-term homepage example (A 3 credits, B 4 credits = 3.43)", () => {
    const r = calculateHome([{ name: "", rows: [{ grade: "A", credits: "3" }, { grade: "B", credits: "4" }] }], none, { mode: "college" });
    expect(r.kind).toBe("result");
    if (r.kind !== "result") return;
    expect(r.unweighted.value).toBeCloseTo(24 / 7, 10);
    expect(r.cumulative).toBeNull();
  });

  it("combines two terms and a GPA so far", () => {
    const r = calculateHome(
      [
        { name: "Fall", rows: [{ grade: "A", credits: "3" }, { grade: "C", credits: "3" }] },
        { name: "Spring", rows: [{ grade: "B", credits: "4" }] },
      ],
      { gpa: "2.8", credits: "45" },
      { mode: "college" },
    );
    if (r.kind !== "result") throw new Error(r.kind);
    expect(r.terms.map((t) => t.unweighted.value)).toEqual([3, 3]);
    expect(r.unweighted.value).toBeCloseTo(30 / 10, 10);
    // (2.8 × 45 + 30) ÷ 55 = 156 ÷ 55
    expect(r.cumulative?.value).toBeCloseTo(156 / 55, 10);
  });

  it("adds high school bonuses only in high school mode (guide example 3.25 / 3.88)", () => {
    const rows = [
      { grade: "A" as const, credits: "1", level: "AP" as const },
      { grade: "A" as const, credits: "1", level: "AP" as const },
      { grade: "B" as const, credits: "1", level: "Honors" as const },
      { grade: "C" as const, credits: "1", level: "Regular" as const },
    ];
    const hs = calculateHome([{ name: "", rows }], none, { mode: "highschool" });
    if (hs.kind !== "result") throw new Error(hs.kind);
    expect(hs.unweighted.value).toBeCloseTo(3.25, 10);
    expect(hs.weighted.value).toBeCloseTo(3.875, 10);
    expect(hs.bonusClasses).toBe(3);
    const col = calculateHome([{ name: "", rows }], none, { mode: "college" });
    if (col.kind !== "result") throw new Error(col.kind);
    expect(col.weighted.value).toBeCloseTo(3.25, 10);
  });

  it("reports row errors with the term number and prior field errors", () => {
    const r = calculateHome([{ name: "", rows: [] }, { name: "", rows: [{ grade: "A", credits: "x" }] }], { gpa: "3", credits: "" }, { mode: "college" });
    expect(r.kind).toBe("error");
    if (r.kind !== "error") return;
    expect(r.rowErrors[0]).toMatchObject({ semester: 2, index: 1, code: "credits" });
    expect(r.priorErrors[0]?.field).toBe("priorCredits");
  });
});

describe("planTarget", () => {
  it("matches the raise-your-GPA guide (2.8 over 45 credits, 3.0 after 15 → 3.6)", () => {
    const p = planTarget({ numerator: 126, denominator: 45 }, "3.0", "15");
    if (p.kind !== "plan") throw new Error(p.kind);
    expect(p.needed).toBeCloseTo(3.6, 10);
    expect(p.reachable).toBe(true);
    expect(p.best).toBeCloseTo(3.1, 10);
    expect(p.termsAtTop).toBe(1);
  });

  it("flags an unreachable target and counts terms of straight A's", () => {
    // 2.8 over 120 credits, target 3.0 with 15 credits a term
    const p = planTarget({ numerator: 336, denominator: 120 }, "3.0", "15");
    if (p.kind !== "plan") throw new Error(p.kind);
    expect(p.reachable).toBe(false);
    // k ≥ (3·120 − 336) ÷ (15·1) = 1.6 → 2 terms
    expect(p.termsAtTop).toBe(2);
  });

  it("says when the target is already met, and never for a perfect 4.0 below it", () => {
    const met = planTarget({ numerator: 105, denominator: 30 }, "3.0", "15");
    if (met.kind !== "plan") throw new Error(met.kind);
    expect(met.alreadyThere).toBe(true);
    const four = planTarget({ numerator: 105, denominator: 30 }, "4.0", "15");
    if (four.kind !== "plan") throw new Error(four.kind);
    expect(four.termsAtTop).toBeNull();
  });

  it("validates inputs", () => {
    expect(planTarget({ numerator: 0, denominator: 0 }, "", "").kind).toBe("empty");
    expect(planTarget({ numerator: 0, denominator: 0 }, "3", "0")).toMatchObject({ kind: "error", field: "nextCredits" });
  });
});
