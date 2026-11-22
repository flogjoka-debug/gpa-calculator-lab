import { useRef, useState } from "react";
import { X } from "lucide-react";
import {
  COLLEGE_GRADE_OPTIONS,
  PLUS_EXAMPLE_SCALE,
  PLUS_LETTER_GRADES,
  formatCredits,
  formatGpa,
  formatQp,
  type GpaResult,
  type GradeOption,
  type GradeScale,
  type RowError,
} from "@/lib/calc/gpa";
import { calculateSemesters, type SemestersOutcome } from "@/lib/calc/semesters";
import { compareRetakePolicies, type RetakeComparison, type RetakeItem } from "@/lib/calc/retake";
import { CountedStrip, FormulaLine, LedgerTable } from "./Ledger";
import {
  FieldError,
  ResultBox,
  SaveBar,
  ScalePanel,
  gradeLabel,
  scrollIntoViewSoon,
  useDeviceStorage,
  useLoadExampleEvent,
  usePendingFocus,
  useReplaceConfirm,
} from "./shared";

interface Row { id: string; name: string; grade: GradeOption | ""; credits: string; retakeOf: string }
interface Semester { id: string; name: string; rows: Row[] }

let seq = 1;
const uid = () => `c${seq++}`;
const emptyRow = (): Row => ({ id: uid(), name: "", grade: "", credits: "", retakeOf: "" });
const newSemester = (n: number): Semester => ({ id: uid(), name: `Semester ${n}`, rows: [emptyRow(), emptyRow(), emptyRow()] });
const rowHasData = (r: Row) => r.name.trim() !== "" || r.grade !== "" || r.credits.trim() !== "" || r.retakeOf !== "";
const STORAGE_KEY = "gpacl:college:v1";

interface Outcome { sem: SemestersOutcome; cmp: RetakeComparison }

