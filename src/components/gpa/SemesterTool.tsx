import { useRef, useState } from "react";
import { X } from "lucide-react";
import { calculateSemester, type SemesterError, type SemesterOutcome } from "@/lib/calc/semester";
import { fmtNum, fmtPct1 } from "@/lib/calc/format";
import { COMMON_SCALE } from "@/lib/calc/scale";
import { FieldError, ResultBox, SaveBar, scrollIntoViewSoon, useDeviceStorage, useLoadExampleEvent, usePendingFocus, useReplaceConfirm } from "./shared";
import { HandoffLink } from "./handoff";

type Preset = "40-40-20" | "45-45-10" | "50-50" | "custom";
const PRESETS: { id: Preset; label: string; weights: number[]; exam: number | null }[] = [
  { id: "40-40-20", label: "2 quarters + exam (40/40/20)", weights: [40, 40], exam: 20 },
  { id: "45-45-10", label: "2 quarters + exam (45/45/10)", weights: [45, 45], exam: 10 },
  { id: "50-50", label: "2 quarters, no exam (50/50)", weights: [50, 50], exam: null },
  { id: "custom", label: "Custom", weights: [], exam: null },
];
interface Period { id: string; name: string; grade: string; weight: string }
let seq = 1;
const STORAGE_KEY = "gpacl:semester:v1";
const fixedPeriods = (w: number[]): Period[] => w.map((x, i) => ({ id: `q${i + 1}`, name: `Quarter ${i + 1}`, grade: "", weight: String(x) }));

