import { useRef, useState } from "react";
import { X } from "lucide-react";
import { COLLEGE_GRADE_OPTIONS, formatCredits, formatGpa, formatQp, type GradeOption } from "@/lib/calc/gpa";
import { calculateCumulative, type CumFieldError, type CumulativeResult, type CumFieldName } from "@/lib/calc/cumulative";
import type { RowError } from "@/lib/calc/gpa";
import { ExcludedLine, FormulaLine } from "./Ledger";
import {
  FieldError,
  ResultBox,
  SaveBar,
  gradeLabel,
  scrollIntoViewSoon,
  useDeviceStorage,
  useLoadExampleEvent,
  usePendingFocus,
  useReplaceConfirm,
} from "./shared";

type PriorMode = "exact" | "gpa";
interface Row { id: string; grade: GradeOption | ""; credits: string }
interface Sem { id: string; mode: "rows" | "summary"; rows: Row[]; gpa: string; credits: string }
let seq = 1;
const uid = () => `u${seq++}`;
const emptyRow = (): Row => ({ id: uid(), grade: "", credits: "" });
const newSem = (): Sem => ({ id: uid(), mode: "rows", rows: [emptyRow(), emptyRow(), emptyRow()], gpa: "", credits: "" });
const STORAGE_KEY = "gpacl:cumulative:v1";

interface Prior { mode: PriorMode; credits: string; qp: string; gpa: string }
const emptyPrior = (): Prior => ({ mode: "exact", credits: "", qp: "", gpa: "" });

