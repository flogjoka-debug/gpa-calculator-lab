import { describe, expect, it } from "vitest";
import { convertGpa } from "./convert";

describe("convertGpa", () => {
  it("matches the GPA scale guide examples", () => {
    const a = convertGpa("4.1", "4.5");
    const b = convertGpa("7.16", "10");
    expect(a.kind === "result" && a.value.toFixed(2)).toBe("3.64");
    expect(b.kind === "result" && b.value.toFixed(2)).toBe("2.86");
  });
  it("converts the other way too", () => {
    const r = convertGpa("3.2", "4", "10");
    expect(r.kind === "result" && r.value).toBeCloseTo(8, 10);
  });
  it("rejects a GPA above the scale and bad scales", () => {
    expect(convertGpa("5.2", "5")).toMatchObject({ kind: "error", field: "gpa" });
    expect(convertGpa("3", "0")).toMatchObject({ kind: "error", field: "from" });
    expect(convertGpa("", "5").kind).toBe("empty");
  });
});
