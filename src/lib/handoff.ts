/** Opt-in percentage handoff between tools (brief section 6). Only a percentage ever travels. */
export const HANDOFF_KEY = "gcl.handoff";
const MAX_AGE_MS = 30 * 60 * 1000;

export type ToolId = "grade" | "semester";
export type TargetId = "final" | "percentage";
export interface Handoff { percent: number; source: ToolId; target: TargetId; ts: number }

export const SOURCE_NAMES: Record<ToolId, string> = { grade: "Grade Calculator", semester: "Semester Grade Calculator" };

export function writeHandoff(percent: number, source: ToolId, target: TargetId) {
  try {
    if (!Number.isFinite(percent)) return;
    window.localStorage.setItem(HANDOFF_KEY, JSON.stringify({ percent, source, target, ts: Date.now() }));
  } catch {
    /* storage blocked: the link still works */
  }
}

export function readHandoff(target: TargetId, now = Date.now()): Handoff | null {
  try {
    const raw = window.localStorage.getItem(HANDOFF_KEY);
    if (!raw) return null;
    const h = JSON.parse(raw) as Handoff;
    if (typeof h.percent !== "number" || !Number.isFinite(h.percent) || now - h.ts > MAX_AGE_MS) {
      window.localStorage.removeItem(HANDOFF_KEY);
      return null;
    }
    return h.target === target ? h : null;
  } catch {
    return null;
  }
}

export function clearHandoff() {
  try {
    window.localStorage.removeItem(HANDOFF_KEY);
  } catch {
    /* ignore */
  }
}
