import { useRef, useState } from "react";
import { X } from "lucide-react";
import {
  UC_HONORS, UC_LEVELS, UC_SOURCE, calculateUc, formatUc, normalizeUcGrade,
  type Residency, type UcGradeLevel, type UcHonorsType, type UcOutput,
} from "@/lib/calc/uc";
import { FieldError, ResultBox, SaveBar, scrollIntoViewSoon, useDeviceStorage, useLoadExampleEvent, usePendingFocus, useReplaceConfirm } from "./shared";

interface Row { id: string; name: string; grade: string; level: UcGradeLevel; ag: boolean; honors: UcHonorsType }
let seq = 1;
const mk = (p: Partial<Row> = {}): Row => ({ id: `u${seq++}`, name: "", grade: "", level: 10, ag: true, honors: "none", ...p });
const rowHasData = (r: Row) => r.name.trim() !== "" || r.grade !== "" || r.level !== 10 || !r.ag || r.honors !== "none";
const STORAGE_KEY = "gpacl:uc:v1";
const levelLabel = (l: UcGradeLevel) => UC_LEVELS.find((x) => x.value === l)?.label ?? "";
type Result = Extract<UcOutput, { kind: "result" }>;

export function UcCalculator() {
  const [rows, setRows] = useState<Row[]>(() => ["r1", "r2", "r3"].map((id) => ({ id, name: "", grade: "", level: 10 as UcGradeLevel, ag: true, honors: "none" as UcHonorsType })));
  const [residency, setResidency] = useState<Residency | "">("");
  const [result, setResult] = useState<Result | null>(null);
  const [stale, setStale] = useState(false);
  const [resErr, setResErr] = useState(false);
  const [gradeErr, setGradeErr] = useState<{ id: string; index: number } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const focusSoon = usePendingFocus();
  const confirm = useReplaceConfirm();
  const storage = useDeviceStorage<{ rows: Row[]; residency: Residency | "" }>(STORAGE_KEY, (d) => {
    if (Array.isArray(d.rows) && d.rows.length) setRows(d.rows);
    if (d.residency) setResidency(d.residency);
  });
  const changed = () => { if (result) setStale(true); storage.clearNote(); };

  const run = (rs: Row[], res: Residency | "") => {
    const bad = rs.findIndex((r) => r.grade.trim() !== "" && !normalizeUcGrade(r.grade));
    if (!res) { setResErr(true); setResult(null); document.getElementById("uc-res-resident")?.focus(); return; }
    setResErr(false);
    if (bad >= 0) { const r = rs[bad]!; setGradeErr({ id: r.id, index: bad + 1 }); setResult(null); document.getElementById(`grade-${r.id}`)?.focus(); return; }
    setGradeErr(null);
    const out = calculateUc(rs.map((r) => ({ grade: r.grade, gradeLevel: r.level, honorsType: r.honors, ag: r.ag, name: r.name })), res);
    setResult(out.kind === "result" ? out : null);
    setStale(false);
    if (out.kind === "result") scrollIntoViewSoon(resultRef.current);
  };
  const update = (id: string, p: Partial<Row>) => {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...p } : r)));
    if (gradeErr?.id === id) setGradeErr(null);
    changed();
  };
  const addRow = () => { const r = mk(); setRows((rs) => [...rs, r]); focusSoon(`grade-${r.id}`); changed(); };
  const removeRow = (id: string) => {
    const i = rows.findIndex((r) => r.id === id);
    const next = rows.filter((r) => r.id !== id);
    setRows(next); setGradeErr(null);
    const t = next[i] ?? next[i - 1];
    focusSoon(t ? `grade-${t.id}` : "uc-add-class");
    changed();
  };
  const loadExample = () => {
    const ex = [...Array(6)].map(() => mk({ grade: "A", level: 10, honors: "AP" })).concat([...Array(6)].map(() => mk({ grade: "A", level: 11, honors: "AP" })));
    setRows(ex); setResidency("resident"); storage.clearNote();
    run(ex, "resident");
  };
  useLoadExampleEvent(() => confirm.ask(rows.some(rowHasData) || residency !== "", loadExample));
  const clearAll = () => { setRows([mk(), mk(), mk()]); setResidency(""); setResult(null); setStale(false); setResErr(false); setGradeErr(null); storage.clearNote(); };
  const fresh = result && !stale ? result : null;
  const mappedRows = fresh?.rows.filter((r) => r.mapped) ?? [];

  return (
    <>
      <form noValidate aria-label="UC GPA calculator" className="mt-5 rounded-[14px] border border-divider bg-surface p-3 sm:p-5"
        onSubmit={(e) => { e.preventDefault(); run(rows, residency); }}>
        <fieldset aria-describedby={resErr ? "uc-res-err" : undefined}>
          <legend className="mb-1 font-semibold">Residency</legend>
          <div className="flex flex-wrap gap-x-5">
            {([["resident", "California resident"], ["nonresident", "Nonresident"]] as const).map(([v, l]) => (
              <label key={v} className="flex min-h-11 cursor-pointer items-center gap-2">
                <input id={`uc-res-${v}`} type="radio" name="uc-residency" className="size-5 accent-primary" checked={residency === v} required
                  onChange={() => {
                    setResidency(v); setResErr(false); storage.clearNote();
                    if (result && !stale) run(rows, v); // residency changes the result directly
                  }} />
                <span>{l}</span>
              </label>
            ))}
          </div>
          {resErr ? <FieldError id="uc-res-err">Choose your residency.</FieldError> : null}
        </fieldset>
        <p className="mt-3 text-sm text-text-muted">Enter one row per semester. A year-long class is two rows.</p>
        <datalist id="uc-grades">{["A", "B", "C", "D", "F"].map((g) => <option key={g} value={g} />)}</datalist>
        <ol className="mt-2 space-y-3">
          {rows.map((row, i) => {
            const err = gradeErr?.id === row.id;
            return (
              <li key={row.id} className="rounded-[10px] border border-divider p-3">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-[1fr_9rem_6rem_44px]">
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor={`name-${row.id}`} className="mb-1 block text-sm">Class (optional)</label>
                    <input id={`name-${row.id}`} className="field" type="text" autoComplete="off" value={row.name} onChange={(e) => update(row.id, { name: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor={`level-${row.id}`} className="mb-1 block text-sm">When</label>
                    <select id={`level-${row.id}`} className="field" value={String(row.level)}
                      onChange={(e) => { const v = e.target.value; update(row.id, { level: (v === "10" || v === "11" ? Number(v) : v) as UcGradeLevel }); }}>
                      {UC_LEVELS.map((l) => <option key={l.value} value={String(l.value)}>{l.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`grade-${row.id}`} className="mb-1 block text-sm">Semester grade</label>
                    <input id={`grade-${row.id}`} className="field" type="text" list="uc-grades" autoComplete="off" placeholder="—" value={row.grade}
                      aria-invalid={err || undefined} aria-describedby={err ? `err-${row.id}` : undefined}
                      onChange={(e) => update(row.id, { grade: e.target.value })} />
                  </div>
                  <div className="hidden items-end justify-end sm:flex">
                    <button type="button" className="btn w-11 px-0" aria-label={`Remove class ${i + 1}`} onClick={() => removeRow(row.id)}><X aria-hidden="true" size={20} /></button>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor={`honors-${row.id}`} className="mb-1 block text-sm">Honors type</label>
                    <select id={`honors-${row.id}`} className="field" value={row.honors} onChange={(e) => update(row.id, { honors: e.target.value as UcHonorsType })}>
                      {UC_HONORS.map((h) => <option key={h.value} value={h.value}>{h.label}</option>)}
                    </select>
                  </div>
                  <label className="flex min-h-11 cursor-pointer items-center gap-2 self-end">
                    <input type="checkbox" className="size-5 accent-primary" checked={row.ag} onChange={(e) => update(row.id, { ag: e.target.checked })} />
                    <span>A-G course</span>
                  </label>
                  <div className="flex items-end justify-end sm:hidden">
                    <button type="button" className="btn w-11 px-0" aria-label={`Remove class ${i + 1}`} onClick={() => removeRow(row.id)}><X aria-hidden="true" size={20} /></button>
                  </div>
                </div>
                {err ? <FieldError id={`err-${row.id}`}>Class {i + 1}: choose a grade.</FieldError> : null}
              </li>
            );
          })}
        </ol>
        <div className="mt-4 flex flex-wrap gap-2">
          <button id="uc-add-class" type="button" className="btn" onClick={addRow}>Add class</button>
          <button type="submit" className="btn btn-primary">Calculate GPA</button>
          <button type="button" className="btn" onClick={clearAll}>Clear</button>
        </div>
        <SaveBar storage={storage} onSave={() => storage.save({ rows, residency })} />
      </form>

      <ResultBox boxRef={resultRef}>
        {fresh ? (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <div><p className="text-sm text-text-muted">Unweighted UC GPA</p><p className="tabular text-4xl font-semibold">{formatUc(fresh.unweighted)}</p></div>
              <div><p className="text-sm text-text-muted">Capped weighted UC GPA</p><p className="tabular text-4xl font-semibold">{formatUc(fresh.weighted)}</p></div>
              <div>
                <p className="text-sm text-text-muted">Minimum for you: {fresh.minimum.toFixed(1)}</p>
                <p className={`mt-2 font-semibold ${fresh.meetsMinimum ? "text-success" : "text-error"}`}>
                  {fresh.meetsMinimum ? `✓ Above the ${fresh.minimum.toFixed(1)} minimum` : `✕ Below the ${fresh.minimum.toFixed(1)} minimum`}
                </p>
              </div>
            </div>
            {mappedRows.map((r) => <p key={r.index} className="text-sm">Class {r.index}: counted as {r.grade}. UC drops pluses and minuses.</p>)}
            {fresh.hasF ? <p className="text-sm">UC's page lists values for A to D only. We count an F as 0 points.</p> : null}
            {fresh.repeated ? <p className="text-sm font-semibold">Repeated class: check how UC treats it before relying on this result.</p> : null}
            <div className="overflow-x-auto">
              <table className="tabular w-full border-collapse text-left text-[15px]">
                <thead><tr className="border-b border-divider text-sm text-text-muted">
                  {["Class", "When", "Honors point?", "Reason"].map((h) => <th key={h} scope="col" className="py-2 pr-3 font-semibold">{h}</th>)}
                </tr></thead>
                <tbody>
                  {fresh.rows.map((r) => (
                    <tr key={r.index} className="border-b border-divider">
                      <td className="py-2 pr-3">{r.name || `Class ${r.index}`}</td>
                      <td className="py-2 pr-3">{levelLabel(r.gradeLevel)}</td>
                      <td className="py-2 pr-3">{r.honors === "awarded" ? "Yes" : "No"}</td>
                      <td className="py-2 pr-3">{r.reason ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="tabular font-semibold">({fresh.gradePoints} grade points + {fresh.honorsPoints} honors points) ÷ {fresh.count} grades = {formatUc(fresh.weighted)}</p>
            <p className="text-sm text-text-muted"><a href={UC_SOURCE} rel="noopener">{UC_SOURCE}</a><br />Rules checked November 22, 2026</p>
          </div>
        ) : stale ? <p>Your classes changed. Calculate again.</p> : <p>Add a semester grade to see your UC GPA.</p>}
      </ResultBox>
      {confirm.dialog}
    </>
  );
}
