import { describe, expect, it } from "vitest";
import { calculateUc, formatUc, type UcRow } from "./uc";
import { calculateLsac, EXCLUDE_REASON, type LsacRow } from "./lsac";

const A = (gradeLevel: UcRow["gradeLevel"], honorsType: UcRow["honorsType"] = "AP"): UcRow => ({ grade: "A", gradeLevel, honorsType, ag: true });
const res = <T extends { kind: string }>(o: T) => { if (o.kind !== "result") throw new Error(o.kind); return o as Extract<T, { kind: "result" }>; };

describe("UC GPA", () => {
  it("12 honors A's, resident, 6 in 10th + 6 in 11th → 4.00 and 4.66", () => {
    const r = res(calculateUc([...Array(6).fill(A(10)), ...Array(6).fill(A(11))], "resident"));
    expect(r.gradePoints).toBe(48);
    expect(formatUc(r.unweighted)).toBe("4.00");
    expect(r.gradePoints + r.honorsPoints).toBe(56);
    expect(formatUc(r.weighted)).toBe("4.66");
    expect(r.awarded).toHaveLength(8);
    expect(r.awarded.filter((x) => x.year === 10)).toHaveLength(4);
    expect(r.lost.map((x) => x.reason)).toEqual(["10th-grade limit of 4 reached", "10th-grade limit of 4 reached", "8-point limit reached", "8-point limit reached"]);
  });
  it("only the six 10th-grade A's → 4 awarded, 2 lost to the 10th-grade limit", () => {
    const r = res(calculateUc(Array(6).fill(A(10)), "resident"));
    expect(r.honorsPoints).toBe(4);
    expect(r.lost.map((x) => x.reason)).toEqual(["10th-grade limit of 4 reached", "10th-grade limit of 4 reached"]);
  });
  it("nonresident school honors A → no bonus", () => {
    const r = res(calculateUc([A(11, "school-honors")], "nonresident"));
    expect(r.honorsPoints).toBe(0);
    expect(r.lost[0]?.reason).toBe("Not eligible for nonresidents");
    expect(r.minimum).toBe(3.4);
  });
  it("honors B− counts as B plus 1; honors D → 1 point, no bonus", () => {
    const b = res(calculateUc([{ grade: "B−", gradeLevel: 11, honorsType: "AP", ag: true }], "resident"));
    expect(b.gradePoints).toBe(3);
    expect(b.honorsPoints).toBe(1);
    expect(b.rows[0]?.mapped).toBe(true);
    const d = res(calculateUc([{ grade: "D", gradeLevel: 11, honorsType: "AP", ag: true }], "resident"));
    expect(d.gradePoints).toBe(1);
    expect(d.honorsPoints).toBe(0);
    expect(d.lost[0]?.reason).toBe("Grade below C");
  });
  it("summer after 10th is grouped with 10th grade", () => {
    const r = res(calculateUc([...Array(4).fill(A(10)), A("summer-after-10")], "resident"));
    expect(r.honorsPoints).toBe(4);
    expect(r.lost[0]?.reason).toBe("10th-grade limit of 4 reached");
  });
});

const row = (grade: LsacRow["grade"], credits: number, p: Partial<LsacRow> = {}): LsacRow =>
  ({ grade, credits, units: "semester", dualEnrollment: false, afterFirstBachelors: false, punitive: false, ...p });

describe("LSAC GPA", () => {
  it("dual enrollment by cycle", () => {
    const rows = [row("A", 3), row("B", 3, { dualEnrollment: true })];
    const a = res(calculateLsac(rows, "2026-27"));
    expect([a.qualityPoints, a.hours, a.gpa.toFixed(2)]).toEqual([21, 6, "3.50"]);
    const b = res(calculateLsac(rows, "2027-28"));
    expect([b.qualityPoints, b.hours, b.gpa.toFixed(2)]).toEqual([12, 3, "4.00"]);
    expect(b.excluded[0]?.reason).toBe(EXCLUDE_REASON.dual);
  });
  it("A+ 2 + B 1 → 11.66 ÷ 3 → 3.89", () => {
    const r = res(calculateLsac([row("A+", 2), row("B", 1)], "2026-27"));
    expect(r.qualityPoints).toBe(11.66);
    expect(r.gpa.toFixed(2)).toBe("3.89");
  });
  it("D then A, both attempts → 2.50", () => {
    const r = res(calculateLsac([row("D", 3), row("A", 3)], "2026-27"));
    expect([r.qualityPoints, r.hours, r.gpa.toFixed(2)]).toEqual([15, 6, "2.50"]);
  });
  it("quarter units × 0.67", () => {
    const r = res(calculateLsac([row("A", 4, { units: "quarter" }), row("B", 3)], "2026-27"));
    expect(r.included[0]?.hours).toBe(2.68);
    expect(r.included[0]?.qualityPoints).toBe(10.72);
    expect(r.hours).toBe(5.68);
    expect(r.gpa.toFixed(2)).toBe("3.47");
  });
  it("nonpunitive W excluded; punitive WF counted as 0.00", () => {
    const r = res(calculateLsac([row("A", 3), row("W", 3), row("WF", 3, { punitive: true })], "2026-27"));
    expect(r.excluded.map((x) => x.grade)).toEqual(["W"]);
    expect(r.included[1]?.value).toBe(0);
    expect(r.gpa.toFixed(2)).toBe("2.00");
  });
  it("no cycle → no result", () => {
    const r = calculateLsac([row("A", 3)], "");
    expect(r).toEqual({ kind: "no-cycle", message: "Choose your application cycle." });
  });
});

describe("UC phase 5 decisions", () => {
  it("resident school honors → Not UC-certified honors", () => {
    const r = res(calculateUc([A(11, "school-honors")], "resident"));
    expect(r.honorsPoints).toBe(0);
    expect(r.lost[0]?.reason).toBe("Not UC-certified honors");
  });
  it("GPA exactly at the minimum → meets; higher → above; lower → below", () => {
    const g = (grade: string): UcRow => ({ grade, gradeLevel: 11, honorsType: "none", ag: true });
    expect(res(calculateUc([g("B")], "resident")).minimumStatus).toBe("meets");
    expect(res(calculateUc([g("A")], "resident")).minimumStatus).toBe("above");
    expect(res(calculateUc([g("B")], "nonresident")).minimumStatus).toBe("below");
  });
});