export function CollegeCalculator() {
  const [semesters, setSemesters] = useState<Semester[]>(() => [
    { id: "s0", name: "Semester 1", rows: ["r1", "r2", "r3"].map((id) => ({ id, name: "", grade: "", credits: "", retakeOf: "" })) },
  ]);
  const [scale, setScale] = useState<GradeScale>({ ...PLUS_EXAMPLE_SCALE });
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [stale, setStale] = useState(false);
  const [errors, setErrors] = useState<RowError[]>([]);
  const [showCompare, setShowCompare] = useState(true);
  const resultRef = useRef<HTMLDivElement>(null);
  const focusSoon = usePendingFocus();
  const confirm = useReplaceConfirm();
  const storage = useDeviceStorage<{ semesters: Semester[]; scale: GradeScale }>(STORAGE_KEY, (d) => {
    if (Array.isArray(d.semesters) && d.semesters.length) setSemesters(d.semesters);
    if (d.scale) setScale({ ...PLUS_EXAMPLE_SCALE, ...d.scale });
  });

  const changed = () => {
    if (outcome) setStale(true);
    storage.clearNote();
  };

  const flat = (ss: Semester[]): RetakeItem[] =>
    ss.flatMap((s, si) =>
      s.rows.map((r, i) => ({
        id: r.id,
        name: r.name,
        grade: r.grade,
        credits: r.credits,
        index: i + 1,
        semester: si + 1,
        ...(r.retakeOf ? { retakeOf: r.retakeOf } : {}),
      })),
    );

  const run = (ss: Semester[], sc = scale) => {
    const sem = calculateSemesters(ss.map((s) => ({ name: s.name, rows: s.rows })), { scale: sc });
    if (sem.overall.kind === "error") {
      setErrors(sem.overall.errors);
      setOutcome(null);
      setStale(false);
      const e = sem.overall.errors[0];
      const row = e && e.semester ? ss[e.semester - 1]?.rows[e.index - 1] : undefined;
      if (e && row) document.getElementById(`${e.code === "credits" ? "credits" : "grade"}-${row.id}`)?.focus();
      return;
    }
    setErrors([]);
    setOutcome({ sem, cmp: compareRetakePolicies(flat(ss), { scale: sc }) });
    setShowCompare(true);
    setStale(false);
    scrollIntoViewSoon(resultRef.current);
  };

  const updateRow = (sid: string, rid: string, patch: Partial<Row>) => {
    setSemesters((ss) => ss.map((s) => (s.id === sid ? { ...s, rows: s.rows.map((r) => (r.id === rid ? { ...r, ...patch } : r)) } : s)));
    setErrors((es) => es.filter((e) => {
      const si = semesters.findIndex((s) => s.id === sid);
      const ri = semesters[si]?.rows.findIndex((r) => r.id === rid) ?? -1;
      return !(e.semester === si + 1 && e.index === ri + 1);
    }));
    changed();
  };

  const addRow = (sid: string) => {
    const r = emptyRow();
    setSemesters((ss) => ss.map((s) => (s.id === sid ? { ...s, rows: [...s.rows, r] } : s)));
    focusSoon(`grade-${r.id}`);
    changed();
  };

  const removeRow = (sid: string, rid: string) => {
    const s = semesters.find((x) => x.id === sid);
    if (!s) return;
    const i = s.rows.findIndex((r) => r.id === rid);
    const rows = s.rows.filter((r) => r.id !== rid);
    setSemesters((ss) =>
      ss.map((x) => ({
        ...x,
        rows: (x.id === sid ? rows : x.rows).map((r) => (r.retakeOf === rid ? { ...r, retakeOf: "" } : r)),
      })),
    );
    setErrors([]);
    const target = rows[i] ?? rows[i - 1];
    focusSoon(target ? `grade-${target.id}` : `add-class-${sid}`);
    changed();
  };

  const addSemester = () => {
    const s = newSemester(semesters.length + 1);
    setSemesters((ss) => [...ss, s]);
    focusSoon(`semname-${s.id}`);
    changed();
  };

  const loadExample = () => {
    const d: Row = { id: uid(), name: "", grade: "D", credits: "3", retakeOf: "" };
    const a: Row = { id: uid(), name: "", grade: "A", credits: "3", retakeOf: d.id };
    const ss: Semester[] = [{ id: uid(), name: "Semester 1", rows: [d, a] }];
    setSemesters(ss);
    storage.clearNote();
    run(ss);
  };
  useLoadExampleEvent(() => confirm.ask(semesters.some((s) => s.rows.some(rowHasData)), loadExample));

  const clearAll = () => {
    setSemesters([newSemester(1)]);
    setOutcome(null);
    setStale(false);
    setErrors([]);
    storage.clearNote();
  };

  const names = semesters.map((s) => s.name);
  const multi = semesters.length > 1;
  const optionLabel = (si: number, i: number, r: Row) => {
    const base = r.name.trim() || `Class ${i + 1}`;
    return multi ? `${names[si]}: ${base}` : base;
  };

  const fresh = outcome && !stale ? outcome : null;
  const overall = fresh?.sem.overall.kind === "result" ? fresh.sem.overall : null;

  return (
    <>
      <form
        noValidate
        aria-label="College GPA calculator"
        className="mt-5 rounded-[14px] border border-divider bg-surface p-3 sm:p-5"
        onSubmit={(e) => {
          e.preventDefault();
          run(semesters);
        }}
      >
        {semesters.map((s, si) => {
          const earlier = semesters.slice(0, si + 1);
          return (
            <fieldset key={s.id} className={si > 0 ? "mt-6 border-t border-divider pt-4" : ""}>
              <legend className="sr-only">{s.name}</legend>
              <label htmlFor={`semname-${s.id}`} className="mb-1 block text-sm">Semester name</label>
              <input
                id={`semname-${s.id}`}
                className="field font-semibold"
                type="text"
                value={s.name}
                onChange={(e) => {
                  const v = e.target.value;
                  setSemesters((ss) => ss.map((x) => (x.id === s.id ? { ...x, name: v } : x)));
                  changed();
                }}
              />
              {si === 0 ? (
                <p className="mt-2 text-sm text-text-muted">
                  Have a percentage instead? You can <a href="/percentage-to-letter-grade/">convert a percentage to a letter grade</a> first.
                </p>
              ) : null}
              <ol className="mt-3 space-y-3">
                {s.rows.map((row, i) => {
                  const err = errors.find((e) => e.semester === si + 1 && e.index === i + 1);
                  const errId = `err-${row.id}`;
                  const options = earlier.flatMap((es, esi) =>
                    es.rows
                      .slice(0, esi === si ? i : undefined)
                      .map((er, eri) => ({ id: er.id, label: optionLabel(esi, eri, er) })),
                  );
                  return (
                    <li key={row.id} className="rounded-[10px] border border-divider p-3">
                      <div className="grid grid-cols-[1fr_6.5rem_44px] gap-2 sm:grid-cols-[1fr_7.5rem_6.5rem_44px]">
                        <div className="col-span-3 sm:col-span-1">
                          <label htmlFor={`name-${row.id}`} className="mb-1 block text-sm">Class (optional)</label>
                          <input id={`name-${row.id}`} className="field" type="text" autoComplete="off" value={row.name}
                            onChange={(e) => updateRow(s.id, row.id, { name: e.target.value })} />
                        </div>
                        <div>
                          <label htmlFor={`grade-${row.id}`} className="mb-1 block text-sm">Grade</label>
                          <select id={`grade-${row.id}`} className="field" value={row.grade}
                            aria-invalid={err?.code === "grade" || undefined}
                            aria-describedby={err?.code === "grade" ? errId : undefined}
                            onChange={(e) => updateRow(s.id, row.id, { grade: e.target.value as Row["grade"] })}>
                            <option value="">—</option>
                            {COLLEGE_GRADE_OPTIONS.map((g) => <option key={g} value={g}>{gradeLabel(g)}</option>)}
                          </select>
                        </div>
                        <div>
                          <label htmlFor={`credits-${row.id}`} className="mb-1 block text-sm">Credits</label>
                          <input id={`credits-${row.id}`} className="field tabular" type="text" inputMode="decimal" autoComplete="off"
                            value={row.credits}
                            aria-invalid={err?.code === "credits" || undefined}
                            aria-describedby={err?.code === "credits" ? errId : undefined}
                            onChange={(e) => updateRow(s.id, row.id, { credits: e.target.value })} />
                        </div>
                        <div className="flex items-end">
                          <button type="button" className="btn w-11 px-0" aria-label={`Remove class ${i + 1}`} onClick={() => removeRow(s.id, row.id)}>
                            <X aria-hidden="true" size={20} />
                          </button>
                        </div>
                        <div className="col-span-3 sm:col-span-4">
                          <label htmlFor={`retake-${row.id}`} className="mb-1 block text-sm">Retake of</label>
                          <select id={`retake-${row.id}`} className="field" value={row.retakeOf}
                            onChange={(e) => updateRow(s.id, row.id, { retakeOf: e.target.value })}>
                            <option value="">Not a retake</option>
                            {options.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                          </select>
                        </div>
                      </div>
                      {err ? <FieldError id={errId}>{err.message}</FieldError> : null}
                    </li>
                  );
                })}
              </ol>
              <button id={`add-class-${s.id}`} type="button" className="btn mt-3" onClick={() => addRow(s.id)}>Add class</button>
            </fieldset>
          );
        })}

        <div className="mt-4 flex flex-wrap gap-2 border-t border-divider pt-4">
          <button type="button" className="btn" onClick={addSemester}>Add semester</button>
          <button type="submit" className="btn btn-primary">Calculate GPA</button>
          <button type="button" className="btn" onClick={clearAll}>Clear</button>
        </div>

        <ScalePanel letters={PLUS_LETTER_GRADES} scale={scale}
          onChange={(sc) => { setScale(sc); changed(); }}
          onReset={() => { setScale({ ...PLUS_EXAMPLE_SCALE }); changed(); }} />

        <SaveBar storage={storage} onSave={() => storage.save({ semesters, scale })} />
      </form>

      <ResultBox boxRef={resultRef}>
        {overall && fresh ? (
          <div className="space-y-4">
            {multi ? (
              <ul className="grid gap-2 sm:grid-cols-2">
                {fresh.sem.semesters.map((o, i) => (
                  <li key={semesters[i]?.id ?? i} className="rounded-[10px] border border-divider p-3">
                    <p className="text-text-muted">{names[i]}</p>
                    <p className="tabular text-2xl font-semibold">{o.kind === "result" ? formatGpa(o.value) : "—"}</p>
                  </li>
                ))}
              </ul>
            ) : null}
            <div>
              <p className="text-text-muted">{multi ? "Overall GPA" : "Your GPA"}</p>
              <p className="tabular text-5xl leading-none font-semibold">{formatGpa(overall.value)}</p>
            </div>
            <LedgerTable result={overall} />
            <CountedStrip result={overall} semesterNames={names} />
            <FormulaLine result={overall} />
            {fresh.cmp.hasRetakes && showCompare ? <RetakeCard cmp={fresh.cmp} onHide={() => setShowCompare(false)} /> : null}
          </div>
        ) : stale ? (
          <p>Your classes changed. Calculate again.</p>
        ) : (
          <p>Add a grade and credits to see your GPA.</p>
        )}
      </ResultBox>
      <p className="mt-4">
        Already have credits from earlier terms? You can <a href="/cumulative-gpa-calculator/">add your previous college credits</a> to see your overall GPA.
      </p>
      {confirm.dialog}
    </>
  );
}

function PolicyResult({ title, r }: { title: string; r: GpaResult }) {
  return (
    <div className="rounded-[10px] border border-divider p-3">
      <p className="font-semibold">{title}</p>
      <p className="tabular mt-1 text-4xl leading-none font-semibold">{formatGpa(r.value)}</p>
      <p className="tabular mt-2 text-[15px]">
        {formatQp(r.numerator)} quality points ÷ {formatCredits(r.denominator)} GPA credits
      </p>
    </div>
  );
}

function RetakeCard({ cmp, onHide }: { cmp: RetakeComparison; onHide: () => void }) {
  const a = cmp.countBoth;
  const b = cmp.replaceEarlier;
  if (a.kind !== "result" || b.kind !== "result") return null;
  const diff = b.value - a.value;
  const removed = a.denominator - b.denominator;
  const verb = Math.abs(diff) < 0.005 ? "doesn't change this GPA" : `${diff > 0 ? "raises" : "lowers"} this GPA by ${formatGpa(Math.abs(diff))}`;
  return (
    <section aria-label="Retake comparison" className="rounded-[14px] border-2 border-primary p-3 sm:p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <PolicyResult title="Count both attempts" r={a} />
        <PolicyResult title="Replace earlier attempt" r={b} />
      </div>
      <p className="mt-3">
        Replacing the earlier attempt {verb} and removes {formatCredits(removed)} GPA credits.
      </p>
      <button type="button" className="btn mt-3" onClick={onHide}>Show original classes</button>
    </section>
  );
}
