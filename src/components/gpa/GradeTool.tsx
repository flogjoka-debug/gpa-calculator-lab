import { useRef, useState } from "react";
import { X } from "lucide-react";
import { calculateCategories, calculatePoints, isFullCoverage, type GradeError, type GradeResult } from "@/lib/calc/grade";
import { fmtNum, fmtPct1 } from "@/lib/calc/format";
import { COMMON_SCALE, letterFor } from "@/lib/calc/scale";
import { parseNumber } from "@/lib/calc/gpa";
import { FieldError, ResultBox, SaveBar, scrollIntoViewSoon, useDeviceStorage, useLoadExampleEvent, usePendingFocus, useReplaceConfirm } from "./shared";
import { HandoffLink } from "./handoff";

type Tab = "points" | "categories";
interface PRow { id: string; name: string; earned: string; possible: string }
interface CRow { id: string; name: string; average: string; weight: string }
let seq = 1;
const pRow = (): PRow => ({ id: `p${seq++}`, name: "", earned: "", possible: "" });
const cRow = (): CRow => ({ id: `k${seq++}`, name: "", average: "", weight: "" });
const fixedP = () => ["p-a", "p-b", "p-c"].map((id) => ({ id, name: "", earned: "", possible: "" }));
const fixedC = () => ["k-a", "k-b", "k-c"].map((id) => ({ id, name: "", average: "", weight: "" }));
const STORAGE_KEY = "gpacl:grade:v1";

