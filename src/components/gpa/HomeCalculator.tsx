import { useEffect, useRef, useState } from "react";
import { Plus, Target, X } from "lucide-react";
import {
  EXAMPLE_SCALE,
  GRADE_OPTIONS,
  LETTER_GRADES,
  formatCredits,
  formatGpa,
  formatQp,
  type GpaResult,
  type GradeOption,
  type GradeScale,
  type RowError,
} from "@/lib/calc/gpa";
import { EXAMPLE_BONUSES, LEVELS, type BonusProfile, type Level } from "@/lib/calc/highschool";
import { calculateHome, planTarget, type HomeMode, type HomeResult, type PriorFieldError, type TargetOutcome } from "@/lib/calc/home";
import { CountedStrip, FormulaLine } from "./Ledger";
import { FieldError, ResultBox, SaveBar, ScalePanel, gradeLabel, scrollIntoViewSoon, useDeviceStorage, useLoadExampleEvent, usePendingFocus, useReplaceConfirm } from "./shared";

interface Row { id: string; name: string; grade: GradeOption | ""; credits: string; level: Level }
interface Term { id: string; name: string; rows: Row[] }
interface Saved { mode: HomeMode; terms: Term[]; prior: { gpa: string; credits: string }; equal: boolean; scale: GradeScale; bonuses: BonusProfile }

let seq = 1;
const newRow = (): Row => ({ id: `r${seq++}`, name: "", grade: "", credits: "", level: "Regular" });
const newTerm = (n = 3): Term => ({ id: `t${seq++}`, name: "", rows: Array.from({ length: n }, newRow) });
const rowHasData = (r: Row) => r.name.trim() !== "" || r.grade !== "" || r.credits.trim() !== "" || r.level !== "Regular";
const BONUS_LEVELS = ["Honors", "AP", "IB", "Dual enrollment"] as const;
const STORAGE_KEY = "gpacl:home:v2";
const OLD_KEY = "gpacl:home:v1";

export const HOME_EXAMPLE_ROWS = [
  { grade: "A" as const, credits: "3" },
  { grade: "B" as const, credits: "4" },
];

