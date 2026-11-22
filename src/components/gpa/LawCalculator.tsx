import { useRef, useState } from "react";
import { X } from "lucide-react";
import {
  LSAC_DUAL_SOURCE, LSAC_LETTERS, LSAC_OTHER, LSAC_SOURCE, calculateLsac,
  type Cycle, type LsacGrade, type LsacOutput,
} from "@/lib/calc/lsac";
import { formatCredits, formatQp } from "@/lib/calc/gpa";
import { FieldError, ResultBox, SaveBar, scrollIntoViewSoon, useDeviceStorage, useLoadExampleEvent, usePendingFocus, useReplaceConfirm } from "./shared";

interface Row { id: string; name: string; grade: LsacGrade | ""; credits: string; units: "semester" | "quarter"; dual: boolean; after: boolean; punitive: boolean }
let seq = 1;
const mk = (p: Partial<Row> = {}): Row => ({ id: `l${seq++}`, name: "", grade: "", credits: "", units: "semester", dual: false, after: false, punitive: false, ...p });
const rowHasData = (r: Row) => r.name.trim() !== "" || r.grade !== "" || r.credits.trim() !== "" || r.dual || r.after;
const STORAGE_KEY = "gpacl:lsac:v1";
const CYCLES: [Cycle, string][] = [["2026-27", "2026–2027"], ["2027-28", "2027–2028"]];

