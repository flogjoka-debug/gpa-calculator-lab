import { calculateItems, isNonGpa, type CalcItem, type GpaOptions, type GpaOutcome } from "./gpa";

/** A row with a stable id; retakeOf points at the id of an earlier attempt. */
export interface RetakeItem extends CalcItem {
  id: string;
  retakeOf?: string;
}

export interface RetakeComparison {
  countBoth: GpaOutcome;
  replaceEarlier: GpaOutcome;
  hasRetakes: boolean;
}

/**
 * Two full results from the same untouched input.
 * replaceEarlier moves every attempt that a later graded attempt retakes into excluded ("replaced").
 */
export function compareRetakePolicies(rows: readonly RetakeItem[], opts: GpaOptions = {}): RetakeComparison {
  const pos = new Map(rows.map((r, i) => [r.id, i]));
  const replaced = new Set<string>();
  rows.forEach((r, i) => {
    if (!r.retakeOf) return;
    const earlier = pos.get(r.retakeOf);
    if (earlier === undefined || earlier >= i) return;
    if (r.grade === "" || isNonGpa(r.grade)) return; // only a graded later attempt replaces
    replaced.add(r.retakeOf);
  });
  const countBoth = calculateItems(rows.map((r) => ({ ...r })), opts);
  const replaceEarlier = calculateItems(
    rows.map((r) => (replaced.has(r.id) ? { ...r, forceExclude: "replaced" as const } : { ...r })),
    opts,
  );
  return { countBoth, replaceEarlier, hasRetakes: rows.some((r) => !!r.retakeOf && pos.has(r.retakeOf)) };
}