export function GradeTool() {
  const [tab, setTab] = useState<Tab>("points");
  const [prows, setPRows] = useState<PRow[]>(fixedP);
  const [crows, setCRows] = useState<CRow[]>(fixedC);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [stale, setStale] = useState(false);
  const [errors, setErrors] = useState<GradeError[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);
  const focusSoon = usePendingFocus();
  const confirm = useReplaceConfirm();
  const storage = useDeviceStorage<{ tab: Tab; prows: PRow[]; crows: CRow[] }>(STORAGE_KEY, (d) => {
    if (d.tab) setTab(d.tab);
    if (d.prows?.length) setPRows(d.prows);
    if (d.crows?.length) setCRows(d.crows);
  });
  const changed = () => { if (result) setStale(true); storage.clearNote(); setErrors([]); };

  const run = (t = tab, p = prows, c = crows) => {
    const out = t === "points" ? calculatePoints(p) : calculateCategories(c);
    if (out.kind === "error") {
      setErrors(out.errors); setResult(null); setStale(false);
      const e = out.errors[0];
      const row = e ? (t === "points" ? p : c)[e.index - 1] : undefined;
      if (e && row) document.getElementById(`${e.field}-${row.id}`)?.focus();
      return;
    }
    setErrors([]);
    setResult(out.kind === "result" ? out : null);
    setStale(false);
    scrollIntoViewSoon(resultRef.current);
  };

  const loadExample = () => {
    const c = [
      { id: `k${seq++}`, name: "", average: "80", weight: "40" },
      { id: `k${seq++}`, name: "", average: "90", weight: "60" },
    ];
    const p = [
      { id: `p${seq++}`, name: "", earned: "18", possible: "20" },
      { id: `p${seq++}`, name: "", earned: "30", possible: "40" },
    ];
    setPRows(p); setCRows(c); setTab("categories"); storage.clearNote();
    run("categories", p, c);
  };
  const hasData = prows.some((r) => r.name || r.earned || r.possible) || crows.some((r) => r.name || r.average || r.weight);
  useLoadExampleEvent(() => confirm.ask(hasData, loadExample));

  const weightTotal = crows.reduce((s, r) => s + (parseNumber(r.weight) ?? 0), 0);
  const fresh = result && !stale ? result : null;
  const full = fresh ? isFullCoverage(fresh) : true;

  const tabBtn = (t: Tab, label: string) => (
    <button type="button" role="tab" id={`tab-${t}`} aria-selected={tab === t} aria-controls={`panel-${t}`}
      className={`btn ${tab === t ? "btn-primary" : ""}`}
      onClick={() => { setTab(t); changed(); }}>
      {label}
    </button>
  );

  return (
    <>
      <form noValidate aria-label="Grade calculator" className="mt-5 card p-3 sm:p-5"
        onSubmit={(e) => { e.preventDefault(); run(); }}>
        <div role="tablist" aria-label="Mode" className="flex flex-wrap gap-2">
          {tabBtn("points", "Points")}
          {tabBtn("categories", "Weighted categories")}
        </div>
        {tab === "points" ? (
          <div role="tabpanel" id="panel-points" aria-labelledby="tab-points" className="mt-3">
            <ol className="space-y-2">
              {prows.map((r, i) => {
                const err = errors.find((e) => e.index === i + 1);
                return (
                  <li key={r.id} className="rounded-[12px] border border-divider bg-[#FBFDFC] p-3">
                    <div className="grid grid-cols-[1fr_1fr_44px] gap-2 sm:grid-cols-[1fr_7rem_7rem_44px]">
                      <div className="col-span-3 sm:col-span-1">
                        <label htmlFor={`name-${r.id}`} className="mb-1 block text-sm">Assignment (optional)</label>
                        <input id={`name-${r.id}`} className="field" type="text" autoComplete="off" value={r.name}
                          onChange={(e) => { setPRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, name: e.target.value } : x))); changed(); }} />
                      </div>
                      {(["earned", "possible"] as const).map((f) => (
                        <div key={f}>
                          <label htmlFor={`${f}-${r.id}`} className="mb-1 block text-sm">{f === "earned" ? "Points earned" : "Points possible"}</label>
                          <input id={`${f}-${r.id}`} className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={r[f]}
                            aria-invalid={err?.field === f || undefined}
                            onChange={(e) => { setPRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, [f]: e.target.value } : x))); changed(); }} />
                        </div>
                      ))}
                      <div className="flex items-end">
                        <button type="button" className="btn w-11 px-0" aria-label={`Remove assignment ${i + 1}`}
                          onClick={() => { const next = prows.filter((x) => x.id !== r.id); setPRows(next); const t = next[i] ?? next[i - 1]; focusSoon(t ? `earned-${t.id}` : "add-points"); changed(); }}>
                          <X aria-hidden="true" size={20} />
                        </button>
                      </div>
                    </div>
                    {err ? <FieldError id={`err-${r.id}`}>{err.message}</FieldError> : null}
                  </li>
                );
              })}
            </ol>
            <button id="add-points" type="button" className="btn mt-2" onClick={() => { const n = pRow(); setPRows((rs) => [...rs, n]); focusSoon(`earned-${n.id}`); changed(); }}>Add assignment</button>
          </div>
        ) : (
          <div role="tabpanel" id="panel-categories" aria-labelledby="tab-categories" className="mt-3">
            <ol className="space-y-2">
              {crows.map((r, i) => {
                const err = errors.find((e) => e.index === i + 1);
                return (
                  <li key={r.id} className="rounded-[12px] border border-divider bg-[#FBFDFC] p-3">
                    <div className="grid grid-cols-[1fr_1fr_44px] gap-2 sm:grid-cols-[1fr_8rem_7rem_44px]">
                      <div className="col-span-3 sm:col-span-1">
                        <label htmlFor={`name-${r.id}`} className="mb-1 block text-sm">Category (optional)</label>
                        <input id={`name-${r.id}`} className="field" type="text" autoComplete="off" value={r.name}
                          onChange={(e) => { setCRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, name: e.target.value } : x))); changed(); }} />
                      </div>
                      {(["average", "weight"] as const).map((f) => (
                        <div key={f}>
                          <label htmlFor={`${f}-${r.id}`} className="mb-1 block text-sm">{f === "average" ? "Your average (%)" : "Weight (%)"}</label>
                          <input id={`${f}-${r.id}`} className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={r[f]}
                            aria-invalid={err?.field === f || undefined}
                            onChange={(e) => { setCRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, [f]: e.target.value } : x))); changed(); }} />
                        </div>
                      ))}
                      <div className="flex items-end">
                        <button type="button" className="btn w-11 px-0" aria-label={`Remove category ${i + 1}`}
                          onClick={() => { const next = crows.filter((x) => x.id !== r.id); setCRows(next); const t = next[i] ?? next[i - 1]; focusSoon(t ? `average-${t.id}` : "add-cat"); changed(); }}>
                          <X aria-hidden="true" size={20} />
                        </button>
                      </div>
                    </div>
                    {err ? <FieldError id={`err-${r.id}`}>{err.message}</FieldError> : null}
                  </li>
                );
              })}
            </ol>
            <p className="tabular mt-2 font-semibold">Weights: {fmtNum(weightTotal)}% of 100%</p>
            <button id="add-cat" type="button" className="btn mt-2" onClick={() => { const n = cRow(); setCRows((rs) => [...rs, n]); focusSoon(`average-${n.id}`); changed(); }}>Add category</button>
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-2 border-t border-divider pt-4">
          <button type="submit" className="btn btn-primary">Calculate grade</button>
          <button type="button" className="btn" onClick={() => { setPRows(fixedP()); setCRows(fixedC()); setResult(null); setStale(false); setErrors([]); }}>Clear</button>
        </div>
        <SaveBar storage={storage} onSave={() => storage.save({ tab, prows, crows })} />
      </form>

      <ResultBox boxRef={resultRef}>
        {fresh ? (
          <div className="space-y-2">
            <p className="text-text-muted">{full ? "Current grade" : `Current grade (based on ${fmtNum(fresh.coveredWeight)}% of the course)`}</p>
            <p className="tabular text-5xl leading-none font-semibold">{fmtPct1(fresh.value)}%</p>
            <p className="font-semibold">{letterFor(fresh.value, COMMON_SCALE).letter} on the {COMMON_SCALE.name.replace(" (example)", "")} (example)</p>
            <p className="tabular">
              {fresh.mode === "points"
                ? `${fmtNum(fresh.numerator)} ÷ ${fmtNum(fresh.denominator)} × 100 = ${fmtPct1(fresh.value)}%`
                : (() => {
                    const sum = fresh.included.map((r) => `${(r.b / 100).toFixed(2)} × ${fmtNum(r.a)}`).join(" + ");
                    return `${full ? sum : `(${sum}) ÷ ${fresh.denominator.toFixed(2)}`} = ${fmtPct1(fresh.value)}%`;
                  })()}
            </p>
            {!full ? <p>Categories without a score are left out. A blank isn't a zero.</p> : null}
          </div>
        ) : stale ? (
          <p>Your scores changed. Calculate again.</p>
        ) : (
          <p>Add your scores to see your current grade.</p>
        )}
      </ResultBox>
      <p className="mt-4">
        Planning for an exam? You can{" "}
        <HandoffLink href="/final-grade-calculator/" percent={fresh ? fresh.value : null} source="grade" target="final">use this grade to plan your final</HandoffLink>.
        Nothing is shared until you click.
      </p>
      {confirm.dialog}
    </>
  );
}