export function LawCalculator() {
  const [rows, setRows] = useState<Row[]>(() => ["r1", "r2", "r3"].map((id) => ({ id, name: "", grade: "" as const, credits: "", units: "semester" as const, dual: false, after: false, punitive: false })));
  const [cycle, setCycle] = useState<Cycle | "">("");
  const [out, setOut] = useState<LsacOutput | null>(null);
  const [stale, setStale] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const focusSoon = usePendingFocus();
  const confirm = useReplaceConfirm();
  const storage = useDeviceStorage<{ rows: Row[]; cycle: Cycle | "" }>(STORAGE_KEY, (d) => {
    if (Array.isArray(d.rows) && d.rows.length) setRows(d.rows);
    if (d.cycle) setCycle(d.cycle);
  });
  const changed = () => { if (out?.kind === "result") setStale(true); storage.clearNote(); };

  const run = (rs: Row[], c: Cycle | "") => {
    const o = calculateLsac(rs.map((r) => ({ grade: r.grade, credits: r.credits, units: r.units, dualEnrollment: r.dual, afterFirstBachelors: r.after, punitive: r.punitive })), c);
    setOut(o); setStale(false);
    if (o.kind === "no-cycle") document.getElementById("lsac-cycle-2026-27")?.focus();
    else if (o.kind === "error") { const r = rs[o.index - 1]; if (r) document.getElementById(`credits-${r.id}`)?.focus(); }
    else if (o.kind === "result") scrollIntoViewSoon(resultRef.current);
  };
  const update = (id: string, p: Partial<Row>) => { setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...p } : r))); if (out?.kind === "error") setOut(null); changed(); };
  const addRow = () => { const r = mk({ units: rows.every((x) => x.units === "quarter") ? "quarter" : "semester" }); setRows((rs) => [...rs, r]); focusSoon(`grade-${r.id}`); changed(); };
  const removeRow = (id: string) => {
    const i = rows.findIndex((r) => r.id === id);
    const next = rows.filter((r) => r.id !== id);
    setRows(next);
    const t = next[i] ?? next[i - 1];
    focusSoon(t ? `grade-${t.id}` : "lsac-add-class");
    changed();
  };
  const loadExample = () => {
    const ex = [mk({ grade: "A", credits: "3" }), mk({ grade: "B", credits: "3", dual: true })];
    setRows(ex); setCycle(""); storage.clearNote();
    run(ex, "");
  };
  useLoadExampleEvent(() => confirm.ask(rows.some(rowHasData) || cycle !== "", loadExample));
  const clearAll = () => { setRows([mk(), mk(), mk()]); setCycle(""); setOut(null); setStale(false); storage.clearNote(); };
  const allQuarter = rows.length > 0 && rows.every((r) => r.units === "quarter");
  const fresh = out?.kind === "result" && !stale ? out : null;
  const showDualSource = rows.some((r) => r.dual);

  return (
    <>
      <form noValidate aria-label="Law school GPA calculator" className="mt-5 rounded-[14px] border border-divider bg-surface p-3 sm:p-5"
        onSubmit={(e) => { e.preventDefault(); run(rows, cycle); }}>
        <fieldset aria-describedby={`lsac-cycle-help${out?.kind === "no-cycle" ? " lsac-cycle-err" : ""}`}>
          <legend className="mb-1 font-semibold">Application cycle</legend>
          <div className="flex flex-wrap gap-x-5">
            {CYCLES.map(([v, l]) => (
              <label key={v} className="flex min-h-11 cursor-pointer items-center gap-2">
                <input id={`lsac-cycle-${v}`} type="radio" name="lsac-cycle" className="size-5 accent-primary" required checked={cycle === v}
                  onChange={() => { setCycle(v); storage.clearNote(); if (out && out.kind !== "error") run(rows, v); }} />
                <span>{l}</span>
              </label>
            ))}
          </div>
          <p id="lsac-cycle-help" className="text-sm text-text-muted">Rules for college courses taken in high school depend on the cycle.</p>
          {out?.kind === "no-cycle" ? <FieldError id="lsac-cycle-err">{out.message}</FieldError> : null}
        </fieldset>
        <ol className="mt-4 space-y-3">
          {rows.map((row, i) => {
            const err = out?.kind === "error" && out.index === i + 1 ? out : null;
            const flaggable = row.grade === "W" || row.grade === "WF" || row.grade === "I";
            return (
              <li key={row.id} className="rounded-[10px] border border-divider p-3">
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-[1fr_6rem_5.5rem_8rem_44px]">
                  <div className="col-span-3 sm:col-span-1">
                    <label htmlFor={`name-${row.id}`} className="mb-1 block text-sm">Class (optional)</label>
                    <input id={`name-${row.id}`} className="field" type="text" autoComplete="off" value={row.name} onChange={(e) => update(row.id, { name: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor={`grade-${row.id}`} className="mb-1 block text-sm">Grade</label>
                    <select id={`grade-${row.id}`} className="field" value={row.grade} onChange={(e) => update(row.id, { grade: e.target.value as Row["grade"] })}>
                      <option value="">—</option>
                      {[...LSAC_LETTERS, ...LSAC_OTHER].map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`credits-${row.id}`} className="mb-1 block text-sm">Credits</label>
                    <input id={`credits-${row.id}`} className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={row.credits}
                      aria-invalid={err ? true : undefined} aria-describedby={err ? `err-${row.id}` : undefined}
                      onChange={(e) => update(row.id, { credits: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor={`units-${row.id}`} className="mb-1 block text-sm">Units</label>
                    <select id={`units-${row.id}`} className="field" value={row.units} onChange={(e) => update(row.id, { units: e.target.value as Row["units"] })}>
                      <option value="semester">Semester</option>
                      <option value="quarter">Quarter</option>
                    </select>
                  </div>
                  <div className="col-span-3 flex items-end justify-end sm:col-span-1">
                    <button type="button" className="btn w-11 px-0" aria-label={`Remove class ${i + 1}`} onClick={() => removeRow(row.id)}><X aria-hidden="true" size={20} /></button>
                  </div>
                </div>
                <div className="mt-1 flex flex-col">
                  <label className="flex min-h-11 cursor-pointer items-center gap-2">
                    <input type="checkbox" className="size-5 accent-primary" checked={row.dual} onChange={(e) => update(row.id, { dual: e.target.checked })} />
                    <span>Taken while in high school (dual enrollment)</span>
                  </label>
                  <label className="flex min-h-11 cursor-pointer items-center gap-2">
                    <input type="checkbox" className="size-5 accent-primary" checked={row.after} onChange={(e) => update(row.id, { after: e.target.checked })} />
                    <span>After my first bachelor's degree</span>
                  </label>
                  {flaggable ? (
                    <label className="flex min-h-11 cursor-pointer items-center gap-2">
                      <input type="checkbox" className="size-5 accent-primary" checked={row.punitive} onChange={(e) => update(row.id, { punitive: e.target.checked })} />
                      <span>My school treats this as a failing grade</span>
                    </label>
                  ) : null}
                </div>
                {err ? <FieldError id={`err-${row.id}`}>{err.message}</FieldError> : null}
              </li>
            );
          })}
        </ol>
        <div className="mt-4 flex flex-wrap gap-2">
          <button id="lsac-add-class" type="button" className="btn" onClick={addRow}>Add class</button>
          <button type="submit" className="btn btn-primary">Calculate GPA</button>
          <button type="button" className="btn" onClick={clearAll}>Clear</button>
        </div>
        <details className="mt-4 rounded-[10px] border border-divider">
          <summary className="flex min-h-11 cursor-pointer items-center px-3 font-semibold">Options</summary>
          <div className="px-3 pb-3">
            <label className="flex min-h-11 cursor-pointer items-center gap-3">
              <input type="checkbox" className="size-5 accent-primary" checked={allQuarter}
                onChange={(e) => { const u = e.target.checked ? "quarter" : "semester"; setRows((rs) => rs.map((r) => ({ ...r, units: u }))); changed(); }} />
              <span>My school uses quarter credits</span>
            </label>
          </div>
        </details>
        <SaveBar storage={storage} onSave={() => storage.save({ rows, cycle })} />
      </form>

      <ResultBox boxRef={resultRef}>
        {fresh ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-muted">LSAC GPA (estimate)</p>
              <p className="tabular text-5xl leading-none font-semibold">{fresh.gpa.toFixed(2)}</p>
              <p className="tabular mt-2">{formatQp(fresh.qualityPoints)} ÷ {formatCredits(fresh.hours)} = {fresh.gpa.toFixed(2)}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="tabular w-full border-collapse text-left text-[15px]">
                <thead><tr className="border-b border-divider text-sm text-text-muted">
                  {["Grade", "LSAC value", "Hours", "Quality pts"].map((h) => <th key={h} scope="col" className="py-2 pr-3 font-semibold">{h}</th>)}
                </tr></thead>
                <tbody>
                  {fresh.included.map((r) => (
                    <tr key={r.index} className="border-b border-divider">
                      <td className="py-2 pr-3">{r.grade}</td>
                      <td className="py-2 pr-3">{r.value.toFixed(2)}</td>
                      <td className="py-2 pr-3">{formatCredits(r.hours)}</td>
                      <td className="py-2 pr-3">{formatQp(r.qualityPoints)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {fresh.excluded.length ? (
              <ul className="list-disc space-y-1 pl-5">
                {fresh.excluded.map((r) => <li key={r.index}>Class {r.index} ({r.grade}): {r.reason}</li>)}
              </ul>
            ) : null}
            <p className="text-sm text-text-muted">
              <a href={LSAC_SOURCE} rel="noopener">LSAC: Transcript summarization</a><br />
              {showDualSource ? <><a href={LSAC_DUAL_SOURCE} rel="noopener">LSAC: Dual enrollment change (Aug 18, 2026)</a><br /></> : null}
              Rules checked November 22, 2026
            </p>
          </div>
        ) : stale ? <p>Your classes changed. Calculate again.</p>
          : out?.kind === "no-cycle" ? <p>{out.message}</p>
          : <p>Choose your application cycle.</p>}
      </ResultBox>
      <p className="mt-4">Want the GPA your college reports? You can <a href="/college-gpa-calculator/">compare your college GPA</a> using your school's own rules.</p>
      {confirm.dialog}
    </>
  );
}