export function SemesterTool() {
  const [preset, setPreset] = useState<Preset>("40-40-20");
  const [periods, setPeriods] = useState<Period[]>(() => fixedPeriods([40, 40]));
  const [hasExam, setHasExam] = useState(true);
  const [exam, setExam] = useState("");
  const [examWeight, setExamWeight] = useState("20");
  const [out, setOut] = useState<SemesterOutcome | null>(null);
  const [stale, setStale] = useState(false);
  const [errors, setErrors] = useState<SemesterError[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);
  const focusSoon = usePendingFocus();
  const confirm = useReplaceConfirm();
  const storage = useDeviceStorage<{ preset: Preset; periods: Period[]; hasExam: boolean; exam: string; examWeight: string }>(STORAGE_KEY, (d) => {
    if (d.preset) setPreset(d.preset);
    if (d.periods?.length) setPeriods(d.periods);
    if (typeof d.hasExam === "boolean") setHasExam(d.hasExam);
    setExam(d.exam ?? "");
    setExamWeight(d.examWeight ?? "20");
  });
  const changed = () => { if (out) setStale(true); storage.clearNote(); setErrors([]); };
  const custom = preset === "custom";

  const run = (ps = periods, he = hasExam, ex = exam, ew = examWeight) => {
    const rows = [...ps.map((p) => ({ name: p.name, grade: p.grade, weight: p.weight })), ...(he ? [{ name: "Final exam", grade: ex, weight: ew }] : [])];
    const o = calculateSemester(rows, he ? ps.length : null, COMMON_SCALE);
    if (o.kind === "error") {
      setErrors(o.errors); setOut(null); setStale(false);
      const e = o.errors[0];
      if (e && e.index > 0) {
        const id = e.index <= ps.length ? `${e.field}-${ps[e.index - 1]?.id}` : e.field === "weight" ? "exam-weight" : "exam";
        document.getElementById(id)?.focus();
      }
      return;
    }
    setErrors([]); setOut(o.kind === "empty" ? null : o); setStale(false);
    scrollIntoViewSoon(resultRef.current);
  };

  const applyPreset = (id: Preset) => {
    setPreset(id);
    const p = PRESETS.find((x) => x.id === id);
    if (p && id !== "custom") {
      setPeriods((cur) => p.weights.map((w, i) => ({ id: cur[i]?.id ?? `q${seq++}`, name: cur[i]?.name ?? `Quarter ${i + 1}`, grade: cur[i]?.grade ?? "", weight: String(w) })));
      setHasExam(p.exam !== null);
      if (p.exam !== null) setExamWeight(String(p.exam));
    }
    changed();
  };

  const loadExample = () => {
    const ps: Period[] = [
      { id: `q${seq++}`, name: "Quarter 1", grade: "90", weight: "40" },
      { id: `q${seq++}`, name: "Quarter 2", grade: "80", weight: "40" },
    ];
    setPreset("40-40-20"); setPeriods(ps); setHasExam(true); setExam("70"); setExamWeight("20"); storage.clearNote();
    run(ps, true, "70", "20");
  };
  const hasData = periods.some((p) => p.grade !== "") || exam !== "";
  useLoadExampleEvent(() => confirm.ask(hasData, loadExample));

  const fresh = out && !stale ? out : null;
  const errFor = (i: number) => errors.find((e) => e.index === i);
  const totalErr = errors.find((e) => e.field === "total");

  return (
    <>
      <form noValidate aria-label="Semester grade calculator" className="mt-5 rounded-[14px] border border-divider bg-surface p-3 sm:p-5"
        onSubmit={(e) => { e.preventDefault(); run(); }}>
        <div className="max-w-sm">
          <label htmlFor="preset" className="mb-1 block text-sm">Weighting</label>
          <select id="preset" className="field" value={preset} onChange={(e) => applyPreset(e.target.value as Preset)}>
            {PRESETS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
        </div>
        <ol className="mt-3 space-y-2">
          {periods.map((p, i) => {
            const err = errFor(i + 1);
            return (
              <li key={p.id} className="rounded-[10px] border border-divider p-3">
                <div className={`grid gap-2 ${custom ? "grid-cols-[1fr_1fr_44px] sm:grid-cols-[1fr_7rem_7rem_44px]" : "grid-cols-2 sm:grid-cols-[1fr_7rem_7rem]"}`}>
                  <div className={custom ? "col-span-3 sm:col-span-1" : "col-span-2 sm:col-span-1"}>
                    <label htmlFor={`name-${p.id}`} className="mb-1 block text-sm">Grading period</label>
                    <input id={`name-${p.id}`} className="field" type="text" value={p.name}
                      onChange={(e) => { setPeriods((ps) => ps.map((x) => (x.id === p.id ? { ...x, name: e.target.value } : x))); changed(); }} />
                  </div>
                  <div>
                    <label htmlFor={`grade-${p.id}`} className="mb-1 block text-sm">Grade (%)</label>
                    <input id={`grade-${p.id}`} className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={p.grade}
                      aria-invalid={err?.field === "grade" || undefined}
                      onChange={(e) => { setPeriods((ps) => ps.map((x) => (x.id === p.id ? { ...x, grade: e.target.value } : x))); changed(); }} />
                  </div>
                  <div>
                    <label htmlFor={`weight-${p.id}`} className="mb-1 block text-sm">Weight (%)</label>
                    <input id={`weight-${p.id}`} className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={p.weight}
                      readOnly={!custom} aria-invalid={err?.field === "weight" || undefined}
                      onChange={(e) => { setPeriods((ps) => ps.map((x) => (x.id === p.id ? { ...x, weight: e.target.value } : x))); changed(); }} />
                  </div>
                  {custom ? (
                    <div className="flex items-end">
                      <button type="button" className="btn w-11 px-0" aria-label={`Remove grading period ${i + 1}`}
                        onClick={() => { const next = periods.filter((x) => x.id !== p.id); setPeriods(next); const t = next[i] ?? next[i - 1]; focusSoon(t ? `grade-${t.id}` : "add-period"); changed(); }}>
                        <X aria-hidden="true" size={20} />
                      </button>
                    </div>
                  ) : null}
                </div>
                {err ? <FieldError id={`err-${p.id}`}>{err.message}</FieldError> : null}
              </li>
            );
          })}
        </ol>
        {custom ? (
          <div className="mt-2 flex flex-wrap gap-2">
            <button id="add-period" type="button" className="btn"
              onClick={() => { const n = { id: `q${seq++}`, name: `Grading period ${periods.length + 1}`, grade: "", weight: "" }; setPeriods((ps) => [...ps, n]); focusSoon(`grade-${n.id}`); changed(); }}>
              Add grading period
            </button>
            <label className="flex min-h-11 cursor-pointer items-center gap-2 px-2">
              <input type="checkbox" className="size-5 accent-primary" checked={hasExam} onChange={(e) => { setHasExam(e.target.checked); changed(); }} />
              <span>Final exam</span>
            </label>
          </div>
        ) : null}
        {hasExam ? (
          <div className="mt-3 rounded-[10px] border border-divider p-3">
            <div className="grid grid-cols-2 gap-2 sm:max-w-sm">
              <div>
                <label htmlFor="exam" className="mb-1 block text-sm">Final exam (%)</label>
                <input id="exam" className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={exam}
                  aria-invalid={errFor(periods.length + 1)?.field === "grade" || undefined}
                  onChange={(e) => { setExam(e.target.value); changed(); }} />
              </div>
              <div>
                <label htmlFor="exam-weight" className="mb-1 block text-sm">Weight (%)</label>
                <input id="exam-weight" className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={examWeight}
                  readOnly={!custom} onChange={(e) => { setExamWeight(e.target.value); changed(); }} />
              </div>
            </div>
            {errFor(periods.length + 1) ? <FieldError id="exam-err">{errFor(periods.length + 1)?.message}</FieldError> : null}
            {exam.trim() === "" ? (
              <p className="mt-2 text-sm text-text-muted">
                Haven't taken the exam yet? Leave it blank to see what you need, or <a href="/final-grade-calculator/">find the final exam score you need</a> for one exact target.
              </p>
            ) : null}
          </div>
        ) : null}
        {totalErr ? <FieldError id="total-err">{totalErr.message}</FieldError> : null}
        <div className="mt-4 flex flex-wrap gap-2 border-t border-divider pt-4">
          <button type="submit" className="btn btn-primary">Calculate grade</button>
          <button type="button" className="btn" onClick={() => { setPeriods((ps) => ps.map((p) => ({ ...p, grade: "" }))); setExam(""); setOut(null); setStale(false); setErrors([]); }}>Clear</button>
        </div>
        <SaveBar storage={storage} onSave={() => storage.save({ preset, periods, hasExam, exam, examWeight })} />
      </form>

      <ResultBox boxRef={resultRef}>
        {fresh?.kind === "result" ? (
          <div className="space-y-2">
            <p className="text-text-muted">Semester grade</p>
            <p className="tabular text-5xl leading-none font-semibold">{fmtPct1(fresh.value)}%</p>
            <p className="tabular">
              {fresh.included.map((r) => `${(r.weight / 100).toFixed(2)} × ${fmtNum(r.grade)}`).join(" + ")} = {fmtPct1(fresh.value)}%
            </p>
          </div>
        ) : fresh?.kind === "needed" ? (
          <table className="tabular w-full border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b border-divider text-sm text-text-muted">
                <th scope="col" className="py-2 pr-3 font-semibold">Semester grade you want</th>
                <th scope="col" className="py-2 text-right font-semibold">Score you need on the exam</th>
              </tr>
            </thead>
            <tbody>
              {fresh.rows.map((r) => (
                <tr key={r.letter} className="border-b border-divider">
                  <th scope="row" className="py-2 pr-3">{r.letter} ({fmtNum(r.target)}%)</th>
                  <td className="py-2 text-right">{!r.reachable ? "Not reachable" : r.needed <= 0 ? "Already reached" : `${fmtPct1(r.needed)}%`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : stale ? (
          <p>Your grades changed. Calculate again.</p>
        ) : (
          <p>Add your grades to see your semester grade.</p>
        )}
      </ResultBox>
      <p className="mt-4">
        Need the letter?{" "}
        <HandoffLink href="/percentage-to-letter-grade/" percent={fresh?.kind === "result" ? fresh.value : null} source="semester" target="percentage">
          See the letter grade for this percentage
        </HandoffLink>.
      </p>
      {confirm.dialog}
    </>
  );
}