export function HomeCalculator({ onResult }: { onResult?: (r: GpaResult | null) => void }) {
  // Fixed ids for the first render so server and client HTML match.
  const [mode, setMode] = useState<HomeMode>("college");
  const [terms, setTerms] = useState<Term[]>(() => [{ id: "t0", name: "", rows: ["a", "b", "c"].map((k) => ({ id: `r0${k}`, name: "", grade: "", credits: "", level: "Regular" as Level })) }]);
  const [prior, setPrior] = useState({ gpa: "", credits: "" });
  const [equal, setEqual] = useState(false);
  const [scale, setScale] = useState<GradeScale>({ ...EXAMPLE_SCALE });
  const [bonuses, setBonuses] = useState<BonusProfile>({ ...EXAMPLE_BONUSES });
  const [result, setResult] = useState<HomeResult | null>(null);
  const [stale, setStale] = useState(false);
  const [rowErrors, setRowErrors] = useState<RowError[]>([]);
  const [priorErrors, setPriorErrors] = useState<PriorFieldError[]>([]);
  const [target, setTarget] = useState({ gpa: "", credits: "15" });
  const [plan, setPlan] = useState<TargetOutcome | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const focusSoon = usePendingFocus();
  const confirm = useReplaceConfirm();

  const storage = useDeviceStorage<Saved>(STORAGE_KEY, (d) => {
    if (d.mode === "college" || d.mode === "highschool") setMode(d.mode);
    if (Array.isArray(d.terms) && d.terms.length) setTerms(d.terms);
    if (d.prior) setPrior(d.prior);
    if (typeof d.equal === "boolean") setEqual(d.equal);
    if (d.scale) setScale({ ...EXAMPLE_SCALE, ...d.scale });
    if (d.bonuses) setBonuses({ ...EXAMPLE_BONUSES, ...d.bonuses });
  });
  // One-time move of classes saved by the earlier single-term calculator.
  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
      const old = window.localStorage.getItem(OLD_KEY);
      if (!old) return;
      const d = JSON.parse(old) as { rows?: { name?: string; grade?: GradeOption | ""; credits?: string }[]; equal?: boolean; scale?: GradeScale };
      if (Array.isArray(d.rows) && d.rows.length) {
        setTerms([{ id: `t${seq++}`, name: "", rows: d.rows.map((r) => ({ ...newRow(), name: r.name ?? "", grade: r.grade ?? "", credits: r.credits ?? "" })) }]);
      }
      if (typeof d.equal === "boolean") setEqual(d.equal);
      if (d.scale) setScale({ ...EXAMPLE_SCALE, ...d.scale });
    } catch {
      /* storage blocked: nothing to restore */
    }
  }, []);

  const hs = mode === "highschool";
  const fresh = result && !stale ? result : null;
  const main = fresh ? (hs ? fresh.weighted : fresh.unweighted) : null;
  useEffect(() => onResult?.(main), [main, onResult]);

  const changed = () => {
    if (result) setStale(true);
    setPlan(null);
    storage.clearNote();
  };

  const run = (ts = terms, m = mode, pr = prior, eq = equal) => {
    const out = calculateHome(
      ts.map((t) => ({ name: t.name, rows: t.rows })),
      pr,
      { mode: m, scale, bonuses, equalWeight: eq },
    );
    if (out.kind === "error") {
      setRowErrors(out.rowErrors);
      setPriorErrors(out.priorErrors);
      setResult(null);
      setStale(false);
      const re = out.rowErrors[0];
      const row = re ? ts[(re.semester ?? 1) - 1]?.rows[re.index - 1] : undefined;
      if (row) document.getElementById(`${re?.code === "credits" && !eq ? "credits" : "grade"}-${row.id}`)?.focus();
      else if (out.priorErrors[0]) document.getElementById(out.priorErrors[0].field === "priorGpa" ? "prior-gpa" : "prior-credits")?.focus();
      return;
    }
    setRowErrors([]);
    setPriorErrors([]);
    setResult(out.kind === "result" ? out : null);
    setStale(false);
    setPlan(null);
    scrollIntoViewSoon(resultRef.current);
  };

  const updateTerm = (tid: string, fn: (t: Term) => Term) => {
    setTerms((ts) => ts.map((t) => (t.id === tid ? fn(t) : t)));
    changed();
  };
  const updateRow = (tid: string, rid: string, patch: Partial<Row>) => {
    const ti = terms.findIndex((t) => t.id === tid) + 1;
    const ri = (terms[ti - 1]?.rows.findIndex((r) => r.id === rid) ?? -1) + 1;
    setRowErrors((es) => es.filter((e) => !(e.semester === ti && e.index === ri)));
    updateTerm(tid, (t) => ({ ...t, rows: t.rows.map((r) => (r.id === rid ? { ...r, ...patch } : r)) }));
  };
  const addRow = (tid: string) => {
    const r = newRow();
    updateTerm(tid, (t) => ({ ...t, rows: [...t.rows, r] }));
    focusSoon(`grade-${r.id}`);
  };
  const removeRow = (tid: string, rid: string) => {
    const t = terms.find((x) => x.id === tid);
    if (!t) return;
    const i = t.rows.findIndex((r) => r.id === rid);
    const next = t.rows.filter((r) => r.id !== rid);
    setRowErrors([]);
    updateTerm(tid, (x) => ({ ...x, rows: next }));
    const focus = next[i] ?? next[i - 1];
    focusSoon(focus ? `grade-${focus.id}` : `add-class-${tid}`);
  };
  const addTerm = () => {
    const t = newTerm(3);
    setTerms((ts) => [...ts, t]);
    focusSoon(`term-name-${t.id}`);
    changed();
  };
  const removeTerm = (tid: string) => {
    setTerms((ts) => ts.filter((t) => t.id !== tid));
    setRowErrors([]);
    focusSoon("add-term");
    changed();
  };

  const loadExample = () => {
    const ex: Term[] = [{ id: `t${seq++}`, name: "", rows: HOME_EXAMPLE_ROWS.map((r) => ({ ...newRow(), ...r })) }];
    const empty = { gpa: "", credits: "" };
    setMode("college");
    setTerms(ex);
    setPrior(empty);
    setEqual(false);
    storage.clearNote();
    run(ex, "college", empty, false);
  };
  const hasData = terms.length > 1 || terms.some((t) => t.name.trim() !== "" || t.rows.some(rowHasData)) || prior.gpa !== "" || prior.credits !== "";
  useLoadExampleEvent(() => confirm.ask(hasData, loadExample));

  const clearAll = () => {
    setTerms([newTerm(3)]);
    setPrior({ gpa: "", credits: "" });
    setResult(null);
    setStale(false);
    setRowErrors([]);
    setPriorErrors([]);
    setPlan(null);
    storage.clearNote();
  };

  const topPoint = Math.max(...LETTER_GRADES.map((g) => scale[g] ?? 0)) + (hs ? Math.max(...BONUS_LEVELS.map((l) => bonuses[l])) : 0);
  const current = fresh?.cumulative ?? main;
  const runPlan = () => {
    if (!current) return;
    setPlan(planTarget(current, target.gpa, target.credits, topPoint));
  };
  const priorErr = (f: PriorFieldError["field"]) => priorErrors.find((e) => e.field === f);

  return (
    <>
      <form noValidate aria-label="GPA calculator" className="mt-5 card p-3 sm:p-5" onSubmit={(e) => { e.preventDefault(); run(); }}>
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">I'm in</legend>
          <div className="inline-flex rounded-full border border-divider bg-[#FBFDFC] p-1" role="radiogroup" aria-label="School level">
            {(["college", "highschool"] as const).map((m) => (
              <label key={m} className={`flex min-h-10 cursor-pointer items-center rounded-full px-4 text-[15px] font-semibold ${mode === m ? "bg-primary text-primary-foreground" : "text-text"}`}>
                <input type="radio" name="mode" value={m} className="sr-only" checked={mode === m}
                  onChange={() => { setMode(m); changed(); }} />
                {m === "college" ? "College" : "High school"}
              </label>
            ))}
          </div>
          <p className="mt-2 text-sm text-text-muted">
            {hs ? "Pick each class's level to see your weighted and unweighted GPA." : "Add a term for each semester or quarter you want to include."}
          </p>
        </fieldset>

        <div className="mt-4 space-y-4">
          {terms.map((t, ti) => (
            <section key={t.id} aria-label={t.name.trim() || `Term ${ti + 1}`} className="rounded-[14px] border border-divider p-3">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label htmlFor={`term-name-${t.id}`} className="mb-1 block text-sm">Term {ti + 1} name (optional)</label>
                  <input id={`term-name-${t.id}`} className="field" type="text" autoComplete="off" placeholder={ti === 0 ? "Fall semester" : "Spring semester"}
                    value={t.name} onChange={(e) => updateTerm(t.id, (x) => ({ ...x, name: e.target.value }))} />
                </div>
                {terms.length > 1 ? (
                  <button type="button" className="btn" onClick={() => removeTerm(t.id)} aria-label={`Remove term ${ti + 1}`}>
                    <X aria-hidden="true" size={18} /> Remove term
                  </button>
                ) : null}
              </div>
              <ol className="mt-3 space-y-3">
                {t.rows.map((row, i) => {
                  const err = rowErrors.find((e) => e.semester === ti + 1 && e.index === i + 1);
                  const errId = `err-${row.id}`;
                  return (
                    <li key={row.id} className="rounded-[12px] border border-divider bg-[#FBFDFC] p-3">
                      <div className={`grid gap-2 ${hs ? "grid-cols-2 sm:grid-cols-[1fr_6.5rem_9rem_5.5rem_44px]" : "grid-cols-[1fr_1fr_44px] sm:grid-cols-[1fr_8rem_7rem_44px]"}`}>
                        <div className={`${hs ? "col-span-2" : "col-span-3"} sm:col-span-1`}>
                          <label htmlFor={`name-${row.id}`} className="mb-1 block text-sm">Class (optional)</label>
                          <input id={`name-${row.id}`} className="field" type="text" autoComplete="off" value={row.name}
                            onChange={(e) => updateRow(t.id, row.id, { name: e.target.value })} />
                        </div>
                        <div>
                          <label htmlFor={`grade-${row.id}`} className="mb-1 block text-sm">Grade</label>
                          <select id={`grade-${row.id}`} className="field" value={row.grade}
                            aria-invalid={err?.code === "grade" || undefined} aria-describedby={err?.code === "grade" ? errId : undefined}
                            onChange={(e) => updateRow(t.id, row.id, { grade: e.target.value as Row["grade"] })}>
                            <option value="">—</option>
                            {GRADE_OPTIONS.map((g) => <option key={g} value={g}>{gradeLabel(g)}</option>)}
                          </select>
                        </div>
                        {hs ? (
                          <div>
                            <label htmlFor={`level-${row.id}`} className="mb-1 block text-sm">Level</label>
                            <select id={`level-${row.id}`} className="field" value={row.level}
                              onChange={(e) => updateRow(t.id, row.id, { level: e.target.value as Level })}>
                              {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                            </select>
                          </div>
                        ) : null}
                        <div>
                          <label htmlFor={`credits-${row.id}`} className="mb-1 block text-sm">Credits</label>
                          <input id={`credits-${row.id}`} className="field tabular" type="text" inputMode="decimal" autoComplete="off"
                            disabled={equal} value={equal ? "" : row.credits}
                            aria-invalid={err?.code === "credits" || undefined} aria-describedby={err?.code === "credits" ? errId : undefined}
                            onChange={(e) => updateRow(t.id, row.id, { credits: e.target.value })} />
                        </div>
                        <div className="flex items-end justify-end">
                          <button type="button" className="btn w-11 px-0" aria-label={`Remove class ${i + 1} from term ${ti + 1}`} onClick={() => removeRow(t.id, row.id)}>
                            <X aria-hidden="true" size={20} />
                          </button>
                        </div>
                      </div>
                      {err ? <FieldError id={errId}>{terms.length > 1 ? `Term ${ti + 1}, ${err.message.charAt(0).toLowerCase()}${err.message.slice(1)}` : err.message}</FieldError> : null}
                    </li>
                  );
                })}
              </ol>
              <button id={`add-class-${t.id}`} type="button" className="btn mt-3" onClick={() => addRow(t.id)}>
                <Plus aria-hidden="true" size={18} /> Add class
              </button>
            </section>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button id="add-term" type="button" className="btn" onClick={addTerm}><Plus aria-hidden="true" size={18} /> Add term</button>
          <button type="submit" className="btn btn-primary">Calculate GPA</button>
          <button type="button" className="btn" onClick={() => confirm.ask(hasData, loadExample)}>Try an example</button>
          <button type="button" className="btn" onClick={clearAll}>Clear</button>
        </div>

        <div className="mt-4">
          <label className="flex min-h-11 cursor-pointer items-center gap-3">
            <input type="checkbox" className="size-5 accent-primary" checked={equal} aria-describedby="equal-help"
              onChange={(e) => { setEqual(e.target.checked); setRowErrors([]); changed(); }} />
            <span>All classes count equally</span>
          </label>
          <p id="equal-help" className="ml-8 text-sm text-text-muted">Use this if your report card has no credits.</p>
        </div>

        <details className="mt-3 rounded-[10px] border border-divider" open={prior.gpa !== "" || prior.credits !== "" || priorErrors.length > 0 || undefined}>
          <summary className="flex min-h-11 cursor-pointer items-center px-3 font-semibold">Add your GPA so far (optional)</summary>
          <div className="px-3 pb-3">
            <p className="text-sm text-text-muted">
              {hs
                ? "Enter the weighted GPA and credits from your last report card. We'll combine them with your weighted GPA from the terms above."
                : "Enter the GPA and credits from your transcript. We'll combine them with the terms above into a cumulative GPA."}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:max-w-sm">
              <div>
                <label htmlFor="prior-gpa" className="mb-1 block text-sm">GPA so far</label>
                <input id="prior-gpa" className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={prior.gpa}
                  aria-invalid={!!priorErr("priorGpa") || undefined} aria-describedby={priorErr("priorGpa") ? "err-prior-gpa" : undefined}
                  onChange={(e) => { setPrior((p) => ({ ...p, gpa: e.target.value })); setPriorErrors([]); changed(); }} />
              </div>
              <div>
                <label htmlFor="prior-credits" className="mb-1 block text-sm">Credits so far</label>
                <input id="prior-credits" className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={prior.credits}
                  aria-invalid={!!priorErr("priorCredits") || undefined} aria-describedby={priorErr("priorCredits") ? "err-prior-credits" : undefined}
                  onChange={(e) => { setPrior((p) => ({ ...p, credits: e.target.value })); setPriorErrors([]); changed(); }} />
              </div>
            </div>
            {priorErr("priorGpa") ? <FieldError id="err-prior-gpa">{priorErr("priorGpa")?.message}</FieldError> : null}
            {priorErr("priorCredits") ? <FieldError id="err-prior-credits">{priorErr("priorCredits")?.message}</FieldError> : null}
          </div>
        </details>

        {hs ? (
          <details className="mt-3 rounded-[10px] border border-divider">
            <summary className="flex min-h-11 cursor-pointer items-center px-3 font-semibold">Bonus points (example)</summary>
            <div className="px-3 pb-3">
              <p className="text-sm text-text-muted">These bonuses are an example. Set them to match your school.</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {BONUS_LEVELS.map((l) => (
                  <div key={l}>
                    <label htmlFor={`bonus-${l}`} className="mb-1 block text-sm">{l}</label>
                    <input id={`bonus-${l}`} className="field tabular" type="number" inputMode="decimal" step="0.01" min="0" value={bonuses[l]}
                      onChange={(e) => {
                        const v = e.target.value === "" ? 0 : Number(e.target.value);
                        setBonuses((b) => ({ ...b, [l]: Number.isFinite(v) ? v : 0 }));
                        changed();
                      }} />
                  </div>
                ))}
              </div>
              <button type="button" className="btn mt-3" onClick={() => { setBonuses({ ...EXAMPLE_BONUSES }); changed(); }}>Reset to example bonuses</button>
            </div>
          </details>
        ) : null}

        <ScalePanel letters={LETTER_GRADES} scale={scale}
          onChange={(sc) => { setScale(sc); changed(); }}
          onReset={() => { setScale({ ...EXAMPLE_SCALE }); changed(); }} />

        <SaveBar storage={storage} onSave={() => storage.save({ mode, terms, prior, equal, scale, bonuses })} />
      </form>

      <ResultBox boxRef={resultRef}>
        {fresh && main ? (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {hs ? (
                <>
                  <Tile label="Unweighted GPA" value={formatGpa(fresh.unweighted.value)} />
                  <Tile label="Weighted GPA" value={formatGpa(fresh.weighted.value)} />
                </>
              ) : (
                <Tile label={fresh.terms.length > 1 ? "GPA for these terms" : "Your GPA"} value={formatGpa(fresh.unweighted.value)} />
              )}
              {fresh.cumulative ? (
                <Tile
                  label={hs ? "Cumulative weighted GPA" : "Cumulative GPA"}
                  value={formatGpa(fresh.cumulative.value)}
                  note={`${fresh.cumulative.change >= 0 ? "Up" : "Down"} ${formatGpa(Math.abs(fresh.cumulative.change))} from ${formatGpa(fresh.cumulative.priorGpa)}`}
                  accent
                />
              ) : null}
            </div>
            {hs ? (
              <p className="rounded-[10px] bg-accent px-4 py-3 font-semibold text-accent-foreground">
                {fresh.bonusClasses === 0
                  ? "No class earned bonus points, so both numbers match."
                  : `Weighted is ${formatGpa(fresh.weighted.value - fresh.unweighted.value)} higher because ${fresh.bonusClasses} ${fresh.bonusClasses === 1 ? "class" : "classes"} earned bonus points.`}
              </p>
            ) : null}
            {fresh.terms.length > 1 ? (
              <div className="overflow-x-auto">
                <table className="tabular w-full border-collapse text-left text-[15px]">
                  <caption className="mb-2 text-left text-sm font-semibold text-text-muted">GPA by term</caption>
                  <thead>
                    <tr className="border-b border-divider text-sm text-text-muted">
                      <th scope="col" className="py-2 pr-3 font-semibold">Term</th>
                      <th scope="col" className="py-2 pr-3 text-right font-semibold">{hs ? "Unweighted" : "GPA"}</th>
                      {hs ? <th scope="col" className="py-2 pr-3 text-right font-semibold">Weighted</th> : null}
                      <th scope="col" className="py-2 text-right font-semibold">GPA credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fresh.terms.map((t) => (
                      <tr key={t.term} className="border-b border-divider">
                        <th scope="row" className="py-2 pr-3 font-normal">{t.name}</th>
                        <td className="py-2 pr-3 text-right">{formatGpa(t.unweighted.value)}</td>
                        {hs ? <td className="py-2 pr-3 text-right">{formatGpa(t.weighted.value)}</td> : null}
                        <td className="py-2 text-right">{formatCredits(t.unweighted.denominator)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            <CountedStrip result={main} semesterNames={fresh.terms.length > 1 ? terms.map((t, i) => t.name.trim() || `Term ${i + 1}`) : undefined} />
            <div className="space-y-1">
              {hs ? <FormulaLine prefix="Unweighted GPA:" result={fresh.unweighted} /> : null}
              {hs ? <FormulaLine prefix="Weighted GPA:" result={main} /> : <FormulaLine result={main} />}
              {fresh.cumulative ? (
                <p className="tabular">
                  <span className="font-semibold">Cumulative: </span>
                  ({formatGpa(fresh.cumulative.priorGpa)} × {formatCredits(fresh.cumulative.priorCredits)} + {formatQp(main.numerator)}) ÷{" "}
                  {formatCredits(fresh.cumulative.denominator)} credits = {formatGpa(fresh.cumulative.value)}
                </p>
              ) : null}
            </div>
          </div>
        ) : stale ? (
          <p>Your classes changed. Calculate again.</p>
        ) : (
          <p>Add a grade and credits to see your GPA.</p>
        )}
      </ResultBox>

      <section aria-labelledby="target-title" className="mt-5 card p-4 sm:p-5">
        <h2 id="target-title" className="flex items-center gap-2 text-xl">
          <span className="icon-chip icon-chip-sm" aria-hidden="true"><Target /></span>
          What do I need for my target GPA?
        </h2>
        <p className="mt-1 text-[15px] text-text-muted">
          {current
            ? `Starting from ${hs ? "your weighted" : "your"} ${fresh?.cumulative ? "cumulative " : ""}GPA of ${formatGpa(current.numerator / current.denominator)} over ${formatCredits(current.denominator)} credits.`
            : "Calculate your GPA above first, then set a target."}
        </p>
        <form noValidate className="mt-3 flex flex-wrap items-end gap-2" onSubmit={(e) => { e.preventDefault(); runPlan(); }}>
          <div className="w-32">
            <label htmlFor="target-gpa" className="mb-1 block text-sm">Target GPA</label>
            <input id="target-gpa" className="field tabular" type="text" inputMode="decimal" autoComplete="off" placeholder="3.5" value={target.gpa}
              disabled={!current} onChange={(e) => { setTarget((t) => ({ ...t, gpa: e.target.value })); setPlan(null); }} />
          </div>
          <div className="w-36">
            <label htmlFor="target-credits" className="mb-1 block text-sm">Credits next term</label>
            <input id="target-credits" className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={target.credits}
              disabled={!current} onChange={(e) => { setTarget((t) => ({ ...t, credits: e.target.value })); setPlan(null); }} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={!current}>Plan it</button>
        </form>
        <div aria-live="polite" className="mt-3">
          {plan?.kind === "error" ? <FieldError id="err-target">{plan.message}</FieldError> : null}
          {plan?.kind === "plan" ? <PlanText plan={plan} target={target} top={topPoint} /> : null}
        </div>
      </section>
      {confirm.dialog}
    </>
  );
}

function Tile({ label, value, note, accent }: { label: string; value: string; note?: string; accent?: boolean }) {
  return (
    <div className={`rounded-[12px] border border-divider p-3 ${accent ? "bg-accent text-accent-foreground" : "bg-[#FBFDFC]"}`}>
      <p className={accent ? "" : "text-text-muted"}>{label}</p>
      <p className="tabular text-5xl leading-none font-semibold">{value}</p>
      {note ? <p className="mt-2 text-sm font-semibold">{note}</p> : null}
    </div>
  );
}

function PlanText({ plan, target, top }: { plan: Extract<TargetOutcome, { kind: "plan" }>; target: { gpa: string; credits: string }; top: number }) {
  const t = formatGpa(Number(target.gpa));
  const n = formatCredits(Number(target.credits));
  const terms = plan.termsAtTop;
  return (
    <div className="space-y-2">
      {plan.alreadyThere ? (
        <p className="font-semibold">You're already at {t} or above. To stay there, average at least {formatGpa(Math.max(0, plan.needed))} over the next {n} credits.</p>
      ) : plan.reachable ? (
        <p className="font-semibold">You need a {formatGpa(plan.needed)} average over the next {n} credits to reach {t}.</p>
      ) : (
        <p className="font-semibold">A {t} isn't reachable in one term of {n} credits. The most you can reach is {formatGpa(plan.best)}, with a {formatGpa(top)} in every class.</p>
      )}
      {!plan.alreadyThere && !plan.reachable ? (
        <p>
          {terms === null
            ? `With the top grade in every class, your GPA gets closer to ${t} each term but can't reach it.`
            : `With the top grade in every class, it takes ${terms} terms of ${n} credits.`}
        </p>
      ) : null}
      <p className="text-sm text-text-muted">Math: (target × total credits after next term − quality points so far) ÷ credits next term.</p>
    </div>
  );
}