export function CumulativeCalculator() {
  const [prior, setPrior] = useState<Prior>(emptyPrior);
  const [sems, setSems] = useState<Sem[]>(() => [
    { id: "s0", mode: "rows", rows: ["r1", "r2", "r3"].map((id) => ({ id, grade: "", credits: "" })), gpa: "", credits: "" },
  ]);
  const [result, setResult] = useState<CumulativeResult | null>(null);
  const [stale, setStale] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<CumFieldError[]>([]);
  const [rowErrors, setRowErrors] = useState<RowError[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);
  const focusSoon = usePendingFocus();
  const confirm = useReplaceConfirm();
  const storage = useDeviceStorage<{ prior: Prior; sems: Sem[] }>(STORAGE_KEY, (d) => {
    if (d.prior) setPrior({ ...emptyPrior(), ...d.prior });
    if (Array.isArray(d.sems) && d.sems.length) setSems(d.sems);
  });

  const changed = () => {
    if (result) setStale(true);
    storage.clearNote();
  };

  const fieldId = (f: CumFieldName, semester?: number) => {
    if (f === "priorCredits") return "prior-credits";
    if (f === "priorQualityPoints") return "prior-qp";
    if (f === "priorGpa") return "prior-gpa";
    const s = semester ? sems[semester - 1] : undefined;
    return `${f === "semesterGpa" ? "semgpa" : "semcredits"}-${s?.id ?? ""}`;
  };
  const fErr = (f: CumFieldName, semester?: number) => fieldErrors.find((e) => e.field === f && e.semester === semester);

  const run = (p: Prior, ss: Sem[]) => {
    const out = calculateCumulative(
      p.mode === "exact" ? { mode: "exact", qualityPoints: p.qp, credits: p.credits } : { mode: "gpa", gpa: p.gpa, credits: p.credits },
      ss.map((s) => (s.mode === "rows" ? { mode: "rows", rows: s.rows } : { mode: "summary", gpa: s.gpa, credits: s.credits })),
    );
    if (out.kind === "error") {
      setFieldErrors(out.fieldErrors);
      setRowErrors(out.rowErrors);
      setResult(null);
      setStale(false);
      const f = out.fieldErrors[0];
      const r = out.rowErrors[0];
      if (f) document.getElementById(fieldId(f.field, f.semester))?.focus();
      else if (r && r.semester) {
        const row = ss[r.semester - 1]?.rows[r.index - 1];
        if (row) document.getElementById(`${r.code === "credits" ? "credits" : "grade"}-${row.id}`)?.focus();
      }
      return;
    }
    setFieldErrors([]);
    setRowErrors([]);
    setResult(out.kind === "result" ? out : null);
    setStale(false);
    scrollIntoViewSoon(resultRef.current);
  };

  const setP = (patch: Partial<Prior>) => {
    setPrior((p) => ({ ...p, ...patch }));
    setFieldErrors((es) => es.filter((e) => e.semester !== undefined));
    changed();
  };
  const setS = (id: string, patch: Partial<Sem>) => {
    setSems((ss) => ss.map((s) => (s.id === id ? { ...s, ...patch } : s)));
    setFieldErrors((es) => es.filter((e) => e.semester === undefined));
    setRowErrors([]);
    changed();
  };
  const setRow = (sid: string, rid: string, patch: Partial<Row>) => {
    setSems((ss) => ss.map((s) => (s.id === sid ? { ...s, rows: s.rows.map((r) => (r.id === rid ? { ...r, ...patch } : r)) } : s)));
    setRowErrors([]);
    changed();
  };

  const loadExample = () => {
    const p: Prior = { mode: "exact", credits: "18", qp: "54", gpa: "" };
    const s: Sem = { ...newSem(), mode: "summary", gpa: "4.0", credits: "6" };
    setPrior(p);
    setSems([s]);
    storage.clearNote();
    run(p, [s]);
  };
  const hasData =
    prior.credits !== "" || prior.qp !== "" || prior.gpa !== "" ||
    sems.some((s) => s.gpa !== "" || s.credits !== "" || s.rows.some((r) => r.grade !== "" || r.credits !== ""));
  useLoadExampleEvent(() => confirm.ask(hasData, loadExample));

  const clearAll = () => {
    setPrior(emptyPrior());
    setSems([newSem()]);
    setResult(null);
    setStale(false);
    setFieldErrors([]);
    setRowErrors([]);
    storage.clearNote();
  };

  const fresh = result && !stale ? result : null;
  const credErr = fErr("priorCredits");
  const secErr = prior.mode === "exact" ? fErr("priorQualityPoints") : fErr("priorGpa");

  return (
    <>
      <form noValidate aria-label="Cumulative GPA calculator" className="mt-5 card p-3 sm:p-5"
        onSubmit={(e) => { e.preventDefault(); run(prior, sems); }}>
        <fieldset>
          <legend className="text-lg font-semibold">What you have so far</legend>
          <div role="radiogroup" aria-label="What you have so far" className="mt-2 grid gap-2 sm:grid-cols-2">
            {([["exact", "I have my quality points"], ["gpa", "I only have my GPA"]] as const).map(([v, label]) => (
              <label key={v} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[10px] border border-input px-3 has-[:checked]:border-2 has-[:checked]:border-primary">
                <input type="radio" name="prior-mode" className="size-5 accent-primary" checked={prior.mode === v}
                  onChange={() => setP({ mode: v })} />
                <span>{label}</span>
              </label>
            ))}
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="prior-credits" className="mb-1 block text-sm">GPA credits so far</label>
              <input id="prior-credits" className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={prior.credits}
                aria-invalid={!!credErr || undefined} aria-describedby={`prior-credits-help${credErr ? " prior-credits-err" : ""}`}
                onChange={(e) => setP({ credits: e.target.value })} />
              <p id="prior-credits-help" className="mt-1 text-sm text-text-muted">Use GPA hours, not earned hours.</p>
              {credErr ? <FieldError id="prior-credits-err">{credErr.message}</FieldError> : null}
            </div>
            {prior.mode === "exact" ? (
              <div>
                <label htmlFor="prior-qp" className="mb-1 block text-sm">Quality points so far</label>
                <input id="prior-qp" className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={prior.qp}
                  aria-invalid={!!secErr || undefined} aria-describedby={secErr ? "prior-second-err" : undefined}
                  onChange={(e) => setP({ qp: e.target.value })} />
                {secErr ? <FieldError id="prior-second-err">{secErr.message}</FieldError> : null}
              </div>
            ) : (
              <div>
                <label htmlFor="prior-gpa" className="mb-1 block text-sm">Current GPA</label>
                <input id="prior-gpa" className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={prior.gpa}
                  aria-invalid={!!secErr || undefined} aria-describedby={secErr ? "prior-second-err" : undefined}
                  onChange={(e) => setP({ gpa: e.target.value })} />
                {secErr ? <FieldError id="prior-second-err">{secErr.message}</FieldError> : null}
              </div>
            )}
          </div>
        </fieldset>

        <fieldset className="mt-6 border-t border-divider pt-4">
          <legend className="text-lg font-semibold">New semesters</legend>
          {sems.map((s, si) => {
            const n = si + 1;
            const gErr = fErr("semesterGpa", n);
            const cErr = fErr("semesterCredits", n);
            return (
              <div key={s.id} className="mt-3 rounded-[12px] border border-divider bg-[#FBFDFC] p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold">Semester {n}</p>
                  {sems.length > 1 ? (
                    <button type="button" className="btn w-11 px-0" aria-label={`Remove semester ${n}`}
                      onClick={() => { setSems((ss) => ss.filter((x) => x.id !== s.id)); focusSoon("cum-add-sem"); changed(); }}>
                      <X aria-hidden="true" size={20} />
                    </button>
                  ) : null}
                </div>
                <div role="radiogroup" aria-label={`Semester ${n} entry`} className="mt-2 flex flex-wrap gap-x-5">
                  {([["rows", "Class by class"], ["summary", "Semester GPA + credits"]] as const).map(([v, label]) => (
                    <label key={v} className="flex min-h-11 cursor-pointer items-center gap-2">
                      <input type="radio" name={`mode-${s.id}`} className="size-5 accent-primary" checked={s.mode === v}
                        onChange={() => setS(s.id, { mode: v })} />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                {s.mode === "summary" ? (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor={`semgpa-${s.id}`} className="mb-1 block text-sm">Semester GPA</label>
                      <input id={`semgpa-${s.id}`} className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={s.gpa}
                        aria-invalid={!!gErr || undefined} onChange={(e) => setS(s.id, { gpa: e.target.value })} />
                    </div>
                    <div>
                      <label htmlFor={`semcredits-${s.id}`} className="mb-1 block text-sm">Semester credits</label>
                      <input id={`semcredits-${s.id}`} className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={s.credits}
                        aria-invalid={!!cErr || undefined} onChange={(e) => setS(s.id, { credits: e.target.value })} />
                    </div>
                    {gErr ? <div className="col-span-2"><FieldError id={`semgpa-err-${s.id}`}>{gErr.message}</FieldError></div> : null}
                    {cErr ? <div className="col-span-2"><FieldError id={`semcred-err-${s.id}`}>{cErr.message}</FieldError></div> : null}
                  </div>
                ) : (
                  <>
                    <ol className="mt-2 space-y-2">
                      {s.rows.map((row, i) => {
                        const err = rowErrors.find((e) => e.semester === n && e.index === i + 1);
                        const errId = `err-${row.id}`;
                        return (
                          <li key={row.id}>
                            <div className="grid grid-cols-[1fr_1fr_44px] gap-2">
                              <div>
                                <label htmlFor={`grade-${row.id}`} className="mb-1 block text-sm">Grade</label>
                                <select id={`grade-${row.id}`} className="field" value={row.grade}
                                  aria-invalid={err?.code === "grade" || undefined} aria-describedby={err?.code === "grade" ? errId : undefined}
                                  onChange={(e) => setRow(s.id, row.id, { grade: e.target.value as Row["grade"] })}>
                                  <option value="">—</option>
                                  {COLLEGE_GRADE_OPTIONS.map((g) => <option key={g} value={g}>{gradeLabel(g)}</option>)}
                                </select>
                              </div>
                              <div>
                                <label htmlFor={`credits-${row.id}`} className="mb-1 block text-sm">Credits</label>
                                <input id={`credits-${row.id}`} className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={row.credits}
                                  aria-invalid={err?.code === "credits" || undefined} aria-describedby={err?.code === "credits" ? errId : undefined}
                                  onChange={(e) => setRow(s.id, row.id, { credits: e.target.value })} />
                              </div>
                              <div className="flex items-end">
                                <button type="button" className="btn w-11 px-0" aria-label={`Remove class ${i + 1}`}
                                  onClick={() => {
                                    const rows = s.rows.filter((r) => r.id !== row.id);
                                    setS(s.id, { rows });
                                    const t = rows[i] ?? rows[i - 1];
                                    focusSoon(t ? `grade-${t.id}` : `add-class-${s.id}`);
                                  }}>
                                  <X aria-hidden="true" size={20} />
                                </button>
                              </div>
                            </div>
                            {err ? <FieldError id={errId}>{err.message}</FieldError> : null}
                          </li>
                        );
                      })}
                    </ol>
                    <button id={`add-class-${s.id}`} type="button" className="btn mt-2"
                      onClick={() => { const r = emptyRow(); setS(s.id, { rows: [...s.rows, r] }); focusSoon(`grade-${r.id}`); }}>
                      Add class
                    </button>
                  </>
                )}
                {si === sems.length - 1 ? (
                  <p className="mt-3 text-sm text-text-muted">
                    Don't have this semester's numbers yet? You can <a href="/college-gpa-calculator/">calculate this semester's college GPA</a> first.
                  </p>
                ) : null}
              </div>
            );
          })}
        </fieldset>

        <div className="mt-4 flex flex-wrap gap-2">
          <button id="cum-add-sem" type="button" className="btn"
            onClick={() => { const s = newSem(); setSems((ss) => [...ss, s]); focusSoon(`grade-${s.rows[0]?.id}`); changed(); }}>
            Add semester
          </button>
          <button type="submit" className="btn btn-primary">Calculate GPA</button>
          <button type="button" className="btn" onClick={clearAll}>Clear</button>
        </div>
        <SaveBar storage={storage} onSave={() => storage.save({ prior, sems })} />
      </form>

      <ResultBox boxRef={resultRef}>
        {fresh ? (
          <div className="space-y-4">
            <div>
              <p className="flex items-center gap-2 text-text-muted">
                Cumulative GPA
                {fresh.estimate ? (
                  <span className="rounded-full border-2 border-text px-2 text-sm font-semibold text-text">Estimate</span>
                ) : null}
              </p>
              <p className="tabular text-5xl leading-none font-semibold">{formatGpa(fresh.value)}</p>
              {fresh.change !== null && fresh.prior.gpa !== null ? (
                <p className="tabular mt-2 font-semibold">
                  {Math.abs(fresh.change) < 0.005
                    ? `No change from ${formatGpa(fresh.prior.gpa)}`
                    : `${fresh.change > 0 ? "Up" : "Down"} ${formatGpa(Math.abs(fresh.change))} from ${formatGpa(fresh.prior.gpa)}`}
                </p>
              ) : null}
            </div>
            <table className="tabular w-full border-collapse text-left text-[15px]">
              <tbody>
                {fresh.prior.credits > 0 ? (
                  <tr className="border-b border-divider">
                    <th scope="row" className="py-2 pr-3">So far</th>
                    <td className="py-2 pr-3">{formatCredits(fresh.prior.credits)} GPA credits</td>
                    <td className="py-2 text-right">{formatQp(fresh.prior.qualityPoints)}</td>
                  </tr>
                ) : null}
                <tr className="border-b border-divider">
                  <th scope="row" className="py-2 pr-3">New</th>
                  <td className="py-2 pr-3">{formatCredits(fresh.added.credits)} GPA credits</td>
                  <td className="py-2 text-right">{formatQp(fresh.added.qualityPoints)}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="ledger-total font-semibold">
                  <th scope="row" className="py-2 pr-3">Total</th>
                  <td className="py-2 pr-3">{formatCredits(fresh.denominator)} GPA credits</td>
                  <td className="py-2 text-right">{formatQp(fresh.numerator)}</td>
                </tr>
              </tfoot>
            </table>
            {fresh.excluded.length ? (
              <div className="rounded-[10px] bg-accent px-4 py-3 text-accent-foreground">
                <ExcludedLine excluded={fresh.excluded} semesterNames={sems.map((_, i) => `Semester ${i + 1}`)} />
              </div>
            ) : null}
            <FormulaLine result={fresh} />
            {fresh.estimate ? (
              <p className="text-[15px]">
                Estimate. Your current GPA is rounded, so the exact result can differ slightly. Use quality points from your transcript for an exact number.
              </p>
            ) : null}
          </div>
        ) : stale ? (
          <p>Your classes changed. Calculate again.</p>
        ) : (
          <p>Add a grade and credits to see your GPA.</p>
        )}
      </ResultBox>
      {confirm.dialog}
    </>
  );
}
